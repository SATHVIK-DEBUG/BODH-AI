import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom';
  children: React.ReactNode;
}

export function Tooltip({ content, position = 'top', children }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          className={`pointer-events-none absolute left-1/2 -translate-x-1/2 z-50 px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap bg-slate-900 dark:bg-[#1E293B] text-white border border-slate-700/80 shadow-lg ${
            position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
          }`}
        >
          {content}
        </span>
      )}
    </span>
  );
}
