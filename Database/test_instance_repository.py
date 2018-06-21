import pymongo
from pymongo import MongoClient
from bson import ObjectId
import datetime
import time

class TestInstanceRepository:

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

    def add(self, test_instance):
        item = test_instance.as_dict()
        return self.db[self.collection].insert_one(item).inserted_id

    def update(self, id, test_instance):
        return self.db[self.collection].update(
            {'_id': id, },{
                'test_type': test_instance.test_type,
                'date': test_instance.date,
                'parameters': test_instance.parameters,
                'time_per_test': test_instance.time_per_test,
                'best_configuration': test_instance.best_configuration
            })
