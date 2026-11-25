import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Plus,
  Search,
  MessageSquare,
  Trash2,
  Pencil,
  Check,
  X,
  Settings,
  Home,
} from 'lucide-react';
import { Conversation } from '../../types';
import { BodhLogo } from '../common/BodhLogo';
import { Tooltip } from '../common/Tooltip';
import { useTheme } from '../../context/ThemeContext';

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelect: (id: string) => void;
  onNewChat: () => void;
  onRequestDelete: (conv: Conversation) => void;
  onRename: (id: string, nextTitle: string) => void;
  onOpenSettings: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export function ChatSidebar({
  conversations,
  activeId,
  searchQuery,
  onSearchChange,
  onSelect,
  onNewChat,
  onRequestDelete,
  onRename,
  onOpenSettings,
  mobileOpen,
  onCloseMobile,
}: ChatSidebarProps) {
  const { profile } = useTheme();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState('');

  const filtered = conversations.filter((conv) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      conv.title.toLowerCase().includes(q) ||
      conv.subject.toLowerCase().includes(q) ||
      conv.messages.some((m) => m.content.toLowerCase().includes(q))
    );
  });

  const startEditing = (conv: Conversation, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(conv.id);
    setDraftTitle(conv.title);
  };

  const commitEdit = (id: string) => {
    const trimmed = draftTitle.trim();
    if (trimmed) {
      onRename(id, trimmed);
    }
    setEditingId(null);
  };

  const initials = profile.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || 'L';

  const sidebarContent = (
    <div className="h-full flex flex-col bg-slate-50 dark:bg-[#0A0F24] border-r border-slate-200 dark:border-slate-800/80 select-none">
      {/* Top brand + home shortcut */}
      <div className="px-4 h-16 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/70 shrink-0">
        <Link
          to="/"
          aria-label="Return to Bodh Homepage"
          className="inline-flex items-center focus-visible:outline-2 focus-visible:outline-[#6366F1] rounded-lg"
        >
          <BodhLogo size="sm" showWordmark />
        </Link>
        <div className="flex items-center gap-1">
          <Tooltip content="Back to homepage" position="bottom">
            <Link
              to="/"
              aria-label="Homepage"
              className="p-2 rounded-lg text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-white/5 transition-colors"
            >
              <Home className="w-4 h-4" />
            </Link>
          </Tooltip>
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
            className="lg:hidden p-2 rounded-lg text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-white/5 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* New Chat & Search */}
      <div className="p-4 space-y-3 shrink-0">
        <button
          type="button"
          onClick={() => {
            onNewChat();
            onCloseMobile();
          }}
          className="w-full h-11 px-4 rounded-xl bodh-gradient-btn text-white text-sm font-semibold inline-flex items-center justify-center gap-2 shadow-[0_6px_20px_-6px_rgba(99,102,241,0.55)] border border-indigo-400/20 cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 active:scale-[0.98]"
        >
          <Plus className="w-4 h-4" />
          <span>New Chat</span>
        </button>

        <div className="relative">
          <Search
            className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations..."
            aria-label="Search conversations"
            className="w-full h-9 pl-9 pr-3 rounded-lg text-xs bg-white dark:bg-[#11172B] text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 dark:placeholder:text-slate-500 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-[#6366F1]"
          />
        </div>
      </div>

      {/* Conversation list */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        <p className="px-2 pb-2 text-xs font-semibold text-slate-500 dark:text-[#94A3B8]">
          Chat History
        </p>

        {filtered.length === 0 ? (
          <div className="px-3 py-6 text-center text-xs text-slate-500 dark:text-slate-500">
            No matching conversations found.
          </div>
        ) : (
          <ul className="space-y-1" role="list">
            {filtered.map((conv) => {
              const isActive = conv.id === activeId;
              const isEditing = editingId === conv.id;

              return (
                <li key={conv.id}>
                  <div
                    onClick={() => {
                      if (!isEditing) {
                        onSelect(conv.id);
                        onCloseMobile();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if ((e.key === 'Enter' || e.key === ' ') && !isEditing) {
                        e.preventDefault();
                        onSelect(conv.id);
                        onCloseMobile();
                      }
                    }}
                    className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#6366F1]/14 dark:bg-[#1A2242] text-slate-900 dark:text-[#F8FAFC] border border-[#6366F1]/30'
                        : 'text-slate-600 dark:text-[#94A3B8] hover:bg-slate-200/60 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-[#F8FAFC] border border-transparent'
                    }`}
                  >
                    <MessageSquare
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? 'text-[#6366F1] dark:text-[#22D3EE]' : 'opacity-70'
                      }`}
                    />

                    {isEditing ? (
                      <div
                        className="flex-1 flex items-center gap-1 min-w-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          value={draftTitle}
                          autoFocus
                          onChange={(e) => setDraftTitle(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') commitEdit(conv.id);
                            if (e.key === 'Escape') setEditingId(null);
                          }}
                          aria-label="Rename conversation title"
                          className="w-full min-w-0 px-2 py-0.5 text-xs rounded bg-white dark:bg-[#080B1A] text-slate-900 dark:text-white border border-[#6366F1] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => commitEdit(conv.id)}
                          aria-label="Save title"
                          className="p-1 text-emerald-500 hover:bg-emerald-500/10 rounded cursor-pointer"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          aria-label="Cancel rename"
                          className="p-1 text-slate-400 hover:bg-white/10 rounded cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-medium text-[13px] leading-snug">
                            {conv.title}
                          </p>
                          <p className="truncate text-[11px] text-slate-500 dark:text-slate-500">
                            {conv.updatedAt}
                          </p>
                        </div>

                        <div className="flex items-center gap-0.5 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-within:opacity-100 transition-opacity shrink-0">
                          <button
                            type="button"
                            onClick={(e) => startEditing(conv, e)}
                            aria-label={`Rename ${conv.title}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/10 cursor-pointer"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onRequestDelete(conv);
                            }}
                            aria-label={`Delete ${conv.title}`}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Profile preview & Settings footer */}
      <div className="p-3.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-full bodh-gradient-btn text-white text-xs font-bold flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-900 dark:text-[#F8FAFC] truncate">
              {profile.name}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-[#94A3B8] truncate">
              {profile.focusArea}
            </p>
          </div>
        </div>

        <Tooltip content="Settings" position="top">
          <button
            type="button"
            onClick={onOpenSettings}
            aria-label="Open settings"
            className="p-2 rounded-lg text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/70 dark:hover:bg-white/5 transition-colors cursor-pointer shrink-0"
          >
            <Settings className="w-4 h-4" />
          </button>
        </Tooltip>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop persistent sidebar */}
      <aside aria-label="Chat history sidebar" className="hidden lg:block w-72 shrink-0 h-full">
        {sidebarContent}
      </aside>

      {/* Mobile slide-over drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Chat history drawer"
              className="relative z-10 w-[82vw] max-w-xs h-full shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
