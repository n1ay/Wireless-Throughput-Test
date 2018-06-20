import HistoryBrowser from "./HistoryBrowser";

var $ = require('jquery');
import React, { Component } from 'react'
import { Button, ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';

export default class BrowseHistoricalResultsMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testsHistoryData: {},
            dataReceived: false
        };
        this.sendDataRequest = this.sendDataRequest.bind(this);
        this.sendDataRequest();
    }

    sendDataRequest() {
        $.get(window.location.href + 'tests/get', (data) => {
            this.setState({testsHistoryData: data});
            console.log(this.state.testsHistoryData);
            this.setState({dataReceived: true});
        })
    }

    render() {
        return (
            <div className='flex-container-column'>
                {this.state.dataReceived && <HistoryBrowser data={this.state.testsHistoryData}/>}
                <div className='space'> </div>
                <div className='flex-container-row'>
                    <Button bsStyle='success' bsSize='large' onClick={this.sendDataRequest}>
                        Refresh
                    </Button>
                </div>
            </div>
        );
    }

}