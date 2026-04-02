import React from 'react';
import { useGuitar } from '../context/GuitarContext';
import GuitarString from './GuitarString';
import { GUITAR_STRINGS, BASS_STRINGS } from '../utils';

const Fretboard = () => {
  const { instrument } = useGuitar();
  const strings = instrument === 'bass' ? BASS_STRINGS : GUITAR_STRINGS;

  return (
    <div className="flex-1 flex flex-col p-2 sm:p-6 md:p-12 overflow-x-auto fretboard-scrollbar custom-scrollbar drop-shadow-2xl">
      
      {/* Perspective wrapper to pop the neck out */}
      <div className="flex-shrink-0 min-w-max relative mt-8 mb-12 shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] rounded-r-3xl rounded-l-md border-y-[12px] border-b-[#1f1107] border-t-[#472714]">
        
        {/* The solid block of Rosewood/Ebony for the neck */}
        <div className="absolute inset-0 rosewood-neck rounded-r-2xl" />

        {/* Bound edges (common on premium guitars like Les Pauls) */}
        <div className="absolute inset-0 border-y-[3px] border-r-[3px] border-[#e8dcc4] rounded-r-2xl opacity-80 z-0 pointer-events-none mix-blend-overlay" />

        {/* Strings Container */}
        <div className="relative flex flex-col z-10 w-full rounded-r-2xl pr-8 py-2">
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
