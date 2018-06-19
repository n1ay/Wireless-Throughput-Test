from pymongo import MongoClient
from bson import ObjectId
from throughput_measure import ThroughputMeasure

class ProtocolRepository:
    def __init__(self, ip='localhost', port=27017):
        self.client = MongoClient(ip, port)
        self.db = self.client['wifi-throughput-test']
        self.collection = None

    def add(self, throughput_measure: ThroughputMeasure):
        item = throughput_measure.as_dict()
        return self.db[self.collection].insert_one(item).inserted_id

    def get_all(self):
        return self.db[self.collection].find({})

    def get(self, id: ObjectId):
        return self.db[self.collection].find_one({'_id': id})

    def delete(self, id: ObjectId):
        return self.db[self.collection].remove({'_id': id})

    def update(self, id: ObjectId, throughput_measure: ThroughputMeasure):
        item = throughput_measure.as_dict()
        return self.db[self.collection].update({'_id': id},item).inserted_id

    def get_all_by_test_id(self, id):
        return self.db[self.collection].find({'test_id': id})