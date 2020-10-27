import { sendCSharpEvent } from '../../init';
import { EVENTS } from './constants';

export const activateInfiniteMoney = () => sendCSharpEvent(EVENTS.INFINITE_MONEY, true, {});
export const deactivateInfiniteMoney = () => sendCSharpEvent(EVENTS.INFINITE_MONEY, false, {});
