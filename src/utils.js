export function formatResult(string, fraction, limit) {
  let number = parseFloat(string);
  if (string.length > limit) {
    if (string.includes('.')) {
      let dotIndex = string.indexOf('.');
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

export const calculatorButtons = [
  { sign: 'C', type: 'delete', value: 'c' },
  { sign: '&#8676;', type: 'delete', value: 'back' },
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
];

export const converterButtons = [
  { sign: '7', type: 'number', value: '7' },
  { sign: '8', type: 'number', value: '8' },
  { sign: '9', type: 'number', value: '9' },
  { sign: '&#8676;', type: 'delete', value: 'back' },

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
];
