import React from 'react';
import { Mail, Instagram, Linkedin, Phone, ShieldCheck, ArrowUpRight, Lock, FileCheck2, Scale } from 'lucide-react';
import { LegalTabId } from './LegalComplianceModal';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
  onOpenLegal: (tab: LegalTabId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenAdmin, onOpenLegal }) => {
  return (
    <footer className="bg-[#FAF8F2] border-t border-[#163832]/12 pt-14 sm:pt-20 pb-10 sm:pb-12 relative text-[#051F20] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 sm:gap-12 pb-12 sm:pb-14 border-b border-[#163832]/10">
          
          {/* Column 1: Brand & UK Entity (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-5">
                <img
                  src="/logo-siren-new.png"
                  alt="Sirenexis"
                  className="h-10 sm:h-13 w-auto object-contain shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = 'https://i.postimg.cc/MHPc5Z5K/Artboard-1.png';
                  }}
                />
                <span
                  className="font-sans font-bold tracking-tight text-2xl sm:text-3xl text-[#0B2B26]"
                  style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Plus Jakarta Sans', system-ui, sans-serif" }}
                >
                  SIRENEXIS
                </span>
              </div>

              <p className="text-[15px] leading-[1.65] text-[#163832]/85 max-w-sm mb-6">
                UK-managed customer support teams for growing British SMEs. Your dedicated support agent for half the cost of a UK hire.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#235347] bg-[#DAF1DE]/60 px-3 py-1.5 rounded-lg border border-[#8EB69B]/40 w-fit">
              <ShieldCheck className="w-4 h-4 text-[#235347] shrink-0" />
              <span>English Law • UK Entity • UK Bank</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#235347] mb-4 sm:mb-5">
              Navigation
            </h4>
            <ul className="space-y-3 text-[14.5px] text-[#163832]/85">
              <li>
                <a href="#how-it-works" className="hover:text-[#051F20] transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#what-we-cover" className="hover:text-[#051F20] transition-colors">
                  What We Cover
                </a>
              </li>
              <li>
                <a href="#roi-calculator" className="hover:text-[#051F20] transition-colors">
                  UK Hire Cost &amp; ROI Calculator
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[#051F20] transition-colors">
                  Simple Monthly Pricing
                </a>
              </li>
              <li>
                <a href="#pilot" className="hover:text-[#051F20] transition-colors">
                  2-Week Paid Pilot
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Interactive Legal, Trust & Governance (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#235347] mb-4 sm:mb-5">
              Legal &amp; Governance
            </h4>
            <ul className="space-y-3 text-[14px] text-[#163832]/85">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-[#051F20] hover:underline underline-offset-4 transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-[#051F20] hover:underline underline-offset-4 transition-colors text-left cursor-pointer"
                >
                  Terms &amp; Master MSA
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('gdpr')}
                  className="hover:text-[#051F20] hover:underline underline-offset-4 transition-colors text-left cursor-pointer"
                >
                  UK GDPR &amp; ICO IDTA
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenLegal('security')}
                  className="hover:text-[#051F20] hover:underline underline-offset-4 transition-colors text-left cursor-pointer"
                >
                  Data Security &amp; NDA
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Consultation (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#235347] mb-4 sm:mb-5">
              Contact &amp; UK Entity
            </h4>
            <ul className="space-y-3.5 text-[14px] text-[#163832]/90">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#235347] shrink-0" />
                <a href="mailto:info@sirenexis.com" className="hover:text-[#051F20] underline-offset-2 hover:underline">
                  info@sirenexis.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Linkedin className="w-4 h-4 text-[#235347] shrink-0" />
                <a
                  href="https://www.linkedin.com/company/sirenexis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#051F20] underline-offset-2 hover:underline"
                >
                  LinkedIn: Sirenexis
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram className="w-4 h-4 text-[#235347] shrink-0" />
                <a
                  href="https://www.instagram.com/sirenexis?rpxt=MTU1bGNjenAzYzlqZw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#051F20] underline-offset-2 hover:underline"
                >
                  @sirenexis
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#235347] shrink-0" />
                <a href="tel:+447552242207" className="hover:text-[#051F20] underline-offset-2 hover:underline">
                  UK: +44 7552 242207
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#051F20] hover:text-[#235347] py-1 cursor-pointer"
              >
                <span>Book a 15-Min Briefing</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* ICO / UK Registration & Security Compliance Bar */}
        <div className="py-5 border-b border-[#163832]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#163832]/85">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2.5">
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="inline-flex items-center gap-2 font-medium hover:text-[#051F20] transition-colors cursor-pointer"
            >
              <Scale className="w-3.5 h-3.5 text-[#235347] shrink-0" />
              <span>UK Registered Company (English &amp; Welsh Law)</span>
            </button>
            <span className="hidden sm:inline text-[#163832]/30" aria-hidden="true">•</span>
            <button
              type="button"
              onClick={() => onOpenLegal('security')}
              className="inline-flex items-center gap-2 font-medium hover:text-[#051F20] transition-colors cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5 text-[#235347] shrink-0" />
              <span>100% Back-to-Back NDA Protected</span>
            </button>
            <span className="hidden sm:inline text-[#163832]/30" aria-hidden="true">•</span>
            <button
              type="button"
              onClick={() => onOpenLegal('gdpr')}
              className="inline-flex items-center gap-2 font-medium hover:text-[#051F20] transition-colors cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5 text-[#235347] shrink-0" />
              <span>UK GDPR &amp; ICO IDTA Compliant</span>
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-[#235347]">
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:underline underline-offset-4 cursor-pointer"
            >
              Privacy Policy
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onOpenLegal('terms')}
              className="hover:underline underline-offset-4 cursor-pointer"
            >
              Terms of Service
            </button>
            <span aria-hidden="true">·</span>
            <button
              type="button"
              onClick={() => onOpenLegal('security')}
              className="hover:underline underline-offset-4 cursor-pointer"
            >
              Security &amp; NDA
            </button>
          </div>
        </div>

        {/* Small Bottom Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#235347]/90 font-medium text-center sm:text-left">
          <div>
            Sirenexis • UK Entity • UK Bank • English Law • © 2026
          </div>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
            <span>UK Companies House Registered</span>
            <span>All rights reserved</span>
            {/* Subtle discreet staff icon */}
            <button
              type="button"
              onClick={onOpenAdmin}
              aria-label="Staff & Admin Portal"
              title="Staff & Admin Portal"
              className="opacity-35 hover:opacity-100 text-[#163832] hover:text-[#051F20] transition-opacity p-1 -m-1 rounded hover:bg-black/5 cursor-pointer flex items-center gap-1 group"
            >
              <Lock className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
              <span className="sr-only">Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

