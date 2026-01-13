import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TimeConverter from '../../../../src/pages/time-converter';

describe('TimeConverter Component', () => {
  it('should render without crashing', () => {
    render(<TimeConverter />);
    expect(screen.getByRole('heading', { name: 'Time Converter' })).toBeInTheDocument();
  });

  it('should display the page description', () => {
    render(<TimeConverter />);
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

  it('should render unit labels', () => {
    render(<TimeConverter />);

    expect(screen.getByText(/Milliseconds \(ms\)/)).toBeInTheDocument();
    expect(screen.getByText(/Seconds \(s\)/)).toBeInTheDocument();
    expect(screen.getByText(/Minutes \(min\)/)).toBeInTheDocument();
    expect(screen.getByText(/Hours \(hr\)/)).toBeInTheDocument();
    expect(screen.getByText(/Days \(d\)/)).toBeInTheDocument();
    expect(screen.getByText(/Weeks \(wk\)/)).toBeInTheDocument();
    expect(screen.getByText(/Months \(mo\)/)).toBeInTheDocument();
    expect(screen.getByText(/Years \(yr\)/)).toBeInTheDocument();
  });

  it('should render Clear All button', () => {
    render(<TimeConverter />);
    expect(screen.getByRole('button', { name: 'Clear All' })).toBeInTheDocument();
  });

  it('should render Quick Reference card', () => {
    render(<TimeConverter />);

    expect(screen.getByText('Quick Reference')).toBeInTheDocument();
    expect(screen.getByText(/1 minute = 60 seconds/)).toBeInTheDocument();
    expect(screen.getByText(/1 hour = 60 minutes/)).toBeInTheDocument();
  });

  it('should render Time Facts card', () => {
    render(<TimeConverter />);

    expect(screen.getByText('Time Facts')).toBeInTheDocument();
    expect(screen.getByText(/Months use an average of 30.44 days/)).toBeInTheDocument();
  });

  it('should initialize with empty input values', () => {
    render(<TimeConverter />);

    const secondsInput = screen.getByPlaceholderText('Enter s') as HTMLInputElement;
    const minutesInput = screen.getByPlaceholderText('Enter min') as HTMLInputElement;

    expect(secondsInput.value).toBe('');
    expect(minutesInput.value).toBe('');
  });
});

