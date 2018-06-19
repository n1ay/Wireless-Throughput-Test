import TimePerTestForm from "./TimePerTestForm";

var $ = require('jquery');
import React, { Component } from 'react'
import { FormGroup, Radio, FormControl, HelpBlock, Checkbox, ControlLabel,
    Button, Alert, ProgressBar } from 'react-bootstrap';

import IPForm from "./IPForm";
import ResultsView from "./ResultsView";

export default class PerformTestMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serverIPAddress: '',
            timePerTest: '',
            protocol: 'tcp',
            reversedTransmissionDirection: false,
            useBufferLength: false,
            useWindowSize: false,
            useMaximumSegmentSize: false,
            saveResultsInDb: false,
            dataReceived: false,
            measure: {}
        };

        this.handleIPFormChange = this.handleIPFormChange.bind(this);
        this.handleTimePerTestFormChange = this.handleTimePerTestFormChange.bind(this);
        this.handleProtocolChange = this.handleProtocolChange.bind(this);
        this.handleTransmissionDirectionChange = this.handleTransmissionDirectionChange.bind(this);
        this.sendTestRequest = this.sendTestRequest.bind(this);
    }

    sendTestRequest() {
        const requestData = {
            'ip_address': this.state.serverIPAddress,
            'protocol': this.state.protocol,
            'time': this.state.timePerTest,
            'reversed': this.state.reversedTransmissionDirection,
            'store_in_db': this.state.saveResultsInDb,
            'buffer_length': this.state.useBufferLength,
            'window_size': this.state.useWindowSize,
            'maximum_segment_size': this.state.useMaximumSegmentSize
        };
        $.post(window.location.href + 'run', requestData, (data) => {
            this.setState({measure: data});
            console.log(this.state.measure);
            this.setState({dataReceived: true});
        })
    }


    getIPFormValidationState() {
        const IPRegexp = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if(this.state.serverIPAddress==='')
            return null;
        else if(IPRegexp.test(this.state.serverIPAddress)) {
            return 'success';
        }
        else return 'error';
    }

    getTimePerTestFormValidationState() {
        if(this.state.timePerTest==='')
            return null;
        if(/^([1-9][0-9]?)$/.test(this.state.timePerTest)) {
            return 'success';
        }
        else return 'error';
    }

    handleIPFormChange(e) {
        this.setState({ serverIPAddress: e.target.value });
    }

    handleTimePerTestFormChange(e) {
        this.setState({ timePerTest: e.target.value });
    }

    handleProtocolChange() {
        if(this.state.protocol === 'tcp') {
            this.setState({
                protocol: 'udp',
                useWindowSize: false,
                useMaximumSegmentSize: false,
            });

        }
        else if(this.state.protocol === 'udp')
            this.setState({protocol: 'tcp'});
    }

    handleTransmissionDirectionChange() {
        this.setState({reversedTransmissionDirection: !this.state.reversedTransmissionDirection})
    }

    allParametersAreOk() {
        return this.getTimePerTestFormValidationState() === 'success'
            && this.getIPFormValidationState() === 'success'
            && (this.state.useBufferLength || this.state.useWindowSize || this.state.useMaximumSegmentSize)
    }

    showIPFormErrorMsg() {
        return this.getIPFormValidationState()==='error'?'error-msg':'error-msg-hidden'
    }

    showTimePerTestErrorMsg() {
        return this.getTimePerTestFormValidationState()==='error'?"error-msg":'error-msg-hidden'
    }

    getOptimizationParameters() {
        return {
            buffer_length: this.state.useBufferLength,
            window_size: this.state.useWindowSize,
            maximum_segment_size: this.state.useMaximumSegmentSize
        }
    }

    render() {
        return (
            <div>
                <form>
                    <div className='flex-container-row'>
                        <IPForm
                            getValidationState={this.getIPFormValidationState()}
                            handleChange={this.handleIPFormChange}
                            value={this.state.serverIPAddress}
                            showErrMsg={this.showIPFormErrorMsg()}
                        />
                        <div className='space'> </div>
                        <TimePerTestForm
                            getValidationState={this.getTimePerTestFormValidationState()}
                            handleChange={this.handleTimePerTestFormChange}
                            value={this.state.timePerTest}
                            showErrMsg={this.showTimePerTestErrorMsg()}
                        />
                    </div>
                    <div className='flex-container-row'>
                        {this.renderRadioProtocol()}
                        <div className='space'> </div>
                        {this.renderRadioTransmissionDirection()}
                        <div className='space'> </div>
                        {this.renderOptimizeParamsCheckbox()}
                        <div className='space'> </div>
                        {this.renderSaveInDbCheckbox()}
                    </div>
                    <div className='space'> </div>
                    <div className='flex-container-row'>
                        <Button disabled={!this.allParametersAreOk()} bsStyle='primary' bsSize='large' onClick={this.sendTestRequest}>
                            Run test!
                        </Button>
                    </div>
                </form>
                {this.state.dataReceived && <ResultsView data={this.state.measure} params={this.getOptimizationParameters()}/>}
            </div>
        );
    }

    renderRadioProtocol() {
        return(
            <div className='flex-container-column'>
                <ControlLabel>Protocol</ControlLabel>
                <FormGroup>
                    <Radio name="protocolRadioGroup" checked={this.state.protocol==='tcp'} onChange={this.handleProtocolChange}>
                        TCP
                    </Radio>{' '}
                    <Radio name="protocolRadioGroup" checked={this.state.protocol==='udp'} onChange={this.handleProtocolChange}>
                        UDP
                    </Radio>{' '}
                </FormGroup>
            </div>
        );
    }

    renderRadioTransmissionDirection() {
        return (
            <div className='flex-container-column'>
                <ControlLabel>Transmission direction</ControlLabel>
                <FormGroup>
                    <Radio name="transmissionDirectionRadioGroup" checked={this.state.reversedTransmissionDirection===false} onChange={this.handleTransmissionDirectionChange}>
                        client -> server
                    </Radio>{' '}
                    <Radio name="transmissionDirectionRadioGroup" checked={this.state.reversedTransmissionDirection===true} onChange={this.handleTransmissionDirectionChange}>
                        server -> client
                    </Radio>{' '}
                </FormGroup>
            </div>
        );
    }

    renderOptimizeParamsCheckbox(){
        return(
            <div className='flex-container-column'>
                <ControlLabel>Optimization parameters</ControlLabel>
                <FormGroup>
                    <Checkbox onChange={() => this.setState({useBufferLength: !this.state.useBufferLength})} checked={this.state.useBufferLength}>buffer length</Checkbox>
                    <Checkbox disabled={this.state.protocol==='udp'} onChange={() => this.setState({useWindowSize: !this.state.useWindowSize})} checked={this.state.useWindowSize}>window size</Checkbox>{' '}
                    <Checkbox disabled={this.state.protocol==='udp'} onChange={() =>this.setState({useMaximumSegmentSize: !this.state.useMaximumSegmentSize})} checked={this.state.useMaximumSegmentSize}>maximum segment size</Checkbox>
                    <Alert bsStyle="warning">For UDP, buffer length is only suitable parameter</Alert>
                </FormGroup>
            </div>
        );
    }

    renderSaveInDbCheckbox(){
        return(
            <div className='flex-container-column'>
                <ControlLabel>Save results in database</ControlLabel>
                <FormGroup>
                    <Checkbox onChange={() => this.setState({saveResultsInDb: !this.state.saveResultsInDb})} checked={this.state.saveResultsInDb}>save results</Checkbox>
                </FormGroup>
            </div>
        );
    }
}