import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { validateBookingForm } from '../utils/calculator';
import { saveQuery } from '../utils/leadsStorage';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPlan?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, defaultPlan }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    companyName: '',
    phone: '',
    weeklyEnquiries: '20-50 enquiries/day',
    channels: ['Email Support', 'Live Chat'],
    preferredDate: '2026-10-22',
    preferredTime: '10:30 AM UK (GMT+1)',
    notes: defaultPlan ? `Interested in ${defaultPlan}` : '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const times = [
    '09:30 AM UK',
    '10:30 AM UK',
    '11:30 AM UK',
    '02:00 PM UK',
    '03:30 PM UK',
    '04:30 PM UK',
  ];

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
    const result = validateBookingForm(formData);
    if (!result.isValid) {
      setErrors(result.errors);
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
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      notes: formData.notes,
      source: '15-Min Booking Modal',
    });

    setErrors({});
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051F20]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF8F2] border border-[#8EB69B]/50 rounded-[28px] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="p-6 sm:p-7 border-b border-[#163832]/10 flex items-center justify-between bg-[#F4F0E6]/60">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#235347] bg-[#DAF1DE] px-2.5 py-0.5 rounded-full border border-[#8EB69B]/40">
              Direct Briefing
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#051F20] mt-1">
              Book a 15-Min Call
            </h3>
            <p className="text-xs text-[#163832]/80 mt-0.5">
              UK Operations • English Law Contract • Enquiry Mapping
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#051F20] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#051F20] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Rachel Thorne"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#163832]/20 text-[#051F20] placeholder-[#163832]/40 text-sm focus:outline-none focus:border-[#235347]"
                  />
                  {errors.fullName && <p className="text-xs text-rose-600 mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#051F20] mb-1.5">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    value={formData.businessEmail}
                    onChange={(e) => setFormData({ ...formData, businessEmail: e.target.value })}
                    placeholder="rachel@company.co.uk"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#163832]/20 text-[#051F20] placeholder-[#163832]/40 text-sm focus:outline-none focus:border-[#235347]"
                  />
                  {errors.businessEmail && <p className="text-xs text-rose-600 mt-1">{errors.businessEmail}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#051F20] mb-1.5">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Kestrel Group Ltd"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#163832]/20 text-[#051F20] placeholder-[#163832]/40 text-sm focus:outline-none focus:border-[#235347]"
                  />
                  {errors.companyName && <p className="text-xs text-rose-600 mt-1">{errors.companyName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#051F20] mb-1.5">
                    UK Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+44 20 8123 4567"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#163832]/20 text-[#051F20] placeholder-[#163832]/40 text-sm focus:outline-none focus:border-[#235347]"
                  />
                  {errors.phone && <p className="text-xs text-rose-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Time slot picker */}
              <div>
                <label className="block text-xs font-semibold text-[#051F20] mb-1.5">
                  Select Preferred UK Time Slot (Mon–Fri)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {times.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setFormData({ ...formData, preferredTime: slot })}
                      className={`py-2 px-3 text-xs font-medium rounded-xl border text-center transition-all cursor-pointer ${
                        formData.preferredTime === slot
                          ? 'bg-[#051F20] text-[#FAF8F2] border-[#051F20]'
                          : 'bg-white text-[#163832] border-[#163832]/15 hover:border-[#163832]/40'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Channels Selector */}
              <div>
                <label className="block text-xs font-semibold text-[#051F20] mb-1.5">
                  Channels Needed *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Email Support', 'Live Chat', 'Phone Calls', 'WhatsApp'].map((ch) => {
                    const active = formData.channels.includes(ch);
                    return (
                      <button
                        type="button"
                        key={ch}
                        onClick={() => toggleChannel(ch)}
                        className={`py-2 px-3 text-xs font-medium rounded-xl border transition-all text-center cursor-pointer ${
                          active
                            ? 'bg-[#DAF1DE] text-[#051F20] border-[#8EB69B] font-semibold'
                            : 'bg-white text-[#163832]/80 border-[#163832]/15 hover:border-[#163832]/30'
                        }`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </div>
                {errors.channels && <p className="text-xs text-rose-600 mt-1">{errors.channels}</p>}
              </div>

              {/* Security notice */}
              <div className="flex items-center gap-2 p-3 bg-[#DAF1DE]/40 rounded-xl border border-[#8EB69B]/30 text-xs text-[#235347]">
                <ShieldCheck className="w-4 h-4 text-[#235347] shrink-0" />
                <span>Protected under English law. We never sell or share your contact data.</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-[#051F20] text-[#FAF8F2] hover:bg-[#0B2B26] font-medium text-sm transition-all shadow-[0_8px_20px_rgba(5,31,32,0.18)] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Confirm Booking</span>
                <ArrowRight className="w-4 h-4 text-[#8EB69B]" />
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#DAF1DE] text-[#051F20] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9 text-[#235347]" />
              </div>
              <h4 className="font-serif text-3xl text-[#051F20] mb-2">
                15-Minute Briefing Confirmed
              </h4>
              <p className="text-sm text-[#163832]/90 max-w-md mx-auto mb-6">
                Thank you, {formData.fullName}. Our UK team has confirmed your consultation for <strong>{formData.companyName}</strong> on {formData.preferredTime}. An official invite has been dispatched to {formData.businessEmail}.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#051F20] text-[#FAF8F2] text-sm font-medium hover:bg-[#0B2B26] transition-colors"
              >
                Return to Site
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
