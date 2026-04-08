import React from 'react';
import { useGuitar } from '../context/GuitarContext';
import { Zap, Activity, Waves, MoveUp, Music, Plus, Minus, Radio } from 'lucide-react';

const StudioKnob = ({ label, value, min, max, onChange, disabled }) => {
  const percentage = (value - min) / (max - min);
  const rotation = percentage * 270 - 135;
  return (
    <div className={`flex flex-col items-center gap-3 transition-all duration-500 ${disabled ? 'opacity-20 grayscale' : 'opacity-100 hover:scale-105'}`}>
       <div className="relative w-16 h-16 rounded-full knob-cap flex items-center justify-center cursor-pointer group">
         <div className="absolute inset-0 rounded-full bg-amber-500/0 group-hover:bg-amber-500/5 transition-colors" />
         <div 
           className="absolute w-full h-full transition-transform duration-200 pointer-events-none" 
           style={{ transform: `rotate(${rotation}deg)` }}
         >
           <div className="w-[2px] h-3 bg-amber-500 mx-auto mt-2 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.8)]" />
         </div>
         <input 
            type="range" min={min} max={max} step={max <= 2 ? 0.05 : 1} 
            value={value} 
            onChange={e => onChange(parseFloat(e.target.value))} 
            disabled={disabled}
            className="opacity-0 absolute inset-0 cursor-pointer z-10" 
         />
       </div>
       <div className="flex flex-col items-center">
         <span className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em]">{label}</span>
         <span className="text-[9px] font-mono text-amber-500/60 font-bold">{max <= 2 ? (value * 100).toFixed(0) + '%' : value}</span>
       </div>
    </div>
  )
};

const ProcessPill = ({ title, isActive, onToggle, icon: Icon, value }) => (
  <button 
    onClick={onToggle}
    className={`glass-panel px-5 py-4 rounded-2xl flex flex-col items-center gap-3 min-w-[110px] transition-all duration-300 group ${
      isActive ? 'border-amber-500/50 bg-amber-500/5' : 'hover:bg-white/5'
    }`}
  >
    <div className={`p-2 rounded-lg transition-all ${isActive ? 'bg-amber-500 text-black shadow-lg shadow-amber-900/40' : 'bg-white/5 text-white/40 group-hover:text-white/60'}`}>
      <Icon size={18} />
    </div>
    <div className="text-center">
      <h3 className="text-[9px] font-black uppercase text-white/30 tracking-widest mb-1">{title}</h3>
      <span className={`text-xs font-bold transition-colors ${isActive ? 'text-amber-400' : 'text-white/60'}`}>
        {value || (isActive ? 'ON' : 'OFF')}
      </span>
    </div>
  </button>
);

const StudioAdjuster = ({ title, icon: Icon, value, label, onIncrement, onDecrement, isActive }) => (
  <div className={`glass-panel p-4 rounded-2xl flex flex-col items-center gap-3 min-w-[140px] transition-all duration-300 ${
    isActive ? 'border-amber-500/30' : ''
  }`}>
    <div className="flex items-center gap-2 mb-1">
      <div className={`p-1.5 rounded-lg ${isActive ? 'bg-amber-500 text-black' : 'bg-white/5 text-white/30'}`}>
        <Icon size={14} />
      </div>
      <h3 className="text-[8px] font-black uppercase text-white/30 tracking-widest">{title}</h3>
    </div>
    
    <div className="flex items-center gap-4 bg-black/40 px-3 py-2 rounded-xl border border-white/5 shadow-inner">
      <button 
        onClick={onDecrement}
        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all active:scale-90"
      >
        <Minus size={14} />
      </button>
      <div className="min-w-[40px] text-center">
        <span className={`text-sm font-black font-mono transition-colors ${isActive ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-white/60'}`}>
          {label || value}
        </span>
      </div>
      <button 
        onClick={onIncrement}
        className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all active:scale-90"
      >
        <Plus size={14} />
      </button>
    </div>
  </div>
);

const Controls = () => {
  const { 
    instrument, setInstrument, 
    volume, setVolume, 
    distortion, setDistortion,
    transpose, setTranspose,
    octave, setOctave,
    reverbEnabled, setReverbEnabled,
    is12String, setIs12String,
    midiDevices
  } = useGuitar();

  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  return (
    <div className="flex flex-col relative z-30 pt-8 pb-12 px-6 gap-8 overflow-hidden pointer-events-auto">
      <div className="flex flex-col xl:flex-row gap-6 items-stretch justify-center w-full max-w-7xl mx-auto">
        
        {/* Instrument Selection Panel */}
        <div className="glass-panel p-6 rounded-[2rem] flex flex-col gap-4 min-w-[240px]">
          <div className="flex items-center gap-2 mb-2">
            <Music size={14} className="text-amber-500" />
            <span className="text-[10px] uppercase font-black text-white/40 tracking-[0.2em]">Engine Mode</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {['acoustic', 'electric', 'bass'].map((type) => (
              <button
                key={type}
                onClick={() => setInstrument(type)}
                className={`py-3 px-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${
                  instrument === type 
                    ? 'bg-white text-black shadow-xl scale-[1.02]' 
                    : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Mixer Panel */}
        <div className="glass-panel px-10 py-6 rounded-[2rem] flex-1 flex flex-row flex-wrap items-center justify-center sm:justify-evenly gap-10">
          <StudioKnob label="Master Output" min={-40} max={10} value={volume} onChange={setVolume} />
          <StudioKnob label="Drive Gain" min={0} max={2} value={distortion} onChange={setDistortion} disabled={instrument !== 'electric'} />
        </div>

        {/* DSP Effects Rack */}
        <div className="flex flex-wrap items-center justify-center gap-4">
            <ProcessPill 
              title="Aura Reverb" 
              icon={Waves} 
              isActive={reverbEnabled} 
              onToggle={() => setReverbEnabled(!reverbEnabled)} 
            />
            
            <StudioAdjuster 
              title="Pitch Shift" 
              icon={Activity} 
              isActive={transpose !== 0}
              label={notes[(transpose % 12 + 12) % 12] }
              onDecrement={() => setTranspose(t => Math.max(-12, t - 1))}
              onIncrement={() => setTranspose(t => Math.min(12, t + 1))}
            />

            <StudioAdjuster 
              title="Octave Gear" 
              icon={MoveUp} 
              isActive={octave !== 0}
              label={octave !== 0 ? (octave > 0 ? '+'+octave : octave) : '0'}
              onDecrement={() => setOctave(o => Math.max(-2, o - 1))}
              onIncrement={() => setOctave(o => Math.min(2, o + 1))}
            />

            <ProcessPill 
              title="Multi-String" 
              icon={Zap} 
              isActive={is12String > 0} 
              onToggle={() => setIs12String(is12String === 0 ? 1 : 0)} 
            />
        </div>

      </div>

      {/* MIDI Status Bar */}
      {midiDevices.length > 0 && (
        <div className="flex justify-center">
            <div className="glass-pill px-6 py-2 rounded-full flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                <Radio size={14} className="text-green-500 animate-pulse" />
                <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em]">
                    External MIDI Detected: {midiDevices[0].name}
                </span>
            </div>
        </div>
      )}

    </div>
  );
};

export default Controls;
