import sys
import subprocess
sys.path.append('../Database/')
from argument import Argument
from throughput_measure import ThroughputMeasure
from wireless_throughput_test_repository import WirelessThroughputTestRepository
import copy
import time


# ----------------------config----------------------------------
command = 'iperf3'
device_type = '-c'
reversed_transmission_direction_flag = '-R'
time_per_test = 1
time_per_test_flag = '-t'
ip = None


udp_args = ['-l']
udp_args_domains = [(256, 62*1024)]
udp_args_extra = ['-u', '-b', '0']

tcp_args = ['-l', '-w', '-M']
tcp_args_domains = [(256, 1024*1024), (256, 256*1024), (500, 5000)]
tcp_args_extra = ['']

delay_between_tests = 0.2

# --------------------------------------------------------------


def command_builder(ip, transport_layer_protocol, reversed_transmission_direction):
    args = []

    if reversed_transmission_direction:
        transmission_direction_arg = reversed_transmission_direction_flag
    else:
        transmission_direction_arg = ''

    command_prefix = [command, device_type, ip, time_per_test_flag, str(time_per_test), transmission_direction_arg]

    if transport_layer_protocol == 'udp':
        args = [Argument(name='buffer_length', flag=udp_args[0], min_val=udp_args_domains[0][0],
                         max_val=udp_args_domains[0][1], get_next_value_method='multiply')]
        command_prefix+=udp_args_extra

    elif transport_layer_protocol == 'tcp':
        args = [Argument(name='buffer_length', flag=tcp_args[0], min_val=tcp_args_domains[0][0],
                     max_val=tcp_args_domains[0][1], get_next_value_method='multiply'),
            Argument(name='window_size', flag=tcp_args[1], min_val=tcp_args_domains[1][0],
                     max_val=tcp_args_domains[1][1], get_next_value_method='multiply'),
            Argument(name='maximum_segment_size', flag=tcp_args[2], min_val=tcp_args_domains[2][0],
                     max_val=tcp_args_domains[2][1], get_next_value_method='add')]
        command_prefix += tcp_args_extra

    return command_prefix, args


#TODO: refactor usage of DB in function below
def perform_test(command_prefix, args, transport_layer_protocol, reversed_transmission_direction, store_in_db):
    if reversed_transmission_direction:
        print('Performing {0} throughput test (server -> client transmission)'.format(transport_layer_protocol))
    else:
        print('Performing {0} throughput test (client -> server transmission)'.format(transport_layer_protocol))

    test_id = None
    if store_in_db:
        repository = WirelessThroughputTestRepository()
        test_id = repository.add_test()
        collection = repository.get_collection(transport_layer_protocol, reversed_transmission_direction)


    best_throughput = 0
    best_parameters = None
    while(True):
        actual_command = copy.deepcopy(command_prefix)
        for i in args:
            actual_command.append(i.flag)
            actual_command.append(str(i.value))

        throughput = command_executor(actual_command, transport_layer_protocol, reversed_transmission_direction)
        throughput_measure = ThroughputMeasure(throughput, transport_layer_protocol, reversed_transmission_direction, test_id)

        for i in args:
            throughput_measure.args[i.name]=i.value

        if throughput > best_throughput:
            best_throughput = throughput
            best_parameters = copy.deepcopy(throughput_measure)

        print(throughput_measure)

        if store_in_db:
            repository.add(collection, throughput_measure)

        has_max_value_list = [argument.has_max_value() for argument in args]
        if all(has_max_value_list):
            break

        increased = False
        if args[0].has_max_value():
            args[0].reset_value()
            increased = True
            for i in range(1, len(args)):
                if args[i].has_max_value():
                    args[i].reset_value()
                else:
                    args[i].get_next_value()
                    break

        if(not(increased)):
            args[0].get_next_value()
        time.sleep(delay_between_tests)

    if store_in_db:
        repository.client.close()
    print('Best configuration: {0}'.format(best_parameters))
    return test_id, best_parameters

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

    metric_prefix = 1
    if output_split[throughput_position+1][0] == 'K':
        metric_prefix = 1000
    elif output_split[throughput_position+1][0] == 'M':
        metric_prefix = 1e6
    elif output_split[throughput_position+1][0] == 'G':
        metric_prefix = 1e9

    throughput=float(throughput)*metric_prefix
    return throughput

def perform_all_tests(ip, store_in_db):
    command_prefix, args = command_builder(ip, transport_layer_protocol='udp', reversed_transmission_direction=False)
    perform_test(command_prefix, args, transport_layer_protocol='udp', reversed_transmission_direction=False,
                 store_in_db=store_in_db)

    #command_prefix, args = command_builder(ip, transport_layer_protocol='udp', reversed_transmission_direction=True)
    #perform_test(command_prefix, args, transport_layer_protocol='udp', reversed_transmission_direction=True,
    #             store_in_db=store_in_db)

    command_prefix, args = command_builder(ip, transport_layer_protocol='tcp', reversed_transmission_direction=False)
    perform_test(command_prefix, args, transport_layer_protocol='tcp', reversed_transmission_direction=False,
                 store_in_db=store_in_db)

    command_prefix, args = command_builder(ip, transport_layer_protocol='tcp', reversed_transmission_direction=True)
    perform_test(command_prefix, args, transport_layer_protocol='tcp', reversed_transmission_direction=True,
                 store_in_db=store_in_db)

def main():
    if len(sys.argv) < 2:
        print('Please provide server\'s ip address as an argument')
        exit(-1)
    elif(len(sys.argv) > 2):
        print('Only one argument is needed')
        exit(-1)
    ip = sys.argv[1]

    transport_layer_protocol = 'udp'
    reversed_transmission_direction = False
    #command_prefix, args = command_builder(ip, transport_layer_protocol, reversed_transmission_direction)
    #perform_test(command_prefix, args, transport_layer_protocol=transport_layer_protocol, reversed_transmission_direction=reversed_transmission_direction, store_in_db=True)

    perform_all_tests(ip, store_in_db=True)

if __name__ == '__main__':
    main()