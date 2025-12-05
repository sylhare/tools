import { describe, it, expect } from 'vitest';
import { RatioConverter } from '../../../../src/utils/conversions/RatioConverter';
import { Unit, UnitCategory } from '../../../../src/utils/conversions/types';

describe('RatioConverter', () => {
  const testUnits: Unit[] = [
    {
      id: 'ml',
      name: 'Milliliters',
      symbol: 'mL',
      category: UnitCategory.Volume,
      toBase: (value: number) => value,
      fromBase: (value: number) => value,
      isBase: true,
    },
    {
      id: 'cup',
      name: 'Cups',
      symbol: 'cup',
      category: UnitCategory.Volume,
      toBase: (value: number) => value * 236.588,
      fromBase: (value: number) => value / 236.588,
    },
    {
      id: 'floz',
      name: 'Fluid Ounces',
      symbol: 'fl oz',
      category: UnitCategory.Volume,
      toBase: (value: number) => value * 29.5735,
      fromBase: (value: number) => value / 29.5735,
    },
  ];

  const baseUnit = testUnits[0];

  describe('constructor', () => {
    it('should create converter with valid options', () => {
      const converter = new RatioConverter({
        baseUnit,
        units: testUnits,
        defaultPrecision: 2,
      });

      expect(converter).toBeDefined();
      expect(converter.getBaseUnit()).toEqual(baseUnit);
      expect(converter.getUnits()).toHaveLength(3);
    });

    it('should throw error if base unit not in units array', () => {
      const differentBase: Unit = {
        id: 'liter',
        name: 'Liter',
        symbol: 'L',
        category: UnitCategory.Volume,
        toBase: v => v * 1000,
        fromBase: v => v / 1000,
      };

      expect(() => {
        new RatioConverter({
          baseUnit: differentBase,
          units: testUnits,
        });
      }).toThrow('Base unit must be included in units array');
    });

    it('should throw error if units are in different categories', () => {
      const mixedUnits: Unit[] = [
        ...testUnits,
        {
          id: 'cm',
          name: 'Centimeters',
          symbol: 'cm',
          category: UnitCategory.Length,
          toBase: v => v,
          fromBase: v => v,
        },
      ];

      expect(() => {
        new RatioConverter({
          baseUnit,
          units: mixedUnits,
        });
      }).toThrow('All units must be in the same category');
    });
  });

  describe('convert', () => {
    let converter: RatioConverter;

    beforeEach(() => {
      converter = new RatioConverter({
        baseUnit,
        units: testUnits,
        defaultPrecision: 2,
      });
    });

    it('should return same value for same-unit conversion', () => {
      expect(converter.convert(100, 'ml', 'ml')).toBe(100);
      expect(converter.convert(5, 'cup', 'cup')).toBe(5);
    });

    it('should convert from base unit to other units', () => {
      const result = converter.convert(236.588, 'ml', 'cup');
      expect(result).toBeCloseTo(1, 5);
    });

    it('should convert to base unit from other units', () => {
      const result = converter.convert(1, 'cup', 'ml');
      expect(result).toBeCloseTo(236.588, 3);
    });

    it('should convert between two non-base units', () => {
      const result = converter.convert(1, 'cup', 'floz');
      expect(result).toBeCloseTo(8, 1);
    });

    it('should handle zero values', () => {
      expect(converter.convert(0, 'ml', 'cup')).toBe(0);
      expect(converter.convert(0, 'cup', 'floz')).toBe(0);
    });

    it('should handle negative values', () => {
      const result = converter.convert(-100, 'ml', 'cup');
      expect(result).toBeLessThan(0);
      expect(Math.abs(result)).toBeCloseTo(0.422675, 5);
    });

    it('should handle very large numbers', () => {
      const result = converter.convert(1000000, 'ml', 'cup');
      expect(result).toBeGreaterThan(4000);
    });

    it('should handle very small numbers', () => {
      const result = converter.convert(0.001, 'ml', 'cup');
      expect(result).toBeCloseTo(0.00000422675, 10);
    });

    it('should throw error for unknown source unit', () => {
      expect(() => {
        converter.convert(100, 'unknown', 'ml');
      }).toThrow('Unknown unit: unknown');
    });

    it('should throw error for unknown target unit', () => {
      expect(() => {
        converter.convert(100, 'ml', 'unknown');
      }).toThrow('Unknown unit: unknown');
    });
  });

  describe('toBase', () => {
    let converter: RatioConverter;

    beforeEach(() => {
      converter = new RatioConverter({
        baseUnit,
        units: testUnits,
      });
    });

    it('should convert to base unit', () => {
      expect(converter.toBase(1, 'cup')).toBeCloseTo(236.588, 3);
      expect(converter.toBase(1, 'floz')).toBeCloseTo(29.5735, 4);
    });

    it('should return same value for base unit', () => {
      expect(converter.toBase(100, 'ml')).toBe(100);
    });
  });

  describe('fromBase', () => {
    let converter: RatioConverter;

    beforeEach(() => {
      converter = new RatioConverter({
        baseUnit,
        units: testUnits,
      });
    });

    it('should convert from base unit', () => {
      expect(converter.fromBase(236.588, 'cup')).toBeCloseTo(1, 5);
      expect(converter.fromBase(29.5735, 'floz')).toBeCloseTo(1, 5);
    });

    it('should return same value for base unit', () => {
      expect(converter.fromBase(100, 'ml')).toBe(100);
    });
  });

  describe('formatValue', () => {
    let converter: RatioConverter;

    beforeEach(() => {
      converter = new RatioConverter({
        baseUnit,
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

    it('should handle very small numbers with scientific notation', () => {
      const result = converter.formatValue(0.000001, 2);
      expect(result).toContain('e');
    });

    it('should handle very large numbers with scientific notation', () => {
      const result = converter.formatValue(10000000000000, 2);
      expect(result).toContain('e');
    });

    it('should handle zero', () => {
      expect(converter.formatValue(0, 2)).toBe('0.00');
    });
  });

  describe('utility methods', () => {
    let converter: RatioConverter;

    beforeEach(() => {
      converter = new RatioConverter({
        baseUnit,
        units: testUnits,
        defaultPrecision: 3,
      });
    });

    it('should get all units', () => {
      const units = converter.getUnits();
      expect(units).toHaveLength(3);
      expect(units.map(u => u.id)).toEqual(['ml', 'cup', 'floz']);
    });

    it('should get specific unit by ID', () => {
      const unit = converter.getUnit('cup');
      expect(unit).toBeDefined();
      expect(unit?.name).toBe('Cups');
    });

    it('should return undefined for unknown unit', () => {
      const unit = converter.getUnit('unknown');
      expect(unit).toBeUndefined();
    });

    it('should get base unit', () => {
      const base = converter.getBaseUnit();
      expect(base.id).toBe('ml');
      expect(base.isBase).toBe(true);
    });

    it('should get precision', () => {
      expect(converter.getPrecision()).toBe(3);
    });
  });
});

