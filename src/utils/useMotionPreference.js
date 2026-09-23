import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';
const subscribe = callback => {
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
};
const snapshot = () => window.matchMedia(query).matches;

// Reacts immediately when the OS preference changes, including already mounted scenes.
export default function useMotionPreference() {
  return useSyncExternalStore(subscribe, snapshot, () => true);
}
