import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import WeightConverter from '../../../../src/pages/weight-converter';

describe('WeightConverter Component', () => {
  it('should render without crashing', () => {
    render(<WeightConverter />);
    expect(screen.getByRole('heading', { name: 'Weight Converter' })).toBeInTheDocument();
  });

  it.each(['Enter g', 'Enter kg', 'Enter oz', 'Enter lb'])('should render input "%s"', placeholder => {
    render(<WeightConverter />);
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it.each(['Grams', 'Kilograms', 'Ounces', 'Pounds'])('should render unit label "%s"', label => {
    render(<WeightConverter />);
    expect(screen.getByText(new RegExp(label))).toBeInTheDocument();
  });

  it('should render Clear All button', () => {
    render(<WeightConverter />);
    expect(screen.getByRole('button', { name: 'Clear All' })).toBeInTheDocument();
  });

  it('should initialize with empty input values', () => {
    render(<WeightConverter />);
    expect(screen.getByPlaceholderText('Enter g')).toHaveValue(null);
    expect(screen.getByPlaceholderText('Enter kg')).toHaveValue(null);
  });
});
