import { useCallback, useEffect, useState } from 'react';

import { getSession } from '@/lib/api';
import LoginForm from './LoginForm';
import LeadsDashboard from './LeadsDashboard';
import './admin.scss';

type AuthState = 'loading' | 'authenticated' | 'guest';

export default function AdminApp() {
  const [authState, setAuthState] = useState<AuthState>('loading');
  const [configured, setConfigured] = useState(true);

  const checkSession = useCallback(async () => {
    try {
      const session = await getSession();
      setConfigured(session.configured);
      setAuthState(session.authenticated ? 'authenticated' : 'guest');
    } catch {
      setAuthState('guest');
    }
  }, []);

  useEffect(() => {
    void checkSession();
  }, [checkSession]);

  if (authState === 'loading') {
    return <div className="admin-shell admin-shell--center">Loading…</div>;
  }

  if (authState === 'authenticated') {
    return <LeadsDashboard onLogout={() => setAuthState('guest')} />;
  }

  return <LoginForm configured={configured} onSuccess={() => setAuthState('authenticated')} />;
}
