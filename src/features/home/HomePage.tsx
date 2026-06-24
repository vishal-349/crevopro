import { lazy, Suspense, useEffect, useState } from 'react';

import Loader from '@/components/ui/Loader';

// Code-split each section so the initial bundle stays small.
const Navbar = lazy(() => import('@/components/layout/Navbar'));
const Footer = lazy(() => import('@/components/layout/Footer'));
const Hero = lazy(() => import('@/features/home/sections/Hero'));
const About = lazy(() => import('@/features/home/sections/About'));
const Services = lazy(() => import('@/features/home/sections/Services'));
const Portfolio = lazy(() => import('@/features/home/sections/Portfolio'));
const WhyCrevoPro = lazy(() => import('@/features/home/sections/WhyCrevoPro'));
const Testimonial = lazy(() => import('@/features/home/sections/Testimonial'));
const Blog = lazy(() => import('@/features/home/sections/Blog'));
const ContactSection = lazy(() => import('@/features/contact/ContactSection'));

const INTRO_LOAD_MS = 2000;

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), INTRO_LOAD_MS);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <WhyCrevoPro />
        <Testimonial />
        <Blog />
        <ContactSection />
      </main>
      <Footer />
    </Suspense>
  );
}
