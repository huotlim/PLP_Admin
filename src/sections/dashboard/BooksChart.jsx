import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// Example data for demonstration
const dataMap = {
  week: [
    { name: 'Mon', created: 5, lost: 1 },
    { name: 'Tue', created: 8, lost: 2 },
    { name: 'Wed', created: 6, lost: 0 },
    { name: 'Thu', created: 7, lost: 3 },
    { name: 'Fri', created: 4, lost: 1 },
    { name: 'Sat', created: 3, lost: 0 },
    { name: 'Sun', created: 2, lost: 1 }
  ],
  month: [
    { name: 'Week 1', created: 20, lost: 5 },
    { name: 'Week 2', created: 25, lost: 3 },
    { name: 'Week 3', created: 18, lost: 4 },
    { name: 'Week 4', created: 22, lost: 2 }
  ],
  quarter: [
    { name: 'Jan', created: 60, lost: 10 },
    { name: 'Feb', created: 55, lost: 8 },
    { name: 'Mar', created: 70, lost: 12 }
  ]
};

export default function BooksChart({ period }) {
  const data = dataMap[period] || dataMap['week'];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="created" fill="#4caf50" name="Books Created" />
        <Bar dataKey="lost" fill="#f44336" name="Books Lost" />
      </BarChart>
    </ResponsiveContainer>
  );
}
