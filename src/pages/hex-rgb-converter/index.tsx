import { useState } from 'react';
import { Flex, Heading, Text, Card, TextField, Button } from '@radix-ui/themes';
import { useHexRgbConverter } from './useHexRgbConverter';

interface Shade {
  hex: string;
  isBase: boolean;
}

function generateShades(r: number, g: number, b: number): Shade[] {
  const steps = [-80, -60, -40, -20, 0, 20, 40, 60, 80];
  return steps.map(step => {
    let nr: number, ng: number, nb: number;
    if (step < 0) {
      const factor = 1 + step / 100;
      nr = Math.round(r * factor);
      ng = Math.round(g * factor);
      nb = Math.round(b * factor);
    } else if (step > 0) {
      const factor = step / 100;
      nr = Math.round(r + (255 - r) * factor);
      ng = Math.round(g + (255 - g) * factor);
      nb = Math.round(b + (255 - b) * factor);
    } else {
      nr = r; ng = g; nb = b;
    }
    const hex = `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
    return { hex, isBase: step === 0 };
  });
}

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
    hexToRgb,
  } = useHexRgbConverter();

  const [copiedShade, setCopiedShade] = useState<string | null>(null);

  const copyToClipboard = async (text: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyShade = async (shadeHex: string): Promise<void> => {
    await copyToClipboard(shadeHex);
    setCopiedShade(shadeHex);
    setTimeout(() => setCopiedShade(null), 1500);
  };

  const colorPreview = displayHex ? displayHex : '#000000';

  const rgbValues = displayHex ? hexToRgb(displayHex) : null;
  const shades: Shade[] = rgbValues ? generateShades(rgbValues.r, rgbValues.g, rgbValues.b) : [];

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
            {shades.length > 0 && (
              <Card style={{ padding: '12px', border: '1px solid var(--gray-5)' }}>
                <Flex direction="column" gap="2">
                  <Text size="2" weight="bold" color="gray">Color Shades</Text>
                  <Flex gap="1" wrap="wrap">
                    {shades.map(shade => (
                      <div
                        key={shade.hex}
                        onClick={() => copyShade(shade.hex)}
                        style={{ position: 'relative', cursor: 'pointer' }}
                        title={shade.hex}
                      >
                        <Flex
                          direction="column"
                          align="center"
                          gap="1"
                          style={{
                            padding: '4px',
                            borderRadius: '6px',
                            border: shade.isBase ? '2px solid var(--gray-8)' : '2px solid transparent',
                          }}
                        >
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              backgroundColor: shade.hex,
                              borderRadius: '4px',
                              border: '1px solid var(--gray-5)',
                            }}
                          />
                          <Text size="1" style={{ fontFamily: 'monospace', fontSize: '9px' }}>
                            {shade.hex}
                          </Text>
                        </Flex>
                        {copiedShade === shade.hex && (
                          <div
                            style={{
                              position: 'absolute',
                              bottom: '100%',
                              left: '50%',
                              transform: 'translateX(-50%)',
                              backgroundColor: 'var(--gray-12)',
                              color: 'var(--gray-1)',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '11px',
                              whiteSpace: 'nowrap',
                              pointerEvents: 'none',
                              zIndex: 10,
                              marginBottom: '4px',
                            }}
                          >
                            Copied!
                          </div>
                        )}
                      </div>
                    ))}
                  </Flex>
                </Flex>
              </Card>
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

