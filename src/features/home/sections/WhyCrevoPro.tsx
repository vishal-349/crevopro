import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

import { stats } from '@/data/stats';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const gradientTextStyle: CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 600,
  background: 'linear-gradient(45deg, #05FB8D, #03AFAD)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  color: 'transparent',
  marginBottom: '1.2rem',
  textAlign: 'center',
};

export default function WhyCrevoPro() {
  const isDesktop = useMediaQuery('(min-width: 992px)');

  const statsContainerStyle: CSSProperties = isDesktop
    ? {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        gap: '2.5rem',
        width: '100%',
        flexWrap: 'nowrap',
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        width: '100%',
      };

  const statCardStyle: CSSProperties = isDesktop
    ? { flex: '1 1 0', width: 'auto', maxWidth: 'none' }
    : { width: '100%' };

  return (
    <section id="why" className="why-crevopro">
      <div className="container">
        <motion.h2
          className="section-title"
          style={{ fontSize: '3.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Why CrevoPro
        </motion.h2>

        <div className="stats-container" style={statsContainerStyle}>
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              className="stat-card"
              style={statCardStyle}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: stat.id * 0.1 }}
            >
              {stat.icon && (
                <div className="stat-icon">
                  <img src={stat.icon} alt={stat.title} />
                </div>
              )}
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-title">{stat.title}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="why-crevopro-text"
          style={gradientTextStyle}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Looking for a Creative Design & Digital Partner You Can Rely On?
        </motion.p>

        <motion.p
          className="why-crevopro-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          We offer all-in-one solutions across Brand Identity &amp; Creative, Social Media
          Marketing, Web Design &amp; Development, Performance Marketing, Brand Shoot &amp; Editing,
          and Digital Signage. As a dynamic creative agency in India, we craft bold and effective
          strategies, and performance-focused experiences that help brands grow and thrive.
        </motion.p>

        <motion.p
          className="why-crevopro-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          From eye-catching designs and targeted campaigns to high-performing websites and
          always-on social, our team blends creativity with performance to deliver real results. We
          handle the details, so you can focus on running your business.
        </motion.p>

        <motion.p
          className="why-crevopro-text"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          At CrevoPro, we don't just create – we elevate. Partner with us to transform your brand
          through smart design, strategic marketing, and performance-driven campaigns tailored to
          your goals.
        </motion.p>
      </div>
    </section>
  );
}
