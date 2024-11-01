import React from 'react';
import Calendar from 'react-calendar';
import { format } from 'date-fns';
import type { MoodEntry } from '../types';
import 'react-calendar/dist/Calendar.css';

interface MoodCalendarProps {
  entries: MoodEntry[];
  onDateSelect: (date: Date) => void;
}

const moodColors = {
  amazing: 'bg-yellow-200',
  good: 'bg-green-200',
  neutral: 'bg-blue-200',
  bad: 'bg-orange-200',
  terrible: 'bg-red-200',
};

export const MoodCalendar: React.FC<MoodCalendarProps> = ({ entries, onDateSelect }) => {
  const tileClassName = ({ date }: { date: Date }) => {
    const entry = entries.find(
      e => e.date === format(date, 'yyyy-MM-dd')
    );
    return entry ? moodColors[entry.mood] : '';
  };

  return (
    <Calendar
      onChange={(value) => onDateSelect(value as Date)}
      tileClassName={tileClassName}
      className="rounded-lg border-none shadow-lg"
    />
  );
};