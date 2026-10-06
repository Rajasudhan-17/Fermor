'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScoreGauge } from '@/components/ui/ScoreGauge';
import { FinancialMetrics, ScoreStatus } from '@/types/finance';
import { formatINR } from '@/utils/financeCalculations';
import { Wallet, PiggyBank, ShieldCheck, CreditCard } from 'lucide-react';

interface FinancialHealthOverviewProps {
  metrics: FinancialMetrics;
  score: number;
  status: ScoreStatus;
  scoreDelta?: number;
  userName: string;
}

export const FinancialHealthOverview: React.FC<FinancialHealthOverviewProps> = ({
  metrics,
  score,
  status,
  scoreDelta = 0,
  userName,
}) => {
  return (
    <section id="see" className="py-12 lg:py-16 border-b border-charcoal-200/60 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-100 text-charcoal-800 text-[13px] font-sans tabular-nums font-semibold uppercase tracking-wider">
            <span>Stage 1</span>
            <span className="text-charcoal-400">•</span>
            <span className="text-emerald-900">SEE YOUR STANDING</span>
          </div>
          <h2 className="section-title">
            Current Financial Standing
          </h2>
          <p className="body-editorial">
            Fermor aggregates your liquid reserves, debt load, cash flow stability, and investment pace into a single calibrated Financial Health Index.
          </p>
        </div>

        {/* Core Overview Card (Score + Metrics Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left: Score Gauge Dial */}
          <Card variant="highlight" padding="lg" className="lg:col-span-5 min-w-0 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-full flex items-center justify-between text-[13px] text-charcoal-500 font-sans tabular-nums border-b border-emerald-100/60 pb-3">
              <span>FINANCIAL HEALTH INDEX</span>
              <span className="text-emerald-900 font-semibold">CALIBRATED LIVE</span>
            </div>

            <ScoreGauge score={score} status={status} delta={scoreDelta} size={200} />

            <div className="pt-2 text-[13px] text-charcoal-600 max-w-xs font-sans">
              <p className="font-semibold text-charcoal-950">
                {userName}&apos;s profile is evaluated at{' '}
                <span className="font-bold text-emerald-900 font-sans tabular-nums">{score}/100</span>.
              </p>
              <p className="text-charcoal-500 text-[12px] mt-1">
                Based on 4 primary factors: liquidity, savings rate, debt load, and investment velocity.
              </p>
            </div>
          </Card>

          {/* Right: Key Financial Metrics Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-4 min-w-0">
            {/* Metric 1: Net Worth */}
            <Card variant="default" padding="md" className="h-full min-w-0 flex flex-col justify-between gap-5 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5 font-sans">
                  <Wallet className="w-4 h-4 text-emerald-800" />
                  Estimated Net Worth
                </span>
                <Badge variant="positive" size="sm">Active</Badge>
              </div>
              <div>
                <p suppressHydrationWarning className="metric-headline text-2xl">
                  {formatINR(metrics.netWorth)}
                </p>
                <p suppressHydrationWarning className="text-[13px] text-charcoal-500 mt-1 font-sans">
                  Liquid Assets ({formatINR(metrics.liquidSavings)}) + Investments ({formatINR(metrics.investmentBalance)}) − Debt ({formatINR(metrics.totalDebt)})
                </p>
              </div>
            </Card>

            {/* Metric 2: Monthly Savings Rate */}
            <Card variant="default" padding="md" className="h-full min-w-0 flex flex-col justify-between gap-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5 font-sans">
                  <PiggyBank className="w-4 h-4 text-emerald-800" />
                  Savings Retention
                </span>
                <Badge variant="positive" size="sm">{metrics.savingsRatePct}% Rate</Badge>
              </div>
              <div>
                <p suppressHydrationWarning className="metric-headline text-2xl">
                  {formatINR(metrics.monthlyIncome - metrics.monthlyExpenses)}
                  <span className="text-[13px] font-normal text-charcoal-500 font-sans"> /mo</span>
                </p>
                <p className="text-[13px] text-charcoal-500 mt-1 font-sans">
                  Saving 27% of monthly net cashflow after expense obligations.
                </p>
              </div>
            </Card>

            {/* Metric 3: Emergency Buffer */}
            <Card variant="default" padding="md" className="h-full min-w-0 flex flex-col justify-between gap-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5 font-sans">
                  <ShieldCheck className="w-4 h-4 text-emerald-800" />
                  Emergency Buffer
                </span>
                <Badge variant={metrics.emergencyFundMonths >= 4 ? 'positive' : 'warning'} size="sm">
                  {metrics.emergencyFundMonths} Months
                </Badge>
              </div>
              <div>
                <p suppressHydrationWarning className="metric-headline text-2xl">
                  {formatINR(metrics.liquidSavings)}
                </p>
                <p suppressHydrationWarning className="text-[13px] text-charcoal-500 mt-1 font-sans">
                  Covers {metrics.emergencyFundMonths} months of essential expenses ({formatINR(metrics.monthlyExpenses)}/mo).
                </p>
              </div>
            </Card>

            {/* Metric 4: Debt Ratio */}
            <Card variant="default" padding="md" className="h-full min-w-0 flex flex-col justify-between gap-5">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5 font-sans">
                  <CreditCard className="w-4 h-4 text-amber-700" />
                  Consumer Debt Load
                </span>
                <Badge variant={metrics.debtToIncomePct < 10 ? 'positive' : 'warning'} size="sm">
                  {metrics.debtToIncomePct}% DTI
                </Badge>
              </div>
              <div>
                <p suppressHydrationWarning className="metric-headline text-2xl">
                  {formatINR(metrics.totalDebt)}
                </p>
                <p suppressHydrationWarning className="text-[13px] text-charcoal-500 mt-1 font-sans">
                  Monthly debt servicing: {formatINR(metrics.monthlyDebtPayment)}/mo ({metrics.debtToIncomePct}% of gross income).
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
