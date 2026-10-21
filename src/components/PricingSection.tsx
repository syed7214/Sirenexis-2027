import React from 'react';
import { Check, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface PricingSectionProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenBooking, onOpenCalculator }) => {
  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#FAF8F2] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#235347]">
                Investment & Plans
              </span>
            </div>
            <h2 className="font-serif text-[42px] sm:text-[56px] leading-[1.08] font-medium text-[#051F20] mb-3">
              Simple monthly pricing
            </h2>
            <p className="text-[18px] text-[#163832]/85">
              One dedicated agent. No hourly billing.
            </p>
          </div>
        </ScrollReveal>

        {/* 3-Tier Grid with Featured Middle Plan Elevated */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          
          {/* Plan 1: PART-TIME DEDICATED */}
          <ScrollReveal delay={0} direction="up" className="flex">
            <div className="w-full bg-[#FAF8F2] border border-[#163832]/15 rounded-[28px] p-8 sm:p-9 flex flex-col justify-between shadow-[0_10px_30px_rgba(5,31,32,0.03)] hover:shadow-[0_20px_45px_rgba(5,31,32,0.1)] card-lift">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#235347] bg-[#F4F0E6] px-3 py-1 rounded-md border border-[#163832]/10">
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
              onClick={onOpenBooking}
              className="w-full py-3.5 px-6 rounded-xl border border-[#163832]/25 text-[#163832] font-medium text-sm hover:bg-[#DAF1DE]/40 transition-all cursor-pointer flex items-center justify-center gap-2 btn-shimmer group"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </ScrollReveal>

        {/* Plan 2: FULL-TIME DEDICATED (FEATURED - ELEVATED) */}
        <ScrollReveal delay={120} direction="up" className="flex">
          <div className="w-full liquid-glass-mint border-2 border-[#8EB69B] rounded-[30px] p-8 sm:p-9 flex flex-col justify-between shadow-[0_24px_50px_rgba(5,31,32,0.12)] hover:shadow-[0_30px_60px_rgba(5,31,32,0.18)] relative lg:-translate-y-4 card-lift">
            
            {/* Elevated Badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#051F20] text-[#FAF8F2] text-[11px] font-bold uppercase tracking-[0.16em] px-4 py-1 rounded-full shadow-md">
              MOST POPULAR
            </div>

            <div>
              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B2B26] bg-[#DAF1DE] px-3 py-1 rounded-md border border-[#8EB69B]/40">
                  FULL-TIME DEDICATED
                </span>
                <span className="text-xs text-[#235347] font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Complete Coverage
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
              onClick={onOpenBooking}
              className="w-full py-4 px-6 rounded-xl bg-[#051F20] text-[#FAF8F2] hover:bg-[#0B2B26] font-medium text-sm transition-all shadow-[0_8px_20px_rgba(5,31,32,0.18)] cursor-pointer flex items-center justify-center gap-2 active:scale-[0.99] btn-shimmer group"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-4 h-4 text-[#8EB69B] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </ScrollReveal>

        {/* Plan 3: 2-WEEK PAID PILOT */}
        <ScrollReveal delay={240} direction="up" className="flex">
          <div className="w-full bg-[#FAF8F2] border border-[#163832]/15 rounded-[28px] p-8 sm:p-9 flex flex-col justify-between shadow-[0_10px_30px_rgba(5,31,32,0.03)] hover:shadow-[0_20px_45px_rgba(5,31,32,0.1)] card-lift">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#235347] bg-[#F4F0E6] px-3 py-1 rounded-md border border-[#163832]/10">
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
              onClick={onOpenBooking}
              className="w-full py-3.5 px-6 rounded-xl border border-[#163832]/25 text-[#163832] font-medium text-sm hover:bg-[#DAF1DE]/40 transition-all cursor-pointer flex items-center justify-center gap-2 btn-shimmer group"
            >
              <span>Start 2-Week Pilot</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
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
