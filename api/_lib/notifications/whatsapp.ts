import type { Lead } from '../types.js';
import type { NotificationChannel } from './types.js';

/**
 * WhatsApp notification channel (scaffold).
 *
 * Dormant until WHATSAPP_API_URL, WHATSAPP_API_TOKEN and WHATSAPP_TO are set.
 * To enable: fill the env vars and implement the request for your provider
 * (e.g. Meta Cloud API, Twilio, Gupshup). The dispatcher wiring is already done.
 */
export const whatsappChannel: NotificationChannel = {
  name: 'whatsapp',

  isConfigured() {
    return Boolean(
      process.env.WHATSAPP_API_URL && process.env.WHATSAPP_API_TOKEN && process.env.WHATSAPP_TO,
    );
  },

  async notify(lead: Lead) {
    const text =
      `New enquiry from ${lead.name}\n` +
      `Phone: ${lead.phone}\n` +
      `Email: ${lead.email}\n` +
      `Service: ${lead.service}\n` +
      `Message: ${lead.message || '—'}`;

    const response = await fetch(process.env.WHATSAPP_API_URL as string, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.WHATSAPP_API_TOKEN}`,
      },
      body: JSON.stringify({ to: process.env.WHATSAPP_TO, text }),
    });

    if (!response.ok) {
      throw new Error(`WhatsApp provider responded ${response.status}`);
    }
  },
};
