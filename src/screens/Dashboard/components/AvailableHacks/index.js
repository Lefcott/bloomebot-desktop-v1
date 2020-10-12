import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import { Card, CardContent, CardMedia } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { getHackOrder } from '../../../../services/payments';
import BuyModal from '../commons/components/BuyModal';
import { getHacks } from '../../../../services/hacks';
import { setHacks } from '../../../../actions/hacks';
import { HACK_DATA } from './constants';
import { getPriceLabel } from './utils';
import useStyle from './style';
import getLang from './lang';

export default function Panel() {
  const dispatch = useDispatch();
  const classes = useStyle();
  const lang = getLang(useSelector(({ language }) => language));
  const hacks = useSelector(store => store.hacks);
  const user = useSelector(store => store.user);
  const [selectedHack, setSelectedHack] = useState(null);
  const [licenceID, setLicenceID] = useState(null);
  const [hackError, setHackError] = useState(false);
  const [waiting, setWaiting] = useState(true);

  useEffect(() => {
    let mounted = true;
    getHacks().then(response => {
      if (!mounted) return;
      setWaiting(false);
      if (!response || response.status !== 200) return setHackError(true);
      setHackError(false);
      dispatch(setHacks(response.body.hacks));
    });
    return function cleanup() {
      mounted = false;
    };
  }, [dispatch]);

  const handleBuy = (hack, _licenceID) => {
    setSelectedHack(hack);
    setLicenceID(_licenceID);
  };
  return (
    <div className={classes.root}>
      {waiting && <CircularProgress className={classes.spinner} key={0} />}
      {hackError && (
        <Alert severity="error" key={1}>
          <AlertTitle>{lang.erorrs.errorGettingHacksTitle}</AlertTitle>
          {lang.errors.errorGettingHacksTitle}
        </Alert>
      )}
      {Object.entries(hacks).map(([, hack], i) => (
        <Card className={classes.card} key={i + 2}>
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
            <Typography variant="caption" color="textSecondary" component="p" key={1}>
              {lang.hackDescriptions[hack.code]}
            </Typography>
            {(() => {
              const [userHack] = user.Hacks.filter(
                _userHack => _userHack.Enabled && _userHack.Code === hack.code
              );
              const actionButtons = (
                <div>
                  <Button className={classes.button} key={0}>
                    {lang.actions.executeHack}
                  </Button>
                  <Button className={classes.button} key={1}>
                    {lang.actions.configureHack}
                  </Button>
                </div>
              );
              const buyButtons = hack.licences.map((licence, _licenceID) => (
                <Button
                  className={classes.button}
                  onClick={() => handleBuy(hack, _licenceID)}
                  key={_licenceID}
                >
                  {lang.hackButtonText(licence)}, {hack.licences[_licenceID].price} USD
                </Button>
              ));
              return (
                <Typography gutterBottom variant="h5" component="h2">
                  {userHack ? actionButtons : buyButtons}
                </Typography>
              );
            })()}
          </CardContent>
        </Card>
      ))}
      {selectedHack && (
        <BuyModal
          onClose={() => setSelectedHack(null)}
          getOrder={platform => getHackOrder(platform, selectedHack, licenceID)}
          hack={selectedHack}
          data={{
            [lang.fields.game]: selectedHack.name,
            [lang.fields.description]: lang.hackDescriptions[selectedHack.code],
            [lang.fields.price]: getPriceLabel(selectedHack.licences[licenceID].price, 'USD'),
            [lang.fields.duration]: lang.hackDuration(selectedHack.licences[licenceID])
          }}
        />
      )}
    </div>
  );
}
