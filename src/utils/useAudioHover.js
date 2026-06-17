import { useEffect, useState } from 'react';

// A tiny base64 encoded synthetic click sound (very subtle)
// Alternatively, if the user had assets, we'd use them. This is a safe fallback.
const clickSoundBase64 = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA="; 

export function useAudioHover() {
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    let actx = null;

    const initAudio = () => {
      if (!actx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) actx = new AudioContext();
      }
    };

    const playClick = () => {
      initAudio();
      if (!actx) return;
      if (actx.state === 'suspended') actx.resume();
      
      const osc = actx.createOscillator();
      const gain = actx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, actx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, actx.currentTime + 0.05);
      
      gain.gain.setValueAtTime(0.02, actx.currentTime); 
      gain.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.05);
      
      osc.connect(gain);
      gain.connect(actx.destination);
      
      osc.start();
      osc.stop(actx.currentTime + 0.05);
    };

    setAudio(() => playClick);

    return () => {
      if (actx) actx.close();
    };
  }, []);

  return audio || (() => {}); // return safe empty function if not supported
}
