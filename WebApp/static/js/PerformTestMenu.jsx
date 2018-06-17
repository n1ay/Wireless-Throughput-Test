var $ = require('jquery');
import React, { Component } from 'react'
import { Button, ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';
import { FormGroup, Radio, FormControl, HelpBlock, Checkbox } from 'react-bootstrap';

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
            useMaximumSegmentSize: false
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

    render() {
        return (
            <div>
                <form>
                    <div className='flex-container-row'>
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
                        <div className='space'> </div>
                        <FormGroup
                            controlId="formBasicText"
                            validationState={this.getTimePerTestFormValidationState()}
                        >
                            <FormControl
                                type="number"
                                value={this.state.timePerTest}
                                placeholder="Time per single test (s)"
                                onChange={this.handleTimePerTestFormChange}
                            />
                            <FormControl.Feedback />
                            <HelpBlock bsClass={this.getTimePerTestFormValidationState()==='error'?"error-msg":'error-msg-hidden'}>
                                {this.state.timePerTest < 100 ?'Please put valid number.':'Such long tests are not recommended.'}</HelpBlock>
                        </FormGroup>
                    </div>
                    <div className='flex-container-row'>
                        <FormGroup>
                            <Radio name="radioProtocolGroup" checked={this.state.protocol==='tcp'} onChange={this.handleProtocolChange}>
                                TCP
                            </Radio>{' '}
                            <Radio name="radioProtocolGroup" checked={this.state.protocol==='udp'} onChange={this.handleProtocolChange}>
                                UDP
                            </Radio>{' '}
                        </FormGroup>
                        <div className='space'> </div>
                        <FormGroup>
                            <Radio name="radioTransmissionDirectionGroup" checked={this.state.transmissionDirection==='c->s'} onChange={this.handleTransmissionDirectionChange}>
                                client -> server
                            </Radio>{' '}
                            <Radio name="radioTransmissionDirectionGroup" checked={this.state.transmissionDirection==='s->c'} onChange={this.handleTransmissionDirectionChange}>
                                server -> client
                            </Radio>{' '}
                        </FormGroup>
                        <div className='space'> </div>
                        <FormGroup>
                                <Checkbox onChange={() => this.setState({useBufferLength: !this.state.useBufferLength})} checked={this.state.useBufferLength}>buffer length</Checkbox>
                                <Checkbox disabled={this.state.protocol==='udp'} onChange={() => this.setState({useWindowSize: !this.state.useWindowSize})} checked={this.state.useWindowSize}>window size</Checkbox>{' '}
                                <Checkbox disabled={this.state.protocol==='udp'} onChange={() =>this.setState({useMaximumSegmentSize: !this.state.useMaximumSegmentSize})} checked={this.state.useMaximumSegmentSize}>maximum segment size</Checkbox>
                        </FormGroup>
                    </div>
                    <div className='space'> </div>
                    <Button disabled={!(this.getTimePerTestFormValidationState()==='success') || !(this.getIPFormValidationState()==='success')} bsStyle='primary' onClick={() => console.log(this.state)}>
                        Run test!
                    </Button>
                </form>
            </div>
        );
    }
}