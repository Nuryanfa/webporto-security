import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function TabTitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    // Base name based on route
    let baseName = "NEO_SEC";
    if (location.pathname.includes('archive')) baseName = "ARCHIVE";
    if (location.pathname.includes('timeline')) baseName = "TIMELINE";
    if (location.pathname.includes('network')) baseName = "NETWORK";

    const frames = [
      `[ - ] ${baseName}`,
      `[ \\ ] ${baseName}`,
      `[ | ] ${baseName}`,
      `[ / ] ${baseName}`
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      document.title = frames[i];
      i = (i + 1) % frames.length;
    }, 250); // Spin speed

    return () => clearInterval(interval);
  }, [location]);

  return null;
}
