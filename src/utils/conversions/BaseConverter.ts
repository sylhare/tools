/**
 * BaseConverter holds the behavior shared by all converters:
 * unit lookup, ratio/formula conversion through a base unit, and formatting.
 * Subclasses add their own construction-time validation and any extra behavior.
 */

import { Unit } from './types';
import { formatConvertedValue } from './units';

export abstract class BaseConverter {
  protected units: Map<string, Unit>;
  protected defaultPrecision: number;

  protected constructor(units: Unit[], defaultPrecision = 2) {
    this.units = new Map(units.map(unit => [unit.id, unit]));
    this.defaultPrecision = defaultPrecision;
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
    return formatConvertedValue(value, precision ?? this.defaultPrecision);
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
