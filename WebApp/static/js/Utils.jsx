export default class Utils {

    static prettyFormat(object) {
        const propertiesToFormatList = [
            'throughput',
            'buffer_length',
            'window_size'
        ];

        const properties = Object.keys(object);
        const newObject = Object.assign({}, object);
        for(let i of propertiesToFormatList) {
            if (i===propertiesToFormatList[0])
                newObject[i] = Utils.getValueWithMetricPrefix(object[i]) + 'bits/s';
            else if (properties.includes(i)) {
                newObject[i] = Utils.getValueWithMetricPrefix(object[i])
            }
        }
        return newObject;
    }

    static getValueWithMetricPrefix(value) {
        if (value >= 1024 * 1024 * 1024)
            return value / (1024 * 1024 * 1024) + ' G';
        else if (value >= 1024 * 1024)
            return value / (1024 * 1024) + ' M';
        else if (value >= 1024)
            return value / 1024 + ' K';
        else
            return value;
    }

    static formatParameters(param) {
        const parametersFormatDictionary = {
            'throughput': 'Throughput',
            'buffer_length': 'Buffer length',
            'window_size': 'Window size',
            'maximum_segment_size': 'Maximum segment size',
        };

        if(Object.keys(parametersFormatDictionary).includes(param)) {
            return parametersFormatDictionary[param];
        }
        return param;
    }

    static getRepositoryEndpoint(test) {
        switch (test) {
            case 'tcp (client -> server)':
                return 'tcp';
            case 'udp (client -> server)':
                return 'udp';
            case 'tcp (server -> client)':
                return 'tcp_reverse';
            case 'udp (server -> client)':
                return 'udp_reverse';
            default:
                return null;
        }
    }

}