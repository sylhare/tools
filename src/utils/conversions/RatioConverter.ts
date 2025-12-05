/**
 * RatioConverter handles proportional conversions
 * Uses multiplication/division through a base unit
 * Examples: Volume (cups ↔ mL), Length (inches ↔ cm), Weight (oz ↔ grams)
 */

import { Unit, RatioConverterOptions } from './types';

export class RatioConverter {
  private baseUnit: Unit;
  private units: Map<string, Unit>;
  private defaultPrecision: number;

  constructor(options: RatioConverterOptions) {
    this.baseUnit = options.baseUnit;
    this.units = new Map(options.units.map(unit => [unit.id, unit]));
    this.defaultPrecision = options.defaultPrecision ?? 2;

    if (!this.units.has(this.baseUnit.id)) {
      throw new Error('Base unit must be included in units array');
    }

    const category = this.baseUnit.category;
    for (const unit of options.units) {
      if (unit.category !== category) {
        throw new Error(
          `All units must be in the same category. Expected ${category}, got ${unit.category}`
        );
      }
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
   * Convert a value to the base unit
   * @param value The numeric value
   * @param fromUnitId The source unit ID
   * @returns The value in base units
   */
  toBase(value: number, fromUnitId: string): number {
    const unit = this.units.get(fromUnitId);
    if (!unit) {
      throw new Error(`Unknown unit: ${fromUnitId}`);
    }
    return unit.toBase(value);
  }

  /**
   * Convert a value from the base unit
   * @param value The value in base units
   * @param toUnitId The target unit ID
   * @returns The converted value
   */
  fromBase(value: number, toUnitId: string): number {
    const unit = this.units.get(toUnitId);
    if (!unit) {
      throw new Error(`Unknown unit: ${toUnitId}`);
    }
    return unit.fromBase(value);
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
   * Get the base unit
   */
  getBaseUnit(): Unit {
    return this.baseUnit;
  }

  /**
   * Get default precision
   */
  getPrecision(): number {
    return this.defaultPrecision;
  }
}

