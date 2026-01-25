import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, AlertCircle, ArrowLeft, Shield, UserMinus, ChevronDown, ChevronUp, Check } from 'lucide-react'
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
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [authorized, setAuthorized] = useState(false)

  // Member management state
  const [members, setMembers] = useState([])
  const [showMembers, setShowMembers] = useState(false)
  const [memberActionLoading, setMemberActionLoading] = useState(null)

  useEffect(() => {
    checkAuthorizationAndFetch()
  }, [id, user, team])

  const checkAuthorizationAndFetch = async () => {
    setLoading(true)
    setError('')

    try {
      // Check if user is a team admin of THIS specific team
      const isTeamAdmin = user?.team_id === parseInt(id) && user?.role === 'admin'

      // Check if user is a site admin (can edit any team)
      const isSiteAdmin = user?.is_site_admin

      if (!isTeamAdmin && !isSiteAdmin) {
        setAuthorized(false)
        setError('You do not have permission to edit this team. Only team admins can edit team details.')
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

  const fetchMembers = async () => {
    try {
      const response = await api.get(`/teams/members.php?team_id=${id}`)
      setMembers(response.data.members || [])
    } catch (err) {
      console.error('Failed to fetch members:', err)
    }
  }

  const handlePromoteDemote = async (memberId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'member' : 'admin'
    const action = newRole === 'admin' ? 'promote' : 'demote'

    if (!window.confirm(`Are you sure you want to ${action} this member?`)) {
      return
    }

    setMemberActionLoading(memberId)
    setError('')
    setSuccess('')

    try {
      await api.put('/teams/members.php', {
        user_id: memberId,
        role: newRole
      })
      setSuccess(`Member ${newRole === 'admin' ? 'promoted to admin' : 'demoted to member'} successfully`)
      fetchMembers()
    } catch (err) {
      setError(err.response?.data?.message || `Failed to ${action} member`)
    } finally {
      setMemberActionLoading(null)
    }
  }

  const handleRemoveMember = async (memberId, memberName) => {
    if (!window.confirm(`Are you sure you want to remove ${memberName} from the team? They will need to rejoin.`)) {
      return
    }

    setMemberActionLoading(memberId)
    setError('')
    setSuccess('')

    try {
      await api.delete(`/teams/members.php?user_id=${memberId}`)
      setSuccess(`${memberName} has been removed from the team`)
      fetchMembers()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove member')
    } finally {
      setMemberActionLoading(null)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
    setSuccess('')
  }

  const toggleMembersSection = () => {
    if (!showMembers) {
      fetchMembers()
    }
    setShowMembers(!showMembers)
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
              className="message error-message"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          {success && (
            <motion.div
              className="message success-message"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Check size={18} />
              {success}
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

          {/* Member Management Section */}
          <div className="members-section">
            <button
              type="button"
              className="members-toggle"
              onClick={toggleMembersSection}
            >
              <div className="toggle-left">
                <Users size={20} />
                <span>Manage Team Members</span>
              </div>
              {showMembers ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            <AnimatePresence>
              {showMembers && (
                <motion.div
                  className="members-list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {members.length === 0 ? (
                    <div className="empty-members">
                      <p>No members found</p>
                    </div>
                  ) : (
                    members.map((member) => (
                      <div key={member.id} className="member-item">
                        <div className="member-info">
                          <div className="member-avatar">
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="member-details">
                            <span className="member-name">
                              {member.name}
                              {member.id === user?.id && <span className="you-badge">(You)</span>}
                            </span>
                            <span className="member-email">{member.email}</span>
                            <div className="member-badges">
                              <span className={`role-badge role-${member.role}`}>
                                {member.role === 'admin' ? 'Admin' : 'Member'}
                              </span>
                              {member.team_role && (
                                <span className="team-role-badge">{member.team_role}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="member-actions">
                          <button
                            type="button"
                            className={`action-btn ${member.role === 'admin' ? 'demote' : 'promote'}`}
                            onClick={() => handlePromoteDemote(member.id, member.role)}
                            disabled={memberActionLoading === member.id}
                            title={member.role === 'admin' ? 'Demote to Member' : 'Promote to Admin'}
                          >
                            <Shield size={16} />
                            {member.role === 'admin' ? 'Demote' : 'Promote'}
                          </button>
                          <button
                            type="button"
                            className="action-btn remove"
                            onClick={() => handleRemoveMember(member.id, member.name)}
                            disabled={memberActionLoading === member.id}
                            title="Remove from Team"
                          >
                            <UserMinus size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style>{`
        .edit-team {
          padding: 40px 0 80px;
        }

        .edit-form-container {
          max-width: 700px;
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

        .message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 16px;
          border-radius: var(--radius-md);
          font-size: 14px;
          margin-bottom: 24px;
        }

        .error-message {
          background: rgba(255, 68, 68, 0.1);
          border: 1px solid rgba(255, 68, 68, 0.3);
          color: #ff6b6b;
        }

        .success-message {
          background: rgba(0, 200, 83, 0.1);
          border: 1px solid rgba(0, 200, 83, 0.3);
          color: var(--accent-green);
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

        /* Member Management */
        .members-section {
          margin-top: 32px;
          border-top: 1px solid var(--border-color);
          padding-top: 24px;
        }

        .members-toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 16px;
          background: var(--bg-dark);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .members-toggle:hover {
          border-color: var(--primary);
        }

        .toggle-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .members-list {
          overflow: hidden;
          margin-top: 16px;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .empty-members {
          padding: 32px;
          text-align: center;
          color: var(--text-muted);
        }

        .member-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          border-bottom: 1px solid var(--border-color);
          gap: 16px;
        }

        .member-item:last-child {
          border-bottom: none;
        }

        .member-info {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          min-width: 0;
        }

        .member-avatar {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--secondary-light);
          border-radius: 50%;
          font-weight: 600;
          color: var(--primary);
          flex-shrink: 0;
        }

        .member-details {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .member-name {
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .you-badge {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: normal;
        }

        .member-email {
          font-size: 12px;
          color: var(--text-muted);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .member-badges {
          display: flex;
          gap: 6px;
          margin-top: 4px;
        }

        .role-badge {
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 10px;
          font-weight: 500;
        }

        .role-admin {
          background: rgba(245, 124, 0, 0.15);
          color: var(--primary);
        }

        .role-member {
          background: var(--bg-dark);
          color: var(--text-muted);
        }

        .team-role-badge {
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 10px;
          background: rgba(99, 102, 241, 0.15);
          color: #6366f1;
        }

        .member-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .action-btn.promote {
          background: rgba(0, 200, 83, 0.1);
          border-color: rgba(0, 200, 83, 0.3);
          color: var(--accent-green);
        }

        .action-btn.promote:hover {
          background: rgba(0, 200, 83, 0.2);
        }

        .action-btn.demote {
          background: rgba(245, 158, 11, 0.1);
          border-color: rgba(245, 158, 11, 0.3);
          color: #f59e0b;
        }

        .action-btn.demote:hover {
          background: rgba(245, 158, 11, 0.2);
        }

        .action-btn.remove {
          background: rgba(239, 68, 68, 0.1);
          border-color: rgba(239, 68, 68, 0.3);
          color: #ef4444;
        }

        .action-btn.remove:hover {
          background: rgba(239, 68, 68, 0.2);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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

          .member-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .member-actions {
            width: 100%;
            margin-top: 12px;
          }

          .action-btn {
            flex: 1;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default EditTeam
