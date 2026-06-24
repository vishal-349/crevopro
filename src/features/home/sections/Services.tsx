import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { services } from '@/data/services';
import type { Service } from '@/types/content';
import { createStaggerContainer, fadeUpItem } from '@/lib/animations';

const containerVariants = createStaggerContainer(0.2, 0.3);
const MotionLink = motion.create(Link);

function ServiceCard({ service }: { service: Service }) {
  return (
    <MotionLink
      to={`/services/${service.slug}`}
      className="service-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="service-icon">
        <img src={service.icon} alt={service.title} />
      </div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-description">{service.description}</p>
      <span className="service-link">
        <span>Learn More</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
          />
        </svg>
      </span>
    </MotionLink>
  );
}

export default function Services() {
  return (
    <section id="services" className="services section-padding">
      <div className="services-container">
        <motion.div
          className="services-header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 variants={fadeUpItem} className="section-title">
            Our Services
          </motion.h2>
          <motion.p variants={fadeUpItem} className="section-subtitle">
            We provide a wide range of creative services
          </motion.p>
        </motion.div>

        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
