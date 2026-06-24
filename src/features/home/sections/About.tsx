import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

import aboutImageBg from '@/assets/vikash-bg.webp';
import aboutImageFront from '@/assets/vikash.webp';
import { createStaggerContainer, fadeUpItem } from '@/lib/animations';

const containerVariants = createStaggerContainer(0.2, 0.3);

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
};

const frontImageVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
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
            className="about-images"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="about-image-bg" variants={imageVariants}>
              <img src={aboutImageBg} alt="About CrevoPro Background" />
            </motion.div>
            <motion.div className="about-image-front" variants={frontImageVariants}>
              <img src={aboutImageFront} alt="About CrevoPro" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
