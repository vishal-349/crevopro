import type { VercelRequest, VercelResponse } from '@vercel/node';
import { methodNotAllowed, sendJson } from '../_lib/http.js';
import { isAuthenticated } from '../_lib/auth.js';
import { updateLeadStatus } from '../_lib/leads.js';
import { LEAD_STATUSES, type LeadStatus } from '../_lib/types.js';

/** Admin: update a single lead's status. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'PATCH') {
    return methodNotAllowed(res, ['PATCH']);
  }
  if (!isAuthenticated(req)) {
    return sendJson(res, 401, { error: 'Unauthorized' });
  }

  const id = req.query.id;
  if (typeof id !== 'string' || !id) {
    return sendJson(res, 400, { error: 'Missing lead id.' });
  }

  const status = (req.body as { status?: string } | undefined)?.status;
  if (!status || !LEAD_STATUSES.includes(status as LeadStatus)) {
    return sendJson(res, 400, { error: `Status must be one of: ${LEAD_STATUSES.join(', ')}.` });
  }

  try {
    const updated = await updateLeadStatus(id, status as LeadStatus);
    if (!updated) return sendJson(res, 404, { error: 'Lead not found.' });
    return sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error('[leads] status update failed:', error);
    return sendJson(res, 500, { error: 'Could not update the lead.' });
  }
}
