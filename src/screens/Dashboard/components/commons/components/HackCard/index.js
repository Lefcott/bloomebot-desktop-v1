import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, FormControl, Snackbar, TextField, Typography } from '@material-ui/core';
import { CardContent, CardMedia } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';

import { getOpenHacks, turnOn, turnOff } from '../../../../../../utils/events';
import { HACK_DATA } from './constants';
import useStyle from './style';
import getLang from './lang';
import { getLicencePrice } from './utils';

export default function HackCard({ hack, onBuy }) {
  const classes = useStyle();
  const lang = getLang(useSelector(({ language }) => language));
  const user = useSelector(store => store.user);
  const [error, setError] = useState(null);
  const [sessions, setSessions] = useState(1);
  const [openHacks, setOpenHacks] = useState(getOpenHacks());
  const hackIsOpen = openHacks.includes(hack.code);

  const handleCloseHack = _hackCode => {
    _hackCode = _hackCode || hack.code;
    const closeSuccess = turnOff(_hackCode);
    if (!closeSuccess) {
      setError(lang.closeError(hack));
      return false;
    }
    setError(null);
    setOpenHacks(getOpenHacks());
    return true;
  };
  const handleOpenHack = () => {
    if (openHacks.length && openHacks.map(handleCloseHack).filter(h => !h).length)
      return setError(lang.openError);
    const openSuccess = turnOn(hack.code);
    if (!openSuccess) return setError(lang.openError(hack));
    setError(null);
    setOpenHacks(getOpenHacks());
  };

  return (
    <div>
      {error && (
        <Snackbar open>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      )}
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={HACK_DATA[hack.code].IMAGE}
          title="Hack"
          color="#fff"
          key={0}
        />
        <div className={classes.title} key={1}>
          {hack.name}
        </div>
        <CardContent className={classes.cardContent} key={2}>
          <Typography gutterBottom variant="h6" component="h6" key={0}>
            <div className={classes.secondTitle}>{hack.name}</div>
          </Typography>
          <Typography variant="caption" color="textSecondary" key={1}>
            {lang.hackDescriptions[hack.code]}
          </Typography>
          {(() => {
            const [userHack] = user.Hacks.filter(
              _userHack => _userHack.Enabled && _userHack.Code === hack.code
            );
            const actionButtons = (
              <div>
                {hackIsOpen ? (
                  <Button className={classes.button} onClick={() => handleCloseHack()} key={0}>
                    {lang.actions.closeHack}
                  </Button>
                ) : (
                  <Button className={classes.button} onClick={() => handleOpenHack()} key={0}>
                    {lang.actions.executeHack}
                  </Button>
                )}
                <Button className={classes.button} key={1}>
                  {lang.actions.configureHack}
                </Button>
              </div>
            );
            const buyButtons = (
              <div>
                <FormControl>
                  <TextField
                    className={classes.sessionsInput}
                    value={sessions}
                    id="outlined-error-helper-text"
                    label={lang.fields.sessions}
                    type="number"
                    InputProps={{ inputProps: { min: 1, max: 50 } }}
                    variant="outlined"
                    onChange={({ target }) => setSessions(target.value)}
                  />
                </FormControl>
                {hack.licences.map((licence, _licenceID) => (
                  <Button
                    className={classes.button}
                    onClick={() => onBuy(_licenceID, sessions)}
                    key={_licenceID}
                  >
                    {lang.hackButtonText(licence)}, {getLicencePrice(hack.licences[_licenceID], sessions)} USD
                  </Button>
                ))}
              </div>
            );
            return (
              <Typography gutterBottom variant="h5" component="h2">
                {userHack ? actionButtons : buyButtons}
              </Typography>
            );
          })()}
        </CardContent>
      </Card>
    </div>
  );
}
HackCard.propTypes = {
  hack: PropTypes.objectOf(PropTypes.any).isRequired,
  onBuy: PropTypes.func.isRequired
};
