import React, { Component } from 'react';
import './css/style.css';
import Navbar from './components/Navbar';
import Timer from './components/Timer';
import Settings from './components/Settings';

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            alarmEnabled: false
        }

        this.changeAlarm = this.changeAlarm.bind(this)
    }

    changeAlarm() {
        this.setState({ alarmEnabled: !this.state.alarmEnabled })
    }

    render() {
        return (
            <main>
                <Navbar />
                <div className="container">
                    <Timer 
                        alarmEnabled={this.state.alarmEnabled} />
                    <Settings 
                        changeAlarm={this.changeAlarm}
                        alarmEnabled={this.state.alarmEnabled} />
                </div>
            </main>
        )
    }
}