import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class ProjectStats extends Component {
  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3>Project Statistics</h3>
        </div>
        <div className="panel-body">
          <row>
            <div className="col-sm-4 text-center">
              <p># of groups: </p>
              <h3>10</h3>
            </div>
            <div className="col-sm-4 text-center">
              <p># of student grouped: </p>
              <h3>20</h3>
            </div>
            <div className="col-sm-4 text-center">
              <p># students not grouped: </p>
              <h3>30</h3>
            </div>
          </row>
        </div>
      </div>
    );
  }
}
