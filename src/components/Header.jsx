import React, { useState, useEffect } from 'react';
import { Guitar, Maximize, Minimize } from 'lucide-react';

const Header = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <header className="amp-tolex border-b-8 border-[#3b1e08] shadow-[0_10px_30px_rgba(0,0,0,0.9)] px-6 py-4 flex items-center justify-between z-40 relative">
      <div className="flex items-center gap-4">
        {/* Vintage Amp Badge Logo */}
        <div className="bg-gradient-to-b from-yellow-500 to-yellow-600 px-4 py-1.5 rounded-sm shadow-md border border-yellow-700 flex items-center gap-2">
          <Guitar size={18} className="text-yellow-950" />
          <h1 className="text-lg font-black text-yellow-950 tracking-tighter uppercase italic drop-shadow-sm">Virtuoso</h1>
        </div>
        {/* <p className="text-zinc-500 text-xs uppercase tracking-widest font-mono font-bold hidden sm:block">Model 1959 Simulator</p> */}
      </div>
      
      <div className="flex items-center gap-4">
        {/* Keyboard Layout Helper */}
        <div className="font-mono text-[9px] text-[#b88a44] bg-black/50 px-3 py-1.5 rounded border border-[#3b1e08] hidden lg:block text-right">
          <span className="text-zinc-500 uppercase block mb-1">Keyboard Layout:</span>
          <span className="text-zinc-300">Columns <kbd className="text-white bg-black px-1">1-6</kbd> = Strings (Low to High)</span><br/>
          <span className="text-zinc-300">Rows <kbd className="text-white bg-black px-1">1 Q A Z</kbd> = Frets (0-3)</span>
        </div>

        {/* Fullscreen Toggle Button */}
        {/* <button 
          onClick={toggleFullScreen}
          title="Toggle Fullscreen"
          className="bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 p-2 rounded-md border border-zinc-700/50 shadow-inner transition-colors focus:outline-none"
        >
          {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
        </button> */}
      </div>
    </header>
  );
};

export default Header;
