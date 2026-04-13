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

      {/* 💰 AD PLACEMENT 1: Top Banner Ad - Only render after Power Up */}
      {isPlaying && (
        <div className="w-full bg-white/5 border-y border-white/5 py-4">
          <div className="max-w-4xl mx-auto px-4">
            <AdComponent slot="9834777587" format="auto" />
          </div>
        </div>
      )}

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

        {/* 📚 PUBLISHER CONTENT: SEO & Value Documentation */}
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-white/5 bg-zinc-950/30 rounded-t-[3rem]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h1 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter italic">
                Master the Virtuoso Guitar Simulator
              </h1>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Welcome to the most advanced online guitar simulator. Whether you're a professional composer looking for a quick reference tool or a beginner student learning the basics of the fretboard, our platform provides a high-fidelity, low-latency experience directly in your browser.
              </p>
              
              <h2 className="text-xl font-bold text-amber-500 mb-4 uppercase tracking-widest text-sm">How to Play</h2>
              <ul className="space-y-4 text-zinc-300 text-sm">
                <li className="flex gap-4">
                  <span className="text-zinc-500 font-mono">01.</span>
                  <span><strong>Mouse & Touch:</strong> Click or tap directly on the strings to pluck individual notes. Slide your finger across strings for a strumming effect.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-zinc-500 font-mono">02.</span>
                  <span><strong>Keyboard Bindings:</strong> Use your computer keyboard to play like a pro. Keys <code className="bg-white/10 px-2 py-0.5 rounded text-amber-400 font-mono">1-6</code> map to strings, while <code className="bg-white/10 px-2 py-0.5 rounded text-amber-400 font-mono">A-G</code> select root chords.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-zinc-500 font-mono">03.</span>
                  <span><strong>MIDI Integration:</strong> Connect any MIDI-compatible device or keyboard to trigger sounds with velocity sensitivity.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-10">
              <div>
                <h3 className="text-xl font-bold text-white mb-4 uppercase">Professional Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors">
                    <h4 className="font-semibold text-white mb-1">Studio Grade Audio</h4>
                    <p className="text-xs text-zinc-500">Stereo-sampled instrument layers for maximum realism.</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors">
                    <h4 className="font-semibold text-white mb-1">Dynamic Chords</h4>
                    <p className="text-xs text-zinc-500">Switch between Major, Minor, and 7th chords on the fly.</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors">
                    <h4 className="font-semibold text-white mb-1">Zero Latency</h4>
                    <p className="text-xs text-zinc-500">Optimized WebAudio engine for instantaneous response.</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-amber-500/30 transition-colors">
                    <h4 className="font-semibold text-white mb-1">Visual Feedback</h4>
                    <p className="text-xs text-zinc-500">Interactive lighting system shows active notes in real-time.</p>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-3xl">
                <h3 className="text-lg font-bold text-amber-500 mb-2">Why Use a Simulator?</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Simulators are invaluable for visualizing music theory. By interacting with our digital fretboard, you can quickly understand note relationships, practice chord shapes without the physical strain of a real instrument, and experiment with arrangements even when you're away from your studio.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 💰 AD PLACEMENT 2: Dynamic Footer Ad - Only render after Power Up */}
      {isPlaying && (
        <div className="w-full bg-black/40 border-t border-white/5 p-8 z-[60]">
          <div className="max-w-6xl mx-auto">
            <AdComponent slot="5895532575" format="autorelaxed" />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;
