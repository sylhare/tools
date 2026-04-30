import { describe, it, expect } from 'vitest';
import { weightConverter, selectedUnits, unitConfig } from '../../../../src/pages/weight-converter/config';
import { RatioConverter } from '../../../../src/utils/conversions/RatioConverter';

describe('Weight Converter Config', () => {
  describe('weightConverter', () => {
    it('should be an instance of RatioConverter', () => {
      expect(weightConverter).toBeInstanceOf(RatioConverter);
    });

    it('should have correct precision', () => {
      expect(weightConverter.getPrecision()).toBe(2);
    });

    it('should have grams as base unit', () => {
      const baseUnit = weightConverter.getBaseUnit();
      expect(baseUnit.id).toBe('g');
    });
  });

  describe('selectedUnits', () => {
    it('should have 4 units', () => {
      expect(selectedUnits).toHaveLength(4);
    });

    it('should include all expected units', () => {
      const unitIds = selectedUnits.map(u => u.id);
      expect(unitIds).toContain('g');
      expect(unitIds).toContain('kg');
      expect(unitIds).toContain('oz');
      expect(unitIds).toContain('lb');
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
    it('should have 4 configurations', () => {
      expect(unitConfig).toHaveLength(4);
    });

    it('should have correct structure for each config', () => {
      unitConfig.forEach(config => {
        expect(config).toHaveProperty('id');
        expect(config).toHaveProperty('label');
        expect(config).toHaveProperty('placeholder');
      });
    });

    it('should match selectedUnits IDs', () => {
      const configIds = unitConfig.map(c => c.id);
      const unitIds = selectedUnits.map(u => u.id);

      configIds.forEach(id => {
        expect(unitIds).toContain(id);
      });
    });
  });

  describe('conversions', () => {
    it('should convert 1 kg to grams correctly', () => {
      const result = weightConverter.convert(1, 'kg', 'g');
      expect(result).toBe(1000);
    });

    it('should convert 1 lb to grams correctly', () => {
      const result = weightConverter.convert(1, 'lb', 'g');
      expect(result).toBeCloseTo(453.592, 2);
    });

    it('should convert 1 oz to grams correctly', () => {
      const result = weightConverter.convert(1, 'oz', 'g');
      expect(result).toBeCloseTo(28.3495, 2);
    });

    it('should convert 16 oz to 1 lb correctly', () => {
      const result = weightConverter.convert(16, 'oz', 'lb');
      expect(result).toBeCloseTo(1, 1);
    });
  });
});
