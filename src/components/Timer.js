import React, { Component } from 'react'

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

  tick() {
    if (this.state.clock === 0) {
      // timer has finished

      this.pause()
      
      if (this.state.timerLength === this.props.shortBreak || this.state.timerLength === this.props.longBreak) {
        // there has just been a break, time for a pomodoro

        this.setState({
          clock: this.props.pomodoroLength,
          timerLength: this.props.pomodoroLength
        })
      } else {
        // we've just done a pomodoro, time for a break

        if (this.state.breakNumber > 3) {
          // this is the fourth break, make it a long one

          this.setState({
            clock: this.props.longBreak,
            timerLength: this.props.longBreak,
            breakNumber: 1
          })
        } else {
          // time for a short break

          this.setState({
            clock: this.props.shortBreak,
            timerLength: this.props.shortBreak,
            breakNumber: this.state.breakNumber + 1
          })
        }
      }
    } else {
      // timer is counting down

      let clock = this.state.clock - 1

      this.setState({
        clock: clock
      })
    }
  }

  // Start the timer
  countdown() {
    if (!this.interval) {
      // prevent timer being started multiple times

      this.interval = setInterval(this.tick, 1000)
    }
  }

  // Pause the timer
  pause() {
    clearInterval(this.interval)
    this.interval = false
  }

  // Reset the clock on the timer to 25:00
  reset() {
    if (this.interval) {
      // timer is running, so pause it and reset the clock

      this.pause()

      this.setState({
        clock: this.state.timerLength
      })
    } else {
      // timer is already paused so only need to reset clock

      this.setState({
        clock: this.state.timerLength
      })
    }
  }

  // Format the clock from seconds into minutes:seconds
  prettifyClock(clock) {
    let m = Math.floor(clock / 60)
    let s = Math.floor(clock % 60)

    let newClock = this.addZero(m) + ":" + this.addZero(s)

    return newClock
  }

  // Add a 0 before numbers less than 10, so the clock shows e.g 04:09
  addZero(n) {
    return (n < 10 ? "0" : "") + n
  }

  static defaultProps = {
    pomodoroLength: 1,
    shortBreak: 2,
    longBreak: 3
  }

  render() {
    return (
      <section>
        <span className="timer">{this.prettifyClock(this.state.clock)}</span>
        <button className="btn btn-primary btn-lg" onClick={this.countdown}>Start</button>
        <button className="btn btn-secondary btn-sm" onClick={this.pause}>Pause</button>
        <button className="btn btn-dark btn-sm" onClick={this.reset}>Reset</button>
      </section>
    )
  }
}