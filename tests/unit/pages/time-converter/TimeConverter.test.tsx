import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TimeConverter from '../../../../src/pages/time-converter';
import { formatTimestamp, formatISOTimestamp } from '../../../../src/pages/time-converter/config';

describe('formatTimestamp', () => {
  it('should format a valid timestamp to a localized date string', () => {
    const timestamp = 1704067200000;
    const result = formatTimestamp(timestamp);

    expect(result.length).toBeGreaterThan(0);
    expect(result).toMatch(/202[34]/);
  });

  it('should return "Invalid timestamp" for NaN', () => {
    expect(formatTimestamp(NaN)).toBe('Invalid timestamp');
  });

  it('should handle Unix epoch (0)', () => {
    const result = formatTimestamp(0);
    // Should contain either 1969 or 1970 depending on timezone
    expect(result).toMatch(/19(69|70)/);
  });

  it('should handle negative timestamps (dates before 1970)', () => {
    const result = formatTimestamp(-86400000 * 365);
    expect(result).toMatch(/196[89]/);
  });
});

describe('formatISOTimestamp', () => {
  it('should format a valid timestamp to ISO 8601 format', () => {
    const timestamp = 1704067200000;
    const result = formatISOTimestamp(timestamp);

    expect(result).toBe('2024-01-01T00:00:00.000Z');
  });

  it('should return empty string for NaN', () => {
    expect(formatISOTimestamp(NaN)).toBe('');
  });

  it('should handle Unix epoch (0)', () => {
    expect(formatISOTimestamp(0)).toBe('1970-01-01T00:00:00.000Z');
  });

  it('should handle timestamps with milliseconds', () => {
    const timestamp = 1704067200123;
    const result = formatISOTimestamp(timestamp);

    expect(result).toBe('2024-01-01T00:00:00.123Z');
  });

  it('should handle negative timestamps', () => {
    const result = formatISOTimestamp(-86400000);
    expect(result).toBe('1969-12-31T00:00:00.000Z');
  });
});

describe('TimeConverter Component', () => {
  it('should render without crashing', () => {
    render(<TimeConverter />);
    expect(screen.getByRole('heading', { name: 'Time Converter' })).toBeInTheDocument();
    expect(screen.getByText('Convert time between seconds, minutes, hours, days, and more')).toBeInTheDocument();
  });

  it('should render all input fields', () => {
    render(<TimeConverter />);

    expect(screen.getByPlaceholderText('Enter ms')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter s')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter min')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter hr')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter days')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter weeks')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter months')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter years')).toBeInTheDocument();
  });

  it('should render Clear All button', () => {
    render(<TimeConverter />);
    expect(screen.getByRole('button', { name: 'Clear All' })).toBeInTheDocument();
  });

  it('should initialize with empty input values', () => {
    render(<TimeConverter />);

    const secondsInput = screen.getByPlaceholderText('Enter s');
    const minutesInput = screen.getByPlaceholderText('Enter min');

    expect(secondsInput).toHaveValue(null);
    expect(minutesInput).toHaveValue(null);
  });

  it('should render timestamp to date section with input field', () => {
    render(<TimeConverter />);

    expect(screen.getByText('📅 Timestamp to Date')).toBeInTheDocument();
    expect(screen.getByText('Enter a timestamp in milliseconds to see the corresponding date')).toBeInTheDocument();
    expect(screen.getByTestId('timestamp-input')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g. 1706400000000')).toBeInTheDocument();
  });

  it('should display formatted date when milliseconds are entered in grid', () => {
    render(<TimeConverter />);

    const msInput = screen.getByPlaceholderText('Enter ms');
    fireEvent.change(msInput, { target: { value: '1704067200000' } });

    expect(screen.getByTestId('timestamp-local')).toBeInTheDocument();
    expect(screen.getByTestId('timestamp-iso')).toHaveValue('2024-01-01T00:00:00.000Z');
  });

  it('should display formatted date when timestamp is pasted in dedicated input', () => {
    render(<TimeConverter />);

    const timestampInput = screen.getByTestId('timestamp-input');
    fireEvent.change(timestampInput, { target: { value: '1704067200000' } });

    expect(screen.getByTestId('timestamp-local')).toBeInTheDocument();
    expect(screen.getByTestId('timestamp-iso')).toHaveValue('2024-01-01T00:00:00.000Z');
    
    // Should also sync with the ms input in the grid
    expect(screen.getByPlaceholderText('Enter ms')).toHaveValue(1704067200000);
  });
});
