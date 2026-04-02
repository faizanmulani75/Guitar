import React from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import Fretboard from './components/Fretboard';
import { GuitarProvider, useGuitar } from './context/GuitarContext';
import { useKeyboardBindings } from './hooks/useKeyboardBindings';
import { useMidiBindings } from './hooks/useMidiBindings';
import AdComponent from './components/AdComponent';

const GuitarApp = () => {
  const { isPlaying, initAudio } = useGuitar();
  
  useKeyboardBindings();
  useMidiBindings();

  return (
    <div className="flex flex-col h-screen overflow-hidden text-zinc-100 sunburst-body">
      
      {!isPlaying && (
        <div 
          onClick={initAudio}
          className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-md flex flex-col items-center justify-center text-center cursor-pointer transition-opacity duration-500"
        >
          <div className="bg-[#2c1a0f] border-4 border-[#e8dcc4] p-8 shadow-2xl max-w-md transform transition-transform hover:scale-105 rounded-xl">
            <h2 className="text-3xl font-bold text-white mb-4 tracking-tight drop-shadow-md">Power On</h2>
            <p className="text-[#e8dcc4] mb-8 max-w-[250px] mx-auto text-sm leading-relaxed drop-shadow">
              Click to flip the standby switch and initialize the studio engine.
            </p>
            <button className="bg-red-800 border-b-4 border-red-950 text-white px-8 py-3 rounded-lg font-bold tracking-wide uppercase text-sm hover:translate-y-1 hover:border-b-2 transition-all">
              Initialize
            </button>
          </div>
        </div>
      )}

      {/* The Amp Head (Header + Amp Knobs) and Pedalboard (Stompboxes) area */}
      <Header />

      {/* 💰 AD PLACEMENT 1: Top Banner Ad (Horizontal) */}
      <div className="w-full bg-black/30 border-y border-white/5 py-2">
        <AdComponent slot="9834777587" format="auto" />
      </div>

      <Controls />
      
      {/* The Instrument Surface */}
      <div className="flex-1 flex flex-col overflow-hidden relative drop-shadow-[0_-20px_40px_rgba(0,0,0,0.8)] z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-20" />
        <Fretboard />
      </div>

      {/* 💰 AD PLACEMENT 2: Sticky Bottom/Footer Ad (Multiplex) */}
      <div className="w-full bg-[#1c1c1c] border-t border-white/10 p-2 z-[60] overflow-y-auto max-h-[150px]">
        <AdComponent slot="5895532575" format="autorelaxed" />
      </div>
      
    </div>
  );
};

const App = () => (
  <GuitarProvider>
    <GuitarApp />
  </GuitarProvider>
);

export default App;
