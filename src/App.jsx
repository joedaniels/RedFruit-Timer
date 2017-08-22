import React, { Component } from 'react';
import './css/style.css';
import Navbar from './components/Navbar';
import Timer from './components/Timer';
import SettingsItem from './components/SettingsItem'

export default class App extends Component {
    constructor(props) {
        super(props)


        this.state = {
            alarmEnabled: localStorage.getItem('alarm'),
            notificationsEnabled: localStorage.getItem('notifications')
        }

        this.changeAlarm = this.changeAlarm.bind(this)
        this.requestNotifications = this.requestNotifications.bind(this)
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

    render() {
        return (
            <main>

                <Navbar />

                <div className="container">

                    <Timer 
                        alarmEnabled={this.state.alarmEnabled}
                        notificationsEnabled={this.state.notificationsEnabled} />

                    <div className="settings card">
                        <div className="card-body">
                            <h4>Settings</h4>

                            <SettingsItem 
                            isChecked={this.state.alarmEnabled} 
                            onChange={this.changeAlarm} 
                            label='Play alarm at 00:00' />

                            <SettingsItem 
                            isChecked={this.state.notificationsEnabled} 
                            onChange={this.requestNotifications} 
                            label='Desktop notifications' />

                        </div>
                    </div>

                </div>
                
            </main>
        )
    }
}