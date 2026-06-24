import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { testimonials } from '@/data/testimonials';

export default function Testimonial() {
  const swiperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!swiperRef.current) {
      return;
    }

    const swiper = new Swiper(swiperRef.current, {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
    });

    return () => {
      swiper.destroy();
    };
  }, []);

  return (
    <section id="testimonials" className="testimonials">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Client Feedback
        </motion.h2>

        <div className="testimonial-slider">
          <div className="swiper-container" ref={swiperRef}>
            <div className="swiper-wrapper">
              {testimonials.map((testimonial) => (
                <div className="swiper-slide" key={testimonial.id}>
                  <div className="testimonial-card">
                    <div className="testimonial-client">
                      <div className="client-logo">
                        <img src={testimonial.companyLogo} alt={`${testimonial.name} logo`} />
                      </div>
                    </div>
                    <div className="testimonial-content">
                      <p>{testimonial.quote}</p>
                      <div className="client-info">
                        <h4>{testimonial.name}</h4>
                        <p>
                          {Array.from({ length: testimonial.rating }).map((_, index) => (
                            <span key={index} className="star">
                              ★
                            </span>
                          ))}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
