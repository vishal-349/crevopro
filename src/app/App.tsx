import { lazy, Suspense } from 'react';

import Loader from '@/components/ui/Loader';
import HomePage from '@/features/home/HomePage';

// The admin panel is fully code-split: it is only fetched when /admin is opened,
// so the marketing site's bundle is unaffected.
const AdminApp = lazy(() => import('@/features/admin/AdminApp'));

export default function App() {
  const isAdminRoute =
    typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <Suspense fallback={<Loader />}>
        <AdminApp />
      </Suspense>
    );
  }

  return <HomePage />;
}
