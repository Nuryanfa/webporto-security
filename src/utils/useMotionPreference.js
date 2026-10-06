import { useSyncExternalStore } from 'react';
import { getPreferences, subscribePreferences } from './experiencePreferences';

const query = '(prefers-reduced-motion: reduce)';
const subscribe = callback => {
  const media = window.matchMedia(query);
  media.addEventListener('change', callback);
  const unsubscribe = subscribePreferences(callback);
  return () => { media.removeEventListener('change', callback); unsubscribe(); };
};
const snapshot = () => getPreferences().motion === 'reduced' || (getPreferences().motion === 'system' && window.matchMedia(query).matches);

// Reacts immediately when the OS preference changes, including already mounted scenes.
export default function useMotionPreference() {
  return useSyncExternalStore(subscribe, snapshot, () => true);
}
