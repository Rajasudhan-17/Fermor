'use client';

import React, { useId } from 'react';
import { formatNumber } from '@/utils/financeCalculations';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  prefix?: string;
  description?: string;
  onChange: (value: number) => void;
  badgeText?: string;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  prefix = '',
  description,
  onChange,
  badgeText,
}) => {
  const sliderId = useId();

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <div>
          <label htmlFor={sliderId} className="text-[13px] font-semibold uppercase tracking-wider text-charcoal-500 block">
            {label}
          </label>
          {description && (
            <p className="text-[13px] text-charcoal-400 mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {badgeText && (
            <span className="text-[13px] font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {badgeText}
            </span>
          )}
          <span
            suppressHydrationWarning
            className="text-sm font-bold font-sans tabular-nums text-charcoal-900 bg-canvas-subtle px-2.5 py-1 rounded-md border border-charcoal-200/60 min-w-[75px] text-right"
          >
            {prefix}
            {formatNumber(value)}
            {unit}
          </span>
        </div>
      </div>
      <input
        id={sliderId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${prefix}${formatNumber(value)}${unit}`}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2.5 bg-charcoal-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
      />
      <div suppressHydrationWarning className="flex justify-between text-[12px] font-sans tabular-nums text-charcoal-400">
        <span>
          {prefix}
          {formatNumber(min)}
          {unit}
        </span>
        <span>
          {prefix}
          {formatNumber(max)}
          {unit}
        </span>
      </div>
    </div>
  );
};
