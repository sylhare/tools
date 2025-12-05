/**
 * Configuration for Volume Converter
 */

import {
  RatioConverter,
  volumeUnits,
  getBaseUnit,
  UnitCategory,
} from '../../utils/conversions';

export const selectedUnits = [
  volumeUnits.find(u => u.id === 'ml')!,
  volumeUnits.find(u => u.id === 'liter')!,
  volumeUnits.find(u => u.id === 'tsp')!,
  volumeUnits.find(u => u.id === 'tbsp')!,
  volumeUnits.find(u => u.id === 'floz')!,
  volumeUnits.find(u => u.id === 'cup')!,
];

export const volumeConverter = new RatioConverter({
  baseUnit: getBaseUnit(UnitCategory.Volume),
  units: selectedUnits,
  defaultPrecision: 1,
});

export const unitConfig = [
  { id: 'ml', label: 'Milliliters', placeholder: 'Enter mL' },
  { id: 'liter', label: 'Liters', placeholder: 'Enter L' },
  { id: 'tsp', label: 'Teaspoons', placeholder: 'Enter tsp' },
  { id: 'tbsp', label: 'Tablespoons', placeholder: 'Enter tbsp' },
  { id: 'floz', label: 'Fluid Ounces', placeholder: 'Enter fl oz' },
  { id: 'cup', label: 'Cups (US)', placeholder: 'Enter cups' },
];

