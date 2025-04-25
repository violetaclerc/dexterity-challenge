import React from 'react';
import { Task, TaskFormData } from '../../types/task';
import styles from '../../styles/TaskForm.module.css';

interface TaskFormProps {
  formData: TaskFormData;
  editingTask: Task | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  formData,
  editingTask,
  onInputChange,
  onSubmit,
  onCancel
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Title</label>
        <input
          type="text"
          name="title"
          className={styles.formInput}
          placeholder="Enter task title"
          value={formData.title}
          onChange={onInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Description</label>
        <textarea
          name="description"
          className={`${styles.formInput} ${styles.formTextarea}`}
          placeholder="Enter task description"
          value={formData.description}
          onChange={onInputChange}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Priority</label>
        <select
          name="priority"
          className={`${styles.formInput} ${styles.formSelect}`}
          value={formData.priority}
          onChange={onInputChange}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Due Date</label>
        <input
          type="date"
          name="dueDate"
          className={styles.formInput}
          value={formData.dueDate}
          onChange={onInputChange}
          required
        />
      </div>
      <div className={styles.formActions}>
        <button type="submit" className={`${styles.button} ${styles.buttonPrimary}`}>
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        <button
          type="button"
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm; 