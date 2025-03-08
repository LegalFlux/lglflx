
/**
 * Represents the current status of a task
 * @typedef {string} TaskStatus
 */
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'blocked';

/**
 * Import the case priority type since it's reused for tasks
 */
import { CasePriority } from './case';

/**
 * Interface representing a task in the legal management system
 * @interface Task
 */
export interface Task {
  /** Unique identifier for the task */
  id: string;
  /** Short title describing the task */
  title: string;
  /** Detailed description of what the task involves */
  description?: string;
  /** Current status of the task */
  status: TaskStatus;
  /** Priority level of the task */
  priority: CasePriority;
  /** ID of the case this task is associated with (if any) */
  caseId?: string;
  /** ID of the team member assigned to complete this task */
  assignedTo?: string;
  /** ID of the team member who created the task */
  createdBy: string;
  /** Date and time when the task was created */
  createdAt: string;
  /** Deadline for completing the task */
  dueDate?: string;
  /** Date and time when the task was completed (if applicable) */
  completedAt?: string;
  /** Date and time to send a reminder about this task */
  reminderDate?: string;
  /** Estimated time to complete the task (in minutes) */
  estimated_time?: number;
  /** Actual time spent on the task (in minutes) */
  actual_time?: number;
  /** Category or type of task */
  category?: string;
  /** How often the task should recur, if applicable */
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'none';
}
