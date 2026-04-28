import { useState, ChangeEvent } from 'react';

interface UseHexRgbConverterReturn {
  hex: string;
  r: string;
  g: string;
  b: string;
  rgbInput: string;
  displayHex: string;
  displayRgb: string;
  handleHexChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleGChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRgbInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hexToRgb: (hex: string) => { r: number; g: number; b: number } | null;
  rgbToHex: (r: number, g: number, b: number) => string;
}

export function useHexRgbConverter(): UseHexRgbConverterReturn {
  const [hex, setHex] = useState<string>('');
  const [r, setR] = useState<string>('');
  const [g, setG] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [rgbInput, setRgbInput] = useState<string>('');

  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const cleanHex = hex.replace(/^#/, '');

    if (!/^[0-9A-Fa-f]{3}$|^[0-9A-Fa-f]{6}$/.test(cleanHex)) {
      return null;
    }

    const fullHex = cleanHex.length === 3
      ? cleanHex.split('').map(char => char + char).join('')
      : cleanHex;

    const num = parseInt(fullHex, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;

    return { r, g, b };
  };

  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (n: number): string => {
      const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
      return hex.padStart(2, '0');
    };

    return toHex(r) + toHex(g) + toHex(b);
  };

  const parseRgbString = (value: string): { r: number; g: number; b: number } | null => {
    const match = value.match(/^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i);
    if (!match) return null;
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    if (r > 255 || g > 255 || b > 255) return null;
    return { r, g, b };
  };

  const handleHexChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setHex(value);

    if (value === '') {
      setR('');
      setG('');
      setB('');
      setRgbInput('');
    } else {
      const rgb = hexToRgb(value);
      if (rgb) {
        setR(rgb.r.toString());
        setG(rgb.g.toString());
        setB(rgb.b.toString());
        setRgbInput(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`);
      }
    }
  };

  const handleRChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setR(value);
    updateHexFromRgb(value, g, b);
  };

  const handleGChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setG(value);
    updateHexFromRgb(r, value, b);
  };

  const handleBChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setB(value);
    updateHexFromRgb(r, g, value);
  };

  const handleRgbInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setRgbInput(value);

    if (value === '') {
      setR('');
      setG('');
      setB('');
      setHex('');
    } else {
      const rgb = parseRgbString(value);
      if (rgb) {
        setR(rgb.r.toString());
        setG(rgb.g.toString());
        setB(rgb.b.toString());
        setHex(rgbToHex(rgb.r, rgb.g, rgb.b));
      }
    }
  };

  const updateHexFromRgb = (rVal: string, gVal: string, bVal: string): void => {
    if (rVal === '' && gVal === '' && bVal === '') {
      setHex('');
      setRgbInput('');
      return;
    }

    const rNum = rVal === '' ? 0 : parseFloat(rVal);
    const gNum = gVal === '' ? 0 : parseFloat(gVal);
    const bNum = bVal === '' ? 0 : parseFloat(bVal);

    if (!isNaN(rNum) && !isNaN(gNum) && !isNaN(bNum)) {
      setHex(rgbToHex(rNum, gNum, bNum));
      setRgbInput(`rgb(${Math.round(rNum)}, ${Math.round(gNum)}, ${Math.round(bNum)})`);
    }
  };

  const displayHex = hex ? `#${hex.replace(/^#/, '')}` : '';
  const displayRgb = r || g || b ? `rgb(${r || 0}, ${g || 0}, ${b || 0})` : '';

  return {
    hex,
    r,
    g,
    b,
    rgbInput,
    displayHex,
    displayRgb,
    handleHexChange,
    handleRChange,
    handleGChange,
    handleBChange,
    handleRgbInputChange,
    hexToRgb,
    rgbToHex,
  };
}
