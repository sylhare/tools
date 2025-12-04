import { Flex, Heading, Text, Card, TextField } from '@radix-ui/themes';
import { useConverter } from '../../utils/conversions';
import { temperatureConverter, selectedUnits } from './config';

function TemperatureConverter(): JSX.Element {
  const { values, handlers } = useConverter({
    converter: temperatureConverter,
    units: selectedUnits,
    defaultPrecision: 2,
  });

  const celsius = values.celsius || '';
  const fahrenheit = values.fahrenheit || '';
  const handleCelsiusChange = handlers.celsius;
  const handleFahrenheitChange = handlers.fahrenheit;

  return (
    <Flex direction="column" gap="6" py="6">
      <Flex direction="column" gap="2">
        <Heading size="8">Temperature Converter</Heading>
        <Text size="4" color="gray">
          Convert temperatures between Celsius and Fahrenheit
        </Text>
      </Flex>

      <Card style={{ maxWidth: '600px' }}>
        <Flex direction="column" gap="5" p="4">
          <Flex direction="column" gap="2">
            <Text size="3" weight="bold">Celsius (°C)</Text>
            <TextField.Root
              type="number"
              placeholder="Enter temperature in Celsius"
              value={celsius}
              onChange={handleCelsiusChange}
              size="3"
            />
          </Flex>

          <Flex align="center" justify="center">
            <Text size="5" color="gray">⇄</Text>
          </Flex>

          <Flex direction="column" gap="2">
            <Text size="3" weight="bold">Fahrenheit (°F)</Text>
            <TextField.Root
              type="number"
              placeholder="Enter temperature in Fahrenheit"
              value={fahrenheit}
              onChange={handleFahrenheitChange}
              size="3"
            />
          </Flex>
        </Flex>
      </Card>

      <Card style={{ maxWidth: '600px' }} variant="surface">
        <Flex direction="column" gap="2" p="3">
          <Text size="2" weight="bold">Quick Reference</Text>
          <Flex direction="column" gap="1">
            <Text size="2" color="gray">• Water freezes at 0°C (32°F)</Text>
            <Text size="2" color="gray">• Room temperature is about 20°C (68°F)</Text>
            <Text size="2" color="gray">• Body temperature is 37°C (98.6°F)</Text>
            <Text size="2" color="gray">• Water boils at 100°C (212°F)</Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}

export default TemperatureConverter;

