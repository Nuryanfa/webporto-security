import RouteTransition from "./components/RouteTransition";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { MotionConfig } from "framer-motion";

import Layout from "./components/Layout";
import useMotionPreference from "./utils/useMotionPreference";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import Home from "./pages/Home";
import Archive from "./pages/Archive";
import Timeline from "./pages/Timeline";
import Network from "./pages/Network";
import NotFound from "./pages/NotFound";
import Overview from "./pages/Overview";
import TabTitleUpdater from "./components/TabTitleUpdater";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <RouteTransition>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/network" element={<Network />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </RouteTransition>
  );
}

export default function App() {
  const reduced = useMotionPreference();
  return (
    <MotionConfig reducedMotion={reduced ? "always" : "never"}>
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
