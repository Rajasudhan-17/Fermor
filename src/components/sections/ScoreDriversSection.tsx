'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ScoreDriver } from '@/types/finance';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Info,
  ArrowRight,
  Target,
  Sparkles,
} from 'lucide-react';

interface ScoreDriversSectionProps {
  drivers: ScoreDriver[];
  score: number;
}

export const ScoreDriversSection: React.FC<ScoreDriversSectionProps> = ({
  drivers,
  score,
}) => {
  const [selectedDriver, setSelectedDriver] = useState<ScoreDriver | null>(null);

  const getStatusBadge = (status: ScoreDriver['status']) => {
    switch (status) {
      case 'positive':
        return <Badge variant="positive" icon={<CheckCircle2 className="w-3 h-3" />}>Strong Factor</Badge>;
      case 'warning':
        return <Badge variant="warning" icon={<AlertTriangle className="w-3 h-3" />}>Opportunity Area</Badge>;
      case 'critical':
        return <Badge variant="critical" icon={<AlertTriangle className="w-3 h-3" />}>Action Required</Badge>;
      default:
        return <Badge variant="neutral">Neutral</Badge>;
    }
  };

  return (
    <section id="understand" className="py-12 lg:py-16 border-b border-charcoal-200/60 bg-canvas-subtle/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-charcoal-100 text-charcoal-800 text-[13px] font-sans tabular-nums font-semibold uppercase tracking-wider">
              <span>Stage 2</span>
              <span className="text-charcoal-400">•</span>
              <span className="text-emerald-700">UNDERSTAND THE DRIVERS</span>
            </div>
            <h2 className="section-title">
              Why Your Score is {score}/100
            </h2>
            <p className="text-base text-charcoal-600 leading-relaxed">
              Fermor breaks down your index into individual operational drivers. Understanding these underlying factors tells you exactly where your financial momentum originates—and where liquidity friction resides.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-[13px] text-charcoal-500 bg-white px-3 py-2 rounded-xl border border-charcoal-200/80 shadow-subtle">
            <Info className="w-4 h-4 text-emerald-600" />
            <span>Click any driver card for recommendations</span>
          </div>
        </div>

        {/* Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {drivers.map((driver) => {
            const isPositive = driver.scoreImpact > 0;
            return (
              <Card
                key={driver.id}
                variant="interactive"
                padding="md"
                onClick={() => setSelectedDriver(driver)}
                className="flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-all group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {getStatusBadge(driver.status)}
                    <span
                      className={`font-sans tabular-nums text-[13px] font-bold px-2 py-0.5 rounded ${
                        isPositive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isPositive ? `+${driver.scoreImpact} pts` : `${driver.scoreImpact} pts`}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-charcoal-900 group-hover:text-emerald-800 transition-colors flex items-center justify-between">
                      {driver.title}
                      <ChevronRight className="w-4 h-4 text-charcoal-400 group-hover:translate-x-1 transition-transform" />
                    </h3>
                    <p className="text-[13px] text-charcoal-600 mt-1.5 leading-relaxed line-clamp-2">
                      {driver.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-charcoal-100 flex items-center justify-between text-[13px] font-sans tabular-nums">
                  <span className="text-charcoal-500">Current: <strong className="text-charcoal-900">{driver.currentValue}</strong></span>
                  <span className="text-emerald-700">Target: <strong className="text-emerald-900">{driver.targetValue}</strong></span>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Selected Driver Detail Drawer / Modal */}
        <AnimatePresence>
          {selectedDriver && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/40 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-hover border border-charcoal-200 relative"
              >
                <div className="flex items-center justify-between border-b border-charcoal-100 pb-4">
                  <div className="space-y-1">
                    <span className="text-[12px] font-sans tabular-nums uppercase text-charcoal-400 font-semibold tracking-wider">
                      Driver Deep-Dive Analysis
                    </span>
                    <h3 className="text-xl font-bold text-charcoal-900">
                      {selectedDriver.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedDriver(null)}
                    className="text-charcoal-400 hover:text-charcoal-800 text-sm font-semibold p-1 rounded-lg hover:bg-charcoal-100"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-canvas-subtle p-3.5 rounded-xl border border-charcoal-200/60 space-y-1.5">
                    <span className="text-[13px] font-semibold text-charcoal-700 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-emerald-600" />
                      Current Benchmark Status
                    </span>
                    <p className="text-[13px] text-charcoal-600 leading-relaxed">
                      {selectedDriver.description}
                    </p>
                  </div>

                  <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-2">
                    <span className="text-[13px] font-semibold text-emerald-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      Fermor Recommendation Engine
                    </span>
                    <p className="text-[13px] text-emerald-950 leading-relaxed font-medium">
                      {selectedDriver.recommendation}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[13px] font-sans tabular-nums pt-2">
                    <div className="p-3 rounded-lg bg-charcoal-50 border border-charcoal-200/60">
                      <span className="text-charcoal-400 block text-[12px] uppercase">Current Standing</span>
                      <span className="font-bold text-charcoal-900 text-sm">{selectedDriver.currentValue}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                      <span className="text-emerald-700 block text-[12px] uppercase">Recommended Target</span>
                      <span className="font-bold text-emerald-900 text-sm">{selectedDriver.targetValue}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <Button variant="primary" size="sm" onClick={() => setSelectedDriver(null)}>
                    Done Reviewing
                  </Button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
