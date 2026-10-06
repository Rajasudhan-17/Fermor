import React from 'react';
import { Shield, Lock, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-charcoal-200/80 pt-12 pb-8 text-charcoal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-charcoal-900 flex items-center justify-center text-emerald-400 font-bold font-sans tabular-nums text-[13px]">
                F
              </div>
              <span className="font-semibold text-charcoal-900 text-base">Fermor</span>
            </div>
            <p className="text-[13px] text-charcoal-500 max-w-sm leading-relaxed">
              Fermor is built on a clear mandate: <span className="text-charcoal-900 font-medium">See your money. Understand your choices. See where they take you.</span> We replace complex spreadsheets with calm, intelligent financial clarity.
            </p>
            <div className="flex items-center gap-4 text-[13px] text-charcoal-400 pt-2">
              <span className="inline-flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600" /> Bank-Grade AES-256 Encryption
              </span>
              <span className="inline-flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-600" /> Zero Data Selling
              </span>
            </div>
          </div>

          {/* Product Navigation */}
          <div className="space-y-2 text-[13px]">
            <h4 className="font-semibold text-charcoal-900 uppercase tracking-wider text-[12px]">
              Framework Flow
            </h4>
            <ul className="space-y-1.5 text-charcoal-600">
              <li><a href="#see" className="hover:text-charcoal-900">1. Health Score Standing</a></li>
              <li><a href="#understand" className="hover:text-charcoal-900">2. Root Cause Analysis</a></li>
              <li><a href="#decide" className="hover:text-charcoal-900">3. Scenario Simulator</a></li>
              <li><a href="#grow" className="hover:text-charcoal-900">4. 20-Year Horizon Map</a></li>
            </ul>
          </div>

          {/* Technology & Compliance */}
          <div className="space-y-2 text-[13px]">
            <h4 className="font-semibold text-charcoal-900 uppercase tracking-wider text-[12px]">
              Technology
            </h4>
            <ul className="space-y-1.5 text-charcoal-600">
              <li>Next.js App Architecture</li>
              <li>Deterministic Financial Simulation</li>
              <li>Tailwind Design System</li>
              <li>Vercel Edge Platform</li>
            </ul>
          </div>
        </div>

        {/* Prototype Legal Disclaimer Box */}
        <div className="p-4 rounded-xl bg-canvas-subtle border border-charcoal-200/60 text-[12px] text-charcoal-500 leading-relaxed space-y-1">
          <p className="font-semibold text-charcoal-700">Prototype Disclaimer</p>
          <p>
            Fermor is an interactive frontend product prototype developed for demonstration purposes. All financial calculations, health scores, score drivers, and projected returns utilize fictional demo profiles and mathematical formulas. This prototype does not collect actual personal banking credentials, nor does it provide binding investment advice or guaranteed financial performance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-charcoal-100 text-[13px] text-charcoal-400">
          <p>© {new Date().getFullYear()} Fermor Financial Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-charcoal-700">Privacy Policy</a>
            <a href="#" className="hover:text-charcoal-700">Terms of Service</a>
            <a href="#" className="hover:text-charcoal-700">Security Architecture</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
