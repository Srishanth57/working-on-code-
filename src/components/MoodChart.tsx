import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import type { MoodEntry } from '../types';

interface MoodChartProps {
  entries: MoodEntry[];
}

const moodToValue = {
  amazing: 5,
  good: 4,
  neutral: 3,
  bad: 2,
  terrible: 1,
};

export const MoodChart: React.FC<MoodChartProps> = ({ entries }) => {
  const data = entries.map(entry => ({
    date: format(new Date(entry.date), 'MMM d'),
    value: moodToValue[entry.mood],
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            domain={[1, 5]}
            ticks={[1, 2, 3, 4, 5]}
            tickFormatter={(value) => 
              ['Terrible', 'Bad', 'Neutral', 'Good', 'Amazing'][value - 1]
            }
          />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};