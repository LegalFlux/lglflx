
/**
 * Represents the current status of a payment
 * @typedef {string} PaymentStatus
 */
export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'partially_paid' | 'cancelled';

/**
 * Represents the method used for payment
 * @typedef {string} PaymentMethod
 */
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'cash' | 'check' | 'online' | 'other';

/**
 * Interface representing an invoice sent to clients
 * @interface Invoice
 */
export interface Invoice {
  /** Unique identifier for the invoice */
  id: string;
  /** Invoice number (often required for legal/accounting purposes) */
  number: string;
  /** ID of the client being billed */
  clientId: string;
  /** ID of the case this invoice is related to (if applicable) */
  caseId?: string;
  /** Date when the invoice was issued */
  issueDate: string;
  /** Date by which payment is expected */
  dueDate: string;
  /** Line items included in the invoice */
  items: {
    /** Description of the service or product */
    description: string;
    /** Number of units */
    quantity: number;
    /** Price per unit */
    unitPrice: number;
    /** Tax rate applied to this item (percentage) */
    taxRate: number;
    /** Total amount for this line item */
    total: number;
  }[];
  /** Sum of all line items before tax */
  subtotal: number;
  /** Total tax amount */
  tax: number;
  /** Final amount including tax */
  total: number;
  /** Current payment status of the invoice */
  status: PaymentStatus;
  /** Method used for payment (if paid) */
  paymentMethod?: PaymentMethod;
  /** Date when payment was received (if paid) */
  paymentDate?: string;
  /** Additional notes about the invoice */
  notes?: string;
}

/**
 * Interface representing an expense incurred by the firm
 * @interface Expense
 */
export interface Expense {
  /** Unique identifier for the expense */
  id: string;
  /** Description of what the expense was for */
  description: string;
  /** Amount spent */
  amount: number;
  /** Date when the expense occurred */
  date: string;
  /** ID of the case this expense is related to (if applicable) */
  caseId?: string;
  /** ID of the client this expense is related to (if applicable) */
  clientId?: string;
  /** Category or type of expense */
  category: string;
  /** Method used to pay for the expense */
  paymentMethod: PaymentMethod;
  /** File path to a receipt or proof of payment */
  receipt?: string;
  /** Whether this expense can be charged back to a client */
  reimbursable: boolean;
  /** Whether this expense has been reimbursed (if applicable) */
  reimbursed?: boolean;
  /** ID of the team member who approved the expense */
  approvedBy?: string;
  /** Date when the expense was approved */
  approvedDate?: string;
  /** Additional notes about the expense */
  notes?: string;
}

/**
 * Interface representing a record of time spent on a case
 * @interface TimeEntry
 */
export interface TimeEntry {
  /** Unique identifier for the time entry */
  id: string;
  /** Description of the work performed */
  description: string;
  /** ID of the case the work was performed for */
  caseId: string;
  /** ID of the team member who performed the work */
  userId: string;
  /** Date when the work was performed */
  date: string;
  /** Time when the work started (if tracking by clock time) */
  startTime?: string;
  /** Time when the work ended (if tracking by clock time) */
  endTime?: string;
  /** Duration of the work in minutes */
  duration: number;
  /** Whether this time can be billed to the client */
  billable: boolean;
  /** Whether this time has been included on an invoice */
  billed: boolean;
  /** ID of the invoice this time was billed on (if billed) */
  invoiceId?: string;
  /** Hourly rate charged for this time */
  rate?: number;
  /** Total amount to bill (duration × rate) */
  amount?: number;
  /** ID of the task this time entry is related to (if applicable) */
  taskId?: string;
  /** Additional notes about the work performed */
  notes?: string;
}
