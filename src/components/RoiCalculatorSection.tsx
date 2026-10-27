import React, { useState } from 'react';
import { ArrowRight, Check, Calculator, ShieldCheck, Users } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { SpotlightCard } from './SpotlightCard';

interface RoiCalculatorSectionProps {
  onOpenBooking: (selectedPlan?: string) => void;
}

const HIRE_COUNTS = [1, 2, 3, 5] as const;

export const RoiCalculatorSection: React.FC<RoiCalculatorSectionProps> = ({ onOpenBooking }) => {
  const [hireCount, setHireCount] = useState<number>(1);
  const [planType, setPlanType] = useState<'full-time' | 'part-time'>('full-time');
  const [ukAnnualBaseSalary, setUkAnnualBaseSalary] = useState<number>(28000);

  // Scale base salary if part-time (includes UK part-time hourly rate premium & statutory holiday accrual)
  const effectiveBasePerHire = planType === 'full-time' ? ukAnnualBaseSalary : Math.round(ukAnnualBaseSalary * 0.65);

  // Itemized annual UK employer costs per hire (2025/26 UK Employer NI 15% over £5,000 secondary threshold)
  const employerNiPerHire = Math.round(Math.max(0, effectiveBasePerHire - 5000) * 0.15);
  const pensionPerHire = Math.round(effectiveBasePerHire * 0.03);
  const recruitmentAndTrainingPerHire = planType === 'full-time' ? 4200 : 3600; // Recruitment agency fee, HR onboarding & turnover training
  const officeEquipmentCoverPerHire = planType === 'full-time' ? 4500 : 3900; // Full laptop/workstation, CRM/SaaS seats & 28-day holiday/sick cover

  const totalUkAnnualPerHire =
    effectiveBasePerHire +
    employerNiPerHire +
    pensionPerHire +
    recruitmentAndTrainingPerHire +
    officeEquipmentCoverPerHire;

  const totalUkAnnualAllHires = totalUkAnnualPerHire * hireCount;
  const totalUkMonthlyAllHires = Math.round(totalUkAnnualAllHires / 12);

  // Sirenexis cost
  const sirenexisMonthlyPerHire = planType === 'full-time' ? 2495 : 1495;
  const totalSirenexisMonthly = sirenexisMonthlyPerHire * hireCount;
  const totalSirenexisAnnual = totalSirenexisMonthly * 12;

  const annualSavings = Math.max(0, totalUkAnnualAllHires - totalSirenexisAnnual);
  const monthlySavings = Math.max(0, totalUkMonthlyAllHires - totalSirenexisMonthly);
  const savingsPercentage = Math.round((annualSavings / totalUkAnnualAllHires) * 100);

  const formatGbp = (amount: number) =>
    new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <section id="roi-calculator" className="py-16 sm:py-24 bg-[#F4F0E6]/70 border-y border-[#163832]/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#235347] mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive UK Cost & ROI Calculator</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#051F20] tracking-tight leading-[1.12] mb-4">
              True Cost of a UK Hire vs. Sirenexis
            </h2>
            <p className="text-base sm:text-lg text-[#163832]/85 leading-relaxed">
              Toggle your team size and UK salary benchmark below to see how much you save on Employer National Insurance, workplace pensions, recruitment fees, and holiday cover.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Controls & UK Cost Breakdown (7 cols) */}
          <ScrollReveal delay={80} direction="up" className="lg:col-span-7 flex">
            <SpotlightCard className="w-full liquid-glass p-6 sm:p-9 rounded-[26px] sm:rounded-[30px] border border-white/80 shadow-[0_16px_40px_rgba(5,31,32,0.06)] flex flex-col justify-between space-y-7">
              <div className="space-y-7">
                {/* Control 1: Number of Hires */}
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs font-semibold uppercase tracking-[0.14em] text-[#235347] flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>1. Select Team Size (Number of Agents)</span>
                    </label>
                    <span className="text-xs font-semibold text-[#051F20]">
                      {hireCount} {hireCount === 1 ? 'Dedicated Agent' : 'Dedicated Agents'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 sm:gap-3 p-1.5 bg-[#FAF8F2] rounded-2xl border border-[#163832]/12">
                    {HIRE_COUNTS.map((count) => {
                      const active = hireCount === count;
                      return (
                        <button
                          key={count}
                          type="button"
                          onClick={() => setHireCount(count)}
                          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                            active
                              ? 'bg-[#051F20] text-[#FAF8F2] shadow-sm'
                              : 'text-[#163832] hover:text-[#051F20] hover:bg-[#163832]/5'
                          }`}
                        >
                          {count} {count === 1 ? 'Hire' : 'Hires'}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Control 2: Plan Coverage Intensity */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#235347] mb-2.5">
                    2. Coverage Schedule
                  </label>
                  <div className="grid grid-cols-2 gap-2.5 p-1.5 bg-[#FAF8F2] rounded-2xl border border-[#163832]/12">
                    <button
                      type="button"
                      onClick={() => setPlanType('full-time')}
                      className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        planType === 'full-time'
                          ? 'bg-[#051F20] text-[#FAF8F2] shadow-sm'
                          : 'text-[#163832] hover:text-[#051F20]'
                      }`}
                    >
                      Full-Time (40 hrs/wk)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPlanType('part-time')}
                      className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        planType === 'part-time'
                          ? 'bg-[#051F20] text-[#FAF8F2] shadow-sm'
                          : 'text-[#163832] hover:text-[#051F20]'
                      }`}
                    >
                      Part-Time (20 hrs/wk)
                    </button>
                  </div>
                </div>

                {/* Control 3: Benchmark UK Full-Time Salary Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="uk-salary-slider"
                      className="text-xs font-semibold uppercase tracking-[0.14em] text-[#235347]"
                    >
                      3. UK Full-Time Equivalent Base Salary
                    </label>
                    <span className="font-serif text-xl sm:text-2xl text-[#051F20] font-medium tabular-nums">
                      {formatGbp(ukAnnualBaseSalary)}/yr
                    </span>
                  </div>
                  <input
                    id="uk-salary-slider"
                    type="range"
                    min={24000}
                    max={38000}
                    step={1000}
                    value={ukAnnualBaseSalary}
                    onChange={(e) => setUkAnnualBaseSalary(Number(e.target.value))}
                    className="w-full accent-[#051F20] cursor-pointer h-2 bg-[#163832]/15 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-[#163832]/70 mt-1.5">
                    <span>£24,000 (Junior UK Admin)</span>
                    <span>£28,000 (UK Average)</span>
                    <span>£38,000 (Senior Support Lead)</span>
                  </div>
                </div>
              </div>

              {/* Itemized UK Employer Cost Breakdown Table */}
              <div className="pt-6 border-t border-[#163832]/12 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#235347] mb-1">
                  <span>Estimated UK In-House Breakdown ({hireCount} {hireCount === 1 ? 'Hire' : 'Hires'})</span>
                  <span>Annual Cost</span>
                </div>

                <div className="flex items-center justify-between text-sm text-[#163832]/90">
                  <span>Gross Base Salary ({planType === 'full-time' ? '40 hrs/wk' : '20 hrs/wk pro-rata'})</span>
                  <span className="font-medium tabular-nums text-[#051F20]">
                    {formatGbp(effectiveBasePerHire * hireCount)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-[#163832]/90">
                  <span>UK Employer National Insurance (15%) &amp; 3% Pension</span>
                  <span className="font-medium tabular-nums text-[#051F20]">
                    {formatGbp((employerNiPerHire + pensionPerHire) * hireCount)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-[#163832]/90">
                  <span>Recruitment Fees, HR Onboarding &amp; Training</span>
                  <span className="font-medium tabular-nums text-[#051F20]">
                    {formatGbp(recruitmentAndTrainingPerHire * hireCount)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-[#163832]/90 pb-3 border-b border-[#163832]/10">
                  <span>Hardware, Software Seats &amp; Paid Holiday/Sick Cover</span>
                  <span className="font-medium tabular-nums text-[#051F20]">
                    {formatGbp(officeEquipmentCoverPerHire * hireCount)}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-sm font-semibold text-[#051F20]">
                    True UK In-House Total ({formatGbp(totalUkMonthlyAllHires)}/mo)
                  </span>
                  <span className="font-serif text-xl font-bold text-[#051F20] tabular-nums">
                    {formatGbp(totalUkAnnualAllHires)}/yr
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* Right Column: Live Sirenexis Savings Summary Card (5 cols) */}
          <ScrollReveal delay={160} direction="up" className="lg:col-span-5 flex">
            <SpotlightCard className="w-full liquid-glass-mint border-2 border-[#8EB69B] rounded-[26px] sm:rounded-[30px] p-6 sm:p-9 flex flex-col justify-between shadow-[0_24px_50px_rgba(5,31,32,0.12)]">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#235347]/15 pb-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#235347] block">
                      Your Projected Savings
                    </span>
                    <h3 className="font-serif text-2xl text-[#051F20] mt-0.5">
                      {hireCount} {planType === 'full-time' ? 'Full-Time' : 'Part-Time'} {hireCount === 1 ? 'Specialist' : 'Specialists'}
                    </h3>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#051F20] bg-[#DAF1DE] px-3 py-1.5 rounded-xl border border-[#8EB69B]/50 tabular-nums">
                    Save {savingsPercentage}%
                  </span>
                </div>

                {/* Big Annual Savings Callout */}
                <div className="py-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#235347] block mb-1">
                    Estimated Annual Net Savings
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-5xl sm:text-6xl font-normal text-[#051F20] tabular-nums tracking-tight">
                      {formatGbp(annualSavings)}
                    </span>
                    <span className="text-sm font-semibold text-[#235347]">/year saved</span>
                  </div>
                  <div className="text-sm font-medium text-[#163832] mt-2">
                    That&apos;s <strong className="text-[#051F20] tabular-nums">{formatGbp(monthlySavings)}/month</strong> kept in your business.
                  </div>
                </div>

                {/* Comparison Pills */}
                <div className="space-y-3 pt-4 border-t border-[#235347]/15">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#163832]/85">UK In-House Monthly Cost:</span>
                    <span className="font-semibold text-[#163832] line-through tabular-nums">
                      {formatGbp(totalUkMonthlyAllHires)}/mo
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-base">
                    <span className="font-semibold text-[#051F20]">Sirenexis All-Inclusive Monthly:</span>
                    <span className="font-serif text-2xl font-bold text-[#051F20] tabular-nums">
                      {formatGbp(totalSirenexisMonthly)}/mo
                    </span>
                  </div>
                </div>

                {/* Included Benefits */}
                <div className="space-y-2.5 pt-4 border-t border-[#235347]/15 text-xs sm:text-sm text-[#051F20]">
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#235347] shrink-0" />
                    <span><strong>£0 Employer NI</strong>, pension, or recruitment agency fees</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#235347] shrink-0" />
                    <span><strong>Free trained cover agent</strong> for all holidays &amp; sick days</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[#235347] shrink-0" />
                    <span><strong>Daily UK QA auditing</strong> &amp; English law SLA contract</span>
                  </div>
                </div>
              </div>

              <div className="pt-7 mt-6 border-t border-[#235347]/15">
                <button
                  type="button"
                  onClick={() =>
                    onOpenBooking(
                      `${hireCount}x ${planType === 'full-time' ? 'Full-Time' : 'Part-Time'} Dedicated (${formatGbp(totalSirenexisMonthly)}/mo)`
                    )
                  }
                  className="w-full py-4 px-6 rounded-xl bg-[#051F20] text-[#FAF8F2] hover:bg-[#0B2B26] font-medium text-sm transition-all shadow-[0_8px_20px_rgba(5,31,32,0.18)] cursor-pointer flex items-center justify-center gap-2 apple-spring-button btn-shimmer group"
                >
                  <span>Lock In This Savings Plan</span>
                  <ArrowRight className="w-4 h-4 text-[#8EB69B] group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#235347] font-medium mt-3">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>Start with a risk-free 2-Week Paid Pilot (£750)</span>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
