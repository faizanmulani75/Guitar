import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Globe } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 sm:p-12">
      <div className="max-w-3xl mx-auto text-center">
        <Link to="/" className="text-red-500 hover:text-red-400 mb-8 inline-block font-medium">← Back to Simulator</Link>
        
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Contact Us</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Have questions, feedback, or suggestions? We'd love to hear from you.
          </p>
        </header>

        <div className="grid gap-8 sm:grid-cols-2 text-left mb-16">
          <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl">
            <Mail className="text-red-500 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
            <p className="text-zinc-400 text-sm mb-4">
              For general inquiries, support, or bug reports.
            </p>
            <a href="mailto:support@virtualguitar.com" className="text-white font-medium hover:underline">support@virtualguitar.com</a>
          </div>
          <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl">
            <MessageCircle className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-semibold mb-2">Social Media</h3>
            <p className="text-zinc-400 text-sm mb-4">
              Follow us for updates and community discussions.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
                <MessageCircle size={20} />
              </a>
              <a href="#" className="p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
                <Globe size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl text-left">
          <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
          <form className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input 
                type="text" 
                placeholder="Name" 
                className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
              />
            </div>
            <textarea 
              rows="4" 
              placeholder="Your Message..." 
              className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
            ></textarea>
            <button 
              type="submit" 
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-500 transition-all w-full sm:w-auto"
            >
              Send Message
            </button>
          </form>
        </div>
        <div className="mt-20 text-left border-t border-white/5 pt-12">
          <h2 className="text-3xl font-bold mb-8 text-white">Frequently Asked Questions</h2>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h4 className="text-red-500 font-semibold mb-2">How do I fix audio lag?</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Ensure you are using a modern browser like Chrome or Edge. Check that No system-level audio enhancement software is running in the background.
              </p>
            </div>
            <div>
              <h4 className="text-red-500 font-semibold mb-2">Can I record my sessions?</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Recording is currently being integrated into the Virtuoso Engine. Stay tuned for our upcoming "Studio Session" update.
              </p>
            </div>
            <div>
              <h4 className="text-red-500 font-semibold mb-2">My MIDI keyboard isn't working?</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                First, ensure your browser has permission to access MIDI devices. Refresh the page after plugging in your device to allow the Virtuoso Engine to detect it.
              </p>
            </div>
            <div>
              <h4 className="text-red-500 font-semibold mb-2">Is this tool free for educators?</h4>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Yes! Virtual Guitar is and will always remain free for educational purposes and personal practice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
