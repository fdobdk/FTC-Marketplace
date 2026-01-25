import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, User, Users, MapPin, Mail, MessageCircle, Calendar, GraduationCap, Star, Package, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'

function MemberProfile() {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProfile()
  }, [id])

  const fetchProfile = async () => {
    try {
      const response = await api.get(`/users/profile.php?id=${id}`)
      setProfile(response.data.profile)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (error || !profile) {
    return (
      <div className="member-profile">
        <div className="container">
          <div className="error-container">
            <AlertCircle size={48} />
            <h2>Profile Not Found</h2>
            <p>{error || 'This user profile could not be found.'}</p>
            <Link to="/teams" className="btn btn-primary">
              Browse Teams
            </Link>
          </div>
        </div>

        <style>{`
          .member-profile {
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
            color: var(--text-muted);
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

  const specialties = profile.specialties ? profile.specialties.split(',').map(s => s.trim()).filter(Boolean) : []
  const memberSince = new Date(profile.member_since).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })

  return (
    <div className="member-profile">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {profile.team && (
            <Link to={`/teams/${profile.team.id}`} className="back-link">
              <ArrowLeft size={18} />
              Back to Team #{profile.team.team_number}
            </Link>
          )}

          <div className="profile-card">
            <div className="profile-header">
              <motion.div
                className="profile-avatar"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                {profile.name.charAt(0).toUpperCase()}
              </motion.div>

              <div className="profile-info">
                <h1>{profile.name}</h1>

                <div className="profile-meta">
                  {profile.team_role && (
                    <span className="meta-item role">
                      <User size={16} />
                      {profile.team_role}
                    </span>
                  )}

                  {profile.team_status && profile.team_status !== 'active' && (
                    <span className={`status-badge status-${profile.team_status}`}>
                      {profile.team_status === 'alumni' ? 'Alumni' : 'Mentor'}
                    </span>
                  )}

                  {profile.team?.is_admin && (
                    <span className="status-badge status-admin">Team Admin</span>
                  )}
                </div>

                {profile.team && (
                  <Link to={`/teams/${profile.team.id}`} className="team-link">
                    <Users size={16} />
                    Team #{profile.team.team_number} - {profile.team.name}
                    <span className="team-location">
                      <MapPin size={14} />
                      {profile.team.city}, {profile.team.state}
                    </span>
                  </Link>
                )}
              </div>
            </div>

            {profile.bio && (
              <div className="profile-section">
                <h3>About</h3>
                <p className="bio-text">{profile.bio}</p>
              </div>
            )}

            <div className="profile-details">
              {profile.graduation_year && (
                <div className="detail-item">
                  <GraduationCap size={18} />
                  <span>Class of {profile.graduation_year}</span>
                </div>
              )}

              <div className="detail-item">
                <Calendar size={18} />
                <span>Member since {memberSince}</span>
              </div>

              <div className="detail-item">
                <Package size={18} />
                <span>{profile.listings_count} active listings</span>
              </div>
            </div>

            {specialties.length > 0 && (
              <div className="profile-section">
                <h3>
                  <Star size={18} />
                  Specialties
                </h3>
                <div className="specialties-list">
                  {specialties.map((specialty, index) => (
                    <span key={index} className="specialty-tag">{specialty}</span>
                  ))}
                </div>
              </div>
            )}

            {isAuthenticated && profile.contact && (profile.contact.email || profile.contact.discord) && (
              <div className="profile-section contact-section">
                <h3>Contact</h3>
                <div className="contact-methods">
                  {profile.contact.email && (
                    <a href={`mailto:${profile.contact.email}`} className="contact-item">
                      <Mail size={18} />
                      {profile.contact.email}
                    </a>
                  )}
                  {profile.contact.discord && (
                    <div className="contact-item">
                      <MessageCircle size={18} />
                      {profile.contact.discord}
                    </div>
                  )}
                </div>
              </div>
            )}

            {!isAuthenticated && (
              <div className="login-prompt">
                <p>Sign in to see contact information</p>
                <Link to="/login" className="btn btn-primary btn-sm">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <style>{`
        .member-profile {
          padding: 40px 0 80px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 24px;
        }

        .back-link:hover {
          color: var(--primary);
        }

        .profile-card {
          max-width: 700px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 32px;
        }

        .profile-header {
          display: flex;
          gap: 24px;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .profile-avatar {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius-lg);
          color: white;
          font-size: 32px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .profile-info h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .profile-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 12px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .meta-item.role {
          color: var(--primary);
          font-weight: 500;
        }

        .status-badge {
          display: inline-flex;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-alumni {
          background: rgba(99, 102, 241, 0.15);
          color: #6366f1;
        }

        .status-mentor {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
        }

        .status-admin {
          background: rgba(245, 124, 0, 0.15);
          color: var(--primary);
        }

        .team-link {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          flex-wrap: wrap;
        }

        .team-link:hover {
          color: var(--primary);
        }

        .team-location {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
        }

        .profile-section {
          margin-bottom: 24px;
        }

        .profile-section h3 {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 12px;
        }

        .bio-text {
          color: var(--text-secondary);
          line-height: 1.7;
        }

        .profile-details {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 24px;
          padding: 16px;
          background: var(--bg-dark);
          border-radius: var(--radius-md);
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .detail-item svg {
          color: var(--text-muted);
        }

        .specialties-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .specialty-tag {
          padding: 6px 12px;
          background: rgba(245, 124, 0, 0.1);
          border: 1px solid rgba(245, 124, 0, 0.3);
          border-radius: 16px;
          font-size: 13px;
          color: var(--primary);
        }

        .contact-section {
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }

        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          background: var(--bg-dark);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 14px;
        }

        .contact-item svg {
          color: var(--primary);
        }

        a.contact-item:hover {
          background: rgba(245, 124, 0, 0.1);
        }

        .login-prompt {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          background: var(--bg-dark);
          border-radius: var(--radius-md);
          margin-top: 24px;
        }

        .login-prompt p {
          font-size: 14px;
          color: var(--text-secondary);
        }

        @media (max-width: 640px) {
          .profile-header {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .profile-meta {
            justify-content: center;
          }

          .team-link {
            justify-content: center;
          }

          .profile-details {
            flex-direction: column;
            gap: 12px;
          }

          .login-prompt {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>
    </div>
  )
}

export default MemberProfile
