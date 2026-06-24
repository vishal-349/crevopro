import type { LeadInput } from './types.js';

/** Server-side validation + lightweight spam heuristics for lead submissions. */

export interface CleanLead {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  brandName: string;
  sourcePage: string;
}

// A single `kind` discriminant narrows reliably under every TS configuration
// (avoids the `in`-operator narrowing edge cases that differ across compilers).
export type ValidationResult =
  | { kind: 'ok'; data: CleanLead }
  | { kind: 'invalid'; error: string }
  | { kind: 'spam' }; // silently accepted, not stored

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,19}$/;

const LIMITS = {
  name: 100,
  email: 200,
  phone: 25,
  service: 120,
  brandName: 120,
  message: 2000,
  sourcePage: 300,
} as const;

/** Minimum seconds a human plausibly takes before submitting. */
const MIN_FILL_SECONDS = 2;

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function validateLead(input: LeadInput): ValidationResult {
  // 1. Honeypot — bots fill hidden fields; humans never do.
  if (str(input.company_website) !== '') {
    return { kind: 'spam' };
  }

  // 2. Time-trap — submissions faster than a human can type are bots.
  if (typeof input.formLoadedAt === 'number' && Number.isFinite(input.formLoadedAt)) {
    const elapsedSeconds = (Date.now() - input.formLoadedAt) / 1000;
    if (elapsedSeconds >= 0 && elapsedSeconds < MIN_FILL_SECONDS) {
      return { kind: 'spam' };
    }
  }

  const name = str(input.name);
  const email = str(input.email);
  const phone = str(input.phone);
  const service = str(input.service) || 'General Enquiry';
  const message = str(input.message);
  const brandName = str(input.brandName);
  const sourcePage = str(input.sourcePage) || '/';

  // 3. Required fields.
  if (name.length < 2) return { kind: 'invalid', error: 'Please enter your name.' };
  if (!EMAIL_RE.test(email)) return { kind: 'invalid', error: 'Please enter a valid email address.' };
  if (!PHONE_RE.test(phone)) return { kind: 'invalid', error: 'Please enter a valid phone number.' };

  // 4. Length caps (anti-abuse).
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    phone.length > LIMITS.phone ||
    service.length > LIMITS.service ||
    brandName.length > LIMITS.brandName ||
    message.length > LIMITS.message ||
    sourcePage.length > LIMITS.sourcePage
  ) {
    return { kind: 'invalid', error: 'One or more fields are too long.' };
  }

  return {
    kind: 'ok',
    data: { name, email, phone, service, message, brandName, sourcePage },
  };
}
