import { Flex, Heading, Text, Card, TextField, Button, Grid } from '@radix-ui/themes';
import { useConverter } from '../../utils/conversions';
import {
  measurementConverter,
  selectedUnits,
  metricConfig,
  imperialConfig,
} from './config';

function MeasurementConverter(): JSX.Element {
  const { values, handlers, clearAll } = useConverter({
    converter: measurementConverter,
    units: selectedUnits,
    defaultPrecision: 2,
  });

  return (
    <Flex direction="column" gap="6" py="6">
      <Flex direction="column" gap="2">
        <Heading size="8">Length Converter</Heading>
        <Text size="4" color="gray">
          Convert lengths between metric and imperial units
        </Text>
      </Flex>

      <Card style={{ maxWidth: '800px' }}>
        <Flex direction="column" gap="5" p="4">
          <Grid columns="2" gap="6">
            {/* Metric System */}
            <Flex direction="column" gap="4">
              <Text size="4" weight="bold" color="blue">
                Metric System
              </Text>
              {metricConfig.map(config => {
                const unit = selectedUnits.find(u => u.id === config.id);
                if (!unit) return null;

                return (
                  <Flex key={config.id} direction="column" gap="2">
                    <Text size="2" weight="medium">
                      {config.label} ({unit.symbol})
                    </Text>
                    <TextField.Root
                      type="number"
                      placeholder={config.placeholder}
                      value={values[config.id] || ''}
                      onChange={handlers[config.id]}
                      size="3"
                    />
                  </Flex>
                );
              })}
            </Flex>

            {/* Imperial System */}
            <Flex direction="column" gap="4">
              <Text size="4" weight="bold" color="orange">
                Imperial System
              </Text>
              {imperialConfig.map(config => {
                const unit = selectedUnits.find(u => u.id === config.id);
                if (!unit) return null;

                return (
                  <Flex key={config.id} direction="column" gap="2">
                    <Text size="2" weight="medium">
                      {config.label} ({unit.symbol})
                    </Text>
                    <TextField.Root
                      type="number"
                      placeholder={config.placeholder}
                      value={values[config.id] || ''}
                      onChange={handlers[config.id]}
                      size="3"
                    />
                  </Flex>
                );
              })}
            </Flex>
          </Grid>

          <Flex justify="end" gap="2">
            <Button
              variant="soft"
              onClick={clearAll}
              size="2"
            >
              Clear All
            </Button>
          </Flex>
        </Flex>
      </Card>

      <Card style={{ maxWidth: '800px' }} variant="surface">
        <Flex direction="column" gap="2" p="3">
          <Text size="2" weight="bold">Quick Reference</Text>
          <Grid columns="2" gap="2">
            <Text size="2" color="gray">• 1 inch = 2.54 cm</Text>
            <Text size="2" color="gray">• 1 meter = 100 cm</Text>
            <Text size="2" color="gray">• 1 foot = 12 inches</Text>
            <Text size="2" color="gray">• 1 kilometer = 1000 m</Text>
            <Text size="2" color="gray">• 1 yard = 3 feet</Text>
            <Text size="2" color="gray">• 1 mile = 1.609 km</Text>
            <Text size="2" color="gray">• 1 foot ≈ 30.48 cm</Text>
            <Text size="2" color="gray">• 1 meter ≈ 3.28 feet</Text>
          </Grid>
        </Flex>
      </Card>

      <Card style={{ maxWidth: '800px' }} variant="surface">
        <Flex direction="column" gap="2" p="3">
          <Text size="2" weight="bold">Size Reference</Text>
          <Flex direction="column" gap="1">
            <Text size="2" color="gray">
              📏 Credit card: 8.5 cm (3.37 in)
            </Text>
            <Text size="2" color="gray">
              📱 Standard phone: ~15 cm (6 in)
            </Text>
            <Text size="2" color="gray">
              📄 A4 paper: 29.7 cm (11.7 in) height
            </Text>
            <Text size="2" color="gray">
              🚗 Parking space: ~5 m (16.4 ft) length
            </Text>
            <Text size="2" color="gray">
              🏀 Basketball court: 28 m (94 ft)
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}

export default MeasurementConverter;

