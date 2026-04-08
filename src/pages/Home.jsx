import React, { useEffect } from 'react';
import Header from '../components/Header';
import Controls from '../components/Controls';
import ChordSelector from '../components/ChordSelector';
import Fretboard from '../components/Fretboard';
import { useGuitar } from '../context/GuitarContext';
import { useKeyboardBindings } from '../hooks/useKeyboardBindings';
import { useMidiBindings } from '../hooks/useMidiBindings';
import AdComponent from '../components/AdComponent';
import Footer from '../components/Footer';
import { Power } from 'lucide-react';
import { cn } from '../utils';

const Home = () => {
  const { isPlaying, isEngineLoading, initAudio } = useGuitar();

  useKeyboardBindings();
  useMidiBindings();

  // Prevent scrolling when the initialization screen is active
  useEffect(() => {
    if (!isPlaying) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, [isPlaying]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden text-zinc-100 studio-backdrop bg-black">

      {!isPlaying && (
        <div
          onClick={initAudio}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-700 animate-in fade-in touch-none overflow-hidden"
        >
          <div className="glass-panel p-12 rounded-[3rem] shadow-2xl w-[90%] max-w-lg transform transition-all hover:scale-105 border-white/5 flex flex-col items-center gap-8 group">
            <div className="w-24 h-24 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shadow-inner group-hover:border-amber-500/50 transition-colors">
              <Power size={40} className="text-white/20 group-hover:text-amber-500 transition-colors" />
            </div>
            <div>
              <h2 className="text-4xl font-black text-white mb-3 tracking-tighter uppercase italic">
                {isEngineLoading ? 'Loading Studio...' : 'Ready to Rock?'}
              </h2>
              <p className="text-white/40 max-w-[280px] mx-auto text-sm leading-relaxed font-medium uppercase tracking-widest">
                {isEngineLoading 
                  ? 'Buffering high-fidelity instrument samples to the Virtuoso Engine.' 
                  : 'Flip the standby switch to initialize the Virtuoso Studio Engine.'}
              </p>
            </div>
            <button 
              onClick={initAudio}
              disabled={isEngineLoading}
              className={cn(
                "px-12 py-4 rounded-full font-black tracking-[0.2em] uppercase text-xs transition-all shadow-lg active:scale-95",
                isEngineLoading 
                  ? "bg-zinc-800 text-white/20 cursor-wait animate-pulse" 
                  : "bg-amber-500 text-black hover:bg-white hover:scale-110 shadow-amber-900/20"
              )}
            >
              {isEngineLoading ? 'Initializing...' : 'Power Up'}
            </button>
          </div>
        </div>
      )}

      <Header />

      {/* 💰 AD PLACEMENT 1: Top Banner Ad */}
      <div className="w-full bg-white/5 border-y border-white/5 py-4">
        <div className="max-w-4xl mx-auto px-4">
          <AdComponent slot="9834777587" format="auto" />
        </div>
      </div>

      <main className="flex-1 flex flex-col gap-8 py-8 relative">
        <Controls />
        <ChordSelector />

        {/* The Instrument Surface Container */}
        <div className="flex-1 flex flex-col min-h-[600px] relative mt-4">
          {/* Visual Depth Gradients */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-20" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-20" />

          <div className="flex-1 flex flex-col justify-center py-20 px-0 sm:px-10 overflow-hidden">
            <div className="relative drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)] scale-[1.02]">
              <Fretboard />
            </div>
          </div>
        </div>
      </main>

      {/* 💰 AD PLACEMENT 2: Dynamic Footer Ad */}
      <div className="w-full bg-black/40 border-t border-white/5 p-8 z-[60]">
        <div className="max-w-6xl mx-auto">
          <AdComponent slot="5895532575" format="autorelaxed" />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
