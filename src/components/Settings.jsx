import React, {Component} from 'react'

export default class Settings extends Component {
    render() {
        return (
            <div className="settings card">
                <div className="card-body">
                    <h4>Settings</h4>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" defaultChecked={this.props.alarmEnabled} onChange={this.props.changeAlarm} />
                            <span>Play alarm at 00:00</span>
                        </label>
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" defaultChecked={this.props.notificationsEnabled} onChange={this.props.requestNotifications} />
                            <span>Desktop notifications</span>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
}