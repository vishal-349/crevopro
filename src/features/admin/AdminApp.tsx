import { useCallback, useEffect, useState } from 'react';

import { ApiError, listLeads } from '@/lib/api';
import type { Lead } from '@/types/lead';
import LoginForm from './LoginForm';
import LeadsDashboard from './LeadsDashboard';
import './admin.scss';

type AuthState = 'loading' | 'authenticated' | 'guest';

export default function AdminApp() {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [initialLeads, setInitialLeads] = useState<Lead[] | undefined>(undefined);

  // Single round-trip: attempt to load leads directly. 200 ⇒ authenticated (and
  // we already have the data, so the dashboard renders without a second fetch);
  // 401 ⇒ show the login gate. This removes the separate session-check request
  // that previously serialised in front of the (cold-start-heavy) leads fetch.
  const load = useCallback(() => {
    setAuthState('loading');
    listLeads()
      .then(({ leads }) => {
        setInitialLeads(leads);
        setAuthState('authenticated');
      })
      .catch((error) => {
        if (error instanceof ApiError && error.status === 401) {
          setAuthState('guest');
        } else {
          // Authenticated but the load failed (e.g. transient server error) —
          // show the dashboard so it can surface the error and retry.
          setInitialLeads(undefined);
          setAuthState('authenticated');
        }
      });
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (authState === 'loading') {
    return <div className="admin-shell admin-shell--center">Loading…</div>;
  }

  if (authState === 'authenticated') {
    return <LeadsDashboard initialLeads={initialLeads} onLogout={() => setAuthState('guest')} />;
  }

  return <LoginForm onSuccess={load} />;
}
