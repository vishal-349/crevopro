import { useRef, useState } from 'react';
import type { ChangeEvent, CSSProperties, FocusEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';

import astronautImage from '@/assets/contactImage.svg';
import { submitLead } from '@/lib/api';

type FieldName = 'fullName' | 'brandName' | 'email' | 'contactNumber' | 'query';
type ContactFormData = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const initialFormData: ContactFormData = {
  fullName: '',
  brandName: '',
  email: '',
  contactNumber: '+91 ',
  query: '',
};

const FIELDS: { name: FieldName; type: string; label: string }[] = [
  { name: 'fullName', type: 'text', label: 'Full Name' },
  { name: 'brandName', type: 'text', label: 'Brand Name' },
  { name: 'email', type: 'email', label: 'Email' },
  { name: 'contactNumber', type: 'tel', label: 'Contact Number' },
  { name: 'query', type: 'text', label: 'FAQ query' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s\-()]{6,19}$/;

function validateField(name: FieldName, value: string): string {
  const v = value.trim();
  switch (name) {
    case 'fullName':
      return v.length >= 2 ? '' : 'Please enter your name.';
    case 'brandName':
      return v.length >= 1 ? '' : 'Please enter your brand name.';
    case 'email':
      return EMAIL_RE.test(v) ? '' : 'Please enter a valid email address.';
    case 'contactNumber':
      return PHONE_RE.test(v) ? '' : 'Please enter a valid phone number.';
    case 'query':
      return v.length >= 1 ? '' : 'Please enter your query.';
  }
}

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
  const [errors, setErrors] = useState<Errors>({});
  const [honeypot, setHoneypot] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>({ status: 'idle' });
  const formLoadedAt = useRef<number>(Date.now());

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as FieldName;
    const { value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear the error the moment the field becomes valid.
    setErrors((prev) => {
      if (!prev[name]) return prev;
      if (validateField(name, value)) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    const name = event.target.name as FieldName;
    const message = validateField(name, event.target.value);
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  };

  const validateAll = (): boolean => {
    const next: Errors = {};
    for (const { name } of FIELDS) {
      const message = validateField(name, formData[name]);
      if (message) next[name] = message;
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState.status === 'submitting') return;
    if (!validateAll()) return;

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
      setErrors({});
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
              {FIELDS.map(({ name, type, label }) => (
                <div className="form-group" key={name}>
                  <input
                    id={`contact-${name}`}
                    name={name}
                    type={type}
                    placeholder=" "
                    value={formData[name]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors[name] ? 'has-error' : ''}
                    aria-invalid={errors[name] ? true : undefined}
                    aria-describedby={errors[name] ? `${name}-error` : undefined}
                  />
                  <label htmlFor={`contact-${name}`}>{label}</label>
                  {errors[name] && (
                    <span id={`${name}-error`} className="field-error" role="alert">
                      {errors[name]}
                    </span>
                  )}
                </div>
              ))}

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
