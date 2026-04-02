import React, { useEffect } from 'react';

const AdComponent = ({ slot, format = 'auto', style = { display: 'block' } }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Small timeout ensures the DOM has painted and computed dimensions before AdSense tries to read width
      const timer = setTimeout(() => {
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (e) {
          console.error('AdSense error:', e);
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="ad-container w-full overflow-hidden" style={{ minWidth: '100%' }}>
      <ins
        className="adsbygoogle block"
        style={{ minWidth: '100%', ...style }}
        data-ad-client="ca-pub-5873759177520564"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdComponent;
