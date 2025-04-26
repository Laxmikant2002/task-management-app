export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    status: 'In Progress' | 'completed';
}