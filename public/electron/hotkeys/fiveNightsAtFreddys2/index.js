import { registerMany } from '../../utils/hotkeys';
import { activateAnimatronBot, deactivateAnimatronBot } from './animatronicBot';

export default () => {
  try {
    return registerMany(['A'], 1, activateAnimatronBot, ['S'], 1, deactivateAnimatronBot);
  } catch (e) {
    console.error(e);
    return false;
  }
};
