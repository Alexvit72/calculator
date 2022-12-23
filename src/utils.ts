export function formatResult(string:string, fraction: number, limit: number) {
  const number = parseFloat(string);
  if (string.length > limit) {
    if (string.includes('.')) {
      const dotIndex = string.indexOf('.');
      if (dotIndex < limit && number < 1e+21) {
        return number.toFixed(limit - (dotIndex + 1));
      } else {
        return number.toExponential(fraction);
      }
    } else {
      return number.toExponential(fraction);
    }
  } else {
    return string;
  }
}

export const buttons = {
  calculator: [
    { sign: 'C', type: 'delete', value: 'c' },
    { sign: '&lt;', type: 'delete', value: 'back' },
    { sign: '&#37;', type: 'operation', value: '%' },
    { sign: '&#247;', type: 'operation', value: '/' },

    { sign: '7', type: 'number', value: '7' },
    { sign: '8', type: 'number', value: '8' },
    { sign: '9', type: 'number', value: '9' },
    { sign: '&#215;', type: 'operation', value: '*' },

    { sign: '4', type: 'number', value: '4' },
    { sign: '5', type: 'number', value: '5' },
    { sign: '6', type: 'number', value: '6' },
    { sign: '&#8722;', type: 'operation', value: '-' },

    { sign: '1', type: 'number', value: '1' },
    { sign: '2', type: 'number', value: '2' },
    { sign: '3', type: 'number', value: '3' },
    { sign: '&#43;', type: 'operation', value: '+' },

    { sign: '&#40;&#41;', type: 'number', value: '()' },
    { sign: '0', type: 'number', value: '0' },
    { sign: '&#183;', type: 'number', value: '.' },
    { sign: '&#61;', type: 'operation', value: '=' }
  ],
  converter: [
    { sign: '7', type: 'number', value: '7' },
    { sign: '8', type: 'number', value: '8' },
    { sign: '9', type: 'number', value: '9' },
    { sign: '&lt;', type: 'delete', value: 'back' },

    { sign: '4', type: 'number', value: '4' },
    { sign: '5', type: 'number', value: '5' },
    { sign: '6', type: 'number', value: '6' },
    { sign: 'C', type: 'delete', value: 'c' },

    { sign: '1', type: 'number', value: '1' },
    { sign: '2', type: 'number', value: '2' },
    { sign: '3', type: 'number', value: '3' },
    { sign: '&#8593;', type: 'operation', value: 'up' },

    { sign: '&plus;&sol;&minus;', type: 'number', value: 'negate' },
    { sign: '0', type: 'number', value: '0' },
    { sign: '&#183;', type: 'number', value: '.' },
    { sign: '&#8595;', type: 'operation', value: 'down' }
  ]
}

export const bases = {
  Площадь: [
    { name: 'Квадратные метры', symbol: 'm2' },
    { name: 'Гектары', symbol: 'hectare' },
    { name: 'Акры', symbol: 'acre' },
    { name: 'Квадратные дюймы', symbol: 'sqin' },
    { name: 'Квадратные футы', symbol: 'sqft' },
  ],
  Длина: [
    { name: 'Метры', symbol: 'm' },
    { name: 'Дюймы', symbol: 'in' },
    { name: 'Футы', symbol: 'ft' },
    { name: 'Ярды', symbol: 'yd' },
    { name: 'Мили', symbol: 'mi' },
  ],
  Объём: [
    { name: 'Кубические метры', symbol: 'm3' },
    { name: 'Кубические дюймы', symbol: 'cuin' },
    { name: 'Кубические футы', symbol: 'cuft' },
    { name: 'Кубические ярды', symbol: 'cuyd' },
    { name: 'Литры', symbol: 'liter' },
    { name: 'Галлоны', symbol: 'gal' },
    { name: 'Баррели', symbol: 'obl' },
  ],
  Температура: [
    { name: 'Кельвины', symbol: 'K' },
    { name: 'Градусы Цельсия', symbol: 'degC' },
    { name: 'Градусы Фаренгейта', symbol: 'degF' },
  ],
  Масса: [
    { name: 'Граммы', symbol: 'g' },
    { name: 'Килограммы', symbol: 'kg' },
    { name: 'Тонны', symbol: 'tonne' },
    { name: 'Унции', symbol: 'oz' },
    { name: 'Фунты', symbol: 'lbm' },
  ],
}
