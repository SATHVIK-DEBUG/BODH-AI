import React from 'react';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-6 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0D1326]/60">
      <div className="w-11 h-11 rounded-xl bg-slate-200/70 dark:bg-[#1E293B] text-slate-600 dark:text-[#22D3EE] flex items-center justify-center mb-3.5">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC]">{title}</h3>
      <p className="mt-1.5 text-xs leading-relaxed text-slate-500 dark:text-[#94A3B8] max-w-xs">
        {description}
      </p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
