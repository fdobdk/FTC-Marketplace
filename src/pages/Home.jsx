import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, Users, ArrowRight, Zap, Search, MessageCircle } from 'lucide-react'

function Home() {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const features = [
    {
      icon: Package,
      title: 'List Your Parts',
      description: 'Post parts you have available or parts you need.'
    },
    {
      icon: Search,
      title: 'Find What You Need',
      description: 'Search by category, description, or location. Filter to find exactly what your robot needs.'
    },
    {
      icon: MessageCircle,
      title: 'Connect & Trade',
      description: 'Contact teams directly to arrange trades, loans, or purchases. Build lasting relationships.'
    }
  ]

  const stats = [
    // { value: '500+', label: 'Active Teams' },
    // { value: '2,000+', label: 'Parts Listed' },
    // { value: '50', label: 'States' },
    { value: '100%', label: 'Free to Use' }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-grid" />
          <motion.div
            className="hero-orb orb-1"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="hero-orb orb-2"
            animate={{
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="hero-content container">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Zap size={14} />
            Built for FTC Teams by an FTC Team
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Connect Teams.
            <br />
            <span className="text-gradient">Share Parts.</span>
            <br />
            Build Together.
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            The marketplace where FTC teams find, trade, and share robot parts.
            Stop waiting for shipping - connect with nearby teams today.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/listings" className="btn btn-primary btn-lg">
              Browse Parts
              <ArrowRight size={20} />
            </Link>
            <Link to="/register" className="btn btn-secondary btn-lg">
              Register Your Team
            </Link>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-item"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <span className="stat-value">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2>How It Works</h2>
            <p>Get your robot built faster with parts from your community</p>
          </motion.div>

          <motion.div
            className="features-grid"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                variants={fadeInUp}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="feature-icon">
                  <feature.icon size={28} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="cta-content">
              <h2>Ready to Get Started?</h2>
              <p>
                Join hundreds of FTC teams already using the marketplace.
                Register your team and start connecting today.
              </p>
              <div className="cta-actions">
                <Link to="/register" className="btn btn-primary btn-lg">
                  Create Account
                  <ArrowRight size={20} />
                </Link>
                <Link to="/listings" className="btn btn-outline btn-lg">
                  View Listings
                </Link>
              </div>
            </div>
            <div className="cta-visual">
              <motion.div
                className="cta-icon-grid"
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="floating-icon"
                    style={{
                      transform: `rotate(${i * 45}deg) translateX(100px)`,
                    }}
                  >
                    <Package size={24} />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        .home {
          overflow: hidden;
        }

        /* Hero Section */
        .hero {
          position: relative;
          height: 100vh;
          min-height: 700px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: -80px;
          padding-top: 80px;
          box-sizing: border-box;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .hero-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at top, rgba(245, 124, 0, 0.15) 0%, transparent 60%);
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse at center, black 30%, transparent 70%);
        }

        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          top: 10%;
          right: 10%;
          background: rgba(245, 124, 0, 0.2);
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          bottom: 20%;
          left: 5%;
          background: rgba(0, 212, 255, 0.1);
        }

        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(245, 124, 0, 0.1);
          border: 1px solid rgba(245, 124, 0, 0.3);
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: clamp(40px, 8vw, 72px);
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -2px;
          margin-bottom: 24px;
        }

        .hero-subtitle {
          font-size: 18px;
          color: var(--text-secondary);
          max-width: 600px;
          margin: 0 auto 40px;
          line-height: 1.7;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
          margin-top: 50px;
          padding-top: 30px;
          border-top: 1px solid var(--border-color);
        }

        .stat-item {
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 32px;
          font-weight: 800;
          color: var(--primary);
        }

        .stat-label {
          font-size: 14px;
          color: var(--text-secondary);
        }

        /* Features Section */
        .features-section {
          padding: 100px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-header h2 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .section-header p {
          font-size: 18px;
          color: var(--text-secondary);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .feature-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 32px;
          transition: all var(--transition-base);
        }

        .feature-card:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-glow);
        }

        .feature-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius-md);
          color: white;
          margin-bottom: 20px;
        }

        .feature-card h3 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .feature-card p {
          font-size: 15px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* CTA Section */
        .cta-section {
          padding: 60px 0 100px;
        }

        .cta-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          background: linear-gradient(135deg, var(--secondary) 0%, var(--secondary-light) 100%);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 60px;
          position: relative;
          overflow: hidden;
        }

        .cta-content h2 {
          font-size: 36px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .cta-content p {
          font-size: 16px;
          color: var(--text-secondary);
          margin-bottom: 32px;
          line-height: 1.7;
        }

        .cta-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .cta-visual {
          position: relative;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cta-icon-grid {
          position: relative;
          width: 200px;
          height: 200px;
        }

        .floating-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--primary);
        }

        @media (max-width: 900px) {
          .features-grid {
            grid-template-columns: 1fr;
          }

          .cta-card {
            grid-template-columns: 1fr;
            padding: 40px;
          }

          .cta-visual {
            display: none;
          }

          .hero-stats {
            gap: 24px;
            flex-wrap: wrap;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            letter-spacing: -1px;
          }

          .hero-actions {
            flex-direction: column;
            width: 100%;
          }

          .hero-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default Home
