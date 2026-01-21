import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, AlertCircle, ArrowLeft } from 'lucide-react'
import { US_STATES } from '../utils/states'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'

function EditTeam() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, team, updateTeam } = useAuth()

  const [formData, setFormData] = useState({
    team_number: '',
    name: '',
    city: '',
    state: '',
    description: '',
    contact_email: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    checkAuthorizationAndFetch()
  }, [id, user, team])

  const checkAuthorizationAndFetch = async () => {
    setLoading(true)
    setError('')

    try {
      // Check if user is admin
      const isAdmin = user?.role === 'admin'

      // Check if user is a member of this team
      const isTeamMember = team && team.id === parseInt(id)

      if (!isAdmin && !isTeamMember) {
        setAuthorized(false)
        setError('You do not have permission to edit this team. Only team members and admins can edit team details.')
        setLoading(false)
        return
      }

      setAuthorized(true)

      // Fetch team data
      const response = await api.get(`/teams/detail.php?id=${id}`)
      const teamData = response.data.team

      setFormData({
        team_number: teamData.team_number || '',
        name: teamData.name || '',
        city: teamData.city || '',
        state: teamData.state || '',
        description: teamData.description || '',
        contact_email: teamData.contact_email || ''
      })
    } catch (err) {
      console.error('Fetch team error:', err)
      // Use current team data if available and user is authorized
      if (team && team.id === parseInt(id)) {
        setAuthorized(true)
        setFormData({
          team_number: team.team_number || '',
          name: team.name || '',
          city: team.city || '',
          state: team.state || '',
          description: team.description || '',
          contact_email: team.contact_email || ''
        })
      } else {
        setError('Failed to load team data')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    if (!formData.team_number.match(/^\d+$/)) {
      setError('Team number must contain only digits')
      setSaving(false)
      return
    }

    try {
      const response = await api.put(`/teams/detail.php?id=${id}`, formData)

      // Update the team in auth context if it's the user's team
      if (team && team.id === parseInt(id)) {
        updateTeam({ ...team, ...formData })
      }

      navigate(`/teams/${id}`)
    } catch (err) {
      console.error('Update team error:', err)
      const message = err.response?.data?.message || err.message || 'Failed to update team'
      setError(message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="edit-team">
        <div className="container">
          <LoadingSpinner />
        </div>
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="edit-team">
        <div className="container">
          <motion.div
            className="error-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle size={48} />
            <h2>Access Denied</h2>
            <p>{error}</p>
            <button onClick={() => navigate(-1)} className="btn btn-secondary">
              <ArrowLeft size={18} />
              Go Back
            </button>
          </motion.div>
        </div>

        <style>{`
          .edit-team {
            padding: 40px 0 80px;
          }

          .error-container {
            max-width: 500px;
            margin: 60px auto;
            text-align: center;
            padding: 40px;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-xl);
          }

          .error-container svg {
            color: #ff6b6b;
            margin-bottom: 20px;
          }

          .error-container h2 {
            font-size: 24px;
            margin-bottom: 12px;
          }

          .error-container p {
            color: var(--text-secondary);
            margin-bottom: 24px;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="edit-team">
      <div className="container">
        <motion.div
          className="edit-form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="form-header">
            <motion.div
              className="form-icon"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Users size={28} />
            </motion.div>
            <h1>Edit Team</h1>
            <p>Update your team's information</p>
          </div>

          {error && (
            <motion.div
              className="error-message"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Team Number *</label>
                <input
                  type="text"
                  name="team_number"
                  value={formData.team_number}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., 12345"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Team Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., TechBots"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., San Jose"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">State *</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Select state</option>
                  {US_STATES.map(state => (
                    <option key={state.value} value={state.value}>{state.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Contact Email *</label>
              <input
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                className="form-input"
                placeholder="team@example.com"
                required
              />
              <span className="form-hint">
                This email will be visible to logged-in users who want to contact your team.
              </span>
            </div>

            <div className="form-group">
              <label className="form-label">Team Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Tell other teams about yourselves..."
                rows={4}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <motion.button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      <style>{`
        .edit-team {
          padding: 40px 0 80px;
        }

        .edit-form-container {
          max-width: 600px;
          margin: 0 auto;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 40px;
        }

        .form-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .form-icon {
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

        .form-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .form-header p {
          color: var(--text-secondary);
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          background: rgba(255, 68, 68, 0.1);
          border: 1px solid rgba(255, 68, 68, 0.3);
          border-radius: var(--radius-md);
          color: #ff6b6b;
          font-size: 14px;
          margin-bottom: 24px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .form-hint {
          display: block;
          font-size: 12px;
          color: var(--text-muted);
          margin-top: 6px;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 24px;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }

        @media (max-width: 640px) {
          .edit-form-container {
            padding: 24px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column-reverse;
          }

          .form-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default EditTeam
