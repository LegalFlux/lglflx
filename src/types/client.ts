
/**
 * Represents the status of a client in the legal system
 * @typedef {string} ClientStatus
 */
export type ClientStatus = 'active' | 'inactive' | 'prospect';

/**
 * Interface representing a client of the law firm
 * @interface Client
 */
export interface Client {
  /** Unique identifier for the client */
  id: string;
  /** Full name of the client */
  name: string;
  /** Email address for contacting the client */
  email: string;
  /** Phone number for contacting the client */
  phone: string;
  /** Physical address of the client */
  address?: string;
  /** City where the client is located */
  city?: string;
  /** Postal code of the client's address */
  postalCode?: string;
  /** Country where the client is located */
  country?: string;
  /** Current status of the client relationship */
  status: ClientStatus;
  /** Date and time when the client was first registered */
  createdAt: string;
  /** Additional information about the client */
  notes?: string;
  /** URL to the client's profile image */
  avatar?: string;
  /** Whether the client is an individual person or a company */
  type: 'individual' | 'company';
  /** Número de Identificação Fiscal (Portuguese tax identification number) */
  nif?: string;
  /** Cartão de Cidadão (Portuguese ID card number) */
  cc?: string;
  /** Client's date of birth (for individuals) */
  birthDate?: string;
  /** Client's nationality */
  nationality?: string;
  /** Client's professional occupation */
  occupation?: string;
  /** How the client found out about the law firm */
  referralSource?: string;
}
