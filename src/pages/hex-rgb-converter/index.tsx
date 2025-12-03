import { Flex, Heading, Text, Card, TextField, Button } from '@radix-ui/themes';
import { useHexRgbConverter } from './useHexRgbConverter';

function HexRgbConverter(): JSX.Element {
  const {
    hex,
    r,
    g,
    b,
    displayHex,
    displayRgb,
    handleHexChange,
    handleRChange,
    handleGChange,
    handleBChange,
  } = useHexRgbConverter();

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const colorPreview = displayHex ? displayHex : '#000000';

  return (
    <Flex direction="column" gap="6" py="6">
      <Flex direction="column" gap="2">
        <Heading size="8">Hex to RGB Converter</Heading>
        <Text size="4" color="gray">
          Convert colors between Hexadecimal and RGB formats
        </Text>
      </Flex>

      <Card style={{ maxWidth: '600px' }}>
        <Flex direction="column" gap="5" p="4">
          <Flex direction="column" gap="2" align="center">
            <Text size="2" weight="bold">Color Preview</Text>
            <div
              data-testid="color-preview"
              style={{
                width: '100%',
                height: '80px',
                backgroundColor: colorPreview,
                borderRadius: '8px',
                border: '1px solid var(--gray-6)',
              }}
            />
          </Flex>

          <Flex direction="column" gap="2">
            <Text size="3" weight="bold">Hexadecimal</Text>
            <TextField.Root
              type="text"
              placeholder="Enter hex value (e.g., FF5733 or #FF5733)"
              value={hex}
              onChange={handleHexChange}
              size="3"
            />
            {displayHex && (
              <Flex align="center" gap="2">
                <Card style={{ flex: 1, padding: '8px 12px' }}>
                  <Text size="2" style={{ fontFamily: 'monospace' }}>
                    {displayHex}
                  </Text>
                </Card>
                <Button
                  size="2"
                  variant="soft"
                  onClick={() => copyToClipboard(displayHex)}
                >
                  Copy
                </Button>
              </Flex>
            )}
          </Flex>

          <Flex align="center" justify="center">
            <Text size="5" color="gray">⇄</Text>
          </Flex>

          <Flex direction="column" gap="2">
            <Text size="3" weight="bold">RGB Values</Text>
            <Flex gap="2">
              <Flex direction="column" gap="1" style={{ flex: 1 }}>
                <Text size="2" color="gray">Red</Text>
                <TextField.Root
                  type="number"
                  placeholder="0-255"
                  value={r}
                  onChange={handleRChange}
                  min="0"
                  max="255"
                  size="3"
                />
              </Flex>
              <Flex direction="column" gap="1" style={{ flex: 1 }}>
                <Text size="2" color="gray">Green</Text>
                <TextField.Root
                  type="number"
                  placeholder="0-255"
                  value={g}
                  onChange={handleGChange}
                  min="0"
                  max="255"
                  size="3"
                />
              </Flex>
              <Flex direction="column" gap="1" style={{ flex: 1 }}>
                <Text size="2" color="gray">Blue</Text>
                <TextField.Root
                  type="number"
                  placeholder="0-255"
                  value={b}
                  onChange={handleBChange}
                  min="0"
                  max="255"
                  size="3"
                />
              </Flex>
            </Flex>
            {displayRgb && (
              <Flex align="center" gap="2">
                <Card style={{ flex: 1, padding: '8px 12px' }}>
                  <Text size="2" style={{ fontFamily: 'monospace' }}>
                    {displayRgb}
                  </Text>
                </Card>
                <Button
                  size="2"
                  variant="soft"
                  onClick={() => copyToClipboard(displayRgb)}
                >
                  Copy
                </Button>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Card>

      <Card style={{ maxWidth: '600px' }} variant="surface">
        <Flex direction="column" gap="2" p="3">
          <Text size="2" weight="bold">Quick Examples</Text>
          <Flex direction="column" gap="1">
            <Text size="2" color="gray">• Red: #FF0000 = rgb(255, 0, 0)</Text>
            <Text size="2" color="gray">• Green: #00FF00 = rgb(0, 255, 0)</Text>
            <Text size="2" color="gray">• Blue: #0000FF = rgb(0, 0, 255)</Text>
            <Text size="2" color="gray">• White: #FFFFFF = rgb(255, 255, 255)</Text>
            <Text size="2" color="gray">• Black: #000000 = rgb(0, 0, 0)</Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}

export default HexRgbConverter;

