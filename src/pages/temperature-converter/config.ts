/**
 * Configuration for Temperature Converter
 */

import {
  IntervalConverter,
  temperatureUnits,
} from '../../utils/conversions';

export const selectedUnits = [
  temperatureUnits.find(u => u.id === 'celsius')!,
  temperatureUnits.find(u => u.id === 'fahrenheit')!,
];

export const temperatureConverter = new IntervalConverter({
  units: selectedUnits,
  defaultPrecision: 2,
});

export const unitConfig = [
  { id: 'celsius', label: 'Celsius', symbol: '°C', placeholder: 'Enter temperature in Celsius' },
  { id: 'fahrenheit', label: 'Fahrenheit', symbol: '°F', placeholder: 'Enter temperature in Fahrenheit' },
];

