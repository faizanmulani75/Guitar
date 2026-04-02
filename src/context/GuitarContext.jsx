import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import engine from '../audio/SoundEngine';

export const GuitarContext = createContext();

export const useGuitar = () => {
  const context = useContext(GuitarContext);
  if (!context) {
    throw new Error('useGuitar must be used within a GuitarProvider');
  }
  return context;
};

export const GuitarProvider = ({ children }) => {
  const [instrument, setInstrument] = useState('acoustic');
  const [volume, setVolume] = useState(0); 
  const [distortion, setDistortion] = useState(0.8);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Advanced features
  const [transpose, setTranspose] = useState(0); // semitones
  const [octave, setOctave] = useState(0); // full octaves (+1 = +12 semitones)
  const [reverbEnabled, setReverbEnabled] = useState(true);
  const [is12String, setIs12String] = useState(0); // 0 = standard, 1 = 12-string mode (Additional Reeds)
  const [midiDevices, setMidiDevices] = useState([]);
  
  const [activeStrings, setActiveStrings] = useState(new Set());
  const [activeFrets, setActiveFrets] = useState(new Map());

  // Engine hooks
  useEffect(() => { engine.setInstrument(instrument); }, [instrument]);
  useEffect(() => { engine.setVolume(volume); }, [volume]);
  useEffect(() => { engine.setDistortion(distortion); }, [distortion]);
  useEffect(() => { engine.setReverb(reverbEnabled); }, [reverbEnabled]);

  const initAudio = async () => {
    if (!isPlaying) {
      await engine.initialize();
      engine.setReverb(reverbEnabled);
      setIsPlaying(true);
    }
  };

  const playString = useCallback((stringIndex, note, fretIndex) => {
    if (!isPlaying) initAudio();
    
    // Play the core note through engine, letting engine handle transposition calculations
    engine.playNote(note, stringIndex, transpose, octave, is12String === 1);
    
    // Visuals
    setActiveStrings(prev => new Set(prev).add(stringIndex));
    setActiveFrets(prev => new Map(prev).set(stringIndex, fretIndex));

    setTimeout(() => {
      setActiveStrings(prev => {
        const next = new Set(prev);
        next.delete(stringIndex);
        return next;
      });
      setActiveFrets(prev => {
        const next = new Map(prev);
        if (next.get(stringIndex) === fretIndex) next.delete(stringIndex);
        return next;
      });
    }, 500);
  }, [isPlaying, transpose, octave, is12String]); // Intentionally not capturing initAudio to avoid massive recreations

  const stopString = useCallback((stringIndex) => {
    engine.stopNote(stringIndex);
  }, []);

  const addMidiDevice = useCallback((id, name) => {
    setMidiDevices(prev => {
      if (!prev.find(d => d.id === id)) return [...prev, {id, name}];
      return prev;
    });
  }, []);

  const removeMidiDevice = useCallback((id) => {
    setMidiDevices(prev => prev.filter(d => d.id !== id));
  }, []);

  const value = {
    instrument, setInstrument,
    volume, setVolume,
    distortion, setDistortion,
    transpose, setTranspose,
    octave, setOctave,
    reverbEnabled, setReverbEnabled,
    is12String, setIs12String,
    midiDevices, addMidiDevice, removeMidiDevice,
    isPlaying, initAudio,
    playString, stopString,
    activeStrings, activeFrets
  };

  return (
    <GuitarContext.Provider value={value}>
      {children}
    </GuitarContext.Provider>
  );
};
