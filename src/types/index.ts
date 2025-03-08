
export type ClientStatus = 'active' | 'inactive' | 'prospect';
export type CaseStatus = 'open' | 'closed' | 'pending' | 'archived';
export type CaseType = 
  | 'civil' 
  | 'criminal' 
  | 'labor' 
  | 'tax' 
  | 'corporate' 
  | 'administrative'
  | 'family'
  | 'commercial'
  | 'property'
  | 'immigration'
  | 'environmental'
  | 'intellectual_property'
  | 'other';

export type CaseJurisdiction = 
  | 'tribunal_primeira_instancia'
  | 'tribunal_relacao'
  | 'supremo_tribunal_justica'
  | 'tribunal_constitucional'
  | 'tribunal_administrativo'
  | 'tribunal_fiscal'
  | 'julgado_paz'
  | 'tribunal_trabalho'
  | 'tribunal_maritimo'
  | 'tribunal_propriedade_intelectual'
  | 'tribunal_concorrencia'
  | 'tribunal_execucao_penas'
  | 'other';

export type CasePriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'blocked';
export type DocumentType = 
  | 'contract' 
  | 'petition' 
  | 'evidence' 
  | 'court-order' 
  | 'correspondence'
  | 'procuration'
  | 'affidavit'
  | 'complaint'
  | 'expert_report'
  | 'agreement'
  | 'declaration'
  | 'appeal'
  | 'injunction'
  | 'notification'
  | 'other';

export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'partially_paid' | 'cancelled';
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'cash' | 'check' | 'online' | 'other';

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  status: ClientStatus;
  createdAt: string;
  notes?: string;
  avatar?: string;
  type: 'individual' | 'company';
  nif?: string; // Número de Identificação Fiscal
  cc?: string;  // Cartão de Cidadão
  birthDate?: string;
  nationality?: string;
  occupation?: string;
  referralSource?: string;
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
  jurisdiction?: CaseJurisdiction;
  assignedTo?: string[];
  startDate: string;
  dueDate?: string;
  closedDate?: string;
  nextHearing?: string;
  opposing?: {
    name: string;
    lawyer?: string;
    contact?: string;
  };
  documents?: string[];
  tasks?: string[];
  notes?: string;
  value?: number; // Valor do processo
  fees?: number; // Honorários
  expenses?: number; // Despesas
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
  reminderDate?: string;
  estimated_time?: number; // In minutes
  actual_time?: number; // In minutes
  category?: string;
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'none';
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
  description?: string;
  version?: number;
  isTemplate?: boolean;
  isArchived?: boolean;
  expirationDate?: string;
  signatureStatus?: 'unsigned' | 'partially_signed' | 'fully_signed';
  signers?: {
    id: string;
    name: string;
    email: string;
    signedAt?: string;
  }[];
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
  isAllDay?: boolean;
  reminder?: '5min' | '15min' | '30min' | '1hour' | '1day' | 'none';
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'none';
  color?: string;
  status?: 'confirmed' | 'tentative' | 'cancelled';
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'attorney' | 'paralegal' | 'assistant' | 'admin' | 'trainee' | 'partner';
  avatar?: string;
  phone?: string;
  specialties?: string[];
  position?: string;
  department?: string;
  hireDate?: string;
  status: 'active' | 'inactive' | 'on_leave';
  permissions?: string[];
  supervisorId?: string;
  officeLocation?: string;
  billableHourTarget?: number;
  hourlyRate?: number;
}

export interface DashboardMetric {
  id: string;
  title: string;
  value: number | string;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: string;
  period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  target?: number;
  color?: string;
}

export interface Invoice {
  id: string;
  number: string;
  clientId: string;
  caseId?: string;
  issueDate: string;
  dueDate: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    taxRate: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  status: PaymentStatus;
  paymentMethod?: PaymentMethod;
  paymentDate?: string;
  notes?: string;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string;
  caseId?: string;
  clientId?: string;
  category: string;
  paymentMethod: PaymentMethod;
  receipt?: string;
  reimbursable: boolean;
  reimbursed?: boolean;
  approvedBy?: string;
  approvedDate?: string;
  notes?: string;
}

export interface TimeEntry {
  id: string;
  description: string;
  caseId: string;
  userId: string;
  date: string;
  startTime?: string;
  endTime?: string;
  duration: number; // In minutes
  billable: boolean;
  billed: boolean;
  invoiceId?: string;
  rate?: number;
  amount?: number;
  taskId?: string;
  notes?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
  caseId?: string;
  clientId?: string;
  tags?: string[];
  isPrivate: boolean;
}
