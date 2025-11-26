import { Flex, Heading, Text, Card, Badge } from '@radix-ui/themes';

function Tools(): JSX.Element {
  return (
    <Flex direction="column" gap="6" py="6">
      <Flex direction="column" gap="2">
        <Heading size="8">Available Tools</Heading>
        <Text size="4" color="gray">
          Explore the tools and utilities available in this application
        </Text>
      </Flex>

      <Flex direction="column" gap="4">
        <Card>
          <Flex direction="column" gap="3">
            <Flex justify="between" align="center">
              <Heading size="5">Example Tool 1</Heading>
              <Badge color="green">Active</Badge>
            </Flex>
            <Text>
              This is a placeholder for your first tool. Replace this with actual functionality.
            </Text>
          </Flex>
        </Card>

        <Card>
          <Flex direction="column" gap="3">
            <Flex justify="between" align="center">
              <Heading size="5">Example Tool 2</Heading>
              <Badge color="blue">Coming Soon</Badge>
            </Flex>
            <Text>
              This is a placeholder for your second tool. Add your custom tools here.
            </Text>
          </Flex>
        </Card>

        <Card>
          <Flex direction="column" gap="3">
            <Flex justify="between" align="center">
              <Heading size="5">Example Tool 3</Heading>
              <Badge color="orange">In Development</Badge>
            </Flex>
            <Text>
              This is a placeholder for your third tool. Build amazing things!
            </Text>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  );
}

export default Tools;

