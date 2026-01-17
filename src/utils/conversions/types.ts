/**
 * Core types for the unified conversion system
 */

import { ChangeEvent } from 'react';

/**
 * Categories of measurements that can be converted
 */
export enum UnitCategory {
  Volume = 'volume',
  Length = 'length',
  Weight = 'weight',
  Temperature = 'temperature',
  Time = 'time',
}

/**
 * Defines a single unit of measurement
 */
export interface Unit {
  /** Unique identifier for the unit */
  id: string;
  /** Display name (e.g., "Milliliters") */
  name: string;
  /** Symbol or abbreviation (e.g., "mL") */
  symbol: string;
  /** Category this unit belongs to */
  category: UnitCategory;
  /** Function to convert from this unit to base unit */
  toBase: (value: number) => number;
  /** Function to convert from base unit to this unit */
  fromBase: (value: number) => number;
  /** Whether this is the base unit for its category */
  isBase?: boolean;
}

/**
 * Configuration for a converter instance
 */
export interface ConversionConfig {
  /** Category of units being converted */
  category: UnitCategory;
  /** Array of units to include in the converter */
  units: Unit[];
  /** Default number of decimal places for display */
  defaultPrecision: number;
  /** Optional custom precision per unit */
  precisionOverrides?: Record<string, number>;
}

/**
 * State managed by the converter hook
 */
export interface ConverterState {
  /** Current values for each unit (key is unit id) */
  values: Record<string, string>;
  /** Which unit field was last edited (to prevent circular updates) */
  lastEditedUnit: string | null;
}

/**
 * Function type for unit conversions
 */
export type ConversionFunction = (value: number) => number;

/**
 * Return type for the useConverter hook
 */
export interface UseConverterReturn {
  /** Current values for each unit */
  values: Record<string, string>;
  /** Change handlers for each unit input */
  handlers: Record<string, (e: ChangeEvent<HTMLInputElement>) => void>;
  /** Function to clear all fields */
  clearAll: () => void;
  /** Function to format a value with proper precision */
  formatValue: (value: number, unitId: string) => string;
  /** The units configuration */
  units: Unit[];
}

/**
 * Options for creating a ratio-based converter
 */
export interface RatioConverterOptions {
  /** The base unit for this category */
  baseUnit: Unit;
  /** All units in this category */
  units: Unit[];
  /** Default precision for display */
  defaultPrecision?: number;
}

/**
 * Options for creating an interval-based converter
 */
export interface IntervalConverterOptions {
  /** All units in this category with conversion formulas */
  units: Unit[];
  /** Default precision for display */
  defaultPrecision?: number;
}

