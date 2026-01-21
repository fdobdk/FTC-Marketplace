import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, AlertCircle } from 'lucide-react'
import { US_STATES } from '../utils/states'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

function CreateTeam() {
  const navigate = useNavigate()
  const { updateTeam } = useAuth()

  const [formData, setFormData] = useState({
    team_number: '',
    name: '',
    city: '',
    state: '',
    description: '',
    contact_email: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
    setLoading(true)
    setError('')

    if (!formData.team_number.match(/^\d+$/)) {
      setError('Team number must contain only digits')
      setLoading(false)
      return
    }

    try {
      const response = await api.post('/teams/index.php', formData)
      updateTeam(response.data.team)
      navigate(`/teams/${response.data.team.id}`)
    } catch (err) {
      console.error('Create team error:', err)
      console.error('Response:', err.response)
      const message = err.response?.data?.message || err.message || 'Failed to create team'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-team">
      <div className="container">
        <motion.div
          className="create-form-container"
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
            <h1>Register Your Team</h1>
            <p>Create a team profile to start listing parts</p>
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

            <motion.button
              type="submit"
              className="btn btn-primary btn-lg submit-btn"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Creating Team...' : 'Create Team'}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <style>{`
        .create-team {
          padding: 40px 0 80px;
        }

        .create-form-container {
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

        .submit-btn {
          width: 100%;
          margin-top: 16px;
        }

        @media (max-width: 640px) {
          .create-form-container {
            padding: 24px;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default CreateTeam
