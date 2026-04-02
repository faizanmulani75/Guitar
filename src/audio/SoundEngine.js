import * as Tone from 'tone';

class SoundEngine {
  constructor() {
    this.isInitialized = false;
    this.audioContextStarted = false;
    
    // Master volume
    this.masterVolume = new Tone.Volume(-5).toDestination();
    
    // Effects
    this.distortion = new Tone.Distortion(0.8);
    this.chorus = new Tone.Chorus(4, 2.5, 0.5);
    this.eq = new Tone.EQ3({ low: 2, mid: 0, high: 2 });
    
    // Configurable Reverb
    this.reverb = new Tone.Reverb(1.5);
    this.cleanReverb = new Tone.Reverb(2);

    // Default connections (Reverb will be dynamically bypassed via toggle)
    this.distortion.connect(this.chorus);
    this.chorus.connect(this.reverb);
    this.reverb.connect(this.eq);
    this.eq.connect(this.masterVolume);
    this.cleanReverb.connect(this.masterVolume);

    // 12 synths per instrument category. 0-5 = main strings, 6-11 = 12-string octave doubles
    this.synths = {
      acoustic: [],
      electric: [],
      bass: []
    };
    
    this.currentInstrument = 'acoustic';
  }

  async initialize() {
    if (this.isInitialized) return;
    
    await Tone.start();
    this.audioContextStarted = true;

    await this.reverb.generate();
    await this.cleanReverb.generate();

    for (let i = 0; i < 12; i++) {
      // Acoustic
      const acousticSynth = new Tone.Synth({
        oscillator: { type: 'pwm', modulationFrequency: 0.2 },
        envelope: { attack: 0.01, decay: 1.5, sustain: 0.2, release: 2 }
      }).connect(this.cleanReverb);
      this.synths.acoustic.push(acousticSynth);

      // Electric
      const electricSynth = new Tone.FMSynth({
        modulationIndex: 12.22,
        envelope: { attack: 0.01, decay: 2, sustain: 0.5, release: 1.5 },
        modulation: { type: 'square' },
        modulationEnvelope: { attack: 0.02, decay: 0.2, sustain: 1, release: 0.5 }
      }).connect(this.distortion);
      this.synths.electric.push(electricSynth);

      // Bass
      const bassSynth = new Tone.FMSynth({
        harmonicity: 0.5,
        modulationIndex: 1.2,
        oscillator: { type: 'sine' },
        envelope: { attack: 0.05, decay: 1, sustain: 0.8, release: 2 },
        modulation: { type: 'sawtooth' },
        modulationEnvelope: { attack: 0.05, decay: 0.5, sustain: 0.8, release: 2 }
      }).connect(this.cleanReverb); 
      this.synths.bass.push(bassSynth);
    }
    
    this.isInitialized = true;
  }

  setInstrument(instrument) {
    if (['acoustic', 'electric', 'bass'].includes(instrument)) {
      this.currentInstrument = instrument;
    }
  }

  setVolume(db) {
    this.masterVolume.volume.rampTo(db, 0.1);
  }

  setDistortion(amount) {
    this.distortion.distortion = amount;
  }

  setReverb(enabled) {
    // Dynamically wire the wetness of the reverb to act as a bypass switch
    const wetness = enabled ? 1 : 0;
    this.reverb.wet.value = wetness;
    this.cleanReverb.wet.value = wetness;
  }

  playNote(originalNote, stringIndex, transpose = 0, octave = 0, is12String = false) {
    if (!this.audioContextStarted) return;
    
    const stringBank = this.synths[this.currentInstrument];
    if (!stringBank) return;

    // Mathematical Pitch Calculation using Tone Frequency manipulation
    const baseMidi = Math.round(Tone.Frequency(originalNote).toMidi());
    
    // Add transpose (semitones) + octave shifts (12 semitones)
    const shiftedMidi = baseMidi + transpose + (octave * 12);
    const finalNoteFreq = Tone.Frequency(shiftedMidi, "midi").toFrequency();

    // Trigger main string
    const mainSynth = stringBank[stringIndex];
    if (mainSynth) {
      mainSynth.triggerRelease();
      mainSynth.triggerAttackRelease(finalNoteFreq, "4n", Tone.now());
    }

    // Trigger secondary string (Additional Reeds / 12-String simulator paired string)
    if (is12String) {
      const doubleSynth = stringBank[stringIndex + 6];
      if (doubleSynth) {
        // Shifting 12 semitones up (+1 octave) exactly like a secondary reed or 12-string pair
        const doubleNoteFreq = Tone.Frequency(shiftedMidi + 12, "midi").toFrequency();
        doubleSynth.triggerRelease();
        doubleSynth.triggerAttackRelease(doubleNoteFreq, "4n", Tone.now() + 0.01); // Slight 10ms offset for realistic doubled plucking strum delay
      }
    }
  }

  stopNote(stringIndex) {
    if (!this.audioContextStarted) return;
    const stringBank = this.synths[this.currentInstrument];
    if (!stringBank) return;

    if (stringBank[stringIndex]) stringBank[stringIndex].triggerRelease();
    if (stringBank[stringIndex + 6]) stringBank[stringIndex + 6].triggerRelease(); // kill double string too
  }
}

const engine = new SoundEngine();
export default engine;
