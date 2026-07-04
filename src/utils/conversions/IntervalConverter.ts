/**
 * IntervalConverter handles offset-based conversions
 * Uses custom formulas (not just multiplication)
 * Examples: Temperature scales (Celsius ↔ Fahrenheit ↔ Kelvin)
 */

import { IntervalConverterOptions } from './types';
import { BaseConverter } from './BaseConverter';

export class IntervalConverter extends BaseConverter {
  constructor(options: IntervalConverterOptions) {
    super(options.units, options.defaultPrecision);

    const categories = new Set(options.units.map(u => u.category));
    if (categories.size > 1) {
      throw new Error('All units must be in the same category');
    }

    if (this.units.size === 0) {
      throw new Error('At least one unit must be provided');
    }
  }
}
