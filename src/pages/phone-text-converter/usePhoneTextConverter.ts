import { useState, useMemo, ChangeEvent } from 'react';

export const KEYPAD: Record<string, string> = {
  '2': 'ABC',
  '3': 'DEF',
  '4': 'GHI',
  '5': 'JKL',
  '6': 'MNO',
  '7': 'PQRS',
  '8': 'TUV',
  '9': 'WXYZ',
};

export const LETTER_TO_SEQUENCE: Record<string, string> = (() => {
  const map: Record<string, string> = { ' ': '0' };
  for (const [key, letters] of Object.entries(KEYPAD)) {
    for (let i = 0; i < letters.length; i++) {
      map[letters[i]] = key.repeat(i + 1);
    }
  }
  return map;
})();

export const SEQUENCE_TO_LETTER: Record<string, string> = Object.fromEntries(
  Object.entries(LETTER_TO_SEQUENCE).map(([letter, seq]) => [seq, letter])
);

const MAX_REPEATS: Record<string, number> = { '0': 1 };
for (const [key, letters] of Object.entries(KEYPAD)) {
  MAX_REPEATS[key] = letters.length;
}

function parseDigits(digits: string): string {
  const chars: string[] = [];
  let i = 0;
  while (i < digits.length) {
    const digit = digits[i];
    const max = MAX_REPEATS[digit];
    if (!max) {
      i++;
      continue;
    }
    let count = 0;
    while (i < digits.length && digits[i] === digit && count < max) {
      count++;
      i++;
    }
    const letter = SEQUENCE_TO_LETTER[digit.repeat(count)];
    if (letter !== undefined) chars.push(letter);
  }
  return chars.join('');
}

export interface CharMapping {
  char: string;
  sequence: string;
}

export function getBreakdown(text: string): CharMapping[] {
  const mappings: CharMapping[] = [];
  for (const char of text.toUpperCase()) {
    const seq = LETTER_TO_SEQUENCE[char];
    if (seq !== undefined) mappings.push({ char, sequence: seq });
  }
  return mappings;
}

export function textToPhone(text: string): string {
  return getBreakdown(text).map(m => m.sequence).join(' ');
}

export function phoneToText(phone: string): string {
  const trimmed = phone.trim();
  if (!trimmed) return '';
  return trimmed.split(/\s+/).map(parseDigits).join('');
}

interface UsePhoneTextConverterReturn {
  text: string;
  phone: string;
  breakdown: CharMapping[];
  handleTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
  appendDigit: (digit: string) => void;
  clear: () => void;
}

export function usePhoneTextConverter(): UsePhoneTextConverterReturn {
  const [text, setText] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const breakdown = useMemo(() => getBreakdown(text), [text]);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setText(value);
    setPhone(getBreakdown(value).map(m => m.sequence).join(' '));
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setPhone(value);
    setText(phoneToText(value));
  };

  const appendDigit = (digit: string): void => {
    const newPhone = phone + digit;
    setPhone(newPhone);
    setText(phoneToText(newPhone));
  };

  const clear = (): void => {
    setText('');
    setPhone('');
  };

  return { text, phone, breakdown, handleTextChange, handlePhoneChange, appendDigit, clear };
}
