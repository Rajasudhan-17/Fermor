export type ScoreStatus = 'excellent' | 'good' | 'fair' | 'needs_attention';

export interface FinancialMetrics {
  monthlyIncome: number;
  monthlyExpenses: number;
  liquidSavings: number;
  totalDebt: number;
  monthlyDebtPayment: number;
  investmentBalance: number;
  monthlyInvestment: number;
  emergencyFundMonths: number;
  netWorth: number;
  savingsRatePct: number;
  debtToIncomePct: number;
}

export interface ScoreDriver {
  id: string;
  title: string;
  category: 'savings' | 'debt' | 'cashflow' | 'investments';
  scoreImpact: number; // e.g. +12, -8
  status: 'positive' | 'warning' | 'critical';
  description: string;
  recommendation: string;
  currentValue: string;
  targetValue: string;
}

export type LifeEvent = 'none' | 'buy_home' | 'car_purchase' | 'career_break' | 'income_boost';

export interface SimulationParams {
  monthlySavingsDelta: number; // +/- $ per month
  extraDebtPayment: number;   // + $ per month
  monthlyInvestmentDelta: number; // +/- $ per month
  equityAllocationPct: number; // 0 - 100%
  lifeEvent: LifeEvent;
}

export interface YearProjection {
  year: number;
  age: number;
  baselineNetWorth: number;
  simulatedNetWorth: number;
  baselineLiquid: number;
  simulatedLiquid: number;
  baselineDebt: number;
  simulatedDebt: number;
  milestone?: string;
}

export interface ProfilePreset {
  id: string;
  name: string;
  role: string;
  age: number;
  tagline: string;
  score: number;
  status: ScoreStatus;
  metrics: FinancialMetrics;
  drivers: ScoreDriver[];
  defaultParams: SimulationParams;
}
