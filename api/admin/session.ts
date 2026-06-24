import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendJson } from '../_lib/http.js';
import { isAdminConfigured, isAuthenticated } from '../_lib/auth.js';

/** Lets the admin UI check auth state on load. */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  return sendJson(res, 200, {
    authenticated: isAuthenticated(req),
    configured: isAdminConfigured(),
  });
}
