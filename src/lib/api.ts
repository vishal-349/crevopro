import type { Lead, LeadInput, LeadStatus } from '@/types/lead';

/** Typed client for the lead/admin serverless API (same-origin). */

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json' },
    ...init,
  });

  let body: unknown = null;
  const text = await response.text();
  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = null;
    }
  }

  if (!response.ok) {
    const message =
      (body as { error?: string } | null)?.error ?? `Request failed (${response.status}).`;
    throw new ApiError(response.status, message);
  }
  return body as T;
}

export { ApiError };

export function submitLead(input: LeadInput): Promise<{ ok: true; id?: string }> {
  return request('/api/leads', { method: 'POST', body: JSON.stringify(input) });
}

export function getSession(): Promise<{ authenticated: boolean; configured: boolean }> {
  return request('/api/admin/session');
}

export function adminLogin(password: string): Promise<{ ok: true }> {
  return request('/api/admin/login', { method: 'POST', body: JSON.stringify({ password }) });
}

export function adminLogout(): Promise<{ ok: true }> {
  return request('/api/admin/logout', { method: 'POST' });
}

export function listLeads(): Promise<{ leads: Lead[] }> {
  return request('/api/leads');
}

export function updateLeadStatus(id: string, status: LeadStatus): Promise<{ ok: true }> {
  return request(`/api/leads/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function deleteLead(id: string): Promise<{ ok: true }> {
  return request(`/api/leads/${encodeURIComponent(id)}`, { method: 'DELETE' });
}

/** URL the browser can navigate to for a CSV download (sends the auth cookie). */
export const LEADS_CSV_URL = '/api/leads?format=csv';
