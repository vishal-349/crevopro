# Firebase Setup

The lead system stores enquiries in **Cloud Firestore**, accessed only from the
server (Vercel functions) via the Firebase Admin SDK. This runs entirely on the
**free Spark plan** — no billing required.

---

## 1. Create a Firebase project

1. Go to the [Firebase Console](https://console.firebase.google.com/) → **Add project**.
2. Name it (e.g. `crevopro`). Google Analytics is optional.

## 2. Create the Firestore database

1. In the project, open **Build → Firestore Database → Create database**.
2. Start in **Production mode** (we lock access down with rules below).
3. Pick a location close to your users (e.g. `asia-south1` for India). This is permanent.

You do **not** need to create the `leads` collection manually — it is created
automatically on the first enquiry.

## 3. Lock down security rules

All access is server-side through the Admin SDK (which bypasses rules), so the
browser should have **no** direct access. The repo ships [`firestore.rules`](firestore.rules):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} { allow read, write: if false; }
  }
}
```

Apply it either way:

- **Console:** Firestore → **Rules** tab → paste → **Publish**, or
- **CLI:** `npx firebase deploy --only firestore:rules`

## 4. Create a service account (server credentials)

1. **Project settings** (gear icon) → **Service accounts**.
2. Click **Generate new private key** → downloads a JSON file. **Keep it secret.**
3. From that JSON, copy three values into your environment variables:

| JSON field     | Env var                 |
| -------------- | ----------------------- |
| `project_id`   | `FIREBASE_PROJECT_ID`   |
| `client_email` | `FIREBASE_CLIENT_EMAIL` |
| `private_key`  | `FIREBASE_PRIVATE_KEY`  |

> **`FIREBASE_PRIVATE_KEY`** is multi-line. Wrap it in double quotes and keep the
> `\n` sequences — the server converts them back to real newlines. In the Vercel
> dashboard, paste the key exactly as-is (including `-----BEGIN/END-----` lines).

## 5. Set environment variables

Locally, copy `.env.example` → `.env` and fill the values. On Vercel:
**Project → Settings → Environment Variables** (add for Production + Preview).
See the full list in [`.env.example`](.env.example).

## 6. Indexes

The only query is `leads` ordered by `createdAt` (descending) — a single-field
index Firestore maintains automatically. **No composite index is required.**

---

## Verify

After setting the env vars and deploying (or running `npx vercel dev`):

1. Submit the contact form on the site.
2. Check Firestore → **Data** → `leads` collection — a new document appears.
3. Open `/admin`, sign in, and confirm the lead is listed.

If Firebase env vars are missing, the contact form returns a friendly error and
the rest of the site keeps working — nothing crashes.
