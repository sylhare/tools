import {
  RatioConverter,
  weightUnits,
  getBaseUnit,
  UnitCategory,
} from '../../utils/conversions';

const selectedIds = ['g', 'kg', 'oz', 'lb'];

export const selectedUnits = weightUnits.filter(u => selectedIds.includes(u.id));

export const weightConverter = new RatioConverter({
  baseUnit: getBaseUnit(UnitCategory.Weight),
  units: selectedUnits,
  defaultPrecision: 2,
});

export const unitConfig = selectedUnits.map(u => ({
  id: u.id,
  label: u.name,
  placeholder: `Enter ${u.symbol}`,
}));
