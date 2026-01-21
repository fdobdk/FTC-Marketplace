import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Package, Users, LogIn, LogOut, User, Plus, LayoutDashboard, Shield, Sun, Moon, ChevronDown, Edit3 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, team, logout, isAuthenticated } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const userMenuRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setIsUserMenuOpen(false)
  }, [location])

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Main navigation links (shown in navbar)
  const mainNavLinks = isAuthenticated ? [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/listings', label: 'Browse', icon: Package },
    { to: '/listings/create', label: 'Post', icon: Plus },
    { to: '/teams', label: 'Teams', icon: Users },
  ] : []

  // Links for non-authenticated users
  const guestLinks = [
    { to: '/login', label: 'Login', icon: LogIn },
    { to: '/register', label: 'Sign Up', icon: User },
  ]

  // Mobile menu includes all links
  const mobileLinks = isAuthenticated ? [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/listings', label: 'Browse Parts', icon: Package },
    { to: '/listings/create', label: 'Post Listing', icon: Plus },
    { to: '/teams', label: 'Teams', icon: Users },
    { to: '/profile', label: 'Profile', icon: User },
    ...(team ? [{ to: `/teams/${team.id}/edit`, label: 'Edit Team', icon: Edit3 }] : []),
    ...(user?.is_site_admin ? [{ to: '/admin', label: 'Admin Panel', icon: Shield }] : []),
  ] : guestLinks

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        <Link to="/" className="logo">
          <span className="logo-text">
            FTC<span className="logo-accent">Market</span>
          </span>
        </Link>

        {/* Main Nav Links - Desktop */}
        <div className="nav-links desktop-only">
          {mainNavLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
            >
              <link.icon size={18} />
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side - Desktop */}
        <div className="nav-actions desktop-only">
          {!isAuthenticated ? (
            // Guest links
            guestLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                <link.icon size={18} />
                {link.label}
              </Link>
            ))
          ) : (
            // User dropdown menu
            <div className="user-menu-wrapper" ref={userMenuRef}>
              <button
                className={`user-menu-trigger ${isUserMenuOpen ? 'open' : ''}`}
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              >
                <div className="user-avatar">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <span className="user-name">{user?.name?.split(' ')[0] || 'User'}</span>
                <ChevronDown size={16} className={`chevron ${isUserMenuOpen ? 'rotated' : ''}`} />
              </button>

              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    className="user-dropdown"
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                  >
                    <div className="dropdown-header">
                      <span className="dropdown-name">{user?.name}</span>
                      {team && <span className="dropdown-team">Team {team.team_number}</span>}
                    </div>

                    <div className="dropdown-divider" />

                    <Link to="/profile" className="dropdown-item">
                      <User size={16} />
                      Profile
                    </Link>

                    {team && (
                      <Link to={`/teams/${team.id}/edit`} className="dropdown-item">
                        <Edit3 size={16} />
                        Edit Team
                      </Link>
                    )}

                    {user?.is_site_admin && (
                      <Link to="/admin" className="dropdown-item">
                        <Shield size={16} />
                        Admin Panel
                      </Link>
                    )}

                    <div className="dropdown-divider" />

                    <button className="dropdown-item theme-item" onClick={toggleTheme}>
                      {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                      <span className="theme-badge">{theme === 'dark' ? 'Dark' : 'Light'}</span>
                    </button>

                    <div className="dropdown-divider" />

                    <button className="dropdown-item logout-item" onClick={logout}>
                      <LogOut size={16} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Theme toggle for guests */}
          {!isAuthenticated && (
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn mobile-only"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {mobileLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={link.to} className="mobile-link">
                  <link.icon size={20} />
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <div className="mobile-divider" />

            <motion.button
              onClick={toggleTheme}
              className="mobile-link"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: mobileLinks.length * 0.05 }}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </motion.button>

            {isAuthenticated && (
              <motion.button
                onClick={logout}
                className="mobile-link logout-btn"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: (mobileLinks.length + 1) * 0.05 }}
              >
                <LogOut size={20} />
                Logout
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: var(--navbar-bg);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid transparent;
          transition: all var(--transition-base);
        }

        .navbar.scrolled {
          background: var(--navbar-bg);
          border-bottom-color: var(--border-color);
          box-shadow: var(--shadow-md);
        }

        .navbar-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 12px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
        }

        .logo-text {
          font-size: 20px;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.5px;
        }

        .logo-accent {
          color: var(--primary);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
          background: none;
          border: none;
          cursor: pointer;
        }

        .nav-link:hover {
          color: var(--text-primary);
          background: var(--bg-card);
        }

        .nav-link.active {
          color: var(--primary);
          background: rgba(245, 124, 0, 0.1);
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* User Menu */
        .user-menu-wrapper {
          position: relative;
        }

        .user-menu-trigger {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 12px 6px 6px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          color: var(--text-primary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .user-menu-trigger:hover,
        .user-menu-trigger.open {
          border-color: var(--border-light);
          background: var(--bg-card-hover);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius-md);
          color: white;
          font-size: 14px;
          font-weight: 600;
        }

        .user-name {
          font-size: 14px;
          font-weight: 500;
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .chevron {
          color: var(--text-muted);
          transition: transform var(--transition-fast);
        }

        .chevron.rotated {
          transform: rotate(180deg);
        }

        .user-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 220px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          z-index: 100;
        }

        .dropdown-header {
          padding: 14px 16px;
          background: var(--bg-dark);
        }

        .dropdown-name {
          display: block;
          font-weight: 600;
          font-size: 14px;
          color: var(--text-primary);
        }

        .dropdown-team {
          display: block;
          font-size: 12px;
          color: var(--primary);
          margin-top: 2px;
        }

        .dropdown-divider {
          height: 1px;
          background: var(--border-color);
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 12px 16px;
          font-size: 14px;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: all var(--transition-fast);
        }

        .dropdown-item:hover {
          background: var(--bg-dark);
          color: var(--text-primary);
        }

        .dropdown-item.theme-item {
          position: relative;
        }

        .theme-badge {
          margin-left: auto;
          padding: 2px 8px;
          font-size: 11px;
          background: var(--bg-dark);
          border-radius: 10px;
          color: var(--text-muted);
        }

        .dropdown-item.logout-item:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        /* Theme Toggle for Guests */
        .theme-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .theme-toggle:hover {
          color: var(--primary);
          border-color: var(--primary);
          background: rgba(245, 124, 0, 0.1);
        }

        /* Mobile */
        .mobile-menu-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          cursor: pointer;
        }

        .mobile-menu {
          overflow: hidden;
          padding: 12px 24px 16px;
          border-top: 1px solid var(--border-color);
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          font-size: 15px;
          font-weight: 500;
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: var(--radius-md);
          margin-bottom: 2px;
          background: none;
          border: none;
          width: 100%;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .mobile-link:hover {
          color: var(--text-primary);
          background: var(--bg-card);
        }

        .mobile-divider {
          height: 1px;
          background: var(--border-color);
          margin: 8px 0;
        }

        .mobile-link.logout-btn:hover {
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .desktop-only {
          display: flex;
        }

        .mobile-only {
          display: none;
        }

        @media (max-width: 900px) {
          .desktop-only {
            display: none;
          }

          .mobile-only {
            display: flex;
          }

          .mobile-menu-btn {
            display: flex;
          }
        }
      `}</style>
    </motion.nav>
  )
}

export default Navbar
