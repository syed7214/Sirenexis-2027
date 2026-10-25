import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Calendar, Clock, CheckCircle2, User, Mail, Building, Phone } from 'lucide-react';
import { validateBookingForm } from '../utils/calculator';
import { saveQuery } from '../utils/leadsStorage';

interface CtaSectionProps {
  onOpenBooking: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenBooking }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    companyName: '',
    phone: '',
    weeklyEnquiries: '20-50 enquiries/day',
    channels: ['Email Support', 'Live Chat'],
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const toggleChannel = (channel: string) => {
    setFormData((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((c) => c !== channel)
        : [...prev.channels, channel],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    // Persist to admin portal queries
    saveQuery({
      fullName: formData.fullName,
      businessEmail: formData.businessEmail,
      companyName: formData.companyName,
      phone: formData.phone,
      weeklyEnquiries: formData.weeklyEnquiries,
      channels: formData.channels,
      preferredTime: 'Next Available UK Business Slot',
      notes: 'Submitted via Homepage Discovery Section',
      source: 'Discovery Call Form',
    });

    setErrors({});
    setSubmitted(true);
  };

  return (
    <section id="book" className="py-24 sm:py-32 bg-[#051F20] text-[#FAF8F2] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#163832]/60 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[400px] h-[400px] bg-[#0B2B26] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Exact Headline & Subtext */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 mb-4">
              <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#8EB69B] bg-[#163832]/70 px-3 py-1 rounded-full border border-[#8EB69B]/30">
                Direct UK Consultation
              </span>
            </div>

            <h2 className="font-serif text-[42px] sm:text-[60px] lg:text-[68px] leading-[1.06] font-medium text-[#FAF8F2] text-balance mb-6">
              Ready to stop missing enquiries?
            </h2>

            <p className="text-[18px] sm:text-[20px] leading-[1.6] text-[#FAF8F2]/85 max-w-xl mb-8">
              Book a 15-minute call. We'll map your volume and show exact saving. No obligation.
            </p>

            <div className="space-y-4 pt-6 border-t border-[#8EB69B]/20 max-w-md">
              <div className="flex items-center gap-3 text-sm text-[#DAF1DE]">
                <ShieldCheck className="w-5 h-5 text-[#8EB69B] shrink-0" />
                <span>Onshore UK entity • English Law MSA • UK Bank</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#DAF1DE]">
                <Clock className="w-5 h-5 text-[#8EB69B] shrink-0" />
                <span>15 minutes: enquiry audit + tailored team quote</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#DAF1DE]">
                <CheckCircle2 className="w-5 h-5 text-[#8EB69B] shrink-0" />
                <span>We have trained agents with fluent English</span>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Consultation Form Card */}
          <div className="lg:col-span-6">
            <div className="liquid-glass-dark p-8 sm:p-10 rounded-[28px] border border-[#8EB69B]/30 shadow-[0_24px_50px_rgba(0,0,0,0.35)]">
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#8EB69B]/20 mb-2">
                    <div>
                      <h3 className="font-serif text-2xl text-[#FAF8F2]">Schedule Discovery Call</h3>
                      <p className="text-xs text-[#8EB69B]">With UK Operations</p>
                    </div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#051F20] bg-[#DAF1DE] px-2.5 py-1 rounded-md">
                      Next-Day Slots
                    </span>
                  </div>

                  {/* Name & Email */}
                  {/* Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        id="cta-fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder=" "
                        className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-[#051F20]/75 border border-[#8EB69B]/30 text-[#FAF8F2] text-sm focus:outline-none focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/20 transition-all placeholder-transparent"
                      />
                      <label
                        htmlFor="cta-fullName"
                        className={`pointer-events-none absolute left-4 transition-all duration-200 ease-out origin-left ${
                          formData.fullName
                            ? 'top-1.5 text-[11px] font-medium text-[#8EB69B]'
                            : 'top-3.5 text-sm text-[#FAF8F2]/60 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-[#8EB69B]'
                        }`}
                      >
                        Your Full Name *
                      </label>
                      {errors.fullName && <p className="text-xs text-rose-300 mt-1 pl-1">{errors.fullName}</p>}
                    </div>

                    <div className="relative">
                      <input
                        id="cta-businessEmail"
                        type="email"
                        value={formData.businessEmail}
                        onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                        placeholder=" "
                        className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-[#051F20]/75 border border-[#8EB69B]/30 text-[#FAF8F2] text-sm focus:outline-none focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/20 transition-all placeholder-transparent"
                      />
                      <label
                        htmlFor="cta-businessEmail"
                        className={`pointer-events-none absolute left-4 transition-all duration-200 ease-out origin-left ${
                          formData.businessEmail
                            ? 'top-1.5 text-[11px] font-medium text-[#8EB69B]'
                            : 'top-3.5 text-sm text-[#FAF8F2]/60 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-[#8EB69B]'
                        }`}
                      >
                        Business Email *
                      </label>
                      {errors.businessEmail && <p className="text-xs text-rose-300 mt-1 pl-1">{errors.businessEmail}</p>}
                    </div>
                  </div>

                  {/* Company & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        id="cta-companyName"
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder=" "
                        className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-[#051F20]/75 border border-[#8EB69B]/30 text-[#FAF8F2] text-sm focus:outline-none focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/20 transition-all placeholder-transparent"
                      />
                      <label
                        htmlFor="cta-companyName"
                        className={`pointer-events-none absolute left-4 transition-all duration-200 ease-out origin-left ${
                          formData.companyName
                            ? 'top-1.5 text-[11px] font-medium text-[#8EB69B]'
                            : 'top-3.5 text-sm text-[#FAF8F2]/60 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-[#8EB69B]'
                        }`}
                      >
                        Company Name *
                      </label>
                      {errors.companyName && <p className="text-xs text-rose-300 mt-1 pl-1">{errors.companyName}</p>}
                    </div>

                    <div className="relative">
                      <input
                        id="cta-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder=" "
                        className="peer w-full px-4 pt-5 pb-2 rounded-xl bg-[#051F20]/75 border border-[#8EB69B]/30 text-[#FAF8F2] text-sm focus:outline-none focus:border-[#8EB69B] focus:ring-2 focus:ring-[#8EB69B]/20 transition-all placeholder-transparent"
                      />
                      <label
                        htmlFor="cta-phone"
                        className={`pointer-events-none absolute left-4 transition-all duration-200 ease-out origin-left ${
                          formData.phone
                            ? 'top-1.5 text-[11px] font-medium text-[#8EB69B]'
                            : 'top-3.5 text-sm text-[#FAF8F2]/60 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:font-medium peer-focus:text-[#8EB69B]'
                        }`}
                      >
                        UK Phone Number
                      </label>
                      {errors.phone && <p className="text-xs text-rose-300 mt-1 pl-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Channels Selector */}
                  <div>
                    <label className="block text-xs font-medium text-[#DAF1DE] mb-2">
                      Required Support Channels
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {['Email Support', 'Live Chat', 'Phone Calls', 'WhatsApp'].map((ch) => {
                        const active = formData.channels.includes(ch);
                        return (
                          <button
                            type="button"
                            key={ch}
                            onClick={() => toggleChannel(ch)}
                            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-all text-center cursor-pointer ${
                              active
                                ? 'bg-[#DAF1DE] text-[#051F20] border-[#DAF1DE]'
                                : 'bg-[#051F20]/50 text-[#8EB69B] border-[#8EB69B]/30 hover:border-[#8EB69B]'
                            }`}
                          >
                            {ch}
                          </button>
                        );
                      })}
                    </div>
                    {errors.channels && <p className="text-xs text-rose-300 mt-1">{errors.channels}</p>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-xl bg-[#FAF8F2] text-[#051F20] hover:bg-[#DAF1DE] font-semibold text-[15px] transition-all shadow-[0_10px_25px_rgba(0,0,0,0.3)] cursor-pointer flex items-center justify-center gap-2 mt-4 apple-spring-button btn-shimmer"
                  >
                    <span>Book a Call →</span>
                  </button>

                  <p className="text-[12px] text-center text-[#8EB69B] pt-1">
                    Direct calendar invitation sent immediately to your email.
                  </p>
                </form>
              ) : (
                <div className="text-center py-10 px-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#DAF1DE] text-[#051F20] flex items-center justify-center mx-auto mb-5 shadow-lg">
                    <CheckCircle2 className="w-9 h-9 text-[#235347]" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#FAF8F2] mb-2">
                    Consultation Requested
                  </h3>
                  <p className="text-[#DAF1DE] text-sm max-w-md mx-auto mb-6">
                    Thank you, {formData.fullName}. Our UK operations team has received your details for {formData.companyName}. A 15-minute briefing invitation has been dispatched to {formData.businessEmail}.
                  </p>
                  <div className="p-4 rounded-xl bg-[#051F20]/80 border border-[#8EB69B]/30 max-w-sm mx-auto text-left text-xs space-y-1.5 text-[#8EB69B]">
                    <div className="text-[#FAF8F2] font-semibold mb-1">What to expect on our 15-min call:</div>
                    <div>• Review of current ticket volume & channels</div>
                    <div>• Exact ROI calculation vs UK hire</div>
                    <div>• 2-Week Pilot timeline & SOP template preview</div>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
