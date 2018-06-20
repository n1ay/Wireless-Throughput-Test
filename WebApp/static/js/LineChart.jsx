import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Line } from 'react-chartjs-2';
import Slider from 'rc-slider';
import { FormGroup, Radio, ControlLabel, Alert } from 'react-bootstrap';

export default class LineChart extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const data = {
            labels: ['l1', 'l2', 'l3', 'l4', 'l5', 'l6'],
            datasets: [{
                label: 'dummy label',
                fill: false,
                lineTension: 0.1,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,1)',
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: 'rgba(75,192,192,1)',
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                pointHoverBorderColor: 'rgba(220,220,220,1)',
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [1,2,3,4,5,6,7]
            }]
        };

        return (
            <div>
                <h2>Throughput line chart</h2>
                <Line data={data} />
                <div className='flex-container-row'>
                    <div className='flex-container-column'>
                        <ControlLabel className='projection-label'>Choose parameter to visualize throughput~[chosen parameter] graph </ControlLabel>
                        <FormGroup>
                            <Radio name={"lineChartRadioGroup"+this.props.group}>
                                Buffer Length
                            </Radio>
                            <Radio name={"lineChartRadioGroup"+this.props.group}>
                                Window Size
                            </Radio>
                            <Radio name={"lineChartRadioGroup"+this.props.group}>
                                Maximum Segment Size
                            </Radio>
                            <Alert bsStyle="warning" className='projection-alert'>Since there is a feature to optimize throughput with more than one parameter,
                                it is impossible to draw all parameters graph, because it will be 4D graph and 3D graphs are often hard to analyse.
                                That is why here is a projection of results onto a plane (2D chart).</Alert>
                        </FormGroup>
                    </div>
                    <div className='space'> </div>
                    <div className='flex-container-column'>
                        <ControlLabel className='projection-label'>Choose values of parameters to project at</ControlLabel>
                        <br/>
                        <ControlLabel className='projection-value'>Buffer length projection value: </ControlLabel>
                        <br/>
                        <Slider min={0} max={5} className='chart-slider'/>
                        <br/>
                        <ControlLabel className='projection-value'>Window size projection value: </ControlLabel>
                        <br/>
                        <Slider min={0} max={5} className='chart-slider'/>
                        <br/>
                        <ControlLabel className='projection-value'>Maximum segment size projection value: </ControlLabel>
                        <br/>
                        <Slider min={0} max={5} className='chart-slider'/>
                        </div>
                    </div>
            </div>
        );
    }
}