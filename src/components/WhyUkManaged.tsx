import React from 'react';
import { Landmark, UserCheck, ShieldAlert, ArrowRight, Check } from 'lucide-react';

interface WhyUkManagedProps {
  onOpenBooking: () => void;
}

export const WhyUkManaged: React.FC<WhyUkManagedProps> = ({ onOpenBooking }) => {
  return (
    <section id="why-uk-managed" className="py-24 sm:py-32 bg-[#FAF8F2] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] apple-badge-shimmer">
              Why UK-Managed
            </span>
          </div>
          <h2 className="font-serif text-[40px] sm:text-[54px] leading-[1.1] font-medium text-[#051F20] mb-4 text-balance">
            Offshore cost. Onshore accountability.
          </h2>
          <p className="text-[17px] leading-[1.65] text-[#163832]/85">
            Sirenexis combines the cost advantages of global dedicated specialists with the legal certainty, data protection, and direct escalation of an established British company.
          </p>
        </div>

        {/* 3 Pillars / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Card 1: UK Entity & Contract */}
          <div className="liquid-glass p-8 sm:p-9 rounded-[26px] border border-white/80 shadow-[0_16px_40px_rgba(5,31,32,0.06)] hover:shadow-[0_20px_48px_rgba(5,31,32,0.1)] card-lift apple-spotlight transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#DAF1DE] border border-[#8EB69B]/40 flex items-center justify-center text-[#051F20] mb-6">
                <Landmark className="w-6 h-6 text-[#235347]" />
              </div>
              
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#235347] block mb-2">
                Pillar 01
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#051F20] mb-3">
                UK Entity & Contract
              </h3>
              
              <p className="text-[15.5px] leading-[1.65] text-[#163832]/85 mb-6">
                Master Services Agreement under English law with liability cap and SLAs. You pay to our UK bank.
              </p>
            </div>

            <div className="pt-6 border-t border-[#163832]/10 space-y-2.5 text-xs text-[#0B2B26] font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#235347]" />
                <span>UK Companies House Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#235347]" />
                <span>BACS & UK Faster Payments to UK Bank</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#235347]" />
                <span>Clear contractual SLAs with English jurisdiction</span>
              </div>
            </div>
          </div>

          {/* Card 2: UK Point of Contact */}
          <div className="liquid-glass-mint p-8 sm:p-9 rounded-[26px] border border-[#8EB69B]/45 shadow-[0_16px_40px_rgba(5,31,32,0.08)] hover:shadow-[0_20px_48px_rgba(5,31,32,0.12)] card-lift apple-spotlight transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F2] border border-[#8EB69B]/50 flex items-center justify-center text-[#051F20] mb-6 shadow-sm">
                <UserCheck className="w-6 h-6 text-[#235347]" />
              </div>

              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0B2B26] block mb-2">
                Pillar 02 — Direct Senior Lead
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#051F20] mb-3">
                UK Point of Contact
              </h3>

              <p className="text-[15.5px] leading-[1.65] text-[#0B2B26]/90 mb-6">
                Our UK operations team (legally trained) is your single escalation — 9am-5pm UK on phone and Slack. Not a ticket queue.
              </p>
            </div>

            <div className="pt-6 border-t border-[#235347]/15 space-y-2.5 text-xs text-[#0B2B26] font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#235347]" />
                <span>Direct Slack / Teams channel with UK operations</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#235347]" />
                <span>Daily QA reviews & proactive coaching</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#235347]" />
                <span>Immediate escalation without waiting queues</span>
              </div>
            </div>
          </div>

          {/* Card 3: Data Protection First */}
          <div className="liquid-glass p-8 sm:p-9 rounded-[26px] border border-white/80 shadow-[0_16px_40px_rgba(5,31,32,0.06)] hover:shadow-[0_20px_48px_rgba(5,31,32,0.1)] card-lift apple-spotlight transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#DAF1DE] border border-[#8EB69B]/40 flex items-center justify-center text-[#051F20] mb-6">
                <ShieldAlert className="w-6 h-6 text-[#235347]" />
              </div>

              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#235347] block mb-2">
                Pillar 03
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#051F20] mb-3">
                Data Protection First
              </h3>

              <p className="text-[15.5px] leading-[1.65] text-[#163832]/85 mb-6">
                DPA + International Data Transfer Agreement (IDTA) + Transfer Risk Assessment for Pakistan. 2FA, encryption, client-owned helpdesk.
              </p>
            </div>

            <div className="pt-6 border-t border-[#163832]/10 space-y-2.5 text-xs text-[#0B2B26] font-medium">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#235347]" />
                <span>ICO UK GDPR compliant framework</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#235347]" />
                <span>Zero data extraction — stays in your tools</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#235347]" />
                <span>End-to-end encrypted hardware & 2FA</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA banner */}
        <div className="p-8 sm:p-10 rounded-[24px] bg-[#051F20] text-[#FAF8F2] flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8EB69B] font-semibold block mb-1">
              Zero Guesswork
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-medium">
              Review our UK Master Services Agreement & DPA template
            </h4>
            <p className="text-sm text-[#8EB69B] mt-1">
              Legally drafted for UK SMEs with complete transparent terms and confidentiality covenants.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FAF8F2] text-[#051F20] hover:bg-[#DAF1DE] font-medium text-sm transition-all whitespace-nowrap cursor-pointer shadow"
          >
            <span>Request Legal Pack & Call</span>
            <ArrowRight className="w-4 h-4 text-[#235347]" />
          </button>
        </div>

      </div>
    </section>
  );
};
