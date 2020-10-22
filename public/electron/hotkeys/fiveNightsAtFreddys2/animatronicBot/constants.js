const CAM_WIDTH = 40;
const CAM_HEIGHT = 24;
const CAM_CHECK_AT = { x: 15, y: 15 };
export const SELECTED_COLOR = 'c2dd00';
export const DEFAULT_COORDS = { x: 390, y: 555 };
/** @typedef {'CAM_01' | 'CAM_02' | 'CAM_03' | 'CAM_04' | 'CAM_05' | 'CAM_06' | 'CAM_07' | 'CAM_08' | 'CAM_09' | 'CAM_10' | 'CAM_11' | 'CAM_12' | 'CORRIDOR' | 'OFFICE'}  Place  */
export const PLACES = {
  CAM_01: { x: 452, y: 424, width: CAM_WIDTH, height: CAM_HEIGHT, checkAt: CAM_CHECK_AT },
  CAM_02: { x: 555, y: 425, width: CAM_WIDTH, height: CAM_HEIGHT, checkAt: CAM_CHECK_AT },
  CAM_03: { x: 452, y: 373, width: CAM_WIDTH, height: CAM_HEIGHT, checkAt: CAM_CHECK_AT },
  CAM_04: { x: 557, y: 373, width: CAM_WIDTH, height: CAM_HEIGHT, checkAt: CAM_CHECK_AT },
  CAM_05: { x: 455, y: 497, width: CAM_WIDTH, height: CAM_HEIGHT, checkAt: CAM_CHECK_AT },
  CAM_06: { x: 546, y: 498, width: CAM_WIDTH, height: CAM_HEIGHT, checkAt: CAM_CHECK_AT },
  CAM_07: { x: 574, y: 326, width: CAM_WIDTH, height: CAM_HEIGHT, checkAt: CAM_CHECK_AT },
  CAM_08: { x: 452, y: 317, width: CAM_WIDTH, height: CAM_HEIGHT, checkAt: CAM_CHECK_AT },
  CAM_09: { x: 696, y: 294, width: CAM_WIDTH, height: CAM_HEIGHT, checkAt: CAM_CHECK_AT },
  CAM_10: { x: 643, y: 387, width: CAM_WIDTH, height: CAM_HEIGHT, checkAt: CAM_CHECK_AT },
  CAM_11: { x: 723, y: 353, width: CAM_WIDTH, height: CAM_HEIGHT, checkAt: CAM_CHECK_AT },
  CAM_12: { x: 710, y: 425, width: CAM_WIDTH, height: CAM_HEIGHT, checkAt: CAM_CHECK_AT },
  CORRIDOR: { x: 502, y: 348, width: 43, height: 106, checkAt: null },
  OFFICE: { x: 506, y: 477, width: 34, height: 30, checkAt: null }
};
const ANIMATRONIC_SIZE = 98;
export const ANIMATRONIC_NAMES = {
  FREDDY: 'freddy',
  BONNIE: 'bonnie'
};
/** @typedef {{ square: { x: number, y: number, width: number, height: number }, paths: Place[][] }} Animatronic  */
export const ANIMATRONICS = {
  [ANIMATRONIC_NAMES.FREDDY]: {
    square: { x: 137, y: 100, width: ANIMATRONIC_SIZE, height: ANIMATRONIC_SIZE },
    paths: [['CAM_08', 'CAM_07', 'CORRIDOR']]
  },
  [ANIMATRONIC_NAMES.BONNIE]: {
    square: { x: 281, y: 120, width: ANIMATRONIC_SIZE, height: ANIMATRONIC_SIZE },
    paths: [
      ['CAM_08', 'CAM_07', 'CORRIDOR'],
      ['CAM_01', 'CAM_05', 'OFFICE']
    ]
  }
};
