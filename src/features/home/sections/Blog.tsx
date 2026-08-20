import { motion } from 'framer-motion';

import { blogPosts } from '@/data/blog';
import { CHEVRON_LEFT, CHEVRON_RIGHT, useCarousel } from '@/lib/carousel';

export default function Blog() {
  const { trackRef, canPrev, canNext, slide } = useCarousel();

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
