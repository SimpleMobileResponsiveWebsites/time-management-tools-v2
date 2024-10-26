import React from 'react';
import Plot from 'react-plotly.js';
import { format } from 'date-fns';
import type { Task } from '../types/Task';

interface AnalyticsProps {
  tasks: Task[];
}

export default function Analytics({ tasks }: AnalyticsProps) {
  const priorityDistribution = tasks.reduce((acc, task) => {
    acc[task.priority] = (acc[task.priority] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dailyHours = tasks.reduce((acc, task) => {
    acc[task.date] = (acc[task.date] || 0) + task.durationHours;
    return acc;
  }, {} as Record<string, number>);

  const tasksPerDay = tasks.reduce((acc, task) => {
    acc[task.date] = (acc[task.date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Plot
            data={[{
              values: Object.values(priorityDistribution),
              labels: Object.keys(priorityDistribution),
              type: 'pie',
              hole: 0.4,
              marker: {
                colors: [
                  '#EF4444', // Critical
                  '#F97316', // Important
                  '#EAB308', // Emerging
                  '#3B82F6', // Moderate
                  '#9CA3AF', // Undefined
                  '#E5E7EB', // No Priority
                ]
              }
            }]}
            layout={{
              title: 'Task Distribution by Priority',
              height: 400,
              margin: { t: 40, b: 40, l: 40, r: 40 }
            }}
            config={{ responsive: true }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Plot
            data={[{
              x: Object.keys(dailyHours),
              y: Object.values(dailyHours),
              type: 'bar',
              marker: { color: '#3B82F6' }
            }]}
            layout={{
              title: 'Daily Time Spent (Hours)',
              height: 400,
              margin: { t: 40, b: 40, l: 40, r: 40 },
              xaxis: { title: 'Date' },
              yaxis: { title: 'Hours' }
            }}
            config={{ responsive: true }}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <Plot
          data={[{
            x: Object.keys(tasksPerDay),
            y: Object.values(tasksPerDay),
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: '#10B981' }
          }]}
          layout={{
            title: 'Tasks Completed Over Time',
            height: 400,
            margin: { t: 40, b: 40, l: 40, r: 40 },
            xaxis: { title: 'Date' },
            yaxis: { title: 'Number of Tasks' }
          }}
          config={{ responsive: true }}
        />
      </div>

      <div className="mt-8">
        <button
          onClick={() => {
            const csv = [
              ['Date', 'Task', 'Priority', 'Duration (Hours)', 'Start Time', 'End Time'].join(','),
              ...tasks.map(task => [
                task.date,
                task.task,
                task.priority,
                task.durationHours,
                task.startTime,
                task.endTime
              ].join(','))
            ].join('\n');

            const blob = new Blob([csv], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'task_data.csv';
            a.click();
            window.URL.revokeObjectURL(url);
          }}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Download Task Data (CSV)
        </button>
      </div>
    </div>
  );
}
