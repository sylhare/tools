import { describe, it, expect, beforeEach } from 'vitest';
import { IntervalConverter } from '../../../../src/utils/conversions/IntervalConverter';
import { Unit, UnitCategory } from '../../../../src/utils/conversions/types';

describe('IntervalConverter', () => {
  const testUnits: Unit[] = [
    {
      id: 'celsius',
      name: 'Celsius',
      symbol: '°C',
      category: UnitCategory.Temperature,
      toBase: (value: number) => value,
      fromBase: (value: number) => value,
      isBase: true,
    },
    {
      id: 'fahrenheit',
      name: 'Fahrenheit',
      symbol: '°F',
      category: UnitCategory.Temperature,
      toBase: (value: number) => (value - 32) * 5 / 9,
      fromBase: (value: number) => (value * 9 / 5) + 32,
    },
    {
      id: 'kelvin',
      name: 'Kelvin',
      symbol: 'K',
      category: UnitCategory.Temperature,
      toBase: (value: number) => value - 273.15,
      fromBase: (value: number) => value + 273.15,
    },
  ];

  describe('constructor', () => {
    it('should create converter with valid options', () => {
      const converter = new IntervalConverter({
        units: testUnits,
        defaultPrecision: 2,
      });

      expect(converter).toBeDefined();
      expect(converter.getUnits()).toHaveLength(3);
    });

    it('should throw error if no units provided', () => {
      expect(() => {
        new IntervalConverter({
          units: [],
        });
      }).toThrow('At least one unit must be provided');
    });

    it('should throw error if units are in different categories', () => {
      const mixedUnits: Unit[] = [
        ...testUnits,
        {
          id: 'ml',
          name: 'Milliliters',
          symbol: 'mL',
          category: UnitCategory.Volume,
          toBase: v => v,
          fromBase: v => v,
        },
      ];

      expect(() => {
        new IntervalConverter({
          units: mixedUnits,
        });
      }).toThrow('All units must be in the same category');
    });
  });

  describe('convert', () => {
    let converter: IntervalConverter;

    beforeEach(() => {
      converter = new IntervalConverter({
        units: testUnits,
        defaultPrecision: 2,
      });
    });

    it('should return same value for same-unit conversion', () => {
      expect(converter.convert(100, 'celsius', 'celsius')).toBe(100);
      expect(converter.convert(212, 'fahrenheit', 'fahrenheit')).toBe(212);
    });

    it('should convert Celsius to Fahrenheit', () => {
      expect(converter.convert(0, 'celsius', 'fahrenheit')).toBeCloseTo(32, 5);
      expect(converter.convert(100, 'celsius', 'fahrenheit')).toBeCloseTo(212, 5);
      expect(converter.convert(37, 'celsius', 'fahrenheit')).toBeCloseTo(98.6, 1);
    });

    it('should convert Fahrenheit to Celsius', () => {
      expect(converter.convert(32, 'fahrenheit', 'celsius')).toBeCloseTo(0, 5);
      expect(converter.convert(212, 'fahrenheit', 'celsius')).toBeCloseTo(100, 5);
      expect(converter.convert(98.6, 'fahrenheit', 'celsius')).toBeCloseTo(37, 1);
    });

    it('should convert Celsius to Kelvin', () => {
      expect(converter.convert(0, 'celsius', 'kelvin')).toBeCloseTo(273.15, 2);
      expect(converter.convert(100, 'celsius', 'kelvin')).toBeCloseTo(373.15, 2);
      expect(converter.convert(-273.15, 'celsius', 'kelvin')).toBeCloseTo(0, 2);
    });

    it('should convert Kelvin to Celsius', () => {
      expect(converter.convert(273.15, 'kelvin', 'celsius')).toBeCloseTo(0, 5);
      expect(converter.convert(373.15, 'kelvin', 'celsius')).toBeCloseTo(100, 5);
      expect(converter.convert(0, 'kelvin', 'celsius')).toBeCloseTo(-273.15, 2);
    });

    it('should convert Fahrenheit to Kelvin (multi-step)', () => {
      expect(converter.convert(32, 'fahrenheit', 'kelvin')).toBeCloseTo(273.15, 2);
      expect(converter.convert(212, 'fahrenheit', 'kelvin')).toBeCloseTo(373.15, 2);
    });

    it('should handle negative temperatures', () => {
      expect(converter.convert(-40, 'celsius', 'fahrenheit')).toBeCloseTo(-40, 5);
      expect(converter.convert(-40, 'fahrenheit', 'celsius')).toBeCloseTo(-40, 5);
    });

    it('should handle absolute zero', () => {
      const kelvinResult = converter.convert(-273.15, 'celsius', 'kelvin');
      expect(kelvinResult).toBeCloseTo(0, 2);

      const kelvinFromF = converter.convert(-459.67, 'fahrenheit', 'kelvin');
      expect(kelvinFromF).toBeCloseTo(0, 1);
    });

    it('should throw error for unknown source unit', () => {
      expect(() => {
        converter.convert(100, 'unknown', 'celsius');
      }).toThrow('Unknown unit: unknown');
    });

    it('should throw error for unknown target unit', () => {
      expect(() => {
        converter.convert(100, 'celsius', 'unknown');
      }).toThrow('Unknown unit: unknown');
    });
  });

  describe('formatValue', () => {
    let converter: IntervalConverter;

    beforeEach(() => {
      converter = new IntervalConverter({
        units: testUnits,
        defaultPrecision: 2,
      });
    });

    it('should format with default precision', () => {
      expect(converter.formatValue(123.456)).toBe('123.46');
      expect(converter.formatValue(1.1)).toBe('1.10');
    });

    it('should format with custom precision', () => {
      expect(converter.formatValue(123.456, 0)).toBe('123');
      expect(converter.formatValue(123.456, 1)).toBe('123.5');
      expect(converter.formatValue(123.456, 3)).toBe('123.456');
    });

    it('should handle negative numbers', () => {
      expect(converter.formatValue(-273.15, 2)).toBe('-273.15');
    });

    it('should handle zero', () => {
      expect(converter.formatValue(0, 2)).toBe('0.00');
    });
  });

  describe('utility methods', () => {
    let converter: IntervalConverter;

    beforeEach(() => {
      converter = new IntervalConverter({
        units: testUnits,
        defaultPrecision: 3,
      });
    });

    it('should get all units', () => {
      const units = converter.getUnits();
      expect(units).toHaveLength(3);
      expect(units.map(u => u.id)).toEqual(['celsius', 'fahrenheit', 'kelvin']);
    });

    it('should get specific unit by ID', () => {
      const unit = converter.getUnit('fahrenheit');
      expect(unit).toBeDefined();
      expect(unit?.name).toBe('Fahrenheit');
    });

    it('should return undefined for unknown unit', () => {
      const unit = converter.getUnit('unknown');
      expect(unit).toBeUndefined();
    });

    it('should get precision', () => {
      expect(converter.getPrecision()).toBe(3);
    });
  });
});

