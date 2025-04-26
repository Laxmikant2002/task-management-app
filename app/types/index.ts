export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'In Progress' | 'Completed';

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: Priority;
  status: Status;
} 