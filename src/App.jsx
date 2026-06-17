import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import Archive from './pages/Archive';
import Timeline from './pages/Timeline';
import Network from './pages/Network';
import BootSequence from './components/BootSequence';
import CustomCursor from './components/CustomCursor';
import TabTitleUpdater from './components/TabTitleUpdater';
import NoiseOverlay from './components/NoiseOverlay';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/network" element={<Network />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isBooting, setIsBooting] = useState(() => {
    return sessionStorage.getItem('rebooting') === 'true';
  });

  const handleBootComplete = () => {
    setIsBooting(false);
    sessionStorage.removeItem('rebooting');
  };

  return (
    <>
      <CustomCursor />
      <NoiseOverlay />
      {isBooting && <BootSequence onComplete={handleBootComplete} />}
      <Router>
        <TabTitleUpdater />
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
    </>
  );
}
