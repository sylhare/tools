import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import ToolCard from '../../../src/components/ToolCard';

const renderToolCard = (props = {
  title: 'Test Tool',
  description: 'Test description',
  icon: '🔧',
  link: '/test-tool',
}): void => {
  render(
    <Theme>
      <MemoryRouter>
        <ToolCard {...props} />
      </MemoryRouter>
    </Theme>
  );
};

describe('ToolCard', () => {
  it('renders the title with icon', () => {
    renderToolCard();

    const heading = screen.getByRole('heading', { name: '🔧 Test Tool' });
    expect(heading).toBeInTheDocument();
  });

  it('renders the description', () => {
    renderToolCard();

    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders the button with correct text', () => {
    renderToolCard();

    const button = screen.getByRole('button', { name: 'Open Tool →' });
    expect(button).toBeInTheDocument();
  });

  it('renders a link with the correct path', () => {
    renderToolCard();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/test-tool');
  });

  it('renders with different props', () => {
    renderToolCard({
      title: 'Temperature Converter',
      description: 'Convert temperatures between Celsius and Fahrenheit',
      icon: '🌡️',
      link: '/temperature-converter',
    });

    expect(screen.getByRole('heading', { name: '🌡️ Temperature Converter' })).toBeInTheDocument();
    expect(screen.getByText('Convert temperatures between Celsius and Fahrenheit')).toBeInTheDocument();

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/temperature-converter');
  });
});

