import React, { useState, useEffect } from 'react';
import { X, ArrowRight, TrendingUp, Check } from 'lucide-react';
import { calculateSupportEconomics, formatGbp } from '../utils/calculator';

interface SavingsCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookCall: (plan?: string) => void;
}

export const SavingsCalculatorModal: React.FC<SavingsCalculatorModalProps> = ({
  isOpen,
  onClose,
  onBookCall,
}) => {
  const [planType, setPlanType] = useState<'part-time' | 'full-time'>('full-time');
  const [ukWage, setUkWage] = useState<number>(20);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const result = calculateSupportEconomics(planType, ukWage);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#051F20]/75 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-[#FAF8F2] border border-[#8EB69B]/50 rounded-[24px] sm:rounded-[28px] shadow-2xl overflow-hidden max-h-[90dvh] flex flex-col apple-sheet-animate"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#163832]/10 flex items-start sm:items-center justify-between gap-3 bg-[#F4F0E6]/60 shrink-0">
          <div>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#235347] bg-[#DAF1DE] px-2.5 py-0.5 rounded-full border border-[#8EB69B]/40">
              Interactive ROI Tool
            </span>
            <h3 className="font-serif text-xl sm:text-3xl font-medium text-[#051F20] mt-1 leading-snug">
              UK In-House vs Sirenexis Economics
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#051F20] hover:bg-black/5 rounded-full transition-colors cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 space-y-5 sm:space-y-6 flex-1 min-h-0 overflow-y-auto">
          
          {/* Plan Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#235347] mb-2">
              Choose Plan Intensity
            </label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 p-1.5 bg-[#F4F0E6] rounded-xl border border-[#163832]/10">
              <button
                type="button"
                onClick={() => setPlanType('part-time')}
                className={`py-2.5 px-2.5 sm:px-4 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  planType === 'part-time'
                    ? 'bg-[#051F20] text-[#FAF8F2] shadow-sm'
                    : 'text-[#163832] hover:text-[#051F20]'
                }`}
              >
                Part-Time (20h/wk)
              </button>
              <button
                type="button"
                onClick={() => setPlanType('full-time')}
                className={`py-2.5 px-2.5 sm:px-4 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  planType === 'full-time'
                    ? 'bg-[#051F20] text-[#FAF8F2] shadow-sm'
                    : 'text-[#163832] hover:text-[#051F20]'
                }`}
              >
                Full-Time (40h/wk)
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
            <div className="flex justify-between text-[11px] text-[#163832]/65 mt-1.5">
              <span>£15/hr (Entry)</span>
              <span>£20/hr (UK Avg)</span>
              <span>£28/hr (Senior)</span>
            </div>
          </div>

          {/* Economics Comparison Card */}
          <div className="liquid-glass-mint p-4 sm:p-6 rounded-2xl border border-[#8EB69B]/50 space-y-4">
            
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#235347]/15">
              <div className="min-w-0">
                <span className="text-xs uppercase tracking-wider text-[#235347] font-semibold block">
                  UK In-House Monthly Cost
                </span>
                <span className="text-xs text-[#163832]/75 block mt-0.5 leading-relaxed">
                  Includes base salary + 15% NI + 3% Pension + equipment
                </span>
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#051F20] tabular-nums shrink-0">
                {formatGbp(result.ukInHouseMonthlyCost)}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#235347]/15">
              <div className="min-w-0">
                <span className="text-xs uppercase tracking-wider text-[#235347] font-semibold block">
                  Sirenexis Dedicated Plan
                </span>
                <span className="text-xs text-[#163832]/75 block mt-0.5 leading-relaxed">
                  Fully managed, trained cover agent, QA &amp; UK legal SLA
                </span>
              </div>
              <div className="font-serif text-xl sm:text-2xl font-bold text-[#0B2B26] tabular-nums shrink-0">
                {formatGbp(result.sirenexisMonthlyCost)}
              </div>
            </div>

            {/* Savings Result */}
            <div className="pt-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
              <div>
                <span className="text-xs uppercase tracking-wider text-[#0B2B26] font-bold block">
                  Projected Net Monthly Savings
                </span>
                <span className="text-xs text-[#235347] font-semibold block mt-0.5">
                  Approx. {formatGbp(result.annualSavings)} per year saved ({result.savingsPercent}%)
                </span>
              </div>
              <div className="font-serif text-2xl sm:text-3xl font-extrabold text-[#051F20] tabular-nums sm:text-right shrink-0">
                {formatGbp(result.monthlySavings)}
                <span className="text-xs font-sans font-medium text-[#235347] sm:block ml-1.5 sm:ml-0">/month saved</span>
              </div>
            </div>

          </div>

          <div className="pt-1 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="py-3 px-4 sm:px-5 rounded-xl border border-[#163832]/20 text-[#163832] text-xs font-semibold hover:bg-black/5 apple-spring-button cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onBookCall(
                  planType === 'full-time'
                    ? 'Full-Time Dedicated (£2,495/mo)'
                    : 'Part-Time Dedicated (£1,495/mo)'
                );
              }}
              className="flex-1 sm:flex-initial justify-center py-3 px-5 sm:px-6 rounded-xl bg-[#051F20] text-[#FAF8F2] hover:bg-[#0B2B26] text-sm font-semibold flex items-center gap-2 shadow apple-spring-button cursor-pointer btn-shimmer"
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
