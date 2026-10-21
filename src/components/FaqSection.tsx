import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
    <section className="py-24 sm:py-32 bg-[#FAF8F2] relative">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#235347]">
              Common Questions
            </span>
          </div>
          <h2 className="font-serif text-[40px] sm:text-[52px] leading-[1.1] font-medium text-[#051F20] mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-[17px] text-[#163832]/85">
            Transparent answers on our UK-managed dedicated support model.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="bg-[#FAF8F2] border border-[#163832]/15 rounded-2xl overflow-hidden transition-all duration-200 shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-xl sm:text-2xl font-medium text-[#051F20]">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#DAF1DE]/60 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#DAF1DE]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 text-[#235347]" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-[#163832]/90 text-[16px] leading-[1.65] border-t border-[#163832]/10 pt-4 animate-in fade-in duration-200">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
