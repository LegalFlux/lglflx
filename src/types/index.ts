
export type ClientStatus = 'active' | 'inactive' | 'prospect';
export type CaseStatus = 'open' | 'closed' | 'pending' | 'archived';
export type CaseType = 'civil' | 'criminal' | 'labor' | 'tax' | 'corporate' | 'other';
export type CasePriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'blocked';
export type DocumentType = 'contract' | 'petition' | 'evidence' | 'court-order' | 'correspondence' | 'other';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  status: ClientStatus;
  createdAt: string;
  notes?: string;
  avatar?: string;
  type: 'individual' | 'company';
}

export interface LegalCase {
  id: string;
  title: string;
  number?: string;
  clientId: string;
  client?: Client;
  type: CaseType;
  status: CaseStatus;
  priority: CasePriority;
  description?: string;
  court?: string;
  judge?: string;
  assignedTo?: string[];
  startDate: string;
  dueDate?: string;
  closedDate?: string;
  nextHearing?: string;
  documents?: string[];
  tasks?: string[];
  notes?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: CasePriority;
  caseId?: string;
  assignedTo?: string;
  createdBy: string;
  createdAt: string;
  dueDate?: string;
  completedAt?: string;
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  caseId?: string;
  clientId?: string;
  path: string;
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  lastModified?: string;
  tags?: string[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: string;
  end: string;
  location?: string;
  caseId?: string;
  clientId?: string;
  attendees?: string[];
  type: 'hearing' | 'meeting' | 'deadline' | 'task' | 'other';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'attorney' | 'paralegal' | 'assistant' | 'admin';
  avatar?: string;
  phone?: string;
  specialties?: string[];
}

export interface DashboardMetric {
  id: string;
  title: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
}
