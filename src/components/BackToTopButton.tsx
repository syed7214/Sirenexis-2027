import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const checkScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const heroEl = document.getElementById('hero');
          if (heroEl) {
            const rect = heroEl.getBoundingClientRect();
            // Show once the bottom of the hero section scrolls past the top of the viewport
            setVisible(rect.bottom <= 80);
          } else {
            const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
            setVisible(scrollTop > 650);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });
    checkScroll();

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 group flex items-center gap-2 rounded-full bg-[#051F20]/95 text-[#FAF8F2] border border-[#8EB69B]/40 shadow-[0_14px_34px_rgba(5,31,32,0.28)] backdrop-blur-md p-3 sm:px-4 sm:py-3 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#163832] hover:border-[#DAF1DE]/60 hover:shadow-[0_18px_40px_rgba(5,31,32,0.38)] active:scale-95 cursor-pointer ${
        visible
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
      }`}
    >
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#DAF1DE]/15 text-[#DAF1DE] group-hover:bg-[#DAF1DE] group-hover:text-[#051F20] transition-colors duration-200">
        <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
      </span>
      <span className="hidden sm:inline text-xs font-semibold uppercase tracking-[0.14em] text-[#FAF8F2] pr-0.5">
        Top
      </span>
    </button>
  );
};
