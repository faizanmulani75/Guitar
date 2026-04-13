import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Headphones, Zap, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 sm:p-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-red-500 hover:text-red-400 mb-8 inline-block font-medium">← Back to Simulator</Link>
        
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">About Virtual Guitar</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            The ultimate photorealistic guitar simulator designed for musicians, students, and enthusiasts.
          </p>
        </header>

        <section className="space-y-12">
          <div className="grid gap-8 sm:grid-cols-2">
            <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
              <Music className="text-red-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">High-Fidelity Sound</h3>
              <p className="text-zinc-400 text-sm">
                Powered by Tone.js and a custom audio engine to deliver crystal-clear, realistic notes.
              </p>
            </div>
            <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
              <Headphones className="text-blue-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Low Latency</h3>
              <p className="text-zinc-400 text-sm">
                Optimized for immediate response, ensuring your playing feels natural and fluid.
              </p>
            </div>
            <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
              <Zap className="text-yellow-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Interactive Interface</h3>
              <p className="text-zinc-400 text-sm">
                A hyper-realistic fretboard with dynamic animations and multiple toggleable controls.
              </p>
            </div>
            <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
              <Globe className="text-green-500 mb-4" size={32} />
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-zinc-400 text-sm">
                Play using your keyboard, MIDI devices, or touch—anywhere, anytime.
              </p>
            </div>
          </div>

          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold mt-12 mb-4 text-white">Our Mission & Vision</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Virtual Guitar was born out of a desire to make music education accessible to everyone, everywhere. We realized that while there are many digital instruments available, few captured the tactile response and sonic depth produced by a real acoustic or electric guitar. Our mission is to bridge that gap using cutting-edge web technologies like the Web Audio API and specialized instrument sampling techniques.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Whether you're practicing complex scales, experimenting with new chord progressions, or simply looking for a creative outlet during a break, our simulator provides a professional-grade environment. We believe that by lowering the barrier to entry for musical experimentation, we can help foster a new generation of musicians and enthusiasts.
            </p>
            
            <h2 className="text-2xl font-bold mt-12 mb-4 text-white">The Technical Foundation</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Under the hood, Virtual Guitar utilizes the <strong>Virtuoso Studio Engine</strong>. This custom-built framework handles real-time audio synthesis with sub-10ms latency, ensuring that every pluck and strum feels immediate and natural. We use multi-velocity samples recorded in professional studios to ensure that the tonal character changes dynamically based on how you play.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              We continue to update our engine with new features, pedal effects, and high-quality instrument samples to ensure we remain the most realistic guitar tool on the web. Our roadmap includes social sharing of recordings, advanced pedalboard simulations, and AI-driven practice assistants.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
