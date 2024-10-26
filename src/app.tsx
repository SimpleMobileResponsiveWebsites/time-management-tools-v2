import React, { useState } from 'react';
import { format } from 'date-fns';
import { Clock } from 'lucide-react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Analytics from './components/Analytics';
import type { Task, Priority } from './types/Task';

const PRIORITIES: Priority[] = ['Critical', 'Important', 'Emerging', 'Moderate', 'Undefined', 'No Priority'];

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState<'add' | 'view' | 'analytics'>('add');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedPriorities, setSelectedPriorities] = useState<Priority[]>(PRIORITIES);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-blue-600" />
              <h1 className="ml-2 text-xl font-bold text-gray-900">Time Management Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('add')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'add'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Add Task
              </button>
              <button
                onClick={() => setCurrentPage('view')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'view'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                View Tasks
              </button>
              <button
                onClick={() => setCurrentPage('analytics')}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === 'analytics'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'add' && (
          <TaskForm onSubmit={handleAddTask} />
        )}

        {currentPage === 'view' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date</label>
                  <input
                    type="date"
                    value={format(selectedDate, 'yyyy-MM-dd')}
                    onChange={(e) => setSelectedDate(new Date(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Priority</label>
                  <select
                    multiple
                    value={selectedPriorities}
                    onChange={(e) => {
                      const values = Array.from(e.target.selectedOptions, option => option.value as Priority);
                      setSelectedPriorities(values);
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {PRIORITIES.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <TaskList
              tasks={tasks}
              selectedDate={selectedDate}
              selectedPriorities={selectedPriorities}
            />
          </div>
        )}

        {currentPage === 'analytics' && (
          <Analytics tasks={tasks} />
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500">
            Current Time: {format(new Date(), 'yyyy-MM-dd HH:mm:ss')}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
