import AnimatedPage from '../components/AnimatedPage';
import TypewriterText from '../components/TypewriterText';

export default function Archive() {
  const projects = [
    {
      id: "PRJ-001", sec: "CLOUD",
      title: "Cloud-Native Certificate Validation System",
      desc: "A high-throughput microservice for X.509 certificate validation using zero-trust principles.",
      tags: [
        { name: "Go", style: "bg-tertiary-container/10 border-tertiary-container/30 text-tertiary-fixed-dim" },
        { name: "PostgreSQL", style: "bg-surface-variant border-outline-variant/50 text-on-surface-variant" },
        { name: "Cloud KMS", style: "bg-secondary-container/10 border-secondary-container/30 text-secondary-fixed-dim" }
      ],
      glow: "primary-container"
    },
    {
      id: "PRJ-002", sec: "ECOM",
      title: "Vegetable E-Commerce for UMKM",
      desc: "Decentralized digital storefront with real-time inventory and payment gateway.",
      tags: [
        { name: "Laravel", style: "bg-error-container/20 border-error-container/50 text-error" },
        { name: "React", style: "bg-[#00d8ff]/10 border-[#00d8ff]/30 text-[#00d8ff]" },
        { name: "Midtrans", style: "bg-surface-variant border-outline-variant/50 text-on-surface-variant" }
      ],
      glow: "[#fcee0a]"
    },
    {
      id: "PRJ-003", sec: "CV",
      title: "Posture Detection System",
      desc: "Computer vision for biomechanical alignment.",
      tags: [
        { name: "Python", style: "bg-[#4B8BBE]/10 border-[#4B8BBE]/50 text-[#FFE873]" },
        { name: "MediaPipe", style: "bg-surface-variant border-outline-variant/50 text-on-surface-variant" }
      ],
      glow: "secondary-fixed"
    }
  ];

  return (
    <AnimatedPage>
      <header className="mb-12 border-b border-primary/20 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative min-h-[120px]">
        <div>
          <h2 className="font-terminal text-3xl md:text-5xl text-primary-container glitch-hover flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">
            <span className="text-tertiary-fixed-dim">&gt;</span>
            <TypewriterText text="QUERY_DATABASE: /root/archive/projects" speed={40} />
          </h2>
          <p className="font-code text-body-md text-on-surface-variant mt-3 uppercase tracking-widest opacity-80">
            <TypewriterText text={`Retrieving archived records... [${projects.length}] MATCHES FOUND`} delay={1500} speed={30} />
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj, idx) => (
          <article key={idx} className={`card-scanner chamfered relative bg-[rgba(255,255,255,0.02)] backdrop-blur-md border border-outline-variant/30 p-6 flex flex-col min-h-[380px] group hover:border-${proj.glow}/60 transition-all duration-500 z-10 ${idx === 2 ? 'lg:col-span-1 md:col-span-2' : ''}`}>
            <div className={`absolute inset-0 bg-${proj.glow}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>
            <div className={`absolute top-4 right-4 font-code text-[10px] text-on-surface-variant/50 tracking-widest group-hover:text-${proj.glow}/70 transition-colors`}>ID: {proj.id} // SEC: {proj.sec}</div>
            
            <div className="flex-1 flex flex-col pt-10">
              <h3 className={`font-headline-md text-2xl font-bold text-on-surface group-hover:text-${proj.glow} transition-colors mb-3 glitch-hover cursor-crosshair`}>
                {proj.title}
              </h3>
              <p className="font-code text-sm text-on-surface-variant/80 mb-6 flex-1 line-clamp-3">
                {proj.desc}
              </p>
              <div className="flex flex-wrap gap-2 mt-auto">
                {proj.tags.map((tag, i) => (
                  <span key={i} className={`px-2 py-1 border font-code text-[10px] uppercase chamfered ${tag.style}`}>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </AnimatedPage>
  );
}
