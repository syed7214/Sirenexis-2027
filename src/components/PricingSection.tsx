import React from 'react';
import { Check, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { SpotlightCard } from './SpotlightCard';

interface PricingSectionProps {
  onOpenBooking: (plan?: string) => void;
  onOpenCalculator: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBooking, onOpenCalculator }) => {
  return (
    <section id="pricing" className="py-16 sm:py-24 lg:py-32 bg-[#FAF8F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] apple-badge-shimmer">
                Investment & Plans
              </span>
            </div>
            <h2 className="font-serif text-[36px] sm:text-[56px] leading-[1.08] font-medium text-[#051F20] mb-3">
              Simple monthly pricing
            </h2>
            <p className="text-[16px] sm:text-[18px] text-[#163832]/85">
              One dedicated agent. No hourly billing.
            </p>
          </div>
        </ScrollReveal>

        {/* 3-Tier Grid with Liquid Glass */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 sm:gap-8 items-stretch mb-12">
          
          {/* Plan 1: PART-TIME DEDICATED */}
          <ScrollReveal delay={0} direction="up" className="flex">
            <SpotlightCard className="w-full liquid-glass p-6 sm:p-9 rounded-[26px] sm:rounded-[28px] border border-white/80 shadow-[0_16px_40px_rgba(5,31,32,0.06)] hover:shadow-[0_24px_50px_rgba(5,31,32,0.12)] flex flex-col justify-between">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#235347] bg-[#DAF1DE]/70 px-3 py-1 rounded-md border border-[#8EB69B]/40">
                    PART-TIME DEDICATED
                  </span>
                </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-5xl sm:text-6xl font-normal text-[#051F20] tabular-nums tracking-tight">
                    £1,495
                  </span>
                  <span className="text-[#163832]/70 font-medium text-base">/month</span>
                </div>
                <div className="text-xs font-medium text-[#235347] mt-1.5">
                  20 hrs/week • Mon-Fri 9am-5:30pm UK
                </div>
              </div>

              <p className="text-[15px] text-[#163832]/90 font-medium mb-6 pb-6 border-b border-[#163832]/10">
                Includes hiring, training, QA and cover
              </p>

              <div className="space-y-3.5 text-sm text-[#051F20] mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span>1 Dedicated Agent (20 hours per week)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span>Email, Live Chat & WhatsApp coverage</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span>Phone answering added post 2-week QA</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span>Trained backup cover agent included</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span>UK Contract & English Law SLA</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking('Part-Time Dedicated (£1,495/mo)')}
              className="w-full py-3.5 px-6 rounded-xl border border-[#163832]/25 text-[#163832] font-medium text-sm hover:bg-[#DAF1DE]/40 transition-all cursor-pointer flex items-center justify-center gap-2 apple-spring-button btn-shimmer group"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </SpotlightCard>
        </ScrollReveal>

        {/* Plan 2: FULL-TIME DEDICATED (FEATURED - ELEVATED) */}
        <ScrollReveal delay={120} direction="up" className="flex mt-2 lg:mt-0">
          <SpotlightCard className="w-full liquid-glass-mint border-2 border-[#8EB69B] rounded-[26px] sm:rounded-[30px] p-6 sm:p-9 flex flex-col justify-between shadow-[0_24px_50px_rgba(5,31,32,0.12)] hover:shadow-[0_30px_60px_rgba(5,31,32,0.18)] relative lg:-translate-y-2">
            
            {/* Elevated Badge */}
            <div className="absolute top-3.5 sm:top-4 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#051F20] text-[#FAF8F2] text-[11px] font-bold uppercase tracking-[0.16em] px-4 py-1 rounded-full shadow-md z-10">
              MOST POPULAR
            </div>

            <div className="pt-6 sm:pt-5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 mt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B2B26] bg-[#DAF1DE] px-3 py-1 rounded-md border border-[#8EB69B]/40">
                  FULL-TIME DEDICATED
                </span>
                <span className="text-xs text-[#235347] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" /> Complete Coverage
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-5xl sm:text-6xl font-normal text-[#051F20] tabular-nums tracking-tight">
                    £2,495
                  </span>
                  <span className="text-[#0B2B26]/80 font-medium text-base">/month</span>
                </div>
                <div className="text-xs font-semibold text-[#0B2B26] mt-1.5">
                  40 hrs/week • Mon-Fri 9am-5:30pm UK
                </div>
              </div>

              <p className="text-[15px] text-[#051F20] font-semibold mb-6 pb-6 border-b border-[#235347]/20">
                Includes hiring, training, QA and cover
              </p>

              <div className="space-y-3.5 text-sm text-[#051F20] mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span className="font-medium">1 Dedicated Full-Time Agent (40 hrs/wk)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span>Full channels: Email, Live Chat, WhatsApp & Phone</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span>Instant voice answering & continuous zero-inbox</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span>Trained backup cover agent for holidays & sick days</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span>Direct Slack / Teams escalation channel with UK team</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span>Daily QA checks, call recordings & English law SLA</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking('Full-Time Dedicated (£2,495/mo)')}
              className="w-full py-4 px-6 rounded-xl bg-[#051F20] text-[#FAF8F2] hover:bg-[#0B2B26] font-medium text-sm transition-all shadow-[0_8px_20px_rgba(5,31,32,0.18)] cursor-pointer flex items-center justify-center gap-2 apple-spring-button btn-shimmer group"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-4 h-4 text-[#8EB69B] group-hover:translate-x-1 transition-transform" />
            </button>
          </SpotlightCard>
        </ScrollReveal>

        {/* Plan 3: 2-WEEK PAID PILOT */}
        <ScrollReveal delay={240} direction="up" className="flex">
          <SpotlightCard className="w-full liquid-glass p-6 sm:p-9 rounded-[26px] sm:rounded-[28px] border border-white/80 shadow-[0_16px_40px_rgba(5,31,32,0.06)] hover:shadow-[0_24px_50px_rgba(5,31,32,0.12)] flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#235347] bg-[#DAF1DE]/70 px-3 py-1 rounded-md border border-[#8EB69B]/40">
                  2-WEEK PAID PILOT
                </span>
                <span className="text-xs font-bold text-[#235347]">
                  Risk-Free
                </span>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="font-serif text-5xl sm:text-6xl font-normal text-[#051F20] tabular-nums tracking-tight">
                    £750
                  </span>
                  <span className="text-[#163832]/70 font-medium text-base">one-time</span>
                </div>
                <div className="text-xs font-medium text-[#235347] mt-1.5">
                  20 hrs/week • 100% Money-Back Guarantee
                </div>
              </div>

              <p className="text-[15px] text-[#163832]/90 font-medium mb-6 pb-6 border-b border-[#163832]/10">
                Try before you commit
              </p>

              <div className="space-y-3.5 text-sm text-[#051F20] mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span>2 Weeks dedicated trial (20 hours per week)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span>30-min SOP & macro intake call</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span>Read-only shadowing then supervised live inbox</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span>Daily Loom video review and 100% QA audits</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5" />
                  <span>100% money-back guarantee if unsatisfied</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenBooking('2-Week Paid Pilot (£750)')}
              className="w-full py-3.5 px-6 rounded-xl border border-[#163832]/25 text-[#163832] font-medium text-sm hover:bg-[#DAF1DE]/40 transition-all cursor-pointer flex items-center justify-center gap-2 apple-spring-button btn-shimmer group"
            >
              <span>Start 2-Week Pilot</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </SpotlightCard>
        </ScrollReveal>

        </div>

        {/* Pricing Guarantee Footer */}
        <div className="text-center max-w-3xl mx-auto pt-6 border-t border-[#163832]/10 text-sm text-[#163832]/85 leading-relaxed">
          <p className="font-medium text-[#051F20]">
            All plans include recruitment, training, QA, cover agent and UK escalation. £350 setup credited if you continue after pilot. 3-month minimum then 30-day rolling.
          </p>
          <div className="mt-4">
            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-[#235347] hover:underline cursor-pointer"
            >
              Calculate your exact monthly savings vs a £25k-£35k UK hire →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
