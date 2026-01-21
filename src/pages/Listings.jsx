import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Package, MapPin, Clock, ChevronDown, X, Plus } from 'lucide-react'
import { US_STATES, CATEGORIES } from '../utils/states'
import api from '../utils/api'
import ListingCard from '../components/ListingCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { useAuth } from '../context/AuthContext'

function Listings() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const { isAuthenticated } = useAuth()

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    type: searchParams.get('type') || '',
    category: searchParams.get('category') || '',
    state: searchParams.get('state') || ''
  })

  useEffect(() => {
    fetchListings()
  }, [searchParams])

  const fetchListings = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.search) params.append('search', filters.search)
      if (filters.type) params.append('type', filters.type)
      if (filters.category) params.append('category', filters.category)
      if (filters.state) params.append('state', filters.state)

      const response = await api.get(`/listings/index.php?${params.toString()}`)
      setListings(response.data.listings || [])
    } catch (error) {
      console.error('Error fetching listings:', error)
      // For demo, use mock data
      setListings(getMockListings())
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)

    const params = new URLSearchParams()
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v)
    })
    setSearchParams(params)
  }

  const clearFilters = () => {
    setFilters({ search: '', type: '', category: '', state: '' })
    setSearchParams({})
  }

  const hasActiveFilters = filters.type || filters.category || filters.state

  return (
    <div className="listings-page">
      <div className="container">
        {/* Header */}
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header-content">
            <h1>Browse Parts</h1>
            <p>Find the parts you need from teams near you</p>
          </div>
          {isAuthenticated && (
            <Link to="/listings/create" className="btn btn-primary">
              <Plus size={18} />
              Post Listing
            </Link>
          )}
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          className="filters-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              placeholder="Search parts..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="search-input"
            />
          </div>

          <button
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            Filters
            {hasActiveFilters && <span className="filter-count">!</span>}
            <ChevronDown size={18} className={showFilters ? 'rotate' : ''} />
          </button>
        </motion.div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="filters-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="filters-grid">
                <div className="filter-group">
                  <label>Type</label>
                  <select
                    value={filters.type}
                    onChange={(e) => handleFilterChange('type', e.target.value)}
                    className="form-select"
                  >
                    <option value="">All Types</option>
                    <option value="have">Have (Offering)</option>
                    <option value="want">Want (Looking For)</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="form-select"
                  >
                    <option value="">All Categories</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>State</label>
                  <select
                    value={filters.state}
                    onChange={(e) => handleFilterChange('state', e.target.value)}
                    className="form-select"
                  >
                    <option value="">All States</option>
                    {US_STATES.map(state => (
                      <option key={state.value} value={state.value}>{state.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {hasActiveFilters && (
                <button className="clear-filters" onClick={clearFilters}>
                  <X size={16} />
                  Clear All Filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <div className="listings-results">
          {loading ? (
            <LoadingSpinner />
          ) : listings.length === 0 ? (
            <motion.div
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Package size={48} />
              <h3>No Listings Found</h3>
              <p>Try adjusting your filters or search terms</p>
            </motion.div>
          ) : (
            <motion.div
              className="listings-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {listings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ListingCard listing={listing} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        .listings-page {
          padding: 40px 0 80px;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32px;
        }

        .header-content h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .header-content p {
          color: var(--text-secondary);
        }

        .filters-section {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
        }

        .search-bar {
          flex: 1;
          position: relative;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          font-size: 15px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary);
        }

        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 14px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .filter-toggle:hover,
        .filter-toggle.active {
          border-color: var(--primary);
          color: var(--primary);
        }

        .filter-toggle .rotate {
          transform: rotate(180deg);
        }

        .filter-count {
          width: 8px;
          height: 8px;
          background: var(--primary);
          border-radius: 50%;
        }

        .filters-panel {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
          margin-bottom: 24px;
          overflow: hidden;
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .filter-group label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 8px;
        }

        .clear-filters {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 20px;
          padding: 8px 16px;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-size: 13px;
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .clear-filters:hover {
          color: var(--primary);
        }

        .listings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .no-results {
          text-align: center;
          padding: 80px 20px;
          color: var(--text-secondary);
        }

        .no-results svg {
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .no-results h3 {
          font-size: 20px;
          margin-bottom: 8px;
          color: var(--text-primary);
        }

        @media (max-width: 900px) {
          .listings-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .filters-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .filters-section {
            flex-direction: column;
          }

          .listings-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

// Mock data for development
function getMockListings() {
  return [
    {
      id: 1,
      title: 'REV Robotics HD Hex Motor',
      type: 'have',
      category: 'motors',
      condition: 'like-new',
      quantity: 2,
      payment_type: 'either',
      description: 'Barely used HD Hex motors from last season. Work perfectly.',
      team_number: '12345',
      team_name: 'TechBots',
      state: 'CA',
      city: 'San Jose',
      primary_image: null,
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Looking for GoBuilda Wheels',
      type: 'want',
      category: 'drivetrain',
      payment_type: 'cash',
      description: 'Need 4x 96mm mecanum wheels for our drivetrain.',
      team_number: '67890',
      team_name: 'RoboWarriors',
      state: 'TX',
      city: 'Austin',
      primary_image: null,
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      title: 'Color Sensor V3',
      type: 'have',
      category: 'sensors',
      condition: 'good',
      quantity: 1,
      payment_type: 'trade',
      description: 'REV Color Sensor V3, tested and working.',
      team_number: '11111',
      team_name: 'Circuit Breakers',
      state: 'NY',
      city: 'Buffalo',
      primary_image: null,
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      title: 'Aluminum Extrusion 40x40',
      type: 'have',
      category: 'structural',
      condition: 'new',
      quantity: 10,
      payment_type: 'cash',
      description: '10 pieces of 500mm aluminum extrusion, never used.',
      team_number: '22222',
      team_name: 'Metal Minds',
      state: 'WA',
      city: 'Seattle',
      primary_image: null,
      created_at: new Date().toISOString()
    },
    {
      id: 5,
      title: 'Need Control Hub',
      type: 'want',
      category: 'control',
      payment_type: 'either',
      description: 'Looking for a REV Control Hub, new or used.',
      team_number: '33333',
      team_name: 'Byte Force',
      state: 'FL',
      city: 'Miami',
      primary_image: null,
      created_at: new Date().toISOString()
    },
    {
      id: 6,
      title: 'Custom 3D Printed Claw',
      type: 'have',
      category: '3d-printed',
      condition: 'new',
      quantity: 1,
      payment_type: 'trade',
      description: 'Custom designed gripper claw, printed in PETG.',
      team_number: '44444',
      team_name: 'Print Squad',
      state: 'CO',
      city: 'Denver',
      primary_image: null,
      created_at: new Date().toISOString()
    }
  ]
}

export default Listings
