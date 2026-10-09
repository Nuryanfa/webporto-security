import { useId } from 'react';

// Original vector scenery: no third-party character art or raster downloads.
export default function WorldBackdrop() {
  const id = useId();
  return <svg className="world-backdrop" viewBox="0 0 1400 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
    <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#79e6df" stopOpacity=".16" /><stop offset="1" stopColor="#79e6df" stopOpacity="0" /></linearGradient></defs>
    <circle cx="1050" cy="240" r="145" fill={`url(#${id})`} stroke="#79e6df" strokeOpacity=".16" />
    <path d="M880 275L1260 180M935 330L1310 238" stroke="#e8f53b" strokeOpacity=".22" />
    <g fill="#0b151b" stroke="#79e6df" strokeOpacity=".13">
      <path d="M0 700V510H50V460H90V520H160V405H205V350H235V420H290V565H350V480H410V590H490V470H520V700Z" />
      <path d="M830 700V580H890V455H915V365L950 340V480H1000V570H1050V390H1080V300H1100V220H1115V380H1160V430H1220V500H1280V420H1350V520H1400V700Z" />
    </g>
    <g stroke="#79e6df" strokeOpacity=".3"><path d="M180 420V510M195 450V490M1070 430V520M1130 405V465M1310 460V540" /></g>
    <path d="M0 640L500 570 750 620 1030 550 1400 650" fill="none" stroke="#79e6df" strokeOpacity=".15" />
  </svg>;
}
