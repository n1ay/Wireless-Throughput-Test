var $ = require('jquery');
import React, { Component } from 'react'
import { FormGroup, Radio, FormControl, HelpBlock, Checkbox, ControlLabel,
    Button, Alert, ProgressBar } from 'react-bootstrap';

export default class PerformTestMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serverIPAddress: '',
            timePerTest: '',
            protocol: 'tcp',
            transmissionDirection: 'c->s',
            useBufferLength: false,
            useWindowSize: false,
            useMaximumSegmentSize: false,
            saveResultsInDb: false,
            progress: 0,
        };

        this.handleIPFormChange = this.handleIPFormChange.bind(this);
        this.handleTimePerTestFormChange = this.handleTimePerTestFormChange.bind(this);
        this.handleProtocolChange = this.handleProtocolChange.bind(this);
        this.handleTransmissionDirectionChange = this.handleTransmissionDirectionChange.bind(this);
    }

    getIPFormValidationState() {
        if(this.state.serverIPAddress==='')
            return null;
        else if(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(this.state.serverIPAddress)) {
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

    handleTransmissionDirectionChange(e) {
        if(this.state.transmissionDirection === 'c->s')
            this.setState({transmissionDirection: 's->c'});
        else if(this.state.transmissionDirection === 's->c')
            this.setState({transmissionDirection: 'c->s'});
    }

    allParametersAreOk() {
        return this.getTimePerTestFormValidationState() === 'success'
            && this.getIPFormValidationState() === 'success'
            && (this.state.useBufferLength || this.state.useWindowSize || this.state.useMaximumSegmentSize)
    }

    render() {
        return (
            <div>
                <form>
                    <div className='flex-container-row'>
                        {this.renderIPForm()}
                        <div className='space'> </div>
                        {this.renderTimePerTestForm()}
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
                        <Button disabled={!this.allParametersAreOk()} bsStyle='primary' bsSize='large' onClick={() => {console.log(this.state);this.updateProgressBar(0,10)}}>
                            Run test!
                        </Button>
                    </div>
                </form>
            </div>
        );
    }

    renderIPForm() {
        return (
            <div className='flex-container-column'>
                <ControlLabel>Server's IP address</ControlLabel>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getIPFormValidationState()}
                >
                    <FormControl
                        type="text"
                        value={this.state.serverIPAddress}
                        placeholder="Ip address"
                        onChange={this.handleIPFormChange}
                    />
                    <FormControl.Feedback />
                    <HelpBlock bsClass={this.getIPFormValidationState()==='error'?'error-msg':'error-msg-hidden'}>Please put valid ip address.</HelpBlock>
                </FormGroup>
            </div>
        );
    }

    renderTimePerTestForm() {
        return (
            <div className='flex-container-column'>
                <ControlLabel>Time per single test in seconds</ControlLabel>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getTimePerTestFormValidationState()}
                >
                    <FormControl
                        type="number"
                        value={this.state.timePerTest}
                        placeholder="Time per test"
                        onChange={this.handleTimePerTestFormChange}
                    />
                    <FormControl.Feedback />
                    <HelpBlock bsClass={this.getTimePerTestFormValidationState()==='error'?"error-msg":'error-msg-hidden'}>
                        {this.state.timePerTest < 100 ?'Please put valid number.':'Such long tests are not recommended.'}</HelpBlock>
                </FormGroup>
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
                    <Radio name="transmissionDirectionRadioGroup" checked={this.state.transmissionDirection==='c->s'} onChange={this.handleTransmissionDirectionChange}>
                        client -> server
                    </Radio>{' '}
                    <Radio name="transmissionDirectionRadioGroup" checked={this.state.transmissionDirection==='s->c'} onChange={this.handleTransmissionDirectionChange}>
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
                    <Alert bsStyle="warning">For UDP buffer length is only suitable parameter</Alert>
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