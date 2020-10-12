import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginRegister from './screens/LoginRegister';
import Dashboard from './screens/Dashboard';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <LoginRegister />
        </Route>
      </Switch>
    </Router>
  );
}
