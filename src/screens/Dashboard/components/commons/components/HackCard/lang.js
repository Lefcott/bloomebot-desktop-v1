import { HACK_CODES } from '../../constants';

const getHackDuration = (licence, month, months) =>
  `${licence.months} ${licence.months === 1 ? month : months}`;
export default langCode =>
  ({
    es: {
      hackDuration: licence => getHackDuration(licence, 'mes', 'meses'),
      hackButtonText: licence => `Comprar por ${getHackDuration(licence, 'mes', 'meses')}`,
      hackDescriptions: {
        [HACK_CODES.AOE2]: 'Shortcuts para construcción rápida.'
      },
      fields: {
        game: 'Juego',
        description: 'Descripción',
        price: 'Precio',
        duration: 'Duración'
      },
      actions: {
        executeHack: 'Ejecutar',
        configureHack: 'Configurar'
      }
    },
    en: {
      hackDuration: licence => getHackDuration(licence, 'month', 'months'),
      hackButtonText: licence => `Buy for ${getHackDuration(licence, 'month', 'months')}`,
      hackDescriptions: {
        [HACK_CODES.AOE2]: 'Shortcuts for building faster.'
      },
      fields: {
        game: 'Game',
        description: 'Description',
        price: 'Price',
        duration: 'Duration'
      },
      actions: {
        executeHack: 'Execute',
        configureHack: 'Configure'
      }
    }
  }[langCode]);
