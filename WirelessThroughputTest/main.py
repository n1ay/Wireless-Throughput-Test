import sys
import subprocess
import bson
from bson import ObjectId
from config import *
from utils import *
sys.path.append('../Database/')
from argument import Argument
from throughput_measure import ThroughputMeasure
from test_instance_repository import TestInstanceRepository
from protocol_repository_factory import ProtocolRepositoryFactory
import copy
import argparse

def command_builder(input_args):
    (ip, transport_layer_protocol, time_per_test, reversed_transmission_direction, store_in_db,
     buffer_length, window_size, maximum_segment_size) = input_args

    if reversed_transmission_direction:
        transmission_direction_arg = reversed_transmission_direction_flag
    else:
        transmission_direction_arg = ''

    command_prefix = [command, device_type, ip, time_per_test_flag, str(time_per_test), transmission_direction_arg]

    if transport_layer_protocol == 'udp':
        opt_args = [Argument(name='buffer_length', flag=udp_args[0], min_val=udp_args_domains[0][0],
                         max_val=udp_args_domains[0][1], get_next_value_method='multiply')]
        command_prefix+=udp_args_extra

    elif transport_layer_protocol == 'tcp':
        opt_args = []
        if buffer_length:
         opt_args.append(Argument(name='buffer_length', flag=tcp_args[0], min_val=tcp_args_domains[0][0],
                     max_val=tcp_args_domains[0][1], get_next_value_method='multiply'))
        if window_size:
            opt_args.append(Argument(name='window_size', flag=tcp_args[1], min_val=tcp_args_domains[1][0],
                     max_val=tcp_args_domains[1][1], get_next_value_method='multiply'))
        if maximum_segment_size:
            opt_args.append(Argument(name='maximum_segment_size', flag=tcp_args[2], min_val=tcp_args_domains[2][0],
                     max_val=tcp_args_domains[2][1], get_next_value_method='add'))
        command_prefix += tcp_args_extra

        if len(opt_args) == 0:
            print('Impossible to optimize throughput without any parameters.')
            exit(-1)

    args = (time_per_test, transport_layer_protocol, reversed_transmission_direction, store_in_db)

    return command_prefix, opt_args, args


def perform_test(command_prefix, opt_args, args):

    results = []

    (time_per_test, transport_layer_protocol, reversed_transmission_direction, store_in_db) = args
    if reversed_transmission_direction:
        print('Performing {0} throughput test (server -> client transmission)'.format(transport_layer_protocol))
    else:
        print('Performing {0} throughput test (client -> server transmission)'.format(transport_layer_protocol))

    test_id = ObjectId()
    if store_in_db:
        test_repository = TestInstanceRepository()
        test_type = test_repository.get_test_type(transport_layer_protocol, reversed_transmission_direction)
        test_repository.add(test_id, test_type, opt_args, time_per_test)
        protocol_repository_factory = ProtocolRepositoryFactory()
        protocol_repository = protocol_repository_factory.get_repository(transport_layer_protocol, reversed_transmission_direction)


    best_throughput = 0
    best_parameters = None
    while(True):
        actual_command = copy.deepcopy(command_prefix)
        for i in opt_args:
            actual_command.append(i.flag)
            actual_command.append(str(i.value))

        throughput = command_executor(actual_command, transport_layer_protocol, reversed_transmission_direction)
        throughput_measure = ThroughputMeasure(throughput, transport_layer_protocol, reversed_transmission_direction, test_id)

        for i in opt_args:
            throughput_measure.args[i.name]=i.value

        if throughput > best_throughput:
            best_throughput = throughput
            best_parameters = copy.deepcopy(throughput_measure)

        print(throughput_measure)
        results.append(throughput_measure.as_dict())

        if store_in_db:
            protocol_repository.add(throughput_measure)

        has_max_value_list = [argument.has_max_value() for argument in opt_args]
        if all(has_max_value_list):
            break

        increased = False
        if opt_args[0].has_max_value():
            opt_args[0].reset_value()
            increased = True
            for i in range(1, len(opt_args)):
                if opt_args[i].has_max_value():
                    opt_args[i].reset_value()
                else:
                    opt_args[i].get_next_value()
                    break

        if(not(increased)):
            opt_args[0].get_next_value()

    if store_in_db:
        test_repository.update(test_id, test_type, opt_args, time_per_test, best_parameters.as_dict())
        test_repository.client.close()
        protocol_repository.client.close()
    print('Best configuration: {0}'.format(best_parameters))
    return test_id, best_parameters.as_dict(), results

def command_executor(command, transport_layer_protocol, reversed_transmission_direction):
    output = subprocess.check_output(command).decode().splitlines()

    if transport_layer_protocol == 'tcp':
        if reversed_transmission_direction:
            device = 'receiver'
        else:
            device = 'sender'

        output_filtered = list(filter(lambda x: x.find(device) != -1, output))[0]
    elif transport_layer_protocol == 'udp':
        output_filtered = output[[i for i in range(len(output)) if output[i].find('Jitter') != -1][0]+1]

    output_split = output_filtered.split(' ')

    throughput_position = [i for i in range(len(output_split)) if output_split[i].find('bits/sec') != -1][0] - 1
    throughput = output_split[throughput_position]

    metric_prefix_value = get_metric_prefix_value(output_split[throughput_position+1])

    throughput=float(throughput)*metric_prefix_value
    return throughput

def build_parser():
    parser = argparse.ArgumentParser(description='Automated throughput test.')
    parser.add_argument('-ip', '--ip_address', help='Server\'s ip address', required=True)
    parser.add_argument('-t', '--time', help='Time in seconds to transmit for (for a single test)', required=True)
    parser.add_argument('-p', '--protocol', help='Transport layer protocol (tcp/udp). Usage of udp automatically imposes usage of buffer length and forbids usage of any other parameters', required=True)
    parser.add_argument('-R', '--reversed', action="store_true", help='Reverse transmission direction', default=False,
                        required=False)
    parser.add_argument('-l', '--buffer_length', action="store_true", help='Optimize throughput using buffer length.', default=False,
                        required=False)
    parser.add_argument('-w', '--window_size', action="store_true", help='Optimize throughput using window size', default=False,
                        required=False)
    parser.add_argument('-M', '--maximum_segment_size', action="store_true", help='Optimize throughput using maximum segment size', default=False,
                        required=False)
    parser.add_argument('-db', '--store_in_db', action="store_true", help='Store results in database', default=False,
                        required=False)
    return parser

def parse_args(parser):
    input_args = parser.parse_args()

    ip = input_args.ip_address
    transport_layer_protocol = input_args.protocol
    time_per_test = input_args.time
    reversed_transmission_direction = input_args.reversed
    store_in_db = input_args.store_in_db
    buffer_length = transport_layer_protocol == 'udp' or input_args.buffer_length
    window_size = not (transport_layer_protocol == 'udp') and input_args.window_size
    maximum_segment_size = not (transport_layer_protocol == 'udp') and input_args.maximum_segment_size

    return (ip, transport_layer_protocol, time_per_test, reversed_transmission_direction, store_in_db,
            buffer_length, window_size, maximum_segment_size)

def run_tests(input_args):
    command_prefix, opt_args, args = command_builder(input_args)
    test_id, best_configuration, results = perform_test(command_prefix, opt_args, args)

    return {
        'test_id': test_id,
        'best_configuration': best_configuration,
        'results': results
    }

def main():
    parser = build_parser()
    input_args = parse_args(parser)
    return run_tests(input_args)

if __name__ == '__main__':
    main()