import time
from throughput_measure import ThroughputMeasure

class TestInstance:
    def __init__(self, id, test_type, parameters, time_per_test, best_configuration: ThroughputMeasure = None):
        self.id = id
        self.test_type = test_type
        self.date = time.strftime("%Y-%m-%d, %H:%M:%S")
        self.parameters = [x.name for x in parameters]
        self.time_per_test = time_per_test
        self.best_configuration = best_configuration

    def as_dict(self):
        return {
            '_id': self.id,
            'test_type': self.test_type,
            'date': self.date,
            'parameters': self.parameters,
            'time_per_test': self.time_per_test,
            'best_configuration': self.best_configuration.as_dict()
        }