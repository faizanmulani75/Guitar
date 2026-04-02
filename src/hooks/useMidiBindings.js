import { useEffect } from 'react';
import { useGuitar } from '../context/GuitarContext';
import * as Tone from 'tone';

export const useMidiBindings = () => {
  const { playString, stopString, addMidiDevice, removeMidiDevice } = useGuitar();

  useEffect(() => {
    // We'll keep track of which string is playing which MIDI note 
    // to correctly stop the string on noteOff.
    const activeMidiNotes = new Map(); // midiNote -> stringIndex
    let nextStringIndex = 0; // Simple round-robin polyphony allocator

    const onMIDIMessage = (event) => {
      const [status, data1, data2] = event.data;
      
      // Note On (Status 144-159)
      if (status >= 144 && status <= 159 && data2 > 0) {
        const midiNote = data1;
        const velocity = data2;
        
        // Convert midi number (e.g., 60) to Note (e.g., "C4")
        const noteName = Tone.Frequency(midiNote, "midi").toNote();
        
        // Find a string to play it on (round robin 0-5)
        // In a perfect sim, we map pitch to specific strings, but simple polyphony is most reliable for generic MIDI keyboard.
        const stringIndex = nextStringIndex;
        nextStringIndex = (nextStringIndex + 1) % 6;
        
        activeMidiNotes.set(midiNote, stringIndex);
        playString(stringIndex, noteName, 0); // Fret 0 visually
      }
      
      // Note Off (Status 128-143, or Note On with 0 velocity)
      if ((status >= 128 && status <= 143) || (status >= 144 && status <= 159 && data2 === 0)) {
        const midiNote = data1;
        if (activeMidiNotes.has(midiNote)) {
          const stringIndex = activeMidiNotes.get(midiNote);
          // Gently stop/fade the string if we supported mute, but guitars ring out.
          // stopString(stringIndex); 
          activeMidiNotes.delete(midiNote);
        }
      }
    };

    const initMidi = async () => {
      if (navigator.requestMIDIAccess) {
        try {
          const midiAccess = await navigator.requestMIDIAccess();
          
          // Initial devices
          for (let input of midiAccess.inputs.values()) {
            addMidiDevice(input.id, input.name);
            input.onmidimessage = onMIDIMessage;
          }

          // Handle plug/unplug
          midiAccess.onstatechange = (e) => {
            if (e.port.type === 'input') {
              if (e.port.state === 'connected') {
                addMidiDevice(e.port.id, e.port.name);
                e.port.onmidimessage = onMIDIMessage;
              } else {
                removeMidiDevice(e.port.id);
              }
            }
          };
        } catch (err) {
          console.warn('Web MIDI not supported or denied', err);
        }
      }
    };

    initMidi();
    
    return () => {
      // Cleanup usually handled naturally by browser when document unloads
    };
  }, [playString, addMidiDevice, removeMidiDevice]);
};
