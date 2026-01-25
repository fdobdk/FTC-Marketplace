import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Search, Plus, MapPin, AlertCircle, CheckCircle, UserPlus } from 'lucide-react'
import { US_STATES } from '../utils/states'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

function JoinTeam() {
  const navigate = useNavigate()
  const { updateTeam } = useAuth()
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [stateFilter, setStateFilter] = useState('')

  useEffect(() => {
    fetchTeams()
  }, [stateFilter])

  const fetchTeams = async () => {
    try {
      const params = new URLSearchParams()
      if (stateFilter) params.append('state', stateFilter)
      if (searchQuery) params.append('search', searchQuery)

      const response = await api.get(`/teams/index.php?${params}`)
      setTeams(response.data.teams || [])
    } catch (err) {
      console.error('Failed to fetch teams:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchTeams()
  }

  const handleJoinTeam = async (teamId, teamNumber) => {
    setJoining(teamId)
    setError('')
    setSuccess('')

    try {
      const response = await api.post('/teams/join.php', { team_id: teamId })
      setSuccess(`Successfully joined Team ${teamNumber}!`)
      updateTeam(response.data.team)
      setTimeout(() => {
        navigate(`/teams/${teamId}`)
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to join team')
    } finally {
      setJoining(null)
    }
  }

  const filteredTeams = teams.filter(team => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      team.team_number.toLowerCase().includes(query) ||
      team.name.toLowerCase().includes(query) ||
      team.city.toLowerCase().includes(query)
    )
  })

  return (
    <div className="join-team">
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="header-icon">
            <Users size={28} />
          </div>
          <h1>Join a Team</h1>
          <p>Find your FTC team and join to start collaborating</p>
        </motion.div>

        {error && (
          <motion.div
            className="message error-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        {success && (
          <motion.div
            className="message success-message"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle size={18} />
            {success}
          </motion.div>
        )}

        <motion.div
          className="search-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <Search size={20} />
              <input
                type="text"
                placeholder="Search by team number, name, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="state-filter"
            >
              <option value="">All States</option>
              {US_STATES.map(state => (
                <option key={state.value} value={state.value}>{state.label}</option>
              ))}
            </select>
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </motion.div>

        <motion.div
          className="create-team-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="cta-content">
            <h3>Don't see your team?</h3>
            <p>If your team isn't registered yet, you can create it</p>
          </div>
          <Link to="/teams/create" className="btn btn-secondary">
            <Plus size={18} />
            Create New Team
          </Link>
        </motion.div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading teams...</p>
          </div>
        ) : filteredTeams.length === 0 ? (
          <motion.div
            className="empty-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Users size={48} />
            <h3>No teams found</h3>
            <p>Try adjusting your search or create a new team</p>
            <Link to="/teams/create" className="btn btn-primary">
              <Plus size={18} />
              Create Team
            </Link>
          </motion.div>
        ) : (
          <motion.div
            className="teams-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {filteredTeams.map((team, index) => (
              <motion.div
                key={team.id}
                className="team-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="team-info">
                  <div className="team-number">#{team.team_number}</div>
                  <div className="team-details">
                    <h3>{team.name}</h3>
                    <div className="team-location">
                      <MapPin size={14} />
                      {team.city}, {team.state}
                    </div>
                    <div className="team-stats">
                      <span>{team.members_count || 0} members</span>
                      <span>{team.listings_count || 0} listings</span>
                    </div>
                  </div>
                </div>
                <button
                  className="btn btn-primary join-btn"
                  onClick={() => handleJoinTeam(team.id, team.team_number)}
                  disabled={joining === team.id}
                >
                  {joining === team.id ? (
                    'Joining...'
                  ) : (
                    <>
                      <UserPlus size={16} />
                      Join Team
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <style>{`
        .join-team {
          padding: 40px 0 80px;
        }

        .page-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .header-icon {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius-lg);
          color: white;
          margin: 0 auto 20px;
        }

        .page-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .page-header p {
          color: var(--text-secondary);
        }

        .message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-radius: var(--radius-md);
          font-size: 14px;
          margin-bottom: 24px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .error-message {
          background: rgba(255, 68, 68, 0.1);
          border: 1px solid rgba(255, 68, 68, 0.3);
          color: #ff6b6b;
        }

        .success-message {
          background: rgba(0, 200, 83, 0.1);
          border: 1px solid rgba(0, 200, 83, 0.3);
          color: #00c853;
        }

        .search-section {
          max-width: 800px;
          margin: 0 auto 24px;
        }

        .search-form {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .search-input-wrapper {
          flex: 1;
          min-width: 250px;
          position: relative;
        }

        .search-input-wrapper svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 44px;
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
          padding: 12px 16px;
          font-size: 15px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          min-width: 150px;
        }

        .create-team-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          margin-bottom: 32px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-content h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .cta-content p {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .loading-state {
          text-align: center;
          padding: 60px 20px;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid var(--border-color);
          border-top-color: var(--primary);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto 16px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
        }

        .empty-state svg {
          margin-bottom: 16px;
          opacity: 0.5;
        }

        .empty-state h3 {
          font-size: 18px;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .empty-state .btn {
          margin-top: 20px;
        }

        .teams-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .team-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          transition: all var(--transition-fast);
        }

        .team-card:hover {
          border-color: var(--border-light);
        }

        .team-info {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .team-number {
          font-size: 18px;
          font-weight: 700;
          color: var(--primary);
          min-width: 80px;
        }

        .team-details h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .team-location {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 4px;
        }

        .team-stats {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: var(--text-muted);
        }

        .join-btn {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        @media (max-width: 640px) {
          .search-form {
            flex-direction: column;
          }

          .state-filter {
            width: 100%;
          }

          .create-team-cta {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .team-card {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }

          .team-info {
            flex-direction: column;
          }

          .join-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default JoinTeam
