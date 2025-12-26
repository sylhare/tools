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
      const passwordInput = screen.getByTestId('password-output') as HTMLInputElement;
      expect(passwordInput.value).not.toBe('');
    });
  });

  it('generates new password when clicking generate button', async () => {
    render(<PasswordGenerator />);

    await waitFor(() => {
      const passwordInput = screen.getByTestId('password-output') as HTMLInputElement;
      expect(passwordInput.value).not.toBe('');
    });

    const passwordInput = screen.getByTestId('password-output') as HTMLInputElement;
    const generateButton = screen.getByTestId('generate-button');
    fireEvent.click(generateButton);

    await waitFor(() => {
      const newPassword = passwordInput.value;
      // New password should be generated (might be same in rare cases)
      expect(newPassword).not.toBe('');
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

    // Uncheck all options
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
});

