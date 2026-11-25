export type ThemeMode = 'dark' | 'light' | 'system';

export type NotificationType = 'success' | 'error' | 'info';

export interface NotificationItem {
  id: string;
  type: NotificationType;
  message: string;
  description?: string;
}

export interface ChatPreferences {
  enterToSend: boolean;
  showSimulationNotice: boolean;
  textSize: 'default' | 'comfortable';
  showStepTags: boolean;
}

export interface UserProfilePreview {
  name: string;
  email: string;
  focusArea: string;
  role: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isSimulated?: boolean;
  conceptFocus?: string;
  followUpSuggestions?: string[];
}

export interface Conversation {
  id: string;
  title: string;
  subject: string;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface DocHeading {
  id: string;
  title: string;
}

export interface DocCodeExample {
  title: string;
  language: string;
  code: string;
}

export interface DocContentBlock {
  headingId: string;
  heading: string;
  paragraphs: string[];
  bulletPoints?: string[];
  callout?: {
    label: string;
    text: string;
  };
  codeExample?: DocCodeExample;
}

export interface DocSection {
  id: string;
  title: string;
  group: 'Getting Started' | 'Core Pedagogy' | 'Technical Overview' | 'Reference';
  summary: string;
  lastUpdated: string;
  hasHeroGraphic?: boolean;
  blocks: DocContentBlock[];
}

export interface DeveloperProfileData {
  name: string;
  role: string;
  organization: string;
  location: string;
  bio: string;
  focusAreas: string;
  contactEmail: string;
  websiteLabel: string;
}
