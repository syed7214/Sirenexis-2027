import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const isClickScrollingRef = React.useRef(false);
  const clickScrollTimeoutRef = React.useRef<number | null>(null);

  const navLinks = [
    { name: 'What We Cover', href: '#what-we-cover' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Why UK-Managed', href: '#why-uk-managed' },
    { name: 'Pricing', href: '#pricing' },
  ];

  useEffect(() => {
    const sectionIds = ['what-we-cover', 'how-it-works', 'why-uk-managed', 'pricing'];

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      if (isClickScrollingRef.current) return;

      // Clear active highlight when near the top of the page (Hero area)
      if (scrollY < 260) {
        setActiveSection('');
        return;
      }

      const triggerLine = Math.min(180, window.innerHeight * 0.28);
      let currentActive = '';
      let closestTop = -Infinity;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();

        // Direct hit: section spans across the viewport trigger line
        if (rect.top <= triggerLine && rect.bottom >= 110) {
          currentActive = `#${id}`;
          break;
        }

        // Fallback for adjacent companion blocks (e.g. Pilot / ROI Calculator right below a tracked section)
        if (rect.top <= triggerLine && rect.bottom > -420 && rect.top > closestTop) {
          closestTop = rect.top;
          currentActive = `#${id}`;
        }
      }

      setActiveSection(currentActive);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (clickScrollTimeoutRef.current) {
        window.clearTimeout(clickScrollTimeoutRef.current);
      }
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);

    setActiveSection(href);
    setMobileMenuOpen(false);

    if (targetEl) {
      isClickScrollingRef.current = true;
      if (clickScrollTimeoutRef.current) {
        window.clearTimeout(clickScrollTimeoutRef.current);
      }

      const headerOffset = 92;
      const elementPosition = targetEl.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = Math.max(0, elementPosition - headerOffset);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      clickScrollTimeoutRef.current = window.setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 750);
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveSection('');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 max-w-6xl mx-auto w-full">
        <div
          className={`w-full rounded-full transition-all duration-300 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8 px-4 sm:px-7 py-2.5 sm:py-3 ${
            scrolled
              ? 'liquid-glass shadow-[0_18px_40px_rgba(5,31,32,0.12)] border border-white/80 backdrop-blur-2xl'
              : 'liquid-glass shadow-[0_10px_30px_rgba(5,31,32,0.06)] border border-white/60'
          }`}
        >
          {/* Brand Zone */}
          <a
            href="#"
            onClick={handleLogoClick}
            className="flex items-center gap-1.5 sm:gap-2 text-[#051F20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#235347] rounded-lg group transition-transform active:scale-[0.98] shrink-0 min-w-0"
          >
            <img
              src="/logo-siren-new.png"
              alt="Sirenexis"
              className="h-8 sm:h-11 md:h-12 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              onError={(e) => {
                e.currentTarget.src = 'https://i.postimg.cc/MHPc5Z5K/Artboard-1.png';
              }}
            />
            <span
              className="font-bold tracking-tight text-lg sm:text-2xl text-[#0B2B26] shrink-0"
              style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'SF Pro', system-ui, sans-serif" }}
            >
              SIRENEXIS
            </span>
            <span className="hidden lg:inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#235347] bg-[#DAF1DE]/70 px-2.5 py-0.5 rounded-full border border-[#8EB69B]/40 transition-transform group-hover:scale-105 shrink-0">
              <svg className="w-4 h-2.5 rounded-[2px] overflow-hidden shrink-0 shadow-[0_0_1px_rgba(0,0,0,0.3)]" viewBox="0 0 60 30" aria-label="UK Flag">
                <rect width="60" height="30" fill="#012169"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2.5"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
              </svg>
              <span>UK Managed</span>
            </span>
          </a>

          {/* Nav Links: Scroll-spy active pill & frosted hover */}
          <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-1 lg:gap-1.5 text-[14.5px] font-medium text-[#163832] shrink-0">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative px-3.5 py-1.5 rounded-full transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] whitespace-nowrap active:scale-[0.96] flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#051F20] text-[#FAF8F2] font-semibold shadow-[0_4px_14px_rgba(5,31,32,0.18)]'
                      : 'text-[#163832] hover:text-[#051F20] hover:bg-[#163832]/6'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-[#8EB69B] scale-100 opacity-100' : 'bg-transparent scale-0 opacity-0 w-0'
                    }`}
                  />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </nav>

          {/* Primary Action Button */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-medium text-[#FAF8F2] bg-[#051F20] rounded-xl hover:bg-[#0B2B26] hover:shadow-lg transition-all duration-250 cursor-pointer apple-spring-button whitespace-nowrap group"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-4 h-4 text-[#8EB69B] group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#051F20] rounded-lg hover:bg-black/5 transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 liquid-glass rounded-2xl p-4 sm:p-5 shadow-2xl border border-white/80 max-h-[calc(100dvh-5rem)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`px-3.5 py-2.5 text-base rounded-xl transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-[#051F20] text-[#FAF8F2] font-semibold shadow-sm'
                        : 'font-medium text-[#163832] hover:text-[#051F20] hover:bg-[#DAF1DE]/40'
                    }`}
                  >
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#DAF1DE] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8EB69B]" />
                        Active
                      </span>
                    )}
                  </a>
                );
              })}
              <div className="pt-3 border-t border-[#163832]/10 mt-1 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-[#FAF8F2] bg-[#051F20] rounded-xl hover:bg-[#0B2B26] transition-all"
                >
                  <span>Book a Call</span>
                  <ArrowRight className="w-4 h-4 text-[#8EB69B]" />
                </button>
                <div className="flex items-center justify-center gap-1.5 text-xs text-[#235347] py-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#235347] shrink-0" />
                  <span>English Law Contract • UK Bank</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
