import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

import { createStaggerContainer, fadeUpItem } from '@/lib/animations';

const containerVariants = createStaggerContainer(0.2, 0.3);

// Bar tops (rising) — also used as the trend-line vertices.
const points = [
  { x: 42, y: 118 },
  { x: 86, y: 96 },
  { x: 130, y: 104 },
  { x: 174, y: 74 },
  { x: 218, y: 82 },
  { x: 262, y: 50 },
  { x: 306, y: 32 },
];
const BASE = 174;
const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
const areaPath = `${linePath} L${points[points.length - 1].x} ${BASE} L${points[0].x} ${BASE} Z`;

const barVariants: Variants = {
  hidden: { scaleY: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    transition: { duration: 0.7, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-wrapper">
          <motion.div
            className="about-content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.h2 variants={fadeUpItem} className="section-title">
              About Us
            </motion.h2>
            <motion.p variants={fadeUpItem} className="about-text">
              At CrevoPro, we're a team of passionate designers, marketers, and strategists
              dedicated to fueling your brand's growth. With a focus on creativity and results, we
              deliver solutions that help businesses stand out in today's competitive landscape.
            </motion.p>
            <motion.p variants={fadeUpItem} className="about-text">
              Our approach combines strategic thinking with creative execution to create meaningful
              experiences that connect with your audience and drive business growth. We believe in
              building long-term partnerships with our clients, understanding their unique
              challenges, and delivering tailored solutions that exceed expectations.
            </motion.p>
          </motion.div>

          <motion.div
            className="about-visual"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="about-graph">
              <div className="about-graph__head">
                <div className="about-graph__heading">
                  <span className="about-graph__eyebrow">Client growth</span>
                  <span className="about-graph__title">Results that compound</span>
                </div>
                <span className="about-graph__badge">
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                    <path d="M2 8l3-3 2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 3h2v2" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  +250%
                </span>
              </div>

              <svg className="about-graph__chart" viewBox="0 0 340 200" role="img" aria-label="Upward brand-growth chart">
                <defs>
                  <linearGradient id="aboutBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#05FB8D" stopOpacity="0.85" />
                    <stop offset="1" stopColor="#03AFAD" stopOpacity="0.25" />
                  </linearGradient>
                  <linearGradient id="aboutArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#05FB8D" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#05FB8D" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="aboutLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#03AFAD" />
                    <stop offset="1" stopColor="#05FB8D" />
                  </linearGradient>
                </defs>

                {/* gridlines */}
                {[40, 80, 120, 160].map((y) => (
                  <line key={y} x1="20" y1={y} x2="320" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />
                ))}

                {/* bars */}
                {points.map((p, i) => (
                  <motion.rect
                    key={p.x}
                    x={p.x - 13}
                    y={p.y}
                    width="26"
                    height={BASE - p.y}
                    rx="5"
                    fill="url(#aboutBar)"
                    custom={i}
                    variants={barVariants}
                    style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
                  />
                ))}

                {/* baseline */}
                <line x1="20" y1={BASE} x2="320" y2={BASE} stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

                {/* area + trend line */}
                <motion.path
                  d={areaPath}
                  fill="url(#aboutArea)"
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.7, duration: 0.6 } } }}
                />
                <motion.path
                  d={linePath}
                  fill="none"
                  stroke="url(#aboutLine)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 1, transition: { delay: 0.4, duration: 1.1, ease: 'easeInOut' } },
                  }}
                />
                <motion.circle
                  cx={points[points.length - 1].x}
                  cy={points[points.length - 1].y}
                  r="5.5"
                  fill="#05FB8D"
                  variants={{ hidden: { scale: 0 }, visible: { scale: 1, transition: { delay: 1.4, type: 'spring', stiffness: 300 } } }}
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                />
              </svg>

              <div className="about-graph__legend">
                <span><i className="dot dot--rev" />Revenue</span>
                <span><i className="dot dot--leads" />Leads</span>
                <span><i className="dot dot--reach" />Reach</span>
              </div>
            </div>

            <span className="about-visual__orb about-visual__orb--a" aria-hidden="true" />
            <span className="about-visual__orb about-visual__orb--b" aria-hidden="true" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
