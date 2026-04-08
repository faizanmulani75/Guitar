import React, { useState, useEffect } from 'react';
import { Guitar, Music, Radio, Zap } from 'lucide-react';
import { useGuitar } from '../context/GuitarContext';

const Header = () => {
  const { isPlaying } = useGuitar();
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <header className="px-6 py-5 flex items-center justify-between z-50 relative bg-black/40 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-6">
        {/* Premium Minimalist Branding */}
        <div className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/40 group-hover:scale-110 transition-transform duration-300">
            <Music size={22} className="text-black" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-widest uppercase">Virtuoso</h1>
            <p className="text-[10px] text-amber-500/80 font-bold tracking-[0.2em] uppercase -mt-1">Studio Edition</p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Status Indicators */}
        <div className="hidden md:flex items-center gap-4 border-l border-white/10 pl-6 h-10">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500 status-glow-green animate-pulse' : 'bg-red-500 status-glow-red'}`} />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Audio Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Low Latency</span>
          </div>
        </div>

        {/* Info Pill */}
        <div className="glass-pill px-4 py-2 rounded-full flex items-center gap-3">
            <Zap size={14} className="text-amber-500" />
            <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Midi Active</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
