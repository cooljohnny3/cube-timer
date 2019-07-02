import React from 'react'
import ListItem from './ListItem'

function List(props) {
    const times = props.times;
    const items = times.map((time, index) => {
        return (
            <ListItem key={index}
                index={index}
                time={time}
                removeTime={props.removeTime}
            />
        )
    });

    return (
        <ol className="background list">{items}</ol>
    )
}

export default List;