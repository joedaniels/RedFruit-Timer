import React, { Component } from 'react'
import './css/style.css'
import Navbar from './components/Navbar'
import Timer from './components/Timer'

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            alarmEnabled: localStorage.getItem('alarm'),
            notificationsEnabled: localStorage.getItem('notifications'),
            longBreakLength: localStorage.getItem('longBreak')
        }

        this.changeAlarm = this.changeAlarm.bind(this)
        this.requestNotifications = this.requestNotifications.bind(this)
        this.changeLongBreak = this.changeLongBreak.bind(this)
    }

    changeAlarm() {
        this.setState({ alarmEnabled: !this.state.alarmEnabled })
        localStorage.setItem('alarm', !this.state.alarmEnabled)
    }

    requestNotifications() {
        Notification.requestPermission().then(function(result) {
            if (result === ('denied' || 'default')) {
                this.setState({ notificationsEnabled: false })
                localStorage.setItem('notifications', false)
                return;
            }
        });
        this.setState({ notificationsEnabled: !this.state.notificationsEnabled })
        localStorage.setItem('notifications', !this.state.notificationsEnabled)
    }

    changeLongBreak(event) {
        this.setState({ longBreakLength: event.target.value * 60})
        localStorage.setItem('longBreak', event.target.value * 60)
    }

    render() {
        return (
            <main>
                <Navbar />
                <div className="container">
                    <Timer 
                        alarmEnabled={this.state.alarmEnabled}
                        notificationsEnabled={this.state.notificationsEnabled}
                        longBreak={this.state.longBreakLength} />
                    <div className="settings card">
                        <div className="card-body">
                            <h4>Settings</h4>
                            <form>
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input 
                                            type="checkbox" 
                                            className="form-check-input" 
                                            onChange={this.changeAlarm}
                                            defaultChecked={this.state.alarmEnabled} />
                                        <span>Play alarm at 00:00</span>
                                    </label>
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input 
                                            type="checkbox" 
                                            className="form-check-input" 
                                            onChange={this.requestNotifications}
                                            defaultChecked={this.state.notificationsEnabled} />
                                        <span>Desktop notifications</span>
                                    </label>
                                </div>

                                <div className="form-group row">
                                    <label className="col-sm-5 col-form-label">
                                        Long Break Length
                                    </label>
                                    <div className="col-sm-7">
                                        <input 
                                            type="number" 
                                            className="form-control col-sm-3" 
                                            value={(this.state.longBreakLength)/60} 
                                            onChange={this.changeLongBreak}
                                            step="1" 
                                            min="15" 
                                            max="30" />
                                        <small className="form-text text-muted">Minutes</small>
                                    </div>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}