import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { pricingGroups } from '@/data/pricing';
import type { PriceGroup, PricePackage } from '@/types/content';
import './pricing.scss';

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const CheckIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
    <path
      d="M13.5 4.5 6.5 11.5 2.5 7.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function PackageCard({ pkg }: { pkg: PricePackage }) {
  return (
    <motion.article
      className={`price-card${pkg.featured ? ' price-card--featured' : ''}`}
      variants={reveal}
    >
      {pkg.featured && <span className="price-card__badge">Recommended</span>}

      <h3 className="price-card__name">{pkg.name}</h3>

      <p className="price-card__price">
        <span className="price-card__figure">{pkg.price}</span>
        {pkg.unit && <span className="price-card__unit">{pkg.unit}</span>}
      </p>

      {pkg.description && <p className="price-card__desc">{pkg.description}</p>}

      <ul className="price-card__features">
        {pkg.features.map((feature) => (
          <li key={feature}>
            <CheckIcon />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {pkg.panels && (
        <div className="price-card__panels">
          <p className="price-card__panels-label">{pkg.panels.label}</p>
          <ul>
            {pkg.panels.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {pkg.note && <p className="price-card__note">{pkg.note}</p>}

      <Link to="/#contact" className="price-card__cta">
        Get a quote
      </Link>
    </motion.article>
  );
}

function GroupSection({ group }: { group: PriceGroup }) {
  const count = group.packages?.length ?? 0;
  // tables and the terms block share one grid, so a lone table sits beside terms
  const blockCount = (group.tables?.length ?? 0) + (group.terms ? 1 : 0);

  return (
    <section className="price-group" id={group.id}>
      <motion.header
        className="price-group__head"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        variants={stagger}
      >
        <motion.span className="price-group__eyebrow" variants={reveal}>
          {group.eyebrow}
        </motion.span>
        <motion.h2 className="price-group__title" variants={reveal}>
          {group.title}
        </motion.h2>
        {group.intro && (
          <motion.p className="price-group__intro" variants={reveal}>
            {group.intro}
          </motion.p>
        )}
      </motion.header>

      {count > 0 && (
        <motion.div
          className={`price-grid price-grid--${count}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          variants={stagger}
        >
          {group.packages?.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </motion.div>
      )}

      {group.comparison && (
        <motion.div
          className="price-compare"
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.05 }}
          variants={reveal}
        >
          <h3 className="price-compare__heading">{group.comparison.heading}</h3>
          <div className="price-compare__scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr-only">Feature</span>
                  </th>
                  {group.comparison.columns.map((col) => (
                    <th scope="col" key={col}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {group.comparison.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((value, index) => (
                      <td key={`${row.label}-${group.comparison?.columns[index] ?? index}`}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {(group.tables || group.terms) && (
        <motion.div
          className={`price-tables price-tables--${blockCount}`}
          initial="hidden"
          whileInView="visible"
          // no `once`: re-evaluates on every intersection change so a deep-link
          // jump that lands on a table can never leave the prices invisible
          viewport={{ amount: 0.05 }}
          variants={stagger}
        >
          {group.tables?.map((table) => (
            <motion.div className="price-table" key={table.label} variants={reveal}>
              <h3 className="price-table__label">{table.label}</h3>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col">Starting From</th>
                  </tr>
                </thead>
                <tbody>
                  {table.items.map((item) => (
                    <tr key={item.label}>
                      <th scope="row">{item.label}</th>
                      <td>{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {table.note && <p className="price-table__note">{table.note}</p>}
            </motion.div>
          ))}

          {group.terms && (
            <motion.div className="price-terms" variants={reveal}>
              <h3 className="price-terms__label">Terms &amp; Conditions</h3>
              <ul>
                {group.terms.map((term) => (
                  <li key={term}>{term}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>
      )}
    </section>
  );
}

export default function PricingPage() {
  const reduce = useReducedMotion();
  const { hash } = useLocation();

  // Arriving at /pricing#ecommerce from the homepage teaser: scroll to the
  // group once it has mounted (sections animate in on scroll, so retry briefly).
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    let tries = 0;
    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else if (tries++ < 20) {
        window.setTimeout(tryScroll, 100);
      }
    };
    tryScroll();
  }, [hash]);

  return (
    <div className="pricing-page">
      <Navbar />

      <header className="pricing-hero">
        <div className="pricing-hero__glow" aria-hidden="true" />
        <motion.div
          className="pricing-hero__inner"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.span className="pricing-hero__eyebrow" variants={reveal}>
            Services &amp; Pricing
          </motion.span>
          <motion.h1 className="pricing-hero__title" variants={reveal}>
            Clear pricing, <span>no surprises</span>
          </motion.h1>
          <motion.p className="pricing-hero__lead" variants={reveal}>
            Starting rates for everything we build and run — websites, online stores, apps and
            always-on marketing. Tell us the scope and we will send a fixed quote.
          </motion.p>

          <motion.nav className="pricing-hero__jump" variants={reveal} aria-label="Jump to section">
            {pricingGroups.map((group) => (
              <a key={group.id} href={`#${group.id}`}>
                {group.eyebrow}
              </a>
            ))}
          </motion.nav>
        </motion.div>
      </header>

      <main className="pricing-body">
        {pricingGroups.map((group) => (
          <GroupSection key={group.id} group={group} />
        ))}

        <motion.section
          className="pricing-cta"
          initial={reduce ? undefined : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={reveal}
        >
          <h2>Not sure which package fits?</h2>
          <p>
            Send us your requirements and we will recommend the right scope — and share the detailed
            rate card for design, branding and add-on services.
          </p>
          <div className="pricing-cta__actions">
            <Link to="/#contact" className="pricing-btn pricing-btn--primary">
              Talk to us
            </Link>
            <Link to="/#services" className="pricing-btn pricing-btn--ghost">
              Explore services
            </Link>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
