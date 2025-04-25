import React, { useState } from 'react';
import { useTaskContext } from '../../context/TaskContext';
import { Task, TaskFormData } from '../../types/task';
import styles from '../../styles/TaskManager.module.css';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';
import Modal from './Modal';

const TaskManager: React.FC = () => {
  const { state, addTask, updateTask, deleteTask, toggleStatus, setFilters, getFilteredTasks } = useTaskContext();
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState<'todo' | 'completed'>('todo');
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTask) {
      updateTask({ ...editingTask, ...formData });
      setEditingTask(null);
    } else {
      addTask(formData);
    }
    setFormData({ title: '', description: '', priority: 'medium', dueDate: '' });
    setIsAddingTask(false);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate
    });
    setIsAddingTask(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
    }
  };

  const handleCancel = () => {
    setIsAddingTask(false);
    setEditingTask(null);
    setFormData({ title: '', description: '', priority: 'medium', dueDate: '' });
  };

  const filteredTasks = getFilteredTasks();
  const completedTasks = filteredTasks.filter(task => task.status === 'complete');
  const incompleteTasks = filteredTasks.filter(task => task.status === 'incomplete');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Task Manager</h1>
        <button
          className={styles.addButton}
          onClick={() => setIsAddingTask(true)}
        >
          + Add New Task
        </button>
      </div>

      <div className={styles.filters}>
        <select
          className={styles.select}
          value={state.filters.sortBy}
          onChange={(e) => setFilters({ sortBy: e.target.value as 'dueDate' | 'priority' })}
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
        </select>

        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search tasks..."
          value={state.filters.searchQuery}
          onChange={(e) => setFilters({ searchQuery: e.target.value })}
        />
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'todo' ? styles.active : ''}`}
          onClick={() => setActiveTab('todo')}
        >
          To Do ({incompleteTasks.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'completed' ? styles.active : ''}`}
          onClick={() => setActiveTab('completed')}
        >
          Completed ({completedTasks.length})
        </button>
      </div>

      <div className={styles.columnsContainer}>
        <div className={`${styles.column} ${activeTab === 'todo' ? styles.active : ''}`}>
          <h2 className={styles.columnTitle}>
            To Do <span className={styles.taskCount}>{incompleteTasks.length}</span>
          </h2>
          <div className={styles.taskGrid}>
            {incompleteTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleStatus={toggleStatus}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>

        <div className={`${styles.column} ${activeTab === 'completed' ? styles.active : ''}`}>
          <h2 className={styles.columnTitle}>
            Completed <span className={styles.taskCount}>{completedTasks.length}</span>
          </h2>
          <div className={styles.taskGrid}>
            {completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleStatus={toggleStatus}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isAddingTask}
        onClose={handleCancel}
        title={editingTask ? 'Edit Task' : 'Add New Task'}
      >
        <TaskForm
          formData={formData}
          editingTask={editingTask}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Modal>
    </div>
  );
};

export default TaskManager;