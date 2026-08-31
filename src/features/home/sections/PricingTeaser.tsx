import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { pricingTeasers } from '@/data/pricing';
import { createStaggerContainer, fadeUpItem } from '@/lib/animations';

const containerVariants = createStaggerContainer(0.2, 0.3);

export default function PricingTeaser() {
  return (
    <section id="pricing" className="pricing-teaser section-padding">
      <div className="pricing-teaser__container">
        <motion.div
          className="pricing-teaser__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 variants={fadeUpItem} className="section-title">
            Pricing
          </motion.h2>
          <motion.p variants={fadeUpItem} className="section-subtitle">
            Transparent starting rates — no guesswork
          </motion.p>
        </motion.div>

        <motion.div
          className="pricing-teaser__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {pricingTeasers.map((item) => (
            <motion.div key={item.id} className="pricing-teaser__card" variants={fadeUpItem}>
              <h3>{item.title}</h3>
              <p className="pricing-teaser__price">
                <span>{item.price}</span>
                <small>{item.unit}</small>
              </p>
              <p className="pricing-teaser__blurb">{item.blurb}</p>
              <Link to={`/pricing#${item.id}`} className="pricing-teaser__link">
                See what&apos;s included
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="pricing-teaser__footer"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
        >
          <motion.div variants={fadeUpItem}>
            <Link to="/pricing" className="pricing-teaser__cta">
              View full pricing
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
