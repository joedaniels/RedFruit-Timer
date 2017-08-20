import React, {Component} from 'react'

export default class Timer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            clock: this.props.pomodoroLength,
            timerLength: this.props.pomodoroLength,
            breakNumber: 1
        }

        this.tick = this.tick.bind(this)
        this.countdown = this.countdown.bind(this)
        this.pause = this.pause.bind(this)
        this.reset = this.reset.bind(this)
    }

    setBreak(breakType, breakNumber) {
        return this.setState({
            clock: breakType,
            timerLength: breakType,
            breakNumber: breakNumber
        })
    }

    tick() {
        if (this.state.clock === 0) {
            if (this.props.alarmEnabled) {
                this.playAlarm()
            }
            if (this.props.notificationsEnabled) {
                this.notification(this.state.timerLength)
            }
            this.pause()
            if (this.state.timerLength === (this.props.shortBreak || this.props.longBreak)) {
                this.setState({
                    clock: this.props.pomodoroLength,
                    timerLength: this.props.pomodoroLength
                })
            } else {
                if (this.state.breakNumber > 3) {
                    this.setBreak(this.props.longBreak, 1)
                } else {
                    this.setBreak(this.props.shortBreak, this.state.breakNumber + 1)
                }
            }
        } else {
            this.setState({ clock: this.state.clock - 1 })
        }
    }

    countdown() {
        if (!this.interval) {
            this.interval = setInterval(this.tick, 1000)
        }
    }

    pause() {
        clearInterval(this.interval)
        this.interval = false
    }

    reset() {
        if (this.interval) {
            this.pause()
            this.setState({ clock: this.state.timerLength })
        } else {
            this.setState({ clock: this.state.timerLength })
        }
    }

    prettifyClock(timeLeft) {
        let m = Math.floor(timeLeft / 60)
        let s = Math.floor(timeLeft % 60)

        return ((m < 10 ? "0" : "") + m) + ":" + ((s < 10 ? "0" : "") + s)
    }

    playAlarm() {
        var alarm = document.getElementById('alarm')
        alarm.play()
    }

    notification(periodCompleted) {
        if (periodCompleted === this.props.shortBreak) {
            return new Notification("5 Minute Break Over!", {
                body: "Time for another Pomodoro.",
                icon: "./assets/img/red-fruit-timer.png",
                requireInteraction: true
            });
        } else if (periodCompleted === this.props.longBreak) {
            return new Notification("15 Minute Break Over!", {
                body: "Time to get back to work.",
                icon: "./assets/img/red-fruit-timer.png",
                requireInteraction: true
            });
        } else {
            return new Notification("Pomodoro Finished!", {
                body: "Time for a break. Whoop!",
                icon: "./assets/img/red-fruit-timer.png",
                requireInteraction: true
            });
        }
    }

    static defaultProps = {
        pomodoroLength: 1500,
        shortBreak: 300,
        longBreak: 900
    }

    render() {
        return (
            <section>
                <span className="timer">{this.prettifyClock(this.state.clock)}</span>
                <button className="btn btn-primary btn-lg" onClick={this.countdown}>Start</button>
                <button className="btn btn-secondary btn-sm" onClick={this.pause}>Pause</button>
                <button className="btn btn-dark btn-sm" onClick={this.reset}>Reset</button>
                <audio src='./assets/audio/alarm.mp3' id="alarm"></audio>
            </section>
        )
    }
}