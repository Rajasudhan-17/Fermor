import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'positive' | 'warning' | 'critical' | 'neutral' | 'emerald';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className,
}) => {
  const baseStyles = 'inline-flex items-center font-medium rounded-full border';

  const variants = {
    positive: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    emerald: 'bg-emerald-600 text-white border-emerald-600',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    critical: 'bg-rose-50 text-rose-800 border-rose-200',
    neutral: 'bg-charcoal-100 text-charcoal-700 border-charcoal-200/70',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[13px] gap-1',
    md: 'px-2.5 py-1 text-[13px] gap-1.5',
  };

  return (
    <span className={clsx(baseStyles, variants[variant], sizes[size], className)}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
};
