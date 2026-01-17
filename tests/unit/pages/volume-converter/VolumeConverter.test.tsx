import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import VolumeConverter from '../../../../src/pages/volume-converter';

describe('VolumeConverter Component', () => {
  it('should render without crashing', () => {
    render(<VolumeConverter />);
    expect(screen.getByRole('heading', { name: 'Volume Converter' })).toBeInTheDocument();
  });

  it('should render all input fields', () => {
    render(<VolumeConverter />);

    expect(screen.getByPlaceholderText('Enter mL')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter L')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter tsp')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter tbsp')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter fl oz')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter cups')).toBeInTheDocument();
  });

  it('should render unit labels', () => {
    render(<VolumeConverter />);

    expect(screen.getByText(/Milliliters/)).toBeInTheDocument();
    expect(screen.getByText(/Liters/)).toBeInTheDocument();
    expect(screen.getByText(/Teaspoons/)).toBeInTheDocument();
    expect(screen.getByText(/Tablespoons/)).toBeInTheDocument();
    expect(screen.getByText(/Fluid Ounces/)).toBeInTheDocument();
    expect(screen.getByText(/Cups/)).toBeInTheDocument();
  });

  it('should render Clear All button', () => {
    render(<VolumeConverter />);
    expect(screen.getByRole('button', { name: 'Clear All' })).toBeInTheDocument();
  });

  it('should initialize with empty input values', () => {
    render(<VolumeConverter />);

    const mlInput = screen.getByPlaceholderText('Enter mL');
    const cupInput = screen.getByPlaceholderText('Enter cups');

    expect(mlInput).toHaveValue(null);
    expect(cupInput).toHaveValue(null);
  });
});
