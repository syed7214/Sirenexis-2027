import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docElement = document.documentElement;
          const body = document.body;
          const scrollTop = window.scrollY || docElement.scrollTop || body.scrollTop || 0;
          const scrollHeight =
            Math.max(
              docElement.scrollHeight,
              body.scrollHeight,
              docElement.offsetHeight,
              body.offsetHeight,
              docElement.clientHeight
            ) - window.innerHeight;

          if (scrollHeight > 0) {
            const progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
            setScrollProgress(progress);
          } else {
            setScrollProgress(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] pointer-events-none bg-transparent"
      aria-hidden="true"
    >
      {/* Active progress fill */}
      <div
        className="h-full bg-gradient-to-r from-[#163832] via-[#235347] to-[#8EB69B] origin-left shadow-[0_1px_6px_rgba(142,182,155,0.45)] transition-transform duration-75 ease-out will-change-transform"
        style={{
          transform: `scaleX(${scrollProgress})`,
        }}
      />
    </div>
  );
};
