import React, { Component } from 'react';
import './css/style.css';
import Navbar from './components/Navbar';
import Timer from './components/Timer';
import Settings from './components/Settings';

export default class App extends Component {
    constructor(props) {
        super(props)


        this.state = {
            alarmEnabled: localStorage.getItem('alarmEnabled'),
            notificationsEnabled: localStorage.getItem('notificationsEnabled')
        }

        this.changeAlarm = this.changeAlarm.bind(this)
        this.requestNotifications = this.requestNotifications.bind(this)
    }

    changeAlarm() {
        this.setState({ alarmEnabled: !this.state.alarmEnabled })
        localStorage.setItem('alarmEnabled', !this.state.alarmEnabled)
    }

    requestNotifications() {
        Notification.requestPermission().then(function(result) {
            if (result === 'denied') {
              console.log('Permission wasn\'t granted. Allow a retry.');
              return;
            }
            if (result === 'default') {
              console.log('The permission request was dismissed.');
              return;
            }  
        });
        this.setState({ notificationsEnabled: true })
        localStorage.setItem('notificationsEnabled', true)
    }

    render() {
        return (
            <main>
                <Navbar />
                <div className="container">
                    <Timer 
                        alarmEnabled={this.state.alarmEnabled}
                        notificationsEnabled={this.state.notificationsEnabled} />
                    <Settings 
                        changeAlarm={this.changeAlarm}
                        alarmEnabled={this.state.alarmEnabled}
                        requestNotifications={this.requestNotifications}
                        notificationsEnabled={this.state.notificationsEnabled} />
                </div>
            </main>
        )
    }
}