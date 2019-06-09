import React from 'react'

function ListItem(props) {
    const time = props.time;
    const text = time.minutes + ':' + time.seconds + ':' + time.miliseconds;
    return (
        <li key={props.index}>{text} <button onClick={props.removeTime.bind(this, time.id)}>X</button></li>
    );
}

export default ListItem;