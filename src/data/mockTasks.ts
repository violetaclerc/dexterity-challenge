import { Task } from '../types/task';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete Project Proposal',
    description: 'Write and submit the project proposal document',
    priority: 'high',
    dueDate: '2024-04-25',
    status: 'incomplete',
    createdAt: '2024-04-23T10:00:00Z'
  },
  {
    id: '2',
    title: 'Review Code Changes',
    description: 'Review pull requests and provide feedback',
    priority: 'medium',
    dueDate: '2024-04-24',
    status: 'complete',
    createdAt: '2024-04-23T09:00:00Z'
  },
  {
    id: '3',
    title: 'Team Meeting',
    description: 'Weekly team sync meeting',
    priority: 'low',
    dueDate: '2024-04-26',
    status: 'incomplete',
    createdAt: '2024-04-23T11:00:00Z'
  }
]; 