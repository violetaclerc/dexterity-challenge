import React from 'react';
import { Task } from '../../types/task';
import styles from '../../styles/TaskCard.module.css';

interface TaskCardProps {
  task: Task;
  onToggleStatus: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onToggleStatus, onEdit, onDelete }) => {
  return (
    <div className={`${styles.taskCard} ${task.status === 'complete' ? styles.complete : ''}`}>
      <div className={styles.taskInformation}>
        <div className={styles.taskHeader}>
          <h3 className={styles.taskTitle}>{task.title}</h3>
          <span className={`${styles.priority} ${styles[`priority${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}`]}`}>
            {task.priority}
          </span>
        </div>
        <p className={styles.taskDescription}>{task.description}</p>
        <span className={styles.dueDate}>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
      </div>
      <div className={styles.taskActions}>
        <button
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={() => onEdit(task)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.buttonIcon}
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          {/* Edit */}
        </button>
        <button
          className={`${styles.button} ${styles.buttonDanger}`}
          onClick={() => onDelete(task.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.buttonIcon}
          >
            <path d="M3 6h18" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
          {/* Delete */}
        </button>
        <button
          className={`${styles.button} ${styles.buttonSecondary}`}
          onClick={() => onToggleStatus(task.id)}
        >
          <div className={styles.buttonComplete}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.buttonIcon}
            >
              {task.status === 'complete' ? (
                <polyline points="18 7 10 15 6 11" />
              ) : (
                <polyline points="18 7 10 15 6 11" />
              )}
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TaskCard; 