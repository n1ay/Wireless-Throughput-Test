import React, {Component} from "react";
import BootstrapTable from 'react-bootstrap-table-next';
export default class ResultsView extends Component {
    constructor(props) {
        super(props);
    }

    getTableColumns(args) {
        let columns = [{
            dataField: '_id',
            text: 'id'
        }, {
            dataField: 'throughput',
            text: 'throughput'
        }];

        for(let i of Object.keys(args)) {
            if(args[i])
                columns.push({
                    dataField: i,
                    text: i
                })
        }
        return columns;
    }

    render() {
        const columns = this.getTableColumns(this.props.params);
        const dataReceived = this.props.data;
        const best_result = dataReceived['best_configuration'];
        const test_id = dataReceived['test_id'];
        const results = dataReceived['results'];
        return (
            <BootstrapTable data={ results } columns={ columns } />
        );
    }

}