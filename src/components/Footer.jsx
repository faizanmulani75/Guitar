import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Globe, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-950/80 border-t border-white/5 py-12 px-6 backdrop-blur-sm relative z-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-900/20">
                <Music size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white uppercase">Virtual Guitar</span>
            </div>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
              Experience the world's most photorealistic guitar simulator. Designed for precision, accessibility, and high-fidelity audio performance directly in your browser.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-zinc-500 hover:text-red-500 text-sm transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-zinc-500 hover:text-red-500 text-sm transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-zinc-500 hover:text-red-500 text-sm transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-zinc-500 hover:text-red-500 text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-zinc-500 hover:text-red-500 text-sm transition-colors">Terms of Service</Link></li>
              <li><a href="/ads.txt" className="text-zinc-500 hover:text-red-500 text-sm transition-colors">Ads.txt</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-xs">
            © {new Date().getFullYear()} Virtual Guitar Simulator. All rights reserved. Built with precision for musicians.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-zinc-500 hover:text-white transition-colors"><MessageCircle size={18} /></a>
            <a href="#" className="text-zinc-500 hover:text-white transition-colors"><Globe size={18} /></a>
            <a href="mailto:support@virtualguitar.com" className="text-zinc-500 hover:text-white transition-colors"><Mail size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
