import { useState, useCallback } from 'react';

export const ALL_SPECIAL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
export const COMMON_SPECIAL_CHARS = '!@#$%^&*?';

export interface PasswordOptions {
  length: number;
  includeUppercase: boolean;
  includeLowercase: boolean;
  includeNumbers: boolean;
  includeSpecialChars: boolean;
  selectedSpecialChars: Set<string>;
}

interface UsePasswordGeneratorReturn {
  password: string;
  options: PasswordOptions;
  setLength: (length: number) => void;
  setIncludeUppercase: (include: boolean) => void;
  setIncludeLowercase: (include: boolean) => void;
  setIncludeNumbers: (include: boolean) => void;
  setIncludeSpecialChars: (include: boolean) => void;
  toggleSpecialChar: (char: string) => void;
  selectAllSpecialChars: () => void;
  selectNoSpecialChars: () => void;
  selectCommonSpecialChars: () => void;
  generatePassword: () => void;
  copyToClipboard: () => Promise<boolean>;
  getPasswordStrength: () => 'weak' | 'medium' | 'strong' | 'very-strong';
}

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';

/**
 * Uniform random integer in [0, max) from the CSPRNG, using rejection
 * sampling to avoid modulo bias. Math.random() is not cryptographically
 * secure and its state is recoverable from observed outputs.
 * @param max - Exclusive upper bound (must be > 0)
 * @returns Random integer in [0, max)
 */
function secureRandomInt(max: number): number {
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  let x: number;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % max;
}

export function usePasswordGenerator(): UsePasswordGeneratorReturn {
  const [password, setPassword] = useState<string>('');
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSpecialChars: true,
    selectedSpecialChars: new Set(ALL_SPECIAL_CHARS.split('')),
  });

  const setLength = useCallback((length: number) => {
    const clampedLength = Math.max(4, Math.min(128, length));
    setOptions(prev => ({ ...prev, length: clampedLength }));
  }, []);

  const setIncludeUppercase = useCallback((include: boolean) => {
    setOptions(prev => ({ ...prev, includeUppercase: include }));
  }, []);

  const setIncludeLowercase = useCallback((include: boolean) => {
    setOptions(prev => ({ ...prev, includeLowercase: include }));
  }, []);

  const setIncludeNumbers = useCallback((include: boolean) => {
    setOptions(prev => ({ ...prev, includeNumbers: include }));
  }, []);

  const setIncludeSpecialChars = useCallback((include: boolean) => {
    setOptions(prev => ({ ...prev, includeSpecialChars: include }));
  }, []);

  const toggleSpecialChar = useCallback((char: string) => {
    setOptions(prev => {
      const newSet = new Set(prev.selectedSpecialChars);
      if (newSet.has(char)) {
        newSet.delete(char);
      } else {
        newSet.add(char);
      }
      return { ...prev, selectedSpecialChars: newSet };
    });
  }, []);

  const selectAllSpecialChars = useCallback(() => {
    setOptions(prev => ({
      ...prev,
      selectedSpecialChars: new Set(ALL_SPECIAL_CHARS.split('')),
    }));
  }, []);

  const selectNoSpecialChars = useCallback(() => {
    setOptions(prev => ({
      ...prev,
      selectedSpecialChars: new Set<string>(),
    }));
  }, []);

  const selectCommonSpecialChars = useCallback(() => {
    setOptions(prev => ({
      ...prev,
      selectedSpecialChars: new Set(COMMON_SPECIAL_CHARS.split('')),
    }));
  }, []);

  const generatePassword = useCallback(() => {
    let charset = '';
    const requiredChars: string[] = [];

    if (options.includeUppercase) {
      charset += UPPERCASE_CHARS;
      requiredChars.push(UPPERCASE_CHARS[secureRandomInt(UPPERCASE_CHARS.length)]);
    }
    if (options.includeLowercase) {
      charset += LOWERCASE_CHARS;
      requiredChars.push(LOWERCASE_CHARS[secureRandomInt(LOWERCASE_CHARS.length)]);
    }
    if (options.includeNumbers) {
      charset += NUMBER_CHARS;
      requiredChars.push(NUMBER_CHARS[secureRandomInt(NUMBER_CHARS.length)]);
    }
    if (options.includeSpecialChars && options.selectedSpecialChars.size > 0) {
      const specialChars = Array.from(options.selectedSpecialChars).join('');
      charset += specialChars;
      requiredChars.push(specialChars[secureRandomInt(specialChars.length)]);
    }

    if (charset === '') {
      setPassword('');
      return;
    }

    const remainingLength = Math.max(0, options.length - requiredChars.length);
    const randomChars: string[] = [];

    for (let i = 0; i < remainingLength; i++) {
      const randomIndex = secureRandomInt(charset.length);
      randomChars.push(charset[randomIndex]);
    }

    const allChars = [...requiredChars, ...randomChars];
    for (let i = allChars.length - 1; i > 0; i--) {
      const j = secureRandomInt(i + 1);
      [allChars[i], allChars[j]] = [allChars[j], allChars[i]];
    }

    setPassword(allChars.join(''));
  }, [options]);

  const copyToClipboard = useCallback(async (): Promise<boolean> => {
    if (!password) return false;
    try {
      await navigator.clipboard.writeText(password);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  }, [password]);

  const getPasswordStrength = useCallback((): 'weak' | 'medium' | 'strong' | 'very-strong' => {
    if (!password) return 'weak';

    let score = 0;

    // Length score
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (password.length >= 24) score += 1;

    // Character variety score
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score += 1;

    if (score <= 3) return 'weak';
    if (score <= 5) return 'medium';
    if (score <= 7) return 'strong';
    return 'very-strong';
  }, [password]);

  return {
    password,
    options,
    setLength,
    setIncludeUppercase,
    setIncludeLowercase,
    setIncludeNumbers,
    setIncludeSpecialChars,
    toggleSpecialChar,
    selectAllSpecialChars,
    selectNoSpecialChars,
    selectCommonSpecialChars,
    generatePassword,
    copyToClipboard,
    getPasswordStrength,
  };
}

