import { Flex, Heading, Text, Card, TextField, Button, Grid } from '@radix-ui/themes';
import { useConverter } from '../../utils/conversions';
import { weightConverter, selectedUnits, unitConfig } from './config';

function WeightConverter(): JSX.Element {
  const { values, handlers, clearAll } = useConverter({
    converter: weightConverter,
    units: selectedUnits,
    defaultPrecision: 2,
  });

  return (
    <Flex direction="column" gap="6" py="6">
      <Flex direction="column" gap="2">
        <Heading size="8">Weight Converter</Heading>
        <Text size="4" color="gray">
          Convert weights between metric and imperial units
        </Text>
      </Flex>

      <Card style={{ maxWidth: '800px' }}>
        <Flex direction="column" gap="5" p="4">
          <Grid columns={{ initial: '1', sm: '2' }} gap="4">
            {unitConfig.map(config => {
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
            <Text size="2" color="gray">• 1 kg = 1000 g</Text>
            <Text size="2" color="gray">• 1 lb = 16 oz</Text>
            <Text size="2" color="gray">• 1 lb ≈ 453.6 g</Text>
            <Text size="2" color="gray">• 1 oz ≈ 28.35 g</Text>
            <Text size="2" color="gray">• 1 kg ≈ 2.205 lb</Text>
            <Text size="2" color="gray">• 1 kg ≈ 35.27 oz</Text>
          </Grid>
        </Flex>
      </Card>
    </Flex>
  );
}

export default WeightConverter;
