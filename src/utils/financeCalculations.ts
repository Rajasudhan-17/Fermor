import { FinancialMetrics, SimulationParams, YearProjection, ScoreStatus } from '@/types/finance';

export function formatINR(val: number): string {
  if (isNaN(val)) return '₹0';
  const numStr = Math.round(Math.abs(val)).toString();
  let formatted = '';
  if (numStr.length <= 3) {
    formatted = numStr;
  } else {
    const lastThree = numStr.substring(numStr.length - 3);
    const otherDigits = numStr.substring(0, numStr.length - 3);
    formatted = otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
  }
  return (val < 0 ? '-₹' : '₹') + formatted;
}

export function formatNumber(val: number): string {
  if (isNaN(val)) return '0';
  const numStr = Math.round(Math.abs(val)).toString();
  const formatted = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return (val < 0 ? '-' : '') + formatted;
}

// Global currency formatter mapped directly to Rupees
export function formatCurrency(val: number): string {
  return formatINR(val);
}

export function calculateHealthScore(
  baseMetrics: FinancialMetrics,
  simParams: SimulationParams
): { score: number; status: ScoreStatus; delta: number } {
  const effectiveSavingsRate = Math.min(
    60,
    Math.max(
      0,
      ((baseMetrics.monthlyIncome - baseMetrics.monthlyExpenses + simParams.monthlySavingsDelta) /
        baseMetrics.monthlyIncome) *
        100
    )
  );

  const effectiveMonthlyInvestment = Math.max(
    0,
    baseMetrics.monthlyInvestment + simParams.monthlyInvestmentDelta
  );

  const effectiveDebtPayment = Math.max(
    0,
    baseMetrics.monthlyDebtPayment + simParams.extraDebtPayment
  );

  const simulatedLiquid = Math.max(0, baseMetrics.liquidSavings + (simParams.lifeEvent === 'buy_home' ? -35000 : simParams.lifeEvent === 'car_purchase' ? -12000 : 0));
  const emergencyMonths = simulatedLiquid / (baseMetrics.monthlyExpenses || 1);
  const emergencyScore = Math.min(30, (emergencyMonths / 6) * 30);

  const savingsScore = Math.min(30, (effectiveSavingsRate / 30) * 30);

  const debtRatio = (effectiveDebtPayment / baseMetrics.monthlyIncome) * 100;
  const debtScore = Math.max(0, 25 - debtRatio * 1.2 - (baseMetrics.totalDebt / (baseMetrics.monthlyIncome * 12)) * 10);

  const investTarget = baseMetrics.monthlyIncome * 0.15;
  const investScore = Math.min(15, (effectiveMonthlyInvestment / (investTarget || 1)) * 15);

  let rawScore = Math.round(emergencyScore + savingsScore + debtScore + investScore);
  
  if (simParams.lifeEvent === 'income_boost') rawScore += 5;
  if (simParams.lifeEvent === 'career_break') rawScore -= 8;

  const finalScore = Math.min(99, Math.max(15, rawScore));

  const baseEmergencyScore = Math.min(30, (baseMetrics.emergencyFundMonths / 6) * 30);
  const baseSavingsScore = Math.min(30, (baseMetrics.savingsRatePct / 30) * 30);
  const baseDebtRatio = (baseMetrics.monthlyDebtPayment / baseMetrics.monthlyIncome) * 100;
  const baseDebtScore = Math.max(0, 25 - baseDebtRatio * 1.2 - (baseMetrics.totalDebt / (baseMetrics.monthlyIncome * 12)) * 10);
  const baseInvestScore = Math.min(15, (baseMetrics.monthlyInvestment / (investTarget || 1)) * 15);
  const baseScore = Math.min(99, Math.max(15, Math.round(baseEmergencyScore + baseSavingsScore + baseDebtScore + baseInvestScore)));

  const delta = finalScore - baseScore;

  let status: ScoreStatus = 'good';
  if (finalScore >= 80) status = 'excellent';
  else if (finalScore >= 70) status = 'good';
  else if (finalScore >= 55) status = 'fair';
  else status = 'needs_attention';

  return { score: finalScore, status, delta };
}

export function generateProjections(
  baseMetrics: FinancialMetrics,
  simParams: SimulationParams,
  startAge: number = 32,
  yearsToProject: number = 20
): YearProjection[] {
  const projections: YearProjection[] = [];

  const baselineAnnualReturn = 0.065;
  const equityWeight = simParams.equityAllocationPct / 100;
  const simulatedAnnualReturn = 0.04 + equityWeight * 0.045;

  let baseNetWorth = baseMetrics.netWorth;
  let simNetWorth = baseMetrics.netWorth;

  let baseLiquid = baseMetrics.liquidSavings;
  let simLiquid = baseMetrics.liquidSavings;

  let baseDebt = baseMetrics.totalDebt;
  let simDebt = baseMetrics.totalDebt;

  if (simParams.lifeEvent === 'buy_home') {
    simLiquid = Math.max(2000, simLiquid - 35000);
    simNetWorth += 5000;
  } else if (simParams.lifeEvent === 'car_purchase') {
    simLiquid = Math.max(1500, simLiquid - 12000);
  }

  const baselineAnnualSavings = (baseMetrics.monthlyIncome - baseMetrics.monthlyExpenses) * 12;
  const simAnnualSavings = (
    baseMetrics.monthlyIncome - 
    baseMetrics.monthlyExpenses + 
    simParams.monthlySavingsDelta + 
    (simParams.lifeEvent === 'income_boost' ? 800 : simParams.lifeEvent === 'career_break' ? -1500 : 0)
  ) * 12;

  const baselineAnnualInvest = baseMetrics.monthlyInvestment * 12;
  const simAnnualInvest = Math.max(0, baseMetrics.monthlyInvestment + simParams.monthlyInvestmentDelta) * 12;

  const baselineAnnualDebtPayoff = baseMetrics.monthlyDebtPayment * 12;
  const simAnnualDebtPayoff = (baseMetrics.monthlyDebtPayment + simParams.extraDebtPayment) * 12;

  for (let year = 0; year <= yearsToProject; year++) {
    const age = startAge + year;

    if (year === 0) {
      projections.push({
        year,
        age,
        baselineNetWorth: Math.round(baseNetWorth),
        simulatedNetWorth: Math.round(simNetWorth),
        baselineLiquid: Math.round(baseLiquid),
        simulatedLiquid: Math.round(simLiquid),
        baselineDebt: Math.round(baseDebt),
        simulatedDebt: Math.round(simDebt),
        milestone: 'Current Standing',
      });
      continue;
    }

    baseDebt = Math.max(0, baseDebt - baselineAnnualDebtPayoff);
    const baseInvestGrowth = (baseNetWorth + baselineAnnualInvest) * (1 + baselineAnnualReturn) - baseNetWorth;
    baseNetWorth += baseInvestGrowth + baselineAnnualSavings;
    baseLiquid += baselineAnnualSavings * 0.3;

    simDebt = Math.max(0, simDebt - simAnnualDebtPayoff);
    const simInvestGrowth = (simNetWorth + simAnnualInvest) * (1 + simulatedAnnualReturn) - simNetWorth;
    simNetWorth += simInvestGrowth + simAnnualSavings;
    simLiquid += simAnnualSavings * 0.35;

    let milestone: string | undefined = undefined;
    if (simDebt === 0 && projections[year - 1]?.simulatedDebt > 0) {
      milestone = 'Debt Free Achieved 🎉';
    } else if (simNetWorth >= 100000 && projections[year - 1]?.simulatedNetWorth < 100000) {
      milestone = '₹1,00,000 Net Worth';
    } else if (simNetWorth >= 250000 && projections[year - 1]?.simulatedNetWorth < 250000) {
      milestone = '₹2,50,000 Net Worth';
    } else if (simNetWorth >= 500000 && projections[year - 1]?.simulatedNetWorth < 500000) {
      milestone = '₹5,00,000 Half Million Milestone';
    } else if (year === 10) {
      milestone = '10-Year Horizon';
    } else if (year === 20) {
      milestone = '20-Year Legacy';
    }

    projections.push({
      year,
      age,
      baselineNetWorth: Math.round(baseNetWorth),
      simulatedNetWorth: Math.round(simNetWorth),
      baselineLiquid: Math.round(baseLiquid),
      simulatedLiquid: Math.round(simLiquid),
      baselineDebt: Math.round(baseDebt),
      simulatedDebt: Math.round(simDebt),
      milestone,
    });
  }

  return projections;
}
