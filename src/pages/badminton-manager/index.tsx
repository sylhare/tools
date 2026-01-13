import { Flex, Heading, Text, Card } from '@radix-ui/themes';

const BADMINTON_URL = 'https://sylhare.github.io/Badminton/';

function BadmintonManager(): JSX.Element {
  return (
    <Flex direction="column" gap="6" py="6">
      <Flex direction="column" gap="2">
        <Heading size="8">Badminton Manager</Heading>
        <Text size="4" color="gray">
          Manage your badminton games, players, and tournaments
        </Text>
      </Flex>

      <Card style={{ maxWidth: '100%', overflow: 'hidden' }}>
        <Flex direction="column" style={{ height: '70vh', minHeight: '500px' }}>
          <iframe
            src={BADMINTON_URL}
            title="Badminton Manager"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: 'var(--radius-3)',
            }}
            allow="fullscreen"
            data-testid="badminton-iframe"
          />
        </Flex>
      </Card>
    </Flex>
  );
}

export default BadmintonManager;

