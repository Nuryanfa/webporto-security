import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import useMotionPreference from './utils/useMotionPreference';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const Home = lazy(() => import('./pages/Home'));
const Archive = lazy(() => import('./pages/Archive'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Network = lazy(() => import('./pages/Network'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Overview = lazy(() => import('./pages/Overview'));
import TabTitleUpdater from './components/TabTitleUpdater';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Suspense fallback={<div role="status" className="flex h-screen items-center justify-center font-mono text-cyber-cyan">Loading...</div>}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/network" element={<Network />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}

export default function App() {
  const reduced = useMotionPreference();
  return (
    <MotionConfig reducedMotion={reduced ? 'always' : 'never'}>
      <Router>
        <TabTitleUpdater />
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </Router>
      <Analytics />
      <SpeedInsights />
    </MotionConfig>
  );
}
