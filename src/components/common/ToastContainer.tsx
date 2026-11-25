import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';
import { NotificationType } from '../../types';

const STYLES: Record<
  NotificationType,
  {
    wrapper: string;
    iconColor: string;
    Icon: React.ComponentType<{ className?: string }>;
  }
> = {
  success: {
    wrapper:
      'bg-emerald-50 dark:bg-[#0D2322] border-emerald-200 dark:border-emerald-500/35 text-emerald-950 dark:text-emerald-50',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    Icon: CheckCircle2,
  },
  info: {
    wrapper:
      'bg-sky-50 dark:bg-[#101C36] border-sky-200 dark:border-[#6366F1]/40 text-slate-900 dark:text-slate-100',
    iconColor: 'text-sky-600 dark:text-[#22D3EE]',
    Icon: Info,
  },
  error: {
    wrapper:
      'bg-rose-50 dark:bg-[#27121E] border-rose-200 dark:border-rose-500/35 text-rose-950 dark:text-rose-50',
    iconColor: 'text-rose-600 dark:text-rose-400',
    Icon: AlertCircle,
  },
};

export function ToastContainer() {
  const { notifications, dismiss } = useNotification();

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 w-[calc(100vw-2rem)] max-w-sm pointer-events-none"
    >
      <AnimatePresence>
        {notifications.map((item) => {
          const { wrapper, iconColor, Icon } = STYLES[item.type];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              role={item.type === 'error' ? 'alert' : 'status'}
              className={`pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-xl border shadow-xl ${wrapper}`}
            >
              <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-snug">{item.message}</p>
                {item.description && (
                  <p className="mt-0.5 text-xs opacity-80 leading-relaxed">{item.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => dismiss(item.id)}
                aria-label="Dismiss notification"
                className="p-1 rounded-md opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
