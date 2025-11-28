import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTemperatureConverter } from '../../../../src/pages/temperature-converter/useTemperatureConverter';

describe('useTemperatureConverter', () => {
  describe('conversion functions', () => {
    it('converts celsius to fahrenheit correctly', () => {
      const { result } = renderHook(() => useTemperatureConverter());
      
      expect(result.current.celsiusToFahrenheit(0)).toBe(32);
      expect(result.current.celsiusToFahrenheit(100)).toBe(212);
      expect(result.current.celsiusToFahrenheit(-40)).toBe(-40);
      expect(result.current.celsiusToFahrenheit(37)).toBeCloseTo(98.6, 1);
    });

    it('converts fahrenheit to celsius correctly', () => {
      const { result } = renderHook(() => useTemperatureConverter());
      
      expect(result.current.fahrenheitToCelsius(32)).toBe(0);
      expect(result.current.fahrenheitToCelsius(212)).toBe(100);
      expect(result.current.fahrenheitToCelsius(-40)).toBe(-40);
      expect(result.current.fahrenheitToCelsius(98.6)).toBeCloseTo(37, 1);
    });
  });

  describe('state management', () => {
    it('initializes with empty values', () => {
      const { result } = renderHook(() => useTemperatureConverter());
      
      expect(result.current.celsius).toBe('');
      expect(result.current.fahrenheit).toBe('');
    });

    it('updates fahrenheit when celsius changes', () => {
      const { result } = renderHook(() => useTemperatureConverter());
      
      act(() => {
        result.current.handleCelsiusChange({
          target: { value: '0' },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      
      expect(result.current.celsius).toBe('0');
      expect(result.current.fahrenheit).toBe('32.00');
    });

    it('updates celsius when fahrenheit changes', () => {
      const { result } = renderHook(() => useTemperatureConverter());
      
      act(() => {
        result.current.handleFahrenheitChange({
          target: { value: '32' },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      
      expect(result.current.fahrenheit).toBe('32');
      expect(result.current.celsius).toBe('0.00');
    });

    it('clears fahrenheit when celsius is cleared', () => {
      const { result } = renderHook(() => useTemperatureConverter());
      
      act(() => {
        result.current.handleCelsiusChange({
          target: { value: '25' },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      
      expect(result.current.fahrenheit).not.toBe('');
      
      act(() => {
        result.current.handleCelsiusChange({
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      
      expect(result.current.celsius).toBe('');
      expect(result.current.fahrenheit).toBe('');
    });

    it('clears celsius when fahrenheit is cleared', () => {
      const { result } = renderHook(() => useTemperatureConverter());
      
      act(() => {
        result.current.handleFahrenheitChange({
          target: { value: '77' },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      
      expect(result.current.celsius).not.toBe('');
      
      act(() => {
        result.current.handleFahrenheitChange({
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      
      expect(result.current.celsius).toBe('');
      expect(result.current.fahrenheit).toBe('');
    });

    it('handles negative temperatures', () => {
      const { result } = renderHook(() => useTemperatureConverter());
      
      act(() => {
        result.current.handleCelsiusChange({
          target: { value: '-10' },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      
      expect(result.current.celsius).toBe('-10');
      expect(parseFloat(result.current.fahrenheit)).toBeCloseTo(14, 1);
    });

    it('handles decimal values', () => {
      const { result } = renderHook(() => useTemperatureConverter());
      
      act(() => {
        result.current.handleCelsiusChange({
          target: { value: '36.5' },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      
      expect(result.current.celsius).toBe('36.5');
      expect(parseFloat(result.current.fahrenheit)).toBeCloseTo(97.7, 1);
    });

    it('handles partial input like minus sign', () => {
      const { result } = renderHook(() => useTemperatureConverter());
      
      act(() => {
        result.current.handleCelsiusChange({
          target: { value: '-' },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      
      expect(result.current.celsius).toBe('-');
      expect(result.current.fahrenheit).toBe('');
    });

    it('handles invalid number input gracefully', () => {
      const { result } = renderHook(() => useTemperatureConverter());
      
      act(() => {
        result.current.handleCelsiusChange({
          target: { value: 'abc' },
        } as React.ChangeEvent<HTMLInputElement>);
      });
      
      expect(result.current.celsius).toBe('abc');
      expect(result.current.fahrenheit).toBe('');
    });
  });
});

