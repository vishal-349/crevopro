import type { Lead } from '../types.js';
import type { NotificationChannel } from './types.js';
import { emailChannel } from './email.js';
import { whatsappChannel } from './whatsapp.js';
import { crmChannel } from './crm.js';

export type { NotificationChannel } from './types.js';

/**
 * Registered notification channels. Add a new integration by implementing
 * `NotificationChannel` and appending it here — nothing else changes.
 */
const channels: NotificationChannel[] = [emailChannel, whatsappChannel, crmChannel];

export interface DispatchResult {
  attempted: string[];
  failed: { channel: string; error: string }[];
}

/**
 * Fan a new lead out to every configured channel. Best-effort: each channel is
 * isolated, failures are collected and logged, and this never throws — so a
 * failing or unconfigured notifier can never block lead persistence or the API
 * response.
 */
export async function dispatchLeadNotifications(lead: Lead): Promise<DispatchResult> {
  const active = channels.filter((channel) => {
    try {
      return channel.isConfigured();
    } catch {
      return false;
    }
  });

  const settled = await Promise.allSettled(active.map((channel) => channel.notify(lead)));

  const failed: DispatchResult['failed'] = [];
  settled.forEach((result, index) => {
    if (result.status === 'rejected') {
      const error = result.reason instanceof Error ? result.reason.message : String(result.reason);
      failed.push({ channel: active[index].name, error });
      console.error(`[notifications] ${active[index].name} failed:`, error);
    }
  });

  return { attempted: active.map((c) => c.name), failed };
}
