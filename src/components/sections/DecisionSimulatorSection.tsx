'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Slider } from '@/components/ui/Slider';
import { Badge } from '@/components/ui/Badge';
import { SimulationParams, LifeEvent } from '@/types/finance';
import { formatINR } from '@/utils/financeCalculations';
import {
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Home,
  Car,
  Briefcase,
  Zap,
  ArrowRight,
} from 'lucide-react';

interface DecisionSimulatorSectionProps {
  params: SimulationParams;
  onChangeParams: (newParams: SimulationParams) => void;
  scoreDelta: number;
  newScore: number;
  onReset: () => void;
}

export const DecisionSimulatorSection: React.FC<DecisionSimulatorSectionProps> = ({
  params,
  onChangeParams,
  scoreDelta,
  newScore,
  onReset,
}) => {
  const updateField = <K extends keyof SimulationParams>(key: K, value: SimulationParams[K]) => {
    onChangeParams({
      ...params,
      [key]: value,
    });
  };

  const lifeEvents: { id: LifeEvent; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'none', label: 'Baseline', icon: <Zap className="w-3.5 h-3.5" />, desc: 'Current routine' },
    { id: 'buy_home', label: 'Buy First Home', icon: <Home className="w-3.5 h-3.5" />, desc: '₹3,50,000 down payment' },
    { id: 'car_purchase', label: 'Buy Vehicle', icon: <Car className="w-3.5 h-3.5" />, desc: '₹1,20,000 cash purchase' },
    { id: 'career_break', label: 'Sabbatical', icon: <Briefcase className="w-3.5 h-3.5" />, desc: '6-mo income pause' },
    { id: 'income_boost', label: 'Career Promotion', icon: <TrendingUp className="w-3.5 h-3.5" />, desc: '+₹8,000/mo net income' },
  ];

  return (
    <section id="decide" className="py-12 lg:py-16 border-b border-charcoal-200/60 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-100 text-charcoal-800 text-xs font-mono font-semibold uppercase tracking-wider">
              <span>Stage 3</span>
              <span className="text-charcoal-400">•</span>
              <span className="text-emerald-900">DECIDE & EXPERIMENT</span>
            </div>
            <h2 className="section-title">
              Interactive Financial Decision Simulator
            </h2>
            <p className="body-editorial">
              Decisions shouldn&apos;t be made in the dark. Adjust cashflow allocations and toggle major life choices to test how small monthly shifts re-shape your Financial Health Index in real time.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              icon={<RotateCcw className="w-3.5 h-3.5 text-charcoal-500" />}
            >
              Reset to Baseline
            </Button>
          </div>
        </div>

        {/* Main Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Sliders Controls (7 cols) */}
          <Card variant="default" padding="lg" className="lg:col-span-7 space-y-8">
            <div className="flex items-center justify-between border-b border-charcoal-100 pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-600 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-800" />
                Variable Allocation Adjusters
              </span>
              <span className="text-[11px] font-mono text-charcoal-400">LIVE RECALCULATION</span>
            </div>

            {/* Slider 1: Monthly Savings */}
            <Slider
              label="Monthly Savings Adjustment"
              description="Increase or decrease cash savings directed to high-yield reserve"
              value={params.monthlySavingsDelta}
              min={-5000}
              max={15000}
              step={500}
              prefix={params.monthlySavingsDelta >= 0 ? '+₹' : '-₹'}
              badgeText={params.monthlySavingsDelta > 0 ? 'Buffer + Boost' : undefined}
              onChange={(val) => updateField('monthlySavingsDelta', val)}
            />

            {/* Slider 2: Debt Payoff Acceleration */}
            <Slider
              label="Extra Debt Payoff Acceleration"
              description="Additional principal paid toward student loans or consumer balance"
              value={params.extraDebtPayment}
              min={0}
              max={10000}
              step={500}
              prefix="+₹"
              unit="/mo"
              badgeText={params.extraDebtPayment > 0 ? 'Accelerating Payoff' : undefined}
              onChange={(val) => updateField('extraDebtPayment', val)}
            />

            {/* Slider 3: Monthly Investment Acceleration */}
            <Slider
              label="Monthly Investment Contribution"
              description="Additional capital funneled to long-term index portfolios"
              value={params.monthlyInvestmentDelta}
              min={-3000}
              max={20000}
              step={500}
              prefix={params.monthlyInvestmentDelta >= 0 ? '+₹' : '-₹'}
              unit="/mo"
              badgeText={params.monthlyInvestmentDelta > 0 ? 'Compounding Engine' : undefined}
              onChange={(val) => updateField('monthlyInvestmentDelta', val)}
            />

            {/* Slider 4: Asset Allocation Mix */}
            <Slider
              label="Equity Market Exposure"
              description={`${params.equityAllocationPct}% Equities / ${100 - params.equityAllocationPct}% Fixed Income & Cash`}
              value={params.equityAllocationPct}
              min={20}
              max={100}
              step={5}
              unit="%"
              onChange={(val) => updateField('equityAllocationPct', val)}
            />

            {/* Life Event Toggle Selector */}
            <div className="space-y-3 pt-4 border-t border-charcoal-100">
              <label className="text-xs font-semibold uppercase tracking-wider text-charcoal-500 block font-mono">
                Simulate Major Life Event
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {lifeEvents.map((evt) => {
                  const isSelected = params.lifeEvent === evt.id;
                  return (
                    <button
                      key={evt.id}
                      onClick={() => updateField('lifeEvent', evt.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between space-y-1.5 ${
                        isSelected
                          ? 'bg-emerald-50/80 border-emerald-500 text-emerald-950 shadow-sm ring-1 ring-emerald-500/20'
                          : 'bg-white border-charcoal-200/80 text-charcoal-700 hover:border-charcoal-300 hover:bg-canvas-subtle'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`p-1.5 rounded-lg ${isSelected ? 'bg-emerald-900 text-white' : 'bg-charcoal-100 text-charcoal-600'}`}>
                          {evt.icon}
                        </span>
                        {isSelected && <Badge variant="emerald" size="sm">Active</Badge>}
                      </div>
                      <div>
                        <p className="font-bold text-xs text-charcoal-950 font-sans">{evt.label}</p>
                        <p className="text-[10px] text-charcoal-500">{evt.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Right: Live Impact Feedback Card (5 cols) */}
          <Card variant="highlight" padding="lg" className="lg:col-span-5 space-y-6 sticky top-20">
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-3">
              <span className="text-xs font-semibold text-emerald-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-800" />
                Simulated Impact Summary
              </span>
              <span className="text-xs font-mono font-bold text-emerald-900">
                SCORE: {newScore} / 100
              </span>
            </div>

            <div className="text-center py-4 space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-charcoal-500 font-semibold">
                HEALTH INDEX DELTA
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="text-5xl font-extrabold font-display tabular-nums text-charcoal-950 tracking-tight">
                  {newScore}
                </span>
                {scoreDelta !== 0 && (
                  <span
                    className={`text-sm font-mono font-bold px-2.5 py-1 rounded-full ${
                      scoreDelta > 0
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {scoreDelta > 0 ? `+${scoreDelta} pts` : `${scoreDelta} pts`}
                  </span>
                )}
              </div>
              <p className="text-xs text-charcoal-600 max-w-xs mx-auto pt-1 font-sans">
                {scoreDelta > 0
                  ? 'Your simulated changes strengthen your liquidity buffer and accelerate net worth accumulation.'
                  : scoreDelta < 0
                  ? 'Selected scenario draws down liquid reserves or increases short-term cashflow friction.'
                  : 'Adjust sliders above to observe score movements.'}
              </p>
            </div>

            {/* Impact Highlights List */}
            <div className="space-y-3 pt-2 text-xs border-t border-emerald-100 font-sans">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-charcoal-200/60">
                <span className="text-charcoal-600">Simulated Extra Monthly Savings:</span>
                <span suppressHydrationWarning className="font-mono font-bold text-charcoal-950">
                  +{formatINR(params.monthlySavingsDelta + params.monthlyInvestmentDelta)}/mo
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-charcoal-200/60">
                <span className="text-charcoal-600">Debt Payoff Boost:</span>
                <span suppressHydrationWarning className="font-mono font-bold text-charcoal-950">
                  +{formatINR(params.extraDebtPayment)}/mo
                </span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-charcoal-200/60">
                <span className="text-charcoal-600">Life Event Active:</span>
                <span className="font-mono font-semibold text-emerald-900 uppercase">
                  {params.lifeEvent.replace('_', ' ')}
                </span>
              </div>
            </div>

            <Button
              variant="emerald"
              size="md"
              className="w-full"
              onClick={() => {
                const el = document.getElementById('grow');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              See 20-Year Horizon Impact
            </Button>
          </Card>
        </div>
      </div>
    </section>
  );
};
