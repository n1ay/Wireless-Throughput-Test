from utils import *

class ThroughputMeasure:

    def __init__(self, throughput, transport_layer_protocol, reversed_transmission_direction, test_id):
        self.throughput = throughput
        self.test_id = test_id
        self.transport_layer_protocol = transport_layer_protocol
        self.reversed_transmission_diretion = reversed_transmission_direction
        self.args = {}

    def print_type(self):
        ret = self.transport_layer_protocol
        if self.reversed_transmission_diretion:
            ret += ' (server -> client) transmission'
        else:
            ret += ' (client -> server) transmission'
        return ret

    def as_dict(self):
        item = {
            'throughput_value': self.throughput,
            'test_id': self.test_id
        }
        item.update(self.args)

        return item

    def __str__(self):
        ret = self.print_type() + ' throughput = ' + get_value_with_metric_prefix(self.throughput) + 'bits/sec, '
        for i in self.args.keys():
            ret += '{0} = '.format(i) + str(self.args[i]) + ', '

        return ret[:-2]

    __repr__ = __str__