'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'emerald' | 'tertiary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-sans font-semibold text-[15px] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-800 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-xl';

  const variants = {
    primary:
      'bg-charcoal-950 text-white hover:bg-charcoal-900 active:bg-charcoal-950 shadow-subtle',
    secondary:
      'bg-white text-charcoal-950 hover:bg-canvas-subtle active:bg-canvas-muted border border-charcoal-200 shadow-subtle',
    emerald:
      'bg-emerald-900 text-white hover:bg-emerald-950 active:bg-emerald-950 shadow-subtle font-semibold',
    outline:
      'bg-white text-charcoal-900 hover:bg-canvas-subtle border border-charcoal-200 hover:border-charcoal-300 shadow-subtle',
    ghost:
      'bg-transparent text-charcoal-700 hover:bg-canvas-subtle hover:text-charcoal-950',
    tertiary:
      'bg-transparent text-emerald-900 hover:text-emerald-950 p-0 hover:bg-transparent underline underline-offset-4 decoration-emerald-800/40',
  };

  const sizes = {
    sm: 'px-3.5 py-1.5 text-[13px] gap-1.5 min-h-[36px]',
    md: 'px-4.5 py-2 text-[15px] gap-2 min-h-[42px]',
    lg: 'px-5.5 py-2.5 text-base gap-2.5 min-h-[48px]',
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.015 }}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </motion.button>
  );
};
