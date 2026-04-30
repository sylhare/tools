import {
  RatioConverter,
  weightUnits,
  getBaseUnit,
  UnitCategory,
} from '../../utils/conversions';

export const selectedUnits = [
  weightUnits.find(u => u.id === 'g')!,
  weightUnits.find(u => u.id === 'kg')!,
  weightUnits.find(u => u.id === 'oz')!,
  weightUnits.find(u => u.id === 'lb')!,
];

export const weightConverter = new RatioConverter({
  baseUnit: getBaseUnit(UnitCategory.Weight),
  units: selectedUnits,
  defaultPrecision: 2,
});

export const unitConfig = [
  { id: 'g', label: 'Grams', placeholder: 'Enter g' },
  { id: 'kg', label: 'Kilograms', placeholder: 'Enter kg' },
  { id: 'oz', label: 'Ounces', placeholder: 'Enter oz' },
  { id: 'lb', label: 'Pounds', placeholder: 'Enter lb' },
];
