import { cert, getApps, initializeApp, type App } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

/**
 * Lazily initialise the Firebase Admin SDK from environment variables.
 *
 * Throws a descriptive error when the required configuration is missing so the
 * calling endpoint can return a clean 503 instead of crashing. The rest of the
 * site is unaffected — only lead persistence depends on this.
 */

let cachedDb: Firestore | null = null;

export class FirebaseNotConfiguredError extends Error {
  constructor(missing: string[]) {
    super(`Firebase is not configured. Missing env vars: ${missing.join(', ')}`);
    this.name = 'FirebaseNotConfiguredError';
  }
}

export function isFirebaseConfigured(): boolean {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY,
  );
}

/**
 * Normalise the service-account private key across the formats it can arrive in:
 *  - real multi-line value (Vercel dashboard paste) — used as-is
 *  - escaped `\n` newlines (CLI / single-line env) — un-escaped
 *  - accidental wrapping single/double quotes — stripped
 * Any of these mangle the PEM and make `cert()` throw, so we guard against all.
 */
function normalizePrivateKey(raw: string): string {
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, '\n');
}

function initApp(): App {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY
    ? normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY)
    : undefined;

  const missing: string[] = [];
  if (!projectId) missing.push('FIREBASE_PROJECT_ID');
  if (!clientEmail) missing.push('FIREBASE_CLIENT_EMAIL');
  if (!privateKey) missing.push('FIREBASE_PRIVATE_KEY');
  if (missing.length > 0) {
    throw new FirebaseNotConfiguredError(missing);
  }

  const existing = getApps()[0];
  if (existing) return existing;

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export function getDb(): Firestore {
  if (cachedDb) return cachedDb;
  cachedDb = getFirestore(initApp());
  return cachedDb;
}

export const LEADS_COLLECTION = 'leads';
