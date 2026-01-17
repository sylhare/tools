/**
 * Unit definitions with conversion factors
 * Inspired by Kotlin NumberUnits pattern
 */

import { Unit, UnitCategory } from './types';

/**
 * Volume unit definitions
 * Base unit: Milliliters (mL)
 */
export const volumeUnits: Unit[] = [
  {
    id: 'ml',
    name: 'Milliliters',
    symbol: 'mL',
    category: UnitCategory.Volume,
    toBase: (value: number) => value,
    fromBase: (value: number) => value,
    isBase: true,
  },
  {
    id: 'tsp',
    name: 'Teaspoons',
    symbol: 'tsp',
    category: UnitCategory.Volume,
    toBase: (value: number) => value * 4.92892,
    fromBase: (value: number) => value / 4.92892,
  },
  {
    id: 'tbsp',
    name: 'Tablespoons',
    symbol: 'tbsp',
    category: UnitCategory.Volume,
    toBase: (value: number) => value * 14.7868,
    fromBase: (value: number) => value / 14.7868,
  },
  {
    id: 'floz',
    name: 'Fluid Ounces',
    symbol: 'fl oz',
    category: UnitCategory.Volume,
    toBase: (value: number) => value * 29.5735,
    fromBase: (value: number) => value / 29.5735,
  },
  {
    id: 'cup',
    name: 'Cups (US)',
    symbol: 'cup',
    category: UnitCategory.Volume,
    toBase: (value: number) => value * 236.588,
    fromBase: (value: number) => value / 236.588,
  },
  {
    id: 'pint',
    name: 'Pints',
    symbol: 'pt',
    category: UnitCategory.Volume,
    toBase: (value: number) => value * 473.176,
    fromBase: (value: number) => value / 473.176,
  },
  {
    id: 'quart',
    name: 'Quarts',
    symbol: 'qt',
    category: UnitCategory.Volume,
    toBase: (value: number) => value * 946.353,
    fromBase: (value: number) => value / 946.353,
  },
  {
    id: 'gallon',
    name: 'Gallons',
    symbol: 'gal',
    category: UnitCategory.Volume,
    toBase: (value: number) => value * 3785.41,
    fromBase: (value: number) => value / 3785.41,
  },
  {
    id: 'liter',
    name: 'Liters',
    symbol: 'L',
    category: UnitCategory.Volume,
    toBase: (value: number) => value * 1000,
    fromBase: (value: number) => value / 1000,
  },
];

/**
 * Length unit definitions
 * Base unit: Centimeters (cm)
 */
export const lengthUnits: Unit[] = [
  {
    id: 'mm',
    name: 'Millimeters',
    symbol: 'mm',
    category: UnitCategory.Length,
    toBase: (value: number) => value * 0.1,
    fromBase: (value: number) => value / 0.1,
  },
  {
    id: 'cm',
    name: 'Centimeters',
    symbol: 'cm',
    category: UnitCategory.Length,
    toBase: (value: number) => value,
    fromBase: (value: number) => value,
    isBase: true,
  },
  {
    id: 'm',
    name: 'Meters',
    symbol: 'm',
    category: UnitCategory.Length,
    toBase: (value: number) => value * 100,
    fromBase: (value: number) => value / 100,
  },
  {
    id: 'km',
    name: 'Kilometers',
    symbol: 'km',
    category: UnitCategory.Length,
    toBase: (value: number) => value * 100000,
    fromBase: (value: number) => value / 100000,
  },
  {
    id: 'in',
    name: 'Inches',
    symbol: 'in',
    category: UnitCategory.Length,
    toBase: (value: number) => value * 2.54,
    fromBase: (value: number) => value / 2.54,
  },
  {
    id: 'ft',
    name: 'Feet',
    symbol: 'ft',
    category: UnitCategory.Length,
    toBase: (value: number) => value * 30.48,
    fromBase: (value: number) => value / 30.48,
  },
  {
    id: 'yd',
    name: 'Yards',
    symbol: 'yd',
    category: UnitCategory.Length,
    toBase: (value: number) => value * 91.44,
    fromBase: (value: number) => value / 91.44,
  },
  {
    id: 'mi',
    name: 'Miles',
    symbol: 'mi',
    category: UnitCategory.Length,
    toBase: (value: number) => value * 160934.4,
    fromBase: (value: number) => value / 160934.4,
  },
];

/**
 * Weight unit definitions
 * Base unit: Grams (g)
 */
export const weightUnits: Unit[] = [
  {
    id: 'g',
    name: 'Grams',
    symbol: 'g',
    category: UnitCategory.Weight,
    toBase: (value: number) => value,
    fromBase: (value: number) => value,
    isBase: true,
  },
  {
    id: 'oz',
    name: 'Ounces',
    symbol: 'oz',
    category: UnitCategory.Weight,
    toBase: (value: number) => value * 28.3495,
    fromBase: (value: number) => value / 28.3495,
  },
  {
    id: 'lb',
    name: 'Pounds',
    symbol: 'lb',
    category: UnitCategory.Weight,
    toBase: (value: number) => value * 453.592,
    fromBase: (value: number) => value / 453.592,
  },
  {
    id: 'kg',
    name: 'Kilograms',
    symbol: 'kg',
    category: UnitCategory.Weight,
    toBase: (value: number) => value * 1000,
    fromBase: (value: number) => value / 1000,
  },
];

/**
 * Temperature unit definitions
 * Base unit: Celsius (°C)
 * Uses interval conversion (formulas with offsets)
 */
export const temperatureUnits: Unit[] = [
  {
    id: 'celsius',
    name: 'Celsius',
    symbol: '°C',
    category: UnitCategory.Temperature,
    toBase: (value: number) => value,
    fromBase: (value: number) => value,
    isBase: true,
  },
  {
    id: 'fahrenheit',
    name: 'Fahrenheit',
    symbol: '°F',
    category: UnitCategory.Temperature,
    toBase: (value: number) => (value - 32) * 5 / 9,
    fromBase: (value: number) => (value * 9 / 5) + 32,
  },
  {
    id: 'kelvin',
    name: 'Kelvin',
    symbol: 'K',
    category: UnitCategory.Temperature,
    toBase: (value: number) => value - 273.15,
    fromBase: (value: number) => value + 273.15,
  },
  {
    id: 'rankine',
    name: 'Rankine',
    symbol: '°R',
    category: UnitCategory.Temperature,
    toBase: (value: number) => (value - 491.67) * 5 / 9,
    fromBase: (value: number) => (value * 9 / 5) + 491.67,
  },
];

/**
 * Time unit definitions
 * Base unit: Seconds (s)
 */
export const timeUnits: Unit[] = [
  {
    id: 'ms',
    name: 'Milliseconds',
    symbol: 'ms',
    category: UnitCategory.Time,
    toBase: (value: number) => value / 1000,
    fromBase: (value: number) => value * 1000,
  },
  {
    id: 's',
    name: 'Seconds',
    symbol: 's',
    category: UnitCategory.Time,
    toBase: (value: number) => value,
    fromBase: (value: number) => value,
    isBase: true,
  },
  {
    id: 'min',
    name: 'Minutes',
    symbol: 'min',
    category: UnitCategory.Time,
    toBase: (value: number) => value * 60,
    fromBase: (value: number) => value / 60,
  },
  {
    id: 'hr',
    name: 'Hours',
    symbol: 'hr',
    category: UnitCategory.Time,
    toBase: (value: number) => value * 3600,
    fromBase: (value: number) => value / 3600,
  },
  {
    id: 'day',
    name: 'Days',
    symbol: 'd',
    category: UnitCategory.Time,
    toBase: (value: number) => value * 86400,
    fromBase: (value: number) => value / 86400,
  },
  {
    id: 'week',
    name: 'Weeks',
    symbol: 'wk',
    category: UnitCategory.Time,
    toBase: (value: number) => value * 604800,
    fromBase: (value: number) => value / 604800,
  },
  {
    id: 'month',
    name: 'Months',
    symbol: 'mo',
    category: UnitCategory.Time,
    toBase: (value: number) => value * 2629746, // Average month (365.25 days / 12)
    fromBase: (value: number) => value / 2629746,
  },
  {
    id: 'year',
    name: 'Years',
    symbol: 'yr',
    category: UnitCategory.Time,
    toBase: (value: number) => value * 31556952, // 365.25 days
    fromBase: (value: number) => value / 31556952,
  },
];

/**
 * Get base unit for a category
 */
export function getBaseUnit(category: UnitCategory): Unit {
  switch (category) {
    case UnitCategory.Volume:
      return volumeUnits.find(u => u.isBase)!;
    case UnitCategory.Length:
      return lengthUnits.find(u => u.isBase)!;
    case UnitCategory.Weight:
      return weightUnits.find(u => u.isBase)!;
    case UnitCategory.Temperature:
      return temperatureUnits.find(u => u.isBase)!;
    case UnitCategory.Time:
      return timeUnits.find(u => u.isBase)!;
    default:
      throw new Error(`Unknown category: ${category}`);
  }
}

/**
 * Get all units for a category
 */
export function getUnitsForCategory(category: UnitCategory): Unit[] {
  switch (category) {
    case UnitCategory.Volume:
      return volumeUnits;
    case UnitCategory.Length:
      return lengthUnits;
    case UnitCategory.Weight:
      return weightUnits;
    case UnitCategory.Temperature:
      return temperatureUnits;
    case UnitCategory.Time:
      return timeUnits;
    default:
      throw new Error(`Unknown category: ${category}`);
  }
}

