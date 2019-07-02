import React from 'react';

// Contains calculated averages for toaal, 5, and 10
// Contains best times for total, 3/5, and 10/12

function getAverage(times){
    let sum = 0; // milliseconds
    for(let time of times) {
        sum += time.minutes * 60000;
        sum += time.seconds * 1000;
        sum += time.miliseconds;
    }
    sum = sum / times.length;
    let minutes = Math.round(sum / 60000);
    sum = sum % 60000;
    let seconds = Math.round(sum / 1000);
    sum = Math.round(sum % 1000);  // TODO make round to 2 decimal places
    return ' ' + minutes + ':' + seconds + '.' + sum;
}

function getBest(times) {

}

function Stats(props) {
    return (
        <div className="background stats">
            <table>
                <tbody>
                    <tr>
                        <td>Average: {props.times.length>=1 ? getAverage(props.times) : " --:--.--"}</td>
                    </tr>
                    <tr>
                        <td>Average 5: {props.times.length>=5 ? getAverage(props.times.slice(props.times.length - 5)) : " --:--.--"}</td> 
                    </tr>
                    <tr>
                        <td>Average 10: {props.times.length>=10 ? getAverage(props.times.slice(props.times.length - 10)) : " --:--.--"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Stats;