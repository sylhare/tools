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
    {
      title: 'Hex to RGB Converter',
      description: 'Convert colors between Hexadecimal and RGB formats with live preview.',
      icon: '🎨',
      link: '/hex-rgb-converter',
    },
    {
      title: 'Volume Converter',
      description: 'Convert volumes between metric and imperial units for cooking and more.',
      icon: '🥛',
      link: '/volume-converter',
    },
    {
      title: 'Length Converter',
      description: 'Convert lengths between metric and imperial measurement systems.',
      icon: '📏',
      link: '/measurement-converter',
    },
    {
      title: 'Password Generator',
      description: 'Generate secure passwords with customizable options and strength indicator.',
      icon: '🔐',
      link: '/password-generator',
    },
    {
      title: 'Badminton Manager',
      description: 'Manage your badminton games, players, and tournaments.',
      icon: '🏸',
      link: '/badminton-manager',
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
        {tools.map(tool => (
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

