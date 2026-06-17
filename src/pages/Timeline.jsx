export default function Timeline() {
  const logs = [
    {
      time: "2026-04", status: "ACTIVE_OP", color: "elec-yellow", 
      title: "OP: Digitak Labs Internship",
      detail: "Core system development and GitLab repository management.",
      align: "left"
    },
    {
      time: "2026-04", status: "COMPLETED", color: "secondary", 
      title: "OP: SI MANTAP Dev Team",
      detail: "Development of student guidance features for production-level university management application.",
      align: "right"
    },
    {
      time: "2026-01", status: "COMPLETED", color: "secondary", 
      title: "OP: Infrastructure Upgrade",
      detail: "Modified personal portfolio architecture and integrated pure CSS Bento Grid aesthetics.",
      align: "left"
    }
  ];

  return (
    <section className="flex-col w-full flex animate-fade-in">
      <header className="mb-12 border-b border-primary/20 pb-6 relative">
        <h2 className="font-terminal text-3xl md:text-5xl text-cyber-cyan glitch-hover flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">
          &gt; FETCHING_LOGS: /root/timeline/sys_audit<span className="blink w-4 h-6 md:h-10 bg-cyber-cyan inline-block ml-1 opacity-80"></span>
        </h2>
      </header>
      
      <div className="relative w-full py-10">
        <div className="timeline-line hidden md:block"></div>
        
        {logs.map((log, idx) => (
          <div key={idx} className="relative flex flex-col md:flex-row justify-between items-center w-full mb-12">
            
            {log.align === 'left' ? (
              <>
                <div className="hidden md:flex w-5/12 justify-end pr-8">
                  <div className="text-right">
                    <span className="font-code text-cyber-cyan tracking-widest">[SYS_TIME: {log.time}]</span><br/>
                    <span className={`font-code text-${log.color} text-sm`}>
                      STATUS: {log.status} 
                      {log.status === "ACTIVE_OP" && <span className={`w-2 h-2 rounded-full bg-${log.color} inline-block animate-pulse ml-1`}></span>}
                    </span>
                  </div>
                </div>
                <div className={`w-10 h-10 rounded-full bg-tactical-black border-2 ${log.status === 'ACTIVE_OP' ? 'border-cyber-cyan shadow-[0_0_15px_rgba(0,243,255,0.5)]' : 'border-outline-variant'} z-10 flex items-center justify-center relative`}>
                  <div className={`w-3 h-3 rounded-full ${log.status === 'ACTIVE_OP' ? 'bg-elec-yellow animate-pulse' : 'bg-outline-variant'}`}></div>
                </div>
                <div className="w-full md:w-5/12 md:pl-8 mt-4 md:mt-0">
                  <div className={`tactical-panel p-6 w-full text-left chamfered border ${log.status === 'ACTIVE_OP' ? 'border-cyber-cyan/40' : 'border-outline-variant/40 hover:border-cyber-cyan/40'}`}>
                    <div className="md:hidden mb-4 border-b border-outline-variant/30 pb-2">
                      <span className="font-code text-cyber-cyan text-sm tracking-widest">[SYS_TIME: {log.time}]</span><br/>
                      <span className={`font-code text-${log.color} text-xs`}>STATUS: {log.status}</span>
                    </div>
                    <h3 className="font-headline-md text-2xl font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors">{log.title}</h3>
                    <p className="font-code text-on-surface-variant text-sm">{log.detail}</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full md:w-5/12 md:pr-8 mt-4 md:mt-0 order-2 md:order-1">
                  <div className="tactical-panel p-6 w-full text-left md:text-right chamfered border border-outline-variant/40 hover:border-cyber-cyan/40">
                    <div className="md:hidden mb-4 border-b border-outline-variant/30 pb-2 text-left">
                      <span className="font-code text-on-surface-variant text-sm tracking-widest">[SYS_TIME: {log.time}]</span><br/>
                      <span className={`font-code text-${log.color} text-xs`}>STATUS: {log.status}</span>
                    </div>
                    <h3 className="font-headline-md text-2xl font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors">{log.title}</h3>
                    <p className="font-code text-on-surface-variant text-sm">{log.detail}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-tactical-black border-2 border-outline-variant z-10 flex items-center justify-center relative order-1 md:order-2">
                  <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
                </div>
                <div className="hidden md:flex w-5/12 justify-start pl-8 order-3">
                  <div className="text-left">
                    <span className="font-code text-on-surface-variant tracking-widest">[SYS_TIME: {log.time}]</span><br/>
                    <span className={`font-code text-${log.color} text-sm`}>STATUS: {log.status}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
