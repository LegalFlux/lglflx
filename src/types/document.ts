
/**
 * Represents the type/category of a legal document
 * @typedef {string} DocumentType
 */
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

/**
 * Interface representing a document in the legal management system
 * @interface Document
 */
export interface Document {
  /** Unique identifier for the document */
  id: string;
  /** Filename or title of the document */
  name: string;
  /** Type or category of the document */
  type: DocumentType;
  /** ID of the case this document is associated with (if any) */
  caseId?: string;
  /** ID of the client this document is associated with (if any) */
  clientId?: string;
  /** File path or URI to access the document */
  path: string;
  /** Size of the document in bytes */
  size: number;
  /** ID of the team member who uploaded the document */
  uploadedBy: string;
  /** Date and time when the document was uploaded */
  uploadedAt: string;
  /** Date and time when the document was last modified */
  lastModified?: string;
  /** Array of tags for categorizing the document */
  tags?: string[];
  /** Additional notes about the document */
  description?: string;
  /** Version number of the document (for version control) */
  version?: number;
  /** Whether this document is a template for generating other documents */
  isTemplate?: boolean;
  /** Whether this document has been archived */
  isArchived?: boolean;
  /** Date after which the document is considered expired */
  expirationDate?: string;
  /** Current signature status of the document */
  signatureStatus?: 'unsigned' | 'partially_signed' | 'fully_signed';
  /** Information about people who need to sign the document */
  signers?: {
    /** Unique identifier for the signer */
    id: string;
    /** Name of the signer */
    name: string;
    /** Email address of the signer */
    email: string;
    /** Date and time when the person signed the document (if applicable) */
    signedAt?: string;
  }[];
}
