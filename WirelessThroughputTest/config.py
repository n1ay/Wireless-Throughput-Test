# ---------------------iperf3 config-----------------------------


command = 'iperf3'
device_type = '-c'
reversed_transmission_direction_flag = '-R'
time_per_test_flag = '-t'

udp_args_names=['buffer_length']
udp_args = ['-l']
udp_args_domains = [(1024, 62*1024)]
udp_args_default_values = [8*1024]
udp_args_extra = ['-u', '-b', '0']

tcp_args_names=['buffer_length', 'window_size', 'maximum_segment_size']
tcp_args = ['-l', '-w', '-M']
tcp_args_domains = [(1024, 1024*1024), (1024, 256*1024), (500, 5000)]
tcp_args_default_values = [128*1024, None, 2264]
tcp_args_extra = ['']


# --------------------------------------------------------------
