import React from 'react';
import { motion } from 'framer-motion';

interface LoadingIndicatorProps {
  variant?: 'spinner' | 'typing';
  label?: string;
}

export function LoadingIndicator({ variant = 'spinner', label }: LoadingIndicatorProps) {
  if (variant === 'typing') {
    return (
      <div className="inline-flex items-center gap-2.5" role="status" aria-live="polite">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((idx) => (
            <motion.span
              key={idx}
              className="w-1.5 h-1.5 rounded-full bg-[#6366F1] dark:bg-[#22D3EE]"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: idx * 0.16,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
        {label && (
          <span className="text-xs font-medium text-slate-500 dark:text-[#94A3B8]">{label}</span>
        )}
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2.5" role="status" aria-live="polite">
      <span
        className="w-4 h-4 rounded-full border-2 border-[#6366F1]/25 border-t-[#6366F1] animate-spin"
        aria-hidden="true"
      />
      {label && <span className="text-xs text-slate-500 dark:text-[#94A3B8]">{label}</span>}
    </div>
  );
}
