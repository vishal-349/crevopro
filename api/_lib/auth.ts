import crypto from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { parseCookies } from './http.js';

/**
 * Single-password admin auth with an HMAC-signed, httpOnly session cookie.
 * No external dependency — uses node:crypto. Fails closed when unconfigured.
 */

const COOKIE_NAME = 'crevopro_admin';
const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && process.env.SESSION_SECRET);
}

function timingSafeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

export function verifyPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? '';
  if (!expected) return false;
  return timingSafeEqual(password, expected);
}

function sign(value: string): string {
  const secret = process.env.SESSION_SECRET ?? '';
  return crypto.createHmac('sha256', secret).update(value).digest('base64url');
}

function createToken(): string {
  const payload = JSON.stringify({ exp: Date.now() + SESSION_TTL_SECONDS * 1000 });
  const encoded = Buffer.from(payload).toString('base64url');
  return `${encoded}.${sign(encoded)}`;
}

function verifyToken(token: string): boolean {
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return false;
  if (!timingSafeEqual(signature, sign(encoded))) return false;
  try {
    const { exp } = JSON.parse(Buffer.from(encoded, 'base64url').toString()) as { exp: number };
    return typeof exp === 'number' && Date.now() < exp;
  } catch {
    return false;
  }
}

export function setSessionCookie(res: VercelResponse): void {
  const cookie = [
    `${COOKIE_NAME}=${createToken()}`,
    'HttpOnly',
    'Secure',
    'SameSite=Lax',
    'Path=/',
    `Max-Age=${SESSION_TTL_SECONDS}`,
  ].join('; ');
  res.setHeader('Set-Cookie', cookie);
}

export function clearSessionCookie(res: VercelResponse): void {
  res.setHeader('Set-Cookie', `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`);
}

export function isAuthenticated(req: VercelRequest): boolean {
  if (!isAdminConfigured()) return false;
  const token = parseCookies(req)[COOKIE_NAME];
  return Boolean(token && verifyToken(token));
}
