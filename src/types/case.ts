
/**
 * Represents the current status of a legal case
 * @typedef {string} CaseStatus
 */
export type CaseStatus = 'open' | 'closed' | 'pending' | 'archived';

/**
 * Represents the type/area of law for a case
 * @typedef {string} CaseType
 */
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

/**
 * Represents the jurisdiction in which a case is being handled
 * @typedef {string} CaseJurisdiction
 */
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

/**
 * Represents the priority level of a case
 * @typedef {string} CasePriority
 */
export type CasePriority = 'low' | 'medium' | 'high' | 'urgent';

/**
 * Interface representing a legal case handled by the law firm
 * @interface LegalCase
 */
export interface LegalCase {
  /** Unique identifier for the case */
  id: string;
  /** Title or name of the case */
  title: string;
  /** Official case number in the legal system */
  number?: string;
  /** Identifier of the client associated with this case */
  clientId: string;
  /** Full client object (if populated) */
  client?: any; // This would ideally reference the Client interface
  /** Type or area of law for this case */
  type: CaseType;
  /** Current status of the case */
  status: CaseStatus;
  /** Priority level of the case */
  priority: CasePriority;
  /** Detailed description of the case */
  description?: string;
  /** Court where the case is being heard */
  court?: string;
  /** Name of the judge presiding over the case */
  judge?: string;
  /** Legal jurisdiction handling the case */
  jurisdiction?: CaseJurisdiction;
  /** IDs of team members assigned to the case */
  assignedTo?: string[];
  /** Date when the case was started */
  startDate: string;
  /** Expected completion date for the case */
  dueDate?: string;
  /** Date when the case was closed (if applicable) */
  closedDate?: string;
  /** Date and time of the next scheduled hearing */
  nextHearing?: string;
  /** Information about the opposing party */
  opposing?: {
    /** Name of the opposing party */
    name: string;
    /** Name of the opposing lawyer */
    lawyer?: string;
    /** Contact information for the opposing party */
    contact?: string;
  };
  /** IDs of documents associated with this case */
  documents?: string[];
  /** IDs of tasks associated with this case */
  tasks?: string[];
  /** Additional notes about the case */
  notes?: string;
  /** Monetary value of the case (if applicable) */
  value?: number;
  /** Legal fees associated with the case */
  fees?: number;
  /** Additional expenses incurred for the case */
  expenses?: number;
}
