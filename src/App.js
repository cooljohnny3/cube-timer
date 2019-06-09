import React from 'react';
import List from './components/List'
import uuid from 'uuid'
import './App.css';

import Timer from './components/Timer'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.tick = this.tick.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.removeTime = this.removeTime.bind(this);
        this.state = {
            times: [],
            miliseconds: 0,
            seconds: 0,
            minutes: 0
        };
    }

    componentWillMount() {
        document.addEventListener('keydown', (e) => this.handleSpace(e));
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

    render() {
        return (
            <div className="App">
                <Timer 
                    minutes={this.state.minutes}
                    seconds={this.state.seconds}
                    miliseconds={this.state.miliseconds}
                />
                <List 
                    times={this.state.times}
                    removeTime={this.removeTime}
                />
            </div>
        );
    }
}

export default App;
