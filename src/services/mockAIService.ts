import { INITIAL_MOCK_CONVERSATIONS } from '../data/mockConversations';
import { matchMockEducationalResponse } from '../data/mockResponses';
import { ChatMessage, Conversation } from '../types';

/**
 * Frontend-only mock AI service layer.
 * Kept cleanly decoupled from React components so a real backend API
 * can be connected later without restructuring the UI.
 */

export function formatCurrentTime(): string {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

export function getInitialConversations(): Conversation[] {
  return INITIAL_MOCK_CONVERSATIONS.map((conv) => ({
    ...conv,
    messages: conv.messages.map((m) => ({ ...m })),
  }));
}

export function createEmptyConversation(title = 'New Conversation'): Conversation {
  return {
    id: `conv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    title,
    subject: 'General Exploration',
    updatedAt: 'Just now',
    messages: [],
  };
}

export function deriveConversationTitle(firstPrompt: string): string {
  const cleaned = firstPrompt.trim().replace(/\s+/g, ' ');
  if (cleaned.length <= 32) return cleaned;
  return `${cleaned.slice(0, 32).trim()}…`;
}

export async function generateSimulatedBodhReply(prompt: string): Promise<ChatMessage> {
  // Simulated typing latency (700ms - 1150ms) purely in the browser
  const delay = 700 + Math.floor(Math.random() * 450);
  await new Promise((resolve) => window.setTimeout(resolve, delay));

  const matched = matchMockEducationalResponse(prompt);

  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    role: 'assistant',
    content: matched.content,
    conceptFocus: matched.conceptFocus,
    followUpSuggestions: matched.followUpSuggestions,
    timestamp: formatCurrentTime(),
    isSimulated: true,
  };
}
