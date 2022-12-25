import { expect } from 'chai';
import { formatResult } from '@/utils';

function generateStringOfNumbers(length: number, isFloat: boolean) {
  let str = '';
  for (let i = 0; i < length; i++) {
    str += Math.floor(Math.random() * 10);
  }
  if (isFloat) {
    const index = Math.round( 1 + Math.random() * (length - 3));
    return str.slice(0, index) + '.' + str.slice(index + 1);
  } else {
    return str;
  }
}

describe('formatResult', () => {
  describe('возвращает исходную строку, если её длина не более 8 знаков', () => {
    for (let i = 0; i < 100; i++) {
      const string = generateStringOfNumbers(8, !!Math.round(Math.random()));
      it(`возвращает ${string}`, () => {
        expect(formatResult(string, 2, 8)).to.equal(string);
      })
    }
  })
  describe('возвращает toFixed()', () => {
    it(`для '0.1234567' возвращает '0.123457'`, () => {
      expect(formatResult('0.1234567', 2, 8)).to.equal('0.123457');
    })
    it(`для '0.12345670000' возвращает '0.123457'`, () => {
      expect(formatResult('0.12345670000', 2, 8)).to.equal('0.123457');
    })
    it(`для '0.123456234' возвращает '0.123456'`, () => {
      expect(formatResult('0.123456234', 2, 8)).to.equal('0.123456');
    })
    it(`для '0.12345600000' возвращает '0.123456'`, () => {
      expect(formatResult('0.12345600000', 2, 8)).to.equal('0.123456');
    })
    it(`для '123456.25' возвращает '123456.3'`, () => {
      expect(formatResult('123456.25', 2, 8)).to.equal('123456.3');
    })
    it(`для '123456.74' возвращает '123456.7'`, () => {
      expect(formatResult('123456.74', 2, 8)).to.equal('123456.7');
    })
    it(`для '1234567.34' возвращает '1234567'`, () => {
      expect(formatResult('1234567.34', 2, 8)).to.equal('1234567');
    })
    it(`для '1234567.64' возвращает '1234568'`, () => {
      expect(formatResult('1234567.64', 2, 8)).to.equal('1234568');
    })
  })

})
