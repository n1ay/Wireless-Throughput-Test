import React, {Component} from "react";
import { FormControl, FormGroup, HelpBlock, ControlLabel } from 'react-bootstrap';

export default class IPForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='flex-container-column'>
                <ControlLabel>Server's IP address</ControlLabel>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.props.getValidationState}
                >
                    <FormControl
                        type="text"
                        value={this.props.value}
                        placeholder="Ip address"
                        onChange={this.props.handleChange}
                    />
                    <FormControl.Feedback />
                    <HelpBlock bsClass={this.props.showErrMsg}>Please put valid ip address.</HelpBlock>
                </FormGroup>
            </div>
        );
    }
}