'use client';

import { useState, useContext, createContext } from 'react';
import { Task } from '../types';
import TaskTable from '../components/TaskTable';
import AddTaskModal from '../components/AddTaskModal';

const TaskContext = createContext<{
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}>({ tasks: [], setTasks: () => {} });

export default function TaskManagementApp() {
  const initialTasks: Task[] = [
    { id: 1, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut labore et dolore magna', dueDate: '2024-09-12', status: 'Completed', priority: 'Medium' },
    { id: 2, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut labore et dolore magna', dueDate: '2024-09-15', status: 'In Progress', priority: 'High' },
    { id: 3, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut labore et dolore', dueDate: '2024-09-17', status: 'In Progress', priority: 'Medium' },
    { id: 4, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut labore et', dueDate: '2024-09-18', status: 'Completed', priority: 'Low' },
    { id: 5, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut labore et dolore magna', dueDate: '2024-09-20', status: 'Completed', priority: 'Low' },
    { id: 6, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor', dueDate: '2024-09-25', status: 'Completed', priority: 'High' },
    { id: 7, title: 'Lorem ipsum', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut', dueDate: '2024-09-27', status: 'In Progress', priority: 'High' },
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>('');
  const lasciato [filterStatus, setFilterStatus] = useState<string>('');

  const filteredTasks = tasks
    .filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(task => !filterPriority || task.priority === filterPriority)
    .filter(task => !filterStatus || task.status === filterStatus)
    .sort((a, b) => sortOrder === 'asc' ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime() : 
      sortOrder === 'desc' ? new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime() : 0);

  return (
    <TaskContext.Provider value={{ tasks: filteredTasks, setTasks }}>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Tasks</h1>
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-lg w-1/3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <div className="flex space-x-4">
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center"
            >
              Sort by Date
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 10l5 5 5-5" />
              </svg>
            </button>
            <select
              onChange={(e) => setFilterPriority(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Filter by Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Filter by Status</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <AddTaskModal />
          </div>
        </div>
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No task found</p>
        ) : (
          <TaskTable />
        )}
      </div>
    </TaskContext.Provider>
  );
}