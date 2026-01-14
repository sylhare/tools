import { describe, it, expect } from 'vitest';
import { timeConverter, selectedUnits, unitConfig } from '../../../../src/pages/time-converter/config';
import { RatioConverter } from '../../../../src/utils/conversions/RatioConverter';

describe('Time Converter Config', () => {
  describe('timeConverter', () => {
    it('should be an instance of RatioConverter', () => {
      expect(timeConverter).toBeInstanceOf(RatioConverter);
    });

    it('should have correct precision', () => {
      expect(timeConverter.getPrecision()).toBe(2);
    });

    it('should have seconds as base unit', () => {
      const baseUnit = timeConverter.getBaseUnit();
      expect(baseUnit.id).toBe('s');
    });
  });

  describe('selectedUnits', () => {
    it('should have 8 units', () => {
      expect(selectedUnits).toHaveLength(8);
    });

    it('should include all expected units', () => {
      const unitIds = selectedUnits.map(u => u.id);
      expect(unitIds).toContain('ms');
      expect(unitIds).toContain('s');
      expect(unitIds).toContain('min');
      expect(unitIds).toContain('hr');
      expect(unitIds).toContain('day');
      expect(unitIds).toContain('week');
      expect(unitIds).toContain('month');
      expect(unitIds).toContain('year');
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
    it('should have 8 configurations', () => {
      expect(unitConfig).toHaveLength(8);
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
    it('should convert 60 seconds to 1 minute', () => {
      const result = timeConverter.convert(60, 's', 'min');
      expect(result).toBe(1);
    });

    it('should convert 1 hour to 60 minutes', () => {
      const result = timeConverter.convert(1, 'hr', 'min');
      expect(result).toBe(60);
    });

    it('should convert 1 day to 24 hours', () => {
      const result = timeConverter.convert(1, 'day', 'hr');
      expect(result).toBe(24);
    });

    it('should convert 1 week to 7 days', () => {
      const result = timeConverter.convert(1, 'week', 'day');
      expect(result).toBe(7);
    });

    it('should convert 1 year to approximately 365.25 days', () => {
      const result = timeConverter.convert(1, 'year', 'day');
      expect(result).toBeCloseTo(365.25, 1);
    });

    it('should convert 1 year to approximately 12 months', () => {
      const result = timeConverter.convert(1, 'year', 'month');
      expect(result).toBeCloseTo(12, 1);
    });

    it('should convert 1000 milliseconds to 1 second', () => {
      const result = timeConverter.convert(1000, 'ms', 's');
      expect(result).toBe(1);
    });

    it('should convert 3600 seconds to 1 hour', () => {
      const result = timeConverter.convert(3600, 's', 'hr');
      expect(result).toBe(1);
    });

    it('should convert 86400 seconds to 1 day', () => {
      const result = timeConverter.convert(86400, 's', 'day');
      expect(result).toBe(1);
    });
  });
});

