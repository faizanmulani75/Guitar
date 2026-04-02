import React from 'react';
import { useGuitar } from '../context/GuitarContext';
import { cn, getNoteForFret } from '../utils';

const DOT_FRETS = [3, 5, 7, 9, 15, 17, 19, 21];

const Fret = ({ stringIndex, fretIndex, openNote, stringThickness }) => {
  const { playString, activeFrets } = useGuitar();
  
  const isActive = activeFrets.get(stringIndex) === fretIndex;
  const isOpenString = fretIndex === 0;
  const noteContent = getNoteForFret(openNote, fretIndex);

  // If thickness > 2.5, it's typically a wound string (E, A, D) visually
  const isWound = stringThickness > 2.5;

  const handleClick = (e) => {
    playString(stringIndex, noteContent, fretIndex);
  };

  if (isOpenString) {
    return (
      <div 
        onClick={handleClick}
        className="w-16 flex-shrink-0 flex items-center justify-center cursor-pointer relative bg-gradient-to-l from-[#1f1107] to-[#120a04]"
      >
        {/* The Nut: A thick vertical polished bone pillar that the strings sit on */}
        <div className="absolute right-0 w-3 h-[110%] top-[-5%] bone-nut z-20 rounded-sm" />
        
        {/* Open string background sheen */}
        <div className={cn("absolute inset-0 bg-white/0 transition-colors", isActive ? "bg-amber-500/10" : "hover:bg-white/5")} />
        
        <span className="text-[#a08b76] font-mono text-xs z-30 font-bold drop-shadow-md">
          {noteContent}
        </span>
      </div>
    );
  }

  const isDoubleDot = fretIndex === 12 || fretIndex === 24;
  const isSingleDot = DOT_FRETS.includes(fretIndex);

  // Distribute Fret spacing logarithmically (frets get closer together towards the body)
  // But a simple flex-1 looks fine for a generic web app. We'll stick to flex-1 with min-width.

  return (
    <div 
      onClick={handleClick}
      className={cn(
        "relative flex-1 min-w-[55px] cursor-pointer group flex items-center justify-center border-r-[3px] border-black/40 overflow-visible",
        isActive ? "fret-pressed" : "hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"
      )}
    >
      {/* Photorealistic Fret Wire (Silver/Nickel) capping the right side of the fret space */}
      <div className="absolute right-[-3px] w-[3px] h-[105%] top-[-2.5%] fret-wire z-10" />

      {/* Mother of Pearl Fret Markers */}
      {/* We uniquely place the markers inside String 2 (middle of board) or straddle them */}
      {stringIndex === Math.floor(6 / 2) && isSingleDot && (
        <div className="absolute top-[100%] left-1/2 -ml-3 -mt-3 w-6 h-6 rounded-full pearl-inlay z-0 pointer-events-none" />
      )}
      {stringIndex === Math.floor(6 / 2) && isDoubleDot && (
        <div className="absolute top-[100%] left-1/2 -ml-3 w-6 h-[400%] pointer-events-none flex flex-col justify-between -mt-10 py-1 z-0">
          <div className="w-6 h-6 rounded-full pearl-inlay mx-auto" />
          <div className="w-6 h-6 rounded-full pearl-inlay mx-auto" />
        </div>
      )}

      {/* The Physcial Guitar String Shadow (Cast onto the wood) */}
      <div 
        className="absolute left-0 right-0 z-20 pointer-events-none opacity-60 mix-blend-multiply bg-black"
        style={{ height: `${stringThickness + 2}px`, top: '50%', marginTop: `-${(stringThickness + 2) / 2 - 4}px`, filter: 'blur(2px)' }} 
      />

      {/* The Physical Guitar String */}
      <div 
        className={cn(
          "absolute left-0 right-0 z-30 pointer-events-none transition-all duration-75",
          isWound ? "string-wound" : "string-plain",
          isActive ? `animate-vibrate-${Math.min(6, Math.max(1, Math.ceil(stringThickness / 1.5)))}` : ""
        )}
        style={{ height: `${stringThickness}px`, top: '50%', marginTop: `-${stringThickness/2}px` }}
      />

      {/* Note Label Pop (Only bright when pressed) */}
      <span className={cn(
        "z-40 font-bold font-mono text-xs select-none transition-all duration-100",
        isActive ? "text-orange-500 drop-shadow-[0_0_8px_rgb(249,115,22)] scale-125" : "text-white/0 group-hover:text-white/30"
      )}>
        {noteContent}
      </span>

    </div>
  );
};

export default Fret;
