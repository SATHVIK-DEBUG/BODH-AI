import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useNotification } from '../../context/NotificationContext';

interface CodeBlockProps {
  title: string;
  language: string;
  code: string;
}

export function CodeBlock({ title, language, code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { notify } = useNotification();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      notify('success', 'Code snippet copied to clipboard');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      notify('error', 'Unable to copy code', 'Please select and copy the code manually.');
    }
  };

  return (
    <div className="my-5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950 text-slate-100">
      <div className="flex items-center justify-between gap-4 px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400 truncate">
          <span className="font-medium text-slate-200 truncate">{title}</span>
          <span aria-hidden="true">·</span>
          <span>{language}</span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${title}`}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
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
      <pre className="p-4 overflow-x-auto text-xs sm:text-[13px] leading-relaxed text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}
