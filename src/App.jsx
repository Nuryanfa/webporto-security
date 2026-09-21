import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Suspense, lazy } from 'react';
import Layout from './components/Layout';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const Home = lazy(() => import('./pages/Home'));
const Archive = lazy(() => import('./pages/Archive'));
const Timeline = lazy(() => import('./pages/Timeline'));
const Network = lazy(() => import('./pages/Network'));
import TabTitleUpdater from './components/TabTitleUpdater';

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
  return (
    <>
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
