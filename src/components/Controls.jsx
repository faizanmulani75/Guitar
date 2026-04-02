import React from 'react';
import { useGuitar } from '../context/GuitarContext';

const AmpKnob = ({ label, value, min, max, onChange, disabled }) => {
  const percentage = (value - min) / (max - min);
  const rotation = percentage * 270 - 135;
  return (
    <div className={`flex flex-col items-center relative transition-opacity ${disabled ? 'opacity-30' : 'opacity-100'}`}>
       <span className="text-[10px] uppercase font-bold text-[#d4af37] mb-2 tracking-widest">{label}</span>
       <div className="relative w-14 h-14 rounded-full dial-knob flex items-center justify-center">
         <div 
           className="absolute w-full h-full transition-transform duration-100 pointer-events-none" 
           style={{ transform: `rotate(${rotation}deg)` }}
         >
           <div className="w-[3px] h-4 bg-white mx-auto mt-1 rounded-sm shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
         </div>
       </div>
       <input 
          type="range" min={min} max={max} step={max <= 2 ? 0.1 : 1} 
          value={value} 
          onChange={e => onChange(parseFloat(e.target.value))} 
          disabled={disabled}
          className="opacity-0 absolute inset-0 mt-6 h-14 cursor-pointer" 
       />
    </div>
  )
};

const StompBox = ({ title, color, value, onDecrement, onIncrement, isToggle, isActive, onToggle }) => (
  <div className={`stompbox relative w-28 sm:w-32 h-44 rounded-md mx-2 flex flex-col items-center justify-between p-3 ${color} border-l-2 border-r-[3px] border-b-[6px] border-black shadow-2xl`}>
    <div className="w-full text-center mt-2">
      <h3 className="text-[10px] font-black uppercase text-black/60 font-mono tracking-tighter mix-blend-multiply">{title}</h3>
    </div>
    
    {isToggle ? (
      <div className={`w-4 h-4 rounded-full shadow-[inset_0_1px_4px_rgb(0,0,0,0.9)] ${isActive ? 'bg-red-500 shadow-[0_0_15px_red]' : 'bg-red-950'} mb-2 border border-black/50`} />
    ) : (
      <div className="bg-[#b4d4a4] w-14 h-6 border-[3px] border-t-black/80 border-l-black/80 border-b-white/20 border-r-white/20 flex items-center justify-center font-mono text-black font-black text-xs shadow-inner relative z-10">
        {value}
      </div>
    )}

    {/* The metallic Footswitch */}
    <button 
       onClick={isToggle ? onToggle : () => {}} // A dummy click on numeric pedals
       className="w-10 h-10 rounded-full bg-gradient-to-b from-gray-300 to-gray-500 border-2 border-gray-600 shadow-[0_4px_0_rgb(50,50,50),0_8px_10px_rgba(0,0,0,0.8)] active:translate-y-1 active:shadow-[0_0px_0_rgb(50,50,50),0_2px_4px_rgba(0,0,0,0.9)] transition-all z-20 focus:outline-none mb-1" 
    />

    {!isToggle && (
       <div className="absolute top-[45%] flex w-[110%] justify-between px-0 -ml-2 pointer-events-none">
         <button onClick={onDecrement} className="w-6 h-6 rounded-full dial-knob text-white/50 text-[10px] font-bold leading-none pointer-events-auto hover:text-white flex items-center justify-center"><span className="-mt-[2px]">-</span></button>
         <button onClick={onIncrement} className="w-6 h-6 rounded-full dial-knob text-white/50 text-[10px] font-bold leading-none pointer-events-auto hover:text-white flex items-center justify-center"><span className="-mt-[2px]">+</span></button>
       </div>
    )}
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

  return (
    <div className="flex flex-col relative z-30 drop-shadow-2xl bg-zinc-950">
      
      {/* 1. The Amplifier Head Section */}
      <div className="amp-tolex border-b-[6px] border-black/80 flex flex-col sm:flex-row justify-between items-center px-8 py-6 z-20 shadow-[0_15px_30px_rgba(0,0,0,0.9)] relative">
        
        {/* Instrument Switcher (Classic toggles) */}
        <div className="flex flex-col max-w-[200px] bg-zinc-900 border-2 border-zinc-700/50 p-3 rounded shadow-inner">
          <span className="text-[9px] uppercase font-bold text-zinc-500 mb-2 tracking-widest text-center">Patch Selector</span>
          <div className="flex gap-2 justify-center">
            {['acoustic', 'electric', 'bass'].map((type) => (
              <button
                key={type}
                onClick={() => setInstrument(type)}
                className={`w-12 h-6 text-[9px] uppercase font-bold rounded shadow-sm transition-all border ${
                  instrument === type 
                    ? 'bg-red-700 text-white border-red-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]' 
                    : 'bg-zinc-800 text-zinc-400 border-zinc-900 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] hover:bg-zinc-700'
                }`}
              >
                {type.substring(0,3)}
              </button>
            ))}
          </div>
        </div>

        {/* The Amp Knobs Surface */}
        <div className="flex gap-10 bg-gradient-to-b from-zinc-800 to-zinc-900 p-4 rounded-lg border-t border-zinc-700 border-b-[3px] border-black shadow-xl">
          <AmpKnob label="Master Vol" min={-30} max={10} value={volume} onChange={setVolume} />
          <AmpKnob label="Pre-Amp Dist" min={0} max={2} value={distortion} onChange={setDistortion} disabled={instrument !== 'electric'} />
        </div>

      </div>

      {/* 2. The Floor Pedalboard Section */}
      <div className="bg-[#1a1c23] p-6 pb-12 flex justify-center items-center overflow-x-auto custom-scrollbar border-b-[10px] border-[#0d0e12] shadow-[inset_0_20px_20px_rgba(0,0,0,0.5)]">
         
         <div className="flex bg-[#0f1015] p-4 rounded-xl shadow-2xl border border-[#2a2d36] items-end justify-center min-w-max">
           
           {/* Reverb Pedal */}
           <StompBox 
             title="Holy Reverb" color="bg-gradient-to-b from-[#4da8da] to-[#206f9c]" 
             isToggle isActive={reverbEnabled} onToggle={() => setReverbEnabled(!reverbEnabled)} 
           />
           
           {/* Transpose Pitch Pedal */}
           <StompBox 
             title="Pitch Shift" color="bg-gradient-to-b from-[#e84a5f] to-[#aa2233]"
             value={['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'][(transpose % 12 + 12) % 12]}
             onDecrement={() => setTranspose(t => t - 1)} onIncrement={() => setTranspose(t => t + 1)}
           />

           {/* Octave Pedal */}
           <StompBox 
             title="Octaver" color="bg-gradient-to-b from-[#ffd369] to-[#d49a15]"
             value={`OCT ${octave > 0 ? '+'+octave : octave}`}
             onDecrement={() => setOctave(o => o - 1)} onIncrement={() => setOctave(o => o + 1)}
           />

           {/* 12-String / Chorus Pedal */}
           <StompBox 
             title="12-String DBL" color="bg-gradient-to-b from-[#877a9b] to-[#453a55]"
             isToggle isActive={is12String > 0} onToggle={() => setIs12String(is12String === 0 ? 1 : 0)} 
           />

         </div>

         {/* MIDI Floor Box */}
         <div className="ml-8 bg-[#2a2a2a] p-4 rounded-md border-t-4 border-[#111] shadow-2xl self-end mb-4 flex flex-col items-center">
            <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase mb-2">WebMIDI Interface</span>
            <div className="w-32 h-6 bg-red-950/40 border border-black/80 rounded flex items-center justify-center shadow-inner">
               <span className={`text-[9px] font-bold font-mono tracking-wider ${midiDevices.length > 0 ? 'text-green-500 shadow-[0_0_10px_#22c55e]' : 'text-red-900'}`}>
                 {midiDevices.length > 0 ? 'CONNECTED' : 'OFFLINE'}
               </span>
            </div>
         </div>

      </div>

    </div>
  );
};

export default Controls;
