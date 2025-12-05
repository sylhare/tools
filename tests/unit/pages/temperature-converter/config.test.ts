import { describe, it, expect } from 'vitest';
import {
  temperatureConverter,
  selectedUnits,
  unitConfig,
} from '../../../../src/pages/temperature-converter/config';
import { IntervalConverter } from '../../../../src/utils/conversions/IntervalConverter';

describe('Temperature Converter Config', () => {
  describe('temperatureConverter', () => {
    it('should be an instance of IntervalConverter', () => {
      expect(temperatureConverter).toBeInstanceOf(IntervalConverter);
    });

    it('should have correct precision', () => {
      expect(temperatureConverter.getPrecision()).toBe(2);
    });

    it('should have celsius and fahrenheit units', () => {
      const units = temperatureConverter.getUnits();
      expect(units).toHaveLength(2);
      expect(units.map(u => u.id)).toContain('celsius');
      expect(units.map(u => u.id)).toContain('fahrenheit');
    });
  });

  describe('selectedUnits', () => {
    it('should have 2 units', () => {
      expect(selectedUnits).toHaveLength(2);
    });

    it('should include celsius and fahrenheit', () => {
      const unitIds = selectedUnits.map(u => u.id);
      expect(unitIds).toContain('celsius');
      expect(unitIds).toContain('fahrenheit');
    });

    it('should have all units defined', () => {
      selectedUnits.forEach(unit => {
        expect(unit).toBeDefined();
        expect(unit.id).toBeDefined();
        expect(unit.name).toBeDefined();
        expect(unit.symbol).toBeDefined();
      });
    });
  });

  describe('unitConfig', () => {
    it('should have 2 configurations', () => {
      expect(unitConfig).toHaveLength(2);
    });

    it('should have correct structure for each config', () => {
      unitConfig.forEach(config => {
        expect(config).toHaveProperty('id');
        expect(config).toHaveProperty('label');
        expect(config).toHaveProperty('symbol');
        expect(config).toHaveProperty('placeholder');
      });
    });

    it('should match selectedUnits IDs', () => {
      const configIds = unitConfig.map(c => c.id);
      const unitIds = selectedUnits.map(u => u.id);

      expect(configIds).toEqual(unitIds);
    });
  });

  describe('conversions', () => {
    it('should convert 0°C to 32°F correctly', () => {
      const result = temperatureConverter.convert(0, 'celsius', 'fahrenheit');
      expect(result).toBeCloseTo(32, 2);
    });

    it('should convert 100°C to 212°F correctly', () => {
      const result = temperatureConverter.convert(100, 'celsius', 'fahrenheit');
      expect(result).toBeCloseTo(212, 2);
    });

    it('should convert 32°F to 0°C correctly', () => {
      const result = temperatureConverter.convert(32, 'fahrenheit', 'celsius');
      expect(result).toBeCloseTo(0, 2);
    });

    it('should convert 212°F to 100°C correctly', () => {
      const result = temperatureConverter.convert(212, 'fahrenheit', 'celsius');
      expect(result).toBeCloseTo(100, 2);
    });

    it('should convert 37°C to 98.6°F (body temperature)', () => {
      const result = temperatureConverter.convert(37, 'celsius', 'fahrenheit');
      expect(result).toBeCloseTo(98.6, 1);
    });

    it('should handle -40°C = -40°F (intersection point)', () => {
      const result = temperatureConverter.convert(-40, 'celsius', 'fahrenheit');
      expect(result).toBeCloseTo(-40, 2);
    });

    it('should match old implementation formulas', () => {
      const testValues = [0, 20, 37, 100, -40];

      testValues.forEach(celsius => {
        const oldFormula = (celsius * 9 / 5) + 32;
        const newResult = temperatureConverter.convert(celsius, 'celsius', 'fahrenheit');
        expect(newResult).toBeCloseTo(oldFormula, 5);
      });
    });
  });
});

