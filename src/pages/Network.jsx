import { ArrowUpRight, Copy, Github, Linkedin, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Network() {
  const [copied, setCopied] = useState(false);
  const email = 'muhamadnuryanfa@gmail.com';
  const copyEmail = async () => { await navigator.clipboard.writeText(email); setCopied(true); window.setTimeout(() => setCopied(false), 1800); };
  const socials = [
    { label: 'GitHub', detail: '@Nuryanfa', href: 'https://github.com/Nuryanfa', icon: Github },
    { label: 'LinkedIn', detail: 'Muhamad Nur Yanfa', href: 'https://www.linkedin.com/in/muhamad-nur-yanfa-069036368', icon: Linkedin },
  ];
  return <div className="flex min-h-[calc(100vh-11rem)] flex-col justify-between py-8">
    <header><p className="font-code text-[10px] uppercase tracking-[.22em] text-resonance">04 / Open channel</p><h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[.92] tracking-[-.055em] text-white md:text-8xl lg:text-9xl">Let’s build a system worth defending.</h1></header>
    <div className="mt-20 grid gap-10 border-t border-white/[.08] pt-10 lg:grid-cols-2"><div><p className="max-w-lg text-lg leading-8 text-muted">Have a backend problem, a security challenge, or a role where both disciplines matter? My channel is open.</p><a href={`mailto:${email}`} className="mt-8 inline-flex items-center gap-3 text-xl text-white hover:text-resonance"><Mail size={20} />{email}</a><button onClick={copyEmail} className="ml-4 inline-flex items-center gap-2 font-code text-[10px] uppercase tracking-[.15em] text-muted hover:text-white"><Copy size={14} />{copied ? 'Copied' : 'Copy'}</button></div><div className="space-y-3">{socials.map(({ label, detail, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" className="group flex items-center justify-between border-b border-white/[.08] py-5"><span className="flex items-center gap-4"><Icon size={19} className="text-resonance" /><span><strong className="block text-white">{label}</strong><small className="text-muted">{detail}</small></span></span><ArrowUpRight className="text-muted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-acid" /></a>)}</div></div>
  </div>;
}
