
/**
 * Interface representing a calendar event in the legal management system
 * @interface CalendarEvent
 */
export interface CalendarEvent {
  /** Unique identifier for the event */
  id: string;
  /** Title or name of the event */
  title: string;
  /** Detailed description of the event */
  description?: string;
  /** Start date and time of the event (ISO format) */
  start: string;
  /** End date and time of the event (ISO format) */
  end: string;
  /** Physical location where the event will take place */
  location?: string;
  /** ID of the case associated with this event (if any) */
  caseId?: string;
  /** ID of the client associated with this event (if any) */
  clientId?: string;
  /** IDs of team members who should attend this event */
  attendees?: string[];
  /** Type or category of the event */
  type: 'hearing' | 'meeting' | 'deadline' | 'task' | 'other';
  /** Whether the event lasts the entire day */
  isAllDay?: boolean;
  /** When to send a reminder about this event */
  reminder?: '5min' | '15min' | '30min' | '1hour' | '1day' | 'none';
  /** How often the event recurs, if applicable */
  recurrence?: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'none';
  /** Display color for the event on the calendar */
  color?: string;
  /** Current confirmation status of the event */
  status?: 'confirmed' | 'tentative' | 'cancelled';
}
