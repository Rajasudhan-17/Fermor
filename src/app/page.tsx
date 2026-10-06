'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { FinancialHealthSection } from '@/components/sections/FinancialHealthSection';
import { SavingsDecisionSimulator } from '@/components/sections/SavingsDecisionSimulator';
import { FutureYouProductStory } from '@/components/sections/FutureYouProductStory';
import { FinancialHealthOverview } from '@/components/sections/FinancialHealthOverview';
import { ScoreDriversSection } from '@/components/sections/ScoreDriversSection';
import { DecisionSimulatorSection } from '@/components/sections/DecisionSimulatorSection';
import { FutureTrajectorySection } from '@/components/sections/FutureTrajectorySection';
import { FermorFeaturesSection } from '@/components/sections/FermorFeaturesSection';
import { MOCK_PROFILES } from '@/data/mockData';
import { ProfilePreset, SimulationParams } from '@/types/finance';
import { calculateHealthScore, generateProjections } from '@/utils/financeCalculations';

export default function Home() {
  const [currentProfile, setCurrentProfile] = useState<ProfilePreset>(MOCK_PROFILES[0]);
  const [simParams, setSimParams] = useState<SimulationParams>(MOCK_PROFILES[0].defaultParams);
  const [activeSection, setActiveSection] = useState<string>('see');

  const handleSelectProfile = (newProfile: ProfilePreset) => {
    setCurrentProfile(newProfile);
    setSimParams(newProfile.defaultParams);
  };

  const handleResetParams = () => {
    setSimParams(currentProfile.defaultParams);
  };

  const { score: newScore, status: newStatus, delta: scoreDelta } = calculateHealthScore(
    currentProfile.metrics,
    simParams
  );

  const projections = generateProjections(
    currentProfile.metrics,
    simParams,
    currentProfile.age,
    20
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'see',
        'health-categories',
        'simulator-experience',
        'future-you',
        'understand',
        'decide',
        'grow',
        'platform',
      ];
      const scrollPos = window.scrollY + 200;

      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sec);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-canvas selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation */}
      <Navbar
        currentProfile={currentProfile}
        onSelectProfile={handleSelectProfile}
        activeSection={activeSection}
      />

      {/* Main Experience Stack */}
      <main className="flex-1">
        {/* Phase 2: Hero Section */}
        <HeroSection />

        {/* Phase 2: "How healthy is your financial life?" 5-Category Breakdown */}
        <FinancialHealthSection />

        {/* Phase 3: Financial Decision Simulator (Monthly Savings + Big Purchase Scenarios) */}
        <SavingsDecisionSimulator />

        {/* Phase 4: Future You Timeline + Product Story ("From confusion to confidence") + Meet Alex */}
        <FutureYouProductStory />

        {/* Stage 1: SEE - Financial Health Standing Overview */}
        <FinancialHealthOverview
          metrics={currentProfile.metrics}
          score={newScore}
          status={newStatus}
          scoreDelta={scoreDelta}
          userName={currentProfile.name}
        />

        {/* Stage 2: UNDERSTAND - Score Drivers & Root Cause Analysis */}
        <ScoreDriversSection
          drivers={currentProfile.drivers}
          score={newScore}
        />

        {/* Stage 3: DECIDE - Advanced Interactive Decision Simulator */}
        <DecisionSimulatorSection
          params={simParams}
          onChangeParams={setSimParams}
          scoreDelta={scoreDelta}
          newScore={newScore}
          onReset={handleResetParams}
        />

        {/* Stage 4: GROW - Multi-Year Future Net Worth Trajectory */}
        <FutureTrajectorySection
          projections={projections}
          baselineScore={currentProfile.score}
          simulatedScore={newScore}
        />

        {/* Stage 5: FERMOR ADVANTAGE & Product Suite */}
        <FermorFeaturesSection
          currentProfile={currentProfile}
          onSelectProfile={handleSelectProfile}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
