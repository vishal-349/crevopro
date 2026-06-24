# Lead System

How enquiries are captured, stored, notified, and managed.

## Overview

```
Contact form (React)
   │  POST /api/leads        (validated, spam-checked, server-side)
   ▼
Vercel serverless function ──► Firestore  `leads` collection   (source of truth)
   │
   └─► Notification dispatcher ──► email (Resend) ┐
                                   WhatsApp (stub) ├─ best-effort, optional
                                   CRM webhook (stub) ┘

Admin (/admin)  ──► GET /api/leads (cookie-authed) ──► Firestore
                ──► PATCH /api/leads/:id (status)
                ──► GET /api/leads?format=csv (export)
```

**Design principle — graceful degradation:** Firestore is the only hard
dependency for capturing a lead. Email and every other channel are optional and
best-effort: if they are unconfigured or fail, the lead is still saved and the
visitor still gets a success response. No paid service is required for the site
or the lead form to function.

---

## Firestore collection structure

### `leads`

| Field        | Type      | Notes                                               |
| ------------ | --------- | --------------------------------------------------- |
| `name`       | string    | Required                                            |
| `email`      | string    | Required, validated                                 |
| `phone`      | string    | Required, validated                                 |
| `brandName`  | string    | From the form's "Brand Name" field                  |
| `service`    | string    | Defaults to `"General Enquiry"` (no selector today) |
| `message`    | string    | From the form's "FAQ query" field                   |
| `sourcePage` | string    | Path the enquiry came from (e.g. `/`)               |
| `status`     | string    | `new` \| `contacted` \| `closed` (defaults `new`)   |
| `createdAt`  | timestamp | Firestore server timestamp                          |
| `updatedAt`  | timestamp | Set when status changes                             |

> The form keeps its original visible fields; they map to the canonical schema
> above. Adding a "service" `<select>` later flows straight through with no
> backend change.

### `rateLimits` (internal)

One doc per client IP for submission throttling: `{ count, windowStart, updatedAt }`.
Safe to ignore/clear; the check fails **open** if unavailable.

---

## Spam protection & validation

Server-side, in `api/_lib/validation.ts`:

- **Honeypot** — a hidden `company_website` field; if filled, the request is
  accepted with a 200 (so bots get no signal) but **not** stored.
- **Time-trap** — submissions faster than 2s after the form rendered are dropped.
- **Field validation** — required name/email/phone, email & phone format, and
  max-length caps on every field.
- **Rate limiting** — max 5 submissions per IP per 10 minutes (Firestore-backed,
  fail-open).

The form also validates inline on the client for UX, but the server is authoritative.

---

## Notifications (extensible)

Channels live in `api/_lib/notifications/`. Each implements:

```ts
interface NotificationChannel {
  name: string;
  isConfigured(): boolean; // gate — only runs when its env vars are set
  notify(lead: Lead): Promise<void>;
}
```

The dispatcher (`notifications/index.ts`) runs every **configured** channel with
`Promise.allSettled`, logs failures, and never throws.

| Channel  | File          | Enabled when…                                    |
| -------- | ------------- | ------------------------------------------------ |
| Email    | `email.ts`    | `RESEND_API_KEY` + `ADMIN_EMAIL` set (Resend)    |
| WhatsApp | `whatsapp.ts` | `WHATSAPP_API_URL` + `_TOKEN` + `_TO` set (stub) |
| CRM      | `crm.ts`      | `CRM_WEBHOOK_URL` set (generic webhook)          |

**Multiple admin emails:** set `ADMIN_EMAIL` to a comma-separated list.

**Add a new channel** (e.g. Slack):

1. Create `api/_lib/notifications/slack.ts` implementing `NotificationChannel`.
2. Register it in the `channels` array in `notifications/index.ts`.

That's the only wiring needed — the dispatcher and lead flow stay untouched.

---

## API reference

| Method & path               | Auth   | Purpose                                  |
| --------------------------- | ------ | ---------------------------------------- |
| `POST /api/leads`           | public | Create a lead (validated + spam-checked) |
| `GET /api/leads`            | admin  | List leads (newest first)                |
| `GET /api/leads?format=csv` | admin  | Download all leads as CSV                |
| `PATCH /api/leads/:id`      | admin  | Update a lead's status                   |
| `POST /api/admin/login`     | public | Exchange password for a session cookie   |
| `POST /api/admin/logout`    | public | Clear the session cookie                 |
| `GET /api/admin/session`    | public | Report `{ authenticated, configured }`   |

Admin auth is a single `ADMIN_PASSWORD`, verified server-side; success sets an
**httpOnly, Secure, SameSite=Lax** cookie signed (HMAC-SHA256) with
`SESSION_SECRET`, valid for 8 hours.

---

## Admin panel (`/admin`)

Lazy-loaded — it adds **nothing** to the marketing bundle. Features:

- Password login gate
- Leads table: created date/time, name, email, phone, brand, service, message, source
- **Search** across name/email/phone/brand/service/message
- **Filter** by status, **sort** by newest/oldest
- Per-row **status** change (New / Contacted / Closed) with optimistic update
- **Export CSV** (all leads)
- Auto-refresh every 20s + manual Refresh, so new enquiries appear without reloading

---

## Environment variables

| Variable                                | Required | Purpose                                       |
| --------------------------------------- | -------- | --------------------------------------------- |
| `FIREBASE_PROJECT_ID`                   | ✅ leads | Firebase project id                           |
| `FIREBASE_CLIENT_EMAIL`                 | ✅ leads | Service-account email                         |
| `FIREBASE_PRIVATE_KEY`                  | ✅ leads | Service-account private key (quoted, `\n` ok) |
| `ADMIN_PASSWORD`                        | ✅ admin | Admin panel password                          |
| `SESSION_SECRET`                        | ✅ admin | Secret used to sign session cookies           |
| `RESEND_API_KEY`                        | optional | Enables email notifications                   |
| `EMAIL_FROM`                            | optional | Sender (needs a verified Resend domain)       |
| `ADMIN_EMAIL`                           | optional | Recipient(s), comma-separated                 |
| `WHATSAPP_API_URL/_TOKEN/_TO`           | optional | Enable the WhatsApp channel                   |
| `CRM_WEBHOOK_URL` / `CRM_WEBHOOK_TOKEN` | optional | Enable the CRM channel                        |

See [`.env.example`](.env.example) and [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md).

---

## Deployment (Vercel + Firebase)

1. Complete [`FIREBASE_SETUP.md`](FIREBASE_SETUP.md) and publish `firestore.rules`.
2. Push the repo to GitHub/GitLab and **Import** it in Vercel (framework: Vite — auto-detected).
3. In Vercel → **Settings → Environment Variables**, add the variables above for
   **Production** and **Preview**.
4. Deploy. The frontend builds to `dist/`; functions in `api/` deploy automatically.
   The SPA rewrite in `vercel.json` makes `/admin` resolve to the app.
5. (Email) In [Resend](https://resend.com), add an API key and **verify a sending
   domain**, then set `RESEND_API_KEY`, `EMAIL_FROM`, and `ADMIN_EMAIL`. Until a
   domain is verified, Resend only delivers to the account owner's address.

### Local full-stack dev

The Vite dev server alone does **not** run `api/`. Use the Vercel CLI:

```bash
npx vercel link      # once, to link the project
npx vercel env pull  # pull env vars into .env.local
npx vercel dev       # runs the frontend + /api together
```

---

## Testing checklist

**Lead capture**

- [ ] Submit the contact form → success message shows; form clears.
- [ ] New document appears in Firestore `leads` with all fields + `createdAt`.
- [ ] (If email configured) admin inbox receives the notification.
- [ ] (If email NOT configured) lead still saves; no error to the user.
- [ ] Submit with the hidden `company_website` filled (devtools) → returns 200, **no** doc written.
- [ ] Submit < 2s after load → silently dropped (time-trap).
- [ ] Invalid email / missing phone → inline validation error, no doc written.
- [ ] Fire 6+ submissions quickly from one IP → 6th returns 429.

**Admin panel**

- [ ] `/admin` shows the login gate.
- [ ] Wrong password → "Incorrect password."
- [ ] Correct password → dashboard loads with leads.
- [ ] Search, status filter, and sort behave correctly.
- [ ] Change a lead's status → persists after refresh.
- [ ] Export CSV → downloads a valid file with all leads.
- [ ] New enquiry appears within ~20s (auto-refresh) or on Refresh.
- [ ] Log out → returns to the login gate; protected endpoints return 401.

**Resilience**

- [ ] With Firebase env removed → form shows a friendly error; rest of site works.
- [ ] With email env removed → leads still save and appear in admin.
