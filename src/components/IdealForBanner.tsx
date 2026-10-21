import React from 'react';
import { Building2, Wrench, ShoppingBag, Users, MessageSquareQuote, Coins } from 'lucide-react';

export const IdealForBanner: React.FC = () => {
  return (
    <section className="py-14 bg-[#F4F0E6] border-y border-[#163832]/10 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
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
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 bg-[#FAF8F2] p-5 sm:p-6 rounded-2xl border border-[#163832]/15 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#DAF1DE] text-[#051F20]">
                <Users className="w-4 h-4 text-[#235347]" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#235347] font-semibold block">Team Size</span>
                <span className="text-sm font-semibold text-[#051F20]">5–40 staff</span>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-[#163832]/15 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#DAF1DE] text-[#051F20]">
                <MessageSquareQuote className="w-4 h-4 text-[#235347]" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#235347] font-semibold block">Volume</span>
                <span className="text-sm font-semibold text-[#051F20]">20+ enquiries/day</span>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-[#163832]/15 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#DAF1DE] text-[#051F20]">
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
