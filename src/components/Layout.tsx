import { Box, Flex } from '@radix-ui/themes';
import Navigation from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps): JSX.Element {
  return (
    <Flex direction="column" gap="4" py="4">
      <Navigation />
      <Box>{children}</Box>
    </Flex>
  );
}

export default Layout;

