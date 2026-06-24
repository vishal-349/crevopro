/** Client-side mirror of the lead API contract (see api/_lib/types.ts). */

export const LEAD_STATUSES = ['new', 'contacted', 'closed'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

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
  createdAt: string; // ISO-8601
}

/** Payload sent by the contact form. */
export interface LeadInput {
  name: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  brandName?: string;
  sourcePage?: string;
  company_website?: string; // honeypot
  formLoadedAt?: number; // time-trap
}

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  closed: 'Closed',
};
