import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getClientIp, methodNotAllowed, sendJson } from '../_lib/http.js';
import { isFirebaseConfigured } from '../_lib/firebase.js';
import { validateLead } from '../_lib/validation.js';
import { isRateLimited } from '../_lib/rateLimit.js';
import { createLead, leadsToCsv, listLeads } from '../_lib/leads.js';
import { dispatchLeadNotifications } from '../_lib/notifications/index.js';
import { isAuthenticated } from '../_lib/auth.js';
import type { LeadInput } from '../_lib/types.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'POST') return handleCreate(req, res);
  if (req.method === 'GET') return handleList(req, res);
  return methodNotAllowed(res, ['POST', 'GET']);
}

/** Public: create a lead from the contact form. */
async function handleCreate(req: VercelRequest, res: VercelResponse) {
  if (!isFirebaseConfigured()) {
    return sendJson(res, 503, { error: 'Lead storage is not configured. Please try again later.' });
  }

  const validation = validateLead((req.body ?? {}) as LeadInput);

  // Silently accept spam so bots get no signal, but never store it.
  if (validation.kind === 'spam') {
    return sendJson(res, 200, { ok: true });
  }
  if (validation.kind === 'invalid') {
    return sendJson(res, 400, { error: validation.error });
  }

  if (await isRateLimited(getClientIp(req))) {
    return sendJson(res, 429, { error: 'Too many requests. Please try again later.' });
  }

  try {
    const lead = await createLead(validation.data);
    // Notifications are best-effort and must not affect the response.
    await dispatchLeadNotifications(lead);
    return sendJson(res, 201, { ok: true, id: lead.id });
  } catch (error) {
    console.error('[leads] create failed:', error);
    return sendJson(res, 500, { error: 'Could not submit your enquiry. Please try again.' });
  }
}

/** Admin: list leads as JSON, or CSV when `?format=csv`. */
async function handleList(req: VercelRequest, res: VercelResponse) {
  if (!isAuthenticated(req)) {
    return sendJson(res, 401, { error: 'Unauthorized' });
  }

  try {
    const leads = await listLeads();
    if (req.query.format === 'csv') {
      const filename = `crevopro-leads-${new Date().toISOString().slice(0, 10)}.csv`;
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      return res.status(200).send(leadsToCsv(leads));
    }
    return sendJson(res, 200, { leads });
  } catch (error) {
    console.error('[leads] list failed:', error);
    return sendJson(res, 500, { error: 'Could not load leads.' });
  }
}
