import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HexRgbConverter from '../../../src/pages/hex-rgb-converter';

describe('HexRgbConverter', () => {
  it('renders the converter page', () => {
    render(<HexRgbConverter />);

    expect(screen.getByRole('heading', { name: /Hex to RGB Converter/i })).toBeInTheDocument();
    expect(screen.getByText(/Convert colors between Hexadecimal and RGB formats/i)).toBeInTheDocument();
  });

  it('renders color preview', () => {
    render(<HexRgbConverter />);

    expect(screen.getByText(/Color Preview/i)).toBeInTheDocument();
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

  it('renders quick examples section', () => {
    render(<HexRgbConverter />);

    expect(screen.getByText(/Quick Examples/i)).toBeInTheDocument();
    expect(screen.getByText(/Red: #FF0000 = rgb\(255, 0, 0\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Green: #00FF00 = rgb\(0, 255, 0\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Blue: #0000FF = rgb\(0, 0, 255\)/i)).toBeInTheDocument();
    expect(screen.getByText(/White: #FFFFFF = rgb\(255, 255, 255\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Black: #000000 = rgb\(0, 0, 0\)/i)).toBeInTheDocument();
  });
});

