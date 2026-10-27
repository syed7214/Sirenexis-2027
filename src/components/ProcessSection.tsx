import React from 'react';
import { ShieldCheck, UserCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProcessSectionProps {
  onOpenBooking: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      num: '01',
      title: 'We Recruit & Train',
      desc: 'We hire for neutral accent, excellent written English and UK cultural fluency. Every agent is accent-tested and trained on your SOPs before going live.',
      tag: 'Vetting & Accent Testing',
    },
    {
      num: '02',
      title: 'Your Dedicated Agent',
      desc: 'One agent = one client. Email, live chat, WhatsApp and phone. Backed by a trained cover agent for holidays and sick days.',
      tag: '1:1 Exclusive Assignment',
    },
    {
      num: '03',
      title: "UK-Managed & QA'd",
      desc: 'Daily quality checks, call recordings and a UK escalation path. You contract under English law with a service level agreement.',
      tag: 'Daily Quality Audits',
    },
    {
      num: '04',
      title: 'Continuous Growth & Scale',
      desc: 'Weekly performance reviews, iterative playbook updates, and smooth capacity scaling as your enquiry volume expands.',
      tag: 'Weekly Strategy Reviews',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 lg:py-32 bg-[#F4F0E6]/50 border-y border-[#163832]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#235347]">
              How It Works
            </span>
          </div>
          <h2 className="font-serif text-[34px] sm:text-[54px] leading-[1.1] font-medium text-[#051F20] mb-4 text-balance">
            Predictable onboarding. Total visibility.
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#163832]/85">
            Every step is managed onshore with strict UK contractual protections and daily quality audits.
          </p>
        </div>

        {/* 4-Step Horizontal Timeline with Thin Green Connectors */}
        <div className="relative">
          
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-[52px] left-[6%] right-[6%] h-[1.5px] bg-[#8EB69B]/50 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="liquid-glass border border-white/80 rounded-[24px] p-6 sm:p-8 flex flex-col justify-between shadow-[0_12px_32px_rgba(5,31,32,0.06)] hover:shadow-[0_20px_45px_rgba(5,31,32,0.12)] card-lift transition-all duration-300 group"
              >
                <div>
                  {/* Step Num & Indicator */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-serif text-4xl sm:text-5xl font-semibold text-[#163832] tracking-tight group-hover:text-[#051F20] transition-colors">
                      {step.num}
                    </span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#DAF1DE] border-2 border-[#235347] flex items-center justify-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#235347]" />
                    </span>
                  </div>

                  {/* Title & Tag */}
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#235347] block mb-2">
                    {step.tag}
                  </span>
                  <h3 className="text-xl font-serif font-medium text-[#051F20] mb-3">
                    {step.title}
                  </h3>

                  {/* Exact Body Copy */}
                  <p className="text-[15px] leading-[1.65] text-[#163832]/85">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#163832]/10 flex items-center justify-between text-xs text-[#235347] font-medium">
                  <span>Step {idx + 1} of 4</span>
                  <CheckCircle2 className="w-4 h-4 text-[#235347]" />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Action strip */}
        <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-5 sm:p-8 liquid-glass rounded-2xl gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#DAF1DE] flex items-center justify-center text-[#051F20] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#235347]" />
            </div>
            <div>
              <p className="font-medium text-[#051F20] text-sm">
                Want to see the actual training syllabus and QA rubric?
              </p>
              <p className="text-xs text-[#163832]/75 mt-0.5">
                We share our full 14-day onboarding timeline and SOP intake template on our call.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#051F20] text-[#FAF8F2] hover:bg-[#0B2B26] text-sm font-medium transition-all shadow shrink-0 cursor-pointer w-full sm:w-auto"
          >
            <span>Book Intake Call</span>
            <ArrowRight className="w-4 h-4 text-[#8EB69B]" />
          </button>
        </div>

      </div>
    </section>
  );
};
