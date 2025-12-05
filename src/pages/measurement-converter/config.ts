/**
 * Configuration for Measurement (Length) Converter
 */

import {
  RatioConverter,
  lengthUnits,
  getBaseUnit,
  UnitCategory,
} from '../../utils/conversions';

export const metricUnits = [
  lengthUnits.find(u => u.id === 'mm')!,
  lengthUnits.find(u => u.id === 'cm')!,
  lengthUnits.find(u => u.id === 'm')!,
  lengthUnits.find(u => u.id === 'km')!,
];

export const imperialUnits = [
  lengthUnits.find(u => u.id === 'in')!,
  lengthUnits.find(u => u.id === 'ft')!,
  lengthUnits.find(u => u.id === 'yd')!,
  lengthUnits.find(u => u.id === 'mi')!,
];

export const selectedUnits = [...metricUnits, ...imperialUnits];

export const measurementConverter = new RatioConverter({
  baseUnit: getBaseUnit(UnitCategory.Length),
  units: selectedUnits,
  defaultPrecision: 2,
});

export const metricConfig = [
  { id: 'mm', label: 'Millimeters', placeholder: 'Enter mm' },
  { id: 'cm', label: 'Centimeters', placeholder: 'Enter cm' },
  { id: 'm', label: 'Meters', placeholder: 'Enter m' },
  { id: 'km', label: 'Kilometers', placeholder: 'Enter km' },
];

export const imperialConfig = [
  { id: 'in', label: 'Inches', placeholder: 'Enter in' },
  { id: 'ft', label: 'Feet', placeholder: 'Enter ft' },
  { id: 'yd', label: 'Yards', placeholder: 'Enter yd' },
  { id: 'mi', label: 'Miles', placeholder: 'Enter mi' },
];

