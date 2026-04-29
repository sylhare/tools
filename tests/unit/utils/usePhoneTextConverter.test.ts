import { describe, it, expect } from 'vitest';
import {
  textToPhone,
  phoneToText,
  getBreakdown,
  LETTER_TO_SEQUENCE,
  SEQUENCE_TO_LETTER,
} from '../../../src/pages/phone-text-converter/usePhoneTextConverter';

describe('LETTER_TO_SEQUENCE', () => {
  it('maps A to 2, B to 22, C to 222', () => {
    expect(LETTER_TO_SEQUENCE['A']).toBe('2');
    expect(LETTER_TO_SEQUENCE['B']).toBe('22');
    expect(LETTER_TO_SEQUENCE['C']).toBe('222');
  });

  it('maps S to 7777 and Z to 9999 (4-letter keys)', () => {
    expect(LETTER_TO_SEQUENCE['S']).toBe('7777');
    expect(LETTER_TO_SEQUENCE['Z']).toBe('9999');
  });

  it('maps space to 0', () => {
    expect(LETTER_TO_SEQUENCE[' ']).toBe('0');
  });
});

describe('SEQUENCE_TO_LETTER', () => {
  it('maps 2 to A, 22 to B, 222 to C', () => {
    expect(SEQUENCE_TO_LETTER['2']).toBe('A');
    expect(SEQUENCE_TO_LETTER['22']).toBe('B');
    expect(SEQUENCE_TO_LETTER['222']).toBe('C');
  });

  it('maps 0 to space', () => {
    expect(SEQUENCE_TO_LETTER['0']).toBe(' ');
  });

  it('maps 7777 to S and 9999 to Z', () => {
    expect(SEQUENCE_TO_LETTER['7777']).toBe('S');
    expect(SEQUENCE_TO_LETTER['9999']).toBe('Z');
  });
});

describe('textToPhone', () => {
  it('converts a single letter', () => {
    expect(textToPhone('A')).toBe('2');
    expect(textToPhone('B')).toBe('22');
    expect(textToPhone('C')).toBe('222');
  });

  it('converts HELLO', () => {
    expect(textToPhone('HELLO')).toBe('44 33 555 555 666');
  });

  it('handles lowercase input', () => {
    expect(textToPhone('hello')).toBe('44 33 555 555 666');
  });

  it('converts space to 0', () => {
    expect(textToPhone('A B')).toBe('2 0 22');
  });

  it('handles consecutive same-key letters with separating spaces', () => {
    expect(textToPhone('AA')).toBe('2 2');
    expect(textToPhone('AB')).toBe('2 22');
    expect(textToPhone('CA')).toBe('222 2');
  });

  it('returns empty string for empty input', () => {
    expect(textToPhone('')).toBe('');
  });

  it('ignores characters not on the keypad', () => {
    expect(textToPhone('H3LLO')).toBe('44 555 555 666');
    expect(textToPhone('A!B')).toBe('2 22');
  });

  it('converts S (4th letter on key 7) to 7777', () => {
    expect(textToPhone('S')).toBe('7777');
  });

  it('converts Z (4th letter on key 9) to 9999', () => {
    expect(textToPhone('Z')).toBe('9999');
  });
});

describe('phoneToText', () => {
  it('converts a single sequence', () => {
    expect(phoneToText('2')).toBe('A');
    expect(phoneToText('22')).toBe('B');
    expect(phoneToText('222')).toBe('C');
  });

  it('converts 44 33 555 555 666 to HELLO', () => {
    expect(phoneToText('44 33 555 555 666')).toBe('HELLO');
  });

  it('converts 0 to space', () => {
    expect(phoneToText('2 0 22')).toBe('A B');
  });

  it('returns empty string for empty input', () => {
    expect(phoneToText('')).toBe('');
    expect(phoneToText('   ')).toBe('');
  });

  it('ignores invalid sequences', () => {
    expect(phoneToText('2 invalid 22')).toBe('AB');
    expect(phoneToText('1 2')).toBe('A');
  });

  it('converts 7777 to S and 9999 to Z', () => {
    expect(phoneToText('7777')).toBe('S');
    expect(phoneToText('9999')).toBe('Z');
  });

  it('round-trips with textToPhone', () => {
    expect(phoneToText(textToPhone('HELLO'))).toBe('HELLO');
    expect(phoneToText(textToPhone('ABC'))).toBe('ABC');
    expect(phoneToText(textToPhone('CALL ME'))).toBe('CALL ME');
  });
});

describe('getBreakdown', () => {
  it('returns empty array for empty input', () => {
    expect(getBreakdown('')).toEqual([]);
  });

  it('returns mapping for each supported character', () => {
    expect(getBreakdown('AB')).toEqual([
      { char: 'A', sequence: '2' },
      { char: 'B', sequence: '22' },
    ]);
  });

  it('uppercases characters', () => {
    expect(getBreakdown('hi')).toEqual([
      { char: 'H', sequence: '44' },
      { char: 'I', sequence: '444' },
    ]);
  });

  it('includes spaces as 0', () => {
    expect(getBreakdown('A B')).toEqual([
      { char: 'A', sequence: '2' },
      { char: ' ', sequence: '0' },
      { char: 'B', sequence: '22' },
    ]);
  });

  it('skips unsupported characters', () => {
    expect(getBreakdown('A1B')).toEqual([
      { char: 'A', sequence: '2' },
      { char: 'B', sequence: '22' },
    ]);
  });
});
