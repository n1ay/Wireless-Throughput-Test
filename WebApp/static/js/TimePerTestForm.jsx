import React, { Component } from 'react';
import { ControlLabel, FormGroup, FormControl, HelpBlock } from 'react-bootstrap'

export default class TimePerTestForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='flex-container-column'>
                <ControlLabel>Time per single test in seconds</ControlLabel>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.props.getValidationState}
                >
                    <FormControl
                        type="number"
                        value={this.props.value}
                        placeholder="Time per test"
                        onChange={this.props.handleChange}
                    />
                    <FormControl.Feedback />
                    <HelpBlock bsClass={this.props.showErrMsg}>
                        {this.props.value < 100 ?'Please put a valid number.':'Such long tests are not recommended.'}</HelpBlock>
                </FormGroup>
            </div>
        );
    }
}