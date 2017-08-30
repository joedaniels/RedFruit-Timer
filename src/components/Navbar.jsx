import React, {Component} from 'react'

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-white">
                <div className="container">
                    <span className="navbar-brand">
                        <img src="./assets/img/red-fruit-timer.png" width="30" height="30" className="d-inline-block align-top" alt="Pomodoro Timer Icon" /> Red Fruit Timer
                    </span>
                </div>
            </nav>
        )
    }
}