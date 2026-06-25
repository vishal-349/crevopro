import { motion } from 'framer-motion';

import heroImage from '@/assets/hero.svg';
import { brands } from '@/data/brands';
import { createStaggerContainer, fadeUpItem } from '@/lib/animations';

const containerVariants = createStaggerContainer(0.3, 0.2);

// Rendered twice so the CSS marquee (translateX 0 → -50%) loops seamlessly
// regardless of how many brands are in the data.
const marqueeLogos = [...brands, ...brands];

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
          <h3 className="brands-title">
            <br />
            Brands we&apos;ve worked with
          </h3>

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
