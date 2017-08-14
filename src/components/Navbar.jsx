import React, { Component } from 'react'

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <div className="container">
            <a className="navbar-brand" href="#">RedFruit Timer</a>

            <span className="navbar-text">Created by <a href="https://joedaniels.co.uk/">Joe Daniels</a></span>
        </div>
      </nav>
    )
  }
}