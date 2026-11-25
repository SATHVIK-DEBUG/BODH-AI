import React, { createContext, useCallback, useContext, useState } from 'react';
import { NotificationItem, NotificationType } from '../types';

interface NotificationContextValue {
  notifications: NotificationItem[];
  notify: (type: NotificationType, message: string, description?: string) => void;
  dismiss: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const notify = useCallback(
    (type: NotificationType, message: string, description?: string) => {
      const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setNotifications((prev) => [...prev.slice(-3), { id, type, message, description }]);
      window.setTimeout(() => {
        dismiss(id);
      }, 4200);
    },
    [dismiss]
  );

  return (
    <NotificationContext.Provider value={{ notifications, notify, dismiss }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within a NotificationProvider');
  return ctx;
}
