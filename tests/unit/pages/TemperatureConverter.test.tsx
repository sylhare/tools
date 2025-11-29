import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Theme } from '@radix-ui/themes';
import TemperatureConverter from '../../../src/pages/temperature-converter';

const renderTemperatureConverter = (): void => {
  render(
    <Theme>
      <TemperatureConverter />
    </Theme>
  );
};

describe('TemperatureConverter', () => {
  it('renders the component with title and inputs', () => {
    renderTemperatureConverter();

    expect(screen.getByText('Temperature Converter')).toBeInTheDocument();
    expect(screen.getByText('Convert temperatures between Celsius and Fahrenheit')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter temperature in Celsius')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter temperature in Fahrenheit')).toBeInTheDocument();
  });

  it('renders the quick reference section', () => {
    renderTemperatureConverter();

    expect(screen.getByText('Quick Reference')).toBeInTheDocument();
    expect(screen.getByText('• Water freezes at 0°C (32°F)')).toBeInTheDocument();
    expect(screen.getByText('• Water boils at 100°C (212°F)')).toBeInTheDocument();
  });

  it('converts Celsius to Fahrenheit correctly', () => {
    renderTemperatureConverter();

    const celsiusInput = screen.getByPlaceholderText('Enter temperature in Celsius');
    const fahrenheitInput = screen.getByPlaceholderText('Enter temperature in Fahrenheit');

    fireEvent.change(celsiusInput, { target: { value: '0' } });
    expect(fahrenheitInput).toHaveValue(32);

    fireEvent.change(celsiusInput, { target: { value: '100' } });
    expect(fahrenheitInput).toHaveValue(212);

    fireEvent.change(celsiusInput, { target: { value: '-40' } });
    expect(fahrenheitInput).toHaveValue(-40);
  });

  it('converts Fahrenheit to Celsius correctly', () => {
    renderTemperatureConverter();

    const celsiusInput = screen.getByPlaceholderText('Enter temperature in Celsius');
    const fahrenheitInput = screen.getByPlaceholderText('Enter temperature in Fahrenheit');

    fireEvent.change(fahrenheitInput, { target: { value: '32' } });
    expect(celsiusInput).toHaveValue(0);

    fireEvent.change(fahrenheitInput, { target: { value: '212' } });
    expect(celsiusInput).toHaveValue(100);

    fireEvent.change(fahrenheitInput, { target: { value: '98.6' } });
    expect(parseFloat(celsiusInput.value)).toBeCloseTo(37, 0);
  });

  it('handles decimal values correctly', () => {
    renderTemperatureConverter();

    const celsiusInput = screen.getByPlaceholderText('Enter temperature in Celsius');
    const fahrenheitInput = screen.getByPlaceholderText('Enter temperature in Fahrenheit');

    fireEvent.change(celsiusInput, { target: { value: '20.5' } });
    expect(parseFloat(fahrenheitInput.value)).toBeCloseTo(68.9, 1);

    fireEvent.change(fahrenheitInput, { target: { value: '75.5' } });
    expect(parseFloat(celsiusInput.value)).toBeCloseTo(24.17, 1);
  });

  it('clears the other input when one is cleared', () => {
    renderTemperatureConverter();

    const celsiusInput = screen.getByPlaceholderText('Enter temperature in Celsius');
    const fahrenheitInput = screen.getByPlaceholderText('Enter temperature in Fahrenheit');

    fireEvent.change(celsiusInput, { target: { value: '25' } });
    expect(fahrenheitInput.value).not.toBe('');

    fireEvent.change(celsiusInput, { target: { value: '' } });
    expect(fahrenheitInput.value).toBe('');
  });

  it('handles negative temperatures correctly', () => {
    renderTemperatureConverter();

    const celsiusInput = screen.getByPlaceholderText('Enter temperature in Celsius');
    const fahrenheitInput = screen.getByPlaceholderText('Enter temperature in Fahrenheit');

    fireEvent.change(celsiusInput, { target: { value: '-10' } });
    expect(parseFloat(fahrenheitInput.value)).toBeCloseTo(14, 1);

    fireEvent.change(fahrenheitInput, { target: { value: '-20' } });
    expect(parseFloat(celsiusInput.value)).toBeCloseTo(-28.89, 1);
  });

  it('handles partial input like minus sign', () => {
    renderTemperatureConverter();

    const celsiusInput = screen.getByPlaceholderText('Enter temperature in Celsius');
    const fahrenheitInput = screen.getByPlaceholderText('Enter temperature in Fahrenheit');

    fireEvent.change(celsiusInput, { target: { value: '-' } });
    expect(fahrenheitInput.value).toBe('');
  });
});

