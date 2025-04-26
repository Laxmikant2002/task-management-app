'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Task, Priority, Status } from '../types';

type SortField = 'dueDate' | 'priority' | 'title' | 'status';
type SortOrder = 'asc' | 'desc' | null;

interface SortConfig {
  field: SortField;
  order: SortOrder;
}

interface FilterConfig {
  priority: Priority | '';
  status: Status | '';
  dateRange: {
    start: string | null;
    end: string | null;
  };
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id'>) => void;
  editTask: (id: number, task: Partial<Task>) => void;
  deleteTask: (id: number) => void;
  searchTasks: (query: string) => void;
  sortTasks: (field: SortField, order: SortOrder) => void;
  filterTasks: (filters: Partial<FilterConfig>) => void;
  filteredTasks: Task[];
  currentSort: SortConfig;
  currentFilters: FilterConfig;
  clearFilters: () => void;
  searchQuery: string;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Complete Project Proposal",
    description: "Draft and finalize the project proposal for the new client management system, including timeline and resource requirements.",
    dueDate: "2024-04-15",
    priority: "High",
    status: "In Progress"
  },
  {
    id: 2,
    title: "Review Code Changes",
    description: "Review and provide feedback on the pull requests for the authentication module implementation.",
    dueDate: "2024-04-12",
    priority: "Medium",
    status: "Completed"
  },
  {
    id: 3,
    title: "Update Documentation",
    description: "Update the API documentation with new endpoints and response formats for the latest release.",
    dueDate: "2024-04-18",
    priority: "Low",
    status: "In Progress"
  },
  {
    id: 4,
    title: "Team Meeting Preparation",
    description: "Prepare agenda and presentation slides for the upcoming sprint planning meeting with stakeholders.",
    dueDate: "2024-04-10",
    priority: "High",
    status: "Completed"
  },
  {
    id: 5,
    title: "Bug Fixes for Release",
    description: "Address critical bugs reported in the issue tracker before the next production deployment.",
    dueDate: "2024-04-20",
    priority: "Medium",
    status: "In Progress"
  }
];

const initialSortConfig: SortConfig = {
  field: 'dueDate',
  order: null,
};

const initialFilterConfig: FilterConfig = {
  priority: '',
  status: '',
  dateRange: {
    start: null,
    end: null,
  },
};

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(initialTasks);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentSort, setCurrentSort] = useState<SortConfig>(initialSortConfig);
  const [currentFilters, setCurrentFilters] = useState<FilterConfig>(initialFilterConfig);

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: Date.now() };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const editTask = (id: number, updatedTask: Partial<Task>) => {
    setTasks(prevTasks =>
      prevTasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task))
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const searchTasks = (query: string) => {
    setSearchQuery(query);
  };

  const sortTasks = (field: SortField, order: SortOrder) => {
    setCurrentSort({ field, order });
  };

  const filterTasks = (filters: Partial<FilterConfig>) => {
    setCurrentFilters(prev => ({
      ...prev,
      ...filters,
    }));
  };

  const clearFilters = () => {
    setCurrentFilters(initialFilterConfig);
    setSearchQuery('');
    setCurrentSort(initialSortConfig);
  };

  const getPriorityWeight = (priority: Priority): number => {
    const weights: Record<Priority, number> = {
      'High': 3,
      'Medium': 2,
      'Low': 1,
    };
    return weights[priority];
  };

  useEffect(() => {
    let result = [...tasks];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    // Apply filters
    if (currentFilters.priority) {
      result = result.filter(task => task.priority === currentFilters.priority);
    }

    if (currentFilters.status) {
      result = result.filter(task => task.status === currentFilters.status);
    }

    if (currentFilters.dateRange.start) {
      result = result.filter(task => 
        new Date(task.dueDate) >= new Date(currentFilters.dateRange.start!)
      );
    }

    if (currentFilters.dateRange.end) {
      result = result.filter(task => 
        new Date(task.dueDate) <= new Date(currentFilters.dateRange.end!)
      );
    }

    // Apply sorting
    if (currentSort.order) {
      result.sort((a, b) => {
        let comparison = 0;
        
        switch (currentSort.field) {
          case 'dueDate':
            comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            break;
          case 'priority':
            comparison = getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
            break;
          case 'title':
            comparison = a.title.localeCompare(b.title);
            break;
          case 'status':
            comparison = a.status.localeCompare(b.status);
            break;
        }
        
        return currentSort.order === 'asc' ? comparison : -comparison;
      });
    }

    setFilteredTasks(result);
  }, [tasks, searchQuery, currentSort, currentFilters]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        editTask,
        deleteTask,
        searchTasks,
        sortTasks,
        filterTasks,
        filteredTasks,
        currentSort,
        currentFilters,
        clearFilters,
        searchQuery,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
} 