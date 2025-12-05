import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MeasurementConverter from '../../../../src/pages/measurement-converter';

describe('MeasurementConverter Component', () => {
  it('should render without crashing', () => {
    render(<MeasurementConverter />);
    expect(screen.getByRole('heading', { name: 'Length Converter' })).toBeInTheDocument();
  });

  it('should display the page description', () => {
    render(<MeasurementConverter />);
    expect(screen.getByText('Convert lengths between metric and imperial units')).toBeInTheDocument();
  });

  it('should display metric system heading', () => {
    render(<MeasurementConverter />);
    expect(screen.getByText('Metric System')).toBeInTheDocument();
  });

  it('should display imperial system heading', () => {
    render(<MeasurementConverter />);
    expect(screen.getByText('Imperial System')).toBeInTheDocument();
  });

  it('should render all metric input fields', () => {
    render(<MeasurementConverter />);
    
    expect(screen.getByPlaceholderText('Enter mm')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter cm')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter m')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter km')).toBeInTheDocument();
  });

  it('should render all imperial input fields', () => {
    render(<MeasurementConverter />);
    
    expect(screen.getByPlaceholderText('Enter in')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter ft')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter yd')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter mi')).toBeInTheDocument();
  });

  it('should render metric unit labels', () => {
    render(<MeasurementConverter />);
    
    expect(screen.getByText(/Millimeters/)).toBeInTheDocument();
    expect(screen.getByText(/Centimeters/)).toBeInTheDocument();
    expect(screen.getByText(/Meters/)).toBeInTheDocument();
    expect(screen.getByText(/Kilometers/)).toBeInTheDocument();
  });

  it('should render imperial unit labels', () => {
    render(<MeasurementConverter />);
    
    expect(screen.getByText(/Inches/)).toBeInTheDocument();
    expect(screen.getByText(/Feet/)).toBeInTheDocument();
    expect(screen.getByText(/Yards/)).toBeInTheDocument();
    expect(screen.getByText(/Miles/)).toBeInTheDocument();
  });

  it('should render Clear All button', () => {
    render(<MeasurementConverter />);
    expect(screen.getByRole('button', { name: 'Clear All' })).toBeInTheDocument();
  });

  it('should render Quick Reference card', () => {
    render(<MeasurementConverter />);
    
    expect(screen.getByText('Quick Reference')).toBeInTheDocument();
    expect(screen.getByText(/1 inch = 2.54 cm/)).toBeInTheDocument();
    expect(screen.getByText(/1 foot = 12 inches/)).toBeInTheDocument();
  });

  it('should render Size Reference card', () => {
    render(<MeasurementConverter />);
    
    expect(screen.getByText('Size Reference')).toBeInTheDocument();
    expect(screen.getByText(/Credit card/)).toBeInTheDocument();
  });

  it('should initialize with empty input values', () => {
    render(<MeasurementConverter />);
    
    const cmInput = screen.getByPlaceholderText('Enter cm') as HTMLInputElement;
    const inInput = screen.getByPlaceholderText('Enter in') as HTMLInputElement;
    
    expect(cmInput.value).toBe('');
    expect(inInput.value).toBe('');
  });

  it('should have organized layout with metric and imperial sections', () => {
    render(<MeasurementConverter />);
    
    const metricSection = screen.getByText('Metric System');
    const imperialSection = screen.getByText('Imperial System');
    
    expect(metricSection).toBeInTheDocument();
    expect(imperialSection).toBeInTheDocument();
  });
});



