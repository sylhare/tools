import { useState, ChangeEvent } from 'react';

interface UseTemperatureConverterReturn {
  celsius: string;
  fahrenheit: string;
  handleCelsiusChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFahrenheitChange: (e: ChangeEvent<HTMLInputElement>) => void;
  celsiusToFahrenheit: (celsius: number) => number;
  fahrenheitToCelsius: (fahrenheit: number) => number;
}

export function useTemperatureConverter(): UseTemperatureConverterReturn {
  const [celsius, setCelsius] = useState<string>('');
  const [fahrenheit, setFahrenheit] = useState<string>('');

  const celsiusToFahrenheit = (celsius: number): number => {
    return (celsius * 9 / 5) + 32;
  };

  const fahrenheitToCelsius = (fahrenheit: number): number => {
    return (fahrenheit - 32) * 5 / 9;
  };

  const handleCelsiusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setCelsius(value);
    
    if (value === '' || value === '-') {
      setFahrenheit('');
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        const fahrenheitValue = celsiusToFahrenheit(numValue);
        setFahrenheit(fahrenheitValue.toFixed(2));
      }
    }
  };

  const handleFahrenheitChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setFahrenheit(value);
    
    if (value === '' || value === '-') {
      setCelsius('');
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        const celsiusValue = fahrenheitToCelsius(numValue);
        setCelsius(celsiusValue.toFixed(2));
      }
    }
  };

  return {
    celsius,
    fahrenheit,
    handleCelsiusChange,
    handleFahrenheitChange,
    celsiusToFahrenheit,
    fahrenheitToCelsius,
  };
}

