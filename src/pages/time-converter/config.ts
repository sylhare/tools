/**
 * Configuration for Time Converter
 */

import {
  RatioConverter,
  timeUnits,
  getBaseUnit,
  UnitCategory,
} from '../../utils/conversions';

export const selectedUnits = [
  timeUnits.find(u => u.id === 'ms')!,
  timeUnits.find(u => u.id === 's')!,
  timeUnits.find(u => u.id === 'min')!,
  timeUnits.find(u => u.id === 'hr')!,
  timeUnits.find(u => u.id === 'day')!,
  timeUnits.find(u => u.id === 'week')!,
  timeUnits.find(u => u.id === 'month')!,
  timeUnits.find(u => u.id === 'year')!,
];

export const timeConverter = new RatioConverter({
  baseUnit: getBaseUnit(UnitCategory.Time),
  units: selectedUnits,
  defaultPrecision: 2,
});

export const unitConfig = [
  { id: 'ms', label: 'Milliseconds', placeholder: 'Enter ms' },
  { id: 's', label: 'Seconds', placeholder: 'Enter s' },
  { id: 'min', label: 'Minutes', placeholder: 'Enter min' },
  { id: 'hr', label: 'Hours', placeholder: 'Enter hr' },
  { id: 'day', label: 'Days', placeholder: 'Enter days' },
  { id: 'week', label: 'Weeks', placeholder: 'Enter weeks' },
  { id: 'month', label: 'Months', placeholder: 'Enter months' },
  { id: 'year', label: 'Years', placeholder: 'Enter years' },
];

