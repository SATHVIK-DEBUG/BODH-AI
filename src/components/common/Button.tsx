import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bodh-gradient-btn text-white shadow-[0_8px_24px_-6px_rgba(99,102,241,0.5)] border border-indigo-400/20',
  secondary:
    'bg-white dark:bg-[#11172B] text-slate-800 dark:text-[#F8FAFC] border border-slate-200 dark:border-slate-700/80 hover:border-indigo-400/60 dark:hover:border-indigo-400/60 hover:bg-slate-50 dark:hover:bg-[#18203B]',
  ghost:
    'bg-transparent text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-[#F8FAFC] hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent',
  danger:
    'bg-rose-600 hover:bg-rose-700 text-white border border-rose-500/30',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-xs font-semibold rounded-lg gap-1.5',
  md: 'h-10 px-5 text-sm font-semibold rounded-xl gap-2',
  lg: 'h-12 px-6 text-sm font-semibold rounded-xl gap-2',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      whileHover={isDisabled ? undefined : { y: -1 }}
      whileTap={isDisabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-flex items-center justify-center whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${
        VARIANT_STYLES[variant]
      } ${SIZE_STYLES[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden="true" />
      ) : (
        leftIcon && <span className="shrink-0 inline-flex items-center">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!loading && rightIcon && (
        <span className="shrink-0 inline-flex items-center">{rightIcon}</span>
      )}
    </motion.button>
  );
}
