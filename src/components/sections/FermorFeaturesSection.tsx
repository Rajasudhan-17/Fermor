'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProfilePreset } from '@/types/finance';
import { MOCK_PROFILES } from '@/data/mockData';
import {
  ShieldCheck,
  Zap,
  Sliders,
  Lock,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Sparkles,
  BarChart3,
} from 'lucide-react';

interface FermorFeaturesSectionProps {
  currentProfile: ProfilePreset;
  onSelectProfile: (profile: ProfilePreset) => void;
}

export const FermorFeaturesSection: React.FC<FermorFeaturesSectionProps> = ({
  currentProfile,
  onSelectProfile,
}) => {
  const features = [
    {
      icon: <BarChart3 className="w-5 h-5 text-emerald-600" />,
      title: 'Unified Health Index',
      description: 'Replaces fractured spreadsheet tabs with a single, continuously updated financial standing score.',
    },
    {
      icon: <Sliders className="w-5 h-5 text-teal-600" />,
      title: 'Scenario Engine',
      description: 'Test life events—buying a home, taking a sabbatical, or changing careers—before committing capital.',
    },
    {
      icon: <Zap className="w-5 h-5 text-emerald-600" />,
      title: 'Smart Execution Rules',
      description: 'Automate high-yield savings sweeps and debt avalanche payments when surplus cashflow triggers.',
    },
    {
      icon: <Lock className="w-5 h-5 text-charcoal-700" />,
      title: 'Privacy-First Architecture',
      description: 'Bank-grade AES-256 encryption with zero third-party data selling or intrusive ad tracking.',
    },
  ];

  return (
    <section id="platform" className="py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[13px] font-sans tabular-nums font-semibold uppercase tracking-wider border border-emerald-200">
            WHAT FERMOR HELPS YOU DO
          </span>
          <h2 className="section-title">
            From Understanding Your Standings to Executing Your Growth
          </h2>
          <p className="text-base text-charcoal-600 leading-relaxed">
            Fermor combines real-time data aggregation with deterministic modeling tools, giving you complete clarity over every financial decision.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {features.map((feat, idx) => (
            <article key={idx} className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-x-4 border-t border-charcoal-200 py-6">
              <div className="pt-0.5 text-emerald-800">{feat.icon}</div>
              <div className="min-w-0 space-y-2">
                <h3 className="text-lg font-semibold tracking-tight text-charcoal-900">{feat.title}</h3>
                <p className="max-w-[52ch] text-sm leading-relaxed text-charcoal-600">{feat.description}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Interactive Scenario Presets Demo Banner */}
        <Card variant="flat" padding="lg" className="space-y-6 border-charcoal-200/80 bg-canvas-subtle">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-charcoal-200/60 pb-4">
            <div className="space-y-1">
              <span className="text-[13px] font-sans tabular-nums font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-emerald-600" />
                Explore Fictional Demo Profiles
              </span>
              <p className="text-[13px] text-charcoal-600">
                Switch profiles to test how Fermor models different financial stages in real time.
              </p>
            </div>
            <span className="text-[12px] font-sans tabular-nums text-charcoal-400">SELECT TO LOAD</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {MOCK_PROFILES.map((p) => {
              const isSelected = p.id === currentProfile.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectProfile(p)}
                  className={`p-4 rounded-xl text-left border transition-all space-y-2 ${
                    isSelected
                      ? 'bg-white border-emerald-500 shadow-card ring-1 ring-emerald-500/20'
                      : 'bg-white/60 border-charcoal-200 hover:bg-white hover:border-charcoal-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-charcoal-900">{p.name}</span>
                    <span className="font-sans tabular-nums text-[13px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {p.score}/100
                    </span>
                  </div>
                  <p className="text-[13px] text-charcoal-500 font-medium">{p.role}, Age {p.age}</p>
                  <p className="text-[12px] text-charcoal-600 italic leading-snug">{p.tagline}</p>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Final CTA Banner */}
        <div className="rounded-3xl bg-charcoal-900 text-white p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-hover">
          <div className="max-w-2xl mx-auto space-y-3 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
              See your money. Understand your choices. See where they take you.
            </h3>
            <p className="text-[13px] sm:text-sm text-charcoal-300 leading-relaxed">
              Experience financial clarity without generic landing-page fluff. Fermor brings calm precision to your long-term wealth trajectory.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 relative z-10 pt-2">
            <Button
              variant="emerald"
              size="lg"
              onClick={() => {
                const el = document.getElementById('decide');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              icon={<Sparkles className="w-4 h-4 text-emerald-300" />}
            >
              Test Decision Simulator
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
