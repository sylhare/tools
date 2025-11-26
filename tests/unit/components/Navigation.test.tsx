import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import Navigation from '../../../src/components/Navigation';

const renderNavigation = (): void => {
  render(
    <Theme>
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    </Theme>
  );
};

describe('Navigation', () => {
  it('renders all navigation links', () => {
    renderNavigation();

    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    // Get the Tools link (not the heading)
    const links = screen.getAllByRole('link', { name: 'Tools' });
    expect(links.length).toBeGreaterThan(0);
  });

  it('renders the brand heading', () => {
    renderNavigation();

    const headings = screen.getAllByText('Tools');
    expect(headings.length).toBeGreaterThan(0);
  });
});

