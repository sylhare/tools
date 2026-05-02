import { describe, it, expect } from 'vitest';
import {
  textToPhone,
  phoneToText,
  getBreakdown,
  LETTER_TO_SEQUENCE,
  SEQUENCE_TO_LETTER,
} from '../../../src/pages/phone-text-converter/usePhoneTextConverter';

describe('LETTER_TO_SEQUENCE', () => {
  it.each([
    ['A', '2'],
    ['B', '22'],
    ['C', '222'],
    ['S', '7777'],
    ['Z', '9999'],
    [' ', '0'],
  ])('maps %s to %s', (letter, expected) => {
    expect(LETTER_TO_SEQUENCE[letter]).toBe(expected);
  });
});

describe('SEQUENCE_TO_LETTER', () => {
  it.each([
    ['2', 'A'],
    ['22', 'B'],
    ['222', 'C'],
    ['0', ' '],
    ['7777', 'S'],
    ['9999', 'Z'],
  ])('maps %s to %s', (seq, expected) => {
    expect(SEQUENCE_TO_LETTER[seq]).toBe(expected);
  });
});

describe('textToPhone', () => {
  it.each([
    ['A', '2'],
    ['B', '22'],
    ['C', '222'],
    ['S', '7777'],
    ['Z', '9999'],
    ['HELLO', '44 33 555 555 666'],
    ['hello', '44 33 555 555 666'],
    ['A B', '2 0 22'],
    ['AA', '2 2'],
    ['AB', '2 22'],
    ['CA', '222 2'],
    ['', ''],
    ['H3LLO', '44 555 555 666'],
    ['A!B', '2 22'],
  ])('converts %s → %s', (input, expected) => {
    expect(textToPhone(input)).toBe(expected);
  });
});

describe('phoneToText', () => {
  it.each([
    ['2', 'A'],
    ['22', 'B'],
    ['222', 'C'],
    ['44 33 555 555 666', 'HELLO'],
    ['2 0 22', 'A B'],
    ['7777', 'S'],
    ['9999', 'Z'],
    ['', ''],
    ['   ', ''],
    ['2 invalid 22', 'AB'],
    ['1 2', 'A'],
  ])('converts %s → %s', (input, expected) => {
    expect(phoneToText(input)).toBe(expected);
  });

  it.each([
    ['4433555555666', 'HELLO'],
    ['222', 'C'],
    ['2222', 'CA'],
    ['22222', 'CB'],
    ['77777777', 'SS'],
    ['222022', 'C B'],
    ['22 22', 'BB'],
  ])('converts spaceless %s → %s', (input, expected) => {
    expect(phoneToText(input)).toBe(expected);
  });

  it.each(['HELLO', 'ABC', 'CALL ME'])('round-trips %s', text => {
    expect(phoneToText(textToPhone(text))).toBe(text);
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
