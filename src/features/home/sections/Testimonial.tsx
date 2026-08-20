import { motion } from 'framer-motion';

import { testimonials } from '@/data/testimonials';
import { CHEVRON_LEFT, CHEVRON_RIGHT, useCarousel } from '@/lib/carousel';

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function Testimonial() {
  const { trackRef, canPrev, canNext, slide } = useCarousel();

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

        <div className="t-carousel">
          <button
            type="button"
            className={`t-nav t-nav--prev ${canPrev ? '' : 'is-hidden'}`}
            aria-label="Previous reviews"
            onClick={() => slide(-1)}
          >
            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d={CHEVRON_LEFT} />
            </svg>
          </button>

          <div className="t-track" ref={trackRef}>
            {testimonials.map((testimonial, index) => (
              <motion.figure
                className="t-card"
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: (index % 3) * 0.1 }}
              >
                <div className="t-card__top">
                  <span className="t-avatar" aria-hidden="true">
                    {initials(testimonial.name)}
                  </span>
                  <span className="t-stars" aria-label={`${testimonial.rating} out of 5 stars`}>
                    {/* Always five stars, so a 4-star rating reads as 4 of 5 rather than
                        as a shorter row of stars. */}
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <span
                        key={starIndex}
                        className={
                          starIndex < testimonial.rating ? 't-star' : 't-star t-star--empty'
                        }
                        aria-hidden="true"
                      >
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
          </div>

          <button
            type="button"
            className={`t-nav t-nav--next ${canNext ? '' : 'is-hidden'}`}
            aria-label="Next reviews"
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
