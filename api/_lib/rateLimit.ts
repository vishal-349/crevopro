import { FieldValue } from 'firebase-admin/firestore';
import { getDb } from './firebase.js';

/**
 * Lightweight per-IP rate limit backed by Firestore (serverless-safe, free-tier
 * friendly). Fails OPEN: if the check itself errors, the submission is allowed,
 * so infrastructure hiccups never block genuine users.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_PER_WINDOW = 5;
const COLLECTION = 'rateLimits';

export async function isRateLimited(ip: string): Promise<boolean> {
  if (!ip || ip === 'unknown') return false;
  try {
    const ref = getDb().collection(COLLECTION).doc(encodeURIComponent(ip));
    const now = Date.now();

    return await getDb().runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const data = snap.data() as { count?: number; windowStart?: number } | undefined;

      if (!data || now - (data.windowStart ?? 0) > WINDOW_MS) {
        tx.set(ref, { count: 1, windowStart: now, updatedAt: FieldValue.serverTimestamp() });
        return false;
      }

      if ((data.count ?? 0) >= MAX_PER_WINDOW) {
        return true;
      }

      tx.update(ref, { count: FieldValue.increment(1), updatedAt: FieldValue.serverTimestamp() });
      return false;
    });
  } catch {
    return false; // fail open
  }
}
