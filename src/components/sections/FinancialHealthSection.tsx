'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatINR } from '@/utils/financeCalculations';
import {
  Wallet,
  PiggyBank,
  PieChart,
  CreditCard,
  Target,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export interface HealthPillarItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  score: number;
  status: 'Strong' | 'Solid' | 'Optimizable' | 'Needs Attention' | 'On Track';
  statusVariant: 'positive' | 'warning' | 'critical' | 'neutral';
  explanation: string;
  amountLabel: string;
  positiveFactors: string[];
  areasNeedingAttention: string[];
  suggestedNextStep: string;
}

const PILLARS: HealthPillarItem[] = [
  {
    id: 'spending',
    name: 'Spending',
    icon: <Wallet className="w-4.5 h-4.5 text-emerald-800" />,
    score: 82,
    status: 'Solid',
    statusVariant: 'positive',
    amountLabel: '₹49,000 / mo fixed spend',
    explanation: 'Monthly fixed expenses consume 54% of net income, maintaining a healthy 46% margin.',
    positiveFactors: [
      'Discretionary spend remains well within targeted 20% guardrails',
      'Fixed obligations consume under 60% of total take-home pay',
    ],
    areasNeedingAttention: [
      'Dining and entertainment expanded 8% over the past quarter',
    ],
    suggestedNextStep: 'Establish an automated weekly discretionary spending cap of ₹3,500.',
  },
  {
    id: 'savings',
    name: 'Savings',
    icon: <PiggyBank className="w-4.5 h-4.5 text-emerald-800" />,
    score: 76,
    status: 'Strong',
    statusVariant: 'positive',
    amountLabel: '₹2,15,000 liquid',
    explanation: '4.4 months of essential expenses are currently covered in liquid reserve.',
    positiveFactors: [
      'Liquidity reserve stored in high-yield liquid account',
      'Automated payday transfers maintain 27% cashflow retention',
    ],
    areasNeedingAttention: [
      'Reserve is 1.6 months short of the ideal 6-month full insulation target (₹2,94,000)',
    ],
    suggestedNextStep: 'Direct an additional ₹2,500/month into savings to strengthen your emergency reserve.',
  },
  {
    id: 'investments',
    name: 'Investments',
    icon: <PieChart className="w-4.5 h-4.5 text-emerald-800" />,
    score: 74,
    status: 'Optimizable',
    statusVariant: 'positive',
    amountLabel: '₹4,80,000 portfolio',
    explanation: 'Consistent ₹8,000/mo index contributions with an efficient 80/20 equity-to-bond allocation.',
    positiveFactors: [
      'Low expense ratio global index funds minimize drag (< 0.05% TER)',
      'Disciplined dollar-cost averaging uninterrupted over 24 months',
    ],
    areasNeedingAttention: [
      'Tax-advantaged account capacity is not yet fully maxed out',
    ],
    suggestedNextStep: 'Increase monthly investment contribution by ₹3,000/mo to capture compound momentum.',
  },
  {
    id: 'debt',
    name: 'Debt',
    icon: <CreditCard className="w-4.5 h-4.5 text-amber-700" />,
    score: 68,
    status: 'Needs Attention',
    statusVariant: 'warning',
    amountLabel: '₹3,20,000 balance',
    explanation: 'Fixed debt payments take 7.1% of gross income (₹5,500/mo), creating interest drag.',
    positiveFactors: [
      'Zero high-interest credit card debt; loans are structured low-rate mix',
      'Debt service ratio is well below maximum danger thresholds (< 15%)',
    ],
    areasNeedingAttention: [
      'Interest payments total ₹18,000 annually that could otherwise compound in investments',
    ],
    suggestedNextStep: 'Apply an extra ₹2,000/mo debt avalanche to clear highest-rate principal 14 months early.',
  },
  {
    id: 'goals',
    name: 'Goals',
    icon: <Target className="w-4.5 h-4.5 text-emerald-800" />,
    score: 85,
    status: 'On Track',
    statusVariant: 'positive',
    amountLabel: '2 Active Milestones',
    explanation: 'On schedule for emergency buffer completion and primary home down payment milestones.',
    positiveFactors: [
      'Primary savings goal is 73% complete with positive monthly momentum',
      'Target horizon dates are realistic and aligned with cashflow projections',
    ],
    areasNeedingAttention: [
      'Secondary goal lacks dedicated automated sub-account tracking',
    ],
    suggestedNextStep: 'Link automated sub-vault rules to separate emergency funds from primary goal funds.',
  },
];

export const FinancialHealthSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('savings');

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const scrollToSimulator = () => {
    const el = document.getElementById('simulator-experience') || document.getElementById('decide');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="health-categories" className="py-16 lg:py-24 border-b border-charcoal-200/60 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* FINANCIAL HEALTH SUMMARY (Before Pillars) */}
        <div className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canvas-subtle text-charcoal-800 label-eyebrow border border-charcoal-200/60">
              <span>FINANCIAL DIAGNOSTICS</span>
              <span className="text-charcoal-400">•</span>
              <span className="text-emerald-900 font-bold">FIVE CORE PILLARS</span>
            </div>
            <h2 className="section-title">
              How is your money doing?
            </h2>
            <p className="body-editorial">
              Fermor looks at five interconnected areas of financial health to help you understand your baseline standing, identify hidden friction, and model your best next move.
            </p>
          </div>

          {/* Editorial Summary Box */}
          <Card variant="flat" padding="lg" className="border-charcoal-200 bg-canvas-subtle/80 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-[minmax(180px,0.72fr)_minmax(0,2fr)] gap-6 border-b border-charcoal-200/80 pb-6">
              <div className="space-y-1 md:border-r md:border-charcoal-200/80 md:pr-6">
                <span className="text-[13px] font-sans tabular-nums font-bold uppercase tracking-wider text-charcoal-500">
                  OVERALL INDEX STANDING
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="metric-headline text-5xl">82</span>
                  <span className="text-2xl font-sans text-charcoal-400 font-semibold">/ 100</span>
                </div>
                <p className="text-sm font-semibold text-emerald-900 font-sans mt-0.5">
                  You&apos;re in a strong financial position.
                </p>
              </div>

              {/* Summary Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 text-[13px] font-sans min-w-0">
                <div className="min-w-0 p-4 bg-white rounded-xl border border-charcoal-200/80 space-y-2">
                  <span className="text-[12px] font-sans tabular-nums uppercase text-charcoal-400 font-semibold block">Strongest Area</span>
                  <span className="font-semibold text-charcoal-950 text-sm flex items-center gap-2 leading-snug">
                    <ShieldCheck className="w-4 h-4 text-emerald-800" /> Spending (82/100)
                  </span>
                </div>

                <div className="min-w-0 p-4 bg-white rounded-xl border border-charcoal-200/80 space-y-2">
                  <span className="text-[12px] font-sans tabular-nums uppercase text-charcoal-400 font-semibold block">Biggest Opportunity</span>
                  <span className="font-semibold text-charcoal-950 text-sm flex items-center gap-2 leading-snug">
                    <TrendingUp className="w-4 h-4 text-emerald-800" /> Savings (76/100)
                  </span>
                </div>

                <div className="min-w-0 p-4 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2 sm:col-span-2 xl:col-span-1">
                  <span className="text-[12px] font-sans tabular-nums uppercase text-emerald-900 font-bold block">Next Best Move</span>
                  <span className="font-semibold text-emerald-950 text-[13px] leading-snug">Build your emergency reserve</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* FIVE FINANCIAL PILLARS */}
        <div className="space-y-6">
          <h3 className="text-[13px] font-sans tabular-nums font-bold uppercase tracking-wider text-charcoal-500">
            INDIVIDUAL FINANCIAL PILLAR BREAKDOWN
          </h3>

          <div className="space-y-3">
            {PILLARS.map((pillar) => {
              const isExpanded = expandedId === pillar.id;
              return (
                <div
                  key={pillar.id}
                  className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'border-emerald-300 shadow-card ring-1 ring-emerald-500/10'
                      : 'border-charcoal-200 hover:border-charcoal-300 shadow-subtle'
                  }`}
                >
                  {/* Pillar Header & Main Row */}
                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Top Row: Category + Amount + Score */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-canvas-subtle border border-charcoal-200/70 flex items-center justify-center shrink-0">
                          {pillar.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-lg text-charcoal-950 tracking-tight">
                              {pillar.name}
                            </h4>
                            <Badge variant={pillar.statusVariant} size="sm">
                              {pillar.status}
                            </Badge>
                          </div>
                          <p suppressHydrationWarning className="text-[13px] font-sans tabular-nums font-bold text-charcoal-600 mt-0.5">
                            {pillar.amountLabel}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-baseline gap-1 self-start sm:self-auto">
                        <span className="font-sans font-extrabold text-2xl text-charcoal-950 tabular-nums">
                          {pillar.score}
                        </span>
                        <span className="text-[13px] font-sans tabular-nums text-charcoal-400">/ 100</span>
                      </div>
                    </div>

                    {/* Short Explanation */}
                    <p className="text-sm text-charcoal-600 leading-relaxed font-normal">
                      {pillar.explanation}
                    </p>

                    {/* Thin Progress Bar */}
                    <div className="w-full bg-charcoal-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-500 ${
                          pillar.score >= 80
                            ? 'bg-emerald-800'
                            : pillar.score >= 70
                            ? 'bg-emerald-700'
                            : 'bg-amber-600'
                        }`}
                        style={{ width: `${pillar.score}%` }}
                      />
                    </div>

                    {/* Trigger: "Understand your score →" */}
                    <div className="flex justify-end pt-1">
                      <button
                        type="button"
                        onClick={() => toggleExpand(pillar.id)}
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-emerald-900 hover:text-emerald-950 focus:outline-none"
                      >
                        <span>{isExpanded ? 'Hide analysis' : 'Understand your score'}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* COHESIVE EXPANDED PILLAR DESIGN */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="border-t border-charcoal-200/80 bg-canvas-subtle/50 p-6 space-y-6"
                      >
                        {/* 2-Column Desktop Factor Analysis */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[13px]">
                          {/* WHAT'S HELPING */}
                          <div className="space-y-2">
                            <h5 className="font-sans tabular-nums font-bold uppercase tracking-wider text-emerald-900 flex items-center gap-1.5">
                              <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                              WHAT&apos;S HELPING
                            </h5>
                            <ul className="space-y-1.5 text-charcoal-700">
                              {pillar.positiveFactors.map((factor, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-emerald-800 font-bold">•</span>
                                  <span>{factor}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* WHAT NEEDS ATTENTION */}
                          <div className="space-y-2">
                            <h5 className="font-sans tabular-nums font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                              <AlertTriangle className="w-4 h-4 text-amber-700" />
                              WHAT NEEDS ATTENTION
                            </h5>
                            <ul className="space-y-1.5 text-charcoal-700">
                              {pillar.areasNeedingAttention.map((area, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-amber-700 font-bold">•</span>
                                  <span>{area}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Divider Line */}
                        <div className="border-t border-charcoal-200/80" />

                        {/* NEXT BEST MOVE */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <span className="font-sans tabular-nums font-bold uppercase text-[12px] text-emerald-900 tracking-wider flex items-center gap-1">
                              <Zap className="w-3.5 h-3.5 text-emerald-800" />
                              NEXT BEST MOVE
                            </span>
                            <p className="font-semibold text-charcoal-950 text-sm">
                              {pillar.suggestedNextStep}
                            </p>
                          </div>

                          <Button
                            variant="emerald"
                            size="sm"
                            onClick={scrollToSimulator}
                            icon={<ArrowRight className="w-3.5 h-3.5" />}
                          >
                            Simulate impact →
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
