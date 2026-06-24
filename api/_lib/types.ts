/** Canonical lead types shared across the serverless API. */

export const LEAD_STATUSES = ['new', 'contacted', 'closed'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

/** Raw payload accepted from the public contact form. */
export interface LeadInput {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  brandName?: string;
  sourcePage?: string;
  /** Honeypot field — must be empty for genuine submissions. */
  company_website?: string;
  /** Client timestamp (ms) of when the form was rendered — used for the time-trap. */
  formLoadedAt?: number;
}

/** A persisted lead document. */
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  brandName: string;
  sourcePage: string;
  status: LeadStatus;
  createdAt: string; // ISO-8601 string in API responses
}
