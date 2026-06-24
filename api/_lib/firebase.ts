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

function initApp(): App {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  // Vercel stores multi-line keys with escaped newlines; restore them.
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

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
