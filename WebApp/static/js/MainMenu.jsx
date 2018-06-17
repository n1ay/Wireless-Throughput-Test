var $ = require('jquery');
import React, { Component } from 'react'
import { Button, Panel, ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';
import BrowseHistoricalTests from "./BrowseHistoricalTests";
import PerformTestMenu from "./PerformTestMenu";

export default class MainMenu extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    	    greeting: 'Hello ' + this.props.name,
        };
    	// This binding is necessary to make 'this' work in the callback    
    	this.getPythonHello = this.getPythonHello.bind(this);
	}
	
	personaliseGreeting(greeting) {
		this.setState({greeting: greeting + ' ' + this.props.name + '!'});
	}
	
	getPythonHello() {
		$.get(window.location.href + 'hello', (data) => {  
		console.log(data);
		this.personaliseGreeting(data);
		});
	}

	render () {
		return (
			<div className='flex-container-column'>
    			<h1>{this.state.greeting}</h1>
    			<br/>
                <div className='flex-container-row'>
                    <Button bsSize="large" bsStyle="danger" onClick={this.getPythonHello}>Say Hello!</Button>
                    <br/>
                </div>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title toggle>Perform Test Menu</Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <PerformTestMenu/>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title toggle>Browse Historical Results</Panel.Title>
                    </Panel.Heading>
                    <Panel.Collapse>
                        <Panel.Body>
                            <BrowseHistoricalTests/>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>
    		</div>
		)
	}
}