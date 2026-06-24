import type { Lead } from '../types.js';
import type { NotificationChannel } from './types.js';

/**
 * Generic CRM webhook channel (scaffold).
 *
 * Dormant until CRM_WEBHOOK_URL is set. Posts the full lead as JSON to any
 * webhook-capable CRM / automation platform (HubSpot, Zoho, Zapier, Make, n8n…).
 */
export const crmChannel: NotificationChannel = {
  name: 'crm',

  isConfigured() {
    return Boolean(process.env.CRM_WEBHOOK_URL);
  },

  async notify(lead: Lead) {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (process.env.CRM_WEBHOOK_TOKEN) {
      headers.Authorization = `Bearer ${process.env.CRM_WEBHOOK_TOKEN}`;
    }

    const response = await fetch(process.env.CRM_WEBHOOK_URL as string, {
      method: 'POST',
      headers,
      body: JSON.stringify(lead),
    });

    if (!response.ok) {
      throw new Error(`CRM webhook responded ${response.status}`);
    }
  },
};
