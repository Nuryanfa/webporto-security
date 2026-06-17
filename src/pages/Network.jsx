import { Code2, Briefcase, Mail, Server } from 'lucide-react';

export default function Network() {
  const nodes = [
    {
      icon: Code2, protocol: "GITHUB", desc: "Link to repositories.",
      href: "https://github.com/nuryanfa", target: "_blank",
      glow: "elec-yellow", baseColor: "cyber-cyan"
    },
    {
      icon: Briefcase, protocol: "LINKEDIN", desc: "Link to professional network.",
      href: "https://linkedin.com/in/nuryanfa", target: "_blank",
      glow: "elec-yellow", baseColor: "cyber-cyan"
    },
    {
      icon: Mail, protocol: "EMAIL", desc: "Direct encrypted message relay.",
      href: "mailto:hello@nuryanfa.my.id", target: "_self",
      glow: "elec-yellow", baseColor: "cyber-cyan"
    }
  ];

  return (
    <section className="flex-col w-full flex animate-fade-in">
      <header className="mb-12 border-b border-primary/20 pb-6 relative">
        <h2 className="font-terminal text-3xl md:text-5xl text-cyber-cyan glitch-hover flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">
          &gt; ESTABLISHING_SECURE_COMMS: /root/network<span className="blink w-4 h-6 md:h-10 bg-cyber-cyan inline-block ml-1 opacity-80"></span>
        </h2>
        <p className="font-code text-body-md text-elec-yellow mt-3 tracking-widest opacity-90">
          ENCRYPTION: AES-256 // STATUS: LISTENING...
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {nodes.map((node, idx) => (
          <a key={idx} href={node.href} target={node.target} className="network-node group">
            <div className={`absolute inset-0 bg-${node.baseColor}/5 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            <div className={`absolute top-0 left-0 w-full h-[2px] bg-${node.glow} opacity-0 group-hover:opacity-100 shadow-[0_0_15px_#fcee0a] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out`}></div>
            <node.icon className={`w-10 h-10 text-on-surface-variant group-hover:text-${node.glow} transition-colors mb-4`} />
            <h3 className={`font-code text-xl font-bold tracking-widest text-white group-hover:text-${node.baseColor} transition-colors`}>[ PROTOCOL: {node.protocol} ]</h3>
            <p className="font-code text-sm text-on-surface-variant mt-2 group-hover:text-white transition-colors opacity-70">{node.desc}</p>
          </a>
        ))}

        {/* Main Server Node */}
        <a href="https://nuryanfa.my.id" target="_blank" className="network-node group border-tertiary-fixed-dim/50 bg-tertiary-fixed-dim/10 shadow-[0_0_15px_rgba(42,229,0,0.1)] hover:border-tertiary-fixed-dim">
          <div className="absolute inset-0 bg-tertiary-fixed-dim/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="absolute top-0 left-0 w-full h-[2px] bg-tertiary-fixed-dim opacity-0 group-hover:opacity-100 shadow-[0_0_15px_#2ae500] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out"></div>
          <div className="flex items-center gap-2 mb-4">
            <Server className="w-10 h-10 text-tertiary-fixed-dim" />
            <div className="w-3 h-3 bg-tertiary-fixed-dim rounded-full animate-pulse shadow-[0_0_10px_#2ae500]"></div>
          </div>
          <h3 className="font-code text-xl font-bold tracking-widest text-tertiary-fixed-dim group-hover:text-white transition-colors">[ HOST_DOMAIN: nuryanfa.my.id ]</h3>
          <p className="font-code text-sm text-tertiary-fixed-dim mt-2 opacity-80">Status: ONLINE // MAIN UPLINK</p>
        </a>
      </div>
    </section>
  );
}
