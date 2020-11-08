import React, { useEffect, useState } from 'react';
import { Snackbar, Button, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { ipcRenderer } from '../../utils/events/ipcRenderer';
import { closeAndInstallUpdate } from '../../utils/events/emitter';

import getLang from './lang';
import useStyles from './style';
import { useSelector } from 'react-redux';

export default function Updater() {
  const lang = getLang(useSelector(({ language }) => language));
  const classes = useStyles();
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updateDownloaded, setUpdateDownloaded] = useState(false);

  useEffect(() => {
    const onUpdateAvailable = event => {
      setUpdateAvailable(true);
      event.returnValue = true;
    };
    ipcRenderer.on('updateAvailable', onUpdateAvailable);

    return function cleanup() {
      ipcRenderer.off('updateAvailable', onUpdateAvailable);
    };
  }, []);

  useEffect(() => {
    const onUpdateDownloaded = event => {
      setUpdateDownloaded(true);
      setUpdateAvailable(false);
      event.returnValue = true;
    };
    ipcRenderer.on('updateDownloaded', onUpdateDownloaded);
    return function cleanup() {
      ipcRenderer.off('updateDownloaded', onUpdateDownloaded);
    };
  }, []);

  const handleCloseAndInstall = () => {
    setUpdateDownloaded(false);
    closeAndInstallUpdate();
  };
  return (
    <div>
      <Snackbar
        action={
          <div>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => setUpdateAvailable(false)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </div>
        }
        message={lang.updateAvailable}
        open={updateAvailable}
      />
      <Snackbar
        action={
          <div>
            <Button className={classes.button} onClick={handleCloseAndInstall}>
              {lang.yes}
            </Button>
            <Button className={classes.button} onClick={() => setUpdateDownloaded(false)}>
              {lang.no}
            </Button>
          </div>
        }
        message={lang.updateDownloaded}
        open={updateDownloaded}
      />
    </div>
  );
}
