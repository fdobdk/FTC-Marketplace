import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Users, MapPin, Package, Plus } from 'lucide-react'
import { US_STATES } from '../utils/states'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [stateFilter, setStateFilter] = useState('')
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    fetchTeams()
  }, [stateFilter])

  const fetchTeams = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (stateFilter) params.append('state', stateFilter)

      const response = await api.get(`/teams/index.php?${params.toString()}`)
      setTeams(response.data.teams || [])
    } catch (error) {
      // Mock data for demo
      setTeams(getMockTeams())
    } finally {
      setLoading(false)
    }
  }

  const filteredTeams = teams.filter(team => {
    if (!search) return true
    const searchLower = search.toLowerCase()
    return (
      team.team_number.toString().includes(searchLower) ||
      team.name.toLowerCase().includes(searchLower) ||
      team.city?.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="teams-page">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header-content">
            <h1>FTC Teams</h1>
            <p>Find and connect with teams in your area</p>
          </div>
          {isAuthenticated && (
            <Link to="/teams/create" className="btn btn-primary">
              <Plus size={18} />
              Register Team
            </Link>
          )}
        </motion.div>

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
              placeholder="Search by team number, name, or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>

          <select
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value)}
            className="form-select state-filter"
          >
            <option value="">All States</option>
            {US_STATES.map(state => (
              <option key={state.value} value={state.value}>{state.label}</option>
            ))}
          </select>
        </motion.div>

        <div className="teams-results">
          {loading ? (
            <LoadingSpinner />
          ) : filteredTeams.length === 0 ? (
            <motion.div
              className="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Users size={48} />
              <h3>No Teams Found</h3>
              <p>Try adjusting your search or filters</p>
            </motion.div>
          ) : (
            <motion.div
              className="teams-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredTeams.map((team, index) => (
                <motion.div
                  key={team.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TeamCard team={team} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        .teams-page {
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
          margin-bottom: 32px;
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
        }

        .search-input:focus {
          outline: none;
          border-color: var(--primary);
        }

        .state-filter {
          width: 200px;
        }

        .teams-grid {
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
          .teams-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .filters-section {
            flex-direction: column;
          }

          .state-filter {
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
          }

          .teams-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

function TeamCard({ team }) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
      <Link to={`/teams/${team.id}`} className="team-card">
        <div className="team-header">
          <div className="team-icon">
            <Users size={24} />
          </div>
          <div className="team-number">#{team.team_number}</div>
        </div>

        <h3 className="team-name">{team.name}</h3>

        <div className="team-location">
          <MapPin size={14} />
          {team.city}, {team.state}
        </div>

        <div className="team-stats">
          <div className="stat">
            <Package size={14} />
            <span>{team.listings_count || 0} listings</span>
          </div>
          <div className="stat">
            <Users size={14} />
            <span>{team.members_count || 1} members</span>
          </div>
        </div>

        <style>{`
          .team-card {
            display: block;
            padding: 24px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            text-decoration: none;
            color: inherit;
            transition: all var(--transition-base);
          }

          .team-card:hover {
            border-color: var(--primary);
            box-shadow: var(--shadow-glow);
          }

          .team-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 16px;
          }

          .team-icon {
            width: 48px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            border-radius: var(--radius-md);
            color: white;
          }

          .team-number {
            font-size: 14px;
            font-weight: 600;
            color: var(--primary);
          }

          .team-name {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
          }

          .team-location {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 14px;
            color: var(--text-secondary);
            margin-bottom: 16px;
          }

          .team-stats {
            display: flex;
            gap: 16px;
            padding-top: 16px;
            border-top: 1px solid var(--border-color);
          }

          .stat {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: var(--text-muted);
          }
        `}</style>
      </Link>
    </motion.div>
  )
}

function getMockTeams() {
  return [
    {
      id: 1,
      team_number: '12345',
      name: 'TechBots',
      city: 'San Jose',
      state: 'CA',
      listings_count: 5,
      members_count: 8
    },
    {
      id: 2,
      team_number: '67890',
      name: 'RoboWarriors',
      city: 'Austin',
      state: 'TX',
      listings_count: 3,
      members_count: 12
    },
    {
      id: 3,
      team_number: '11111',
      name: 'Circuit Breakers',
      city: 'Buffalo',
      state: 'NY',
      listings_count: 8,
      members_count: 6
    },
    {
      id: 4,
      team_number: '22222',
      name: 'Metal Minds',
      city: 'Seattle',
      state: 'WA',
      listings_count: 2,
      members_count: 10
    },
    {
      id: 5,
      team_number: '33333',
      name: 'Byte Force',
      city: 'Miami',
      state: 'FL',
      listings_count: 4,
      members_count: 7
    },
    {
      id: 6,
      team_number: '44444',
      name: 'Print Squad',
      city: 'Denver',
      state: 'CO',
      listings_count: 6,
      members_count: 9
    }
  ]
}

export default Teams
