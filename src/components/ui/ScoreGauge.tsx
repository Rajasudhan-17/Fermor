'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScoreStatus } from '@/types/finance';
import { ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';

interface ScoreGaugeProps {
  score: number;
  status: ScoreStatus;
  delta?: number;
  size?: number;
}

export const ScoreGauge: React.FC<ScoreGaugeProps> = ({
  score,
  status,
  delta = 0,
  size = 180,
}) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const statusConfig = {
    excellent: {
      label: 'Strong Health',
      color: '#059669', // emerald-600
      bgColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
    },
    good: {
      label: 'Optimizable',
      color: '#0D9488', // teal-600
      bgColor: 'bg-teal-50 text-teal-800 border-teal-200',
      icon: <TrendingUp className="w-4 h-4 text-teal-600" />,
    },
    fair: {
      label: 'Fair Standing',
      color: '#D97706', // amber-600
      bgColor: 'bg-amber-50 text-amber-800 border-amber-200',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
    },
    needs_attention: {
      label: 'Action Needed',
      color: '#E11D48', // rose-600
      bgColor: 'bg-rose-50 text-rose-800 border-rose-200',
      icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
    },
  };

  const config = statusConfig[status];

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background track circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            className="stroke-charcoal-100"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={config.color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span
            key={score}
            initial={{ scale: 0.9, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-4xl font-bold font-sans tabular-nums tracking-tight text-charcoal-900"
          >
            {score}
          </motion.span>
          <span className="text-[12px] font-medium uppercase tracking-wider text-charcoal-400 mt-0.5">
            Out of 100
          </span>
        </div>
      </div>

      {/* Status Badge & Delta Indicator */}
      <div className="mt-3 flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-semibold border ${config.bgColor}`}
        >
          {config.icon}
          {config.label}
        </span>

        {delta !== 0 && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-[13px] font-sans tabular-nums font-bold px-2 py-0.5 rounded ${
              delta > 0
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-rose-100 text-rose-800'
            }`}
          >
            {delta > 0 ? `+${delta} pt` : `${delta} pt`}
          </motion.span>
        )}
      </div>
    </div>
  );
};
