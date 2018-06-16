import sys
import subprocess
sys.path.append('./argument.py')
from argument import Argument
import copy
import time

# ----------------------config----------------------------------
command = 'iperf3'
device_type = '-c'
ip = None
time_per_test = 1

udp_args = ['-l']
udp_args_domains = [(256, 32*1024)]
udp_args_extra = ['-u', '-b', '0']

tcp_args = ['-l', '-w', '-M']
tcp_args_domains = [(256, 1024*1024), (256, 256*1024), (500, 5000)]
tcp_args_extra = ['']

delay_between_tests = 0.2

# --------------------------------------------------------------


def command_builder(command, ip, time_per_test, delay_between_tests, transport_layer_protocol, reversed_transmission_direction):
    args = []

    if reversed_transmission_direction:
        transmission_direction_arg = '-R'
    else:
        transmission_direction_arg = ''

    command_prefix = [command, device_type, ip, '-t', str(time_per_test), transmission_direction_arg]

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

    while(True):
        actual_command = copy.copy(command_prefix)
        for i in args:
            actual_command.append(i.flag)
            actual_command.append(str(i.value))

        print(actual_command)
        throughput = command_executor(actual_command, transport_layer_protocol, reversed_transmission_direction)
        print(throughput)

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

def main():
    if len(sys.argv) < 2:
        print('Please provide server\'s ip address as an argument')
        exit(-1)
    elif(len(sys.argv) > 2):
        print('Only one argument is needed')
        exit(-1)
    ip = sys.argv[1]
    command_builder(command, ip, time_per_test, delay_between_tests, transport_layer_protocol='tcp', reversed_transmission_direction=True)
    #print(command_executor(['iperf3', '-c', '172.16.0.103', '-t', '1', '-R', '-u', '-b', '0', '-l', '256'], 'udp', True))

if __name__ == '__main__':
    main()