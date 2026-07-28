import type { JSX } from 'react';
import { Flex, Heading, Text, Card, TextField, Grid, Button } from '@radix-ui/themes';
import { useState, useEffect, useRef } from 'react';
import { usePhoneTextConverter, KEYPAD } from './usePhoneTextConverter';

const KEYPAD_LAYOUT: ({ key: string; letters: string } | null)[] = [
  { key: '1', letters: '' },
  ...Object.entries(KEYPAD).map(([key, letters]) => ({ key, letters })),
  null,
  { key: '0', letters: 'SPACE' },
  null,
];

function PhoneTextConverter(): JSX.Element {
  const { text, phone, breakdown, handleTextChange, handlePhoneChange, appendDigit, clear } = usePhoneTextConverter();
  const [copied, setCopied] = useState(false);
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(copyTimerRef.current), []);

  const strippedPhone = phone.replace(/\s+/g, '');

  const handleCopy = async (): Promise<void> => {
    if (!strippedPhone) return;
    await navigator.clipboard.writeText(strippedPhone);
    setCopied(true);
    clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Flex direction="column" gap="6" py="6">
      <Flex direction="column" gap="2">
        <Heading size="8">Phone Keypad Converter</Heading>
        <Text size="4" color="gray">
          Convert text to phone keypad sequences and back
        </Text>
      </Flex>

      <Card style={{ maxWidth: '600px' }}>
        <Flex direction="column" gap="5" p="4">
          <Flex direction="column" gap="2">
            <Text size="3" weight="bold">Text</Text>
            <TextField.Root
              type="text"
              placeholder="Enter text (e.g., HELLO)"
              value={text}
              onChange={handleTextChange}
              size="3"
            />
          </Flex>

          <Flex align="center" justify="center">
            <Text size="5" color="gray">⇄</Text>
          </Flex>

          <Flex direction="column" gap="2">
            <Text size="3" weight="bold">Phone Sequences</Text>
            <TextField.Root
              type="text"
              placeholder="Enter sequences (e.g., 44 33 555 555 666)"
              value={phone}
              onChange={handlePhoneChange}
              size="3"
            />
          </Flex>

          <Flex gap="2">
            <Button
              variant="soft"
              style={{ width: '100%' }}
              onClick={handleCopy}
              disabled={!strippedPhone}
              data-testid="copy-phone-button"
            >
              {copied ? '✓ Copied' : '⧉ Copy without spaces'}
            </Button>
            <Button
              variant="soft"
              style={{ width: '100%' }}
              onClick={clear}
              disabled={!text && !phone}
              data-testid="clear-button"
            >
              ✕ Clear
            </Button>
          </Flex>

          {breakdown.length > 0 && (
            <Flex direction="column" gap="2">
              <Text size="3" weight="bold">Breakdown</Text>
              <Flex gap="2" style={{ flexWrap: 'wrap' }}>
                {breakdown.map((mapping, i) => (
                  <Card key={`${i}-${mapping.char}`} style={{ padding: '6px 10px' }}>
                    <Flex direction="column" align="center" gap="1">
                      <Text size="3" weight="bold">
                        {mapping.char === ' ' ? '⎵' : mapping.char}
                      </Text>
                      <Text size="2" color="gray" style={{ fontFamily: 'monospace' }}>
                        {mapping.sequence}
                      </Text>
                    </Flex>
                  </Card>
                ))}
              </Flex>
            </Flex>
          )}
        </Flex>
      </Card>

      <Card style={{ maxWidth: '600px' }} variant="surface">
        <Flex direction="column" gap="3" p="3">
          <Text size="2" weight="bold">Keypad</Text>
          <Grid columns="3" gap="2" style={{ width: '100%' }}>
            {KEYPAD_LAYOUT.map((item, i) =>
              item ? (
                <Card
                  key={item.key}
                  style={{ padding: '12px 8px', cursor: 'pointer' }}
                  onClick={() => appendDigit(item.key)}
                  data-testid={`keypad-${item.key}`}
                >
                  <Flex direction="column" align="center" gap="1">
                    <Text size="6" weight="bold">{item.key}</Text>
                    <Text size="2" color="gray">{item.letters || ' '}</Text>
                  </Flex>
                </Card>
              ) : (
                <div key={`empty-${i}`} />
              )
            )}
          </Grid>
          <Flex direction="column" gap="1" pb="2">
            <Text size="2" color="gray">Click a key to append it to the sequence</Text>
            <Text size="2" color="gray">Press a key once for the 1st letter (e.g., 2 = A)</Text>
            <Text size="2" color="gray">Press twice for the 2nd letter (e.g., 22 = B)</Text>
            <Text size="2" color="gray">Press 0 for a space</Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}

export default PhoneTextConverter;
