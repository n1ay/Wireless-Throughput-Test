import MainMenu from "./MainMenu";
import { PageHeader, Panel } from "react-bootstrap";
import React, { Component } from "react";
import HeaderBackgroundImage from '../images/header.jpg';
require('../css/stylesheet.css');
var $ = require('jquery');

export default class App extends Component {
	render () {
		return (
			<PageHeader>
				<div className='header-contents'>
                    {this.addHeaderImg()}
                    <Panel>
                        <Panel.Heading>
                            <Panel.Title componentClass="h1">Throughput test web app</Panel.Title>
                        </Panel.Heading>
                        <Panel.Body>
							<MainMenu name='Rimini' />
						</Panel.Body>
                    </Panel>
				</div>
			</PageHeader>
		);
	}

    addHeaderImg() {
        let headerBg = new Image();
        headerBg.src = HeaderBackgroundImage;
    }
}
