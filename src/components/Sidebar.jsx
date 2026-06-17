import { Link, useLocation } from 'react-router-dom';
import { Terminal, FolderOpen, History, Network, Power } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: Terminal },
    { name: 'Archive', path: '/archive', icon: FolderOpen },
    { name: 'Timeline', path: '/timeline', icon: History },
    { name: 'Network', path: '/network', icon: Network },
  ];

  return (
    <aside className="bg-surface-container-lowest/90 backdrop-blur-2xl h-screen w-64 fixed left-0 top-0 border-r border-outline-variant/20 shadow-2xl hidden lg:flex flex-col p-6 space-y-6 z-30 pt-12">
      <div className="mb-8 border-b border-outline-variant/30 pb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-none chamfered bg-surface-variant flex items-center justify-center border border-outline-variant relative overflow-hidden group">
            <Terminal className="text-primary-fixed-dim w-8 h-8 group-hover:scale-110 transition-transform" />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
          </div>
          <div>
            <h1 className="font-display text-primary-container font-bold text-lg tracking-wider">USER:ROOT</h1>
            <p className="font-code text-label-caps text-secondary-fixed-dim mt-1 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim animate-pulse"></span>
              STATUS: ENCRYPTED
            </p>
          </div>
        </div>
      </div>
      
      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex items-center gap-3 px-4 py-3 font-code text-body-md transition-all rounded ${
                isActive 
                  ? 'bg-secondary-container/20 text-secondary-fixed-dim border-l-4 border-secondary font-bold drop-shadow-[0_0_10px_rgba(255,171,243,0.3)]' 
                  : 'text-on-surface-variant opacity-60 hover:bg-surface-variant/40 scale-105-on-hover hover:text-secondary-fixed'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="tracking-widest uppercase text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto pt-6 border-t border-outline-variant/30">
        <button className="w-full py-3 px-4 chamfered border border-error text-error font-code text-label-caps tracking-widest hover:bg-error hover:text-on-error transition-all duration-300 relative group overflow-hidden">
          <span className="relative z-10 flex items-center justify-center gap-2">
            <Power className="w-4 h-4" />
            DISCONNECT
          </span>
          <div className="absolute inset-0 bg-error/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
        </button>
      </div>
    </aside>
  );
}
