import React from 'react';
import { Quote } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-24 sm:py-32 bg-[#FAF8F2] relative border-t border-[#163832]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#235347]">
                Client Outcomes & Case Studies
              </span>
            </div>
            <h2 className="font-serif text-[40px] sm:text-[54px] leading-[1.1] font-medium text-[#051F20] mb-4 text-balance">
              Real impact across UK letting, trade, and retail businesses.
            </h2>
          </div>
        </ScrollReveal>

        {/* Editorial Layout: One Large + Two Small */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* One Large Editorial Quote (Left / 7 cols) */}
          <ScrollReveal delay={0} direction="up" className="lg:col-span-7 flex">
            <div className="w-full liquid-glass p-8 sm:p-12 rounded-[30px] border border-white/80 shadow-[0_16px_40px_rgba(5,31,32,0.06)] hover:shadow-[0_24px_50px_rgba(5,31,32,0.12)] card-lift flex flex-col justify-between">
              <div>
                <Quote className="w-10 h-10 text-[#8EB69B] mb-6 opacity-70" />
                <blockquote className="font-serif text-2xl sm:text-[32px] leading-[1.3] text-[#051F20] font-normal mb-8">
                  “In residential lettings, every unanswered enquiry is a landlord instruction lost to a high street competitor. Sirenexis gave us an articulate, calm dedicated specialist who responds in under 4 minutes. Having an English law contract and direct UK Slack support provides complete reassurance.”
                </blockquote>
              </div>

              <div className="pt-6 border-t border-[#163832]/10 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-[#051F20] text-base">
                    Alexander P.
                  </div>
                  <div className="text-xs text-[#235347] font-medium">
                    Managing Director · London Property Management (32 Staff)
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#235347] bg-[#DAF1DE] px-3 py-1 rounded-full">
                  Zero Missed Landlord Leads
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Two Small Editorial Quotes (Right / 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
            
            {/* Small Quote 1: Trades & Home Services */}
            <ScrollReveal delay={120} direction="up">
              <div className="liquid-glass border border-white/80 rounded-[26px] p-7 sm:p-8 shadow-[0_12px_32px_rgba(5,31,32,0.05)] hover:shadow-[0_20px_45px_rgba(5,31,32,0.1)] card-lift flex flex-col justify-between">
                <div>
                  <Quote className="w-6 h-6 text-[#8EB69B] mb-4 opacity-70" />
                  <p className="font-serif text-xl sm:text-[22px] leading-[1.38] text-[#051F20] mb-6 font-normal">
                    “Our emergency boiler dispatch was losing £400–£1,500 jobs every Saturday when the team was on tools. Having our dedicated specialist pick up immediately and quote accurately paid for the entire monthly plan in 3 days.”
                  </p>
                </div>

                <div className="pt-4 border-t border-[#163832]/10 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-[#051F20]">Marcus V.</div>
                    <div className="text-xs text-[#235347]">Founder · Commercial & Domestic Heating Services</div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#235347] bg-[#DAF1DE]/70 px-2.5 py-0.5 rounded-md border border-[#8EB69B]/40">
                    £2k+ Jobs Saved
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Small Quote 2: E-commerce */}
            <ScrollReveal delay={240} direction="up">
              <div className="liquid-glass border border-white/80 rounded-[26px] p-7 sm:p-8 shadow-[0_12px_32px_rgba(5,31,32,0.05)] hover:shadow-[0_20px_45px_rgba(5,31,32,0.1)] card-lift flex flex-col justify-between">
                <div>
                  <Quote className="w-6 h-6 text-[#8EB69B] mb-4 opacity-70" />
                  <p className="font-serif text-xl sm:text-[22px] leading-[1.38] text-[#051F20] mb-6 font-normal">
                    “We migrated from an unmanageable shared BPO queue. Our dedicated agent answers Gorgias tickets with genuine warmth and care. Customers genuinely assume she sits in our Manchester office.”
                  </p>
                </div>

                <div className="pt-4 border-t border-[#163832]/10 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm text-[#051F20]">Clara E.</div>
                    <div className="text-xs text-[#235347]">Head of Customer Operations · UK Homeware Brand</div>
                  </div>
                  <span className="text-[11px] font-semibold text-[#235347] bg-[#DAF1DE]/70 px-2.5 py-0.5 rounded-md border border-[#8EB69B]/40">
                    Gorgias First Response: 3m
                  </span>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>

      </div>
    </section>
  );
};
