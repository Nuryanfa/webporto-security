import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Archive from './pages/Archive';
import Timeline from './pages/Timeline';
import Network from './pages/Network';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/network" element={<Network />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
