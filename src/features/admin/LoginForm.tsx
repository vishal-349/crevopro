import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';

import { adminLogin, getSession } from '@/lib/api';
import logo from '@/assets/logo.svg';

interface LoginFormProps {
  onSuccess: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [configured, setConfigured] = useState(true);

  // Light, Firebase-free check used only on the login screen (off the hot path).
  useEffect(() => {
    getSession()
      .then((session) => setConfigured(session.configured))
      .catch(() => setConfigured(true));
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await adminLogin(password);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.');
      setSubmitting(false);
    }
  };

  return (
    <div className="admin-shell admin-shell--center">
      <form className="admin-login" onSubmit={handleSubmit}>
        <img src={logo} alt="CrevoPro" className="admin-login__logo" />
        <h1 className="admin-login__title">Admin Panel</h1>

        {!configured && (
          <p className="admin-login__notice">
            The admin panel is not configured yet. Set <code>ADMIN_PASSWORD</code> and{' '}
            <code>SESSION_SECRET</code> in your environment.
          </p>
        )}

        <label className="admin-field">
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoFocus
            required
          />
        </label>

        {error && <p className="admin-login__error">{error}</p>}

        <button type="submit" className="admin-btn admin-btn--primary" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
