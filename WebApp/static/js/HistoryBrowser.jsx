import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Utils from "./Utils";
import paginationFactory from 'react-bootstrap-table2-paginator';

export default class HistoryBrowser extends Component {
    constructor(props) {
        super(props);
        this.handleOnSelect = this.handleOnSelect.bind(this);
        this.sendDataRequest = this.sendDataRequest.bind(this);
    }

    handleOnSelect(row, isSelect) {
        
    }

    //TODO: add endpoint here
    sendDataRequest(id, test_type) {
        $.get(window.location.href + test_type+'/'+id, (data) => {
            this.setState({testsHistoryData: data});
            console.log(this.state.testsHistoryData);
            this.setState({dataReceived: true});
        })
    }

    render() {
        const columns = [{
            dataField: '_id',
            text: 'ID'
        },{
            dataField: 'date',
            text: 'Date'
        },{
            dataField: 'test_type',
            text: 'Test type'
        },{
            dataField: 'parameters',
            text: 'Parameters'
        },{
            dataField: 'time_per_test',
            text: 'Time per test (s)'
        },{
            dataField: 'best_config',
            text: 'Best result'
        }];

        const dataReceived = this.props.data;
        const results = dataReceived.map((x) => {
            const test_instance = Object.assign({}, x);
            test_instance.best_config = Utils.prettyFormat(test_instance.best_config).throughput;
            return test_instance;
        });

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            hideSelectColumn: true,
            onSelect: this.handleOnSelect,
        };

        return (
                <BootstrapTable striped hover keyField='_id' data={ results } columns={ columns } selectRow={ selectRow } rowStyle={ rowStyle } pagination={ paginationFactory() } />
        );
    }
}