import React from 'react';
import { Link } from 'react-router-dom';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 sm:p-12">
      <div className="max-w-3xl mx-auto">
        <Link to="/" className="text-red-500 hover:text-red-400 mb-8 inline-block font-medium">← Back to Simulator</Link>
        
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-zinc-400 text-lg leading-relaxed">
            Last updated: April 2026
          </p>
        </header>

        <section className="prose prose-invert max-w-none space-y-8">
          <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-zinc-400 leading-relaxed">
              At Virtual Guitar, we respect your privacy and are committed to protecting it. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
          </div>

          <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">2. Information Collection</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We do not require users to create accounts or provide personal identification information to use our simulator. However, we may collect non-personal information such as:
            </p>
            <ul className="list-disc pl-6 text-zinc-400 space-y-2">
              <li>Browser type and version</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Usage statistics (e.g., features used, duration)</li>
            </ul>
          </div>

          <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">3. Advertising & Cookies</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">
              We use Google AdSense to serve ads on our site. Google uses cookies to serve ads based on a user's prior visits to our website or other websites. 
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet. 
              Users may opt-out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-red-500 hover:underline">Ads Settings</a>.
            </p>
          </div>

          <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">4. Third-Party Links</h2>
            <p className="text-zinc-400 leading-relaxed">
              Our website may contain links to external sites not operated by us. We have no control over the content and practices of these sites and cannot accept responsibility for their respective privacy policies.
            </p>
          </div>

          <div className="bg-zinc-900 border border-white/5 p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">5. Contact Information</h2>
            <p className="text-zinc-400 leading-relaxed">
              If you have any questions about our Privacy Policy, please contact us at <a href="mailto:privacy@virtualguitar.com" className="text-red-500 hover:underline">privacy@virtualguitar.com</a>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
