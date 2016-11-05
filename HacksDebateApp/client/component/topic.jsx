import React, { Component } from 'react';

export default class Topic extends Component {
    render() {
        return (
        <div>
            <h1>FightMe</h1>
            <h2>Hillary vs. Trump</h2>

            <h3>Account Rankings</h3>
            <table border = ".01">
                <tr>
                    <td>1</td>
                    <td>name 1</td>
                    <td>score</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>name 2</td>
                    <td>score</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>name 3</td>
                    <td>score</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>name 4</td>
                    <td>score</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>name 5</td>
                    <td>score</td>
                </tr>
            </table>

            <h3>Top Ongoing Chats</h3>

            <button>Look</button>
            <p></p>
            <button>Spectate</button>
        </div>
        );
    }
}