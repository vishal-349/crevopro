import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { ReactNode } from 'react';

import { problems } from '@/data/problems';
import type { ProblemSolved } from '@/types/content';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const ICONS: Record<ProblemSolved['icon'], ReactNode> = {
  leads: (
    <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2z" />
  ),
  visibility: (
    <>
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    </>
  ),
  conversion: (
    <path d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z" />
  ),
  strategy: (
    <>
      <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016zm6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
      <path d="M6.94 7.44l4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
    </>
  ),
};

export default function Problems() {
  return (
    <section className="problems">
      <div className="container">
        <motion.h2
          className="section-title problems__title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          Problems We Solve
        </motion.h2>

        <motion.div
          className="problems__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {problems.map((problem) => (
            <motion.div className="problem-card" key={problem.id} variants={cardVariants}>
              <span className="problem-card__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
                  {ICONS[problem.icon]}
                </svg>
              </span>
              <h3 className="problem-card__title">{problem.title}</h3>
              <p className="problem-card__desc">{problem.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
