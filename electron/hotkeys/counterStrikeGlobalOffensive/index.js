import { activateInfiniteMoney, deactivateInfiniteMoney } from './infiniteMoney';

export default {
  up: () => {
    activateInfiniteMoney();
    return true;
  },
  down: () => {
    deactivateInfiniteMoney();
    return true;
  }
};
