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

  it('renders keypad with keys 0-9 in phone layout', () => {
    renderPhoneTextConverter();

    expect(screen.getByText('Keypad')).toBeInTheDocument();
    for (const digit of ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) {
      expect(screen.getByTestId(`keypad-${digit}`)).toBeInTheDocument();
    }
    expect(screen.getByText('ABC')).toBeInTheDocument();
    expect(screen.getByText('PQRS')).toBeInTheDocument();
    expect(screen.getByText('WXYZ')).toBeInTheDocument();
    expect(screen.getByText('SPACE')).toBeInTheDocument();
  });

  it('appends digit to phone input when keypad key is clicked', () => {
    renderPhoneTextConverter();

    const phoneInput = screen.getByPlaceholderText('Enter sequences (e.g., 44 33 555 555 666)');
    const textInput = screen.getByPlaceholderText('Enter text (e.g., HELLO)');

    fireEvent.click(screen.getByTestId('keypad-4'));
    fireEvent.click(screen.getByTestId('keypad-4'));
    expect(phoneInput).toHaveValue('44');
    expect(textInput).toHaveValue('H');
  });

  it('appends different digits to build a word', () => {
    renderPhoneTextConverter();

    const phoneInput = screen.getByPlaceholderText('Enter sequences (e.g., 44 33 555 555 666)');
    const textInput = screen.getByPlaceholderText('Enter text (e.g., HELLO)');

    fireEvent.click(screen.getByTestId('keypad-4'));
    fireEvent.click(screen.getByTestId('keypad-4'));
    fireEvent.click(screen.getByTestId('keypad-3'));
    fireEvent.click(screen.getByTestId('keypad-3'));
    expect(phoneInput).toHaveValue('4433');
    expect(textInput).toHaveValue('HE');
  });

  it('appends 0 for space via keypad', () => {
    renderPhoneTextConverter();

    const phoneInput = screen.getByPlaceholderText('Enter sequences (e.g., 44 33 555 555 666)');
    const textInput = screen.getByPlaceholderText('Enter text (e.g., HELLO)');

    fireEvent.click(screen.getByTestId('keypad-2'));
    fireEvent.click(screen.getByTestId('keypad-0'));
    fireEvent.click(screen.getByTestId('keypad-2'));
    fireEvent.click(screen.getByTestId('keypad-2'));
    expect(phoneInput).toHaveValue('2022');
    expect(textInput).toHaveValue('A B');
  });

  it('appends 1 when key 1 is clicked', () => {
    renderPhoneTextConverter();

    const phoneInput = screen.getByPlaceholderText('Enter sequences (e.g., 44 33 555 555 666)');

    fireEvent.click(screen.getByTestId('keypad-1'));
    expect(phoneInput).toHaveValue('1');
  });

  it('key 1 does not produce text but is still appended', () => {
    renderPhoneTextConverter();

    const phoneInput = screen.getByPlaceholderText('Enter sequences (e.g., 44 33 555 555 666)');
    const textInput = screen.getByPlaceholderText('Enter text (e.g., HELLO)');

    fireEvent.click(screen.getByTestId('keypad-1'));
    fireEvent.click(screen.getByTestId('keypad-2'));
    expect(phoneInput).toHaveValue('12');
    expect(textInput).toHaveValue('A');
  });

  it('clear button resets both inputs', () => {
    renderPhoneTextConverter();

    const textInput = screen.getByPlaceholderText('Enter text (e.g., HELLO)');
    const phoneInput = screen.getByPlaceholderText('Enter sequences (e.g., 44 33 555 555 666)');

    fireEvent.change(textInput, { target: { value: 'HELLO' } });
    expect(phoneInput).toHaveValue('44 33 555 555 666');

    fireEvent.click(screen.getByTestId('clear-button'));
    expect(textInput).toHaveValue('');
    expect(phoneInput).toHaveValue('');
    expect(screen.queryByText('Breakdown')).not.toBeInTheDocument();
  });

  it('clear button is disabled when both inputs are empty', () => {
    renderPhoneTextConverter();

    expect(screen.getByTestId('clear-button')).toBeDisabled();
  });

  it('clear button resets keypad input', () => {
    renderPhoneTextConverter();

    fireEvent.click(screen.getByTestId('keypad-4'));
    fireEvent.click(screen.getByTestId('keypad-4'));
    expect(screen.getByPlaceholderText('Enter sequences (e.g., 44 33 555 555 666)')).toHaveValue('44');

    fireEvent.click(screen.getByTestId('clear-button'));
    expect(screen.getByPlaceholderText('Enter sequences (e.g., 44 33 555 555 666)')).toHaveValue('');
    expect(screen.getByPlaceholderText('Enter text (e.g., HELLO)')).toHaveValue('');
  });
});
