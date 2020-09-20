import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginRegister from './screens/LoginRegister';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <LoginRegister />
        </Route>
      </Switch>
    </Router>
  );
}
