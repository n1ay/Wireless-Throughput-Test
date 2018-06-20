import React, {Component} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import Utils from "./Utils";
export default class ResultsView extends Component {
    constructor(props) {
        super(props);
    }

    getTableColumns(args) {
        const columnsFormat = {
            'buffer_length': 'Buffer length',
            'window_size': 'Window size',
            'maximum_segment_size': 'Maximum segment size'
        };

        const columns = [{
            dataField: '_id',
            text: 'ID'
        },{
            dataField: 'throughput_value',
            text: 'Throughput'
        }];

        for(let i of Object.keys(args)) {
            if(args[i])
                columns.push({
                    dataField: i,
                    text: columnsFormat[i]
                })
        }
        return columns;
    }


    render() {
        const columns = this.getTableColumns(this.props.params);
        const dataReceived = this.props.data;
        const best_result = dataReceived['best_configuration'];
        const test_id = dataReceived['test_id'];
        const results = dataReceived['results'].map(Utils.prettyFormat);
        const rowStyle = (row) => {
            const style = {};
            if(row._id === best_result._id) {
                style.backgroundColor = '#5cb85c';
                style.color = 'white';
            }
            return style;
        };
        return (
            <BootstrapTable striped keyField='_id' data={ results } columns={ columns } rowStyle={ rowStyle } />
        );
    }

}