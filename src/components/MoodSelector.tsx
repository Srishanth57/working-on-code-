import React from 'react';
import { Smile, Laugh, Meh, Frown, CloudRain } from 'lucide-react';
import type { Mood } from '../types';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
}

const moods: { type: Mood; Icon: React.FC; label: string; color: string }[] = [
  { type: 'amazing', Icon: Laugh, label: 'Amazing', color: 'text-yellow-500' },
  { type: 'good', Icon: Smile, label: 'Good', color: 'text-green-500' },
  { type: 'neutral', Icon: Meh, label: 'Neutral', color: 'text-blue-500' },
  { type: 'bad', Icon: Frown, label: 'Bad', color: 'text-orange-500' },
  { type: 'terrible', Icon: CloudRain, label: 'Terrible', color: 'text-red-500' },
];

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodSelect }) => {
  return (
    <div className="flex gap-4 justify-center">
      {moods.map(({ type, Icon, label, color }) => (
        <button
          key={type}
          onClick={() => onMoodSelect(type)}
          className={`flex flex-col items-center p-3 rounded-lg transition-all ${
            selectedMood === type
              ? 'bg-gray-100 scale-110'
              : 'hover:bg-gray-50'
          }`}
        >
          <Icon className={`w-8 h-8 ${color}`} />
          <span className="text-sm mt-1 text-gray-600">{label}</span>
        </button>
      ))}
    </div>
  );
};