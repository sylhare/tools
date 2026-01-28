import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PasswordGenerator from '../../../src/pages/password-generator';

describe('PasswordGenerator', () => {
  it('renders the password generator page', () => {
    render(<PasswordGenerator />);

    expect(screen.getByRole('heading', { name: /Password Generator/i })).toBeInTheDocument();
    expect(screen.getByText(/Generate secure passwords with customizable options/i)).toBeInTheDocument();
  });

  it('renders password output field', () => {
    render(<PasswordGenerator />);

    expect(screen.getByTestId('password-output')).toBeInTheDocument();
  });

  it('renders all character type checkboxes', () => {
    render(<PasswordGenerator />);

    expect(screen.getByTestId('uppercase-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('lowercase-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('numbers-checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('special-checkbox')).toBeInTheDocument();
  });

  it('renders generate button', () => {
    render(<PasswordGenerator />);

    expect(screen.getByTestId('generate-button')).toBeInTheDocument();
    expect(screen.getByText('Generate New Password')).toBeInTheDocument();
  });

  it('renders copy button', () => {
    render(<PasswordGenerator />);

    expect(screen.getByTestId('copy-button')).toBeInTheDocument();
  });

  it('renders password tips section', () => {
    render(<PasswordGenerator />);

    expect(screen.getByText(/Password Tips/i)).toBeInTheDocument();
    expect(screen.getByText(/Use at least 12 characters for better security/i)).toBeInTheDocument();
    expect(screen.getByText(/Include a mix of uppercase, lowercase, numbers, and symbols/i)).toBeInTheDocument();
    expect(screen.getByText(/Avoid using personal information in passwords/i)).toBeInTheDocument();
    expect(screen.getByText(/Use a unique password for each account/i)).toBeInTheDocument();
    expect(screen.getByText(/Consider using a password manager/i)).toBeInTheDocument();
  });

  it('renders password length slider', () => {
    render(<PasswordGenerator />);

    expect(screen.getByTestId('length-slider')).toBeInTheDocument();
    expect(screen.getByTestId('length-display')).toBeInTheDocument();
  });

  it('generates password on mount', async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      const passwordInput = screen.getByTestId('password-output');
      expect(passwordInput).not.toHaveValue('');
    });
  });

  it('generates new password when clicking generate button', async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      const passwordInput = screen.getByTestId('password-output');
      expect(passwordInput).not.toHaveValue('');
    });

    const passwordInput = screen.getByTestId('password-output');
    const generateButton = screen.getByTestId('generate-button');
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(passwordInput).not.toHaveValue('');
    });
  });

  it('shows strength indicator after password is generated', async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      expect(screen.getByTestId('strength-label')).toBeInTheDocument();
      expect(screen.getByTestId('strength-bar')).toBeInTheDocument();
    });
  });

  it('all checkboxes are checked by default', () => {
    render(<PasswordGenerator />);

    expect(screen.getByTestId('uppercase-checkbox')).toBeChecked();
    expect(screen.getByTestId('lowercase-checkbox')).toBeChecked();
    expect(screen.getByTestId('numbers-checkbox')).toBeChecked();
    expect(screen.getByTestId('special-checkbox')).toBeChecked();
  });

  it('shows error when all character types are unchecked', async () => {
    render(<PasswordGenerator />);

    fireEvent.click(screen.getByTestId('uppercase-checkbox'));
    fireEvent.click(screen.getByTestId('lowercase-checkbox'));
    fireEvent.click(screen.getByTestId('numbers-checkbox'));
    fireEvent.click(screen.getByTestId('special-checkbox'));

    await waitFor(() => {
      expect(screen.getByText('Please select at least one character type')).toBeInTheDocument();
      expect(screen.getByTestId('generate-button')).toBeDisabled();
    });
  });

  it('displays default length of 16 characters', () => {
    render(<PasswordGenerator />);

    expect(screen.getByTestId('length-display')).toHaveTextContent('16 characters');
  });

  it('shows special character customization toggle when special chars enabled', () => {
    render(<PasswordGenerator />);

    expect(screen.getByTestId('special-chars-toggle')).toBeInTheDocument();
    expect(screen.getByText(/Customize characters/)).toBeInTheDocument();
  });

  it('expands special character panel when toggle is clicked', async () => {
    render(<PasswordGenerator />);

    const toggle = screen.getByTestId('special-chars-toggle');
    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByTestId('special-chars-panel')).toBeInTheDocument();
      expect(screen.getByTestId('special-chars-all')).toBeInTheDocument();
      expect(screen.getByTestId('special-chars-none')).toBeInTheDocument();
      expect(screen.getByTestId('special-chars-common')).toBeInTheDocument();
    });
  });

  it('hides special character customization when special chars disabled', async () => {
    render(<PasswordGenerator />);

    fireEvent.click(screen.getByTestId('special-checkbox'));

    await waitFor(() => {
      expect(screen.queryByTestId('special-chars-toggle')).not.toBeInTheDocument();
    });
  });

  it('selects common special characters when common button clicked', async () => {
    render(<PasswordGenerator />);

    const toggle = screen.getByTestId('special-chars-toggle');
    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByTestId('special-chars-panel')).toBeInTheDocument();
    });

    const commonButton = screen.getByTestId('special-chars-common');
    fireEvent.click(commonButton);

    await waitFor(() => {
      // COMMON_SPECIAL_CHARS = '!@#$%^&*?' = 9 characters
      expect(screen.getByText(/9 selected/)).toBeInTheDocument();
    });
  });

  it('clears all special characters when none button clicked', async () => {
    render(<PasswordGenerator />);

    const toggle = screen.getByTestId('special-chars-toggle');
    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByTestId('special-chars-panel')).toBeInTheDocument();
    });

    const noneButton = screen.getByTestId('special-chars-none');
    fireEvent.click(noneButton);

    await waitFor(() => {
      expect(screen.getByText(/0 selected/)).toBeInTheDocument();
    });
  });
});
