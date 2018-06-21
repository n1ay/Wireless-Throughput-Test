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

def get_test_type(transport_layer_protocol, reversed_transmission_direction):
        UDP = 'udp (client -> server)'
        UDP_R = 'udp (server -> client)'
        TCP = 'tcp (client -> server)'
        TCP_R = 'tcp (server -> client)'

        test_type = None
        if transport_layer_protocol == 'udp':
            if reversed_transmission_direction:
                test_type = UDP_R
            else:
                test_type = UDP
        elif transport_layer_protocol == 'tcp':
            if reversed_transmission_direction:
                test_type = TCP_R
            else:
                test_type = TCP

        return test_type