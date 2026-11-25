import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Menu,
  Paperclip,
  Send,
  Trash2,
  BookOpen,
  MoreHorizontal,
  Settings,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';
import { BodhLogo } from '../components/common/BodhLogo';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Dropdown } from '../components/common/Dropdown';
import { Tooltip } from '../components/common/Tooltip';
import { LoadingIndicator } from '../components/common/LoadingIndicator';
import { ChatSidebar } from '../components/chat/ChatSidebar';
import { MessageBubble } from '../components/chat/MessageBubble';
import { SettingsModal } from '../components/chat/SettingsModal';
import { SUGGESTED_PROMPTS } from '../data/mockResponses';
import {
  createEmptyConversation,
  deriveConversationTitle,
  formatCurrentTime,
  generateSimulatedBodhReply,
  getInitialConversations,
} from '../services/mockAIService';
import { useNotification } from '../context/NotificationContext';
import { useTheme } from '../context/ThemeContext';
import { ChatMessage, Conversation } from '../types';

export default function Chat() {
  const navigate = useNavigate();
  const { notify } = useNotification();
  const { resolvedTheme, setTheme, preferences, profile } = useTheme();

  const [conversations, setConversations] = useState<Conversation[]>(() => getInitialConversations());
  // Start on a clean Welcome Screen (activeId = null) while sample history sits ready in the sidebar
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Conversation | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeId) || null;
  const activeMessages = activeConversation?.messages || [];

  // Auto-scroll when messages arrive or typing starts
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages.length, isTyping, activeId]);

  // Auto-resize textarea height cleanly
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
  }, [inputValue]);

  const handleNewChat = () => {
    if (isTyping) return;
    setActiveId(null);
    setInputValue('');
    textareaRef.current?.focus();
  };

  const handleRenameConversation = (id: string, nextTitle: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: nextTitle } : c))
    );
    notify('success', 'Conversation renamed');
  };

  const handleConfirmDelete = () => {
    if (!pendingDelete) return;
    const deletedId = pendingDelete.id;
    setConversations((prev) => prev.filter((c) => c.id !== deletedId));
    if (activeId === deletedId) {
      setActiveId(null);
    }
    notify('info', `Deleted "${pendingDelete.title}"`);
    setPendingDelete(null);
  };

  const handleSendMessage = async (rawPrompt?: string) => {
    const text = (rawPrompt ?? inputValue).trim();
    if (!text || isTyping) return;

    setInputValue('');

    const userMessage: ChatMessage = {
      id: `msg-u-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: formatCurrentTime(),
    };

    let targetConvId = activeId;

    if (!targetConvId) {
      const fresh = createEmptyConversation(deriveConversationTitle(text));
      fresh.messages = [userMessage];
      targetConvId = fresh.id;
      setConversations((prev) => [fresh, ...prev]);
      setActiveId(fresh.id);
    } else {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id !== targetConvId) return conv;
          const updatedTitle =
            conv.messages.length === 0 ? deriveConversationTitle(text) : conv.title;
          return {
            ...conv,
            title: updatedTitle,
            updatedAt: 'Just now',
            messages: [...conv.messages, userMessage],
          };
        })
      );
    }

    setIsTyping(true);
    try {
      const simulatedReply = await generateSimulatedBodhReply(text);
      const finalTargetId = targetConvId;
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === finalTargetId
            ? {
                ...conv,
                updatedAt: 'Just now',
                messages: [...conv.messages, simulatedReply],
              }
            : conv
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && preferences.enterToSend) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachmentClick = () => {
    notify(
      'info',
      'Attachment button is visual-only',
      'File uploads will be enabled once a backend storage service is connected.'
    );
  };

  return (
    <div className="h-[100dvh] w-full flex overflow-hidden bg-[#F8FAFC] dark:bg-[#080B1A] text-slate-900 dark:text-[#F8FAFC]">
      {/* Responsive Chat History Sidebar */}
      <ChatSidebar
        conversations={conversations}
        activeId={activeId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelect={(id) => {
          if (!isTyping) setActiveId(id);
        }}
        onNewChat={handleNewChat}
        onRequestDelete={(conv) => setPendingDelete(conv)}
        onRename={handleRenameConversation}
        onOpenSettings={() => setSettingsOpen(true)}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Chat Pane */}
      <div className="flex-1 min-w-0 flex flex-col h-full">
        {/* Top Workspace Bar */}
        <header className="h-16 px-4 sm:px-6 border-b border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-[#0B1024]/85 backdrop-blur-sm flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open chat history sidebar"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 border border-slate-200 dark:border-slate-800 cursor-pointer shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="min-w-0">
              <h1 className="text-sm font-semibold text-slate-900 dark:text-[#F8FAFC] truncate">
                {activeConversation ? activeConversation.title : 'Bodh Learning Workspace'}
              </h1>
              {preferences.showSimulationNotice && (
                <p className="text-[11px] text-slate-500 dark:text-[#94A3B8] truncate">
                  Frontend Preview · Simulated Educational Responses
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <Tooltip
              content={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              position="bottom"
            >
              <button
                type="button"
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                aria-label="Toggle color theme"
                className="p-2 rounded-lg text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
              >
                {resolvedTheme === 'dark' ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>
            </Tooltip>

            {activeConversation && (
              <Tooltip content="Delete conversation" position="bottom">
                <button
                  type="button"
                  onClick={() => setPendingDelete(activeConversation)}
                  aria-label="Delete current conversation"
                  className="p-2 rounded-lg text-slate-500 dark:text-[#94A3B8] hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </Tooltip>
            )}

            <Dropdown
              align="right"
              trigger={
                <button
                  type="button"
                  aria-label="More workspace options"
                  className="p-2 rounded-lg text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              }
              options={[
                {
                  label: 'New Chat',
                  icon: <Sparkles className="w-3.5 h-3.5" />,
                  onClick: handleNewChat,
                },
                {
                  label: 'Documentation',
                  icon: <BookOpen className="w-3.5 h-3.5" />,
                  onClick: () => navigate('/docs'),
                },
                {
                  label: 'Settings',
                  icon: <Settings className="w-3.5 h-3.5" />,
                  onClick: () => setSettingsOpen(true),
                },
              ]}
            />
          </div>
        </header>

        {/* Conversation Thread or Welcome Screen */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6">
          {activeMessages.length === 0 ? (
            <div className="h-full max-w-3xl mx-auto flex flex-col items-center justify-center py-10 text-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full space-y-6"
              >
                <div className="flex justify-center">
                  <BodhLogo size="xl" showWordmark={false} />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
                    Hello, {profile.name}!
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-[#94A3B8] max-w-md mx-auto">
                    Ask me anything—I&apos;m here to help you reason through concepts deeply rather
                    than just memorize answers.
                  </p>
                </div>

                {/* Suggested Prompts matching approved reference */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handleSendMessage(prompt)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-[#11172B] hover:bg-slate-50 dark:hover:bg-[#17203B] border border-slate-200 dark:border-slate-800 hover:border-[#6366F1]/60 transition-all duration-150 cursor-pointer"
                    >
                      <span>{prompt}</span>
                    </button>
                  ))}
                </div>

                <p className="pt-4 text-xs text-slate-500 dark:text-slate-500 max-w-md mx-auto">
                  You can also open any preloaded topic in Chat History on the left to inspect
                  multi-step conceptual dialogues.
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto py-6 sm:py-8 space-y-6">
              {activeMessages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  onSelectFollowUp={(suggestion) => handleSendMessage(suggestion)}
                />
              ))}

              {isTyping && (
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#141C36] border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
                    <BodhLogo size="sm" showWordmark={false} />
                  </div>
                  <div className="px-4 py-3.5 rounded-2xl rounded-tl-sm bg-white dark:bg-[#11172B] border border-slate-200 dark:border-slate-800">
                    <LoadingIndicator variant="typing" label="Preparing simulated response..." />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </main>

        {/* Bottom Message Composer */}
        <div className="px-4 sm:px-6 pb-4 pt-2 shrink-0 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC] dark:from-[#080B1A] dark:via-[#080B1A] to-transparent">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-end gap-2 p-2 rounded-2xl bg-white dark:bg-[#11172B] border border-slate-200 dark:border-slate-800 focus-within:border-[#6366F1] focus-within:ring-2 focus-within:ring-[#6366F1]/25 transition-all"
            >
              <Tooltip content="Attach file (visual preview only)" position="top">
                <button
                  type="button"
                  onClick={handleAttachmentClick}
                  aria-label="Attach file (visual only)"
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors cursor-pointer shrink-0"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
              </Tooltip>

              <label htmlFor="bodh-chat-input" className="sr-only">
                Type your educational question
              </label>
              <textarea
                id="bodh-chat-input"
                ref={textareaRef}
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                disabled={isTyping}
                className="flex-1 min-w-0 max-h-36 py-2.5 px-1.5 text-sm bg-transparent text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 dark:placeholder:text-slate-500 resize-none focus:outline-none disabled:opacity-60"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
                className="w-10 h-10 rounded-xl bodh-gradient-btn text-white flex items-center justify-center shadow-sm cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-transform duration-150 hover:scale-[1.03] active:scale-[0.97] shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <p className="mt-2 text-center text-[11px] text-slate-500 dark:text-slate-500">
              Simulated frontend preview · Predefined educational samples only (no live AI model
              connected).
            </p>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {/* Delete Conversation Confirmation Dialog */}
      <ConfirmDialog
        open={Boolean(pendingDelete)}
        onClose={() => setPendingDelete(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Conversation?"
        message={`"${pendingDelete?.title ?? ''}" will be removed from your local session chat history.`}
        confirmLabel="Delete"
        destructive
      />
    </div>
  );
}
