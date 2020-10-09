import React, { useEffect, useState } from 'react';
import { Paper, DialogTitle } from '@material-ui/core';
import { clicksOn } from 'hotkeys';

import { LOGIN, REGISTER } from './constants';
import useStyles from './style';
import Login from './components/Login';
import Register from './components/Register';
import { getCurrentUser } from '../../services/user';
import LoadingPage from '../../components/loadingPage';

clicksOn();

export default function LoginRegister() {
  const classes = useStyles();
  const [visibleContent, setVisibleContent] = useState(LOGIN);
  const [loading, setLoading] = useState(true);

  const handleSwitch = to => setVisibleContent(to);

  useEffect(() => {
    getCurrentUser().then(response => {
      console.log('response.body.redirectTo', response.body.redirectTo);
      if (response && response.status === 200) return (window.location.href = response.body.redirectTo);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <LoadingPage />
  ) : (
    <div className={classes.root}>
      <div className={classes.pageTitle}>BloomeBOT Hacks</div>
      <Paper className={classes.paper}>
        <DialogTitle>Login</DialogTitle>
        <Login visible={visibleContent === LOGIN} onSwitch={() => handleSwitch(REGISTER)} />
        <Register visible={visibleContent === REGISTER} onSwitch={() => handleSwitch(LOGIN)} />
      </Paper>
    </div>
  );
}
