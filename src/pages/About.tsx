import { Flex, Heading, Text, Card, Code } from '@radix-ui/themes';

function About(): JSX.Element {
  return (
    <Flex direction="column" gap="6" py="6">
      <Flex direction="column" gap="2">
        <Heading size="8">About This Project</Heading>
        <Text size="4" color="gray">
          A comprehensive showcase of modern web development practices
        </Text>
      </Flex>

      <Card>
        <Flex direction="column" gap="3">
          <Heading size="5">Tech Stack</Heading>
          <Flex direction="column" gap="2">
            <Text>
              • <Code>React</Code> - UI library
            </Text>
            <Text>
              • <Code>TypeScript</Code> - Type safety
            </Text>
            <Text>
              • <Code>Vite</Code> - Build tool
            </Text>
            <Text>
              • <Code>Radix UI</Code> - Component library
            </Text>
            <Text>
              • <Code>Vitest</Code> - Unit testing
            </Text>
            <Text>
              • <Code>Playwright</Code> - E2E testing
            </Text>
            <Text>
              • <Code>pnpm</Code> - Package manager
            </Text>
          </Flex>
        </Flex>
      </Card>

      <Card>
        <Flex direction="column" gap="3">
          <Heading size="5">Features</Heading>
          <Flex direction="column" gap="2">
            <Text>✅ Multi-page routing with React Router</Text>
            <Text>✅ Modern and accessible UI components</Text>
            <Text>✅ Comprehensive test coverage</Text>
            <Text>✅ Continuous Integration with GitHub Actions</Text>
            <Text>✅ Automated deployment to GitHub Pages</Text>
            <Text>✅ ESLint for code quality</Text>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}

export default About;

