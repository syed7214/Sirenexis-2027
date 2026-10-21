import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'What We Cover', href: '#what-we-cover' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Why UK-Managed', href: '#why-uk-managed' },
  ];

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 max-w-6xl mx-auto`}
      >
        <div
          className={`w-full rounded-full transition-all duration-300 px-5 sm:px-7 py-3 flex items-center justify-between gap-6 ${
            scrolled
              ? 'liquid-glass shadow-[0_16px_36px_rgba(5,31,32,0.12)] border border-white/70'
              : 'liquid-glass shadow-[0_10px_30px_rgba(5,31,32,0.06)] border border-white/50'
          }`}
        >
          {/* Brand Zone */}
          <a
            href="#"
            className="flex items-center gap-1 sm:gap-1.5 text-[#051F20] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#235347] rounded-lg group"
          >
            <img
              src="/logo-siren-trimmed.png"
              alt="Sirenexis"
              className="h-10 sm:h-11 md:h-12 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.currentTarget.src = 'https://i.postimg.cc/j2Cy6H0X/logo-siren-GREEN-2.png';
              }}
            />
            <span
              className="font-bold tracking-tight text-xl sm:text-2xl text-[#0B2B26]"
              style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'SF Pro', system-ui, sans-serif" }}
            >
              SIRENEXIS
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#235347] bg-[#DAF1DE]/70 px-2.5 py-0.5 rounded-full border border-[#8EB69B]/40">
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

          {/* Nav Links: Clean typography */}
          <nav className="hidden md:flex items-center gap-7 text-[14.5px] font-medium text-[#163832]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#051F20] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#235347] hover:after:w-full after:transition-all after:duration-250 whitespace-nowrap"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Primary Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-medium text-[#FAF8F2] bg-[#051F20] rounded-xl hover:bg-[#0B2B26] hover:shadow-lg transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-4 h-4 text-[#8EB69B]" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#051F20] rounded-lg hover:bg-black/5 transition-colors"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 liquid-glass rounded-2xl p-5 shadow-2xl border border-white/80 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-base font-medium text-[#163832] hover:text-[#051F20] hover:bg-[#DAF1DE]/40 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
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
                  <ShieldCheck className="w-3.5 h-3.5 text-[#235347]" />
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
