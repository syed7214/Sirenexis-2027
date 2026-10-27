import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Will my customers know they're talking to Pakistan?",
      a: "We have trained agents with fluent English.",
    },
    {
      q: "Are you GDPR compliant?",
      a: "Yes. UK entity, DPA + ICO IDTA + TRA under UK GDPR. Protected under English law.",
    },
    {
      q: "Time zones?",
      a: "Pakistan is 5 hours ahead — 9am UK is 1pm there. Fresh agents cover your full day.",
    },
    {
      q: "What if agent is sick?",
      a: "Trained backup covers same-day with direct UK escalation.",
    },
    {
      q: "Do I pay Pakistan?",
      a: "No, you pay our UK entity to our UK bank.",
    },
  ];

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-[#FAF8F2] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#235347]">
                Common Questions
              </span>
            </div>
            <h2 className="font-serif text-[34px] sm:text-[52px] leading-[1.1] font-medium text-[#051F20] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-[16px] sm:text-[17px] text-[#163832]/85">
              Transparent answers on our UK-managed dedicated support model.
            </p>
          </div>
        </ScrollReveal>

        {/* Accordion list */}
        <div className="space-y-3.5 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={faq.q} delay={index * 80} direction="up">
                <div
                  className={`rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'liquid-glass border border-[#235347]/50 shadow-[0_12px_32px_rgba(5,31,32,0.08)]'
                      : 'liquid-glass border border-white/70 shadow-xs hover:border-[#163832]/30'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg sm:text-2xl font-medium text-[#051F20] group-hover:text-[#235347] transition-colors">
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen ? 'rotate-180 bg-[#235347] text-white' : 'bg-[#DAF1DE]/60 text-[#235347] group-hover:bg-[#DAF1DE]'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Smooth Animated Accordion Grid */}
                  <div className={`smooth-accordion-grid ${isOpen ? 'is-open' : ''}`}>
                    <div className="smooth-accordion-inner">
                      <div className="px-5 pb-5 sm:px-7 sm:pb-7 text-[#163832]/90 text-[15px] sm:text-[16px] leading-[1.65] border-t border-[#163832]/10 pt-4">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
