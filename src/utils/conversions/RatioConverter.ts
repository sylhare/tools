/**
 * RatioConverter handles proportional conversions
 * Uses multiplication/division through a base unit
 * Examples: Volume (cups ↔ mL), Length (inches ↔ cm), Weight (oz ↔ grams)
 */

import { Unit, RatioConverterOptions } from './types';
import { BaseConverter } from './BaseConverter';

export class RatioConverter extends BaseConverter {
  private baseUnit: Unit;

  constructor(options: RatioConverterOptions) {
    super(options.units, options.defaultPrecision);
    this.baseUnit = options.baseUnit;

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
   * Get the base unit
   */
  getBaseUnit(): Unit {
    return this.baseUnit;
  }
}
