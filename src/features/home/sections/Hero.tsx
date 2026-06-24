import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

import heroImage from '@/assets/hero.svg';
import { brands } from '@/data/brands';
import { createStaggerContainer, fadeUpItem } from '@/lib/animations';

const containerVariants = createStaggerContainer(0.3, 0.2);
const brandVariants = createStaggerContainer(0.1, 1.2);

const brandItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 0.7, y: 0, transition: { duration: 0.5 } },
};

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
            Fuel Your <br />
            Brand's <br />
            Growth <br />
            with <span>Crevopro</span>
          </motion.h1>

          <motion.p variants={fadeUpItem} className="hero-subtitle">
            — Design, Market, and Sell Smarter.
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
          initial="hidden"
          animate="visible"
          variants={brandVariants}
        >
          <motion.h3 variants={brandItemVariants} className="brands-title">
            <br />
            Brands we've worked with
          </motion.h3>

          <div className="brands-marquee-wrapper">
            <motion.div
              className="brands-marquee"
              initial={{ x: 0 }}
              animate={{ x: [0, -1000] }}
              transition={{
                repeat: Infinity,
                repeatType: 'loop',
                duration: 18,
                ease: 'linear',
              }}
            >
              <div className="brands-container">
                {/* Rendered twice for a seamless looping marquee. */}
                {[...brands, ...brands].map((brand, index) => (
                  <motion.div
                    key={`${brand.name}-${index}`}
                    variants={brandItemVariants}
                    className="brand-item"
                  >
                    <img src={brand.logo} alt={brand.name} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
