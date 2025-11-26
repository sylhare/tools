import { Flex, Heading, Text, Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

function NotFound(): JSX.Element {
  return (
    <Flex direction="column" gap="6" py="9" align="center">
      <Flex direction="column" gap="2" align="center">
        <Heading size="9">404</Heading>
        <Heading size="6">Page Not Found</Heading>
        <Text size="4" color="gray">
          The page you are looking for does not exist.
        </Text>
      </Flex>

      <Button asChild size="3">
        <Link to="/">Go Home</Link>
      </Button>
    </Flex>
  );
}

export default NotFound;

