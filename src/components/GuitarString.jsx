import React from 'react';
import Fret from './Fret';

const NUM_FRETS = 22; // Standard guitar fret count (0 to 22)

const GuitarString = ({ stringIndex, stringData }) => {
  // Generate array of frets from 0 (open string) to NUM_FRETS
  const frets = Array.from({ length: NUM_FRETS + 1 }, (_, i) => i);

  return (
    <div className="flex w-full h-12 border-b border-black/80 relative">
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
