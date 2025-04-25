export type Priority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  status: 'complete' | 'incomplete';
  createdAt: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
}

export interface TaskFilters {
  status: 'all' | 'complete' | 'incomplete';
  sortBy: 'dueDate' | 'priority';
  searchQuery: string;
} 