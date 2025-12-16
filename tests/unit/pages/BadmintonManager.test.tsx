import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Theme } from '@radix-ui/themes';
import BadmintonManager from '../../../src/pages/badminton-manager';

const renderBadmintonManager = (): void => {
  render(
    <Theme>
      <BadmintonManager />
    </Theme>
  );
};

describe('BadmintonManager', () => {
  it('renders the component with title and description', () => {
    renderBadmintonManager();

    expect(screen.getByText('Badminton Manager')).toBeInTheDocument();
    expect(screen.getByText('Manage your badminton games, players, and tournaments')).toBeInTheDocument();
  });

  it('renders the iframe with correct src', () => {
    renderBadmintonManager();

    const iframe = screen.getByTestId('badminton-iframe');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://sylhare.github.io/Badminton/');
    expect(iframe).toHaveAttribute('title', 'Badminton Manager');
  });

  it('renders the about section', () => {
    renderBadmintonManager();

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('• Organize badminton matches and tournaments')).toBeInTheDocument();
    expect(screen.getByText('• Track player statistics and rankings')).toBeInTheDocument();
    expect(screen.getByText('• Generate match schedules automatically')).toBeInTheDocument();
    expect(screen.getByText('• Manage team compositions and rotations')).toBeInTheDocument();
  });

  it('iframe has fullscreen permission', () => {
    renderBadmintonManager();

    const iframe = screen.getByTestId('badminton-iframe');
    expect(iframe).toHaveAttribute('allow', 'fullscreen');
  });

  it('iframe is properly sized within the container', () => {
    renderBadmintonManager();

    const iframe = screen.getByTestId('badminton-iframe');
    expect(iframe).toHaveStyle({ width: '100%', height: '100%' });
  });
});

