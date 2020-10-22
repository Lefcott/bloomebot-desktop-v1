import { registerMany } from '../../utils/hotkeys';
import { activateAnimatronBot, deactivateAnimatronicBot, setAnimatronic } from './animatronicBot';
import { ANIMATRONIC_NAMES } from './animatronicBot/constants';

export default () => {
  try {
    return registerMany(
      ['A'],
      1,
      activateAnimatronBot,
      ['S'],
      1,
      deactivateAnimatronicBot,
      ['num1', '1'],
      1,
      () => setAnimatronic(ANIMATRONIC_NAMES.FREDDY),
      ['num2', '2'],
      1,
      () => setAnimatronic(ANIMATRONIC_NAMES.BONNIE)
    );
  } catch (e) {
    console.error(e);
    return false;
  }
};
