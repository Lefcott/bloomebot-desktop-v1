import React from 'react';
import { Paper, DialogTitle } from '@material-ui/core';
import { clicksOn } from 'hotkeys';

import useStyles from './style';

clicksOn();

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
