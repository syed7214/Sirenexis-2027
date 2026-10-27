import React from 'react';
import { Building2, Wrench, ShoppingBag, Users, MessageSquareQuote, Coins } from 'lucide-react';

export const IdealForBanner: React.FC = () => {
  return (
    <section className="py-12 sm:py-14 bg-[#F4F0E6] border-y border-[#163832]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
          
          {/* Target Sectors */}
          <div className="flex flex-col gap-2 max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-[#235347]">
              Tailored For Growing UK Businesses
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#051F20]">
              Ideal for Letting & Estate Agents • Home Services & Trades • Independent E-commerce Brands
            </h3>
          </div>

          {/* Business Profile Benchmarks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex items-center gap-4 sm:gap-6 liquid-glass p-5 sm:p-6 rounded-2xl border border-white/80 shadow-[0_12px_32px_rgba(5,31,32,0.06)] w-full lg:w-auto">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#DAF1DE] text-[#051F20] shrink-0">
                <Users className="w-4 h-4 text-[#235347]" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#235347] font-semibold block">Team Size</span>
                <span className="text-sm font-semibold text-[#051F20]">5–40 staff</span>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-[#163832]/15 hidden lg:block" />

            <div className="flex items-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#163832]/10">
              <div className="p-2 rounded-lg bg-[#DAF1DE] text-[#051F20] shrink-0">
                <MessageSquareQuote className="w-4 h-4 text-[#235347]" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#235347] font-semibold block">Volume</span>
                <span className="text-sm font-semibold text-[#051F20]">20+ enquiries/day</span>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-[#163832]/15 hidden lg:block" />

            <div className="flex items-center gap-3 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#163832]/10">
              <div className="p-2 rounded-lg bg-[#DAF1DE] text-[#051F20] shrink-0">
                <Coins className="w-4 h-4 text-[#235347]" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#235347] font-semibold block">Turnover</span>
                <span className="text-sm font-semibold text-[#051F20]">£500k–£5M</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
