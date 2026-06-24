import type { VercelRequest, VercelResponse } from '@vercel/node';
import { sendJson } from './_lib/http.js';
import { getDb, inspectPrivateKey, isFirebaseConfigured } from './_lib/firebase.js';
import { isAdminConfigured } from './_lib/auth.js';

/**
 * Operational health check. Reports whether Firebase + admin are configured and
 * whether a live Firestore read succeeds. On failure it returns the underlying
 * error message/code (operational info, not secrets) to aid diagnosis.
 */
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const health: {
    ok: boolean;
    firebaseConfigured: boolean;
    adminConfigured: boolean;
    firestore: 'ok' | 'error' | 'skipped';
    error?: string;
    code?: string | number;
  } = {
    ok: true,
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
      // Structural key diagnostics (no secret content) to pinpoint format issues.
      (health as Record<string, unknown>).privateKey = inspectPrivateKey();
    }
  } else {
    health.ok = false;
  }

  return sendJson(res, health.ok ? 200 : 503, health);
}
