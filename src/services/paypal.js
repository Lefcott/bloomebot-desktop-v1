import { request } from '../utils/request';
import env from '../env';

export const getOrder = account_id =>
  request.axios({
    options: {
      url: `${env.API_URL_BASE}/api/paypal/order`,
      method: 'get',
      params: { account_id }
    }
  });

export const getPackOrder = (pack_name, region) =>
  request.axios({
    options: {
      url: `${env.API_URL_BASE}/api/paypal/pack_order`,
      method: 'get',
      params: { pack_name, region }
    }
  });

export const activatePayment = order_id =>
  request.axios({
    options: {
      url: `${env.API_URL_BASE}/api/paypal/activate_payment`,
      method: 'post',
      data: { order_id }
    }
  });
