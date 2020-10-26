import { request } from '../utils/request';
import { env } from '../utils/events/emitter';

export const getCurrentUser = () =>
  request.axios({
    options: {
      url: `${env.API_URL_BASE}/api/session/current_user`,
      method: 'get'
    }
  });
