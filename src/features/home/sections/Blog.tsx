import { motion } from 'framer-motion';

import { blogPosts } from '@/data/blog';

export default function Blog() {
  return (
    <section id="blog" className="blog">
      <div className="container">
        <motion.div
          className="blog-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">CrevoPro Blogs</h2>
          <p className="section-subtitle">
            We educate before we execute — explore insights that empower your brand.
          </p>
        </motion.div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <motion.div
              key={post.id}
              className="blog-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: post.id * 0.1 }}
            >
              <div className="blog-img">
                <img src={post.image} alt={post.title} />
                <div className="blog-overlay"></div>
              </div>
              <div className="blog-content">
                <h3 className="blog-title">{post.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
