
/**
 * Interface representing a note in the legal management system
 * @interface Note
 */
export interface Note {
  /** Unique identifier for the note */
  id: string;
  /** Title or subject of the note */
  title: string;
  /** Main text content of the note */
  content: string;
  /** ID of the team member who created the note */
  createdBy: string;
  /** Date and time when the note was created */
  createdAt: string;
  /** Date and time when the note was last modified */
  updatedAt?: string;
  /** ID of the case this note is associated with (if any) */
  caseId?: string;
  /** ID of the client this note is associated with (if any) */
  clientId?: string;
  /** Array of tags for categorizing the note */
  tags?: string[];
  /** Whether this note is visible only to the creator or to all team members */
  isPrivate: boolean;
}
