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
export function normalizePrivateKey(raw: string): string {
  let key = raw.trim();
  if (
    (key.startsWith('"') && key.endsWith('"')) ||
    (key.startsWith("'") && key.endsWith("'"))
  ) {
    key = key.slice(1, -1);
  }
  return key.replace(/\\n/g, '\n');
}

/** Safe structural description of the private key (no secret content) for diagnostics. */
export function inspectPrivateKey(): Record<string, unknown> {
  const raw = process.env.FIREBASE_PRIVATE_KEY;
  if (!raw) return { present: false };
  const normalized = normalizePrivateKey(raw);
  return {
    present: true,
    rawLength: raw.length,
    hadWrappingQuotes:
      (raw.trim().startsWith('"') && raw.trim().endsWith('"')) ||
      (raw.trim().startsWith("'") && raw.trim().endsWith("'")),
    hasEscapedNewlines: raw.includes('\\n'),
    hasRealNewlines: raw.includes('\n'),
    normalizedLineCount: normalized.split('\n').length,
    startsWithBeginMarker: normalized.startsWith('-----BEGIN'),
    endsWithEndMarker: normalized.trimEnd().endsWith('-----'),
    head: normalized.slice(0, 27),
  };
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

  // Catch the most common misconfiguration with an actionable message: the
  // value must be the `private_key` PEM block, not `private_key_id`.
  if (privateKey && !privateKey.includes('-----BEGIN')) {
    throw new Error(
      "FIREBASE_PRIVATE_KEY is not a valid PEM. Copy the 'private_key' field from the " +
        "service-account JSON (the long '-----BEGIN PRIVATE KEY-----…-----END PRIVATE KEY-----' " +
        "block) — not 'private_key_id'.",
    );
  }

  const existing = getApps()[0];
  if (existing) return existing;

  return initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });
}

export function getDb(): Firestore {
  if (cachedDb) return cachedDb;
  const db = getFirestore(initApp());
  // Use the REST transport instead of gRPC: it avoids the gRPC channel
  // handshake on cold serverless invocations, materially cutting first-request
  // latency. Must be set once, before the first Firestore operation.
  db.settings({ preferRest: true });
  cachedDb = db;
  return db;
}

export const LEADS_COLLECTION = 'leads';
