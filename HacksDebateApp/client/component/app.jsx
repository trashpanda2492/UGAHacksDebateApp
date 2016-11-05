import React, { Component } from 'react';
import { Link } from 'react-router';

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>FightMe</h1>
                <h3>Trending Topics</h3>
                <h3>Topics</h3>
                <ul>
                    <li><Link to="/topic">Hillary vs. Trump</Link></li>
                </ul>
            </div>
        );
    }
}