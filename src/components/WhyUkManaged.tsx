import React, { useState, useMemo } from 'react';
import { Landmark, UserCheck, ShieldAlert, ArrowRight, Check, TrendingUp, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import * as d3 from 'd3';

interface WhyUkManagedProps {
  onOpenBooking: () => void;
}

type MetricKey = 'efficiency' | 'sla' | 'hours';

interface PerformancePoint {
  period: string;
  phase: string;
  sirenexisEfficiency: number;
  unmanagedEfficiency: number;
  sirenexisSla: number;
  unmanagedSla: number;
  sirenexisHours: number;
  unmanagedHours: number;
  milestone?: string;
}

const PERFORMANCE_DATA: PerformancePoint[] = [
  {
    period: 'Wk 1',
    phase: '2-Week Pilot Start',
    sirenexisEfficiency: 72,
    unmanagedEfficiency: 52,
    sirenexisSla: 88,
    unmanagedSla: 64,
    sirenexisHours: 14,
    unmanagedHours: 4,
  },
  {
    period: 'Wk 2',
    phase: 'Pilot Sign-Off',
    sirenexisEfficiency: 84,
    unmanagedEfficiency: 56,
    sirenexisSla: 94,
    unmanagedSla: 66,
    sirenexisHours: 26,
    unmanagedHours: 7,
    milestone: 'UK QA Lock-In',
  },
  {
    period: 'Mo 1',
    phase: 'Playbook Calibration',
    sirenexisEfficiency: 89,
    unmanagedEfficiency: 59,
    sirenexisSla: 96.4,
    unmanagedSla: 68,
    sirenexisHours: 38,
    unmanagedHours: 11,
  },
  {
    period: 'Mo 2',
    phase: 'Workflow Automation',
    sirenexisEfficiency: 92,
    unmanagedEfficiency: 61,
    sirenexisSla: 97.8,
    unmanagedSla: 67,
    sirenexisHours: 46,
    unmanagedHours: 13,
  },
  {
    period: 'Mo 3',
    phase: 'Quarterly UK Audit',
    sirenexisEfficiency: 94.5,
    unmanagedEfficiency: 60,
    sirenexisSla: 98.5,
    unmanagedSla: 65,
    sirenexisHours: 54,
    unmanagedHours: 12,
  },
  {
    period: 'Mo 6',
    phase: 'Autonomous Mastery',
    sirenexisEfficiency: 96.8,
    unmanagedEfficiency: 58,
    sirenexisSla: 99.1,
    unmanagedSla: 63,
    sirenexisHours: 62,
    unmanagedHours: 10,
  },
  {
    period: 'Mo 9',
    phase: 'Process Expansion',
    sirenexisEfficiency: 97.9,
    unmanagedEfficiency: 57,
    sirenexisSla: 99.3,
    unmanagedSla: 61,
    sirenexisHours: 66,
    unmanagedHours: 9,
  },
  {
    period: 'Mo 12',
    phase: 'Compounded ROI',
    sirenexisEfficiency: 98.6,
    unmanagedEfficiency: 56,
    sirenexisSla: 99.5,
    unmanagedSla: 60,
    sirenexisHours: 72,
    unmanagedHours: 8,
  },
];

const METRIC_CONFIG: Record<
  MetricKey,
  {
    label: string;
    shortLabel: string;
    unit: string;
    sirenexisKey: 'sirenexisEfficiency' | 'sirenexisSla' | 'sirenexisHours';
    unmanagedKey: 'unmanagedEfficiency' | 'unmanagedSla' | 'unmanagedHours';
    sirenexisLabel: string;
    unmanagedLabel: string;
    headlineValue: string;
    headlineSub: string;
    deltaBadge: string;
    description: string;
    yDomain: [number, number];
    yTicks: number[];
  }
> = {
  efficiency: {
    label: 'Task Throughput & Quality Index',
    shortLabel: 'Efficiency Index',
    unit: '%',
    sirenexisKey: 'sirenexisEfficiency',
    unmanagedKey: 'unmanagedEfficiency',
    sirenexisLabel: 'Sirenexis UK-Managed Specialist',
    unmanagedLabel: 'Unmanaged Offshore / Freelancer',
    headlineValue: '98.6%',
    headlineSub: 'Month 12 verified output accuracy & velocity',
    deltaBadge: '+42.6% vs. Unmanaged Offshore',
    description:
      'Daily UK operations coaching and structured playbook calibration eliminate the typical 90-day offshore quality drift.',
    yDomain: [40, 100],
    yTicks: [40, 55, 70, 85, 100],
  },
  sla: {
    label: 'UK SLA & First-Response Adherence',
    shortLabel: 'SLA Compliance',
    unit: '%',
    sirenexisKey: 'sirenexisSla',
    unmanagedKey: 'unmanagedSla',
    sirenexisLabel: 'Sirenexis UK-Managed SLA',
    unmanagedLabel: 'Standard BPO / Freelance Queue',
    headlineValue: '99.5%',
    headlineSub: 'On-time resolution within UK business hours',
    deltaBadge: '+39.5% Higher SLA Reliability',
    description:
      'Backed by our UK Master Services Agreement, senior UK leads monitor live response queues and step in before bottlenecks occur.',
    yDomain: [50, 100],
    yTicks: [50, 62, 75, 88, 100],
  },
  hours: {
    label: 'Reclaimed UK Leadership Time',
    shortLabel: 'Founder Hours Saved',
    unit: ' hrs/mo',
    sirenexisKey: 'sirenexisHours',
    unmanagedKey: 'unmanagedHours',
    sirenexisLabel: 'Net Hours Reclaimed (Sirenexis)',
    unmanagedLabel: 'Net Hours Saved (Unmanaged Hire)',
    headlineValue: '72 hrs',
    headlineSub: 'Reclaimed per month per specialist by Month 12',
    deltaBadge: '9x More Executive Bandwidth',
    description:
      'Because our UK operations team handles QA, training, and HR oversight, your leadership team reclaims nearly two full working weeks every month.',
    yDomain: [0, 80],
    yTicks: [0, 20, 40, 60, 80],
  },
};

export const WhyUkManaged: React.FC<WhyUkManagedProps> = ({ onOpenBooking }) => {
  const [activeMetric, setActiveMetric] = useState<MetricKey>('efficiency');
  const [hoveredIdx, setHoveredIdx] = useState<number>(PERFORMANCE_DATA.length - 1);
  const currentConfig = METRIC_CONFIG[activeMetric];

  const chartDimensions = {
    width: 720,
    height: 310,
    margin: { top: 24, right: 24, bottom: 36, left: 46 },
  };

  const innerWidth = chartDimensions.width - chartDimensions.margin.left - chartDimensions.margin.right;
  const innerHeight = chartDimensions.height - chartDimensions.margin.top - chartDimensions.margin.bottom;

  const { xScale, yScale, sirenexisAreaPath, sirenexisLinePath, unmanagedAreaPath, unmanagedLinePath } = useMemo(() => {
    const x = d3
      .scalePoint<string>()
      .domain(PERFORMANCE_DATA.map((d) => d.period))
      .range([0, innerWidth]);

    const y = d3
      .scaleLinear()
      .domain(currentConfig.yDomain)
      .range([innerHeight, 0]);

    const sArea = d3
      .area<PerformancePoint>()
      .x((d) => x(d.period) ?? 0)
      .y0(innerHeight)
      .y1((d) => y(d[currentConfig.sirenexisKey]))
      .curve(d3.curveMonotoneX);

    const sLine = d3
      .line<PerformancePoint>()
      .x((d) => x(d.period) ?? 0)
      .y((d) => y(d[currentConfig.sirenexisKey]))
      .curve(d3.curveMonotoneX);

    const uArea = d3
      .area<PerformancePoint>()
      .x((d) => x(d.period) ?? 0)
      .y0(innerHeight)
      .y1((d) => y(d[currentConfig.unmanagedKey]))
      .curve(d3.curveMonotoneX);

    const uLine = d3
      .line<PerformancePoint>()
      .x((d) => x(d.period) ?? 0)
      .y((d) => y(d[currentConfig.unmanagedKey]))
      .curve(d3.curveMonotoneX);

    return {
      xScale: x,
      yScale: y,
      sirenexisAreaPath: sArea(PERFORMANCE_DATA) ?? '',
      sirenexisLinePath: sLine(PERFORMANCE_DATA) ?? '',
      unmanagedAreaPath: uArea(PERFORMANCE_DATA) ?? '',
      unmanagedLinePath: uLine(PERFORMANCE_DATA) ?? '',
    };
  }, [currentConfig, innerHeight, innerWidth]);

  const activePoint = PERFORMANCE_DATA[hoveredIdx] ?? PERFORMANCE_DATA[PERFORMANCE_DATA.length - 1];
  const activeSirenexisVal = activePoint[currentConfig.sirenexisKey];
  const activeUnmanagedVal = activePoint[currentConfig.unmanagedKey];
  const activeDiff = (activeSirenexisVal - activeUnmanagedVal).toFixed(activeMetric === 'hours' ? 0 : 1);
  const pilotLockInX = xScale('Wk 2') ?? 0;

  return (
    <section id="why-uk-managed" className="py-16 sm:py-24 lg:py-32 bg-[#FAF8F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="text-[12px] font-semibold uppercase tracking-[0.18em] apple-badge-shimmer">
              Why UK-Managed
            </span>
          </div>
          <h2 className="font-serif text-[34px] sm:text-[54px] leading-[1.1] font-medium text-[#051F20] mb-4 text-balance">
            Offshore cost. Onshore accountability.
          </h2>
          <p className="text-[16px] sm:text-[17px] leading-[1.65] text-[#163832]/85">
            Sirenexis combines the cost advantages of global dedicated specialists with the legal certainty, data protection, and direct escalation of an established British company.
          </p>
        </div>

        {/* 3 Pillars / Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          
          {/* Card 1: UK Entity & Contract */}
          <div className="liquid-glass p-6 sm:p-9 rounded-[24px] sm:rounded-[26px] border border-white/80 shadow-[0_16px_40px_rgba(5,31,32,0.06)] hover:shadow-[0_20px_48px_rgba(5,31,32,0.1)] card-lift apple-spotlight transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#DAF1DE] border border-[#8EB69B]/40 flex items-center justify-center text-[#051F20] mb-6">
                <Landmark className="w-6 h-6 text-[#235347]" />
              </div>
              
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#235347] block mb-2">
                Pillar 01
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#051F20] mb-3">
                UK Entity & Contract
              </h3>
              
              <p className="text-[15.5px] leading-[1.65] text-[#163832]/85 mb-6">
                Master Services Agreement under English law with liability cap and SLAs. You pay to our UK bank.
              </p>
            </div>

            <div className="pt-6 border-t border-[#163832]/10 space-y-2.5 text-xs text-[#0B2B26] font-medium">
              <div className="flex items-start sm:items-center gap-2">
                <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5 sm:mt-0" />
                <span>UK Companies House Registered</span>
              </div>
              <div className="flex items-start sm:items-center gap-2">
                <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5 sm:mt-0" />
                <span>BACS & UK Faster Payments to UK Bank</span>
              </div>
              <div className="flex items-start sm:items-center gap-2">
                <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5 sm:mt-0" />
                <span>Clear contractual SLAs with English jurisdiction</span>
              </div>
            </div>
          </div>

          {/* Card 2: UK Point of Contact */}
          <div className="liquid-glass-mint p-6 sm:p-9 rounded-[24px] sm:rounded-[26px] border border-[#8EB69B]/45 shadow-[0_16px_40px_rgba(5,31,32,0.08)] hover:shadow-[0_20px_48px_rgba(5,31,32,0.12)] card-lift apple-spotlight transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#FAF8F2] border border-[#8EB69B]/50 flex items-center justify-center text-[#051F20] mb-6 shadow-sm">
                <UserCheck className="w-6 h-6 text-[#235347]" />
              </div>

              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0B2B26] block mb-2">
                Pillar 02 — Direct Senior Lead
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#051F20] mb-3">
                UK Point of Contact
              </h3>

              <p className="text-[15.5px] leading-[1.65] text-[#0B2B26]/90 mb-6">
                Our UK operations team (legally trained) is your single escalation — 9am-5pm UK on phone and Slack. Not a ticket queue.
              </p>
            </div>

            <div className="pt-6 border-t border-[#235347]/15 space-y-2.5 text-xs text-[#0B2B26] font-medium">
              <div className="flex items-start sm:items-center gap-2">
                <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5 sm:mt-0" />
                <span>Direct Slack / Teams channel with UK operations</span>
              </div>
              <div className="flex items-start sm:items-center gap-2">
                <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5 sm:mt-0" />
                <span>Daily QA reviews & proactive coaching</span>
              </div>
              <div className="flex items-start sm:items-center gap-2">
                <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5 sm:mt-0" />
                <span>Immediate escalation without waiting queues</span>
              </div>
            </div>
          </div>

          {/* Card 3: Data Protection First */}
          <div className="liquid-glass p-6 sm:p-9 rounded-[24px] sm:rounded-[26px] border border-white/80 shadow-[0_16px_40px_rgba(5,31,32,0.06)] hover:shadow-[0_20px_48px_rgba(5,31,32,0.1)] card-lift apple-spotlight transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#DAF1DE] border border-[#8EB69B]/40 flex items-center justify-center text-[#051F20] mb-6">
                <ShieldAlert className="w-6 h-6 text-[#235347]" />
              </div>

              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#235347] block mb-2">
                Pillar 03
              </span>
              <h3 className="font-serif text-2xl font-medium text-[#051F20] mb-3">
                Data Protection First
              </h3>

              <p className="text-[15.5px] leading-[1.65] text-[#163832]/85 mb-6">
                DPA + International Data Transfer Agreement (IDTA) + Transfer Risk Assessment for Pakistan. 2FA, encryption, client-owned helpdesk.
              </p>
            </div>

            <div className="pt-6 border-t border-[#163832]/10 space-y-2.5 text-xs text-[#0B2B26] font-medium">
              <div className="flex items-start sm:items-center gap-2">
                <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5 sm:mt-0" />
                <span>ICO UK GDPR compliant framework</span>
              </div>
              <div className="flex items-start sm:items-center gap-2">
                <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5 sm:mt-0" />
                <span>Zero data extraction — stays in your tools</span>
              </div>
              <div className="flex items-start sm:items-center gap-2">
                <Check className="w-4 h-4 text-[#235347] shrink-0 mt-0.5 sm:mt-0" />
                <span>End-to-end encrypted hardware & 2FA</span>
              </div>
            </div>
          </div>

        </div>

        {/* Performance & Efficiency Trajectory Chart Card */}
        <div className="liquid-glass rounded-[26px] sm:rounded-[32px] border border-[#8EB69B]/40 p-6 sm:p-10 mb-12 sm:mb-16 shadow-[0_20px_50px_rgba(5,31,32,0.07)]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#163832]/10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DAF1DE] border border-[#8EB69B]/40 text-[#051F20] text-[11px] font-semibold uppercase tracking-wider mb-3">
                <TrendingUp className="w-3.5 h-3.5 text-[#235347]" />
                <span>Verified Client Performance Benchmark</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-4xl font-medium text-[#051F20] leading-tight">
                The UK-Managed Compounding Effect
              </h3>
              <p className="text-sm sm:text-[15.5px] text-[#163832]/80 mt-2 leading-relaxed">
                {currentConfig.description}
              </p>
            </div>

            {/* Metric Selector Tabs */}
            <div className="inline-flex p-1.5 rounded-2xl bg-[#051F20]/[0.05] border border-[#163832]/10 self-start lg:self-auto w-full sm:w-auto overflow-x-auto">
              {(Object.keys(METRIC_CONFIG) as MetricKey[]).map((key) => {
                const isActive = activeMetric === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveMetric(key)}
                    className={`flex-1 sm:flex-initial px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#051F20] text-[#FAF8F2] shadow-sm'
                        : 'text-[#163832]/75 hover:text-[#051F20]'
                    }`}
                  >
                    {METRIC_CONFIG[key].shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chart + Live Callout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
            
            {/* Left / Top Summary KPI Column */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-5 sm:p-6 rounded-2xl bg-[#051F20] text-[#FAF8F2] relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] uppercase tracking-widest text-[#8EB69B] font-semibold">
                    {currentConfig.label}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#8EB69B] shrink-0" />
                </div>
                <div className="font-serif text-4xl sm:text-5xl font-medium text-white tabular-nums tracking-tight mb-1">
                  {currentConfig.headlineValue}
                </div>
                <p className="text-xs text-[#FAF8F2]/75 mb-4">
                  {currentConfig.headlineSub}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#235347] text-[#DAF1DE] text-xs font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{currentConfig.deltaBadge}</span>
                </div>
              </div>

              {/* Secondary Mini Benchmarks */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white/80 border border-[#163832]/10">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#235347] mb-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Ramp Speed</span>
                  </div>
                  <div className="font-serif text-2xl font-medium text-[#051F20] tabular-nums">
                    14 Days
                  </div>
                  <p className="text-[11px] text-[#163832]/70 mt-0.5">
                    Guided 2-week pilot to sign-off
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/80 border border-[#163832]/10">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#235347] mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Retention</span>
                  </div>
                  <div className="font-serif text-2xl font-medium text-[#051F20] tabular-nums">
                    96.4%
                  </div>
                  <p className="text-[11px] text-[#163832]/70 mt-0.5">
                    12-month specialist continuity
                  </p>
                </div>
              </div>

              {/* Legend */}
              <div className="p-4 rounded-2xl bg-[#DAF1DE]/45 border border-[#8EB69B]/35 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-1.5 rounded-full bg-[#235347]" />
                    <span className="font-semibold text-[#051F20]">
                      {currentConfig.sirenexisLabel}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#235347]">Active QA</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-0.5 border-b-2 border-dashed border-[#163832]/50" />
                    <span className="text-[#163832]/75">
                      {currentConfig.unmanagedLabel}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#163832]/60">No UK Oversight</span>
                </div>
              </div>
            </div>

            {/* Right Interactive D3 SVG AreaChart */}
            <div className="lg:col-span-8 bg-white/85 rounded-2xl p-4 sm:p-6 border border-[#163832]/10 shadow-inner">
              {/* Live Inspected Milestone Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#163832]/10">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#235347] block">
                    {activePoint.phase} ({activePoint.period})
                  </span>
                  <span className="text-xs text-[#163832]/70">
                    Hover or tap any milestone along the 12-month curve to inspect live metrics
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <div className="px-3 py-1.5 rounded-xl bg-[#051F20] text-[#FAF8F2] text-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#8EB69B]" />
                    <span className="text-[#FAF8F2]/75">Sirenexis:</span>
                    <span className="font-semibold text-[#DAF1DE] tabular-nums">
                      {activeSirenexisVal}
                      {currentConfig.unit}
                    </span>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-[#FAF8F2] border border-[#163832]/15 text-[#163832] text-xs flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#163832]/40" />
                    <span className="text-[#163832]/70">Unmanaged:</span>
                    <span className="font-semibold tabular-nums">
                      {activeUnmanagedVal}
                      {currentConfig.unit}
                    </span>
                  </div>

                  <span className="px-2.5 py-1.5 rounded-xl bg-[#DAF1DE] text-[#051F20] border border-[#8EB69B]/50 text-xs font-semibold tabular-nums">
                    +{activeDiff}
                    {currentConfig.unit} Edge
                  </span>
                </div>
              </div>

              {/* D3 SVG Canvas */}
              <div className="w-full overflow-hidden">
                <svg
                  viewBox={`0 0 ${chartDimensions.width} ${chartDimensions.height}`}
                  className="w-full h-auto select-none overflow-visible"
                  role="img"
                  aria-label={`D3 Performance Chart showing ${currentConfig.label} from Week 1 to Month 12`}
                >
                  <defs>
                    <linearGradient id="d3SirenexisArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#235347" stopOpacity={0.34} />
                      <stop offset="100%" stopColor="#8EB69B" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="d3UnmanagedArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#163832" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="#163832" stopOpacity={0.01} />
                    </linearGradient>
                  </defs>

                  <g transform={`translate(${chartDimensions.margin.left}, ${chartDimensions.margin.top})`}>
                    {/* Horizontal Grid Lines & Y-Axis Labels */}
                    {currentConfig.yTicks.map((tickValue) => {
                      const yPos = yScale(tickValue);
                      return (
                        <g key={tickValue} transform={`translate(0, ${yPos})`}>
                          <line
                            x1={0}
                            x2={innerWidth}
                            stroke="#163832"
                            strokeOpacity={0.09}
                            strokeDasharray="4 4"
                          />
                          <text
                            x={-10}
                            y={4}
                            textAnchor="end"
                            className="fill-[#163832]/70 text-[11px] font-medium tabular-nums"
                          >
                            {tickValue}
                            {activeMetric === 'hours' ? 'h' : '%'}
                          </text>
                        </g>
                      );
                    })}

                    {/* 10-Day Pilot Lock-In Reference Line */}
                    <g transform={`translate(${pilotLockInX}, 0)`}>
                      <line
                        y1={0}
                        y2={innerHeight}
                        stroke="#235347"
                        strokeOpacity={0.45}
                        strokeWidth={1.5}
                        strokeDasharray="3 3"
                      />
                      <rect
                        x={6}
                        y={2}
                        width={118}
                        height={20}
                        rx={6}
                        fill="#DAF1DE"
                        stroke="#8EB69B"
                        strokeWidth={1}
                      />
                      <text
                        x={65}
                        y={15}
                        textAnchor="middle"
                        className="fill-[#051F20] text-[10px] font-semibold"
                      >
                        2-Week Pilot Lock-In
                      </text>
                    </g>

                    {/* Unmanaged Baseline Area & Dashed Line */}
                    <path d={unmanagedAreaPath} fill="url(#d3UnmanagedArea)" />
                    <path
                      d={unmanagedLinePath}
                      fill="none"
                      stroke="#163832"
                      strokeOpacity={0.45}
                      strokeWidth={2}
                      strokeDasharray="6 5"
                    />

                    {/* Sirenexis UK-Managed Area & Solid Line */}
                    <path d={sirenexisAreaPath} fill="url(#d3SirenexisArea)" />
                    <path
                      d={sirenexisLinePath}
                      fill="none"
                      stroke="#235347"
                      strokeWidth={3.25}
                      strokeLinecap="round"
                    />

                    {/* Active Vertical Scrubbing Hairline */}
                    {PERFORMANCE_DATA.map((point, idx) => {
                      const cx = xScale(point.period) ?? 0;
                      const sy = yScale(point[currentConfig.sirenexisKey]);
                      const uy = yScale(point[currentConfig.unmanagedKey]);
                      const isSelected = idx === hoveredIdx;

                      return (
                        <g key={point.period}>
                          {isSelected && (
                            <line
                              x1={cx}
                              x2={cx}
                              y1={0}
                              y2={innerHeight}
                              stroke="#051F20"
                              strokeOpacity={0.22}
                              strokeWidth={1.5}
                            />
                          )}

                          {/* X-Axis Period Label */}
                          <text
                            x={cx}
                            y={innerHeight + 24}
                            textAnchor="middle"
                            className={`text-[11.5px] transition-colors ${
                              isSelected
                                ? 'fill-[#051F20] font-bold'
                                : 'fill-[#163832]/75 font-medium'
                            }`}
                          >
                            {point.period}
                          </text>

                          {/* Unmanaged Node */}
                          <circle
                            cx={cx}
                            cy={uy}
                            r={isSelected ? 5 : 3.5}
                            fill={isSelected ? '#163832' : '#FAF8F2'}
                            stroke="#163832"
                            strokeOpacity={0.6}
                            strokeWidth={2}
                          />

                          {/* Sirenexis Node */}
                          {isSelected && (
                            <circle
                              cx={cx}
                              cy={sy}
                              r={11}
                              fill="#8EB69B"
                              fillOpacity={0.35}
                            />
                          )}
                          <circle
                            cx={cx}
                            cy={sy}
                            r={isSelected ? 6 : 4.5}
                            fill={isSelected ? '#051F20' : '#235347'}
                            stroke="#FAF8F2"
                            strokeWidth={2}
                          />

                          {/* Floating Value Pill on Selected Point */}
                          {isSelected && (
                            <g transform={`translate(${cx}, ${Math.max(sy - 28, 12)})`}>
                              <rect
                                x={-32}
                                y={-14}
                                width={64}
                                height={22}
                                rx={7}
                                fill="#051F20"
                              />
                              <text
                                x={0}
                                y={1}
                                textAnchor="middle"
                                className="fill-[#DAF1DE] text-[11px] font-semibold tabular-nums"
                              >
                                {point[currentConfig.sirenexisKey]}
                                {activeMetric === 'hours' ? 'h' : '%'}
                              </text>
                            </g>
                          )}

                          {/* Interactive Hit Target Column */}
                          <rect
                            x={cx - innerWidth / (PERFORMANCE_DATA.length * 2)}
                            y={0}
                            width={innerWidth / PERFORMANCE_DATA.length}
                            height={innerHeight + 30}
                            fill="transparent"
                            className="cursor-pointer"
                            onMouseEnter={() => setHoveredIdx(idx)}
                            onClick={() => setHoveredIdx(idx)}
                          />
                        </g>
                      );
                    })}
                  </g>
                </svg>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom CTA banner */}
        <div className="p-6 sm:p-10 rounded-[24px] bg-[#051F20] text-[#FAF8F2] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8EB69B] font-semibold block mb-1">
              Zero Guesswork
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl font-medium">
              Review our UK Master Services Agreement & DPA template
            </h4>
            <p className="text-sm text-[#8EB69B] mt-1">
              Legally drafted for UK SMEs with complete transparent terms and confidentiality covenants.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#FAF8F2] text-[#051F20] hover:bg-[#DAF1DE] font-medium text-sm transition-all whitespace-nowrap cursor-pointer shadow w-full sm:w-auto shrink-0"
          >
            <span>Request Legal Pack & Call</span>
            <ArrowRight className="w-4 h-4 text-[#235347]" />
          </button>
        </div>

      </div>
    </section>
  );
};

