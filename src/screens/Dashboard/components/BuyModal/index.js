import React, { useEffect, useState, useRef } from 'react';
import { Modal, DialogTitle, Button, CircularProgress } from '@material-ui/core';
import { activatePayment } from '../../../../services/payments';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import getLang from './lang';
import useStyles from './style';
import { goToLink } from '../../../../utils/html';

export default function BuyModal({ data, getOrder, onClose }) {
  const classes = useStyles();
  const lang = getLang(useSelector(state => state.language));
  const [paypalLink, setPaypalLink] = useState(null);
  const [paypalError, setPaypalError] = useState(false);
  const [waitingPaypalActivation, setWaitingPaypalActivation] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const accountActivated = useRef(false);
  const [getPaypalOrder] = useState(() => () => getOrder('paypal'));

  useEffect(() => {
    let mounted = true;
    getPaypalOrder().then(response => {
      if (!mounted) return;
      if (!response || response.status !== 200) return setPaypalError(true);
      setPaypalLink(response.body.payment_link);
      setOrderId(response.body.order_id);
    });
    return function cleanup() {
      mounted = false;
    };
  }, [getPaypalOrder]);

  const handlePaypalPay = () => {
    if (accountActivated.current) return goToLink(paypalLink);
    setWaitingPaypalActivation(true);
    activatePayment(orderId).then(response => {
      if (!response || response.status !== 200) return onClose();
      setWaitingPaypalActivation(false);
      accountActivated.current = true;
      goToLink(paypalLink);
    });
  };

  return (
    <div>
      <Modal open onClose={onClose} className={classes.buyModal}>
        <div className={classes.modalContainer}>
          <DialogTitle className={classes.title}>
            {lang.youreGonnaBuy} {lang.thisHack}
          </DialogTitle>
          {Object.entries(data).map(([key, value], i) => (
            <div key={i}>
              <strong>{key}:</strong>&nbsp;{value}
              <br />
            </div>
          ))}
          <center>
            {paypalError ? (
              <div />
            ) : paypalLink ? (
              <Button
                className={classes.paypalButton}
                onClick={handlePaypalPay}
                disabled={waitingPaypalActivation}
              >
                Comprar con&nbsp;<strong className={classes.paypalStrong}>PayPal</strong>
              </Button>
            ) : (
              <CircularProgress />
            )}
          </center>
        </div>
      </Modal>
    </div>
  );
}
BuyModal.propTypes = {
  getOrder: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired
};
