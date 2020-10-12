import { combineReducers } from 'redux';

import user from './user';
import language from './language';
import section from './section';
import hacks from './hacks';

export default combineReducers({
  user,
  language,
  section,
  hacks
});
