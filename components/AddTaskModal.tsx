'use client';

import { useState, useContext } from 'react';
import { Dialog } from '@headlessui/react';
import { TaskContext } from '../app/page';
import { Task } from '../types';

export default function AddTaskModal() {
  const { setTasks } = useContext(TaskContext);
  const [isOpen, setIsOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Low',
    status: 'In Progress',
  });

  const handleSubmit = () => {
    if (newTask.title && newTask.dueDate) {
      setTasks(prev => [...prev, { ...newTask, id: Date.now() } as Task]);
      setIsOpen(false);
      setNewTask({ title: '', description: '', dueDate: '', priority: 'Low', status: 'In Progress' });
    }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        Add Task
      </button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md bg-white p-6 rounded-lg">
            <Dialog.Title className="text-lg font-bold">Add New Task</Dialog.Title>
            <div className="mt-4 space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <textarea
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="w-full p-2 border rounded"
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'High' | 'Medium' | 'Low' })}
                className="w-full p-2 border rounded"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value as 'In Progress' | 'Completed' })}
                className="w-full p-2 border rounded"
              >
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={handleSubmit} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Add Task</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}