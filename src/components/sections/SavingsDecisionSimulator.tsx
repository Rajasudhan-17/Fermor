'use client';

import React, { useState, useId } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatINR } from '@/utils/financeCalculations';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import {
  RotateCcw,
  Sparkles,
  Laptop,
  Smartphone,
  Plane,
  Car,
  Edit3,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

export const SavingsDecisionSimulator: React.FC = () => {
  const DEFAULT_SAVINGS = 5000;
  const [monthlySavings, setMonthlySavings] = useState<number>(DEFAULT_SAVINGS);

  const year1 = monthlySavings * 12;
  const year3 = monthlySavings * 36;
  const year5 = monthlySavings * 60;

  const timelineData = [
    { label: 'Start', year: 0, amount: 0 },
    { label: 'Yr 1', year: 1, amount: year1 },
    { label: 'Yr 2', year: 2, amount: monthlySavings * 24 },
    { label: 'Yr 3', year: 3, amount: year3 },
    { label: 'Yr 4', year: 4, amount: monthlySavings * 48 },
    { label: 'Yr 5', year: 5, amount: year5 },
  ];

  const BASE_SAVINGS = 350000;
  const BASE_INCOME = 60000;
  const BASE_EXPENSES = 38000;
  const GOAL_TARGET = 546875;

  type ScenarioKey = 'laptop' | 'phone' | 'trip' | 'vehicle' | 'custom';

  const scenarios: { key: ScenarioKey; label: string; defaultAmount: number; icon: React.ReactNode }[] = [
    { key: 'laptop', label: 'Laptop', defaultAmount: 80000, icon: <Laptop className="w-4 h-4" /> },
    { key: 'phone', label: 'Phone', defaultAmount: 50000, icon: <Smartphone className="w-4 h-4" /> },
    { key: 'trip', label: 'Trip', defaultAmount: 120000, icon: <Plane className="w-4 h-4" /> },
    { key: 'vehicle', label: 'Vehicle', defaultAmount: 250000, icon: <Car className="w-4 h-4" /> },
    { key: 'custom', label: 'Custom', defaultAmount: 100000, icon: <Edit3 className="w-4 h-4" /> },
  ];

  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>('trip');
  const [customAmountText, setCustomAmountText] = useState<string>('100000');
  const [customError, setCustomError] = useState<string | null>(null);

  let currentPurchaseAmount = 120000;
  if (selectedScenario === 'custom') {
    const parsed = parseFloat(customAmountText.replace(/,/g, ''));
    if (isNaN(parsed) || parsed < 0) {
      currentPurchaseAmount = 0;
    } else {
      currentPurchaseAmount = parsed;
    }
  } else {
    const sc = scenarios.find((s) => s.key === selectedScenario);
    currentPurchaseAmount = sc ? sc.defaultAmount : 120000;
  }

  const handleCustomInput = (val: string) => {
    setCustomAmountText(val);
    const clean = val.replace(/,/g, '');
    if (clean.trim() === '') {
      setCustomError('Enter a valid purchase amount');
    } else {
      const num = Number(clean);
      if (isNaN(num)) {
        setCustomError('Please enter numbers only');
      } else if (num < 0) {
        setCustomError('Amount cannot be negative');
      } else if (num > 10000000) {
        setCustomError('Amount exceeds maximum limit');
      } else {
        setCustomError(null);
      }
    }
  };

  const remainingSavings = Math.max(0, BASE_SAVINGS - currentPurchaseAmount);
  const remainingGoalProgress = Math.min(100, Math.max(0, Math.round((remainingSavings / GOAL_TARGET) * 100)));
  const emergencyMonths = (remainingSavings / BASE_EXPENSES).toFixed(1);

  let visualState: 'positive' | 'neutral' | 'needs_attention' = 'positive';
  let impactExplanation = 'Comfortable buffer. Your emergency reserve remains fully intact above 6 months.';
  let stateBadgeText = 'Positive Impact';

  if (remainingSavings < BASE_EXPENSES * 3) {
    visualState = 'needs_attention';
    impactExplanation = 'High impact. This purchase draws your emergency reserve below the recommended 3-month safety cushion.';
    stateBadgeText = 'Needs Attention';
  } else if (remainingSavings < BASE_EXPENSES * 6) {
    visualState = 'neutral';
    impactExplanation = 'This purchase is possible, but it may slow your emergency-fund goal.';
    stateBadgeText = 'Neutral Impact';
  }

  const customInputId = useId();

  return (
    <div id="simulator-experience" className="space-y-16 py-12 lg:py-16 border-b border-charcoal-200/60 bg-white">
      {/* PART 1: Monthly Savings Impact Simulator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-mono font-semibold uppercase tracking-wider">
              <span>PHASE 3 EXPERIENCE</span>
              <span className="text-emerald-400">•</span>
              <span>DECISION SIMULATOR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900">
              Small decisions can change your future.
            </h2>
            <p className="text-base text-charcoal-600 leading-relaxed">
              Explore how changing your monthly savings could affect your progress over time.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setMonthlySavings(DEFAULT_SAVINGS)}
            icon={<RotateCcw className="w-3.5 h-3.5 text-charcoal-500" />}
          >
            Reset Slider
          </Button>
        </div>

        {/* Main Interactive Slider Card & Calculations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Slider Control (6 cols) */}
          <Card variant="default" padding="lg" className="lg:col-span-6 space-y-8">
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-4">
              <span className="text-xs font-mono uppercase font-semibold text-charcoal-500">
                MONTHLY SAVINGS SLIDER
              </span>
              <span suppressHydrationWarning className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                Selected: {formatINR(monthlySavings)}/mo
              </span>
            </div>

            {/* Slider Component */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs text-charcoal-600 font-medium">
                <span>Adjust monthly savings allocation</span>
                <span suppressHydrationWarning className="font-mono font-bold text-charcoal-900 text-sm">
                  {formatINR(monthlySavings)}
                </span>
              </div>

              <input
                type="range"
                min={1000}
                max={10000}
                step={500}
                value={monthlySavings}
                onChange={(e) => setMonthlySavings(Number(e.target.value))}
                className="w-full h-2.5 bg-charcoal-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />

              <div suppressHydrationWarning className="flex justify-between text-xs font-mono text-charcoal-400">
                <span>{formatINR(1000)}/mo</span>
                <span>{formatINR(5000)}/mo (Default)</span>
                <span>{formatINR(10000)}/mo</span>
              </div>
            </div>

            {/* Dynamic Calculations Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-charcoal-100">
              <div className="p-3 bg-canvas-subtle rounded-xl border border-charcoal-200/60 space-y-1 text-center">
                <span className="text-[10px] font-mono uppercase text-charcoal-400 font-semibold block">1 Year</span>
                <motion.p key={year1} initial={{ scale: 0.95 }} animate={{ scale: 1 }} suppressHydrationWarning className="font-mono font-bold text-charcoal-900 text-base">
                  {formatINR(year1)}
                </motion.p>
              </div>

              <div className="p-3 bg-canvas-subtle rounded-xl border border-charcoal-200/60 space-y-1 text-center">
                <span className="text-[10px] font-mono uppercase text-charcoal-400 font-semibold block">3 Years</span>
                <motion.p key={year3} initial={{ scale: 0.95 }} animate={{ scale: 1 }} suppressHydrationWarning className="font-mono font-bold text-charcoal-900 text-base">
                  {formatINR(year3)}
                </motion.p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 space-y-1 text-center">
                <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold block">5 Years</span>
                <motion.p key={year5} initial={{ scale: 0.95 }} animate={{ scale: 1 }} suppressHydrationWarning className="font-mono font-extrabold text-emerald-950 text-base">
                  {formatINR(year5)}
                </motion.p>
              </div>
            </div>

            <p className="text-[11px] text-charcoal-400 font-mono italic">
              * Illustrative demo calculations. Actual compounding may vary based on savings vehicle rates.
            </p>
          </Card>

          {/* Right Column: Dynamic Recharts Timeline Visualization (6 cols) */}
          <Card variant="highlight" padding="lg" className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
              <span className="text-xs font-semibold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Accumulated Growth Timeline
              </span>
              <span suppressHydrationWarning className="text-xs font-mono font-bold text-emerald-800">
                5-YEAR TOTAL: {formatINR(year5)}
              </span>
            </div>

            <div className="w-full h-64 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="savingsArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                  <XAxis dataKey="label" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} tickFormatter={(val) => formatINR(val)} width={70} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const amount = payload[0].value as number;
                        return (
                          <div className="bg-charcoal-900 text-white p-3 rounded-xl shadow-hover text-xs space-y-1 font-mono border border-charcoal-700">
                            <p className="text-charcoal-300 font-semibold">{payload[0].payload.label} Cumulative Savings</p>
                            <p className="text-emerald-400 font-bold text-sm">{formatINR(amount)}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    stroke="#059669"
                    strokeWidth={3}
                    fill="url(#savingsArea)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </section>

      {/* PART 2: Big Decision Purchase Impact Simulator */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 pt-6">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-100 text-charcoal-800 text-xs font-mono font-semibold uppercase tracking-wider">
            <span>PURCHASE IMPACT MODELING</span>
            <span className="text-charcoal-400">•</span>
            <span className="text-emerald-700">SCENARIO TEST</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-charcoal-900">
            Before you make a big decision, see the impact.
          </h2>
          <p className="text-base text-charcoal-600 leading-relaxed">
            Major spending choices draw directly from your liquid reserve. Select a purchase scenario or enter a custom amount to model its impact on your emergency cushion and financial goals.
          </p>
        </div>

        {/* Demo Financial Baseline Bar */}
        <div suppressHydrationWarning className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-canvas-subtle border border-charcoal-200/80 text-xs font-mono">
          <div>
            <span className="text-charcoal-400 block uppercase text-[10px]">Current Savings</span>
            <span className="font-bold text-charcoal-900 text-sm">{formatINR(BASE_SAVINGS)}</span>
          </div>
          <div>
            <span className="text-charcoal-400 block uppercase text-[10px]">Monthly Income</span>
            <span className="font-bold text-charcoal-900 text-sm">{formatINR(BASE_INCOME)}</span>
          </div>
          <div>
            <span className="text-charcoal-400 block uppercase text-[10px]">Monthly Expenses</span>
            <span className="font-bold text-charcoal-900 text-sm">{formatINR(BASE_EXPENSES)}</span>
          </div>
          <div>
            <span className="text-charcoal-400 block uppercase text-[10px]">Base Goal Progress</span>
            <span className="font-bold text-emerald-800 text-sm">64%</span>
          </div>
        </div>

        {/* Purchase Scenario Selectors */}
        <div className="space-y-4">
          <label className="text-xs font-mono uppercase font-semibold tracking-wider text-charcoal-500 block">
            SELECT PURCHASE SCENARIO
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {scenarios.map((sc) => {
              const isSelected = selectedScenario === sc.key;
              return (
                <button
                  key={sc.key}
                  onClick={() => setSelectedScenario(sc.key)}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-2 ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500/20 shadow-sm'
                      : 'bg-white border-charcoal-200/80 text-charcoal-700 hover:border-charcoal-300 hover:bg-canvas-subtle'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-emerald-600 text-white' : 'bg-charcoal-100 text-charcoal-600'}`}>
                      {sc.icon}
                    </span>
                    {isSelected && <Badge variant="emerald" size="sm">Active</Badge>}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-charcoal-900">{sc.label}</p>
                    <p suppressHydrationWarning className="text-xs font-mono text-charcoal-500">
                      {sc.key === 'custom' ? 'Custom Input' : formatINR(sc.defaultAmount)}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedScenario === 'custom' && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-canvas-subtle border border-charcoal-200 space-y-2 max-w-md"
            >
              <label htmlFor={customInputId} className="text-xs font-semibold text-charcoal-700 block">
                Enter Custom Purchase Amount (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-charcoal-400 font-mono font-bold text-sm">₹</span>
                <input
                  id={customInputId}
                  type="text"
                  value={customAmountText}
                  onChange={(e) => handleCustomInput(e.target.value)}
                  placeholder="e.g. 100000"
                  className="w-full pl-8 pr-4 py-2 rounded-lg border border-charcoal-200 font-mono text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 bg-white"
                />
              </div>
              {customError && <p className="text-xs text-rose-600 font-medium">{customError}</p>}
            </motion.div>
          )}
        </div>

        {/* Dynamic Impact Output Card */}
        <Card
          variant="default"
          padding="lg"
          className={`space-y-6 transition-all border ${
            visualState === 'positive'
              ? 'border-emerald-300 bg-emerald-50/20'
              : visualState === 'neutral'
              ? 'border-amber-300 bg-amber-50/20'
              : 'border-rose-300 bg-rose-50/20'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-charcoal-200/60 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-charcoal-500">
                SCENARIO IMPACT EVALUATION
              </span>
              <h3 suppressHydrationWarning className="text-xl font-bold text-charcoal-900 mt-0.5">
                Purchase Cost: {formatINR(currentPurchaseAmount)}
              </h3>
            </div>
            <Badge
              variant={
                visualState === 'positive'
                  ? 'positive'
                  : visualState === 'neutral'
                  ? 'warning'
                  : 'critical'
              }
              size="md"
            >
              {stateBadgeText}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-xl border border-charcoal-200/80 space-y-1">
              <span className="text-xs text-charcoal-500 font-medium block">Remaining Savings</span>
              <p suppressHydrationWarning className="text-2xl font-bold font-mono text-charcoal-900">
                {formatINR(remainingSavings)}
              </p>
              <p suppressHydrationWarning className="text-[11px] text-charcoal-400">
                Reduced from initial {formatINR(BASE_SAVINGS)}
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-charcoal-200/80 space-y-1">
              <span className="text-xs text-charcoal-500 font-medium block">Recalculated Goal Progress</span>
              <p suppressHydrationWarning className="text-2xl font-bold font-mono text-charcoal-900">
                {remainingGoalProgress}%
              </p>
              <div className="w-full bg-charcoal-100 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className={`h-full transition-all duration-300 ${
                    remainingGoalProgress >= 50 ? 'bg-emerald-600' : 'bg-amber-500'
                  }`}
                  style={{ width: `${remainingGoalProgress}%` }}
                />
              </div>
            </div>

            <div className="p-4 bg-white rounded-xl border border-charcoal-200/80 space-y-1">
              <span className="text-xs text-charcoal-500 font-medium block">Emergency Cushion Status</span>
              <p suppressHydrationWarning className="text-2xl font-bold font-mono text-charcoal-900">
                {emergencyMonths} Months
              </p>
              <p suppressHydrationWarning className="text-[11px] text-charcoal-400">
                Based on {formatINR(BASE_EXPENSES)}/mo essential expenses
              </p>
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border flex items-start gap-3 text-xs leading-relaxed ${
              visualState === 'positive'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950 font-medium'
                : visualState === 'neutral'
                ? 'bg-amber-50 border-amber-200 text-amber-950 font-medium'
                : 'bg-rose-50 border-rose-200 text-rose-950 font-medium'
            }`}
          >
            {visualState === 'positive' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-bold text-sm mb-0.5">Impact Explanation</p>
              <p>{impactExplanation}</p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
};
