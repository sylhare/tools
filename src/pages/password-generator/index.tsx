import { Flex, Heading, Text, Card, TextField, Button, Checkbox, Slider, Box } from '@radix-ui/themes';
import { usePasswordGenerator, ALL_SPECIAL_CHARS, COMMON_SPECIAL_CHARS } from './usePasswordGenerator';
import { useEffect, useState } from 'react';

function PasswordGenerator(): JSX.Element {
  const {
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
  } = usePasswordGenerator();

  const [specialCharsExpanded, setSpecialCharsExpanded] = useState(false);

  // Generate initial password on mount
  useEffect(() => {
    generatePassword();
  }, []);

  const strength = getPasswordStrength();

  const strengthColors: Record<typeof strength, string> = {
    'weak': 'var(--red-9)',
    'medium': 'var(--orange-9)',
    'strong': 'var(--green-9)',
    'very-strong': 'var(--teal-9)',
  };

  const strengthLabels: Record<typeof strength, string> = {
    'weak': 'Weak',
    'medium': 'Medium',
    'strong': 'Strong',
    'very-strong': 'Very Strong',
  };

  const handleCopy = async (): Promise<void> => {
    await copyToClipboard();
  };

  // Check if at least one character type is selected
  const hasAtLeastOneOption =
    options.includeUppercase ||
    options.includeLowercase ||
    options.includeNumbers ||
    options.includeSpecialChars;

  return (
    <Flex direction="column" gap="6" py="6">
      <Flex direction="column" gap="2">
        <Heading size="8">Password Generator</Heading>
        <Text size="4" color="gray">
          Generate secure passwords with customizable options
        </Text>
      </Flex>

      <Card style={{ maxWidth: '600px' }}>
        <Flex direction="column" gap="5" p="4">
          {/* Password Display */}
          <Flex direction="column" gap="2">
            <Text size="2" weight="bold">Generated Password</Text>
            <Flex gap="2">
              <TextField.Root
                data-testid="password-output"
                type="text"
                value={password}
                readOnly
                size="3"
                style={{ flex: 1, fontFamily: 'monospace' }}
              />
              <Button
                size="3"
                variant="soft"
                onClick={handleCopy}
                disabled={!password}
                data-testid="copy-button"
              >
                Copy
              </Button>
            </Flex>
          </Flex>

          {/* Strength Indicator */}
          {password && (
            <Flex direction="column" gap="2">
              <Flex justify="between" align="center">
                <Text size="2" weight="bold">Password Strength</Text>
                <Text
                  size="2"
                  weight="bold"
                  data-testid="strength-label"
                  style={{ color: strengthColors[strength] }}
                >
                  {strengthLabels[strength]}
                </Text>
              </Flex>
              <div
                data-testid="strength-bar"
                style={{
                  width: '100%',
                  height: '8px',
                  backgroundColor: 'var(--gray-4)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: { weak: '25%', medium: '50%', strong: '75%', 'very-strong': '100%' }[strength],
                    height: '100%',
                    backgroundColor: strengthColors[strength],
                    transition: 'width 0.3s ease, background-color 0.3s ease',
                  }}
                />
              </div>
            </Flex>
          )}

          {/* Length Slider */}
          <Flex direction="column" gap="2">
            <Flex justify="between" align="center">
              <Text size="2" weight="bold">Password Length</Text>
              <Text size="2" color="gray" data-testid="length-display">{options.length} characters</Text>
            </Flex>
            <Slider
              data-testid="length-slider"
              value={[options.length]}
              onValueChange={value => setLength(value[0])}
              min={4}
              max={128}
              step={1}
            />
          </Flex>

          {/* Character Options */}
          <Flex direction="column" gap="3">
            <Text size="2" weight="bold">Character Types</Text>

            <Flex align="center" gap="2">
              <Checkbox
                data-testid="uppercase-checkbox"
                checked={options.includeUppercase}
                onCheckedChange={checked => setIncludeUppercase(checked === true)}
              />
              <Text size="2">Uppercase Letters (A-Z)</Text>
            </Flex>

            <Flex align="center" gap="2">
              <Checkbox
                data-testid="lowercase-checkbox"
                checked={options.includeLowercase}
                onCheckedChange={checked => setIncludeLowercase(checked === true)}
              />
              <Text size="2">Lowercase Letters (a-z)</Text>
            </Flex>

            <Flex align="center" gap="2">
              <Checkbox
                data-testid="numbers-checkbox"
                checked={options.includeNumbers}
                onCheckedChange={checked => setIncludeNumbers(checked === true)}
              />
              <Text size="2">Numbers (0-9)</Text>
            </Flex>

            <Flex align="center" gap="2">
              <Checkbox
                data-testid="special-checkbox"
                checked={options.includeSpecialChars}
                onCheckedChange={checked => setIncludeSpecialChars(checked === true)}
              />
              <Text size="2">Special Characters (!@#$%^&*...)</Text>
            </Flex>

            {/* Collapsible Special Character Selector */}
            {options.includeSpecialChars && (
              <Box pl="6">
                <Flex
                  align="center"
                  gap="1"
                  style={{ cursor: 'pointer', userSelect: 'none' }}
                  onClick={() => setSpecialCharsExpanded(!specialCharsExpanded)}
                  data-testid="special-chars-toggle"
                >
                  <Text size="2" color="gray" style={{ fontFamily: 'monospace', width: '12px' }}>
                    {specialCharsExpanded ? '▼' : '▶'}
                  </Text>
                  <Text size="2" color="gray">
                    Customize characters ({options.selectedSpecialChars.size} selected)
                  </Text>
                </Flex>

                {specialCharsExpanded && (
                  <Box mt="3" data-testid="special-chars-panel">
                    {/* Quick selection buttons */}
                    <Flex gap="2" mb="3">
                      <Button
                        size="1"
                        variant="soft"
                        onClick={selectAllSpecialChars}
                        data-testid="special-chars-all"
                      >
                        All
                      </Button>
                      <Button
                        size="1"
                        variant="soft"
                        onClick={selectNoSpecialChars}
                        data-testid="special-chars-none"
                      >
                        None
                      </Button>
                      <Button
                        size="1"
                        variant="soft"
                        onClick={selectCommonSpecialChars}
                        data-testid="special-chars-common"
                        title={`Common: ${COMMON_SPECIAL_CHARS}`}
                      >
                        Common ({COMMON_SPECIAL_CHARS})
                      </Button>
                    </Flex>

                    {/* Individual character checkboxes */}
                    <Flex wrap="wrap" gap="2">
                      {ALL_SPECIAL_CHARS.split('').map(char => (
                        <Flex
                          key={char}
                          align="center"
                          gap="1"
                          style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            backgroundColor: options.selectedSpecialChars.has(char)
                              ? 'var(--accent-3)'
                              : 'var(--gray-3)',
                            cursor: 'pointer',
                            minWidth: '40px',
                            justifyContent: 'center',
                          }}
                          onClick={() => toggleSpecialChar(char)}
                          data-testid={`special-char-${char.charCodeAt(0)}`}
                        >
                          <Checkbox
                            size="1"
                            checked={options.selectedSpecialChars.has(char)}
                            onCheckedChange={() => toggleSpecialChar(char)}
                          />
                          <Text size="2" weight="medium" style={{ fontFamily: 'monospace' }}>
                            {char}
                          </Text>
                        </Flex>
                      ))}
                    </Flex>
                  </Box>
                )}
              </Box>
            )}
          </Flex>

          {!hasAtLeastOneOption && (
            <Card style={{ backgroundColor: 'var(--red-3)', borderColor: 'var(--red-6)' }}>
              <Text size="2" color="red" style={{ padding: '8px' }}>
                Please select at least one character type
              </Text>
            </Card>
          )}

          {/* Generate Button */}
          <Button
            data-testid="generate-button"
            size="3"
            onClick={generatePassword}
            disabled={!hasAtLeastOneOption}
          >
            Generate New Password
          </Button>
        </Flex>
      </Card>

      <Card style={{ maxWidth: '600px' }} variant="surface">
        <Flex direction="column" gap="2" p="3">
          <Text size="2" weight="bold">Password Tips</Text>
          <Flex direction="column" gap="1">
            <Text size="2" color="gray">• Use at least 12 characters for better security</Text>
            <Text size="2" color="gray">• Include a mix of uppercase, lowercase, numbers, and symbols</Text>
            <Text size="2" color="gray">• Avoid using personal information in passwords</Text>
            <Text size="2" color="gray">• Use a unique password for each account</Text>
            <Text size="2" color="gray">• Consider using a password manager</Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}

export default PasswordGenerator;

