import React from 'react';
import { useGuitar } from '../context/GuitarContext';
import { CHORD_DATA, cn } from '../utils';
import { PlayCircle, HelpCircle } from 'lucide-react';

const ChordSelector = () => {
  const { selectedChord, setSelectedChord, playChord } = useGuitar();

  const handleChordClick = (chord) => {
    if (selectedChord === chord) {
        setSelectedChord('none');
    } else {
        setSelectedChord(chord);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-6">
      
      {/* 🎼 Chord Selection Rack */}
      <div className="glass-panel p-6 rounded-[2.5rem] flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group">
        
        {/* Title Section */}
        <div className="flex flex-col gap-1 min-w-[140px]">
           <div className="flex items-center gap-2">
             <HelpCircle size={14} className="text-amber-500/60" />
             <span className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em]">Cheat Sheet</span>
           </div>
           <h2 className="text-xl font-black text-white tracking-tighter uppercase italic">Studio Chords</h2>
        </div>

        {/* The Choice Grid */}
        <div className="flex flex-wrap items-center justify-center gap-2 flex-1">
          {Object.keys(CHORD_DATA).filter(c => c !== 'none').map((chord) => (
            <button
              key={chord}
              onClick={() => handleChordClick(chord)}
              className={cn(
                "px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border",
                selectedChord === chord 
                  ? "bg-amber-500 text-black border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)] scale-[1.05]" 
                  : "bg-white/5 text-white/40 border-transparent hover:bg-white/10 hover:text-white"
              )}
            >
              {chord}
            </button>
          ))}
          <button
              onClick={() => setSelectedChord('none')}
              className={cn(
                "px-5 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 border",
                selectedChord === 'none' 
                  ? "bg-white/20 text-white border-white/30" 
                  : "bg-white/5 text-white/20 border-transparent hover:bg-white/10"
              )}
            >
              Clear
            </button>
        </div>

        {/* ⚡ Studio Auto-Strum Execution */}
        <div className="flex items-center pl-8 border-l border-white/10">
            <button 
                onClick={playChord}
                disabled={selectedChord === 'none'}
                className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-3xl transition-all duration-300 group/strum",
                    selectedChord !== 'none' 
                        ? "bg-amber-500/10 hover:bg-amber-500/20 cursor-pointer" 
                        : "opacity-20 cursor-not-allowed grayscale"
                )}
            >
                <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg",
                    selectedChord !== 'none' 
                        ? "bg-amber-500 text-black shadow-amber-900/40 group-hover/strum:scale-110 group-hover/strum:rotate-12" 
                        : "bg-zinc-800 text-white/20"
                )}>
                    <PlayCircle size={24} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60 group-hover/strum:text-amber-500">
                    Auto-Strum
                </span>
            </button>
        </div>

        {/* Background Decorative Element */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-amber-500/5 blur-[80px] pointer-events-none" />
      </div>

    </div>
  );
};

export default ChordSelector;
