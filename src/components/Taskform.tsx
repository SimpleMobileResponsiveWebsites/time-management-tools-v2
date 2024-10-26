import React, { useState } from 'react';
import { format } from 'date-fns';
import { Clock, Users, Wrench, BookOpen, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';
import type { Task, Priority } from '../types/Task';

interface TaskFormProps {
  onSubmit: (task: Task) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [formData, setFormData] = useState({
    task: '',
    priority: 'Moderate' as Priority,
    startTime: '',
    endTime: '',
    researchTime: '',
    roadblockTime: '',
    tools: '',
    resources: '',
    people: '',
    researchSources: '',
    roadblocks: '',
    researchCompleted: '',
    researchNeeded: '',
    accomplishments: '',
    errorRecognitionEvents: '',
    additionalTasks: '',
    expenses: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const task: Task = {
      id: crypto.randomUUID(),
      date: format(new Date(), 'yyyy-MM-dd'),
      ...formData,
      durationHours: calculateDuration(formData.startTime, formData.endTime),
      expenses: formData.expenses.split('\n').filter(Boolean)
    };

    onSubmit(task);
    setFormData({
      task: '',
      priority: 'Moderate' as Priority,
      startTime: '',
      endTime: '',
      researchTime: '',
      roadblockTime: '',
      tools: '',
      resources: '',
      people: '',
      researchSources: '',
      roadblocks: '',
      researchCompleted: '',
      researchNeeded: '',
      accomplishments: '',
      errorRecognitionEvents: '',
      additionalTasks: '',
      expenses: ''
    });
  };

  const calculateDuration = (start: string, end: string): number => {
    const startDate = new Date(`1970-01-01T${start}`);
    const endDate = new Date(`1970-01-01T${end}`);
    return (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Task</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Task Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.task}
              onChange={(e) => setFormData({ ...formData, task: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
            >
              <option>Critical</option>
              <option>Important</option>
              <option>Emerging</option>
              <option>Moderate</option>
              <option>Undefined</option>
              <option>No Priority</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <details className="bg-gray-50 rounded-lg p-4">
            <summary className="font-medium cursor-pointer flex items-center">
              <Clock className="w-5 h-5 mr-2" /> Time Information
            </summary>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Time</label>
                <input
                  type="time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Time</label>
                <input
                  type="time"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                />
              </div>
            </div>
          </details>

          <details className="mt-4 bg-gray-50 rounded-lg p-4">
            <summary className="font-medium cursor-pointer flex items-center">
              <Users className="w-5 h-5 mr-2" /> People & Resources
            </summary>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">People Involved</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  value={formData.people}
                  onChange={(e) => setFormData({ ...formData, people: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tools Used</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  value={formData.tools}
                  onChange={(e) => setFormData({ ...formData, tools: e.target.value })}
                />
              </div>
            </div>
          </details>

          <details className="mt-4 bg-gray-50 rounded-lg p-4">
            <summary className="font-medium cursor-pointer flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" /> Roadblocks & Issues
            </summary>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Roadblocks</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  value={formData.roadblocks}
                  onChange={(e) => setFormData({ ...formData, roadblocks: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Error Recognition</label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  rows={3}
                  value={formData.errorRecognitionEvents}
                  onChange={(e) => setFormData({ ...formData, errorRecognitionEvents: e.target.value })}
                />
              </div>
            </div>
          </details>

          <details className="mt-4 bg-gray-50 rounded-lg p-4">
            <summary className="font-medium cursor-pointer flex items-center">
              <DollarSign className="w-5 h-5 mr-2" /> Expenses
            </summary>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Itemized Expenses (One per line)</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                value={formData.expenses}
                onChange={(e) => setFormData({ ...formData, expenses: e.target.value })}
                placeholder="Item 1: $XX.XX&#10;Item 2: $XX.XX"
              />
            </div>
          </details>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Save Task
          </button>
        </div>
      </div>
    </form>
  );
}
