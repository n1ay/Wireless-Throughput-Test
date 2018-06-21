import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import Utils from "./Utils";
import paginationFactory from 'react-bootstrap-table2-paginator';
import overlayFactory from 'react-bootstrap-table2-overlay';

export default class HistoryBrowser extends Component {
    constructor(props, context) {
        super(props, context);
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
            dataField: 'best_configuration',
            text: 'Best result'
        }];

        const dataReceived = this.props.data;
        const results = dataReceived.map((x) => {
            const test_instance = Object.assign({}, x);
            test_instance.best_configuration = Utils.prettyFormat(test_instance.best_configuration).throughput;
            test_instance.parameters = test_instance.parameters.map(x => Utils.formatParameters(x)).reduce((x,y) => x+', '+y);
            return test_instance;
        });

        const selectRow = {
            mode: 'checkbox',
            clickToSelect: true,
            hideSelectColumn: true,
            onSelect: this.props.handleOnSelectRow,
        };

        const paginationOptions = {
            sizePerPageList: [{
                text: '25', value: 25
            }, {
                text: '50', value: 50
            }],
            hidePageListOnlyOnePage: false
        };

        return (
                <BootstrapTable striped hover keyField='_id' data={ results }
                                columns={ columns }
                                loading={ this.props.loading }
                                selectRow={ selectRow }
                                pagination={ paginationFactory(paginationOptions) }
                                overlay={ overlayFactory({ spinner: true, background: 'rgba(192,192,192,0.3)' }) }
                />
        );
    }
}