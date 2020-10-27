import { registerMany } from '../../utils/hotkeys';
import { activateFastBuilding, deactivateFastBuilding } from './fastBuilding';

export default {
  up: () => {
    let params = [];
    params = [...params, ...[['0', 'num0'], 1, activateFastBuilding]];
    params = [...params, ...[['1', 'num1'], 1, deactivateFastBuilding]];
    return registerMany(...params);
  },
  down: () => true
};
