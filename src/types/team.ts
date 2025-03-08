
/**
 * Interface representing a team member in the legal firm
 * @interface TeamMember
 */
export interface TeamMember {
  /** Unique identifier for the team member */
  id: string;
  /** Full name of the team member */
  name: string;
  /** Email address of the team member */
  email: string;
  /** Professional role within the firm */
  role: 'attorney' | 'paralegal' | 'assistant' | 'admin' | 'trainee' | 'partner';
  /** URL to the team member's profile image */
  avatar?: string;
  /** Phone number of the team member */
  phone?: string;
  /** Areas of law in which the team member specializes */
  specialties?: string[];
  /** Job title or position within the firm */
  position?: string;
  /** Department or practice area */
  department?: string;
  /** Date when the team member was hired */
  hireDate?: string;
  /** Current employment status */
  status: 'active' | 'inactive' | 'on_leave';
  /** Access permissions within the system */
  permissions?: string[];
  /** ID of the team member's supervisor */
  supervisorId?: string;
  /** Physical office location */
  officeLocation?: string;
  /** Target number of billable hours (e.g., monthly or annual) */
  billableHourTarget?: number;
  /** Standard billing rate per hour */
  hourlyRate?: number;
}
