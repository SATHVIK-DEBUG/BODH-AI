import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const PADDING_MAP = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-7 sm:p-8',
};

export function Card({
  interactive = false,
  padding = 'md',
  className = '',
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white dark:bg-[#11172B] border border-slate-200 dark:border-slate-800/90 ${
        interactive
          ? 'transition-all duration-200 hover:-translate-y-0.5 hover:border-[#6366F1]/50 dark:hover:border-[#6366F1]/50 hover:shadow-[0_14px_34px_-16px_rgba(99,102,241,0.3)]'
          : ''
      } ${PADDING_MAP[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
