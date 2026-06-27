import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { blogPosts } from '@/data/blog';

const CHEVRON_LEFT =
  'M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z';
const CHEVRON_RIGHT =
  'M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z';

export default function Blog() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // Generous edge tolerance: scroll-snap can land a few px short of the true end.
    const EDGE = 24;
    setCanPrev(el.scrollLeft > EDGE);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - EDGE);
  }, []);

  useEffect(() => {
    updateArrows();
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [updateArrows]);

  // Slide by one full view (≈ the 3 visible cards); scroll-snap lands on a card edge.
  const slide = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <section id="blog" className="blog">
      <div className="container">
        <motion.div
          className="blog-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">CrevoPro Blogs</h2>
          <p className="section-subtitle">
            We educate before we execute — explore insights that empower your brand.
          </p>
        </motion.div>

        <div className="blog-carousel">
          <button
            type="button"
            className={`blog-nav blog-nav--prev ${canPrev ? '' : 'is-hidden'}`}
            aria-label="Previous blogs"
            onClick={() => slide(-1)}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d={CHEVRON_LEFT} />
            </svg>
          </button>

          <div className="blog-track" ref={trackRef}>
            {blogPosts.map((post) => (
              <motion.article
                key={post.id}
                className="blog-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: ((post.id - 1) % 3) * 0.1 }}
              >
                <div className="blog-img">
                  <img src={post.image} alt={post.title} loading="lazy" />
                  <div className="blog-overlay" />
                </div>
                <div className="blog-content">
                  <h3 className="blog-title">{post.title}</h3>
                </div>
              </motion.article>
            ))}
          </div>

          <button
            type="button"
            className={`blog-nav blog-nav--next ${canNext ? '' : 'is-hidden'}`}
            aria-label="Next blogs"
            onClick={() => slide(1)}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d={CHEVRON_RIGHT} />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
