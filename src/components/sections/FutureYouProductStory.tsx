'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Slider } from '@/components/ui/Slider';
import { formatINR } from '@/utils/financeCalculations';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  Sparkles,
  ShieldCheck,
  UserCheck,
  Compass,
  Zap,
} from 'lucide-react';

export const FutureYouProductStory: React.FC = () => {
  const [monthlySavings, setMonthlySavings] = useState<number>(5000);
  const [goalAmount, setGoalAmount] = useState<number>(600000);
  const [selectedHorizon, setSelectedHorizon] = useState<number>(5);

  const BASE_SAVINGS = 350000;
  const ANNUAL_INTEREST_RATE = 0.06;

  const calculateAccumulated = (years: number) => {
    let current = BASE_SAVINGS;
    const monthlyReturn = ANNUAL_INTEREST_RATE / 12;
    for (let m = 1; m <= years * 12; m++) {
      current = (current + monthlySavings) * (1 + monthlyReturn);
    }
    return Math.round(current);
  };

  const todayAmount = BASE_SAVINGS;
  const yr1Amount = calculateAccumulated(1);
  const yr3Amount = calculateAccumulated(3);
  const yr5Amount = calculateAccumulated(5);

  const timelineSteps = [
    {
      label: 'TODAY',
      year: 0,
      amount: todayAmount,
      progress: Math.min(100, Math.round((todayAmount / goalAmount) * 100)),
      milestone: 'Current Baseline Reserve',
      detail: 'Foundation of ₹3,50,000 liquid buffer',
    },
    {
      label: '1 YEAR',
      year: 1,
      amount: yr1Amount,
      progress: Math.min(100, Math.round((yr1Amount / goalAmount) * 100)),
      milestone: 'Emergency Safety Cushion',
      detail: `${formatINR(yr1Amount - todayAmount)} added in 12 months`,
    },
    {
      label: '3 YEARS',
      year: 3,
      amount: yr3Amount,
      progress: Math.min(100, Math.round((yr3Amount / goalAmount) * 100)),
      milestone: 'Halfway Wealth Milestone',
      detail: `Compounded wealth reaches ${formatINR(yr3Amount)}`,
    },
    {
      label: '5 YEARS',
      year: 5,
      amount: yr5Amount,
      progress: Math.min(100, Math.round((yr5Amount / goalAmount) * 100)),
      milestone: 'Primary Goal Target',
      detail: yr5Amount >= goalAmount ? 'Goal Fully Achieved 🎉' : `${Math.round((yr5Amount / goalAmount) * 100)}% of goal reached`,
    },
  ];

  const chartData = timelineSteps.map((step) => ({
    label: step.label,
    amount: step.amount,
    goal: goalAmount,
  }));

  const philosophySteps = [
    {
      num: '01',
      title: 'SEE',
      subtitle: 'Understand your financial position',
      desc: 'Aggregate all accounts into a single calibrated Financial Health Index. No more fragmented banking apps or buried spreadsheets.',
    },
    {
      num: '02',
      title: 'UNDERSTAND',
      subtitle: 'Discover what affects your progress',
      desc: 'Pinpoint exact root causes behind your score—from debt service drag to unoptimized liquid cash reserves.',
    },
    {
      num: '03',
      title: 'DECIDE',
      subtitle: 'Explore different choices',
      desc: 'Model life decisions and monthly cashflow shifts in a risk-free simulator before committing a single rupee.',
    },
    {
      num: '04',
      title: 'GROW',
      subtitle: 'Move toward your goals',
      desc: 'Execute automated sweeps, debt payoff avalanches, and index contributions with long-term compound trajectory.',
    },
  ];

  return (
    <div id="future-you" className="space-y-20 py-14 lg:py-20 border-b border-charcoal-200/60 bg-gradient-to-b from-white via-canvas-subtle/40 to-white">
      {/* SECTION 1: Future You Financial Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-mono font-semibold uppercase tracking-wider">
              <span>PHASE 4 — FUTURE YOU</span>
              <span className="text-emerald-400">•</span>
              <span>LONG-TERM TRAJECTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900">
              See where today&apos;s choices could take you.
            </h2>
            <p className="text-base text-charcoal-600 leading-relaxed">
              Watch your future wealth unfold. Adjusting your monthly savings immediately updates your 1, 3, and 5-year financial milestone trajectory.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-charcoal-200 shadow-subtle text-xs font-mono">
            {[1, 3, 5].map((y) => (
              <button
                key={y}
                onClick={() => setSelectedHorizon(y)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  selectedHorizon === y
                    ? 'bg-charcoal-900 text-white shadow-sm'
                    : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-canvas-subtle'
                }`}
              >
                {y} Year Horizon
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Controls & Connected Timeline Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Left Column (5 cols) */}
          <Card variant="default" padding="lg" className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-500">
                TIMELINE SIMULATION CONTROLS
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                LIVE CONNECTED
              </span>
            </div>

            <Slider
              label="Monthly Savings Contribution"
              value={monthlySavings}
              min={1000}
              max={10000}
              step={500}
              prefix="₹"
              unit="/mo"
              badgeText={`${formatINR(monthlySavings)}/mo`}
              onChange={(val) => setMonthlySavings(val)}
            />

            <Slider
              label="Target Goal Amount"
              value={goalAmount}
              min={300000}
              max={1200000}
              step={50000}
              prefix="₹"
              badgeText={`Target: ${formatINR(goalAmount)}`}
              onChange={(val) => setGoalAmount(val)}
            />

            <div className="p-3 rounded-xl bg-canvas-subtle border border-charcoal-200/60 text-[11px] text-charcoal-500 space-y-1">
              <p className="font-semibold text-charcoal-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Illustrative Rate Assumption
              </p>
              <p>
                Projections assume a conservative ~6.0% annual compounding rate. Actual returns depend on market movement and asset allocation. Not a guaranteed return.
              </p>
            </div>
          </Card>

          {/* Visualization Right Column (7 cols) */}
          <Card variant="highlight" padding="lg" className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
              <span className="text-xs font-semibold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                5-Year Compounded Trajectory Curve
              </span>
              <span suppressHydrationWarning className="text-xs font-mono font-bold text-emerald-800">
                5-YR ACCUMULATION: {formatINR(yr5Amount)}
              </span>
            </div>

            <div className="w-full h-64 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="label" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(val) => formatINR(val)} width={75} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const amount = payload[0].value as number;
                        return (
                          <div className="bg-charcoal-900 text-white p-3 rounded-xl shadow-hover text-xs space-y-1 font-mono border border-charcoal-700">
                            <p className="text-charcoal-300 font-semibold">{payload[0].payload.label} Projected Balance</p>
                            <p className="text-emerald-400 font-bold text-sm">{formatINR(amount)}</p>
                            <p className="text-[10px] text-charcoal-400">Goal Target: {formatINR(goalAmount)}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#059669"
                    strokeWidth={3.5}
                    dot={{ r: 5, fill: '#059669', stroke: '#ffffff', strokeWidth: 2 }}
                    activeDot={{ r: 7 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="goal"
                    stroke="#94A3B8"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Horizontal Timeline Ribbon: TODAY → 1 YEAR → 3 YEARS → 5 YEARS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {timelineSteps.map((step, idx) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
            >
              <Card
                variant={step.year === selectedHorizon ? 'highlight' : 'default'}
                padding="md"
                className={`space-y-3 relative overflow-hidden transition-all ${
                  step.year === selectedHorizon ? 'ring-2 ring-emerald-500/40 border-emerald-400' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {step.label}
                  </span>
                  <span className="text-xs font-mono font-bold text-charcoal-900">
                    {step.progress}% Goal
                  </span>
                </div>

                <div>
                  <p suppressHydrationWarning className="text-2xl font-extrabold font-mono text-charcoal-900">
                    {formatINR(step.amount)}
                  </p>
                  <p className="text-xs font-semibold text-charcoal-800 mt-1">{step.milestone}</p>
                  <p suppressHydrationWarning className="text-[11px] text-charcoal-500 mt-0.5">{step.detail}</p>
                </div>

                <div className="w-full bg-charcoal-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full transition-all duration-500"
                    style={{ width: `${step.progress}%` }}
                  />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Product Philosophy — "From confusion to confidence." */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-100 text-charcoal-800 text-xs font-mono font-semibold uppercase tracking-wider">
            PRODUCT PHILOSOPHY
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900">
            From confusion to confidence.
          </h2>
          <p className="text-base text-charcoal-600 leading-relaxed">
            Managing money shouldn&apos;t feel like deciphering an obscure language. Fermor replaces friction and guesswork with a clear four-stage framework.
          </p>
        </div>

        <div className="relative pt-6">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-200 via-teal-200 to-amber-200 -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {philosophySteps.map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="bg-white p-6 rounded-2xl border border-charcoal-200/80 shadow-subtle space-y-4 hover:shadow-card transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="w-10 h-10 rounded-xl bg-charcoal-900 text-emerald-400 font-mono font-bold text-sm flex items-center justify-center shadow-sm">
                    {step.num}
                  </span>
                  <Badge variant="emerald" size="sm">Stage {idx + 1}</Badge>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold tracking-tight text-charcoal-900 group-hover:text-emerald-800 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-emerald-800 font-mono">{step.subtitle}</p>
                </div>

                <p className="text-xs text-charcoal-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Fictional Demo User Spotlight — "Meet Alex" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card variant="highlight" padding="lg" className="border-emerald-300 shadow-card relative overflow-hidden space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-200/80 pb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-900 text-[11px] font-mono font-bold uppercase">
                  <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                  DEMO USER SPOTLIGHT
                </span>
                <span className="text-[10px] font-mono text-charcoal-400 italic">(Fictional Demo Profile)</span>
              </div>
              <h3 className="text-3xl font-extrabold text-charcoal-900">
                Meet Alex
              </h3>
              <p className="text-xs text-charcoal-600">
                Product Strategist • Age 29 • Building Emergency Reserves
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-charcoal-200 shadow-subtle shrink-0">
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-charcoal-400 block">Financial Health Score</span>
                <span className="text-2xl font-black font-mono text-charcoal-900">74<span className="text-xs text-charcoal-400">/100</span></span>
              </div>
              <Badge variant="positive" size="sm">Good Standing</Badge>
            </div>
          </div>

          <div suppressHydrationWarning className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 bg-white rounded-xl border border-charcoal-200/80 space-y-1">
              <span className="text-charcoal-400 text-[10px] uppercase font-semibold">Monthly Income</span>
              <p className="text-xl font-bold text-charcoal-900">₹50,000<span className="text-xs font-normal text-charcoal-500">/mo</span></p>
              <p className="text-[11px] text-charcoal-500 font-sans">Net take-home salary</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-charcoal-200/80 space-y-1">
              <span className="text-charcoal-400 text-[10px] uppercase font-semibold">Liquid Savings</span>
              <p className="text-xl font-bold text-charcoal-900">₹3,50,000</p>
              <p className="text-[11px] text-charcoal-500 font-sans">Stored in high-yield account</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-charcoal-200/80 space-y-1">
              <span className="text-charcoal-400 text-[10px] uppercase font-semibold">Primary Goal</span>
              <p className="text-xl font-bold text-emerald-900">Emergency Fund</p>
              <p className="text-[11px] text-emerald-700 font-sans">Target: ₹5,00,000 (70% done)</p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-charcoal-200/80 space-y-1">
              <span className="text-charcoal-400 text-[10px] uppercase font-semibold">Overall Index</span>
              <p className="text-xl font-bold text-charcoal-900">74 / 100</p>
              <p className="text-[11px] text-charcoal-500 font-sans">Optimizable cashflow</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-4 rounded-xl bg-white border border-charcoal-200/80 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase text-charcoal-800 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-600" />
                Alex&apos;s Main Financial Opportunity
              </h4>
              <p className="text-xs text-charcoal-600 leading-relaxed font-sans">
                Increasing Alex&apos;s monthly savings from <strong className="text-charcoal-900">₹4,000</strong> to <strong className="text-emerald-800">₹7,000</strong> closes his ₹1,50,000 emergency fund gap <strong className="text-emerald-900">14 months earlier</strong>, while preserving 100% of his essential living comfort.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
              <h4 className="text-xs font-mono font-bold uppercase text-emerald-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-600" />
                Suggested Next Action for Alex
              </h4>
              <p className="text-xs text-emerald-950 leading-relaxed font-medium font-sans">
                Automate a ₹3,000/mo payday auto-sweep directly into high-yield emergency vaults to remove manual spending temptation.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};
