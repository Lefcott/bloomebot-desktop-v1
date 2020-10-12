import { HACK_CODES } from '../commons/constants';

export default langCode =>
  ({
    es: {
      errors: {
        errorGettingHacksTitle: 'Error interno',
        errorGettingHacks: 'Hubo un error al obtener los hacks disponibles'
      },
      hackButtonText: licence => `Comprar por ${licence.months} ${licence.months === 1 ? 'mes' : 'meses'}`,
      hackDescriptions: {
        [HACK_CODES.AOE2]: 'Shortcuts para construcción rápida.'
      },
      fields: {
        game: 'Juego',
        description: 'Descripción',
        price: 'Precio',
        duration: 'Duración'
      }
    },
    en: {
      errors: {
        errorGettingHacksTitle: 'Internal Error',
        errorGettingHacks: 'There was an error getting the available hacks'
      },
      hackButtonText: licence => `Buy for ${licence.months} ${licence.months === 1 ? 'month' : 'months'}`,
      hackDescriptions: {
        [HACK_CODES.AOE2]: 'Fast building shortcuts.'
      },
      fields: {
        game: 'Game',
        description: 'Descripción',
        price: 'Precio',
        duration: 'Duration'
      }
    }
  }[langCode]);
