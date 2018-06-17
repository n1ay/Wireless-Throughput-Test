from pymongo import MongoClient
from bson import ObjectId

class ProtocolRepository:
    def __init__(self, ip='localhost', port=27017):
        self.client = MongoClient(ip, port)
        self.db = self.client['wifi-throughput-test']
        self.collection = None

    def add(self, throughput_measure):
        item = {
            'throughput_value': throughput_measure.throughput,
            'test_id': throughput_measure.test_id
        }
        item.update(throughput_measure.args)

        return self.db[self.collection].insert_one(item).inserted_id

    def get_all(self):
        return self.db[self.collection].find({})

    def get(self, id: ObjectId):
        return self.db[self.collection].find_one({'_id': id})

    def delete(self, id: ObjectId):
        return self.db[self.collection].remove({'_id': id})

    def update(self, id: ObjectId, throughput_measure):
        item = {
            'throughput_value': throughput_measure.throughput,
            'test_id': throughput_measure.test_id
        }
        item.update(throughput_measure.args)

        return self.db[self.collection].update({'_id': id},item).inserted_id