import type { Lead } from '../types.js';

/**
 * A notification channel. To add a new integration (e.g. WhatsApp, a CRM,
 * Slack), implement this interface and register it in `channels` (index.ts).
 *
 * - `isConfigured()` gates the channel: it only runs when its env vars are set,
 *   so unconfigured channels are silently skipped.
 * - `notify()` is best-effort: the dispatcher catches errors, so a failing
 *   channel never blocks the lead from being saved or the API from responding.
 */
export interface NotificationChannel {
  readonly name: string;
  isConfigured(): boolean;
  notify(lead: Lead): Promise<void>;
}
