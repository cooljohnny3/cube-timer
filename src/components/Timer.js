import React from 'react'

function Timer(props) {
    return <p>{props.minutes + ':' + props.seconds + '.' + props.miliseconds}</p>
}

export default Timer;