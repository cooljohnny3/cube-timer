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

function getBest(times) {   // BIG ISSUE called on every tick whicvh slows down app
    let bestTime;
    let sum = 0; // milliseconds
    let best = 0;
    for(let i in times) {
        sum = 0;
        sum += times[i].minutes * 60000;
        sum += times[i].seconds * 1000;
        sum += times[i].miliseconds;

        if(best === 0 || sum < best) {
            console.log("new Best " + times[i].minutes + ' ' + times[i].seconds + ' ' + times[i].miliseconds);
            best = sum;
            bestTime = times[i];
        }
    }
    return ' ' + bestTime.minutes + ':' + bestTime.seconds + '.' + bestTime.miliseconds;
}

function Stats(props) {
    return (
        <div className="background stats">
            <table>
                <tbody>
                    <tr>
                        <td>Average: {props.times.length>=1 ? getAverage(props.times) : " --:--.--"}</td>
                        <td>Best: {props.times.length>=1 ? getBest(props.times) : " --:--.--"}</td>
                    </tr>
                    <tr>
                        <td>Average 5: {props.times.length>=5 ? getAverage(props.times.slice(props.times.length - 5)) : " --:--.--"}</td>
                        <td>Best 5: {props.times.length>=5 ? getBest(props.times) : " --:--.--"}</td>
                    </tr>
                    <tr>
                        <td>Average 10: {props.times.length>=10 ? getAverage(props.times.slice(props.times.length - 10)) : " --:--.--"}</td>
                        <td>Best 10: {props.times.length>=10 ? getBest(props.times) : " --:--.--"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Stats;