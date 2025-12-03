import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useHexRgbConverter } from '../../../../src/pages/hex-rgb-converter/useHexRgbConverter';

describe('useHexRgbConverter', () => {
  describe('conversion functions', () => {
    it('converts hex to rgb correctly', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      expect(result.current.hexToRgb('FF0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(result.current.hexToRgb('00FF00')).toEqual({ r: 0, g: 255, b: 0 });
      expect(result.current.hexToRgb('0000FF')).toEqual({ r: 0, g: 0, b: 255 });
      expect(result.current.hexToRgb('FFFFFF')).toEqual({ r: 255, g: 255, b: 255 });
      expect(result.current.hexToRgb('000000')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('converts hex with # prefix correctly', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      expect(result.current.hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
      expect(result.current.hexToRgb('#00FF00')).toEqual({ r: 0, g: 255, b: 0 });
    });

    it('converts shorthand hex correctly', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      expect(result.current.hexToRgb('F00')).toEqual({ r: 255, g: 0, b: 0 });
      expect(result.current.hexToRgb('0F0')).toEqual({ r: 0, g: 255, b: 0 });
      expect(result.current.hexToRgb('00F')).toEqual({ r: 0, g: 0, b: 255 });
      expect(result.current.hexToRgb('#FFF')).toEqual({ r: 255, g: 255, b: 255 });
    });

    it('returns null for invalid hex', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      expect(result.current.hexToRgb('GGGGGG')).toBeNull();
      expect(result.current.hexToRgb('12345')).toBeNull();
      expect(result.current.hexToRgb('1234567')).toBeNull();
      expect(result.current.hexToRgb('XYZ')).toBeNull();
    });

    it('converts rgb to hex correctly', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      expect(result.current.rgbToHex(255, 0, 0)).toBe('ff0000');
      expect(result.current.rgbToHex(0, 255, 0)).toBe('00ff00');
      expect(result.current.rgbToHex(0, 0, 255)).toBe('0000ff');
      expect(result.current.rgbToHex(255, 255, 255)).toBe('ffffff');
      expect(result.current.rgbToHex(0, 0, 0)).toBe('000000');
    });

    it('clamps rgb values to valid range', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      expect(result.current.rgbToHex(300, 0, 0)).toBe('ff0000');
      expect(result.current.rgbToHex(-10, 0, 0)).toBe('000000');
      expect(result.current.rgbToHex(128, 300, -50)).toBe('80ff00');
    });

    it('rounds decimal rgb values', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      expect(result.current.rgbToHex(127.4, 127.4, 127.4)).toBe('7f7f7f');
      expect(result.current.rgbToHex(127.6, 127.6, 127.6)).toBe('808080');
    });
  });

  describe('state management', () => {
    it('initializes with empty values', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      expect(result.current.hex).toBe('');
      expect(result.current.r).toBe('');
      expect(result.current.g).toBe('');
      expect(result.current.b).toBe('');
      expect(result.current.displayHex).toBe('');
      expect(result.current.displayRgb).toBe('');
    });

    it('updates rgb when hex changes', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      act(() => {
        result.current.handleHexChange({
          target: { value: 'FF0000' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.hex).toBe('FF0000');
      expect(result.current.r).toBe('255');
      expect(result.current.g).toBe('0');
      expect(result.current.b).toBe('0');
    });

    it('updates rgb when hex with # changes', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      act(() => {
        result.current.handleHexChange({
          target: { value: '#00FF00' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.hex).toBe('#00FF00');
      expect(result.current.r).toBe('0');
      expect(result.current.g).toBe('255');
      expect(result.current.b).toBe('0');
    });

    it('updates hex when r changes', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      act(() => {
        result.current.handleRChange({
          target: { value: '255' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.r).toBe('255');
      expect(result.current.hex).toBe('ff0000');
    });

    it('updates hex when g changes', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      act(() => {
        result.current.handleGChange({
          target: { value: '255' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.g).toBe('255');
      expect(result.current.hex).toBe('00ff00');
    });

    it('updates hex when b changes', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      act(() => {
        result.current.handleBChange({
          target: { value: '255' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.b).toBe('255');
      expect(result.current.hex).toBe('0000ff');
    });

    it('updates hex when all rgb values change', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      act(() => {
        result.current.handleRChange({
          target: { value: '128' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleGChange({
          target: { value: '64' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleBChange({
          target: { value: '192' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.hex).toBe('8040c0');
    });

    it('clears rgb when hex is cleared', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      act(() => {
        result.current.handleHexChange({
          target: { value: 'FF0000' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.r).not.toBe('');

      act(() => {
        result.current.handleHexChange({
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.hex).toBe('');
      expect(result.current.r).toBe('');
      expect(result.current.g).toBe('');
      expect(result.current.b).toBe('');
    });

    it('clears hex when all rgb values are cleared', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      act(() => {
        result.current.handleRChange({
          target: { value: '255' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.hex).not.toBe('');

      act(() => {
        result.current.handleRChange({
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.hex).toBe('');
      expect(result.current.r).toBe('');
    });

    it('handles invalid hex input gracefully', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      act(() => {
        result.current.handleHexChange({
          target: { value: 'INVALID' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.hex).toBe('INVALID');
      // RGB should not change for invalid hex
      expect(result.current.r).toBe('');
      expect(result.current.g).toBe('');
      expect(result.current.b).toBe('');
    });

    it('treats empty rgb values as 0 when converting to hex', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      act(() => {
        result.current.handleRChange({
          target: { value: '255' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.hex).toBe('ff0000');
      expect(result.current.g).toBe('');
      expect(result.current.b).toBe('');
    });
  });

  describe('display formats', () => {
    it('formats displayHex with # prefix', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      act(() => {
        result.current.handleHexChange({
          target: { value: 'FF5733' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.displayHex).toBe('#FF5733');
    });

    it('formats displayHex with only one # even if input has #', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      act(() => {
        result.current.handleHexChange({
          target: { value: '#FF5733' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.displayHex).toBe('#FF5733');
      expect(result.current.displayHex.match(/#/g)?.length).toBe(1);
    });

    it('formats displayRgb in rgb() format', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      act(() => {
        result.current.handleRChange({
          target: { value: '128' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleGChange({
          target: { value: '64' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      act(() => {
        result.current.handleBChange({
          target: { value: '192' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.displayRgb).toBe('rgb(128, 64, 192)');
    });

    it('displays rgb with 0 for empty values', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      act(() => {
        result.current.handleRChange({
          target: { value: '255' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.displayRgb).toBe('rgb(255, 0, 0)');
    });

    it('returns empty strings when all values are empty', () => {
      const { result } = renderHook(() => useHexRgbConverter());

      expect(result.current.displayHex).toBe('');
      expect(result.current.displayRgb).toBe('');
    });
  });
});

