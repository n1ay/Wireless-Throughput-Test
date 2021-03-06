import HistoryBrowser from "./HistoryBrowser";

var $ = require('jquery');
import React, { Component } from 'react'
import { Button, Carousel, Alert, ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';
import Utils from "./Utils";
import ResultsView from "./ResultsView";
import LineChart from "./LineChart";

export default class BrowseHistoricalResultsMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            testsHistoryData: {},
            testsHistoryReceived: false,
            certainTestData: {},
            certainTestDataReceived: false,
            certainTestParameters: {},
            certainTestBestResult: {},
            certainTestInstance: {},
            carouselIndex: 0,
            direction: null,
            loading: false,
        };
        this.sendTestsHistoryRequest = this.sendTestsHistoryRequest.bind(this);
        this.handleSelectCarousel = this.handleSelectCarousel.bind(this);
        this.handleOnSelectRow = this.handleOnSelectRow.bind(this);
        this.sendTestsHistoryRequest();
    }

    handleSelectCarousel(selectedIndex, e) {
        this.setState({
            carouselIndex: selectedIndex,
            direction: e.direction
        });
    }

    handleOnSelectRow(row, isSelect) {
        this.setState({
            loading: true
        });
        this.sendCertainTestDataRequest(row._id, Utils.getRepositoryEndpoint(row.test_type));
        const params = {
            buffer_length: false,
            window_size: false,
            maximum_segment_size: false
        };
        let bestConfiguration;
        let testInstance;
        for(let i of this.state.testsHistoryData) {
            if(i._id === row._id) {
                bestConfiguration = i.best_configuration;
                testInstance = i;
            }
        }
        for(let i of Object.keys(params)) {
            if(Object.keys(bestConfiguration).includes(i))
                params[i] = true;
        }
        this.setState({
            certainTestParameters: params,
            certainTestBestResult: bestConfiguration,
            certainTestInstance: testInstance
        });
        this.setState({});
    }

    //get list of all measurements in one test (e.g. all measurements in tcp -R test)
    sendCertainTestDataRequest(id, repositoryEndpoint) {
        $.get(window.location.href + repositoryEndpoint+'/'+'test/'+id, (data) => {
            this.setState({
                certainTestData: {
                    best_configuration: this.state.certainTestBestResult,
                    results: data,
                    test_instance: this.state.certainTestInstance
                },
                certainTestDataReceived: true,
                loading: false,
                carouselIndex: 1,
            });
        })
    }

    //get list of all tests
    sendTestsHistoryRequest() {
        $.get(window.location.href + 'tests/get', (data) => {
            this.setState({
                testsHistoryData: data,
                testsHistoryReceived: true,
            });
        })
    }

    render() {
        const index = this.state.carouselIndex;
        const direction = this.state.direction;
        return (
            <div className='flex-container-column'>
                <Carousel
                    activeIndex={index}
                    direction={direction}
                    onSelect={this.handleSelectCarousel}
                    controls = {false}
                    indicators = {false}>
                    <Carousel.Item>
                        <Alert bsStyle="info" className='hint-alert'>Click on row to get more details</Alert>
                            {this.state.testsHistoryReceived && <HistoryBrowser
                                data={this.state.testsHistoryData}
                                handleOnSelectRow={this.handleOnSelectRow}
                                loading={this.state.loading}/>
                            }
                            <div className='flex-container-row'>
                                <Button bsStyle='success' bsSize='large' onClick={this.sendTestsHistoryRequest}>
                                    Refresh
                                </Button>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        {this.state.certainTestDataReceived && <ResultsView data={this.state.certainTestData} params={this.state.certainTestParameters} />}
                    </Carousel.Item>
                    <Carousel.Item>
                        {this.state.certainTestDataReceived && <LineChart data={this.state.certainTestData} />}
                    </Carousel.Item>
                </Carousel>
                {this.state.carouselIndex>0 && <div className='flex-container-row'>
                    <Button className='navigation-button' bsStyle='success' bsSize='large' onClick={() => {this.setState({carouselIndex: 0})}}>
                        {'<<'}
                    </Button>
                    <div className='space'> </div>
                    <Button className='navigation-button' bsStyle='success' bsSize='large' onClick={() => {
                        this.state.carouselIndex===1?this.setState({carouselIndex: 2}):this.setState({carouselIndex: 1})
                    }}>
                        {this.state.carouselIndex===1?'>':'<'}
                    </Button>
                </div>}
            </div>
        );
    }

}
