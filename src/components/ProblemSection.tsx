import React from 'react';
import { ArrowRight, AlertCircle, TrendingDown, Sparkles } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { SpotlightCard } from './SpotlightCard';

interface ProblemSectionProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
}

export const ProblemSection: React.FC<ProblemSectionProps> = ({ onOpenBooking, onOpenCalculator }) => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#FAF8F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mb-12 sm:mb-20">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] apple-badge-shimmer">
                The Problem with Support
              </span>
            </div>
            <h2 className="font-serif text-[34px] sm:text-[52px] leading-[1.12] font-medium text-[#051F20] text-balance">
              Hiring in the UK is expensive. Missing enquiries is worse.
            </h2>
          </div>
        </ScrollReveal>

        {/* 3 Editorial Stat Cards with Liquid Glass */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-14">
          
          {/* Card 1 */}
          <ScrollReveal delay={0} direction="up" className="flex">
            <SpotlightCard className="w-full liquid-glass p-6 sm:p-9 rounded-[24px] sm:rounded-[26px] border border-white/80 shadow-[0_16px_40px_rgba(5,31,32,0.06)] hover:shadow-[0_24px_50px_rgba(5,31,32,0.12)] flex flex-col justify-between">
              <div>
                <div className="font-serif text-[48px] sm:text-[68px] leading-none font-normal text-[#163832] mb-5 sm:mb-6 tracking-tight">
                  £35k+
                </div>
                <h3 className="text-xl font-semibold text-[#051F20] mb-3">
                  UK Hire Overhead
                </h3>
                <p className="text-[15.5px] sm:text-[16px] leading-[1.6] text-[#163832]/85">
                  A UK support hire costs £15-£25/hr + NI, pension, office and equipment.
                </p>
              </div>
              <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-[#163832]/10 text-xs text-[#235347] font-medium flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-[#235347] shrink-0" />
                <span>Heavy fixed monthly burden</span>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* Card 2 */}
          <ScrollReveal delay={120} direction="up" className="flex">
            <SpotlightCard className="w-full liquid-glass p-6 sm:p-9 rounded-[24px] sm:rounded-[26px] border border-white/80 shadow-[0_16px_40px_rgba(5,31,32,0.06)] hover:shadow-[0_24px_50px_rgba(5,31,32,0.12)] flex flex-col justify-between">
              <div>
                <div className="font-serif text-[48px] sm:text-[68px] leading-none font-normal text-[#163832] mb-5 sm:mb-6 tracking-tight">
                  £2,000
                </div>
                <h3 className="text-xl font-semibold text-[#051F20] mb-3">
                  Lost Enquiries
                </h3>
                <p className="text-[15.5px] sm:text-[16px] leading-[1.6] text-[#163832]/85">
                  Every missed call is a lost job — trades lose £200-£2,000 per call, lettings lose landlords.
                </p>
              </div>
              <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-[#163832]/10 text-xs text-[#235347] font-medium flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#235347] shrink-0" />
                <span>Unanswered calls ring to competitors</span>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal delay={240} direction="up" className="flex">
            <SpotlightCard className="w-full liquid-glass p-6 sm:p-9 rounded-[24px] sm:rounded-[26px] border border-white/80 shadow-[0_16px_40px_rgba(5,31,32,0.06)] hover:shadow-[0_24px_50px_rgba(5,31,32,0.12)] flex flex-col justify-between">
              <div>
                <div className="font-serif text-[48px] sm:text-[68px] leading-none font-normal text-[#163832] mb-5 sm:mb-6 tracking-tight flex items-baseline">
                  <span>1:1</span>
                </div>
                <h3 className="text-xl font-semibold text-[#051F20] mb-3">
                  Dedicated Focus
                </h3>
                <p className="text-[15.5px] sm:text-[16px] leading-[1.6] text-[#163832]/85">
                  Freelancers disappear. Big BPOs want 10+ seats and charge for a shared pool.
                </p>
              </div>
              <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-[#163832]/10 text-xs text-[#235347] font-medium flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#235347] shrink-0" />
                <span>Never shared with other clients</span>
              </div>
            </SpotlightCard>
          </ScrollReveal>

        </div>

        {/* Solution Line Below (Exact Copy + Interactive CTA) */}
        <ScrollReveal delay={150} direction="up">
          <SpotlightCard className="liquid-glass-mint p-6 sm:p-9 rounded-[24px] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 border border-[#8EB69B]/40 shadow-[0_16px_40px_rgba(5,31,32,0.07)] hover:border-[#8EB69B] transition-all duration-300">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0B2B26] block mb-1">
                The Sirenexis Alternative
              </span>
              <p className="text-xl sm:text-2xl font-serif text-[#051F20] font-medium">
                Sirenexis gives you ONE dedicated agent who learns your business — from £1,495/mo part-time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={onOpenCalculator}
                className="px-5 py-3 text-sm font-medium text-[#163832] bg-white/70 hover:bg-white rounded-xl border border-[#163832]/20 transition-all cursor-pointer whitespace-nowrap hover:shadow-sm apple-spring-button text-center justify-center"
              >
                Compare UK Hire Savings
              </button>
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-[#FAF8F2] bg-[#051F20] hover:bg-[#0B2B26] rounded-xl shadow transition-all cursor-pointer whitespace-nowrap btn-shimmer apple-spring-button group"
              >
                <span>Book a Call</span>
                <ArrowRight className="w-4 h-4 text-[#8EB69B] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </SpotlightCard>
        </ScrollReveal>

      </div>
    </section>
  );
};
