import pymongo
from pymongo import MongoClient
from bson import ObjectId
import datetime
import time

class WirelessThroughputTestRepository:

    UDP = 'udp'
    UDP_R = 'udp_reverse'
    TCP = 'tcp'
    TCP_R = 'tcp_reverse'

    def __init__(self, ip='localhost', port=27017):
        self.client = MongoClient(ip, port)
        self.db = self.client['wifi-throughput-test']

    def add(self, collection, throughput_measure):
        item = {
            'throughput_value': throughput_measure.throughput,
            'test_id': throughput_measure.test_id
        }
        item.update(throughput_measure.args)

        return self.db[collection].insert_one(item).inserted_id

    def get_collection(self, transport_layer_protocol, reversed_transmission_direction):
        collection = None
        if transport_layer_protocol == 'udp':
            if reversed_transmission_direction:
                collection = WirelessThroughputTestRepository.UDP_R
            else:
                collection = WirelessThroughputTestRepository.UDP
        elif transport_layer_protocol == 'tcp':
            if reversed_transmission_direction:
                collection = WirelessThroughputTestRepository.TCP_R
            else:
                collection = WirelessThroughputTestRepository.TCP

        return collection

    def get_all(self, collection):
        return self.db[collection].find({})

    def get(self, collection, id: ObjectId):
        return self.db[collection].find_one({'_id': id})

    def delete(self, collection, id: ObjectId):
        return self.db[collection].remove({'_id': id})

    def add_test(self):
        return self.db['tests'].insert_one(
            {
                'date': datetime.datetime.now()
            }).inserted_id
