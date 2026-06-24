import { useRef, useState } from 'react';
import type { ChangeEvent, CSSProperties, FormEvent } from 'react';
import { motion } from 'framer-motion';

import astronautImage from '@/assets/contactImage.svg';
import { submitLead } from '@/lib/api';

interface ContactFormData {
  fullName: string;
  brandName: string;
  email: string;
  contactNumber: string;
  query: string;
}

const initialFormData: ContactFormData = {
  fullName: '',
  brandName: '',
  email: '',
  contactNumber: '',
  query: '',
};

type SubmitState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success' }
  | { status: 'error'; message: string };

// Visually hidden honeypot — off-screen, not announced, skipped by tab order.
const honeypotStyle: CSSProperties = {
  position: 'absolute',
  left: '-9999px',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
};

export default function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [honeypot, setHoneypot] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });
  const formLoadedAt = useRef<number>(Date.now());

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState.status === 'submitting') return;

    setSubmitState({ status: 'submitting' });
    try {
      await submitLead({
        name: formData.fullName,
        brandName: formData.brandName,
        email: formData.email,
        phone: formData.contactNumber,
        message: formData.query,
        sourcePage: window.location.pathname,
        company_website: honeypot,
        formLoadedAt: formLoadedAt.current,
      });
      setSubmitState({ status: 'success' });
      setFormData(initialFormData);
    } catch (error) {
      setSubmitState({
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Something went wrong. Please try again or email infocrevopro@gmail.com.',
      });
    }
  };

  const isSubmitting = submitState.status === 'submitting';

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-wrapper">
          <motion.div
            className="contact-left"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="contact-title">Book an appointment</h2>
            <p className="contact-subtitle">
              now and get a free consultation with top creative and digital experts.
            </p>
            <p className="contact-text">
              From design to marketing, web, or e-commerce –
              <span className="brand-highlight">Crevopro</span> helps elevate your brand.
            </p>

            <div className="contact-image-container">
              <img src={astronautImage} alt="Creative Astronaut" className="contact-image" />
            </div>
          </motion.div>

          <motion.div
            className="contact-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="collaborate-title">Let's Collaborate</h2>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="brandName"
                  placeholder="Brand Name"
                  value={formData.brandName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="contactNumber"
                  placeholder="Contact Number"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="query"
                  placeholder="FAQ query"
                  value={formData.query}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Honeypot: hidden from users, attractive to bots. */}
              <input
                type="text"
                name="company_website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={honeypotStyle}
                value={honeypot}
                onChange={(event) => setHoneypot(event.target.value)}
              />

              <button type="submit" className="submit-button" disabled={isSubmitting}>
                {isSubmitting ? 'Sending…' : 'Submit Now'}
              </button>

              {submitState.status === 'success' && (
                <p className="form-status form-status--success" role="status">
                  Thanks! Your enquiry has been received — we'll be in touch shortly.
                </p>
              )}
              {submitState.status === 'error' && (
                <p className="form-status form-status--error" role="alert">
                  {submitState.message}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
