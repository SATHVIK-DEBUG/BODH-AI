import React, { createContext, useContext, useEffect, useState } from 'react';
import { ChatPreferences, ThemeMode, UserProfilePreview } from '../types';

interface ThemeContextValue {
  theme: ThemeMode;
  resolvedTheme: 'dark' | 'light';
  setTheme: (theme: ThemeMode) => void;
  preferences: ChatPreferences;
  updatePreferences: (patch: Partial<ChatPreferences>) => void;
  profile: UserProfilePreview;
  updateProfile: (patch: Partial<UserProfilePreview>) => void;
}

const DEFAULT_PREFERENCES: ChatPreferences = {
  enterToSend: true,
  showSimulationNotice: true,
  textSize: 'default',
  showStepTags: true,
};

const DEFAULT_PROFILE: UserProfilePreview = {
  name: 'Learner',
  email: 'learner@bodh.example',
  focusArea: 'Physics & Mathematics',
  role: 'Independent Student (Preview Profile)',
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('bodh_theme') as ThemeMode | null;
      if (saved === 'dark' || saved === 'light' || saved === 'system') return saved;
    } catch {
      // Ignore storage access errors
    }
    return 'dark';
  });

  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>(() =>
    theme === 'system' ? getSystemTheme() : theme
  );

  const [preferences, setPreferences] = useState<ChatPreferences>(() => {
    try {
      const saved = localStorage.getItem('bodh_chat_prefs');
      if (saved) return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
    } catch {
      // Ignore storage access errors
    }
    return DEFAULT_PREFERENCES;
  });

  const [profile, setProfile] = useState<UserProfilePreview>(() => {
    try {
      const saved = localStorage.getItem('bodh_profile_preview');
      if (saved) return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
    } catch {
      // Ignore storage access errors
    }
    return DEFAULT_PROFILE;
  });

  useEffect(() => {
    const applyTheme = () => {
      const nextResolved = theme === 'system' ? getSystemTheme() : theme;
      setResolvedTheme(nextResolved);
      const root = document.documentElement;
      if (nextResolved === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();
    try {
      localStorage.setItem('bodh_theme', theme);
    } catch {
      // Ignore storage errors
    }

    if (theme === 'system' && typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme();
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, [theme]);

  const setTheme = (next: ThemeMode) => {
    setThemeState(next);
  };

  const updatePreferences = (patch: Partial<ChatPreferences>) => {
    setPreferences((prev) => {
      const updated = { ...prev, ...patch };
      try {
        localStorage.setItem('bodh_chat_prefs', JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  };

  const updateProfile = (patch: Partial<UserProfilePreview>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...patch };
      try {
        localStorage.setItem('bodh_profile_preview', JSON.stringify(updated));
      } catch {
        // Ignore storage errors
      }
      return updated;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        resolvedTheme,
        setTheme,
        preferences,
        updatePreferences,
        profile,
        updateProfile,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
