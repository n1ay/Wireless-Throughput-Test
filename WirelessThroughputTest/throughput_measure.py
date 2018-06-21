from utils import *
import bson
from bson import ObjectId

class ThroughputMeasure:

    def __init__(self, throughput, transport_layer_protocol, reversed_transmission_direction, test_id):
        self.throughput = throughput
        self.test_id = test_id
        self.transport_layer_protocol = transport_layer_protocol
        self.reversed_transmission_direction = reversed_transmission_direction
        self.args = {}
        self.id = ObjectId()

    def as_dict(self):
        item = {
            '_id': self.id,
            'throughput': self.throughput,
            'test_id': self.test_id
        }
        item.update(self.args)

        return item

    def __str__(self):
        ret = get_test_type(self.transport_layer_protocol, self.reversed_transmission_direction) + ' throughput = ' + get_value_with_metric_prefix(self.throughput) + 'bits/sec, '
        for i in self.args.keys():
            ret += '{0} = '.format(i) + str(self.args[i]) + ', '

        return ret[:-2]

    __repr__ = __str__