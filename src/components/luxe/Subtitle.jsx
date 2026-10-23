import { useEffect, useState } from "react";
import { onStageReady } from "../../luxe/gsap";
import { episodes } from "../../content/episodes";
import useMotionPreference from "../../utils/useMotionPreference";

/**
 * Anime-style subtitle for the Home hero. It lives in the hero foot's reserved
 * centre slot (hidden on small screens), so it can never cover content: once the
 * stage is ready the line plays, then the slot settles back to its hint text.
 */
export default function HeroSubtitle({ fallback }) {
  const reduced = useMotionPreference();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let show = 0;
    let hide = 0;
    const cancel = onStageReady(() => {
      show = setTimeout(() => {
        setPlaying(true);
        hide = setTimeout(() => setPlaying(false), 3800);
      }, 700);
    });
    return () => {
      cancel();
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, [reduced]);

  return (
    <span className={`lx-hero__slot ${playing ? "is-subtitle" : ""}`}>
      {playing ? <span aria-hidden="true">「{episodes["/"].subtitle}」</span> : fallback}
    </span>
  );
}
