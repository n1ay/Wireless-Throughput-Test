class Argument:
    def __init__(self, name, flag, min_val, max_val, get_next_value_method):
        self.name = name
        self.flag = flag
        self.min_val = min_val
        self.max_val = max_val
        self.get_next_value_method = get_next_value_method
        self.value = min_val

    def reset_value(self):
        self.value = self.min_val

    def has_max_value(self) -> bool:
        return self.value >= self.max_val

    def get_next_value(self) -> int:

        ret_value = self.value

        if self.value <= self.max_val:
            if self.get_next_value_method == 'multiply':
                self.value = self.value*2
            elif self.get_next_value_method == 'add':
                self.value += self.min_val

        return ret_value

    def get_value(self) -> int:
        return self.value