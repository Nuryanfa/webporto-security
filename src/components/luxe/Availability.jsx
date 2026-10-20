import { useEffect, useState } from "react";
import { profile } from "../../content/profile";

const { utcOffset, label } = profile.timezone;
const pad = (n) => String(Math.floor(n)).padStart(2, "0");
const fmt = (hours) => `${pad(hours)}:${pad(((hours % 1) * 60 + 0.5) | 0)}`;
const wrap = (h) => ((h % 24) + 24) % 24;

function Track({ name, hour }) {
  return (
    <div className="lx-avail__row">
      <span className="lx-avail__name">{name}</span>
      <div className="lx-avail__track" aria-hidden="true">
        {hour != null && <i className="lx-avail__now" style={{ left: `${(hour / 24) * 100}%` }} />}
      </div>
    </div>
  );
}

// Plain-language description of the gap between the visitor's zone and Bandung.
function describeShift(shift, zone) {
  if (shift === 0) return "We share a time zone.";
  const hours = Math.abs(shift);
  const unit = hours === 1 ? "hour" : "hours";
  return `Bandung is ${hours} ${unit} ${shift < 0 ? "ahead of" : "behind"} ${zone}.`;
}

/**
 * Time-zone panel: Bandung local time and how it lines up with the visitor's
 * own clock (computed from the browser's time zone). No schedule claims.
 */
export default function Availability() {
  const [now, setNow] = useState(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  const utcHour = now ? now.getUTCHours() + now.getUTCMinutes() / 60 : null;
  const myHour = now ? wrap(utcHour + utcOffset) : null;
  const visitorOffset = now ? -now.getTimezoneOffset() / 60 : utcOffset;
  const shift = visitorOffset - utcOffset;
  const visitorHour = now ? now.getHours() + now.getMinutes() / 60 : null;
  const zone = now ? Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, " ") : "";

  return (
    <div className="lx-avail">
      <div className="lx-avail__head">
        <span className="lx-eyebrow">Local time</span>
        <span className="lx-avail__zone">
          {label} · UTC+{utcOffset}
        </span>
      </div>

      <div className="lx-avail__clock">
        <b>{myHour != null ? fmt(myHour) : "--:--"}</b>
        <span>{profile.location}</span>
      </div>

      <div className="lx-avail__scale" aria-hidden="true">
        <span>00</span>
        <span>06</span>
        <span>12</span>
        <span>18</span>
        <span>24</span>
      </div>
      <Track name="Bandung" hour={myHour} />
      {now && shift !== 0 && <Track name="Your time" hour={visitorHour} />}

      <p className="lx-avail__note">
        {now ? describeShift(shift, zone) : "Bandung, Indonesia (UTC+7)."} Email is the fastest way to reach me
        across time zones.
      </p>
    </div>
  );
}
