import type { VercelRequest, VercelResponse } from '@vercel/node';
import { methodNotAllowed, sendJson } from '../_lib/http.js';
import { isAdminConfigured, setSessionCookie, verifyPassword } from '../_lib/auth.js';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return methodNotAllowed(res, ['POST']);
  }
  if (!isAdminConfigured()) {
    return sendJson(res, 503, {
      error: 'Admin panel is not configured (ADMIN_PASSWORD / SESSION_SECRET).',
    });
  }

  const password = (req.body as { password?: string } | undefined)?.password ?? '';
  if (!verifyPassword(password)) {
    return sendJson(res, 401, { error: 'Incorrect password.' });
  }

  setSessionCookie(res);
  return sendJson(res, 200, { ok: true });
}
