import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useConverter } from '../../../../src/utils/conversions/useConverter';
import { RatioConverter } from '../../../../src/utils/conversions/RatioConverter';
import { IntervalConverter } from '../../../../src/utils/conversions/IntervalConverter';
import { Unit, UnitCategory } from '../../../../src/utils/conversions/types';

describe('useConverter', () => {
  const volumeTestUnits: Unit[] = [
    {
      id: 'ml',
      name: 'Milliliters',
      symbol: 'mL',
      category: UnitCategory.Volume,
      toBase: (v) => v,
      fromBase: (v) => v,
      isBase: true,
    },
    {
      id: 'cup',
      name: 'Cups',
      symbol: 'cup',
      category: UnitCategory.Volume,
      toBase: (v) => v * 236.588,
      fromBase: (v) => v / 236.588,
    },
  ];

  const tempTestUnits: Unit[] = [
    {
      id: 'celsius',
      name: 'Celsius',
      symbol: '°C',
      category: UnitCategory.Temperature,
      toBase: (v) => v,
      fromBase: (v) => v,
      isBase: true,
    },
    {
      id: 'fahrenheit',
      name: 'Fahrenheit',
      symbol: '°F',
      category: UnitCategory.Temperature,
      toBase: (v) => (v - 32) * 5 / 9,
      fromBase: (v) => (v * 9 / 5) + 32,
    },
  ];

  describe('with RatioConverter', () => {
    let converter: RatioConverter;

    beforeEach(() => {
      converter = new RatioConverter({
        baseUnit: volumeTestUnits[0],
        units: volumeTestUnits,
        defaultPrecision: 2,
      });
    });

    it('should initialize with empty values', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
        })
      );

      expect(result.current.values.ml).toBe('');
      expect(result.current.values.cup).toBe('');
    });

    it('should provide handlers for each unit', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
        })
      );

      expect(result.current.handlers.ml).toBeDefined();
      expect(result.current.handlers.cup).toBeDefined();
      expect(typeof result.current.handlers.ml).toBe('function');
    });

    it('should convert from mL to cup on input change', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
          defaultPrecision: 2,
        })
      );

      act(() => {
        result.current.handlers.ml({
          target: { value: '236.588' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.ml).toBe('236.588');
      expect(parseFloat(result.current.values.cup)).toBeCloseTo(1, 1);
    });

    it('should convert from cup to mL on input change', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
          defaultPrecision: 2,
        })
      );

      act(() => {
        result.current.handlers.cup({
          target: { value: '1' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.cup).toBe('1');
      expect(parseFloat(result.current.values.ml)).toBeCloseTo(236.588, 1);
    });

    it('should clear all fields when input is cleared', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
        })
      );

      act(() => {
        result.current.handlers.ml({
          target: { value: '100' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.ml).toBe('100');
      expect(result.current.values.cup).not.toBe('');

      act(() => {
        result.current.handlers.ml({
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.ml).toBe('');
      expect(result.current.values.cup).toBe('');
    });

    it('should handle empty string input', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
        })
      );

      act(() => {
        result.current.handlers.ml({
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.ml).toBe('');
      expect(result.current.values.cup).toBe('');
    });

    it('should handle minus sign input', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
        })
      );

      act(() => {
        result.current.handlers.ml({
          target: { value: '-' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.ml).toBe('');
      expect(result.current.values.cup).toBe('');
    });

    it('should handle invalid number input', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
        })
      );

      act(() => {
        result.current.handlers.ml({
          target: { value: 'abc' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.ml).toBe('abc');
    });

    it('should handle zero input', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
        })
      );

      act(() => {
        result.current.handlers.ml({
          target: { value: '0' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.ml).toBe('0');
      expect(result.current.values.cup).toBe('0.00');
    });

    it('should handle negative numbers', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
          defaultPrecision: 2,
        })
      );

      act(() => {
        result.current.handlers.ml({
          target: { value: '-100' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.ml).toBe('-100');
      expect(parseFloat(result.current.values.cup)).toBeLessThan(0);
    });

    it('should clear all fields with clearAll function', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
        })
      );

      act(() => {
        result.current.handlers.ml({
          target: { value: '100' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.ml).not.toBe('');

      act(() => {
        result.current.clearAll();
      });

      expect(result.current.values.ml).toBe('');
      expect(result.current.values.cup).toBe('');
    });

    it('should format values with custom precision', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
          defaultPrecision: 3,
        })
      );

      act(() => {
        result.current.handlers.ml({
          target: { value: '236.588' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.cup).toMatch(/\.\d{3}$/);
    });

    it('should apply precision overrides', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
          defaultPrecision: 2,
          precisionOverrides: { cup: 5 },
        })
      );

      act(() => {
        result.current.handlers.ml({
          target: { value: '100' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.cup).toMatch(/\.\d{5}$/);
    });

    it('should provide formatValue function', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
          defaultPrecision: 2,
        })
      );

      const formatted = result.current.formatValue(123.456, 'ml');
      expect(formatted).toBe('123.46');
    });

    it('should return units array', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
        })
      );

      expect(result.current.units).toEqual(volumeTestUnits);
    });
  });

  describe('with IntervalConverter', () => {
    let converter: IntervalConverter;

    beforeEach(() => {
      converter = new IntervalConverter({
        units: tempTestUnits,
        defaultPrecision: 2,
      });
    });

    it('should work with temperature conversions', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: tempTestUnits,
          defaultPrecision: 2,
        })
      );

      act(() => {
        result.current.handlers.celsius({
          target: { value: '0' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.celsius).toBe('0');
      expect(parseFloat(result.current.values.fahrenheit)).toBeCloseTo(32, 1);
    });

    it('should handle negative temperatures', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: tempTestUnits,
          defaultPrecision: 2,
        })
      );

      act(() => {
        result.current.handlers.celsius({
          target: { value: '-40' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.celsius).toBe('-40');
      expect(parseFloat(result.current.values.fahrenheit)).toBeCloseTo(-40, 1);
    });

    it('should convert fahrenheit to celsius', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: tempTestUnits,
          defaultPrecision: 2,
        })
      );

      act(() => {
        result.current.handlers.fahrenheit({
          target: { value: '212' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.fahrenheit).toBe('212');
      expect(parseFloat(result.current.values.celsius)).toBeCloseTo(100, 1);
    });
  });

  describe('edge cases', () => {
    let converter: RatioConverter;

    beforeEach(() => {
      converter = new RatioConverter({
        baseUnit: volumeTestUnits[0],
        units: volumeTestUnits,
        defaultPrecision: 2,
      });
    });

    it('should handle rapid successive changes', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
        })
      );

      act(() => {
        result.current.handlers.ml({
          target: { value: '100' },
        } as React.ChangeEvent<HTMLInputElement>);
        
        result.current.handlers.ml({
          target: { value: '200' },
        } as React.ChangeEvent<HTMLInputElement>);
        
        result.current.handlers.ml({
          target: { value: '300' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.ml).toBe('300');
    });

    it('should handle very large numbers', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
        })
      );

      act(() => {
        result.current.handlers.ml({
          target: { value: '1000000' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.ml).toBe('1000000');
      expect(result.current.values.cup).not.toBe('');
    });

    it('should handle very small numbers', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
        })
      );

      act(() => {
        result.current.handlers.ml({
          target: { value: '0.001' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.ml).toBe('0.001');
      expect(result.current.values.cup).not.toBe('');
    });

    it('should handle decimal input', () => {
      const { result } = renderHook(() =>
        useConverter({
          converter,
          units: volumeTestUnits,
        })
      );

      act(() => {
        result.current.handlers.ml({
          target: { value: '123.456' },
        } as React.ChangeEvent<HTMLInputElement>);
      });

      expect(result.current.values.ml).toBe('123.456');
    });
  });
});

