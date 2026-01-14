import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TimeConverter from '../../../../src/pages/time-converter';

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

    const secondsInput = screen.getByPlaceholderText('Enter s') as HTMLInputElement;
    const minutesInput = screen.getByPlaceholderText('Enter min') as HTMLInputElement;

    expect(secondsInput.value).toBe('');
    expect(minutesInput.value).toBe('');
  });
});
