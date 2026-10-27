import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Headphones, Mail, MessageSquare, PhoneCall } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenPilot: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenPilot }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // High-fidelity editorial workspace photo
  const heroImageSrc = "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80";

  // Throttled scroll listener with requestAnimationFrame for smooth 60fps parallax
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          // Only track when Hero is in view
          if (currentY < 1400) {
            setScrollY(currentY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Multi-depth parallax offsets (subtle speeds to avoid motion sickness or layout shifts)
  const parallaxDeepBg = Math.round(scrollY * 0.22);       // Layer 1: ambient top-right glow
  const parallaxMidBg = Math.round(scrollY * -0.16);       // Layer 2: bottom-left warm pool
  const parallaxRing = Math.round(scrollY * 0.32);         // Layer 3: architectural concentric rings
  const parallaxPhotoGlow = Math.round(scrollY * 0.14);    // Layer 4: right-side photo ambient backglow
  const ringRotation = (scrollY * 0.04).toFixed(2);

  return (
    <section className="relative pt-24 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 md:pb-28 overflow-hidden bg-[#FAF8F2]">
      {/* 1. Deep Layer: Top-Right Luminous Emerald Orb (moves gently downward on scroll) */}
      <div
        className="absolute top-0 right-1/4 w-[620px] h-[620px] bg-gradient-to-br from-[#DAF1DE]/50 via-[#8EB69B]/25 to-transparent rounded-full blur-[140px] pointer-events-none will-change-transform"
        style={{ transform: `translate3d(0, ${parallaxDeepBg}px, 0)` }}
        aria-hidden="true"
      />

      {/* 2. Inverse Layer: Bottom-Left Warm Radiant Pool (moves subtly upward on scroll) */}
      <div
        className="absolute -bottom-16 left-6 sm:left-12 w-[520px] h-[520px] bg-gradient-to-tr from-[#F4F0E6] via-[#DAF1DE]/30 to-transparent rounded-full blur-[130px] pointer-events-none will-change-transform"
        style={{ transform: `translate3d(0, ${parallaxMidBg}px, 0)` }}
        aria-hidden="true"
      />

      {/* 3. Architectural Contour Layer: Concentric British Geometry (rotates & shifts with scroll) */}
      <div
        className="absolute -top-12 right-12 sm:right-32 w-[480px] h-[480px] rounded-full border border-[#8EB69B]/20 pointer-events-none hidden md:flex items-center justify-center will-change-transform"
        style={{
          transform: `translate3d(0, ${parallaxRing}px, 0) rotate(${ringRotation}deg)`,
        }}
        aria-hidden="true"
      >
        <div className="w-[340px] h-[340px] rounded-full border border-[#235347]/10" />
        <div className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-[#8EB69B]/25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Text & Editorial Proposition */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Eyebrow with Apple Keynote Shimmer */}
            <div className="inline-flex items-center gap-2 mb-5 max-w-full">
              <span className="text-[10.5px] sm:text-[12px] font-semibold uppercase tracking-[0.11em] sm:tracking-[0.18em] text-[#235347] bg-[#DAF1DE]/70 px-3 py-1 rounded-full border border-[#8EB69B]/40 shadow-xs leading-snug">
                <span className="apple-badge-shimmer">UK-Managed Customer Support for UK SMEs</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-[36px] sm:text-[56px] lg:text-[72px] leading-[1.08] sm:leading-[1.06] font-medium tracking-tight text-[#051F20] text-balance mb-5 sm:mb-6">
              Your dedicated support team — for half the cost of a UK hire.
            </h1>

            {/* Subtext */}
            <p className="text-[16px] sm:text-[19px] leading-[1.65] text-[#163832]/85 max-w-2xl mb-8 sm:mb-9 font-normal">
              Sirenexis gives you a dedicated, trained support agent who works only for you — answering emails, live chat, WhatsApp and calls. Fully managed, quality-assured, and contracted through our UK entity. No £25k-£35k UK hire overhead.
            </p>

            {/* CTAs with Apple Micro-Spring Physics */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-8 sm:mb-10">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-4 text-[15px] font-medium text-[#FAF8F2] bg-[#051F20] rounded-xl hover:bg-[#0B2B26] shadow-[0_12px_28px_rgba(5,31,32,0.18)] hover:shadow-[0_18px_38px_rgba(5,31,32,0.26)] transition-all duration-200 cursor-pointer apple-spring-button whitespace-nowrap btn-shimmer group"
              >
                <span>Book a 15-Min Call</span>
                <ArrowRight className="w-4 h-4 text-[#8EB69B] group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenPilot}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 text-[15px] font-medium text-[#163832] bg-transparent hover:bg-[#DAF1DE]/50 border border-[#163832]/25 rounded-xl transition-all duration-200 cursor-pointer apple-spring-button whitespace-nowrap"
              >
                <span>See How The Pilot Works</span>
              </button>
            </div>

            {/* Trust Strip */}
            <div className="pt-5 sm:pt-6 border-t border-[#163832]/12">
              <div className="flex flex-wrap items-center gap-y-2 gap-x-2.5 sm:gap-x-4 text-[12.5px] sm:text-[14px] text-[#235347] font-medium">
                <span className="flex items-center gap-1.5 text-[#0B2B26]">
                  <ShieldCheck className="w-4 h-4 text-[#235347] shrink-0" />
                  UK Contract
                </span>
                <span className="text-[#8EB69B] font-bold" aria-hidden="true">•</span>
                <span>English Law</span>
                <span className="text-[#8EB69B] font-bold" aria-hidden="true">•</span>
                <span>UK Bank</span>
                <span className="text-[#8EB69B] font-bold" aria-hidden="true">•</span>
                <span>GDPR Compliant</span>
                <span className="text-[#8EB69B] font-bold" aria-hidden="true">•</span>
                <span className="flex items-center gap-1.5 text-[#0B2B26]">
                  <CheckCircle2 className="w-4 h-4 text-[#235347] shrink-0" />
                  Daily QA
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Layered Editorial Visual + Floating Elements */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Subtle Ambient Glow Behind Visual */}
              <div 
                className="absolute -top-10 right-0 sm:-right-10 w-64 sm:w-72 h-64 sm:h-72 rounded-full bg-gradient-to-br from-[#DAF1DE]/70 via-[#8EB69B]/30 to-transparent blur-3xl pointer-events-none animate-pulse-glow -z-10 will-change-transform"
                style={{ transform: `translate3d(0, ${parallaxPhotoGlow}px, 0)` }}
                aria-hidden="true" 
              />

              {/* Floating Live Status Badge */}
              <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 liquid-glass px-3 sm:px-3.5 py-1.5 rounded-full shadow-[0_12px_28px_rgba(5,31,32,0.14)] border border-white/80 flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#0B2B26] animate-subtle-float-reverse">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#235347] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#235347]" />
                </span>
                <span>UK Operations Active</span>
              </div>
              
              {/* Main Image Frame */}
              <div className="relative rounded-[24px] sm:rounded-[28px] overflow-hidden aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] shadow-[0_24px_50px_rgba(5,31,32,0.12)] border border-[#163832]/10 bg-[#F4F0E6]">
                <img
                  src={heroImageSrc}
                  alt="Modern British workspace and dedicated support operations"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    // Fallback to stylized editorial SVG visual if network is constrained
                    e.currentTarget.style.display = 'none';
                  }}
                />
                
                {/* Fallback stylized container if image is loading/offline */}
                <div className={`absolute inset-0 bg-gradient-to-br from-[#FAF8F2] via-[#F4F0E6] to-[#DAF1DE] p-6 sm:p-8 flex flex-col justify-between ${imageLoaded ? 'hidden' : 'flex'}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[#235347] font-semibold">Sirenexis Studio</span>
                    <Headphones className="w-6 h-6 text-[#235347]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#051F20] mb-2">Dedicated British Standards</h3>
                    <p className="text-sm text-[#163832]">Continuous inbox management and phone support tailored to UK SME operations.</p>
                  </div>
                </div>

                {/* Subtle vignette scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#051F20]/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Signature Liquid Glass Floating Card */}
              <div className="relative -mt-14 mx-auto w-[calc(100%-1.25rem)] sm:w-auto sm:mt-0 sm:absolute sm:-bottom-8 sm:-left-8 sm:max-w-sm liquid-glass p-4 sm:p-6 rounded-[22px] sm:rounded-[24px] shadow-[0_20px_48px_rgba(5,31,32,0.14)] border border-white/80 animate-subtle-float will-change-transform z-20 apple-spotlight card-lift">
                <div className="flex items-start justify-between gap-2 sm:gap-3 mb-3.5">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#DAF1DE] border border-[#8EB69B]/60 flex items-center justify-center text-[#051F20] font-serif text-base sm:text-lg font-bold shrink-0">
                      S
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] sm:text-[14px] font-semibold text-[#051F20] truncate">Dedicated Specialist</span>
                        <span className="w-2 h-2 rounded-full bg-[#235347] shrink-0" />
                      </div>
                      <span className="text-[11px] sm:text-[12px] text-[#235347] font-medium block truncate">Accent-tested & SOP-trained</span>
                    </div>
                  </div>
                  <span className="text-[10.5px] sm:text-[11px] font-semibold text-[#0B2B26] bg-[#DAF1DE] px-2 py-0.5 rounded-full border border-[#8EB69B]/40 whitespace-nowrap shrink-0">
                    1:1 Dedicated
                  </span>
                </div>

                {/* Performance stats inside glass */}
                <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-[#163832]/10 mb-3.5">
                  <div className="bg-[#FAF8F2]/60 rounded-xl p-2.5 border border-white/60">
                    <div className="text-[10.5px] sm:text-[11px] text-[#235347] uppercase tracking-wider font-medium">Daily QA Score</div>
                    <div className="text-base sm:text-lg font-bold text-[#051F20] font-serif tabular-nums">99.4%</div>
                  </div>
                  <div className="bg-[#FAF8F2]/60 rounded-xl p-2.5 border border-white/60">
                    <div className="text-[10.5px] sm:text-[11px] text-[#235347] uppercase tracking-wider font-medium">First Response</div>
                    <div className="text-base sm:text-lg font-bold text-[#051F20] font-serif tabular-nums">&lt; 3 mins</div>
                  </div>
                </div>

                {/* Covered channels strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#163832] font-medium pt-1">
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-[#235347]" /> Email
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-[#235347]" /> Chat
                  </span>
                  <span className="flex items-center gap-1">
                    <PhoneCall className="w-3.5 h-3.5 text-[#235347]" /> Phone
                  </span>
                  <span className="text-[11px] text-[#235347] bg-[#FAF8F2] px-2 py-0.5 rounded-md border border-[#163832]/10">
                    WhatsApp
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
