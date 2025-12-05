import { describe, it, expect } from 'vitest';
import { volumeConverter, selectedUnits, unitConfig } from '../../../../src/pages/volume-converter/config';
import { RatioConverter } from '../../../../src/utils/conversions/RatioConverter';

describe('Volume Converter Config', () => {
  describe('volumeConverter', () => {
    it('should be an instance of RatioConverter', () => {
      expect(volumeConverter).toBeInstanceOf(RatioConverter);
    });

    it('should have correct precision', () => {
      expect(volumeConverter.getPrecision()).toBe(1);
    });

    it('should have mL as base unit', () => {
      const baseUnit = volumeConverter.getBaseUnit();
      expect(baseUnit.id).toBe('ml');
    });
  });

  describe('selectedUnits', () => {
    it('should have 6 units', () => {
      expect(selectedUnits).toHaveLength(6);
    });

    it('should include all expected units', () => {
      const unitIds = selectedUnits.map(u => u.id);
      expect(unitIds).toContain('ml');
      expect(unitIds).toContain('liter');
      expect(unitIds).toContain('tsp');
      expect(unitIds).toContain('tbsp');
      expect(unitIds).toContain('floz');
      expect(unitIds).toContain('cup');
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
    it('should have 6 configurations', () => {
      expect(unitConfig).toHaveLength(6);
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
    it('should convert 1 cup to mL correctly', () => {
      const result = volumeConverter.convert(1, 'cup', 'ml');
      expect(result).toBeCloseTo(236.588, 2);
    });

    it('should convert 1 liter to mL correctly', () => {
      const result = volumeConverter.convert(1, 'liter', 'ml');
      expect(result).toBe(1000);
    });

    it('should convert 3 tsp to 1 tbsp correctly', () => {
      const result = volumeConverter.convert(3, 'tsp', 'tbsp');
      expect(result).toBeCloseTo(1, 1);
    });

    it('should convert 8 fl oz to 1 cup correctly', () => {
      const result = volumeConverter.convert(8, 'floz', 'cup');
      expect(result).toBeCloseTo(1, 1);
    });
  });
});



