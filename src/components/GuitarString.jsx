import React from 'react';
import Fret from './Fret';
import { useGuitar } from '../context/GuitarContext';
import { cn } from '../utils';

const NUM_FRETS = 22; // Standard guitar fret count (0 to 22)

const GuitarString = ({ stringIndex, stringData }) => {
  const { activeStrings } = useGuitar();
  
  // Generate array of frets from 0 (open string) to NUM_FRETS
  const frets = Array.from({ length: NUM_FRETS + 1 }, (_, i) => i);
  const isActive = activeStrings.has(stringIndex);
  const isWound = stringData.thickness > 2.5;

  return (
    <div className="flex w-full h-11 border-b border-black/20 relative group/string">
      
      {/* 🎸 The Full-Length Continuous String Shadow */}
      <div 
        className="absolute left-0 right-0 z-20 pointer-events-none opacity-40 mix-blend-multiply bg-black"
        style={{ 
            height: `${stringData.thickness + 4}px`, 
            top: '50%', 
            marginTop: `-${(stringData.thickness + 4) / 2 - 4}px`, 
            filter: 'blur(4px)' 
        }} 
      />

      {/* 🎸 The Full-Length Continuous Physical String */}
      <div 
        className={cn(
          "absolute left-0 right-0 z-30 pointer-events-none transition-all duration-75",
          isWound ? "string-wound" : "string-plain",
          isActive && (stringData.thickness < 2 ? "string-vibrate-light" : stringData.thickness < 4 ? "string-vibrate-medium" : "string-vibrate-heavy")
        )}
        style={{ 
            height: `${stringData.thickness}px`, 
            top: '50%', 
            marginTop: `-${stringData.thickness/2}px` 
        }}
      />

      {/* The Individual Frets (Containing wires and note marks) */}
      {frets.map(fretIndex => (
        <Fret 
          key={`string-${stringIndex}-fret-${fretIndex}`}
          stringIndex={stringIndex}
          fretIndex={fretIndex}
          openNote={stringData.note}
          stringThickness={stringData.thickness}
        />
      ))}
    </div>
  );
};

export default GuitarString;
