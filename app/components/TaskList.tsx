'use client';

import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="card mb-6">
        <h1 className="text-3xl font-bold mb-6 text-primary">Task Manager</h1>
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="Add a new task..."
            className="input"
          />
          <button onClick={addTask} className="btn btn-primary">
            Add Task
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map(task => (
          <div key={task.id} className="card flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className={`text-lg ${task.completed ? 'line-through text-gray-500' : 'text-primary'}`}>
                {task.title}
              </span>
            </div>
            <button
              onClick={() => deleteTask(task.id)}
              className="btn btn-secondary"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 