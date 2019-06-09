import React from 'react'
import './Timer.css'

function Timer(props) {
    let time = '';
    if(props.minutes < 10) {
        time += '0';
    }
    time += props.minutes + ':';
    if(props.seconds < 10) {
        time += '0';
    }
    time += props.seconds + ':';
    if(props.miliseconds < 10) {
        time += '0';
    }
    time += props.miliseconds;
    
    return <p className="timer background">{time}</p>
}

export default Timer;