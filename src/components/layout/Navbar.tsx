'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { MOCK_PROFILES } from '@/data/mockData';
import { ProfilePreset } from '@/types/finance';
import { Sparkles, UserCheck, Menu, X, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentProfile: ProfilePreset;
  onSelectProfile: (profile: ProfilePreset) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentProfile,
  onSelectProfile,
  activeSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Compact, single-line navigation labels
  const navItems = [
    { id: 'health-categories', label: 'Diagnostics' },
    { id: 'simulator-experience', label: 'Simulator' },
    { id: 'future-you', label: 'Future You' },
    { id: 'understand', label: 'Drivers' },
    { id: 'decide', label: 'Scenarios' },
    { id: 'grow', label: 'Horizon' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-charcoal-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          tabIndex={0}
          role="button"
          aria-label="Fermor Homepage"
          className="flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-800 rounded-lg p-0.5"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <div className="w-7 h-7 rounded-lg bg-charcoal-950 flex items-center justify-center text-emerald-300 font-display font-bold text-base shadow-sm">
            F
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-display font-bold text-base tracking-tight text-charcoal-950">
              Fermor
            </span>
            <span className="hidden sm:inline-block text-[9px] uppercase font-mono font-bold tracking-wider text-emerald-900 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Demo
            </span>
          </div>
        </div>

        {/* Compact Desktop Navigation Bar */}
        <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-0.5 bg-canvas-subtle p-0.5 rounded-lg border border-charcoal-200/60">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-2.5 py-1 text-[13px] font-sans font-medium whitespace-nowrap rounded-md transition-all focus-visible:ring-2 focus-visible:ring-emerald-800 ${
                  isActive
                    ? 'bg-white text-charcoal-950 shadow-subtle border border-charcoal-200/60 font-semibold'
                    : 'text-charcoal-700 hover:text-charcoal-950 hover:bg-white/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Profile Selector & Action Controls */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              aria-expanded={profileDropdownOpen}
              aria-label="Switch Demo Profile"
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-sans text-charcoal-900 bg-white border border-charcoal-200 rounded-lg hover:border-charcoal-300 shadow-subtle focus-visible:ring-2 focus-visible:ring-emerald-800 h-8"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-800" />
              <span className="font-bold hidden sm:inline">{currentProfile.name}</span>
              <span className="text-[10px] font-mono text-charcoal-500 tabular-nums">({currentProfile.score})</span>
              <ChevronDown className="w-3 h-3 text-charcoal-400" />
            </button>

            {profileDropdownOpen && (
              <div className="absolute right-0 mt-1 w-60 bg-white rounded-xl shadow-hover border border-charcoal-200 p-2 z-50">
                <p className="label-eyebrow text-charcoal-400 px-2 py-1 text-[10px]">
                  Select Demo Scenario
                </p>
                <div className="space-y-1">
                  {MOCK_PROFILES.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        onSelectProfile(p);
                        setProfileDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex items-center justify-between ${
                        p.id === currentProfile.id
                          ? 'bg-emerald-50 text-emerald-950 font-semibold'
                          : 'hover:bg-canvas-subtle text-charcoal-700'
                      }`}
                    >
                      <div>
                        <p className="font-bold font-sans text-charcoal-950">{p.name}</p>
                        <p className="text-[10px] text-charcoal-500">{p.role}</p>
                      </div>
                      <span className="font-display font-bold text-xs text-emerald-900 bg-white px-1.5 py-0.5 rounded border border-emerald-200 tabular-nums">
                        {p.score}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="hidden sm:block">
            <Button
              variant="emerald"
              size="sm"
              className="h-8 text-xs px-3"
              onClick={() => scrollTo('simulator-experience')}
              icon={<Sparkles className="w-3.5 h-3.5 text-emerald-300" />}
            >
              Simulate
            </Button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 rounded-lg text-charcoal-700 hover:bg-canvas-subtle border border-charcoal-200/80 min-w-[36px] min-h-[36px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-charcoal-200 px-4 py-3 space-y-2"
          >
            <div className="space-y-1">
              <p className="label-eyebrow text-charcoal-400 px-2 text-[10px]">
                Navigation
              </p>
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-emerald-50 text-emerald-950 font-bold'
                      : 'text-charcoal-700 hover:bg-canvas-subtle'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-charcoal-100">
              <Button
                variant="emerald"
                size="sm"
                className="w-full"
                onClick={() => scrollTo('simulator-experience')}
                icon={<Sparkles className="w-3.5 h-3.5 text-emerald-300" />}
              >
                Launch Decision Simulator
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
