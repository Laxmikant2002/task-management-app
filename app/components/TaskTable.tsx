'use client';

import { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import { Task, Priority, Status } from '../types';
import EditTaskModal from './EditTaskModal';
import { formatDate } from '../utils/dateFormatter';

const statusColors = {
  'In Progress': 'bg-yellow-400 text-yellow-800',
  'Completed': 'bg-green-500 text-white',
};

const priorityColors = {
  High: 'text-red-600',
  Medium: 'text-orange-600',
  Low: 'text-green-600',
};

export default function TaskTable() {
  const { filteredTasks, deleteTask } = useTaskContext();
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 text-lg">No tasks found</p>
        </div>
      ) : (
        <table className="min-w-full">
          <thead className="bg-white border-b">
            <tr>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                SL.No
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                Title
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                Description
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                Due Date
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                Priority
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredTasks.map((task, index) => (
              <tr key={task.id} className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm text-gray-500">
                  {index + 1}
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm font-medium text-gray-900">{task.title}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-gray-500 max-w-md">{task.description}</div>
                </td>
                <td className="py-4 px-6">
                  <div className="text-sm text-gray-500">
                    {formatDate(task.dueDate)}
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColors[task.status]}`}>
                    {task.status}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center">
                    <select
                      value={task.priority}
                      onChange={(e) => {}}
                      className={`border rounded px-2 py-1 text-sm ${priorityColors[task.priority]}`}
                      disabled
                    >
                      <option value={task.priority}>{task.priority}</option>
                    </select>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-gray-600 hover:text-red-600"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <EditTaskModal
        isOpen={editingTask !== null}
        onClose={() => setEditingTask(null)}
        task={editingTask}
      />
    </div>
  );
} 