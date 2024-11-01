import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, BarChart } from 'lucide-react';
import { MoodSelector } from './components/MoodSelector';
import { MoodChart } from './components/MoodChart';
import { MoodCalendar } from './components/MoodCalendar';
import type { Mood, MoodEntry } from './types';

function App() {
  const [entries, setEntries] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem('moodEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [note, setNote] = useState('');
  const [view, setView] = useState<'calendar' | 'chart'>('calendar');

  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  const selectedEntry = entries.find(entry => entry.date === dateStr);

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  const handleMoodSelect = (mood: Mood) => {
    setEntries(prev => {
      const existing = prev.findIndex(e => e.date === dateStr);
      if (existing !== -1) {
        return prev.map((entry, i) =>
          i === existing ? { ...entry, mood, note } : entry
        );
      }
      return [...prev, { date: dateStr, mood, note }];
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Mood Tracker</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setView('calendar')}
                className={`p-2 rounded-lg ${
                  view === 'calendar' ? 'bg-purple-100' : 'hover:bg-gray-100'
                }`}
              >
                <CalendarIcon className="w-6 h-6 text-purple-600" />
              </button>
              <button
                onClick={() => setView('chart')}
                className={`p-2 rounded-lg ${
                  view === 'chart' ? 'bg-purple-100' : 'hover:bg-gray-100'
                }`}
              >
                <BarChart className="w-6 h-6 text-purple-600" />
              </button>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {format(selectedDate, 'MMMM d, yyyy')}
            </h2>
            <MoodSelector
              selectedMood={selectedEntry?.mood || null}
              onMoodSelect={handleMoodSelect}
            />
          </div>

          <div className="mb-8">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note about your day..."
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            {view === 'calendar' ? (
              <MoodCalendar
                entries={entries}
                onDateSelect={setSelectedDate}
              />
            ) : (
              <MoodChart entries={entries} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;