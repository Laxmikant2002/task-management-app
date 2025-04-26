'use client';

import { useState, useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { TaskContext } from '../app/page';
import { Task } from '../types';

export default function EditTaskModal({ task }: { task: Task }) {
  const { setTasks } = useContext(TaskContext);
  const [isOpen, setIsOpen] = useState(false);
  const [updatedTask, setUpdatedTask] = useState<Task>({ ...task });

  const handleSubmit = () => {
    setTasks(prev => prev.map(t => t.id === task.id ? updatedTask : t));
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="text-blue-500 hover:text-blue-700">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12h-3m0 0H9m3 0v3m0-3V9m6 3a6 6 0 11-12 0 6 6 0 0112 0z" />
        </svg>
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg">
            <Dialog.Title className="text-lg font-bold">Edit Task</Dialog.Title>
            <div className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={updatedTask.title}
                onChange={(e) => setUpdatedTask({ ...updatedTask, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={updatedTask.description}
                onChange={(e) => setUpdatedTask({ ...updatedTask, description: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                value={updatedTask.dueDate}
                onChange={(e) => setUpdatedTask({ ...updatedTask, dueDate: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <select
                value={updatedTask.priority}
                onChange={(e) => setUpdatedTask({ ...updatedTask, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
                className="w-full p-2 border rounded"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select
                value={updatedTask.status}
                onChange={(e) => setUpdatedTask({ ...updatedTask, status: e.target.value as 'In Progress' | 'Completed' })}
                className="w-full p-2 border rounded"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}