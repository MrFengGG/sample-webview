import React from 'react';
import ReactEcharts from 'echarts-for-react'; 

export default class NetLineChart extends React.Component{
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }
    getInitialState = () => ({option: this.getOption()});

    updateChart = (url) => {
        let option = JSON.parse(JSON.stringify(this.state.option))
        fetch(url,{}).then(response => response.json()).then((json) => {
            if(this.props.parse){
                json = this.props.parse(json);
            }
            if(option.xAxis[0].data.length > 90){
                option.xAxis[0].data.shift()
                option.series[0].data.shift();
            }
            console.log(option.xAxis[0].data);
            option.xAxis[0].data.push(json['time']);
            option.series[0].data.push(json['value']);
            this.setState({
                option:option
              });
        },(err)=>{console.log(err)})
    }
    getOption = () => ({
        title: {
          text:'CPU使用率',
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['CPU使用率']
        },
        tooltip:{
          trigger: 'axis',
          axisPointer: {
              type: 'cross'
          }
        },
        toolbox: {
          show: true,
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        grid: {
          top: 60,
          left: 30,
          right: 60,
          bottom:30
        },
        dataZoom: {
          show: false,
          start: 0,
          end: 100
        },
        visualMap: {
          show: false,
          min: 0,
          max: 100,
          color: ['#BE002F', '#F20C00', '#F00056', '#FF2D51', '#FF2121', '#FF4C00', '#FF7500',
            '#FF8936', '#FFA400', '#F0C239', '#FFF143', '#FAFF72', '#C9DD22', '#AFDD22',
            '#9ED900', '#00E500', '#0EB83A', '#0AA344', '#0C8918', '#057748', '#177CB0']
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: true,
            data: []
          }
        ],
        yAxis: [
          {
            type: 'value',
            scale: true,
            name: '%',
            max: 100,
            min: 0,
          }
        ],
        series: [
          {
            name:'CPU使用率',
            type:'line',
            data:[],
            smooth: true,
          }
        ]
      });
    componentDidMount(){
        if(this.props.url){
            this.fetchUrl = setInterval(()=>{this.updateChart(this.props.url)},1000);
        }
    }
    componentWillUnmount(){
        clearInterval(this.fetchUrl);
    }

    render(){
        return (
        <ReactEcharts
                    option={this.state.option}
                    style={{height: 400}}
                     />)
    }
}