import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, Suspense, lazy } from 'react';
import Layout from './components/Layout';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const Home = lazy(() => import('./pages/Home'));
const Archive = lazy(() => import('./pages/Archive'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Network = lazy(() => import('./pages/Network'));
import BootSequence from './components/BootSequence';
import CustomCursor from './components/CustomCursor';
import TabTitleUpdater from './components/TabTitleUpdater';
import NoiseOverlay from './components/NoiseOverlay';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="flex h-screen items-center justify-center font-mono text-cyber-cyan">Loading...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/network" element={<Network />} />
        </Routes>
      </Suspense>
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
      <Analytics />
      <SpeedInsights />
    </>
  );
}
