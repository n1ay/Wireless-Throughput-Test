var $ = require('jquery');
import React, { Component } from 'react'
import { Button, Panel, PanelGroup, ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';
import BrowseHistoricalResultsMenu from "./BrowseHistoricalResultsMenu";
import PerformTestMenu from "./PerformTestMenu";

export default class MainMenu extends Component {
	constructor(props) {
    	super(props);
    	
	}

	render () {
		return (
			<div className='flex-container-column'>
				<PanelGroup defaultActiveKey={"1"} accordion id="main-menu">
		            {this.renderPerformTestPanel()}
		            {this.renderBrowseHistoricalResultsPanel()}
		        </PanelGroup>
    		</div>
		)
	}

	renderPerformTestPanel() {
	    return (
            <Panel eventKey="1">
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
            <Panel eventKey="2">
                <Panel.Heading>
                    <Panel.Title toggle>Browse Historical Results</Panel.Title>
                </Panel.Heading>
                <Panel.Collapse>
                    <Panel.Body>
                        <BrowseHistoricalResultsMenu/>
                    </Panel.Body>
                </Panel.Collapse>
            </Panel>
        );
    }

}
