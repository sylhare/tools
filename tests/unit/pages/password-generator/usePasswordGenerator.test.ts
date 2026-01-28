import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePasswordGenerator, ALL_SPECIAL_CHARS, COMMON_SPECIAL_CHARS } from '../../../../src/pages/password-generator/usePasswordGenerator';

describe('usePasswordGenerator', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe('initial state', () => {
    it('initializes with default options', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      expect(result.current.options.length).toBe(16);
      expect(result.current.options.includeUppercase).toBe(true);
      expect(result.current.options.includeLowercase).toBe(true);
      expect(result.current.options.includeNumbers).toBe(true);
      expect(result.current.options.includeSpecialChars).toBe(true);
      expect(result.current.options.selectedSpecialChars.size).toBe(ALL_SPECIAL_CHARS.length);
    });

    it('initializes with empty password', () => {
      const { result } = renderHook(() => usePasswordGenerator());
      expect(result.current.password).toBe('');
    });

    it('initializes with all special characters selected', () => {
      const { result } = renderHook(() => usePasswordGenerator());
      ALL_SPECIAL_CHARS.split('').forEach(char => {
        expect(result.current.options.selectedSpecialChars.has(char)).toBe(true);
      });
    });
  });

  describe('password generation', () => {
    it('generates a password with the correct length', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.generatePassword();
      });

      expect(result.current.password.length).toBe(16);
    });

    it('generates a password with custom length', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.setLength(24);
      });

      act(() => {
        result.current.generatePassword();
      });

      expect(result.current.password.length).toBe(24);
    });

    it('generates password with only uppercase when other options are disabled', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.setIncludeLowercase(false);
        result.current.setIncludeNumbers(false);
        result.current.setIncludeSpecialChars(false);
      });

      act(() => {
        result.current.generatePassword();
      });

      expect(result.current.password).toMatch(/^[A-Z]+$/);
    });

    it('generates password with only lowercase when other options are disabled', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.setIncludeUppercase(false);
        result.current.setIncludeNumbers(false);
        result.current.setIncludeSpecialChars(false);
      });

      act(() => {
        result.current.generatePassword();
      });

      expect(result.current.password).toMatch(/^[a-z]+$/);
    });

    it('generates password with only numbers when other options are disabled', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.setIncludeUppercase(false);
        result.current.setIncludeLowercase(false);
        result.current.setIncludeSpecialChars(false);
      });

      act(() => {
        result.current.generatePassword();
      });

      expect(result.current.password).toMatch(/^[0-9]+$/);
    });

    it('generates password with only special characters when other options are disabled', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.setIncludeUppercase(false);
        result.current.setIncludeLowercase(false);
        result.current.setIncludeNumbers(false);
      });

      act(() => {
        result.current.generatePassword();
      });

      expect(result.current.password).toMatch(/^[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]+$/);
    });

    it('generates empty password when no character types are selected', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.setIncludeUppercase(false);
        result.current.setIncludeLowercase(false);
        result.current.setIncludeNumbers(false);
        result.current.setIncludeSpecialChars(false);
      });

      act(() => {
        result.current.generatePassword();
      });

      expect(result.current.password).toBe('');
    });

    it('includes at least one character from each selected type', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      for (let i = 0; i < 10; i++) {
        act(() => {
          result.current.generatePassword();
        });

        expect(result.current.password).toMatch(/[A-Z]/);
        expect(result.current.password).toMatch(/[a-z]/);
        expect(result.current.password).toMatch(/[0-9]/);
        expect(result.current.password).toMatch(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/);
      }
    });

    it('generates different passwords on each call', () => {
      const { result } = renderHook(() => usePasswordGenerator());
      const passwords = new Set<string>();

      for (let i = 0; i < 10; i++) {
        act(() => {
          result.current.generatePassword();
        });
        passwords.add(result.current.password);
      }

      expect(passwords.size).toBeGreaterThan(5);
    });
  });

  describe('setLength', () => {
    it('sets length within valid range', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.setLength(32);
      });

      expect(result.current.options.length).toBe(32);
    });

    it('clamps length to minimum of 4', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.setLength(2);
      });

      expect(result.current.options.length).toBe(4);
    });

    it('clamps length to maximum of 128', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.setLength(200);
      });

      expect(result.current.options.length).toBe(128);
    });
  });

  describe('option toggles', () => {
    it('toggles uppercase option', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      expect(result.current.options.includeUppercase).toBe(true);

      act(() => {
        result.current.setIncludeUppercase(false);
      });

      expect(result.current.options.includeUppercase).toBe(false);

      act(() => {
        result.current.setIncludeUppercase(true);
      });

      expect(result.current.options.includeUppercase).toBe(true);
    });

    it('toggles lowercase option', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      expect(result.current.options.includeLowercase).toBe(true);

      act(() => {
        result.current.setIncludeLowercase(false);
      });

      expect(result.current.options.includeLowercase).toBe(false);
    });

    it('toggles numbers option', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      expect(result.current.options.includeNumbers).toBe(true);

      act(() => {
        result.current.setIncludeNumbers(false);
      });

      expect(result.current.options.includeNumbers).toBe(false);
    });

    it('toggles special characters option', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      expect(result.current.options.includeSpecialChars).toBe(true);

      act(() => {
        result.current.setIncludeSpecialChars(false);
      });

      expect(result.current.options.includeSpecialChars).toBe(false);
    });
  });

  describe('special character selection', () => {
    it('toggles individual special character', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      expect(result.current.options.selectedSpecialChars.has('!')).toBe(true);

      act(() => {
        result.current.toggleSpecialChar('!');
      });

      expect(result.current.options.selectedSpecialChars.has('!')).toBe(false);

      act(() => {
        result.current.toggleSpecialChar('!');
      });

      expect(result.current.options.selectedSpecialChars.has('!')).toBe(true);
    });

    it('selects all special characters', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.selectNoSpecialChars();
      });

      expect(result.current.options.selectedSpecialChars.size).toBe(0);

      act(() => {
        result.current.selectAllSpecialChars();
      });

      expect(result.current.options.selectedSpecialChars.size).toBe(ALL_SPECIAL_CHARS.length);
      ALL_SPECIAL_CHARS.split('').forEach(char => {
        expect(result.current.options.selectedSpecialChars.has(char)).toBe(true);
      });
    });

    it('selects no special characters', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.selectNoSpecialChars();
      });

      expect(result.current.options.selectedSpecialChars.size).toBe(0);
    });

    it('selects common special characters', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.selectCommonSpecialChars();
      });

      expect(result.current.options.selectedSpecialChars.size).toBe(COMMON_SPECIAL_CHARS.length);
      COMMON_SPECIAL_CHARS.split('').forEach(char => {
        expect(result.current.options.selectedSpecialChars.has(char)).toBe(true);
      });
    });

    it('generates password with only selected special characters', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.setIncludeUppercase(false);
        result.current.setIncludeLowercase(false);
        result.current.setIncludeNumbers(false);
        result.current.selectNoSpecialChars();
        result.current.toggleSpecialChar('!');
        result.current.toggleSpecialChar('@');
      });

      act(() => {
        result.current.generatePassword();
      });

      expect(result.current.password).toMatch(/^[!@]+$/);
    });

    it('generates empty password when special chars enabled but none selected', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.setIncludeUppercase(false);
        result.current.setIncludeLowercase(false);
        result.current.setIncludeNumbers(false);
        result.current.selectNoSpecialChars();
      });

      act(() => {
        result.current.generatePassword();
      });

      expect(result.current.password).toBe('');
    });
  });

  describe('getPasswordStrength', () => {
    it('returns weak for empty password', () => {
      const { result } = renderHook(() => usePasswordGenerator());
      expect(result.current.getPasswordStrength()).toBe('weak');
    });

    it('returns weak for short password with few character types', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.setLength(4);
        result.current.setIncludeLowercase(false);
        result.current.setIncludeNumbers(false);
        result.current.setIncludeSpecialChars(false);
      });

      act(() => {
        result.current.generatePassword();
      });

      expect(result.current.getPasswordStrength()).toBe('weak');
    });

    it('returns very-strong for long password with all character types', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.setLength(24);
      });

      act(() => {
        result.current.generatePassword();
      });

      expect(result.current.getPasswordStrength()).toBe('very-strong');
    });

    it('returns medium for medium-length password', () => {
      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.setLength(10);
        result.current.setIncludeSpecialChars(false);
      });

      act(() => {
        result.current.generatePassword();
      });

      const strength = result.current.getPasswordStrength();
      expect(['medium', 'strong']).toContain(strength);
    });
  });

  describe('copyToClipboard', () => {
    it('returns false when password is empty', async () => {
      const { result } = renderHook(() => usePasswordGenerator());

      let copyResult: boolean = true;
      await act(async () => {
        copyResult = await result.current.copyToClipboard();
      });

      expect(copyResult).toBe(false);
    });

    it('copies password to clipboard successfully', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined);
      Object.assign(navigator, {
        clipboard: {
          writeText: mockWriteText,
        },
      });

      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.generatePassword();
      });

      let copyResult: boolean = false;
      await act(async () => {
        copyResult = await result.current.copyToClipboard();
      });

      expect(copyResult).toBe(true);
      expect(mockWriteText).toHaveBeenCalledWith(result.current.password);
    });

    it('returns false when clipboard write fails', async () => {
      const mockWriteText = vi.fn().mockRejectedValue(new Error('Clipboard error'));
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      Object.assign(navigator, {
        clipboard: {
          writeText: mockWriteText,
        },
      });

      const { result } = renderHook(() => usePasswordGenerator());

      act(() => {
        result.current.generatePassword();
      });

      let copyResult: boolean = true;
      await act(async () => {
        copyResult = await result.current.copyToClipboard();
      });

      expect(copyResult).toBe(false);
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });
});

