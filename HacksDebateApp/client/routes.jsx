import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

// route components
import App from './component/app.jsx';
import Topic from './component/topic.jsx';

export const renderRoutes = () => (
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/topic" component={Topic}/>
    </Router>
);
