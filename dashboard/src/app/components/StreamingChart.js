//@flow

import React from 'react';
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton';
import { Pause, PlayArrow } from '@material-ui/icons';
import Chart from 'chart.js';
import 'chartjs-plugin-streaming';



type Props = {
    classes: any,
}
type State = {
    pause: boolean,
    
}



const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });
  

class StreamingChart extends React.Component<Props, State> {
    myChart = null
    constructor(props:Props){
        super(props)
        this.state = {
            pause: false,
        }


    }
    componentDidMount() {
        // console.log('componentDidMount', this.props.callback, this.receiver)
        // this.props.callback(this.receiver)

        // setInterval(() => {
        //     this.onReceive({x: Date.now(), y: 1*Math.random()});
        // }, 2000);
        this.updateCanvas();



    }



    onReceive({x,y}){
        // console.log('onReceive', x, y)

        // append the new data to the existing chart data
        this.myChart.data.datasets[0].data.push({
            x,
            y,
        });

        this.myChart.update({
            preservation: true
        });


    }

    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        let color = Chart.helpers.color;

        this.myChart = new Chart(ctx, {
                type: 'bar',               // 'line', 'bar', 'bubble' and 'scatter' types are supported
                data: {
                    datasets: [{
                        label: 'Images',

                        data: [],            // empty at the beginning
                        borderWidth: 1,
                        backgroundColor: color('rgb(0, 0, 255)').alpha(0.5).rgbString(),
                        borderColor: 'rgb(54, 162, 235)',
                        fill: true,
                   
                    }]
                },
    
                options: {
                    // onHover: (evt) => console.log("onHover", evt),
                    onClick: (evt) => {
                        // console.log("onClick", evt)
                        let activePoints = this.myChart.getElementsAtEvent(evt);
                        // console.log('activePoints',activePoints)
                        // console.log(this.myChart.data.datasets[0].data)
                        // console.log('_datasetIndex', activePoints[0]._datasetIndex)
                        // console.log('_index',activePoints[0]._index)
                    },
                    scales: {
                        xAxes: [{
                            type: 'realtime',   // x axis will auto-scroll from right to left
                            realtime: {         // per-axis options
                                duration: 300000,    // data in the past 20000 ms will be displayed
                                // refresh: 1000,      // onRefresh callback will be called every 1000 ms
                                delay: 1000,        // delay of 1000 ms, so upcoming values are known before plotting a line
                                pause: this.state.pause,       // chart is not paused
                                ttl: undefined,     // data will be automatically deleted as it disappears off the chart
            
                            },
                            barPercentage: 0.1,
                            categoryPercentage: 1.0,
                            // barThickness: 6,
                            // maxBarThickness: 8,
                            // minBarLength: 2,
                            gridLines: {
                                offsetGridLines: true
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                suggestedMin: 0,
                                suggestedMax: 1,
                                stepSize: 1,
                            }
                        }]
                    },
                    plugins: {
                        streaming: {            // per-chart option
                            frameRate: 30       // chart is drawn 30 times every second
                        }
                    }
                }
            

        });  


    }
    render() {
        // console.log('render', this)
        const { classes } = this.props;
        if (this.props.currentData){

            // this.onReceive({x: new Date (this.props.currentData.detectedAt), y: 1});
            this.onReceive({x: new Date (), y: 1});
        }
        return (
            <div>
                <IconButton  aria-label="Play" className={classes.button}
                    color="secondary" 
                    onClick ={()=>{
                        this.myChart.options.scales.xAxes[0].realtime.pause = !this.state.pause
                        this.setState({pause: !this.state.pause})
                        this.myChart.update({
                            preservation: true
                        })
                    }}>
                    {this.state.pause ?
                        <PlayArrow/>
                        :
                        <Pause /> 
                    }
                </IconButton>
                <canvas ref="canvas" width={100} height={20}/>
            </div>
        );
    }}


export default withStyles(styles)(StreamingChart);
