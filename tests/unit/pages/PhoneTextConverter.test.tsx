import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Theme } from '@radix-ui/themes';
import PhoneTextConverter from '../../../src/pages/phone-text-converter';

const renderPhoneTextConverter = (): void => {
  render(
    <Theme>
      <PhoneTextConverter />
    </Theme>
  );
};

describe('PhoneTextConverter', () => {
  it('renders the title, description, and both inputs', () => {
    renderPhoneTextConverter();

    expect(screen.getByText('Phone Keypad Converter')).toBeInTheDocument();
    expect(screen.getByText('Convert text to phone keypad sequences and back')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter text (e.g., HELLO)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter sequences (e.g., 44 33 555 555 666)')).toBeInTheDocument();
  });

  it('converts text to phone sequences when text is entered', () => {
    renderPhoneTextConverter();

    const textInput = screen.getByPlaceholderText('Enter text (e.g., HELLO)');
    const phoneInput = screen.getByPlaceholderText('Enter sequences (e.g., 44 33 555 555 666)');

    fireEvent.change(textInput, { target: { value: 'HELLO' } });
    expect(phoneInput).toHaveValue('44 33 555 555 666');
  });

  it('converts phone sequences to text when sequences are entered', () => {
    renderPhoneTextConverter();

    const textInput = screen.getByPlaceholderText('Enter text (e.g., HELLO)');
    const phoneInput = screen.getByPlaceholderText('Enter sequences (e.g., 44 33 555 555 666)');

    fireEvent.change(phoneInput, { target: { value: '44 33 555 555 666' } });
    expect(textInput).toHaveValue('HELLO');
  });

  it('shows breakdown output when text is entered', () => {
    renderPhoneTextConverter();

    const textInput = screen.getByPlaceholderText('Enter text (e.g., HELLO)');

    fireEvent.change(textInput, { target: { value: 'HI' } });

    expect(screen.getByText('Breakdown')).toBeInTheDocument();
    expect(screen.getByText('44')).toBeInTheDocument();
    expect(screen.getByText('444')).toBeInTheDocument();
  });

  it('shows breakdown output when phone sequences are entered', () => {
    renderPhoneTextConverter();

    const phoneInput = screen.getByPlaceholderText('Enter sequences (e.g., 44 33 555 555 666)');

    fireEvent.change(phoneInput, { target: { value: '2 22' } });

    expect(screen.getByText('Breakdown')).toBeInTheDocument();
  });

  it('clears phone input and breakdown when text is cleared', () => {
    renderPhoneTextConverter();

    const textInput = screen.getByPlaceholderText('Enter text (e.g., HELLO)');
    const phoneInput = screen.getByPlaceholderText('Enter sequences (e.g., 44 33 555 555 666)');

    fireEvent.change(textInput, { target: { value: 'HI' } });
    expect(screen.getByText('Breakdown')).toBeInTheDocument();

    fireEvent.change(textInput, { target: { value: '' } });
    expect(phoneInput).toHaveValue('');
    expect(screen.queryByText('Breakdown')).not.toBeInTheDocument();
  });

  it('clears text input when phone sequences are cleared', () => {
    renderPhoneTextConverter();

    const textInput = screen.getByPlaceholderText('Enter text (e.g., HELLO)');
    const phoneInput = screen.getByPlaceholderText('Enter sequences (e.g., 44 33 555 555 666)');

    fireEvent.change(phoneInput, { target: { value: '44 33 555 555 666' } });
    expect(textInput).toHaveValue('HELLO');

    fireEvent.change(phoneInput, { target: { value: '' } });
    expect(textInput).toHaveValue('');
  });

  it('handles lowercase text input', () => {
    renderPhoneTextConverter();

    const phoneInput = screen.getByPlaceholderText('Enter sequences (e.g., 44 33 555 555 666)');

    fireEvent.change(screen.getByPlaceholderText('Enter text (e.g., HELLO)'), {
      target: { value: 'hello' },
    });
    expect(phoneInput).toHaveValue('44 33 555 555 666');
  });

  it('renders keypad reference with keys 2-9 and 0', () => {
    renderPhoneTextConverter();

    expect(screen.getByText('Keypad Reference')).toBeInTheDocument();
    expect(screen.getByText('ABC')).toBeInTheDocument();
    expect(screen.getByText('PQRS')).toBeInTheDocument();
    expect(screen.getByText('WXYZ')).toBeInTheDocument();
    expect(screen.getByText('SPACE')).toBeInTheDocument();
  });
});
