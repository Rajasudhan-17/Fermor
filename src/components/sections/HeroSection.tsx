'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatINR } from '@/utils/financeCalculations';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Wallet,
  PiggyBank,
  PieChart,
  Target,
  Info,
} from 'lucide-react';

export const HeroSection: React.FC = () => {
  const scoreRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scoreRef, { once: true, margin: '-50px' });
  const [displayScore, setDisplayScore] = useState<number>(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, 78, {
        duration: 1.8,
        ease: 'easeOut',
        onUpdate(value) {
          setDisplayScore(Math.round(value));
        },
      });
      return () => controls.stop();
    }
  }, [isInView]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 border-b border-charcoal-200/60 bg-gradient-to-b from-canvas to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Hero Grid: Headline & Copy Left, Financial Card Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & CTAs (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 label-eyebrow">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>FERMOR FINANCIAL HEALTH PLATFORM</span>
              <span className="text-emerald-400">•</span>
              <span className="text-emerald-700 font-bold">DEMO PROTOTYPE</span>
            </div>

            <h1 className="hero-title">
              Know where you stand financially.
            </h1>

            <p className="body-editorial">
              Fermor helps you understand your financial health, explore your choices, and see how today&apos;s decisions can shape tomorrow.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                variant="emerald"
                size="lg"
                className="px-7 py-3 min-h-[56px] gap-3 whitespace-nowrap"
                onClick={() => scrollTo('health-categories')}
                icon={<ArrowRight className="w-4 h-4 text-emerald-300" />}
              >
                Explore your finances
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-7 py-3 min-h-[56px] gap-3 whitespace-nowrap"
                onClick={() => scrollTo('understand')}
                icon={<Info className="w-4 h-4 text-charcoal-500" />}
              >
                See how it works
              </Button>
            </div>

            <p className="text-[12px] text-charcoal-500 flex items-center gap-2 pt-1 font-sans">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Simulated demo metrics. Not binding financial advice.</span>
            </p>
          </div>

          {/* Right Column: Formal Professional Financial Health Card Visualization (5 cols) */}
          <div className="lg:col-span-5" ref={scoreRef}>
            <Card variant="highlight" padding="lg" className="space-y-6 shadow-hover border-emerald-200/90 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                <span className="label-eyebrow text-charcoal-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  FINANCIAL HEALTH CARD
                </span>
                <span className="text-[12px] font-sans font-bold text-emerald-900 bg-emerald-100/80 px-2 py-0.5 rounded">
                  DEMO DATA
                </span>
              </div>

              {/* Animated Score Display */}
              <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-charcoal-200/80 shadow-subtle">
                <div className="space-y-1">
                  <span className="text-[13px] font-sans font-semibold uppercase tracking-wider text-charcoal-500">
                    OVERALL SCORE
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span className="metric-headline text-5xl">
                      {displayScore}
                    </span>
                    <span className="text-xl font-sans text-charcoal-400 font-semibold">
                      /100
                    </span>
                  </div>
                  <Badge variant="positive" size="sm">
                    Strong Standing
                  </Badge>
                </div>

                {/* Score Progress Dial Indicator */}
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r="32"
                      className="stroke-charcoal-100"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="40"
                      cy="40"
                      r="32"
                      stroke="#059669"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 32}
                      initial={{ strokeDashoffset: 2 * Math.PI * 32 }}
                      animate={{
                        strokeDashoffset: isInView
                          ? 2 * Math.PI * 32 - (78 / 100) * (2 * Math.PI * 32)
                          : 2 * Math.PI * 32,
                      }}
                      transition={{ duration: 1.8, ease: 'easeOut' }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-[13px] font-sans font-bold text-emerald-800 tabular-nums">
                    78%
                  </span>
                </div>
              </div>

              {/* Formal Professional Financial Metric Quick Grid (All Rupees) */}
              <div className="grid grid-cols-2 gap-3.5 text-[13px] font-sans">
                {/* Spending */}
                <div className="p-3.5 bg-white rounded-xl border border-charcoal-200/60 space-y-1.5">
                  <div className="flex items-center justify-between text-charcoal-600 font-sans">
                    <span className="flex items-center gap-1.5 font-medium text-charcoal-700">
                      <Wallet className="w-4 h-4 text-emerald-600" /> Spending
                    </span>
                    <span className="font-sans font-bold text-[13px] text-emerald-700 tabular-nums">82</span>
                  </div>
                  <p suppressHydrationWarning className="font-sans font-extrabold text-charcoal-950 text-base tracking-tight tabular-nums">
                    {formatINR(49000)}<span className="text-[13px] font-normal text-charcoal-500">/mo</span>
                  </p>
                </div>

                {/* Savings */}
                <div className="p-3.5 bg-white rounded-xl border border-charcoal-200/60 space-y-1.5">
                  <div className="flex items-center justify-between text-charcoal-600 font-sans">
                    <span className="flex items-center gap-1.5 font-medium text-charcoal-700">
                      <PiggyBank className="w-4 h-4 text-emerald-600" /> Savings
                    </span>
                    <span className="font-sans font-bold text-[13px] text-emerald-700 tabular-nums">76</span>
                  </div>
                  <p suppressHydrationWarning className="font-sans font-extrabold text-charcoal-950 text-base tracking-tight tabular-nums">
                    {formatINR(215000)}
                  </p>
                </div>

                {/* Investments */}
                <div className="p-3.5 bg-white rounded-xl border border-charcoal-200/60 space-y-1.5">
                  <div className="flex items-center justify-between text-charcoal-600 font-sans">
                    <span className="flex items-center gap-1.5 font-medium text-charcoal-700">
                      <PieChart className="w-4 h-4 text-teal-600" /> Investments
                    </span>
                    <span className="font-sans font-bold text-[13px] text-teal-700 tabular-nums">74</span>
                  </div>
                  <p suppressHydrationWarning className="font-sans font-extrabold text-charcoal-950 text-base tracking-tight tabular-nums">
                    {formatINR(480000)}
                  </p>
                </div>

                {/* Goals */}
                <div className="p-3.5 bg-white rounded-xl border border-charcoal-200/60 space-y-1.5">
                  <div className="flex items-center justify-between text-charcoal-600 font-sans">
                    <span className="flex items-center gap-1.5 font-medium text-charcoal-700">
                      <Target className="w-4 h-4 text-amber-600" /> Goals
                    </span>
                    <span className="font-sans font-bold text-[13px] text-amber-700 tabular-nums">85</span>
                  </div>
                  <p className="font-sans font-extrabold text-charcoal-950 text-base tracking-tight tabular-nums">
                    2 Active
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
