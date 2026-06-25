import { lazy, Suspense, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Loader from '@/components/ui/Loader';

// Code-split each section so the initial bundle stays small.
const Navbar = lazy(() => import('@/components/layout/Navbar'));
const Footer = lazy(() => import('@/components/layout/Footer'));
const Hero = lazy(() => import('@/features/home/sections/Hero'));
const About = lazy(() => import('@/features/home/sections/About'));
const Problems = lazy(() => import('@/features/home/sections/Problems'));
const Services = lazy(() => import('@/features/home/sections/Services'));
const Process = lazy(() => import('@/features/home/sections/Process'));
const WhyCrevoPro = lazy(() => import('@/features/home/sections/WhyCrevoPro'));
const Testimonial = lazy(() => import('@/features/home/sections/Testimonial'));
const Blog = lazy(() => import('@/features/home/sections/Blog'));
const Faq = lazy(() => import('@/features/home/sections/Faq'));
const ContactSection = lazy(() => import('@/features/contact/ContactSection'));

const INTRO_LOAD_MS = 2000;

// Module-scoped so the branded intro plays once per full page load, not on
// every client-side navigation back to the home route.
let introPlayed = false;

export default function HomePage() {
  const [loading, setLoading] = useState(!introPlayed);
  const { hash } = useLocation();

  useEffect(() => {
    if (introPlayed) return;
    const timer = setTimeout(() => {
      introPlayed = true;
      setLoading(false);
    }, INTRO_LOAD_MS);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to a hash target (e.g. arriving at /#contact from another page),
  // retrying briefly while lazy sections mount.
  useEffect(() => {
    if (loading || !hash) return;
    const id = hash.slice(1);
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (tries++ < 20) {
        window.setTimeout(tryScroll, 100);
      }
    };
    tryScroll();
  }, [loading, hash]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Problems />
        <Services />
        <Process />
        <WhyCrevoPro />
        <Testimonial />
        <Blog />
        <Faq />
        <ContactSection />
      </main>
      <Footer />
    </Suspense>
  );
}
