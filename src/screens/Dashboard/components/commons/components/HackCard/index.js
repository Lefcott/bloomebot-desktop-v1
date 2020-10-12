import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import { HACK_DATA } from './constants';
import useStyle from './style';
import getLang from './lang';

export default function HackCard({ hack, onBuy }) {
  const classes = useStyle();
  const user = useSelector(store => store.user);
  const lang = getLang(useSelector(({ language }) => language));

  return (
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
            <Button className={classes.button} onClick={() => onBuy(_licenceID)} key={_licenceID}>
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
  );
}
HackCard.propTypes = {
  hack: PropTypes.objectOf(PropTypes.any).isRequired,
  onBuy: PropTypes.func.isRequired
};
