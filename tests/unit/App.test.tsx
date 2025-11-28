import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import App from '../../src/App';

const renderApp = (initialRoute = '/'): void => {
  render(
    <Theme>
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    </Theme>
  );
};

describe('App', () => {
  it('renders home page by default', () => {
    renderApp('/');
    expect(screen.getByRole('heading', { name: 'Available Tools' })).toBeInTheDocument();
  });

  it('renders about page', () => {
    renderApp('/about');
    expect(screen.getByText('About This Project')).toBeInTheDocument();
  });

  it('renders tools page', () => {
    renderApp('/tools');
    expect(screen.getByText('Available Tools')).toBeInTheDocument();
  });

  it('renders temperature converter page', () => {
    renderApp('/temperature-converter');
    expect(screen.getByText('Temperature Converter')).toBeInTheDocument();
  });

  it('renders 404 page for unknown routes', () => {
    renderApp('/unknown-route');
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
});

