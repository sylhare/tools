import { describe, it, expect } from 'vitest';
import {
  measurementConverter,
  selectedUnits,
  metricUnits,
  imperialUnits,
  metricConfig,
  imperialConfig,
} from '../../../../src/pages/measurement-converter/config';
import { RatioConverter } from '../../../../src/utils/conversions/RatioConverter';

describe('Measurement Converter Config', () => {
  describe('measurementConverter', () => {
    it('should be an instance of RatioConverter', () => {
      expect(measurementConverter).toBeInstanceOf(RatioConverter);
    });

    it('should have correct precision', () => {
      expect(measurementConverter.getPrecision()).toBe(2);
    });

    it('should have cm as base unit', () => {
      const baseUnit = measurementConverter.getBaseUnit();
      expect(baseUnit.id).toBe('cm');
    });
  });

  describe('metricUnits', () => {
    it('should have 4 metric units', () => {
      expect(metricUnits).toHaveLength(4);
    });

    it('should include all expected metric units', () => {
      const unitIds = metricUnits.map(u => u.id);
      expect(unitIds).toContain('mm');
      expect(unitIds).toContain('cm');
      expect(unitIds).toContain('m');
      expect(unitIds).toContain('km');
    });

    it('should have all units properly defined', () => {
      metricUnits.forEach(unit => {
        expect(unit).toBeDefined();
        expect(unit.id).toBeDefined();
        expect(unit.name).toBeDefined();
        expect(unit.symbol).toBeDefined();
      });
    });
  });

  describe('imperialUnits', () => {
    it('should have 4 imperial units', () => {
      expect(imperialUnits).toHaveLength(4);
    });

    it('should include all expected imperial units', () => {
      const unitIds = imperialUnits.map(u => u.id);
      expect(unitIds).toContain('in');
      expect(unitIds).toContain('ft');
      expect(unitIds).toContain('yd');
      expect(unitIds).toContain('mi');
    });

    it('should have all units properly defined', () => {
      imperialUnits.forEach(unit => {
        expect(unit).toBeDefined();
        expect(unit.id).toBeDefined();
        expect(unit.name).toBeDefined();
        expect(unit.symbol).toBeDefined();
      });
    });
  });

  describe('selectedUnits', () => {
    it('should have 8 total units', () => {
      expect(selectedUnits).toHaveLength(8);
    });

    it('should combine metric and imperial units', () => {
      expect(selectedUnits).toHaveLength(metricUnits.length + imperialUnits.length);
    });
  });

  describe('metricConfig', () => {
    it('should have 4 configurations', () => {
      expect(metricConfig).toHaveLength(4);
    });

    it('should have correct structure for each config', () => {
      metricConfig.forEach(config => {
        expect(config).toHaveProperty('id');
        expect(config).toHaveProperty('label');
        expect(config).toHaveProperty('placeholder');
      });
    });

    it('should match metricUnits IDs', () => {
      const configIds = metricConfig.map(c => c.id);
      const unitIds = metricUnits.map(u => u.id);
      
      expect(configIds).toEqual(unitIds);
    });
  });

  describe('imperialConfig', () => {
    it('should have 4 configurations', () => {
      expect(imperialConfig).toHaveLength(4);
    });

    it('should have correct structure for each config', () => {
      imperialConfig.forEach(config => {
        expect(config).toHaveProperty('id');
        expect(config).toHaveProperty('label');
        expect(config).toHaveProperty('placeholder');
      });
    });

    it('should match imperialUnits IDs', () => {
      const configIds = imperialConfig.map(c => c.id);
      const unitIds = imperialUnits.map(u => u.id);
      
      expect(configIds).toEqual(unitIds);
    });
  });

  describe('conversions', () => {
    it('should convert 1 inch to 2.54 cm correctly', () => {
      const result = measurementConverter.convert(1, 'in', 'cm');
      expect(result).toBeCloseTo(2.54, 2);
    });

    it('should convert 1 foot to cm correctly', () => {
      const result = measurementConverter.convert(1, 'ft', 'cm');
      expect(result).toBeCloseTo(30.48, 2);
    });

    it('should convert 1 meter to 100 cm correctly', () => {
      const result = measurementConverter.convert(1, 'm', 'cm');
      expect(result).toBe(100);
    });

    it('should convert 1 km to 1000 m correctly', () => {
      const result = measurementConverter.convert(1, 'km', 'm');
      expect(result).toBe(1000);
    });

    it('should convert 12 inches to 1 foot correctly', () => {
      const result = measurementConverter.convert(12, 'in', 'ft');
      expect(result).toBeCloseTo(1, 1);
    });

    it('should convert 3 feet to 1 yard correctly', () => {
      const result = measurementConverter.convert(3, 'ft', 'yd');
      expect(result).toBeCloseTo(1, 1);
    });

    it('should convert 1 mile to km correctly', () => {
      const result = measurementConverter.convert(1, 'mi', 'km');
      expect(result).toBeCloseTo(1.60934, 3);
    });
  });
});

