import React, {Component} from 'react'

export default class SettingsItem extends Component {
    render() {
        return (
            <div className="form-check">
                <label className="form-check-label">
                    <input className="form-check-input" type="checkbox" defaultChecked={this.props.isChecked} onChange={this.props.onChange} />
                    <span>{this.props.label}</span>
                </label>
            </div>
        )
    }
}