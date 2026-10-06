import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'flat' | 'interactive' | 'highlight';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className,
  ...props
}) => {
  const baseStyles = 'rounded-2xl border transition-all duration-200';

  const variants = {
    default: 'bg-white border-charcoal-200/80 shadow-subtle',
    flat: 'bg-canvas-subtle border-charcoal-200/60',
    interactive:
      'bg-white border-charcoal-200/80 shadow-subtle hover:border-charcoal-300 hover:shadow-card cursor-pointer',
    highlight:
      'bg-gradient-to-b from-emerald-50/50 to-white border-emerald-200 shadow-subtle',
  };

  const paddings = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={clsx(baseStyles, variants[variant], paddings[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
};
