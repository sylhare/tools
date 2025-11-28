import { Flex, Heading, Text, Card } from '@radix-ui/themes';
import ToolCard from '../components/ToolCard';

function Home(): JSX.Element {
  const tools = [
    {
      title: 'Temperature Converter',
      description: 'Convert temperatures between Celsius and Fahrenheit with real-time updates.',
      icon: '🌡️',
      link: '/temperature-converter',
    },
  ];

  return (
    <Flex direction="column" gap="6" py="6">
      <Flex direction="column" gap="2">
        <Heading size="8">Available Tools</Heading>
        <Text size="4" color="gray">
          Select a tool to get started
        </Text>
      </Flex>

      <Flex gap="4" wrap="wrap">
        {tools.map((tool) => (
          <ToolCard key={tool.link} {...tool} />
        ))}
      </Flex>

      {tools.length === 0 && (
        <Card>
          <Flex direction="column" gap="3" p="4" align="center">
            <Text size="4" color="gray">
              No tools available yet. Check back soon!
            </Text>
          </Flex>
        </Card>
      )}
    </Flex>
  );
}

export default Home;

