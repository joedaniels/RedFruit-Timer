import React, { Component } from 'react';
import './css/style.css';
import Navbar from './components/Navbar';
import Timer from './components/Timer';

export default class App extends Component {
    render() {
        return (
            <main>
                <Navbar />
                <div className="container">
                    <Timer />
                </div>
            </main>
        )
    }
}