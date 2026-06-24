import { useCallback, useEffect, useMemo, useState } from 'react';

import { adminLogout, listLeads, updateLeadStatus, LEADS_CSV_URL } from '@/lib/api';
import { LEAD_STATUS_LABELS, LEAD_STATUSES, type Lead, type LeadStatus } from '@/types/lead';

interface LeadsDashboardProps {
  onLogout: () => void;
}

type StatusFilter = 'all' | LeadStatus;
type SortOrder = 'newest' | 'oldest';

const REFRESH_INTERVAL_MS = 20_000;

function formatDate(iso: string): string {
  const date = new Date(iso);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString();
}

export default function LeadsDashboard({ onLogout }: LeadsDashboardProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');

  const load = useCallback(async (showSpinner = false) => {
    if (showSpinner) setLoading(true);
    try {
      const { leads: fetched } = await listLeads();
      setLeads(fetched);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load leads.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(true);
    const timer = setInterval(() => void load(false), REFRESH_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [load]);

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    const previous = leads;
    setLeads((current) => current.map((lead) => (lead.id === id ? { ...lead, status } : lead)));
    try {
      await updateLeadStatus(id, status);
    } catch {
      setLeads(previous); // revert on failure
      setError('Could not update lead status. Please retry.');
    }
  };

  const handleLogout = async () => {
    try {
      await adminLogout();
    } finally {
      onLogout();
    }
  };

  const counts = useMemo(() => {
    const base: Record<LeadStatus, number> = { new: 0, contacted: 0, closed: 0 };
    for (const lead of leads) base[lead.status] += 1;
    return base;
  }, [leads]);

  const visibleLeads = useMemo(() => {
    const term = search.trim().toLowerCase();
    const filtered = leads.filter((lead) => {
      if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
      if (!term) return true;
      return [lead.name, lead.email, lead.phone, lead.brandName, lead.service, lead.message]
        .join(' ')
        .toLowerCase()
        .includes(term);
    });
    filtered.sort((a, b) => {
      const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return sortOrder === 'newest' ? -diff : diff;
    });
    return filtered;
  }, [leads, search, statusFilter, sortOrder]);

  return (
    <div className="admin-shell">
      <header className="admin-header">
        <h1 className="admin-header__title">Leads</h1>
        <div className="admin-header__actions">
          <button className="admin-btn" onClick={() => void load(true)}>
            Refresh
          </button>
          <a className="admin-btn" href={LEADS_CSV_URL}>
            Export CSV
          </a>
          <button className="admin-btn admin-btn--ghost" onClick={() => void handleLogout()}>
            Log out
          </button>
        </div>
      </header>

      <section className="admin-stats">
        <div className="admin-stat">
          <span className="admin-stat__value">{leads.length}</span>
          <span className="admin-stat__label">Total</span>
        </div>
        {LEAD_STATUSES.map((status) => (
          <div className="admin-stat" key={status}>
            <span className="admin-stat__value">{counts[status]}</span>
            <span className="admin-stat__label">{LEAD_STATUS_LABELS[status]}</span>
          </div>
        ))}
      </section>

      <section className="admin-toolbar">
        <input
          className="admin-input"
          type="search"
          placeholder="Search name, email, phone, message…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          className="admin-input"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
        >
          <option value="all">All statuses</option>
          {LEAD_STATUSES.map((status) => (
            <option key={status} value={status}>
              {LEAD_STATUS_LABELS[status]}
            </option>
          ))}
        </select>
        <select
          className="admin-input"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value as SortOrder)}
        >
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </section>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Created</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Brand</th>
              <th>Service</th>
              <th>Message</th>
              <th>Source</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="admin-table__empty">
                  Loading leads…
                </td>
              </tr>
            ) : visibleLeads.length === 0 ? (
              <tr>
                <td colSpan={9} className="admin-table__empty">
                  No leads found.
                </td>
              </tr>
            ) : (
              visibleLeads.map((lead) => (
                <tr key={lead.id}>
                  <td className="admin-table__nowrap">{formatDate(lead.createdAt)}</td>
                  <td>{lead.name}</td>
                  <td>
                    <a href={`mailto:${lead.email}`}>{lead.email}</a>
                  </td>
                  <td className="admin-table__nowrap">
                    <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                  </td>
                  <td>{lead.brandName || '—'}</td>
                  <td>{lead.service || '—'}</td>
                  <td className="admin-table__message">{lead.message || '—'}</td>
                  <td>{lead.sourcePage || '—'}</td>
                  <td>
                    <select
                      className={`admin-status admin-status--${lead.status}`}
                      value={lead.status}
                      onChange={(event) =>
                        void handleStatusChange(lead.id, event.target.value as LeadStatus)
                      }
                    >
                      {LEAD_STATUSES.map((status) => (
                        <option key={status} value={status}>
                          {LEAD_STATUS_LABELS[status]}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
