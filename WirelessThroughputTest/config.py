# ----------------------config----------------------------------


command = 'iperf3'
device_type = '-c'
reversed_transmission_direction_flag = '-R'
time_per_test_flag = '-t'


udp_args = ['-l']
udp_args_domains = [(256, 62*1024)]
udp_args_extra = ['-u', '-b', '0']

tcp_args = ['-l', '-w', '-M']
tcp_args_domains = [(256, 1024*1024), (256, 256*1024), (500, 5000)]
tcp_args_extra = ['']



# --------------------------------------------------------------