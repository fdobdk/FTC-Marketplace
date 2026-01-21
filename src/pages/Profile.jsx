import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Lock, Save, AlertCircle, Check, Phone, MessageCircle, Briefcase, GraduationCap, Star, FileText } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

const TEAM_ROLES = [
  { value: '', label: 'Select a role...' },
  { value: 'Captain', label: 'Team Captain' },
  { value: 'Co-Captain', label: 'Co-Captain' },
  { value: 'Driver', label: 'Driver' },
  { value: 'Operator', label: 'Operator' },
  { value: 'Programmer', label: 'Programmer' },
  { value: 'Builder', label: 'Builder' },
  { value: 'Designer', label: 'Designer (CAD)' },
  { value: 'Outreach Lead', label: 'Outreach Lead' },
  { value: 'Business Lead', label: 'Business Lead' },
  { value: 'Scout', label: 'Scout' },
  { value: 'Mentor', label: 'Mentor' },
  { value: 'Coach', label: 'Coach' },
  { value: 'Member', label: 'Team Member' },
  { value: 'Other', label: 'Other' }
]

const TEAM_STATUSES = [
  { value: 'active', label: 'Active Member' },
  { value: 'alumni', label: 'Alumni' },
  { value: 'mentor', label: 'Mentor/Coach' }
]

const SPECIALTIES = [
  'Java Programming',
  'Blocks Programming',
  'CAD/Design',
  'Mechanical',
  'Electrical',
  '3D Printing',
  'Autonomous',
  'TeleOp',
  'Driver Practice',
  'Outreach',
  'Business/Fundraising',
  'Scouting',
  'Strategy'
]

function Profile() {
  const { user, updateUser } = useAuth()

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })

  const [contactData, setContactData] = useState({
    contact_email: user?.contact_email || '',
    contact_phone: user?.contact_phone || '',
    contact_discord: user?.contact_discord || ''
  })

  const [teamProfileData, setTeamProfileData] = useState({
    team_role: user?.team_role || '',
    team_status: user?.team_status || 'active',
    bio: user?.bio || '',
    graduation_year: user?.graduation_year || '',
    specialties: user?.specialties ? user.specialties.split(',').map(s => s.trim()) : []
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [contactLoading, setContactLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [teamProfileLoading, setTeamProfileLoading] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
    setSuccess('')
  }

  const handlePasswordChange = (e) => {
    setPasswordData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
  }

  const handleContactChange = (e) => {
    setContactData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
    setSuccess('')
  }

  const handleTeamProfileChange = (e) => {
    setTeamProfileData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
    setSuccess('')
  }

  const handleSpecialtyToggle = (specialty) => {
    setTeamProfileData(prev => {
      const currentSpecialties = prev.specialties
      if (currentSpecialties.includes(specialty)) {
        return { ...prev, specialties: currentSpecialties.filter(s => s !== specialty) }
      } else {
        return { ...prev, specialties: [...currentSpecialties, specialty] }
      }
    })
    setError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await api.put('/auth/profile.php', formData)
      updateUser(response.data.user)
      setSuccess('Profile updated successfully')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    setContactLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await api.put('/auth/profile.php', contactData)
      updateUser(response.data.user)
      setSuccess('Contact information updated successfully')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update contact information')
    } finally {
      setContactLoading(false)
    }
  }

  const handleTeamProfileSubmit = async (e) => {
    e.preventDefault()
    setTeamProfileLoading(true)
    setError('')
    setSuccess('')

    try {
      const response = await api.put('/auth/profile.php', {
        team_role: teamProfileData.team_role,
        team_status: teamProfileData.team_status,
        bio: teamProfileData.bio,
        graduation_year: teamProfileData.graduation_year || null,
        specialties: teamProfileData.specialties.join(', ')
      })
      updateUser(response.data.user)
      setSuccess('Team profile updated successfully')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update team profile')
    } finally {
      setTeamProfileLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setPasswordLoading(true)
    setError('')

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match')
      setPasswordLoading(false)
      return
    }

    if (passwordData.newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      setPasswordLoading(false)
      return
    }

    try {
      await api.put('/auth/password.php', {
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword
      })
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
      setSuccess('Password changed successfully')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password')
    } finally {
      setPasswordLoading(false)
    }
  }

  return (
    <div className="profile-page">
      <div className="container">
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Profile Settings</h1>
          <p>Manage your account information</p>
        </motion.div>

        <div className="profile-grid">
          {/* Profile Info */}
          <motion.div
            className="profile-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="card-header">
              <User size={20} />
              <h2>Personal Information</h2>
            </div>

            {error && (
              <div className="error-message">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {success && (
              <div className="success-message">
                <Check size={18} />
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-with-icon">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your name"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? 'Saving...' : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
          
          {/* Change Password */}
          <motion.div
            className="profile-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card-header">
              <Lock size={20} />
              <h2>Change Password</h2>
            </div>

            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="form-input"
                    placeholder="Enter current password"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">New Password</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="form-input"
                    placeholder="At least 8 characters"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <div className="input-with-icon">
                  <Lock size={18} className="input-icon" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="form-input"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="btn btn-secondary"
                disabled={passwordLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {passwordLoading ? 'Changing...' : 'Change Password'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            className="profile-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-header">
              <Phone size={20} />
              <h2>Contact Information</h2>
            </div>
            <p className="card-description">
              Add your preferred contact methods. These will be shown to other users when they view your listings.
            </p>

            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label className="form-label">Contact Email (optional)</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    name="contact_email"
                    value={contactData.contact_email}
                    onChange={handleContactChange}
                    className="form-input"
                    placeholder="contact@example.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number (optional)</label>
                <div className="input-with-icon">
                  <Phone size={18} className="input-icon" />
                  <input
                    type="tel"
                    name="contact_phone"
                    value={contactData.contact_phone}
                    onChange={handleContactChange}
                    className="form-input"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Discord Username (optional)</label>
                <div className="input-with-icon">
                  <MessageCircle size={18} className="input-icon" />
                  <input
                    type="text"
                    name="contact_discord"
                    value={contactData.contact_discord}
                    onChange={handleContactChange}
                    className="form-input"
                    placeholder="username#1234"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                className="btn btn-primary"
                disabled={contactLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {contactLoading ? 'Saving...' : (
                  <>
                    <Save size={18} />
                    Save Contact Info
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Team Profile */}
          <motion.div
            className="profile-card profile-card-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="card-header">
              <Briefcase size={20} />
              <h2>Team Profile</h2>
            </div>
            <p className="card-description">
              Share your role and experience with the FTC community.
            </p>

            <form onSubmit={handleTeamProfileSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Team Role</label>
                  <select
                    name="team_role"
                    value={teamProfileData.team_role}
                    onChange={handleTeamProfileChange}
                    className="form-input form-select"
                  >
                    {TEAM_ROLES.map(role => (
                      <option key={role.value} value={role.value}>{role.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    name="team_status"
                    value={teamProfileData.team_status}
                    onChange={handleTeamProfileChange}
                    className="form-input form-select"
                  >
                    {TEAM_STATUSES.map(status => (
                      <option key={status.value} value={status.value}>{status.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Graduation Year</label>
                  <div className="input-with-icon">
                    <GraduationCap size={18} className="input-icon" />
                    <input
                      type="number"
                      name="graduation_year"
                      value={teamProfileData.graduation_year}
                      onChange={handleTeamProfileChange}
                      className="form-input"
                      placeholder="2025"
                      min="2000"
                      max="2050"
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Bio</label>
                <div className="input-with-icon textarea-wrapper">
                  <FileText size={18} className="input-icon textarea-icon" />
                  <textarea
                    name="bio"
                    value={teamProfileData.bio}
                    onChange={handleTeamProfileChange}
                    className="form-input form-textarea"
                    placeholder="Tell us about yourself and your FTC experience..."
                    rows={3}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Star size={16} />
                  Specialties
                </label>
                <p className="field-hint">Select your areas of expertise</p>
                <div className="specialties-grid">
                  {SPECIALTIES.map(specialty => (
                    <button
                      key={specialty}
                      type="button"
                      className={`specialty-tag ${teamProfileData.specialties.includes(specialty) ? 'active' : ''}`}
                      onClick={() => handleSpecialtyToggle(specialty)}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                type="submit"
                className="btn btn-primary"
                disabled={teamProfileLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {teamProfileLoading ? 'Saving...' : (
                  <>
                    <Save size={18} />
                    Save Team Profile
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        .profile-page {
          padding: 40px 0 80px;
        }

        .profile-header {
          margin-bottom: 32px;
        }

        .profile-header h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .profile-header p {
          color: var(--text-secondary);
        }

        .profile-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1200px;
        }

        .profile-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
        }

        .profile-card-wide {
          grid-column: span 3;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          color: var(--primary);
        }

        .card-header h2 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .card-description {
          font-size: 13px;
          color: var(--text-secondary);
          margin-bottom: 20px;
          line-height: 1.5;
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: rgba(255, 68, 68, 0.1);
          border: 1px solid rgba(255, 68, 68, 0.3);
          border-radius: var(--radius-md);
          color: #ff6b6b;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .success-message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          background: rgba(0, 200, 83, 0.1);
          border: 1px solid rgba(0, 200, 83, 0.3);
          border-radius: var(--radius-md);
          color: var(--accent-green);
          font-size: 14px;
          margin-bottom: 20px;
        }

        .input-with-icon {
          position: relative;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .input-with-icon .form-input {
          padding-left: 44px;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .form-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
          cursor: pointer;
        }

        .textarea-wrapper {
          align-items: flex-start;
        }

        .textarea-icon {
          top: 14px;
          transform: none;
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
          padding-top: 12px;
          line-height: 1.5;
        }

        .field-hint {
          font-size: 12px;
          color: var(--text-muted);
          margin-top: -8px;
          margin-bottom: 12px;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .specialties-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .specialty-tag {
          padding: 8px 14px;
          background: var(--bg-dark);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          font-size: 13px;
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .specialty-tag:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .specialty-tag.active {
          background: rgba(245, 124, 0, 0.15);
          border-color: var(--primary);
          color: var(--primary);
        }

        @media (max-width: 1024px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }
          .profile-card-wide {
            grid-column: span 1;
          }
          .form-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default Profile
