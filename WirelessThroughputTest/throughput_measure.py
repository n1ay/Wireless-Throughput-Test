class ThroughputMeasure:
    def __init__(self, value, test_id = 0, args = {}):
        self.value = value
        self.args = args
        self.test_id = test_id

    def pretty_format(self, value):
        if value >= 1e9:
            return str(self.value/1e9)+' Gbits/sec'
        elif value >= 1e6:
            return str(self.value / 1e6) + ' Mbits/sec'
        elif value >= 1e3:
            return str(self.value / 1e3) + ' Kbits/sec'
        else:
            return str(self.value) + ' Kbits/sec'

    def __str__(self):
        ret = 'value = ' + self.pretty_format(self.value) + ' '
        for i in self.args.keys():
            ret += '{0} = '.format(i) + str(self.args[i]) + ' '

        return ret

    __repr__ = __str__