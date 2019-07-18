import React from 'react';
import NetLineChart from "../../component/NetChart/NetLineChart"

export default class DashBoard extends React.Component{
    render(){
        return (
        <NetLineChart 
            parse={(json) => { 
                const date = new Date();
                return {time:date.getHours()+':'+date.getMinutes()+':'+date.getSeconds(),
                "value":(parseFloat(json['measurements'][0]["value"])*100).toFixed(2)} 
            }}
            url="/actuator/metrics/system.cpu.usage">
        </NetLineChart>)
    }
}