import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import engine from '../audio/SoundEngine';
import { CHORD_DATA, getNoteForFret, GUITAR_STRINGS } from '../utils';

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
  const [isEngineLoading, setIsEngineLoading] = useState(false);
  
  // Advanced features
  const [transpose, setTranspose] = useState(0); 
  const [octave, setOctave] = useState(0); 
  const [reverbEnabled, setReverbEnabled] = useState(true);
  const [is12String, setIs12String] = useState(0); 
  const [midiDevices, setMidiDevices] = useState([]);
  
  // Chord Sheet State
  const [selectedChord, setSelectedChord] = useState('none');

  const [activeStrings, setActiveStrings] = useState(new Set());
  const [activeFrets, setActiveFrets] = useState(new Map());

  // Engine hooks
  useEffect(() => { engine.setInstrument(instrument); }, [instrument]);
  useEffect(() => { engine.setVolume(volume); }, [volume]);
  useEffect(() => { engine.setDistortion(distortion); }, [distortion]);
  useEffect(() => { engine.setReverb(reverbEnabled); }, [reverbEnabled]);

  const initAudio = async () => {
    if (!isPlaying && !isEngineLoading) {
      setIsEngineLoading(true);
      try {
        await engine.initialize();
        setIsPlaying(true);
      } catch (error) {
        console.error("Failed to initialize audio engine", error);
      } finally {
        setIsEngineLoading(false);
      }
    }
  };

  const playString = useCallback((stringIndex, note, fretIndex) => {
    if (!isPlaying) {
        initAudio();
        return;
    }
    
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
    }, 1000);
  }, [isPlaying, transpose, octave, is12String]); // Intentionally not capturing initAudio to avoid massive recreations

  // Studio Auto-Strum Logic
  const playChord = useCallback(async () => {
    if (!isPlaying) {
        await initAudio();
        return;
    }
    if (selectedChord === 'none') return;

    const fingerings = CHORD_DATA[selectedChord];
    if (!fingerings) return;

    // Realistic sequential strum (from top string to bottom)
    for (let i = 5; i >= 0; i--) {
        const fretIndex = fingerings[i];
        if (fretIndex !== null) {
            const openNote = GUITAR_STRINGS[i].note;
            const noteToPlay = getNoteForFret(openNote, fretIndex);
            playString(i, noteToPlay, fretIndex);
            // Slight delay (arpeggio) for realism (50ms)
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }
  }, [selectedChord, isPlaying, playString]);

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

  const value = useMemo(() => ({
    instrument, setInstrument,
    volume, setVolume,
    distortion, setDistortion,
    transpose, setTranspose,
    octave, setOctave,
    reverbEnabled, setReverbEnabled,
    is12String, setIs12String,
    selectedChord, setSelectedChord,
    playChord,
    midiDevices, addMidiDevice, removeMidiDevice,
    isPlaying, isEngineLoading, initAudio,
    playString, stopString,
    activeStrings, activeFrets
  }), [
    instrument, volume, distortion, transpose, octave, reverbEnabled, 
    is12String, selectedChord, playChord, midiDevices, isPlaying, isEngineLoading, playString, stopString, 
    activeStrings, activeFrets, addMidiDevice, removeMidiDevice
  ]);

  return (
    <GuitarContext.Provider value={value}>
      {children}
    </GuitarContext.Provider>
  );
};
