import { Flex, Heading, Text, Card, TextField, Button, Grid } from '@radix-ui/themes';
import { useConverter } from '../../utils/conversions';
import { volumeConverter, selectedUnits, unitConfig } from './config';

function VolumeConverter(): JSX.Element {
  const { values, handlers, clearAll } = useConverter({
    converter: volumeConverter,
    units: selectedUnits,
    defaultPrecision: 1,
  });

  return (
    <Flex direction="column" gap="6" py="6">
      <Flex direction="column" gap="2">
        <Heading size="8">Volume Converter</Heading>
        <Text size="4" color="gray">
          Convert volumes between metric and imperial units
        </Text>
      </Flex>

      <Card style={{ maxWidth: '800px' }}>
        <Flex direction="column" gap="5" p="4">
          <Grid columns="2" gap="4">
            {unitConfig.map((config) => {
              const unit = selectedUnits.find(u => u.id === config.id);
              if (!unit) return null;

              return (
                <Flex key={config.id} direction="column" gap="2">
                  <Text size="3" weight="bold">
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
            <Text size="2" color="gray">• 1 cup = 236.6 mL</Text>
            <Text size="2" color="gray">• 1 cup = 8 fl oz</Text>
            <Text size="2" color="gray">• 1 liter = 1000 mL</Text>
            <Text size="2" color="gray">• 1 liter ≈ 4.23 cups</Text>
            <Text size="2" color="gray">• 1 tbsp = 3 tsp</Text>
            <Text size="2" color="gray">• 1 cup = 16 tbsp</Text>
            <Text size="2" color="gray">• 1 fl oz ≈ 29.6 mL</Text>
            <Text size="2" color="gray">• 1 tsp ≈ 4.9 mL</Text>
          </Grid>
        </Flex>
      </Card>

      <Card style={{ maxWidth: '800px' }} variant="surface">
        <Flex direction="column" gap="2" p="3">
          <Text size="2" weight="bold">Cooking Tips</Text>
          <Flex direction="column" gap="1">
            <Text size="2" color="gray">
              💡 For water and similar liquids: 1 mL = 1 gram
            </Text>
            <Text size="2" color="gray">
              💡 Use metric measurements for baking accuracy
            </Text>
            <Text size="2" color="gray">
              💡 US cups differ from metric cups (250 mL)
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}

export default VolumeConverter;



