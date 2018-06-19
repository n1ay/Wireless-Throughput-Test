import MainMenu from "./MainMenu";
import { PageHeader, Panel } from "react-bootstrap";
import React, { Component } from "react";
require('../css/stylesheet.css');
var $ = require('jquery');

export default class App extends Component {
	render () {
		return (
			<PageHeader>
				<div className='header-contents'>
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title componentClass="h1">Throughput test web app</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
							<MainMenu />
						</Panel.Body>
                    </Panel>
				</div>
			</PageHeader>
		);
	}
}
