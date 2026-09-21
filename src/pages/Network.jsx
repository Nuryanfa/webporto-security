import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Check, Copy, Github, Linkedin, Mail, Radio, Send } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

export default function Network() {
  const email = 'muhamadnuryanfa@gmail.com';
  const [copied, setCopied] = useState(false);
  const [channel, setChannel] = useState('email');
  const reduced = useReducedMotion();
  const copy = async () => { await navigator.clipboard.writeText(email); setCopied(true); window.setTimeout(() => setCopied(false), 1600); };
  const channels = {
    email: { icon: Mail, label: 'Direct mail', value: email, href: `mailto:${email}`, action: 'Compose message' },
    github: { icon: Github, label: 'Source network', value: 'github.com/Nuryanfa', href: 'https://github.com/Nuryanfa', action: 'Inspect repositories' },
    linkedin: { icon: Linkedin, label: 'Professional relay', value: 'Muhamad Nur Yanfa', href: 'https://www.linkedin.com/in/muhamad-nur-yanfa-069036368', action: 'Open connection' },
  };
  const current = channels[channel]; const Icon = current.icon;
  return <AnimatedPage><div className="channel-shell">
    <header className="channel-heading"><span className="eyebrow">41 / Communication array</span><h1>OPEN A<br />CHANNEL.</h1><p>Choose a frequency. Every route reaches the same operator, but each carries a different kind of signal.</p></header>
    <section className="channel-console">
      <div className="channel-radar"><div className="radar-grid"><motion.div className="radar-sweep-arm" animate={reduced ? {} : { rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} /><span className="radar-contact contact-a" /><span className="radar-contact contact-b" /><span className="radar-contact contact-c" /><Radio className="radar-center" /></div><div className="channel-status"><i /> OPERATOR AVAILABLE</div></div>
      <div className="channel-panel"><div className="channel-tabs">{Object.entries(channels).map(([key, item]) => <button key={key} onClick={() => setChannel(key)} className={channel === key ? 'is-active' : ''}><item.icon size={17} /><span>{item.label}</span></button>)}</div>
        <AnimatePresence mode="wait"><motion.div key={channel} initial={reduced ? false : { opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -15 }} className="channel-readout"><span>ACTIVE FREQUENCY / {channel.toUpperCase()}</span><Icon size={36} /><h2>{current.value}</h2><div className="channel-actions"><a href={current.href} target={channel === 'email' ? undefined : '_blank'} rel="noreferrer"><Send size={16} />{current.action}</a>{channel === 'email' && <button onClick={copy}>{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? 'Copied' : 'Copy address'}</button>}</div></motion.div></AnimatePresence>
      </div>
    </section>
  </div></AnimatedPage>;
}
