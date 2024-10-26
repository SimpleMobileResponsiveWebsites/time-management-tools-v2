import React from 'react';
import { format } from 'date-fns';
import { Clock, Users, Wrench, AlertTriangle, CheckCircle } from 'lucide-react';
import type { Task } from '../types/Task';

interface TaskListProps {
  tasks: Task[];
  selectedDate: Date;
  selectedPriorities: string[];
}

export default function TaskList({ tasks, selectedDate, selectedPriorities }: TaskListProps) {
  const filteredTasks = tasks.filter(task => 
    task.date === format(selectedDate, 'yyyy-MM-dd') &&
    selectedPriorities.includes(task.priority)
  );

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No tasks found for the selected criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTasks.map((task) => (
        <div key={task.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{task.task}</h3>
            <span className={`px-3 py-1 rounded-full text-sm ${
              task.priority === 'Critical' ? 'bg-red-100 text-red-800' :
              task.priority === 'Important' ? 'bg-orange-100 text-orange-800' :
              task.priority === 'Emerging' ? 'bg-yellow-100 text-yellow-800' :
              'bg-blue-100 text-blue-800'
            }`}>
              {task.priority}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600">Duration: {task.durationHours.toFixed(2)} hours</p>
                  <p className="text-sm text-gray-600">
                    {task.startTime} - {task.endTime}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Users className="w-5 h-5 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">People Involved</p>
                  <p className="text-sm text-gray-600">{task.people || 'None specified'}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Wrench className="w-5 h-5 mr-2 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Tools & Resources</p>
                  <p className="text-sm text-gray-600">{task.tools || 'None specified'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {task.roadblocks && (
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Roadblocks</p>
                    <p className="text-sm text-gray-600">{task.roadblocks}</p>
                  </div>
                </div>
              )}

              {task.accomplishments && (
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Accomplishments</p>
                    <p className="text-sm text-gray-600">{task.accomplishments}</p>
                  </div>
                </div>
              )}

              {task.expenses.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">Expenses</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {task.expenses.map((expense, index) => (
                      <li key={index}>{expense}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
