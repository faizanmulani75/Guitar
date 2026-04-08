import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes robustly.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Standard array of string configurations
 * Notes range from E2 (String 6) to E4 (String 1) in Standard Tuning
 */
export const GUITAR_STRINGS = [
  { note: "E4", value: 64, thickness: 1 }, // 1st string (thinnest)
  { note: "B3", value: 59, thickness: 1.5 },
  { note: "G3", value: 55, thickness: 2 },
  { note: "D3", value: 50, thickness: 2.8 },
  { note: "A2", value: 45, thickness: 3.5 },
  { note: "E2", value: 40, thickness: 4.5 } // 6th string
];

export const BASS_STRINGS = [
  { note: "G2", value: 43, thickness: 3 }, // 1st string
  { note: "D2", value: 38, thickness: 4 },
  { note: "A1", value: 33, thickness: 5 },
  { note: "E1", value: 28, thickness: 6 }  // 4th string
];

/**
 * Musical scale tools
 */
const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function getNoteForFret(openNoteString, fretIndex) {
  if (fretIndex === 0) return openNoteString;
  
  // Parse note e.g. E4 -> 'E', 4
  const noteName = openNoteString.slice(0, -1);
  const octave = parseInt(openNoteString.slice(-1));
  
  const startIndex = NOTES.indexOf(noteName);
  const totalSemiTones = startIndex + fretIndex;
  
  const newIndex = totalSemiTones % 12;
  const octaveIncrease = Math.floor(totalSemiTones / 12);
  
  return `${NOTES[newIndex]}${octave + octaveIncrease}`;
}

/**
 * Chord Fingerings (Index 0 = String 1/E4, Index 5 = String 6/E2)
 * value: fretIndex, null: mute
 */
export const CHORD_DATA = {
    'none': [null, null, null, null, null, null],
    'C Major': [0, 1, 0, 2, 3, null],
    'G Major': [3, 0, 0, 0, 2, 3],
    'D Major': [2, 3, 2, 0, null, null],
    'A Minor': [0, 1, 2, 2, 0, null],
    'E Major': [0, 0, 1, 2, 2, 0],
    'E Minor': [0, 0, 0, 2, 2, 0],
    'D Minor': [1, 3, 2, 0, null, null],
    'F Major': [1, 1, 2, 3, 3, 1] // Barre chord
};
