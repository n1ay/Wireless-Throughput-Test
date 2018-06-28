from config import *

class Argument:
    def __init__(self, name, flag, min_val, max_val, get_next_value_method, default_val=None):
        self.name = name
        self.flag = flag
        self.min_val = min_val
        self.max_val = max_val
        self.get_next_value_method = get_next_value_method
        self.forbidden_values = set()
        if default_val!=None:
            self.value = default_val
        else:
            self.value = min_val
        self.domain_length = 0

        if get_next_value_method=='multiply':
            self.step = step_multiply
        elif get_next_value_method=='add':
            self.step = step_add

    def reset_value(self):
        self.value = self.min_val

    def has_max_value(self) -> bool:
        return self.value >= self.max_val

    def get_next_value(self) -> int:
        ret_value = self.value

        if self.value <= self.max_val:
            if self.get_next_value_method == 'multiply':
                self.value = round(min(self.value*self.step, self.max_val))
            elif self.get_next_value_method == 'add':
                self.value = round(min(self.step+self.value, self.max_val))
        return ret_value

    def has_forbidden_value(self):
        for i in self.forbidden_values:
            if i==self.value:
                return True
        return False

