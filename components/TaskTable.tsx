'use client';

import { useContext } from 'react';
import { TaskContext } from '../app/page';
import EditTaskModal from './EditTaskModal';

export default function TaskTable() {
  const { tasks, setTasks } = useContext(TaskContext);

  const deleteTask = (id: number) => setTasks(prev => prev.filter(task => task.id !== id));

  return (
    <table className="w-full border-collapse rounded-lg overflow-hidden">
      <thead>
        <tr className="bg-gray-200 text-left">
          <th className="border p-3">SL.No</th>
          <th className="border p-3">Title</th>
          <th className="border p-3">Description</th>
          <th className="border p-3">Due Date</th>
          <th className="border p-3">Status</th>
          <th className="border p-3">Priority</th>
          <th className="border p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr key={task.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
            <td className="border p-3">{index + 1}</td>
            <td className="border p-3">{task.title}</td>
            <td className="border p-3">{task.description}</td>
            <td className="border p-3">{new Date(task.dueDate).toLocaleDateString()}</td>
            <td className="border p-3">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                task.status === 'Completed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
              }`}>
                {task.status}
              </span>
            </td>
            <td className="border p-3">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                task.priority === 'High' ? 'bg-red-200 text-red-800' :
                task.priority === 'Medium' ? 'bg-orange-200 text-orange-800' : 'bg-blue-200 text-blue-800'
              }`}>
                {task.priority}
              </span>
            </td>
            <td className="border p-3 flex space-x-2">
              <EditTaskModal task={task} />
              <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}