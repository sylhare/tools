import { Link as RouterLink } from 'react-router-dom';
import { Flex, Link, Heading } from '@radix-ui/themes';

function Navigation(): JSX.Element {
  return (
    <Flex
      direction="row"
      justify="between"
      align="center"
      p="4"
      style={{
        borderBottom: '1px solid var(--gray-a5)',
      }}
    >
      <Heading size="6">
        <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Tools
        </RouterLink>
      </Heading>
      <Flex gap="4" align="center">
        <Link asChild>
          <RouterLink to="/">Home</RouterLink>
        </Link>
        <Link asChild>
          <RouterLink to="/about">About</RouterLink>
        </Link>
        <Link asChild>
          <RouterLink to="/tools">Tools</RouterLink>
        </Link>
      </Flex>
    </Flex>
  );
}

export default Navigation;

