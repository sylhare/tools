import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@radix-ui/themes';
import Layout from './components/Layout';
import Home from './pages/Home';
import TemperatureConverter from './pages/temperature-converter';
import HexRgbConverter from './pages/hex-rgb-converter';
import NotFound from './pages/NotFound';

function App(): JSX.Element {
  return (
    <Box minHeight="100vh">
      <Container size="4">
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/temperature-converter" element={<TemperatureConverter />} />
            <Route path="/hex-rgb-converter" element={<HexRgbConverter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Container>
    </Box>
  );
}

export default App;

