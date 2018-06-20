export default class Utils {

    static prettyFormat(object) {

        const propertiesToFormatList = [
            'throughput_value',
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

}