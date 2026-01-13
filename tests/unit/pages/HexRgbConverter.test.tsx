import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HexRgbConverter from '../../../src/pages/hex-rgb-converter';

describe('HexRgbConverter', () => {
  it('renders the converter page', () => {
    render(<HexRgbConverter />);

    expect(screen.getByRole('heading', { name: /Hex to RGB Converter/i })).toBeInTheDocument();
    expect(screen.getByText(/Convert colors between Hexadecimal and RGB formats/i)).toBeInTheDocument();
  });

  it('renders hex input field', () => {
    render(<HexRgbConverter />);

    expect(screen.getByPlaceholderText(/Enter hex value/i)).toBeInTheDocument();
  });

  it('renders all rgb input fields', () => {
    render(<HexRgbConverter />);

    const rgbInputs = screen.getAllByPlaceholderText('0-255');
    expect(rgbInputs).toHaveLength(3);
  });
});
