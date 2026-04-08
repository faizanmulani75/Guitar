import React, { memo } from 'react';
import { useGuitar } from '../context/GuitarContext';
import { cn, getNoteForFret, CHORD_DATA } from '../utils';

const DOT_FRETS = [3, 5, 7, 9, 15, 17, 19, 21];

const Fret = memo(({ stringIndex, fretIndex, openNote, stringThickness }) => {
  const { playString, activeFrets, selectedChord } = useGuitar();
  
  const isActive = activeFrets.get(stringIndex) === fretIndex;
  const isOpenString = fretIndex === 0;
  const noteContent = getNoteForFret(openNote, fretIndex);

  // Chord Ghost Marker Logic
  const chordFingerings = CHORD_DATA[selectedChord];
  const isGhostMarker = chordFingerings && chordFingerings[stringIndex] === fretIndex;

  const handleInteraction = (e) => {
    // Prevent default to avoid any potential selection/drag issues
    e.preventDefault();
    playString(stringIndex, noteContent, fretIndex);
  };

  const handleMouseEnter = (e) => {
    // Only play if the left mouse button is held down (buttons === 1)
    if (e.buttons === 1) {
      playString(stringIndex, noteContent, fretIndex);
    }
  };

  if (isOpenString) {
    return (
      <div 
        onMouseDown={handleInteraction}
        onMouseEnter={handleMouseEnter}
        className="flex-[0.8] min-w-8 flex-shrink-0 flex items-center justify-center cursor-crosshair relative bg-gradient-to-l from-[#0c0603] to-[#040201] group border-r border-white/5"
      >
        <div className="absolute right-0 w-3 h-[104%] top-[-2%] bone-nut z-40 rounded-sm" />
        
        <div className={cn(
          "absolute inset-0 transition-opacity duration-300", 
          isActive ? "bg-amber-500/20 opacity-100" : "bg-white/0 group-hover:bg-white/5"
        )} />

        {/* Open String Ghost Marker */}
        {isGhostMarker && !isActive && (
            <div className="absolute inset-0 bg-amber-500/10 animate-pulse z-10" />
        )}
        
        <span className={cn(
          "font-mono text-[9px] sm:text-xs z-50 font-bold transition-all duration-200 tracking-tighter",
          isActive ? "text-amber-400 scale-110 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" : "text-zinc-600 group-hover:text-zinc-400"
        )}>
          {noteContent}
        </span>
      </div>
    );
  }

  const isDoubleDot = fretIndex === 12 || fretIndex === 24;
  const isSingleDot = DOT_FRETS.includes(fretIndex);

  return (
    <div 
      onMouseDown={handleInteraction}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "relative flex-1 min-w-[10px] cursor-crosshair group flex items-center justify-center border-r-[1px] border-black/60 overflow-visible transition-colors duration-300",
        isActive ? "fret-active" : "hover:bg-white/5"
      )}
    >
      <div className="absolute right-[-2px] w-[4px] h-[102%] top-[-1%] fret-wire z-40 rounded-full" />

      {/* 👻 Chord Ghost Marker (Premium Highlight) */}
      {isGhostMarker && (
        <div className={cn(
            "absolute w-4 h-4 rounded-full z-10 pointer-events-none transition-all duration-500",
            isActive ? "scale-150 opacity-0" : "bg-amber-500/30 border border-amber-500/50 shadow-[0_0_15px_rgba(251,191,36,0.4)] animate-pulse"
        )} />
      )}

      {stringIndex === 2 && isSingleDot && (
        <div className="absolute top-[100%] left-1/2 -ml-2 -mt-2 w-4 h-4 rounded-full mother-of-pearl z-0 pointer-events-none opacity-80 shadow-md" />
      )}
      {stringIndex === 2 && isDoubleDot && (
        <div className="absolute top-[100%] left-1/2 -ml-2 w-4 h-[420%] pointer-events-none flex flex-col justify-between -mt-12 py-2 z-0 opacity-80">
          <div className="w-4 h-4 rounded-full mother-of-pearl mx-auto shadow-md" />
          <div className="w-4 h-4 rounded-full mother-of-pearl mx-auto shadow-md" />
        </div>
      )}

      <span className={cn(
        "z-50 font-bold font-mono text-[8px] sm:text-[10px] select-none transition-all duration-150 tracking-tighter uppercase",
        isActive ? "text-amber-400 drop-shadow-[0_0_12px_rgba(251,191,36,0.9)] scale-110 opacity-100" : "text-white/0 group-hover:text-white/40 group-hover:scale-105"
      )}>
        {noteContent}
      </span>
    </div>
  );
});

export default Fret;
