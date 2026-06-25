import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import heroImage from '@/assets/hero.svg';
import { brands } from '@/data/brands';
import { createStaggerContainer, fadeUpItem } from '@/lib/animations';

const containerVariants = createStaggerContainer(0.22, 0.2);

// Rendered twice so the CSS marquee (translateX 0 → -50%) loops seamlessly.
const marqueeLogos = [...brands, ...brands];

const ARROW =
  'M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 variants={fadeUpItem} className="hero-title">
            We Turn Brands Into <br />
            <span>Revenue-Generating Machines</span>
          </motion.h1>

          <motion.p
            variants={fadeUpItem}
            className="hero-subtitle"
            style={{ fontSize: '1.15rem', fontWeight: 400, lineHeight: 1.6, maxWidth: '34rem' }}
          >
            Creative Design, Performance Marketing &amp; Digital Strategies that help businesses
            attract customers and scale faster.
          </motion.p>

          <motion.div className="hero-cta" variants={fadeUpItem}>
            <Link to="/#contact" className="hero-btn hero-btn--primary">
              Book Free Strategy Call
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d={ARROW} />
              </svg>
            </Link>
            <Link to="/portfolio" className="hero-btn hero-btn--ghost">
              View Our Results
              <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d={ARROW} />
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        <div className="hero-image-wrapper">
          <motion.img
            src={heroImage}
            alt="Hero"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="hero-statue"
          />
        </div>

        <motion.div
          className="brands-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h3 className="brands-title">Trusted by 25+ businesses worldwide</h3>

          <div className="brands-marquee-wrapper">
            <div className="brands-track">
              {marqueeLogos.map((brand, index) => (
                <div
                  className="brand-item"
                  key={`${brand.name}-${index}`}
                  aria-hidden={index >= brands.length}
                >
                  <img src={brand.logo} alt={brand.name} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
