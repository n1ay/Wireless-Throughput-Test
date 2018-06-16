class ThroughputMeasure:

    def __init__(self, throughput, transport_layer_protocol, reversed_transmission_direction, test_id = 0, args = {}):
        self.throughput = throughput
        self.args = args
        self.test_id = test_id
        self.transport_layer_protocol = transport_layer_protocol
        self.reversed_transmission_diretion = reversed_transmission_direction

    def pretty_format(value):
        if value >= 1e9:
            return str(value/1e9)+' Gbits/sec'
        elif value >= 1e6:
            return str(value / 1e6) + ' Mbits/sec'
        elif value >= 1e3:
            return str(value / 1e3) + ' Kbits/sec'
        else:
            return str(value) + ' bits/sec'

    def print_type(self):
        ret = self.transport_layer_protocol
        if self.reversed_transmission_diretion:
            ret += ' (server -> client) transmission'
        else:
            ret += ' (client -> server) transmission'
        return ret

    def __str__(self):
        ret = self.print_type() + ' throughput = ' + ThroughputMeasure.pretty_format(self.throughput) + ', '
        for i in self.args.keys():
            ret += '{0} = '.format(i) + str(self.args[i]) + ', '

        return ret[:-2]

    __repr__ = __str__