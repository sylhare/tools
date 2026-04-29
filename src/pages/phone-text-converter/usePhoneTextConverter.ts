import { useState, ChangeEvent } from 'react';

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

const buildLetterToSequence = (): Record<string, string> => {
  const map: Record<string, string> = { ' ': '0' };
  for (const [key, letters] of Object.entries(KEYPAD)) {
    for (let i = 0; i < letters.length; i++) {
      map[letters[i]] = key.repeat(i + 1);
    }
  }
  return map;
};

export const LETTER_TO_SEQUENCE: Record<string, string> = buildLetterToSequence();

export const SEQUENCE_TO_LETTER: Record<string, string> = Object.fromEntries(
  Object.entries(LETTER_TO_SEQUENCE).map(([letter, seq]) => [seq, letter])
);

export interface CharMapping {
  char: string;
  sequence: string;
}

export function textToPhone(text: string): string {
  const sequences: string[] = [];
  for (const char of text.toUpperCase()) {
    const seq = LETTER_TO_SEQUENCE[char];
    if (seq !== undefined) sequences.push(seq);
  }
  return sequences.join(' ');
}

export function phoneToText(phone: string): string {
  if (!phone.trim()) return '';
  const chars: string[] = [];
  for (const seq of phone.trim().split(/\s+/)) {
    const letter = SEQUENCE_TO_LETTER[seq];
    if (letter !== undefined) chars.push(letter);
  }
  return chars.join('');
}

export function getBreakdown(text: string): CharMapping[] {
  const mappings: CharMapping[] = [];
  for (const char of text.toUpperCase()) {
    const seq = LETTER_TO_SEQUENCE[char];
    if (seq !== undefined) mappings.push({ char, sequence: seq });
  }
  return mappings;
}

interface UsePhoneTextConverterReturn {
  text: string;
  phone: string;
  breakdown: CharMapping[];
  handleTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePhoneChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function usePhoneTextConverter(): UsePhoneTextConverterReturn {
  const [text, setText] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [breakdown, setBreakdown] = useState<CharMapping[]>([]);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setText(value);
    setPhone(textToPhone(value));
    setBreakdown(getBreakdown(value));
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setPhone(value);
    const textValue = phoneToText(value);
    setText(textValue);
    setBreakdown(getBreakdown(textValue));
  };

  return { text, phone, breakdown, handleTextChange, handlePhoneChange };
}
