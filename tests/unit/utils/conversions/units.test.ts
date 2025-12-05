import { describe, it, expect } from 'vitest';
import {
  volumeUnits,
  lengthUnits,
  weightUnits,
  temperatureUnits,
  getBaseUnit,
  getUnitsForCategory,
} from '../../../../src/utils/conversions/units';
import { UnitCategory } from '../../../../src/utils/conversions/types';

describe('Unit Definitions', () => {
  describe('volumeUnits', () => {
    it('should have milliliters as base unit', () => {
      const baseUnit = volumeUnits.find(u => u.isBase);
      expect(baseUnit).toBeDefined();
      expect(baseUnit?.id).toBe('ml');
    });

    it('should have all volume units defined', () => {
      const unitIds = volumeUnits.map(u => u.id);
      expect(unitIds).toContain('ml');
      expect(unitIds).toContain('tsp');
      expect(unitIds).toContain('tbsp');
      expect(unitIds).toContain('floz');
      expect(unitIds).toContain('cup');
      expect(unitIds).toContain('pint');
      expect(unitIds).toContain('quart');
      expect(unitIds).toContain('gallon');
      expect(unitIds).toContain('liter');
    });

    it('should have correct conversion for 1 cup to mL', () => {
      const cup = volumeUnits.find(u => u.id === 'cup');
      expect(cup).toBeDefined();
      const mlValue = cup!.toBase(1);
      expect(mlValue).toBeCloseTo(236.588, 3);
    });

    it('should have correct conversion for 1 liter to mL', () => {
      const liter = volumeUnits.find(u => u.id === 'liter');
      expect(liter).toBeDefined();
      const mlValue = liter!.toBase(1);
      expect(mlValue).toBe(1000);
    });

    it('should have reciprocal conversions', () => {
      volumeUnits.forEach(unit => {
        const toBase = unit.toBase(1);
        const fromBase = unit.fromBase(toBase);
        expect(fromBase).toBeCloseTo(1, 10);
      });
    });

    it('should all be in Volume category', () => {
      volumeUnits.forEach(unit => {
        expect(unit.category).toBe(UnitCategory.Volume);
      });
    });
  });

  describe('lengthUnits', () => {
    it('should have centimeters as base unit', () => {
      const baseUnit = lengthUnits.find(u => u.isBase);
      expect(baseUnit).toBeDefined();
      expect(baseUnit?.id).toBe('cm');
    });

    it('should have all length units defined', () => {
      const unitIds = lengthUnits.map(u => u.id);
      expect(unitIds).toContain('mm');
      expect(unitIds).toContain('cm');
      expect(unitIds).toContain('m');
      expect(unitIds).toContain('km');
      expect(unitIds).toContain('in');
      expect(unitIds).toContain('ft');
      expect(unitIds).toContain('yd');
      expect(unitIds).toContain('mi');
    });

    it('should have correct conversion for 1 inch to cm', () => {
      const inch = lengthUnits.find(u => u.id === 'in');
      expect(inch).toBeDefined();
      const cmValue = inch!.toBase(1);
      expect(cmValue).toBeCloseTo(2.54, 2);
    });

    it('should have correct conversion for 1 foot to cm', () => {
      const foot = lengthUnits.find(u => u.id === 'ft');
      expect(foot).toBeDefined();
      const cmValue = foot!.toBase(1);
      expect(cmValue).toBeCloseTo(30.48, 2);
    });

    it('should have correct conversion for 1 meter to cm', () => {
      const meter = lengthUnits.find(u => u.id === 'm');
      expect(meter).toBeDefined();
      const cmValue = meter!.toBase(1);
      expect(cmValue).toBe(100);
    });

    it('should have reciprocal conversions', () => {
      lengthUnits.forEach(unit => {
        const toBase = unit.toBase(1);
        const fromBase = unit.fromBase(toBase);
        expect(fromBase).toBeCloseTo(1, 10);
      });
    });

    it('should all be in Length category', () => {
      lengthUnits.forEach(unit => {
        expect(unit.category).toBe(UnitCategory.Length);
      });
    });
  });

  describe('weightUnits', () => {
    it('should have grams as base unit', () => {
      const baseUnit = weightUnits.find(u => u.isBase);
      expect(baseUnit).toBeDefined();
      expect(baseUnit?.id).toBe('g');
    });

    it('should have all weight units defined', () => {
      const unitIds = weightUnits.map(u => u.id);
      expect(unitIds).toContain('g');
      expect(unitIds).toContain('oz');
      expect(unitIds).toContain('lb');
      expect(unitIds).toContain('kg');
    });

    it('should have correct conversion for 1 kg to g', () => {
      const kg = weightUnits.find(u => u.id === 'kg');
      expect(kg).toBeDefined();
      const gValue = kg!.toBase(1);
      expect(gValue).toBe(1000);
    });

    it('should have reciprocal conversions', () => {
      weightUnits.forEach(unit => {
        const toBase = unit.toBase(1);
        const fromBase = unit.fromBase(toBase);
        expect(fromBase).toBeCloseTo(1, 10);
      });
    });

    it('should all be in Weight category', () => {
      weightUnits.forEach(unit => {
        expect(unit.category).toBe(UnitCategory.Weight);
      });
    });
  });

  describe('temperatureUnits', () => {
    it('should have celsius as base unit', () => {
      const baseUnit = temperatureUnits.find(u => u.isBase);
      expect(baseUnit).toBeDefined();
      expect(baseUnit?.id).toBe('celsius');
    });

    it('should have all temperature units defined', () => {
      const unitIds = temperatureUnits.map(u => u.id);
      expect(unitIds).toContain('celsius');
      expect(unitIds).toContain('fahrenheit');
      expect(unitIds).toContain('kelvin');
      expect(unitIds).toContain('rankine');
    });

    it('should have correct Fahrenheit conversion', () => {
      const fahrenheit = temperatureUnits.find(u => u.id === 'fahrenheit');
      expect(fahrenheit).toBeDefined();

      expect(fahrenheit!.toBase(32)).toBeCloseTo(0, 5);
      expect(fahrenheit!.toBase(212)).toBeCloseTo(100, 5);

      expect(fahrenheit!.fromBase(0)).toBeCloseTo(32, 5);
      expect(fahrenheit!.fromBase(100)).toBeCloseTo(212, 5);
    });

    it('should have correct Kelvin conversion', () => {
      const kelvin = temperatureUnits.find(u => u.id === 'kelvin');
      expect(kelvin).toBeDefined();

      expect(kelvin!.toBase(273.15)).toBeCloseTo(0, 2);
      expect(kelvin!.toBase(373.15)).toBeCloseTo(100, 2);

      expect(kelvin!.fromBase(0)).toBeCloseTo(273.15, 2);
      expect(kelvin!.fromBase(100)).toBeCloseTo(373.15, 2);
    });

    it('should handle special temperature points', () => {
      const fahrenheit = temperatureUnits.find(u => u.id === 'fahrenheit');

      expect(fahrenheit!.toBase(-40)).toBeCloseTo(-40, 5);
      expect(fahrenheit!.fromBase(-40)).toBeCloseTo(-40, 5);
    });

    it('should all be in Temperature category', () => {
      temperatureUnits.forEach(unit => {
        expect(unit.category).toBe(UnitCategory.Temperature);
      });
    });
  });

  describe('getBaseUnit', () => {
    it('should return base unit for Volume', () => {
      const base = getBaseUnit(UnitCategory.Volume);
      expect(base.id).toBe('ml');
      expect(base.isBase).toBe(true);
    });

    it('should return base unit for Length', () => {
      const base = getBaseUnit(UnitCategory.Length);
      expect(base.id).toBe('cm');
      expect(base.isBase).toBe(true);
    });

    it('should return base unit for Weight', () => {
      const base = getBaseUnit(UnitCategory.Weight);
      expect(base.id).toBe('g');
      expect(base.isBase).toBe(true);
    });

    it('should return base unit for Temperature', () => {
      const base = getBaseUnit(UnitCategory.Temperature);
      expect(base.id).toBe('celsius');
      expect(base.isBase).toBe(true);
    });
  });

  describe('getUnitsForCategory', () => {
    it('should return all volume units', () => {
      const units = getUnitsForCategory(UnitCategory.Volume);
      expect(units).toHaveLength(volumeUnits.length);
      expect(units).toEqual(volumeUnits);
    });

    it('should return all length units', () => {
      const units = getUnitsForCategory(UnitCategory.Length);
      expect(units).toHaveLength(lengthUnits.length);
      expect(units).toEqual(lengthUnits);
    });

    it('should return all weight units', () => {
      const units = getUnitsForCategory(UnitCategory.Weight);
      expect(units).toHaveLength(weightUnits.length);
      expect(units).toEqual(weightUnits);
    });

    it('should return all temperature units', () => {
      const units = getUnitsForCategory(UnitCategory.Temperature);
      expect(units).toHaveLength(temperatureUnits.length);
      expect(units).toEqual(temperatureUnits);
    });
  });

  describe('Known reference values', () => {
    it('should convert known volume values correctly', () => {
      const cup = volumeUnits.find(u => u.id === 'cup')!;
      const floz = volumeUnits.find(u => u.id === 'floz')!;

      const cupInMl = cup.toBase(1);
      const flozInMl = floz.toBase(8);
      expect(cupInMl).toBeCloseTo(flozInMl, 1);
    });

    it('should convert known length values correctly', () => {
      const foot = lengthUnits.find(u => u.id === 'ft')!;
      const inch = lengthUnits.find(u => u.id === 'in')!;

      const footInCm = foot.toBase(1);
      const inchInCm = inch.toBase(12);
      expect(footInCm).toBeCloseTo(inchInCm, 2);
    });

    it('should have water freezing point at 0°C = 32°F', () => {
      const fahrenheit = temperatureUnits.find(u => u.id === 'fahrenheit')!;
      expect(fahrenheit.fromBase(0)).toBeCloseTo(32, 5);
    });

    it('should have water boiling point at 100°C = 212°F', () => {
      const fahrenheit = temperatureUnits.find(u => u.id === 'fahrenheit')!;
      expect(fahrenheit.fromBase(100)).toBeCloseTo(212, 5);
    });
  });
});

