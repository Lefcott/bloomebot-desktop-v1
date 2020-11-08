import React from 'react';

import { HACK_CODES } from '../../constants';
import { splitByNBrs } from '../../../../../../utils/html';

const getHackDuration = (licence, month, months) =>
  `${licence.months} ${licence.months === 1 ? month : months}`;

export default langCode =>
  ({
    es: {
      hackDuration: licence => getHackDuration(licence, 'mes', 'meses'),
      hackButtonText: licence => `Comprar por ${getHackDuration(licence, 'mes', 'meses')}`,
      hackDescriptions: {
        [HACK_CODES.LOL_LEVELING_BOT]: 'Bot para subir de nivel en LOL.',
        [HACK_CODES.AOE2]: 'Shortcuts para construcción rápida.',
        [HACK_CODES.FNAF2]: 'Animatrones automaticos',
        [HACK_CODES.CS1_6]: (
          <div>
            Valores al máximo:
            <br />
            <br />
            {splitByNBrs(['Dinero: $16000', 'Vida: 100'], 1)}
          </div>
        )
      },
      fields: {
        game: 'Juego',
        description: 'Descripción',
        sessions: 'Sesiones',
        price: 'Precio',
        duration: 'Duración'
      },
      actions: {
        executeHack: 'Ejecutar',
        closeHack: 'Detener ejecución',
        configureHack: 'Configurar'
      },
      openError: hack => `Hubo un error al abrir el hack para ${hack.name}`,
      closeError: hack => `Hubo un error al cerrar el hack para ${hack.name}`
    },
    en: {
      hackDuration: licence => getHackDuration(licence, 'month', 'months'),
      hackButtonText: licence => `Buy for ${getHackDuration(licence, 'month', 'months')}`,
      hackDescriptions: {
        [HACK_CODES.LOL_LEVELING_BOT]: 'Bot for leveling up at LOL.',
        [HACK_CODES.AOE2]: 'Shortcuts for building faster.',
        [HACK_CODES.FNAF2]: 'Automatic animatrons',
        [HACK_CODES.CS1_6]: (
          <div>
            Maximum values:
            <br />
            <br />
            {splitByNBrs(['Money: $16000', 'Life: 100'], 1)}
          </div>
        )
      },
      fields: {
        game: 'Game',
        description: 'Description',
        sessions: 'Sessions',
        price: 'Price',
        duration: 'Duration'
      },
      actions: {
        executeHack: 'Execute',
        closeHack: 'Stop executing',
        configureHack: 'Configure'
      },
      openError: hack => `There was an error when opening hack for ${hack.name}`,
      closeError: hack => `There was an error when closing hack for ${hack.name}`
    }
  }[langCode]);
