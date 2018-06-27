import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Line } from 'react-chartjs-2';
import Slider from 'rc-slider';
import { FormGroup, Radio, ControlLabel, Alert } from 'react-bootstrap';
import Utils from "./Utils";

export default class LineChart extends Component {
    constructor(props) {
        super(props);

        this.beforeBodyTooltipCallback = this.beforeBodyTooltipCallback.bind(this);
    }

    beforeBodyTooltipCallback(tooltipItem, data) {
        const results = this.props.data.results.map(Utils.prettyFormat);
        const showParams = ['buffer_length', 'window_size', 'maximum_segment_size'];
        let text = [];
        for(let i of Object.keys(results[tooltipItem[0].index])) {
            for(let j of showParams)
                if(i===j)
                    text.push(Utils.formatParameters(i)+': '+results[tooltipItem[0].index][i]);
        }
        return text;
    }

    render() {

        const results = this.props.data.results;
        const throughputMeasurements = results.map(x => x.throughput);
        const chartLabels = new Array(throughputMeasurements.length);
        for(let i=0; i<throughputMeasurements.length; i++)
            chartLabels[i]=i;

        const data = {
            labels: chartLabels,
            datasets: [{
                label: 'Throughput',
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
                pointRadius: 2,
                pointHitRadius: 10,
                data: throughputMeasurements,
            }]
        };

        const options = {
            legend: {
                position: 'right'
            },
            tooltips: {
                    callbacks: {
                        title: (tooltipItem, data) => {
                            return 'Measurement number : ' + tooltipItem[0].xLabel;
                        },
                        beforeBody: this.beforeBodyTooltipCallback,
                        label: (tooltipItem, data) => {
                            return data.datasets[0].label + ': ' + Utils.getValueWithMetricPrefix(tooltipItem.yLabel, true);
                        }
                }
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
							display: true,
							labelString: 'Throughput'
						},
                    ticks: {
                        callback: (value, index, values) => {
                            return Utils.getValueWithMetricPrefix(value, true);
                        }
                    }
                }],
                xAxes: [{
                    scaleLabel: {
							display: true,
							labelString: 'Measurement number'
						}
                }],
            }
        };

        return (
            <div>
                <h2 style={{'textAlign': 'center'}}>Throughput chart</h2>
                <h4 style={{'textAlign': 'center'}}>Optimization algorithm consecutive throughput measurements</h4>
                <br/>
                <Line data={data} options={options} />
                <div className='space'> </div>
            </div>
        );
    }
}
