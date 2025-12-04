/**
 * Unified Conversion System
 * Public API for the conversion utilities
 */

export type {
  Unit,
  ConversionConfig,
  ConverterState,
  ConversionFunction,
  UseConverterReturn,
  RatioConverterOptions,
  IntervalConverterOptions,
} from './types';

export { UnitCategory } from './types';

export { RatioConverter } from './RatioConverter';
export { IntervalConverter } from './IntervalConverter';

export {
  volumeUnits,
  lengthUnits,
  weightUnits,
  temperatureUnits,
  getBaseUnit,
  getUnitsForCategory,
} from './units';

export { useConverter } from './useConverter';

