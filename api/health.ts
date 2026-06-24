import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendJson } from './_lib/http.js';
import { getDb, inspectPrivateKey, isFirebaseConfigured } from './_lib/firebase.js';
import { isAdminConfigured, isAuthenticated } from './_lib/auth.js';

/**
 * Operational health check.
 *
 * Public response reports configuration + live Firestore connectivity. The
 * underlying error message and (admin-only) credential shape are included to
 * aid diagnosis; the detailed credential shape is gated behind admin auth so it
 * is never exposed publicly.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const health: {
    ok: boolean;
    commit?: string;
    firebaseConfigured: boolean;
    adminConfigured: boolean;
    firestore: 'ok' | 'error' | 'skipped';
    error?: string;
    code?: string | number;
    privateKey?: Record<string, unknown>;
  } = {
    ok: true,
    commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7),
    firebaseConfigured: isFirebaseConfigured(),
    adminConfigured: isAdminConfigured(),
    firestore: 'skipped',
  };

  if (health.firebaseConfigured) {
    try {
      await getDb().collection('leads').limit(1).get();
      health.firestore = 'ok';
    } catch (error) {
      health.ok = false;
      health.firestore = 'error';
      health.error = error instanceof Error ? error.message : String(error);
      const code = (error as { code?: string | number }).code;
      if (code !== undefined) health.code = code;
      // Detailed credential shape (no secret content) — admins only.
      if (isAuthenticated(req)) {
        health.privateKey = inspectPrivateKey();
      }
    }
  } else {
    health.ok = false;
  }

  return sendJson(res, health.ok ? 200 : 503, health);
}
