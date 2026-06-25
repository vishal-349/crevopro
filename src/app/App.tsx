import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from '@/components/ui/Loader';
import HomePage from '@/features/home/HomePage';

// Sub-pages are code-split so the marketing bundle stays lean. (No framer-motion
// import here on purpose — it keeps the eager entry bundle small; per-page
// content animations are loaded with their own chunks.)
const ServiceDetailPage = lazy(() => import('@/features/services/ServiceDetailPage'));
const PortfolioPage = lazy(() => import('@/features/portfolio/PortfolioPage'));
const AdminApp = lazy(() => import('@/features/admin/AdminApp'));

/** Reset scroll to top on navigation (unless a hash anchor is targeted). */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function RoutedApp() {
  const location = useLocation();
  // Keyed wrapper replays a lightweight opacity fade on each route change
  // (opacity-only — does not break the fixed navbar's positioning).
  return (
    <div className="route-fade" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/services/:slug"
          element={
            <Suspense fallback={<Loader />}>
              <ServiceDetailPage />
            </Suspense>
          }
        />
        <Route
          path="/portfolio"
          element={
            <Suspense fallback={<Loader />}>
              <PortfolioPage />
            </Suspense>
          }
        />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<Loader />}>
              <AdminApp />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RoutedApp />
    </BrowserRouter>
  );
}
