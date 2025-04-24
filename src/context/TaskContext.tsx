import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';
import { Task, TaskFilters, TaskFormData } from '../types/task';
import { mockTasks } from '../data/mockTasks';

interface TaskState {
  tasks: Task[];
  filters: TaskFilters;
}

type TaskAction =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_STATUS'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<TaskFilters> }
  | { type: 'LOAD_TASKS'; payload: Task[] };

// Load tasks from localStorage or use mockTasks if none exist
const loadSavedTasks = (): Task[] => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : mockTasks;
};

const initialState: TaskState = {
  tasks: loadSavedTasks(),
  filters: {
    status: 'all',
    sortBy: 'dueDate',
    searchQuery: ''
  }
};

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  let newState: TaskState;

  switch (action.type) {
    case 'ADD_TASK':
      newState = {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
      break;

    case 'UPDATE_TASK':
      newState = {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
      break;

    case 'DELETE_TASK':
      newState = {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
      break;

    case 'TOGGLE_STATUS':
      newState = {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { ...task, status: task.status === 'complete' ? 'incomplete' : 'complete' }
            : task
        )
      };
      break;

    case 'SET_FILTERS':
      newState = {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };
      break;

    case 'LOAD_TASKS':
      newState = {
        ...state,
        tasks: action.payload
      };
      break;

    default:
      return state;
  }

  // Save tasks to localStorage whenever they change
  localStorage.setItem('tasks', JSON.stringify(newState.tasks));
  return newState;
};

interface TaskContextType {
  state: TaskState;
  addTask: (taskData: TaskFormData) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  toggleStatus: (id: string) => void;
  setFilters: (filters: Partial<TaskFilters>) => void;
  getFilteredTasks: () => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = loadSavedTasks();
    dispatch({ type: 'LOAD_TASKS', payload: savedTasks });
  }, []);

  const addTask = (taskData: TaskFormData) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      status: 'incomplete',
      createdAt: new Date().toISOString()
    };
    dispatch({ type: 'ADD_TASK', payload: newTask });
  };

  const updateTask = (task: Task) => {
    dispatch({ type: 'UPDATE_TASK', payload: task });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const toggleStatus = (id: string) => {
    dispatch({ type: 'TOGGLE_STATUS', payload: id });
  };

  const setFilters = (filters: Partial<TaskFilters>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const getFilteredTasks = () => {
    let filteredTasks = [...state.tasks];

    // Apply status filter
    if (state.filters.status !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.status === state.filters.status);
    }

    // Apply search filter
    if (state.filters.searchQuery) {
      const query = state.filters.searchQuery.toLowerCase();
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filteredTasks.sort((a, b) => {
      if (state.filters.sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
    });

    return filteredTasks;
  };

  return (
    <TaskContext.Provider
      value={{
        state,
        addTask,
        updateTask,
        deleteTask,
        toggleStatus,
        setFilters,
        getFilteredTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};