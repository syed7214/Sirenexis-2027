import React, { useState } from 'react';
import { X, ArrowRight, TrendingUp, Check } from 'lucide-react';
import { calculateSupportEconomics, formatGbp } from '../utils/calculator';

interface SavingsCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookCall: () => void;
}

export const SavingsCalculatorModal: React.FC<SavingsCalculatorModalProps> = ({
  isOpen,
  onClose,
  onBookCall,
}) => {
  const [planType, setPlanType] = useState<'part-time' | 'full-time'>('full-time');
  const [ukWage, setUkWage] = useState<number>(20);

  if (!isOpen) return null;

  const result = calculateSupportEconomics(planType, ukWage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#051F20]/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#FAF8F2] border border-[#8EB69B]/50 rounded-[28px] shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-[#163832]/10 flex items-center justify-between bg-[#F4F0E6]/60">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#235347] bg-[#DAF1DE] px-2.5 py-0.5 rounded-full border border-[#8EB69B]/40">
              Interactive ROI Tool
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#051F20] mt-1">
              UK In-House vs Sirenexis Economics
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#051F20] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
          
          {/* Plan Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#235347] mb-2">
              Choose Plan Intensity
            </label>
            <div className="grid grid-cols-2 gap-3 p-1 bg-[#F4F0E6] rounded-xl border border-[#163832]/10">
              <button
                type="button"
                onClick={() => setPlanType('part-time')}
                className={`py-2.5 px-4 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  planType === 'part-time'
                    ? 'bg-[#051F20] text-[#FAF8F2] shadow-sm'
                    : 'text-[#163832] hover:text-[#051F20]'
                }`}
              >
                Part-Time (20 hrs/wk)
              </button>
              <button
                type="button"
                onClick={() => setPlanType('full-time')}
                className={`py-2.5 px-4 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  planType === 'full-time'
                    ? 'bg-[#051F20] text-[#FAF8F2] shadow-sm'
                    : 'text-[#163832] hover:text-[#051F20]'
                }`}
              >
                Full-Time (40 hrs/wk)
              </button>
            </div>
          </div>

          {/* Wage Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-[#051F20] mb-2">
              <span>Benchmark UK Hourly Wage:</span>
              <span className="font-serif text-lg text-[#163832] tabular-nums">£{ukWage}/hour</span>
            </div>
            <input
              type="range"
              min={15}
              max={28}
              step={1}
              value={ukWage}
              onChange={(e) => setUkWage(Number(e.target.value))}
              className="w-full accent-[#235347] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#163832]/60 mt-1">
              <span>£15/hr (Entry support)</span>
              <span>£20/hr (Average UK)</span>
              <span>£28/hr (Senior rep)</span>
            </div>
          </div>

          {/* Economics Comparison Card */}
          <div className="liquid-glass-mint p-6 rounded-2xl border border-[#8EB69B]/50 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-[#235347]/15">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#235347] font-semibold block">
                  UK In-House Monthly Cost
                </span>
                <span className="text-xs text-[#163832]/70">
                  Includes base salary + 13.8% NI + 3% Pension + equipment
                </span>
              </div>
              <div className="font-serif text-2xl font-bold text-[#051F20] tabular-nums">
                {formatGbp(result.ukInHouseMonthlyCost)}
              </div>
            </div>

            <div className="flex items-center justify-between pb-3 border-b border-[#235347]/15">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#235347] font-semibold block">
                  Sirenexis Dedicated Plan
                </span>
                <span className="text-xs text-[#163832]/70">
                  Fully managed, trained cover agent, QA & UK legal SLA
                </span>
              </div>
              <div className="font-serif text-2xl font-bold text-[#0B2B26] tabular-nums">
                {formatGbp(result.sirenexisMonthlyCost)}
              </div>
            </div>

            {/* Savings Result */}
            <div className="pt-2 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#0B2B26] font-bold block">
                  Projected Net Monthly Savings
                </span>
                <span className="text-xs text-[#235347] font-semibold">
                  Approx. {formatGbp(result.annualSavings)} per year saved ({result.savingsPercent}%)
                </span>
              </div>
              <div className="font-serif text-3xl font-extrabold text-[#051F20] tabular-nums">
                {formatGbp(result.monthlySavings)}
                <span className="text-xs font-sans font-medium text-[#235347] block text-right">/month saved</span>
              </div>
            </div>

          </div>

          <div className="pt-2 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-5 rounded-xl border border-[#163832]/20 text-[#163832] text-xs font-semibold hover:bg-black/5"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookCall();
              }}
              className="py-3 px-6 rounded-xl bg-[#051F20] text-[#FAF8F2] hover:bg-[#0B2B26] text-sm font-semibold flex items-center gap-2 shadow"
            >
              <span>Book a Call</span>
              <ArrowRight className="w-4 h-4 text-[#8EB69B]" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
