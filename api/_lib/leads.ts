import { FieldValue, Timestamp, type DocumentData } from 'firebase-admin/firestore';
import { getDb, LEADS_COLLECTION } from './firebase.js';
import type { CleanLead } from './validation.js';
import type { Lead, LeadStatus } from './types.js';

function toLead(id: string, data: DocumentData): Lead {
  const createdAt = data.createdAt;
  return {
    id,
    name: data.name ?? '',
    email: data.email ?? '',
    phone: data.phone ?? '',
    service: data.service ?? '',
    message: data.message ?? '',
    brandName: data.brandName ?? '',
    sourcePage: data.sourcePage ?? '',
    status: (data.status ?? 'new') as LeadStatus,
    createdAt:
      createdAt instanceof Timestamp ? createdAt.toDate().toISOString() : new Date(0).toISOString(),
  };
}

export async function createLead(input: CleanLead): Promise<Lead> {
  const db = getDb();
  const ref = await db.collection(LEADS_COLLECTION).add({
    ...input,
    status: 'new' satisfies LeadStatus,
    createdAt: FieldValue.serverTimestamp(),
  });
  // Read back so the returned lead carries the resolved server timestamp.
  const snap = await ref.get();
  return toLead(ref.id, snap.data() ?? {});
}

export async function listLeads(limit = 1000): Promise<Lead[]> {
  const db = getDb();
  const snap = await db
    .collection(LEADS_COLLECTION)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();
  return snap.docs.map((doc) => toLead(doc.id, doc.data()));
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<boolean> {
  const db = getDb();
  const ref = db.collection(LEADS_COLLECTION).doc(id);
  const snap = await ref.get();
  if (!snap.exists) return false;
  await ref.update({ status, updatedAt: FieldValue.serverTimestamp() });
  return true;
}

export function leadsToCsv(leads: Lead[]): string {
  const headers = [
    'Created',
    'Name',
    'Email',
    'Phone',
    'Brand',
    'Service',
    'Message',
    'Source Page',
    'Status',
  ];
  const escape = (value: string) => `"${String(value).replace(/"/g, '""')}"`;
  const rows = leads.map((lead) =>
    [
      lead.createdAt,
      lead.name,
      lead.email,
      lead.phone,
      lead.brandName,
      lead.service,
      lead.message,
      lead.sourcePage,
      lead.status,
    ]
      .map(escape)
      .join(','),
  );
  return [headers.map(escape).join(','), ...rows].join('\r\n');
}
