def bool_from_text(text):
    if text.lower() == 'true':
        return True
    elif text.lower() == 'false':
        return False
    else:
        raise Exception('Such text is not convertible to bool')

def get_value_with_metric_prefix(value):
    if value >= 1024*1024*1024:
        return str(value / (1024*1024*1024))+' G'
    elif value >= 1024*1024:
        return str(value / (1024*1024)) + ' M'
    elif value >= 1024:
        return str(value / 1024) + ' K'
    else:
        return str(value)

def get_metric_prefix_value(value):
    metric_prefix = 1
    if value[0] == 'K':
        metric_prefix = 1024
    elif value[0] == 'M':
        metric_prefix = 1024*1024
    elif value[0] == 'G':
        metric_prefix = 1024*1024*1024
    return metric_prefix