export type View = 'dashboard' | 'checkin' | 'breathing' | 'journal' | 'progress' | 'support' | 'challenges' | 'onboarding' | 'celebration' | 'psychoanalysis' | 'language' | 'profile' | 'settings' | 'sessionHistory';

export type Mood = {
  label: string;
  emoji: string;
  value: number;
  color: string;
};

export type MoodEntry = {
  mood: number;
  energy: number;
  gratitude: [string, string, string];
  sleep: number;
  stress: number;
};

export type BreathingTechnique = {
  id: string;
  name: string;
  description: string;
  icon: string;
  pattern: {
    inhale: number;
    hold?: number;
    exhale: number;
    holdAfter?: number;
  };
  practice: string[];
  note?: string;
};

export type DailyLog = {
  date: string; // YYYY-MM-DD
  mood: number; // 1-5
  energy: number; // 0-100
  sleep: number; // 1-5
};

export type Milestone = {
  id: string;
  icon: string;
  title: string;
  description: string;
};

export type Reaction = {
  emoji: string;
  count: number;
};

export type SupportMessage = {
  id: string;
  content: string;
  timestamp: string;
  sender: 'self' | 'other';
  reactions: Reaction[];
  isRewarded?: boolean;
};

export type WellnessChallenge = {
    id: string;
    icon: string;
    title: string;
    description: string;
    reward: string;
    progress: number; // 0 to 100
    status: 'active' | 'completed';
};

export type Theme = 'light' | 'dark';
export type ThemeSetting = Theme | 'system';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening';
export type Language = 'en' | 'es';

export type UserSettings = {
  theme: ThemeSetting;
  notificationsEnabled: boolean;
};

export type SessionSummary = {
  id: number; // Use timestamp for unique ID
  date: string; // ISO string
  title: string;
  summary: string;
};