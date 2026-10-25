import React from 'react';
import { ArrowRight, ShieldCheck, Check, Clock, RotateCcw, FileText } from 'lucide-react';

interface PilotSectionProps {
  onOpenBooking: () => void;
}

export const PilotSection: React.FC<PilotSectionProps> = ({ onOpenBooking }) => {
  const timelineSteps = [
    {
      phase: 'Day 1–2',
      title: 'SOP Intake',
      detail: '30-min kickoff call',
      desc: 'We map your existing enquiry flow, canned replies, escalation rules, and brand tone guidelines.',
      badge: 'Onboarding Kickoff',
    },
    {
      phase: 'Week 1',
      title: 'Shadow Period',
      detail: 'Agent shadows inbox read-only',
      desc: 'Your dedicated specialist reviews incoming customer tickets and drafts responses internally without sending.',
      badge: 'Read-Only Safety',
    },
    {
      phase: 'Week 2',
      title: 'Live + 100% QA',
      detail: 'Daily Loom feedback video',
      desc: 'Agent goes live answering customers in real time, with every response reviewed and daily Loom video updates.',
      badge: '100% Monitored',
    },
    {
      phase: 'Day 14',
      title: 'Decide & Scale',
      detail: 'Continue or full refund',
      desc: 'Either transition seamlessly into your rolling monthly dedicated plan, or receive a 100% refund. You keep all refined SOPs.',
      badge: 'Money-Back Guarantee',
    },
  ];

  return (
    <section id="pilot" className="py-24 sm:py-32 bg-[#FAF8F2] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Container with signature liquid glass & botanical accents */}
        <div className="liquid-glass p-8 sm:p-14 rounded-[32px] border border-white/90 shadow-[0_24px_60px_rgba(5,31,32,0.08)] relative overflow-hidden">
          
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#235347] bg-[#DAF1DE] px-3 py-1 rounded-full border border-[#8EB69B]/40">
                <span className="apple-badge-shimmer">Risk-Free Evaluation</span>
              </span>
            </div>
            <h2 className="font-serif text-[38px] sm:text-[52px] leading-[1.12] font-medium text-[#051F20] mb-4 text-balance">
              Start with a 2-week paid pilot. Zero risk.
            </h2>
            <p className="text-[17px] leading-[1.65] text-[#163832]/85">
              Experience the quality of a dedicated British-managed specialist inside your actual helpdesk before committing to an ongoing contract.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 relative">
            {timelineSteps.map((step, idx) => (
              <div
                key={step.phase}
                className="bg-[#FAF8F2] border border-[#163832]/15 rounded-[22px] p-6 sm:p-7 flex flex-col justify-between shadow-[0_6px_20px_rgba(5,31,32,0.03)] hover:shadow-[0_12px_28px_rgba(5,31,32,0.08)] card-lift apple-spotlight transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#235347] bg-[#DAF1DE]/70 px-2.5 py-1 rounded-md">
                      {step.phase}
                    </span>
                    <span className="text-xs text-[#163832]/60 font-semibold">0{idx + 1}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-[#051F20] mb-1">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#235347] mb-3">
                    ({step.detail})
                  </div>
                  <p className="text-[14px] leading-relaxed text-[#163832]/80">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#163832]/10 flex items-center justify-between text-xs text-[#0B2B26] font-medium">
                  <span>{step.badge}</span>
                  <Check className="w-4 h-4 text-[#235347]" />
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee Highlight Card */}
          <div className="bg-[#DAF1DE]/60 border border-[#8EB69B]/50 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#FAF8F2] flex items-center justify-center text-[#051F20] shadow-sm shrink-0 border border-[#8EB69B]/40">
                <ShieldCheck className="w-6 h-6 text-[#235347]" />
              </div>
              <div>
                <h4 className="font-serif text-xl sm:text-2xl font-medium text-[#051F20]">
                  100% Money-Back Guarantee + You Keep All SOPs
                </h4>
                <p className="text-sm text-[#163832]/85 mt-1 max-w-2xl">
                  If by Day 14 you are not completely delighted with your dedicated agent, simply notify our team. We issue an immediate 100% refund, and your business keeps all documented operating procedures and macros forever.
                </p>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#051F20] text-[#FAF8F2] hover:bg-[#0B2B26] text-sm font-medium transition-all shadow shrink-0 cursor-pointer apple-spring-button btn-shimmer"
            >
              <span>Book Pilot Intake Call</span>
              <ArrowRight className="w-4 h-4 text-[#8EB69B]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
