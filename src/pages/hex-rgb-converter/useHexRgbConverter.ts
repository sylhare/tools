import { useState, ChangeEvent } from 'react';

interface UseHexRgbConverterReturn {
  hex: string;
  r: string;
  g: string;
  b: string;
  displayHex: string;
  displayRgb: string;
  handleHexChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleRChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleGChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hexToRgb: (hex: string) => { r: number; g: number; b: number } | null;
  rgbToHex: (r: number, g: number, b: number) => string;
}

export function useHexRgbConverter(): UseHexRgbConverterReturn {
  const [hex, setHex] = useState<string>('');
  const [r, setR] = useState<string>('');
  const [g, setG] = useState<string>('');
  const [b, setB] = useState<string>('');

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

  const handleHexChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setHex(value);

    if (value === '') {
      setR('');
      setG('');
      setB('');
    } else {
      const rgb = hexToRgb(value);
      if (rgb) {
        setR(rgb.r.toString());
        setG(rgb.g.toString());
        setB(rgb.b.toString());
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

  const updateHexFromRgb = (rVal: string, gVal: string, bVal: string): void => {
    if (rVal === '' && gVal === '' && bVal === '') {
      setHex('');
      return;
    }

    const rNum = rVal === '' ? 0 : parseFloat(rVal);
    const gNum = gVal === '' ? 0 : parseFloat(gVal);
    const bNum = bVal === '' ? 0 : parseFloat(bVal);

    if (!isNaN(rNum) && !isNaN(gNum) && !isNaN(bNum)) {
      const hexValue = rgbToHex(rNum, gNum, bNum);
      setHex(hexValue);
    }
  };

  const displayHex = hex ? `#${hex.replace(/^#/, '')}` : '';
  const displayRgb = r || g || b ? `rgb(${r || 0}, ${g || 0}, ${b || 0})` : '';

  return {
    hex,
    r,
    g,
    b,
    displayHex,
    displayRgb,
    handleHexChange,
    handleRChange,
    handleGChange,
    handleBChange,
    hexToRgb,
    rgbToHex,
  };
}

