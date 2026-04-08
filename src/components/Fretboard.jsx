import React from 'react';
import { useGuitar } from '../context/GuitarContext';
import GuitarString from './GuitarString';
import { GUITAR_STRINGS, BASS_STRINGS } from '../utils';

const Fretboard = () => {
  const { instrument } = useGuitar();
  const strings = instrument === 'bass' ? BASS_STRINGS : GUITAR_STRINGS;

  return (
    <div className="flex-1 flex flex-col p-2 sm:p-6 md:p-8 w-full max-w-full drop-shadow-2xl overflow-hidden">
      
      {/* 🎸 The Neck: Perspective-warped rosewood block */}
      <div className="w-full relative mt-4 mb-4 shadow-[0_40px_100px_-20px_rgba(0,0,0,1)] rounded-r-3xl rounded-l-md border-y-[14px] border-b-black border-t-[#222]">
        
        {/* Deep Ebony/Rosewood Surface */}
        <div className="absolute inset-0 ebony-fretboard rounded-r-2xl" />

        {/* Bound edges (Classic Ivory Binding) */}
        <div className="absolute inset-0 border-y-[4px] border-r-[4px] border-[#ede4d5] rounded-r-2xl opacity-90 z-20 pointer-events-none shadow-inner" />

        {/* Ambient Neck Lighting */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 z-10 pointer-events-none rounded-r-2xl" />

        {/* Strings Layer */}
        <div className="relative flex flex-col z-30 w-full rounded-r-2xl pr-4 py-3">
          {strings.map((stringData, index) => (
            <GuitarString 
              key={`string-${index}`} 
              stringIndex={index} 
              stringData={stringData} 
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Fretboard;
