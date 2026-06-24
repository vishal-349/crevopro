import { useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from 'framer-motion';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { services } from '@/data/services';
import { getServiceDetail } from '@/data/serviceDetails';
import { useCountUp } from '@/hooks/useCountUp';
import type { ServiceStat } from '@/types/content';
import './serviceDetail.scss';

const reveal: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

function StatCounter({ stat }: { stat: ServiceStat }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const animated = useCountUp(stat.value, inView && !reduce);
  const current = reduce ? stat.value : animated;
  const display = Number.isInteger(stat.value)
    ? Math.round(current).toString()
    : current.toFixed(1);

  return (
    <motion.div ref={ref} className="svc-stat" variants={reveal}>
      <div className="svc-stat__value">
        {stat.prefix}
        {display}
        {stat.suffix}
      </div>
      <div className="svc-stat__label">{stat.label}</div>
    </motion.div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className={`svc-faq__item ${open ? 'is-open' : ''}`} variants={reveal}>
      <button
        type="button"
        className="svc-faq__q"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{question}</span>
        <span className="svc-faq__icon" aria-hidden="true">
          +
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="svc-faq__a-wrap"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="svc-faq__a">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function NotFound() {
  return (
    <>
      <Navbar />
      <main className="svc-page svc-notfound">
        <h1>Service not found</h1>
        <p>The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="svc-btn svc-btn--primary">
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default function ServiceDetailPage() {
  const { slug = '' } = useParams();
  const heroRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const orbY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 220]);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  const service = services.find((s) => s.slug === slug);
  const detail = getServiceDetail(slug);

  if (!service || !detail) {
    return <NotFound />;
  }

  const themeStyle = {
    '--accent-from': service.accent.from,
    '--accent-to': service.accent.to,
  } as CSSProperties;

  return (
    <div className="svc-page" style={themeStyle}>
      <Navbar />

      {/* ---- Hero ---- */}
      <header className="svc-hero" ref={heroRef}>
        <motion.div className="svc-hero__orb" style={{ y: orbY }} aria-hidden="true" />
        <motion.div className="svc-hero__grid" aria-hidden="true" style={{ opacity: heroFade }} />
        <motion.div
          className="svc-hero__inner"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.div className="svc-hero__eyebrow" variants={reveal}>
            <img src={service.icon} alt="" aria-hidden="true" />
            <span>{detail.eyebrow}</span>
          </motion.div>
          <motion.h1 className="svc-hero__title" variants={reveal}>
            {detail.title}
          </motion.h1>
          <motion.p className="svc-hero__tagline" variants={reveal}>
            {detail.tagline}
          </motion.p>
          <motion.p className="svc-hero__desc" variants={reveal}>
            {detail.heroDescription}
          </motion.p>
          <motion.div className="svc-hero__actions" variants={reveal}>
            <Link to="/#contact" className="svc-btn svc-btn--primary">
              Start a project
            </Link>
            <Link to="/#services" className="svc-btn svc-btn--ghost">
              All services
            </Link>
          </motion.div>
        </motion.div>
        <div className="svc-hero__scroll" aria-hidden="true">
          <span />
        </div>
      </header>

      {/* ---- Stats ---- */}
      <motion.section
        className="svc-stats"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        {detail.stats.map((stat) => (
          <StatCounter key={stat.label} stat={stat} />
        ))}
      </motion.section>

      {/* ---- What we do ---- */}
      <section className="svc-section">
        <motion.div
          className="svc-section__head"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={stagger}
        >
          <motion.span className="svc-eyebrow" variants={reveal}>
            What we do
          </motion.span>
          <motion.h2 className="svc-section__title" variants={reveal}>
            Everything your brand needs, under one roof.
          </motion.h2>
        </motion.div>
        <motion.div
          className="svc-features"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {detail.whatWeDo.map((feature, index) => (
            <motion.article className="svc-feature" key={feature.title} variants={reveal}>
              <span className="svc-feature__num">{String(index + 1).padStart(2, '0')}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* ---- Process ---- */}
      <section className="svc-section svc-section--alt">
        <motion.div
          className="svc-section__head"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={stagger}
        >
          <motion.span className="svc-eyebrow" variants={reveal}>
            Our process
          </motion.span>
          <motion.h2 className="svc-section__title" variants={reveal}>
            A clear path from idea to impact.
          </motion.h2>
        </motion.div>
        <motion.ol
          className="svc-process"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          {detail.process.map((step, index) => (
            <motion.li className="svc-step" key={step.title} variants={reveal}>
              <div className="svc-step__num">{index + 1}</div>
              <div className="svc-step__body">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </section>

      {/* ---- Benefits ---- */}
      <section className="svc-section">
        <motion.div
          className="svc-section__head"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={stagger}
        >
          <motion.span className="svc-eyebrow" variants={reveal}>
            Benefits
          </motion.span>
          <motion.h2 className="svc-section__title" variants={reveal}>
            Why it’s worth it.
          </motion.h2>
        </motion.div>
        <motion.div
          className="svc-benefits"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {detail.benefits.map((benefit) => (
            <motion.div className="svc-benefit" key={benefit.title} variants={reveal}>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---- Highlights ---- */}
      <section className="svc-section svc-section--alt">
        <motion.div
          className="svc-section__head"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={stagger}
        >
          <motion.span className="svc-eyebrow" variants={reveal}>
            Selected work
          </motion.span>
          <motion.h2 className="svc-section__title" variants={reveal}>
            Highlights from recent projects.
          </motion.h2>
        </motion.div>
        <motion.div
          className="svc-highlights"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {detail.highlights.map((highlight) => (
            <motion.div className="svc-highlight" key={highlight.title} variants={reveal}>
              <span className="svc-highlight__cat">{highlight.category}</span>
              <h3 className="svc-highlight__title">{highlight.title}</h3>
              <span className="svc-highlight__arrow" aria-hidden="true">
                ↗
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---- Why choose us ---- */}
      <section className="svc-section">
        <motion.div
          className="svc-section__head"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={stagger}
        >
          <motion.span className="svc-eyebrow" variants={reveal}>
            Why CrevoPro
          </motion.span>
          <motion.h2 className="svc-section__title" variants={reveal}>
            A partner that delivers.
          </motion.h2>
        </motion.div>
        <motion.div
          className="svc-why"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {detail.whyChooseUs.map((item) => (
            <motion.div className="svc-why__item" key={item.title} variants={reveal}>
              <span className="svc-why__check" aria-hidden="true">
                ✓
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ---- FAQ ---- */}
      <section className="svc-section svc-section--alt">
        <motion.div
          className="svc-section__head"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={stagger}
        >
          <motion.span className="svc-eyebrow" variants={reveal}>
            FAQs
          </motion.span>
          <motion.h2 className="svc-section__title" variants={reveal}>
            Questions, answered.
          </motion.h2>
        </motion.div>
        <motion.div
          className="svc-faq"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          {detail.faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </section>

      {/* ---- CTA ---- */}
      <section className="svc-cta">
        <motion.div
          className="svc-cta__inner"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="svc-cta__heading">{detail.ctaHeading}</h2>
          <p className="svc-cta__text">{detail.ctaText}</p>
          <Link to="/#contact" className="svc-btn svc-btn--primary svc-btn--lg">
            Book a free consultation
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
