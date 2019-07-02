import React from 'react';
import uuid from 'uuid'
import './App.css';

import MoveList from './components/MoveList'
import Timer from './components/Timer'
import List from './components/List'
import Stats from './components/Stats'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this);
        this.removeTime = this.removeTime.bind(this);
        this.state = {
            moveList: '',
            times: [],
            miliseconds: 0,
            seconds: 0,
            minutes: 0
        };
    }

    componentWillMount() {
        document.addEventListener('keydown', (e) => this.handleSpace(e));
        this.newList();
    }

    componentWillUnmount() {
        this.stopTimer();
    }

    addTime() {
        const times = this.state.times;
        const time = {
                        id: uuid.v4(),
                        minutes: this.state.minutes,
                        seconds: this.state.seconds,
                        miliseconds: this.state.miliseconds
                    }
        this.setState({times: times.concat([time])})
    }

    removeTime(id) {
        const times = this.state.times;
        console.log('remove')
        this.setState({
            times: times.filter(time => time.id !== id)
        })
    }

    tick() {
        let miliseconds = this.state.miliseconds + 1;
        let seconds = this.state.seconds;
        let minutes = this.state.minutes;

        if (miliseconds >= 100) {
            miliseconds = 0;
            seconds++;
        }

        if (seconds >= 60) {
            seconds = 0;
            minutes++;
        }

        this.setState({
            miliseconds: miliseconds,
            seconds: seconds,
            minutes: minutes
        });
    }

    startTimer() {
        if (!this.timer) {
            this.timer = setInterval(this.tick, 10);
            this.setState({
                miliseconds: 0,
                seconds: 0,
                minutes: 0
            })
        }
    }

    stopTimer() {
        clearInterval(this.timer);
        this.timer = null;
        this.addTime();
        this.newList();
    }

    handleSpace(e) {
        if (e.key === ' ') {
            if (!this.timer) {
                this.startTimer();
            } else {
                this.stopTimer();
            }
        }
    }


    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getMove() {
        const directions = ['U', 'D', 'L', 'R', 'F', 'B', 'U\'', 'D\'', 'L\'', 'R\'', 'F\'', 'B\''];
        if(this.getRandomInt(10) === 0) {
            return '2' + directions[this.getRandomInt(12)];
        }
        return directions[this.getRandomInt(12)];
    }

    newList() {
        let newList = '';
        for(let i=0; i < 15; i++) {
            newList += this.getMove() + ' ';
        }
        this.setState({
            moveList: newList
        });
    }

    render() {
        return (
            <div className="App">
                <div className="container">
                    <div className="main">
                        <h1>Cube Timer</h1>
                        <MoveList 
                            moveList={this.state.moveList}
                        />
                        <Timer 
                            minutes={this.state.minutes}
                            seconds={this.state.seconds}
                            miliseconds={this.state.miliseconds}
                        />
                    </div>
                    <List
                        times={this.state.times}
                        removeTime={this.removeTime}
                    />
                    <Stats times={this.state.times}/>
                </div>
            </div>
        );
    }
}

export default App;
