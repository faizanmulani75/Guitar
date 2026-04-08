import * as Tone from 'tone';

// High-quality sample maps for professional guitar tones
const SAMPLE_MAPS = {
  acoustic: {
    baseUrl: "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/acoustic_guitar_nylon-mp3/",
    notes: { "A2": "A2.mp3", "C3": "C3.mp3", "E3": "E3.mp3", "G3": "G3.mp3", "A3": "A3.mp3", "C4": "C4.mp3", "E4": "E4.mp3", "G4": "G4.mp3" }
  },
  electric: {
    baseUrl: "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/electric_guitar_clean-mp3/",
    notes: { "A2": "A2.mp3", "C3": "C3.mp3", "E3": "E3.mp3", "G3": "G3.mp3", "A3": "A3.mp3", "C4": "C4.mp3", "E4": "E4.mp3", "G4": "G4.mp3" }
  },
  bass: {
    baseUrl: "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/electric_bass_finger-mp3/",
    notes: { "E1": "E1.mp3", "G1": "G1.mp3", "A1": "A1.mp3", "C2": "C2.mp3", "E2": "E2.mp3", "G2": "G2.mp3", "A2": "A2.mp3" }
  }
};

class SoundEngine {
  constructor() {
    this.isInitialized = false;
    this.audioContextStarted = false;
    this.isLoading = false;
    
    // Master Processing Chain
    this.masterVolume = new Tone.Volume(-8).toDestination();
    this.limiter = new Tone.Limiter(-2).connect(this.masterVolume);
    this.compressor = new Tone.Compressor({ threshold: -20, ratio: 4, attack: 0.01, release: 0.25 }).connect(this.limiter);
    
    // Global EQ & FX
    this.eq = new Tone.EQ3({ low: 2, mid: -1, high: 2 }).connect(this.compressor);
    this.reverb = new Tone.Reverb({ decay: 2.5, preDelay: 0.01, wet: 0.4 }).connect(this.eq);
    this.chorus = new Tone.Chorus(2, 1.5, 0.3).connect(this.reverb);
    this.distortion = new Tone.Distortion(0.4).connect(this.chorus);

    // Dynamic Filter for natural string damping
    this.dampingFilter = new Tone.Filter(8000, "lowpass").connect(this.distortion);

    this.samplers = {
      acoustic: null,
      electric: null,
      bass: null
    };
    
    this.currentInstrument = 'acoustic';
  }

  async initialize(onProgress) {
    if (this.isInitialized || this.isLoading) return;
    this.isLoading = true;
    
    await Tone.start();
    this.audioContextStarted = true;

    // Load multiple instruments in parallel
    const loadPromises = Object.entries(SAMPLE_MAPS).map(([key, config]) => {
        return new Promise((resolve) => {
            this.samplers[key] = new Tone.Sampler({
                urls: config.notes,
                baseUrl: config.baseUrl,
                onload: () => {
                    console.log(`Sampler loaded: ${key}`);
                    resolve();
                },
                onerror: (err) => {
                    console.error(`Error loading samples for ${key}:`, err);
                    resolve(); // Proceed anyway
                }
            }).connect(key === 'electric' ? this.dampingFilter : this.reverb);
        });
    });

    await Promise.all(loadPromises);
    await this.reverb.generate();
    
    this.isInitialized = true;
    this.isLoading = false;
    if (onProgress) onProgress(100);
  }

  setInstrument(instrument) {
    if (['acoustic', 'electric', 'bass'].includes(instrument)) {
      this.currentInstrument = instrument;
    }
  }

  setVolume(db) {
    this.masterVolume.volume.rampTo(db - 8, 0.1);
  }

  setDistortion(amount) {
    this.distortion.distortion = amount;
    // For clean acoustic, keep distortion low/off
    this.distortion.wet.value = this.currentInstrument === 'electric' ? 1 : 0.2;
  }

  setReverb(enabled) {
    this.reverb.wet.rampTo(enabled ? 0.4 : 0, 0.1);
  }

  playNote(originalNote, stringIndex, transpose = 0, octave = 0, is12String = false) {
    if (!this.audioContextStarted || !this.isInitialized) return;
    
    const sampler = this.samplers[this.currentInstrument];
    if (!sampler) return;

    // Pitch logic: Use shifted midi note
    const baseMidi = Math.round(Tone.Frequency(originalNote).toMidi());
    const shiftedMidi = baseMidi + transpose + (octave * 12);
    const finalNote = Tone.Frequency(shiftedMidi, "midi").toNote();

    // Trigger Note with random velocity for human feel
    const velocity = 0.7 + Math.random() * 0.3;
    sampler.triggerAttack(finalNote, Tone.now(), velocity);

    // 12-String / Octave Double Logic
    if (is12String) {
      const doubleNote = Tone.Frequency(shiftedMidi + 12, "midi").toNote();
      sampler.triggerAttack(doubleNote, Tone.now() + 0.015, velocity * 0.7);
    }
  }

  stopNote(stringIndex) {
    // With samplers, we usually let the natural decay ring 
    // but we can release if needed for rapid muting
  }

  stopAll() {
    Object.values(this.samplers).forEach(s => s && s.releaseAll());
  }
}

const engine = new SoundEngine();
export default engine;
