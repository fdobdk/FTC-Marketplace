import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, Github, Heart } from 'lucide-react'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <div className="logo-icon">
                <Package size={24} />
              </div>
              <span className="logo-text">
                FTC<span className="logo-accent">Market</span>
              </span>
            </Link>
            <p className="footer-desc">
              Connecting FTC teams to share parts, build robots, and strengthen the community.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <h4>Marketplace</h4>
              <Link to="/listings">Browse Parts</Link>
              <Link to="/listings?type=have">Available Parts</Link>
              <Link to="/listings?type=want">Wanted Parts</Link>
            </div>
            <div className="footer-col">
              <h4>Community</h4>
              <Link to="/teams">Find Teams</Link>
              <Link to="/teams/create">Register Team</Link>
            </div>
            <div className="footer-col">
              <h4>Account</h4>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign Up</Link>
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className="footer-col">
              <h4>Contact Us</h4>
              <Link to="/ContactPage">Send us a message</Link>
            </div>
          </div>
        </div>

        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="copyright">
            {currentYear} FTC Marketplace. Made with{' '}
            <Heart size={14} className="heart-icon" /> for the FTC community.
          </p>
          <p className="disclaimer">
            Not affiliated with FIRST. This is a community project.
          </p>
        </motion.div>
      </div>

      <style>{`
        .footer {
          background: var(--secondary);
          border-top: 1px solid var(--border-color);
          padding: 60px 24px 30px;
          margin-top: 80px;
        }

        .footer-container {
          max-width: 1280px;
          margin: 0 auto;
        }

        .footer-main {
          display: grid;
          grid-template-columns: 1.5fr 2fr;
          gap: 60px;
          padding-bottom: 40px;
          border-bottom: 1px solid var(--border-color);
        }

        .footer-brand {
          max-width: 300px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          margin-bottom: 16px;
        }

        .footer-logo .logo-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius-sm);
          color: white;
        }

        .footer-logo .logo-text {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
        }

        .footer-logo .logo-accent {
          color: var(--primary);
        }

        .footer-desc {
          color: var(--text-secondary);
          font-size: 14px;
          line-height: 1.7;
        }

        .footer-links {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .footer-col h4 {
          font-size: 14px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .footer-col a {
          display: block;
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 10px;
          transition: color var(--transition-fast);
        }

        .footer-col a:hover {
          color: var(--primary);
        }

        .footer-bottom {
          padding-top: 30px;
          text-align: center;
        }

        .copyright {
          font-size: 14px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .heart-icon {
          color: #ff4444;
          animation: pulse 1.5s infinite;
        }

        .disclaimer {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 8px;
        }

        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .footer-links {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 480px) {
          .footer-links {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer
