import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

import { testimonials } from '@/data/testimonials';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Testimonial() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <motion.div
          className="t-head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="t-eyebrow">TESTIMONIALS</span>
          <h2 className="section-title">What Our Clients Say</h2>
        </motion.div>

        <motion.div
          className="t-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {testimonials.map((testimonial) => (
            <motion.figure className="t-card" key={testimonial.id} variants={cardVariants}>
              <div className="t-card__top">
                <span className="t-avatar" aria-hidden="true">
                  {initials(testimonial.name)}
                </span>
                <span className="t-stars" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, index) => (
                    <span key={index} className="t-star" aria-hidden="true">
                      ★
                    </span>
                  ))}
                </span>
              </div>
              <blockquote className="t-quote">“{testimonial.quote}”</blockquote>
              <figcaption className="t-client">
                <span className="t-client__name">{testimonial.name}</span>
                <span className="t-client__role">{testimonial.role}</span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
