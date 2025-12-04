/**
 * IntervalConverter handles offset-based conversions
 * Uses custom formulas (not just multiplication)
 * Examples: Temperature scales (Celsius ↔ Fahrenheit ↔ Kelvin)
 */

import { Unit, IntervalConverterOptions } from './types';

export class IntervalConverter {
  private units: Map<string, Unit>;
  private defaultPrecision: number;

  constructor(options: IntervalConverterOptions) {
    this.units = new Map(options.units.map(unit => [unit.id, unit]));
    this.defaultPrecision = options.defaultPrecision ?? 2;

    const categories = new Set(options.units.map(u => u.category));
    if (categories.size > 1) {
      throw new Error('All units must be in the same category');
    }

    if (this.units.size === 0) {
      throw new Error('At least one unit must be provided');
    }
  }

  /**
   * Convert a value from one unit to another
   * @param value The numeric value to convert
   * @param fromUnitId The source unit ID
   * @param toUnitId The target unit ID
   * @returns The converted value
   */
  convert(value: number, fromUnitId: string, toUnitId: string): number {
    if (fromUnitId === toUnitId) {
      return value;
    }

    const fromUnit = this.units.get(fromUnitId);
    const toUnit = this.units.get(toUnitId);

    if (!fromUnit) {
      throw new Error(`Unknown unit: ${fromUnitId}`);
    }
    if (!toUnit) {
      throw new Error(`Unknown unit: ${toUnitId}`);
    }

    const baseValue = fromUnit.toBase(value);
    const targetValue = toUnit.fromBase(baseValue);

    return targetValue;
  }

  /**
   * Format a value with appropriate precision
   * @param value The numeric value
   * @param precision Number of decimal places
   * @returns Formatted string
   */
  formatValue(value: number, precision?: number): string {
    const decimals = precision ?? this.defaultPrecision;
    
    if (Math.abs(value) < Math.pow(10, -decimals) && value !== 0) {
      return value.toExponential(decimals);
    }
    
    if (Math.abs(value) > Math.pow(10, 10)) {
      return value.toExponential(decimals);
    }
    
    return value.toFixed(decimals);
  }

  /**
   * Get all available units
   */
  getUnits(): Unit[] {
    return Array.from(this.units.values());
  }

  /**
   * Get a specific unit by ID
   */
  getUnit(unitId: string): Unit | undefined {
    return this.units.get(unitId);
  }

  /**
   * Get default precision
   */
  getPrecision(): number {
    return this.defaultPrecision;
  }
}

