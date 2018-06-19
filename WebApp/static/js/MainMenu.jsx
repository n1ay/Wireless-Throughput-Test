var $ = require('jquery');
import React, { Component } from 'react'
import { Button, Panel, ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';
import BrowseHistoricalResults from "./BrowseHistoricalResults";
import PerformTestMenu from "./PerformTestMenu";

export default class MainMenu extends Component {
	constructor(props) {
    	super(props);
	}

	render () {
		return (
			<div className='flex-container-column'>
                {this.renderPerformTestPanel()}
                {this.renderBrowseHistoricalResultsPanel()}
    		</div>
		)
	}

	renderPerformTestPanel() {
	    return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title toggle>Perform Test</Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <PerformTestMenu/>
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }

    renderBrowseHistoricalResultsPanel() {
	    return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title toggle>Browse Historical Results</Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <BrowseHistoricalResults/>
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }

}
