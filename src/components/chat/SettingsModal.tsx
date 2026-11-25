import React, { useState } from 'react';
import { Monitor, Moon, Sun, User, Sliders, Info } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { BodhLogo } from '../common/BodhLogo';
import { useTheme } from '../../context/ThemeContext';
import { useNotification } from '../../context/NotificationContext';
import { ThemeMode } from '../../types';

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

type SettingsTab = 'appearance' | 'profile' | 'chat' | 'about';

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const { theme, setTheme, preferences, updatePreferences, profile, updateProfile } = useTheme();
  const { notify } = useNotification();
  const [activeTab, setActiveTab] = useState<SettingsTab>('appearance');

  const [nameDraft, setNameDraft] = useState(profile.name);
  const [focusDraft, setFocusDraft] = useState(profile.focusArea);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedName = nameDraft.trim() || 'Learner';
    const cleanedFocus = focusDraft.trim() || 'General STEM';
    updateProfile({ name: cleanedName, focusArea: cleanedFocus });
    notify('success', 'Local profile preview updated', 'Stored locally in your browser session.');
  };

  const tabs: Array<{ id: SettingsTab; label: string; icon: React.ReactNode }> = [
    { id: 'appearance', label: 'Appearance', icon: <Moon className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'chat', label: 'Chat', icon: <Sliders className="w-4 h-4" /> },
    { id: 'about', label: 'About Bodh', icon: <Info className="w-4 h-4" /> },
  ];

  const themeChoices: Array<{ id: ThemeMode; label: string; icon: React.ReactNode }> = [
    { id: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
    { id: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
    { id: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Workspace Settings"
      description="Preferences are saved locally in this browser. No external account or server is connected."
      maxWidthClass="max-w-xl"
    >
      {/* Segmented tab navigation */}
      <div
        role="tablist"
        aria-label="Settings sections"
        className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-[#0B1024] border border-slate-200 dark:border-slate-800 mb-6"
      >
        {tabs.map((tab) => {
          const selected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selected
                  ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-[#F8FAFC] shadow-xs'
                  : 'text-slate-600 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Appearance tab */}
      {activeTab === 'appearance' && (
        <div className="space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC]">Theme</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-[#94A3B8]">
              Choose how Bodh appears on this device. Dark mode reflects Bodh&apos;s signature deep
              midnight palette.
            </p>
            <div className="mt-3.5 grid grid-cols-3 gap-2.5">
              {themeChoices.map((choice) => {
                const isSelected = theme === choice.id;
                return (
                  <button
                    key={choice.id}
                    type="button"
                    onClick={() => {
                      setTheme(choice.id);
                      notify('info', `Theme switched to ${choice.label}`);
                    }}
                    className={`flex flex-col items-center justify-center gap-2 py-3.5 px-3 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                      isSelected
                        ? 'border-[#6366F1] bg-[#6366F1]/10 text-[#6366F1] dark:text-[#F8FAFC]'
                        : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-[#94A3B8] hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    {choice.icon}
                    <span>{choice.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-[#F8FAFC]">
                Reading text size
              </p>
              <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                Adjust response font size in the chat workspace.
              </p>
            </div>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-[#0B1024] border border-slate-200 dark:border-slate-800">
              {(['default', 'comfortable'] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => updatePreferences({ textSize: sz })}
                  className={`px-3 py-1 rounded-md text-xs font-medium capitalize cursor-pointer transition-colors ${
                    preferences.textSize === sz
                      ? 'bg-white dark:bg-[#1E293B] text-slate-900 dark:text-white'
                      : 'text-slate-500 dark:text-[#94A3B8]'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profile preview tab */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1024] border border-slate-200 dark:border-slate-800 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bodh-gradient-btn text-white text-sm font-bold flex items-center justify-center shrink-0">
              {(nameDraft.trim()[0] || 'L').toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC] truncate">
                {nameDraft.trim() || 'Learner'}
              </p>
              <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
                Local preview profile · No authentication connected
              </p>
            </div>
          </div>

          <Input
            label="Display Name (Local Preview)"
            value={nameDraft}
            onChange={(e) => setNameDraft(e.target.value)}
            placeholder="e.g., Learner"
          />
          <Input
            label="Primary Study Focus"
            value={focusDraft}
            onChange={(e) => setFocusDraft(e.target.value)}
            placeholder="e.g., Physics & Mathematics"
          />

          <div className="flex justify-end pt-2">
            <Button type="submit" size="sm">
              Save Local Preview
            </Button>
          </div>
        </form>
      )}

      {/* Chat preferences tab */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          {[
            {
              key: 'enterToSend' as const,
              title: 'Press Enter to send message',
              desc: 'Use Shift + Enter to insert a new line when enabled.',
            },
            {
              key: 'showStepTags' as const,
              title: 'Display concept focus header',
              desc: 'Shows the core scientific concept label above simulated Bodh responses.',
            },
            {
              key: 'showSimulationNotice' as const,
              title: 'Show frontend simulation banner',
              desc: 'Keeps the preview notice visible in the chat workspace.',
            },
          ].map((item) => {
            const checked = preferences[item.key];
            return (
              <label
                key={item.key}
                className="flex items-start justify-between gap-4 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0B1024]/70 cursor-pointer"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-[#F8FAFC]">
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-[#94A3B8] mt-0.5">{item.desc}</p>
                </div>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) => updatePreferences({ [item.key]: e.target.checked })}
                  className="mt-1 h-4 w-4 accent-[#6366F1] rounded cursor-pointer shrink-0"
                />
              </label>
            );
          })}
        </div>
      )}

      {/* About tab */}
      {activeTab === 'about' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <BodhLogo size="md" showWordmark />
          </div>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-[#94A3B8]">
            &ldquo;Don&apos;t just get answers. Gain understanding.&rdquo; Bodh is an educational AI
            platform concept centered on conceptual understanding, scientific accuracy, misconception
            detection, and adaptive reasoning.
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0B1024] border border-slate-200 dark:border-slate-800 text-xs leading-relaxed text-slate-600 dark:text-[#94A3B8] space-y-1.5">
            <p className="font-semibold text-slate-900 dark:text-[#F8FAFC]">
              Frontend Simulation Status
            </p>
            <p>
              This interface currently runs completely client-side with predefined mock educational
              responses and session-only chat state. No AI provider, database, or real authentication
              service is connected.
            </p>
          </div>
        </div>
      )}
    </Modal>
  );
}
