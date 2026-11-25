import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, ArrowRight } from 'lucide-react';
import { ChatMessage } from '../../types';
import { BodhLogo } from '../common/BodhLogo';
import { useNotification } from '../../context/NotificationContext';
import { useTheme } from '../../context/ThemeContext';

interface MessageBubbleProps {
  message: ChatMessage;
  onSelectFollowUp?: (prompt: string) => void;
}

/**
 * Safely renders lightweight inline bold (**...**) and italic (*...*) formatting
 * using React elements rather than raw HTML injection.
 */
function renderInlineText(text: string): React.ReactNode[] {
  const segments = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return segments.map((seg, i) => {
    if (seg.startsWith('**') && seg.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-slate-900 dark:text-[#F8FAFC]">
          {seg.slice(2, -2)}
        </strong>
      );
    }
    if (seg.startsWith('*') && seg.endsWith('*')) {
      return (
        <em key={i} className="italic">
          {seg.slice(1, -1)}
        </em>
      );
    }
    return <React.Fragment key={i}>{seg}</React.Fragment>;
  });
}

function StructuredMessageContent({
  content,
  comfortable,
}: {
  content: string;
  comfortable: boolean;
}) {
  const blocks = content.split(/\n\n+/);
  const textSizeClass = comfortable ? 'text-[15.5px] leading-7' : 'text-sm leading-relaxed';

  return (
    <div className={`space-y-3 ${textSizeClass}`}>
      {blocks.map((block, idx) => {
        const lines = block.split('\n');
        const isBulletList = lines.every((line) => line.trim().startsWith('- '));

        if (isBulletList) {
          return (
            <ul key={idx} className="list-disc pl-5 space-y-1.5">
              {lines.map((line, lineIdx) => (
                <li key={lineIdx}>{renderInlineText(line.trim().slice(2))}</li>
              ))}
            </ul>
          );
        }

        return (
          <div key={idx} className="space-y-1.5">
            {lines.map((line, lineIdx) => (
              <p key={lineIdx}>{renderInlineText(line)}</p>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export function MessageBubble({ message, onSelectFollowUp }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);
  const { notify } = useNotification();
  const { preferences } = useTheme();

  const isUser = message.role === 'user';
  const comfortable = preferences.textSize === 'comfortable';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      notify('success', 'Response copied to clipboard');
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      notify('error', 'Could not copy message');
    }
  };

  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-tr-sm px-4 py-3 bg-[#6366F1] text-white shadow-sm">
          <p className={comfortable ? 'text-[15px] leading-7' : 'text-sm leading-relaxed'}>
            {message.content}
          </p>
          <p className="mt-1.5 text-[11px] text-indigo-100/80 text-right">{message.timestamp}</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
      className="flex items-start gap-3 sm:gap-4"
    >
      <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#141C36] border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0 mt-0.5">
        <BodhLogo size="sm" showWordmark={false} />
      </div>

      <div className="flex-1 min-w-0 space-y-3">
        <div className="rounded-2xl rounded-tl-sm px-5 py-4 bg-white dark:bg-[#11172B] border border-slate-200 dark:border-slate-800/90 text-slate-700 dark:text-slate-200">
          {/* Optional concept focus metadata line (clean unboxed text per zero-pill discipline) */}
          {preferences.showStepTags && message.conceptFocus && (
            <div className="mb-3 pb-2.5 border-b border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-[#6366F1] dark:text-[#22D3EE]">
                Concept Focus: {message.conceptFocus}
              </span>
              <span className="text-slate-400 dark:text-slate-500">{message.timestamp}</span>
            </div>
          )}

          <StructuredMessageContent content={message.content} comfortable={comfortable} />

          {/* Clear simulation notice + copy action */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/70 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <span>
              Simulated preview response · Predefined educational sample (no live AI model connected)
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Clickable educational follow-up prompts */}
        {message.followUpSuggestions && message.followUpSuggestions.length > 0 && onSelectFollowUp && (
          <div className="flex flex-wrap gap-2">
            {message.followUpSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => onSelectFollowUp(suggestion)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-[#11172B] hover:bg-[#6366F1]/10 dark:hover:bg-[#1C2545] border border-slate-200 dark:border-slate-800 hover:border-[#6366F1]/40 transition-colors cursor-pointer"
              >
                <span>{suggestion}</span>
                <ArrowRight className="w-3 h-3 opacity-60 shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
