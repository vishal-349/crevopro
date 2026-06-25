import { Fragment } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { ReactNode } from 'react';

import { processSteps } from '@/data/process';
import type { ProcessStep } from '@/types/content';

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

// Bootstrap-icons paths (viewBox 0 0 16 16), one per step.
const ICONS: Record<ProcessStep['icon'], ReactNode> = {
  discover: (
    <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
  ),
  strategy: (
    <>
      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
      <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10zm0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
      <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      <path d="M8 9a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
    </>
  ),
  execute: (
    <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
  ),
  optimize: (
    <path d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z" />
  ),
};

function ArrowConnector() {
  return (
    <span className="process__arrow" aria-hidden="true">
      <svg width="44" height="16" viewBox="0 0 44 16" fill="none" stroke="currentColor">
        <path
          d="M2 8h36M33 3l6 5-6 5"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Process() {
  return (
    <section id="process" className="process">
      <div className="container">
        <motion.div
          className="process__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <span className="process__eyebrow">OUR PROCESS</span>
          <h2 className="section-title">How We Grow Your Brand</h2>
        </motion.div>

        <motion.div
          className="process__flow"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {processSteps.map((step, index) => (
            <Fragment key={step.id}>
              <motion.div className="process-step" variants={stepVariants}>
                <span className="process-step__icon" aria-hidden="true">
                  <svg width="30" height="30" viewBox="0 0 16 16" fill="currentColor">
                    {ICONS[step.icon]}
                  </svg>
                </span>
                <div className="process-step__body">
                  <h3 className="process-step__title">{step.title}</h3>
                  <p className="process-step__desc">{step.description}</p>
                </div>
              </motion.div>
              {index < processSteps.length - 1 && <ArrowConnector />}
            </Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
