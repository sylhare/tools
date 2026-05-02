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
      expect(weightConverter.getBaseUnit().id).toBe('g');
    });
  });

  describe('selectedUnits', () => {
    it('should have 4 units', () => {
      expect(selectedUnits).toHaveLength(4);
    });

    it.each(['g', 'kg', 'oz', 'lb'])('should include unit "%s"', id => {
      expect(selectedUnits.map(u => u.id)).toContain(id);
    });

    it.each(selectedUnits)('unit "$id" should have required properties', unit => {
      expect(unit.id).toBeDefined();
      expect(unit.name).toBeDefined();
      expect(unit.symbol).toBeDefined();
    });
  });

  describe('unitConfig', () => {
    it('should have 4 configurations', () => {
      expect(unitConfig).toHaveLength(4);
    });

    it.each(unitConfig)('config "$id" should have required properties', config => {
      expect(config.id).toBeDefined();
      expect(config.label).toBeDefined();
      expect(config.placeholder).toBeDefined();
    });

    it.each(unitConfig)('config "$id" should match a selectedUnit', ({ id }) => {
      expect(selectedUnits.map(u => u.id)).toContain(id);
    });
  });

  describe('conversions', () => {
    const cases: [number, string, string, number, number][] = [
      [1, 'kg', 'g', 1000, 0],
      [1, 'lb', 'g', 453.592, 2],
      [1, 'oz', 'g', 28.3495, 2],
      [16, 'oz', 'lb', 1, 1],
    ];

    it.each(cases)('converts %d %s → %s', (value, from, to, expected, precision) => {
      expect(weightConverter.convert(value, from, to)).toBeCloseTo(expected, precision);
    });
  });
});
