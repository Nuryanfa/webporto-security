import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import RouteTransition from "./components/RouteTransition";
import Layout from "./components/Layout";
import TabTitleUpdater from "./components/TabTitleUpdater";
import Home from "./pages/Home";

// Home ships in the main bundle; every other episode loads on demand.
const pages = {
  archive: () => import("./pages/Archive"),
  timeline: () => import("./pages/Timeline"),
  network: () => import("./pages/Network"),
  overview: () => import("./pages/Overview"),
  notFound: () => import("./pages/NotFound"),
};
const Archive = lazy(pages.archive);
const Timeline = lazy(pages.timeline);
const Network = lazy(pages.network);
const Overview = lazy(pages.overview);
const NotFound = lazy(pages.notFound);

// Warm the route chunks once the browser is idle so the curtain never waits on the network.
function usePrefetchRoutes() {
  useEffect(() => {
    const warm = () => Object.values(pages).forEach((load) => load().catch(() => {}));
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(warm, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(warm, 2500);
    return () => clearTimeout(id);
  }, []);
}

function AnimatedRoutes() {
  usePrefetchRoutes();
  return (
    <RouteTransition>
      {(location) => (
        <Suspense fallback={<div className="lx-route-loading" aria-hidden="true" />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/network" element={<Network />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      )}
    </RouteTransition>
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
