import { Flex, Heading, Text, Card, TextField, Grid } from '@radix-ui/themes';
import { usePhoneTextConverter, KEYPAD } from './usePhoneTextConverter';

function PhoneTextConverter(): JSX.Element {
  const { text, phone, breakdown, handleTextChange, handlePhoneChange } = usePhoneTextConverter();

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
        <Flex direction="column" gap="2" p="3">
          <Text size="2" weight="bold">Keypad Reference</Text>
          <Grid columns="4" gap="2">
            {Object.entries(KEYPAD).map(([key, letters]) => (
              <Card key={key} style={{ padding: '6px 8px' }}>
                <Flex direction="column" align="center" gap="1">
                  <Text size="4" weight="bold">{key}</Text>
                  <Text size="1" color="gray">{letters}</Text>
                </Flex>
              </Card>
            ))}
            <Card style={{ padding: '6px 8px' }}>
              <Flex direction="column" align="center" gap="1">
                <Text size="4" weight="bold">0</Text>
                <Text size="1" color="gray">SPACE</Text>
              </Flex>
            </Card>
          </Grid>
          <Flex direction="column" gap="1">
            <Text size="2" color="gray">• Press a key once for the 1st letter (e.g., 2 = A)</Text>
            <Text size="2" color="gray">• Press twice for the 2nd letter (e.g., 22 = B)</Text>
            <Text size="2" color="gray">• Separate each key group with a space (e.g., 2 22 = AB)</Text>
            <Text size="2" color="gray">• Press 0 for a space</Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}

export default PhoneTextConverter;
