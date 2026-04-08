import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 sm:p-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-red-500 hover:text-red-400 mb-8 inline-block font-medium">← Back to Simulator</Link>
        
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Terms of Service</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Last updated: April 2026
          </p>
        </header>

        <section className="prose prose-invert max-w-none space-y-8">
          <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-zinc-400 leading-relaxed">
              By accessing and using Virtual Guitar, you agree to comply with and be bound by these terms. If you do not agree, please refrain from using the site.
            </p>
          </div>

          <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <p className="text-zinc-400 leading-relaxed">
              Permission is granted to temporarily use our simulator for personal, non-commercial transitory viewing only. This does not grant you ownership of the audio samples, code, or graphical assets.
            </p>
          </div>

          <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
            <p className="text-zinc-400 leading-relaxed">
              The simulator is provided "as is". We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability.
            </p>
          </div>

          <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
            <p className="text-zinc-400 leading-relaxed">
              In no event shall Virtual Guitar or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials.
            </p>
          </div>

          <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">5. Governing Law</h2>
            <p className="text-zinc-400 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which the provider is based, and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Terms;
