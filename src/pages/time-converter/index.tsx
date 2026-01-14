import { Flex, Heading, Text, Card, TextField, Button, Grid } from '@radix-ui/themes';
import { useConverter } from '../../utils/conversions';
import { timeConverter, selectedUnits, unitConfig } from './config';

function TimeConverter(): JSX.Element {
  const { values, handlers, clearAll } = useConverter({
    converter: timeConverter,
    units: selectedUnits,
    defaultPrecision: 2,
  });

  return (
    <Flex direction="column" gap="6" py="6">
      <Flex direction="column" gap="2">
        <Heading size="8">Time Converter</Heading>
        <Text size="4" color="gray">
          Convert time between seconds, minutes, hours, days, and more
        </Text>
      </Flex>

      <Card style={{ maxWidth: '800px' }}>
        <Flex direction="column" gap="5" p="4">
          <Grid columns="2" gap="4">
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
            <Text size="2" color="gray">• 1 minute = 60 seconds</Text>
            <Text size="2" color="gray">• 1 hour = 60 minutes</Text>
            <Text size="2" color="gray">• 1 day = 24 hours</Text>
            <Text size="2" color="gray">• 1 week = 7 days</Text>
            <Text size="2" color="gray">• 1 month ≈ 30.44 days</Text>
            <Text size="2" color="gray">• 1 year ≈ 365.25 days</Text>
            <Text size="2" color="gray">• 1 year ≈ 12 months</Text>
            <Text size="2" color="gray">• 1 year ≈ 52.18 weeks</Text>
          </Grid>
        </Flex>
      </Card>

      <Card style={{ maxWidth: '800px' }} variant="surface">
        <Flex direction="column" gap="2" p="3">
          <Text size="2" weight="bold">Time Facts</Text>
          <Flex direction="column" gap="1">
            <Text size="2" color="gray">
              💡 Months use an average of 30.44 days (365.25 ÷ 12)
            </Text>
            <Text size="2" color="gray">
              💡 Years account for leap years (365.25 days average)
            </Text>
            <Text size="2" color="gray">
              💡 1 billion seconds ≈ 31.7 years
            </Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}

export default TimeConverter;

