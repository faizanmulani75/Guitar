import { useEffect } from 'react';
import { useGuitar } from '../context/GuitarContext';
import { getNoteForFret, GUITAR_STRINGS, BASS_STRINGS } from '../utils';

// Vertical Column Mapping!
// Top/Bottom on keyboard = Fret 0/1/2/3/4/5
// Left/Right on keyboard = Strings 5 -> 0 (Fattest to Thinnest)
const KEYMAP = {
  // --- Left Hand (Frets 0 to 3) ---
  // String 5 (Low E - fattest)
  '1': { stringIndex: 5, fretIndex: 0 },
  'q': { stringIndex: 5, fretIndex: 1 },
  'a': { stringIndex: 5, fretIndex: 2 },
  'z': { stringIndex: 5, fretIndex: 3 },
  // String 4 (A)
  '2': { stringIndex: 4, fretIndex: 0 },
  'w': { stringIndex: 4, fretIndex: 1 },
  's': { stringIndex: 4, fretIndex: 2 },
  'x': { stringIndex: 4, fretIndex: 3 },
  // String 3 (D)
  '3': { stringIndex: 3, fretIndex: 0 },
  'e': { stringIndex: 3, fretIndex: 1 },
  'd': { stringIndex: 3, fretIndex: 2 },
  'c': { stringIndex: 3, fretIndex: 3 },
  // String 2 (G)
  '4': { stringIndex: 2, fretIndex: 0 },
  'r': { stringIndex: 2, fretIndex: 1 },
  'f': { stringIndex: 2, fretIndex: 2 },
  'v': { stringIndex: 2, fretIndex: 3 },
  // String 1 (B)
  '5': { stringIndex: 1, fretIndex: 0 },
  't': { stringIndex: 1, fretIndex: 1 },
  'g': { stringIndex: 1, fretIndex: 2 },
  'b': { stringIndex: 1, fretIndex: 3 },
  // String 0 (High E - thinnest)
  '6': { stringIndex: 0, fretIndex: 0 },
  'y': { stringIndex: 0, fretIndex: 1 },
  'h': { stringIndex: 0, fretIndex: 2 },
  'n': { stringIndex: 0, fretIndex: 3 },

  // --- Right Hand (Frets 4 to 7) ---
  // String 5 (Low E)
  '7': { stringIndex: 5, fretIndex: 4 },
  'u': { stringIndex: 5, fretIndex: 5 },
  'j': { stringIndex: 5, fretIndex: 6 },
  'm': { stringIndex: 5, fretIndex: 7 },
  // String 4 (A)
  '8': { stringIndex: 4, fretIndex: 4 },
  'i': { stringIndex: 4, fretIndex: 5 },
  'k': { stringIndex: 4, fretIndex: 6 },
  ',': { stringIndex: 4, fretIndex: 7 },
  // String 3 (D)
  '9': { stringIndex: 3, fretIndex: 4 },
  'o': { stringIndex: 3, fretIndex: 5 },
  'l': { stringIndex: 3, fretIndex: 6 },
  '.': { stringIndex: 3, fretIndex: 7 },
  // String 2 (G)
  '0': { stringIndex: 2, fretIndex: 4 },
  'p': { stringIndex: 2, fretIndex: 5 },
  ';': { stringIndex: 2, fretIndex: 6 },
  '/': { stringIndex: 2, fretIndex: 7 },
  // String 1 (B)
  '-': { stringIndex: 1, fretIndex: 4 },
  '[': { stringIndex: 1, fretIndex: 5 },
  '\'': { stringIndex: 1, fretIndex: 6 },
  // String 0 (High E)
  '=': { stringIndex: 0, fretIndex: 4 },
  ']': { stringIndex: 0, fretIndex: 5 },
};

export const useKeyboardBindings = () => {
  const { playString, stopString, instrument } = useGuitar();

  useEffect(() => {
    const heldKeys = new Set();
    const strings = instrument === 'bass' ? BASS_STRINGS : GUITAR_STRINGS;

    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      const key = e.key.toLowerCase();
      if (KEYMAP[key] && !heldKeys.has(key)) {
        heldKeys.add(key);
        
        let { stringIndex, fretIndex } = KEYMAP[key];
        
        // Bass only has 4 strings, so map string 5/4/3/2 to 3/2/1/0 automatically
        if (instrument === 'bass') {
          // If they try to play string 0 or 1 on Bass, ignore or wrap.
          // Let's shift indices conceptually:
          // Guitar 5,4,3,2 (Low E, A, D, G) maps perfectly to Bass 3,2,1,0 (E, A, D, G)
          if (stringIndex >= 2) {
             stringIndex = stringIndex - 2;
          } else {
             return; // Ignore top 2 strings for bass
          }
        }

        if (strings[stringIndex]) {
          const openNote = strings[stringIndex].note;
          const noteToPlay = getNoteForFret(openNote, fretIndex);
          playString(stringIndex, noteToPlay, fretIndex);
        }
      }
    };

    const handleKeyUp = (e) => {
      const key = e.key.toLowerCase();
      if (heldKeys.has(key)) {
        heldKeys.delete(key);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [playString, stopString, instrument]);
};
