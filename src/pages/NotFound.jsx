import { Link } from 'react-router-dom';
import { ArrowLeft, TriangleAlert } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

export default function NotFound() {
  return <AnimatedPage><section className="grid min-h-[calc(100vh-8rem)] place-items-center text-center"><div><TriangleAlert className="mx-auto text-threat" size={34} /><p className="eyebrow mt-8">Error / coordinate lost</p><h1 className="mt-5 text-[clamp(5rem,18vw,13rem)] font-semibold leading-none tracking-[-.08em] text-white">404</h1><p className="mx-auto mt-5 max-w-md leading-7 text-muted">The requested signal does not exist or has moved outside this network.</p><Link to="/" className="signal-button mt-9"><ArrowLeft size={16} />Return to nexus</Link></div></section></AnimatedPage>;
}
