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
        return self.db[self.collection].find({})

    def get(self, id: ObjectId):
        return self.db[self.collection].find_one({'_id': id})

    def delete(self, id: ObjectId):
        return self.db[self.collection].remove({'_id': id})

    def add(self, parameters, time_per_test, best_config=None):
        return self.db[self.collection].insert_one(

            {
                'date': datetime.datetime.now(),
                'parameters': [x.name for x in parameters],
                'time_per_test': time_per_test,
                'best_config': best_config
            }).inserted_id

    def update(self, id, parameters=None, time_per_test=None, best_config=None):
        return self.db[self.collection].update(
            {'_id': id, },{
                'date': datetime.datetime.now(),
                'parameters': [x.name for x in parameters],
                'time_per_test': time_per_test,
                'best_config': best_config
            })

