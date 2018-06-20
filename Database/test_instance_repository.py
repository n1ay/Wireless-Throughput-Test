import pymongo
from pymongo import MongoClient
from bson import ObjectId
import datetime
import time

class TestInstanceRepository:

    UDP = 'udp (client -> server)'
    UDP_R = 'udp (server -> client)'
    TCP = 'tcp (client -> server)'
    TCP_R = 'tcp (server -> client)'

    def __init__(self, ip='localhost', port=27017):
        self.client = MongoClient(ip, port)
        self.db = self.client['wifi-throughput-test']
        self.collection = 'tests'

    def get_all(self):
        return list(self.db[self.collection].find({}))

    def get(self, id: ObjectId):
        return self.db[self.collection].find_one({'_id': id})

    def delete(self, id: ObjectId):
        return self.db[self.collection].remove({'_id': id})

    def add(self, id, test_type, parameters, time_per_test, best_config=None):
        return self.db[self.collection].insert_one(

            {
                '_id': id,
                'test_type': test_type,
                'date': time.strftime("%Y-%m-%d, %H:%M:%S"),
                'parameters': [x.name for x in parameters],
                'time_per_test': time_per_test,
                'best_config': best_config
            }).inserted_id

    def update(self, id, test_type, parameters=None, time_per_test=None, best_config=None):
        return self.db[self.collection].update(
            {'_id': id, },{
                'test_type': test_type,
                'date': time.strftime("%Y-%m-%d, %H:%M:%S"),
                'parameters': [x.name for x in parameters],
                'time_per_test': time_per_test,
                'best_config': best_config
            })

    def get_test_type(self, transport_layer_protocol, reversed_transmission_direction):
        repository_type = None
        if transport_layer_protocol == 'udp':
            if reversed_transmission_direction:
                repository_type = TestInstanceRepository.UDP_R
            else:
                repository_type = TestInstanceRepository.UDP
        elif transport_layer_protocol == 'tcp':
            if reversed_transmission_direction:
                repository_type = TestInstanceRepository.TCP_R
            else:
                repository_type = TestInstanceRepository.TCP

        return repository_type

