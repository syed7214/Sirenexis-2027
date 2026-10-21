import React from 'react';
import { Mail, MessageSquare, PhoneCall, CheckCircle2, ShieldCheck, ArrowRight, Layers } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

interface ServicesSectionProps {
  onOpenBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  return (
    <section id="what-we-cover" className="py-24 sm:py-32 bg-[#FAF8F2] relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="max-w-3xl mb-16 sm:mb-24">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#235347]">
                What We Cover
              </span>
            </div>
            <h2 className="font-serif text-[40px] sm:text-[54px] leading-[1.1] font-medium text-[#051F20] mb-5 text-balance">
              One team, every channel
            </h2>
            <div className="inline-block p-4 rounded-xl bg-[#DAF1DE]/60 border border-[#8EB69B]/40 text-[#0B2B26] text-[15px] leading-relaxed">
              <span className="font-semibold text-[#051F20]">Quality Assurance Standard: </span>
              We start on email and chat where quality is instant. Phone added after 2 weeks of QA to guarantee standards.
            </div>
          </div>
        </ScrollReveal>

        {/* 3 Alternating Feature Panels (NOT a generic grid!) */}
        <div className="space-y-20 sm:space-y-28">
          
          {/* Panel 1: Image Left, Glass Card Right */}
          <ScrollReveal direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Image Left */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-[28px] overflow-hidden aspect-[4/3] bg-[#F4F0E6] border border-[#163832]/10 shadow-[0_20px_40px_rgba(5,31,32,0.08)] relative group">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1000&q=80"
                  alt="Customer support team managing email and live chat in British workplace"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051F20]/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#DAF1DE] font-semibold block mb-1">Channel 01 & 02</span>
                  <p className="font-serif text-2xl font-medium">Instant Written Precision</p>
                </div>
              </div>
            </div>

            {/* Liquid Glass Card Right */}
            <div className="lg:col-span-6">
              <div className="liquid-glass p-8 sm:p-10 rounded-[28px] border border-white/80 shadow-[0_20px_48px_rgba(5,31,32,0.08)]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="p-2 rounded-xl bg-[#DAF1DE] text-[#051F20]">
                    <Mail className="w-5 h-5 text-[#235347]" />
                  </span>
                  <span className="p-2 rounded-xl bg-[#DAF1DE] text-[#051F20]">
                    <MessageSquare className="w-5 h-5 text-[#235347]" />
                  </span>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#235347] ml-2">
                    Email Support & Live Chat
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#051F20] mb-4">
                  Inbox triage & sub-3-minute chat resolutions
                </h3>

                <p className="text-[16px] sm:text-[17px] leading-[1.65] text-[#163832]/85 mb-6">
                  We start immediately on email and live chat where written quality and speed are instant. Your dedicated agent masters your brand tone, macros, and response guidelines, leaving your inboxes cleared daily.
                </p>

                <div className="space-y-3 pt-4 border-t border-[#163832]/10 mb-8">
                  <div className="flex items-center gap-3 text-sm text-[#0B2B26]">
                    <CheckCircle2 className="w-4 h-4 text-[#235347] shrink-0" />
                    <span>Flawless British grammar, spelling, and tone matching</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#0B2B26]">
                    <CheckCircle2 className="w-4 h-4 text-[#235347] shrink-0" />
                    <span>Triage, tagging, and immediate escalation of VIP queries</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#0B2B26]">
                    <CheckCircle2 className="w-4 h-4 text-[#235347] shrink-0" />
                    <span>Trained backup cover agent during holidays and sick days</span>
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#051F20] hover:text-[#235347] transition-colors"
                >
                  <span>Book Onboarding Call</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </ScrollReveal>

          {/* Panel 2: Glass Card Left, Image Right */}
          <ScrollReveal direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Liquid Glass Card Left */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="liquid-glass p-8 sm:p-10 rounded-[28px] border border-white/80 shadow-[0_20px_48px_rgba(5,31,32,0.08)]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="p-2 rounded-xl bg-[#DAF1DE] text-[#051F20]">
                    <PhoneCall className="w-5 h-5 text-[#235347]" />
                  </span>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#235347] ml-2">
                    Phone Calls & WhatsApp Enquiries
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#051F20] mb-4">
                  Accent-tested voice support with authentic rapport
                </h3>

                <p className="text-[16px] sm:text-[17px] leading-[1.65] text-[#163832]/85 mb-6">
                  Every voice agent is rigorously accent-tested and trained on your phone scripts. Voice is enabled after 2 weeks of live QA to ensure absolute confidence and standard.
                </p>

                <div className="space-y-3 pt-4 border-t border-[#163832]/10 mb-8">
                  <div className="flex items-center gap-3 text-sm text-[#0B2B26]">
                    <CheckCircle2 className="w-4 h-4 text-[#235347] shrink-0" />
                    <span>All inbound calls recorded, transcribed, and QA audited daily</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#0B2B26]">
                    <CheckCircle2 className="w-4 h-4 text-[#235347] shrink-0" />
                    <span>Ideal for trades booking jobs (£200-£2k/call) & lettings booking viewings</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#0B2B26]">
                    <CheckCircle2 className="w-4 h-4 text-[#235347] shrink-0" />
                    <span>WhatsApp business inbox managed concurrently with voice</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#235347] bg-[#DAF1DE]/70 px-3.5 py-2 rounded-xl border border-[#8EB69B]/40">
                    <CheckCircle2 className="w-4 h-4 text-[#235347]" />
                    <span>We have trained agents with fluent English</span>
                  </div>
                  <button
                    onClick={onOpenBooking}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#051F20] hover:text-[#235347] transition-colors"
                  >
                    <span>Discuss Call Volumes</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Image Right */}
            <div className="lg:col-span-6 order-1 lg:order-2 relative">
              <div className="rounded-[28px] overflow-hidden aspect-[4/3] bg-[#F4F0E6] border border-[#163832]/10 shadow-[0_20px_40px_rgba(5,31,32,0.08)] relative group">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80"
                  alt="Customer support specialist handling calls with professionalism"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051F20]/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#DAF1DE] font-semibold block mb-1">Channel 03 & 04</span>
                  <p className="font-serif text-2xl font-medium">Clear, Polite Voice Answering</p>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>

          {/* Panel 3: Image Left, Glass Card Right */}
          <ScrollReveal direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Image Left */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-[28px] overflow-hidden aspect-[4/3] bg-[#F4F0E6] border border-[#163832]/10 shadow-[0_20px_40px_rgba(5,31,32,0.08)] relative group">
                <img
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1000&q=80"
                  alt="Professional systems management and helpdesk integration"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051F20]/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 text-white">
                  <span className="text-xs uppercase tracking-widest text-[#DAF1DE] font-semibold block mb-1">Infrastructure</span>
                  <p className="font-serif text-2xl font-medium">Client-Owned Systems</p>
                </div>
              </div>
            </div>

            {/* Liquid Glass Card Right */}
            <div className="lg:col-span-6">
              <div className="liquid-glass p-8 sm:p-10 rounded-[28px] border border-white/80 shadow-[0_20px_48px_rgba(5,31,32,0.08)]">
                <div className="flex items-center gap-2 mb-4">
                  <span className="p-2 rounded-xl bg-[#DAF1DE] text-[#051F20]">
                    <Layers className="w-5 h-5 text-[#235347]" />
                  </span>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#235347] ml-2">
                    Helpdesk Ticketing & Deep Stack Integration
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#051F20] mb-4">
                  Zendesk, Gorgias, Intercom & Social Inboxes
                </h3>

                <p className="text-[16px] sm:text-[17px] leading-[1.65] text-[#163832]/85 mb-6">
                  We integrate cleanly into your existing customer software. No software re-platforming, no proprietary black boxes — you retain 100% ownership and visibility of all tickets and recordings.
                </p>

                <div className="space-y-3 pt-4 border-t border-[#163832]/10 mb-8">
                  <div className="flex items-center gap-3 text-sm text-[#0B2B26]">
                    <ShieldCheck className="w-4 h-4 text-[#235347] shrink-0" />
                    <span>Enforced 2FA and strict role-based access control</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#0B2B26]">
                    <CheckCircle2 className="w-4 h-4 text-[#235347] shrink-0" />
                    <span>Daily QA audit reviews & end-of-shift handover digests</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-[#0B2B26]">
                    <CheckCircle2 className="w-4 h-4 text-[#235347] shrink-0" />
                    <span>Full UK GDPR compliance with IDTA and Data Processing Agreements</span>
                  </div>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#051F20] hover:text-[#235347] transition-colors"
                >
                  <span>Request Stack Compatibility Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
