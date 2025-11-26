import { Flex, Heading, Text, Card, Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

function Home(): JSX.Element {
  return (
    <Flex direction="column" gap="6" py="6">
      <Flex direction="column" gap="2">
        <Heading size="8">Welcome to Tools</Heading>
        <Text size="4" color="gray">
          A modern TypeScript-based multi-page React application built with Vite and Radix UI
        </Text>
      </Flex>

      <Flex gap="4" wrap="wrap">
        <Card style={{ flex: '1', minWidth: '300px' }}>
          <Flex direction="column" gap="3">
            <Heading size="5">🚀 Fast Development</Heading>
            <Text>Built with Vite for lightning-fast hot module replacement and optimized builds.</Text>
          </Flex>
        </Card>

        <Card style={{ flex: '1', minWidth: '300px' }}>
          <Flex direction="column" gap="3">
            <Heading size="5">✨ Modern UI</Heading>
            <Text>Powered by Radix UI themes for accessible and beautiful components.</Text>
          </Flex>
        </Card>

        <Card style={{ flex: '1', minWidth: '300px' }}>
          <Flex direction="column" gap="3">
            <Heading size="5">🧪 Well Tested</Heading>
            <Text>Comprehensive testing with Vitest for unit tests and Playwright for E2E.</Text>
          </Flex>
        </Card>
      </Flex>

      <Flex gap="3" mt="4">
        <Button asChild size="3">
          <Link to="/about">Learn More</Link>
        </Button>
        <Button asChild variant="soft" size="3">
          <Link to="/tools">View Tools</Link>
        </Button>
      </Flex>
    </Flex>
  );
}

export default Home;

