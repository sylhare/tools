import { Flex, Heading, Text, Card, Button } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

interface ToolCardProps {
  title: string;
  description: string;
  icon: string;
  link: string;
}

function ToolCard({ title, description, icon, link }: ToolCardProps): JSX.Element {
  return (
    <Card style={{ flex: '0 0 calc(50% - var(--space-2))', minWidth: '300px' }}>
      <Flex direction="column" gap="3" p="2">
        <Heading size="6">{icon} {title}</Heading>
        <Text color="gray">{description}</Text>
        <Link to={link}>
          <Button variant="soft" style={{ marginTop: 'auto', width: '100%' }}>
            Open Tool →
          </Button>
        </Link>
      </Flex>
    </Card>
  );
}

export default ToolCard;

