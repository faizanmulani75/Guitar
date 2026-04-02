import React, { useEffect } from 'react';

const AdComponent = ({ slot, format = 'auto', style = { display: 'block' } }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error('AdSense error:', e);
      }
    }
  }, []);

  return (
    <div className="ad-container w-full flex justify-center">
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-5873759177520564"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdComponent;
