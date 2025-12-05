import { useState, useCallback, ChangeEvent } from 'react';
import { Unit, UseConverterReturn } from './types';
import { RatioConverter } from './RatioConverter';
import { IntervalConverter } from './IntervalConverter';

interface UseConverterOptions {
  converter: RatioConverter | IntervalConverter;
  units: Unit[];
  defaultPrecision?: number;
  precisionOverrides?: Record<string, number>;
}

export function useConverter(options: UseConverterOptions): UseConverterReturn {
  const { converter, units, defaultPrecision = 2, precisionOverrides = {} } = options;

  const initialValues: Record<string, string> = {};
  units.forEach(unit => {
    initialValues[unit.id] = '';
  });

  const [values, setValues] = useState<Record<string, string>>(initialValues);

  /**
   * Format a value with proper precision for a specific unit
   */
  const formatValue = useCallback(
    (value: number, unitId: string): string => {
      const precision = precisionOverrides[unitId] ?? defaultPrecision;
      return converter.formatValue(value, precision);
    },
    [converter, defaultPrecision, precisionOverrides]
  );

  /**
   * Handle input change for a specific unit
   */
  const createHandler = useCallback(
    (unitId: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (inputValue === '' || inputValue === '-') {
        setValues(prevValues => {
          const newValues = { ...prevValues };
          Object.keys(newValues).forEach(key => {
            newValues[key] = '';
          });
          return newValues;
        });
        return;
      }

      const numValue = parseFloat(inputValue);

      if (isNaN(numValue)) {
        setValues(prevValues => ({
          ...prevValues,
          [unitId]: inputValue,
        }));
        return;
      }

      const newValues: Record<string, string> = {};
      
      units.forEach(unit => {
        if (unit.id === unitId) {
          newValues[unit.id] = inputValue;
        } else {
          try {
            const convertedValue = converter.convert(numValue, unitId, unit.id);
            newValues[unit.id] = formatValue(convertedValue, unit.id);
          } catch (_error) {
            newValues[unit.id] = '';
          }
        }
      });

      setValues(newValues);
    },
    [units, converter, formatValue]
  );

  /**
   * Create handlers for all units
   */
  const handlers: Record<string, (e: ChangeEvent<HTMLInputElement>) => void> = {};
  units.forEach(unit => {
    handlers[unit.id] = createHandler(unit.id);
  });

  /**
   * Clear all fields
   */
  const clearAll = useCallback(() => {
    const clearedValues: Record<string, string> = {};
    units.forEach(unit => {
      clearedValues[unit.id] = '';
    });
    setValues(clearedValues);
  }, [units]);

  return {
    values,
    handlers,
    clearAll,
    formatValue,
    units,
  };
}

