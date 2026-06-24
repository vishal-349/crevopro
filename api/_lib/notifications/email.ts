import { Resend } from 'resend';
import type { Lead } from '../types.js';
import type { NotificationChannel } from './types.js';

/**
 * Email notifications via Resend. Entirely optional: if RESEND_API_KEY or
 * ADMIN_EMAIL is unset, the channel reports itself as unconfigured and is
 * skipped — leads are still saved and the form still works.
 *
 * ADMIN_EMAIL may be a comma-separated list to notify multiple recipients.
 */

function getRecipients(): string[] {
  return (process.env.ADMIN_EMAIL ?? '')
    .split(',')
    .map((e) => e.trim())
    .filter(Boolean);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderHtml(lead: Lead): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;font-weight:600">${label}</td><td style="padding:4px 0">${escapeHtml(value || '—')}</td></tr>`;
  return `
    <div style="font-family:Arial,sans-serif;color:#111">
      <h2 style="margin:0 0 12px">New enquiry from ${escapeHtml(lead.name)}</h2>
      <table style="border-collapse:collapse">
        ${row('Name', lead.name)}
        ${row('Email', lead.email)}
        ${row('Phone', lead.phone)}
        ${row('Brand', lead.brandName)}
        ${row('Service', lead.service)}
        ${row('Message', lead.message)}
        ${row('Source page', lead.sourcePage)}
        ${row('Received', lead.createdAt)}
      </table>
    </div>`;
}

export const emailChannel: NotificationChannel = {
  name: 'email',

  isConfigured() {
    return Boolean(process.env.RESEND_API_KEY) && getRecipients().length > 0;
  },

  async notify(lead: Lead) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const from = process.env.EMAIL_FROM ?? 'CrevoPro <onboarding@resend.dev>';
    const { error } = await resend.emails.send({
      from,
      to: getRecipients(),
      replyTo: lead.email,
      subject: `New enquiry from ${lead.name}`,
      html: renderHtml(lead),
    });
    if (error) {
      throw new Error(`Resend error: ${error.message}`);
    }
  },
};
