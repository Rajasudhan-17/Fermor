'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { YearProjection } from '@/types/finance';
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
import { Award, ArrowUpRight } from 'lucide-react';

interface FutureTrajectorySectionProps {
  projections: YearProjection[];
  baselineScore: number;
  simulatedScore: number;
}

export const FutureTrajectorySection: React.FC<FutureTrajectorySectionProps> = ({
  projections,
  baselineScore,
  simulatedScore,
}) => {
  const [horizonYears, setHorizonYears] = useState<number>(20);

  const filteredProjections = projections.filter((p) => p.year <= horizonYears);

  const finalProjection = filteredProjections[filteredProjections.length - 1];
  const deltaNetWorth =
    (finalProjection?.simulatedNetWorth || 0) - (finalProjection?.baselineNetWorth || 0);

  const milestones = filteredProjections.filter((p) => p.milestone);

  return (
    <section id="grow" className="py-12 lg:py-16 border-b border-charcoal-200/60 bg-canvas-subtle/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-100 text-charcoal-800 text-xs font-mono font-semibold uppercase tracking-wider">
              <span>Stage 4</span>
              <span className="text-charcoal-400">•</span>
              <span className="text-emerald-900">SEE WHERE THEY TAKE YOU</span>
            </div>
            <h2 className="section-title">
              Future Net Worth Trajectory
            </h2>
            <p className="body-editorial">
              Compare your current default baseline against your simulated scenario. Small adjustments to your savings and investment velocity compound into vast differences over 5 to 20 years.
            </p>
          </div>

          {/* Time Horizon Selector */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-charcoal-200 shadow-subtle font-mono text-xs">
            {[5, 10, 20].map((years) => (
              <button
                key={years}
                onClick={() => setHorizonYears(years)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  horizonYears === years
                    ? 'bg-charcoal-950 text-white shadow-sm'
                    : 'text-charcoal-600 hover:text-charcoal-950 hover:bg-canvas-subtle'
                }`}
              >
                {years} Years
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Delta Summary Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card variant="highlight" padding="md" className="space-y-1">
            <span className="text-[11px] font-mono font-semibold uppercase text-emerald-900">
              {horizonYears}-Year Simulated Net Worth Delta
            </span>
            <p suppressHydrationWarning className="text-2xl font-extrabold font-display tabular-nums text-emerald-950 flex items-center gap-2">
              {deltaNetWorth >= 0 ? `+${formatINR(deltaNetWorth)}` : formatINR(deltaNetWorth)}
              <ArrowUpRight className="w-5 h-5 text-emerald-800" />
            </p>
            <p className="text-xs text-emerald-800 font-sans">
              Difference between simulated choices and default baseline at Year {horizonYears}.
            </p>
          </Card>

          <Card variant="default" padding="md" className="space-y-1">
            <span className="text-[11px] font-mono font-semibold uppercase text-charcoal-400">
              Baseline Projected (Year {horizonYears})
            </span>
            <p suppressHydrationWarning className="text-2xl font-bold font-display tabular-nums text-charcoal-700">
              {formatINR(finalProjection?.baselineNetWorth || 0)}
            </p>
            <p className="text-xs text-charcoal-500 font-sans">
              Continuing current habits without adjustments.
            </p>
          </Card>

          <Card variant="default" padding="md" className="space-y-1">
            <span className="text-[11px] font-mono font-semibold uppercase text-emerald-900">
              Simulated Projected (Year {horizonYears})
            </span>
            <p suppressHydrationWarning className="text-2xl font-bold font-display tabular-nums text-emerald-950">
              {formatINR(finalProjection?.simulatedNetWorth || 0)}
            </p>
            <p className="text-xs text-charcoal-500 font-sans">
              Projected net wealth under simulated scenario.
            </p>
          </Card>
        </div>

        {/* Recharts Chart Component */}
        <Card variant="default" padding="lg" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-100 pb-4">
            <div className="space-y-0.5">
              <h3 className="font-bold text-charcoal-950 text-base font-sans">
                Net Worth Growth Horizon (Age {filteredProjections[0]?.age} → Age {finalProjection?.age})
              </h3>
              <p className="text-xs text-charcoal-500 font-sans">
                Compounded growth calculated assuming 6.5% baseline return vs allocation-adjusted return.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 text-charcoal-500">
                <span className="w-3 h-0.5 bg-charcoal-400 border border-dashed border-charcoal-600 inline-block" />
                Baseline Path
              </span>
              <span className="inline-flex items-center gap-1.5 text-emerald-900 font-bold">
                <span className="w-3 h-2 bg-emerald-800 rounded inline-block" />
                Simulated Path
              </span>
            </div>
          </div>

          <div className="w-full h-80 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredProjections} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="simulatedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#047857" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#047857" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="baselineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#64748B" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#64748B" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={false} />
                <XAxis
                  dataKey="year"
                  stroke="#94A3B8"
                  fontSize={11}
                  tickFormatter={(val) => `Yr ${val}`}
                />
                <YAxis
                  stroke="#94A3B8"
                  fontSize={11}
                  tickFormatter={(val) => formatINR(val)}
                  width={75}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as YearProjection;
                      return (
                        <div className="bg-charcoal-900 text-white p-3.5 rounded-xl shadow-hover text-xs space-y-2 font-sans border border-charcoal-700 max-w-xs">
                          <div className="flex justify-between items-center border-b border-charcoal-700 pb-1.5 font-mono text-[11px] text-charcoal-300">
                            <span>Year {data.year} (Age {data.age})</span>
                            {data.milestone && <span className="text-emerald-400 font-bold">{data.milestone}</span>}
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between gap-4 font-mono">
                              <span className="text-charcoal-400">Baseline Net Worth:</span>
                              <span className="font-bold text-charcoal-200">{formatINR(data.baselineNetWorth)}</span>
                            </div>
                            <div className="flex justify-between gap-4 font-mono">
                              <span className="text-emerald-400">Simulated Net Worth:</span>
                              <span className="font-bold text-emerald-400">{formatINR(data.simulatedNetWorth)}</span>
                            </div>
                            <div className="flex justify-between gap-4 font-mono text-[10px] text-charcoal-400 pt-1 border-t border-charcoal-800">
                              <span>Simulated Debt Balance:</span>
                              <span>{formatINR(data.simulatedDebt)}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="baselineNetWorth"
                  stroke="#94A3B8"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  fill="url(#baselineGradient)"
                  name="Baseline Path"
                />
                <Area
                  type="monotone"
                  dataKey="simulatedNetWorth"
                  stroke="#047857"
                  strokeWidth={3}
                  fill="url(#simulatedGradient)"
                  name="Simulated Path"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Milestone Cards Carousel / Grid */}
        {milestones.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-800" />
              Projected Financial Milestones Achieved
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {milestones.map((m) => (
                <Card key={m.year} variant="flat" padding="sm" className="space-y-1.5 border-emerald-200/80 bg-emerald-50/40">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase text-emerald-900">
                      Year {m.year} (Age {m.age})
                    </span>
                    <Badge variant="positive" size="sm">Milestone</Badge>
                  </div>
                  <p className="font-semibold text-xs text-charcoal-950 font-sans">{m.milestone}</p>
                  <p suppressHydrationWarning className="text-[11px] font-mono text-emerald-950">
                    Net Worth: {formatINR(m.simulatedNetWorth)}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
