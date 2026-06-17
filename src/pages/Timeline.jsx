import AnimatedPage from '../components/AnimatedPage';
import TypewriterText from '../components/TypewriterText';

export default function Timeline() {
  const logs = [
    {
      time: "2026 - UNTIL NOW", status: "ACTIVE_OP", color: "elec-yellow", 
      title: "OP: Digitak Labs Internship",
      detail: "Core system development and GitLab repository management.",
      align: "left"
    },
    {
      time: "14/05/2026", status: "COMPLETED", color: "secondary", 
      title: "OP: SI MANTAP Dev Team",
      detail: "Development of student guidance features for production-level university management application.",
      align: "right"
    }
  ];

  return (
    <AnimatedPage>
      <header className="mb-12 border-b border-primary/20 pb-6 relative h-20">
        <h2 className="font-terminal text-3xl md:text-5xl text-cyber-cyan glitch-hover flex items-center gap-2 drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">
          <TypewriterText text="> FETCHING_LOGS: /root/timeline/sys_audit" speed={40} />
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
                  <div className="card-scanner chamfered relative group bg-[rgba(255,255,255,0.02)] backdrop-blur-md border border-outline-variant/30 p-6 timeline-node overflow-hidden">
                    {/* ZZZ HUD Scan Grid */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwyNDMsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    {/* HUD Corner Brackets */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none"></div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"></div>
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-primary opacity-0 group-hover:opacity-100 shadow-[0_0_20px_#00f3ff] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                    
                    <div className="relative z-10 text-left">
                      <div className="md:hidden mb-4 border-b border-outline-variant/30 pb-2">
                        <span className="font-terminal text-cyber-cyan text-sm tracking-widest">[SYS_TIME: {log.time}]</span><br/>
                        <span className={`font-terminal text-${log.color} text-xs tracking-widest`}>STATUS: {log.status}</span>
                      </div>
                      <h3 className="font-pixel text-2xl font-bold text-white mb-2 group-hover:glitch-rgb">{log.title}</h3>
                      <p className="font-body-md text-on-surface-variant text-sm relative z-20">{log.detail}</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="w-full md:w-5/12 md:pr-8 mt-4 md:mt-0 order-2 md:order-1">
                  <div className="card-scanner chamfered relative group bg-[rgba(255,255,255,0.02)] backdrop-blur-md border border-outline-variant/30 p-6 timeline-node overflow-hidden">
                    {/* ZZZ HUD Scan Grid */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMCwyNDMsMjU1LDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    
                    {/* HUD Corner Brackets */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 pointer-events-none"></div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-overlay"></div>
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-primary opacity-0 group-hover:opacity-100 shadow-[0_0_20px_#00f3ff] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"></div>
                    
                    <div className="relative z-10 text-left md:text-right">
                      <div className="md:hidden mb-4 border-b border-outline-variant/30 pb-2 text-left">
                        <span className="font-terminal text-on-surface-variant text-sm tracking-widest">[SYS_TIME: {log.time}]</span><br/>
                        <span className={`font-terminal text-${log.color} text-xs tracking-widest`}>STATUS: {log.status}</span>
                      </div>
                      <h3 className="font-pixel text-2xl font-bold text-white mb-2 group-hover:glitch-rgb">{log.title}</h3>
                      <p className="font-body-md text-on-surface-variant text-sm relative z-20">{log.detail}</p>
                    </div>
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
    </AnimatedPage>
  );
}
