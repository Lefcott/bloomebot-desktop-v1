import React from 'react';
import { Paper, DialogTitle } from '@material-ui/core';
import { clicksOn, clicksOff } from 'hotkeys';

import useStyles from './style';

setTimeout(() => {
  console.log('call clicks on');
  clicksOn();
}, 5000);

export default function LoginRegister() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.pageTitle}>BloomeBOT</div>
      <Paper className={classes.paper}>
        <DialogTitle>Login</DialogTitle>
      </Paper>
    </div>
  );
}
