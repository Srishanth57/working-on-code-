export type Mood = 'amazing' | 'good' | 'neutral' | 'bad' | 'terrible';

export interface MoodEntry {
  date: string;
  mood: Mood;
  note: string;
}