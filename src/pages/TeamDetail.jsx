import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, Users, Package, Mail, Calendar, AlertCircle } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import ListingCard from '../components/ListingCard'
import LoadingSpinner from '../components/LoadingSpinner'

function TeamDetail() {
  const { id } = useParams()
  const [team, setTeam] = useState(null)
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showContact, setShowContact] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    fetchTeam()
  }, [id])

  const fetchTeam = async () => {
    try {
      const [teamRes, listingsRes] = await Promise.all([
        api.get(`/teams/detail.php?id=${id}`),
        api.get(`/listings/index.php?team_id=${id}`)
      ])
      setTeam(teamRes.data.team)
      setListings(listingsRes.data.listings || [])
    } catch (error) {
      // Mock data for demo
      setTeam(getMockTeam(id))
      setListings(getMockListings())
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!team) {
    return (
      <div className="not-found">
        <AlertCircle size={48} />
        <h2>Team Not Found</h2>
        <Link to="/teams" className="btn btn-primary">
          Back to Teams
        </Link>
      </div>
    )
  }

  return (
    <div className="team-detail">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/teams" className="back-link">
            <ArrowLeft size={18} />
            Back to Teams
          </Link>

          <div className="team-header-card">
            <div className="team-header-content">
              <div className="team-icon">
                <Users size={32} />
              </div>
              <div className="team-info">
                <h1>{team.name}</h1>
                <div className="team-number">Team #{team.team_number}</div>
                <div className="team-meta">
                  <span className="meta-item">
                    <MapPin size={16} />
                    {team.city}, {team.state}
                  </span>
                  <span className="meta-item">
                    <Users size={16} />
                    {team.members_count || 1} members
                  </span>
                  <span className="meta-item">
                    <Package size={16} />
                    {listings.length} listings
                  </span>
                </div>
              </div>
            </div>

            {team.description && (
              <p className="team-description">{team.description}</p>
            )}

            <div className="team-contact">
              {isAuthenticated ? (
                showContact ? (
                  <motion.div
                    className="contact-info"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                  >
                    <div className="contact-item">
                      <Mail size={18} />
                      <a href={`mailto:${team.contact_email || 'team@example.com'}`}>
                        {team.contact_email || 'team@example.com'}
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    className="btn btn-primary"
                    onClick={() => setShowContact(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail size={18} />
                    Contact Team
                  </motion.button>
                )
              ) : (
                <div className="login-prompt">
                  <Link to="/login" className="btn btn-primary">
                    Sign in to contact
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Team Listings */}
          <div className="team-listings">
            <h2>Team Listings</h2>
            {listings.length === 0 ? (
              <div className="no-listings">
                <Package size={32} />
                <p>This team hasn't posted any listings yet.</p>
              </div>
            ) : (
              <div className="listings-grid">
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
              </div>
            )}
          </div>

          {/* Active Team Members */}
          {team.members && team.members.filter(m => !m.team_status || m.team_status === 'active').length > 0 && (
            <div className="team-members">
              <h2>Team Members</h2>
              <div className="members-grid">
                {team.members
                  .filter(member => !member.team_status || member.team_status === 'active')
                  .map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link to={`/members/${member.id}`} className="member-card member-card-link">
                        <div className="member-avatar">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="member-info">
                          <span className="member-name">{member.name}</span>
                          <span className="member-role">
                            {member.team_role || (member.role === 'admin' ? 'Team Admin' : 'Member')}
                          </span>
                          {member.graduation_year && (
                            <span className="member-grad">Class of {member.graduation_year}</span>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}

          {/* Inactive Members (Alumni/Mentors) */}
          {team.members && team.members.filter(m => m.team_status && m.team_status !== 'active').length > 0 && (
            <div className="team-members inactive-members">
              <h2>Alumni & Mentors</h2>
              <div className="members-grid">
                {team.members
                  .filter(member => member.team_status && member.team_status !== 'active')
                  .map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link to={`/members/${member.id}`} className="member-card member-card-link">
                        <div className="member-avatar member-avatar-inactive">
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="member-info">
                          <span className="member-name">{member.name}</span>
                          <span className="member-role">
                            {member.team_role || (member.team_status === 'alumni' ? 'Alumni' : 'Mentor')}
                          </span>
                          <span className={`member-status member-status-${member.team_status}`}>
                            {member.team_status === 'alumni' ? 'Alumni' : 'Mentor'}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <style>{`
        .team-detail {
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

        .team-header-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 32px;
          margin-bottom: 40px;
        }

        .team-header-content {
          display: flex;
          gap: 24px;
          margin-bottom: 24px;
        }

        .team-icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius-lg);
          color: white;
          flex-shrink: 0;
        }

        .team-number {
          font-size: 14px;
          font-weight: 600;
          color: var(--primary);
          margin-bottom: 4px;
        }

        .team-info h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .team-meta {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .team-description {
          color: var(--text-secondary);
          line-height: 1.7;
          margin-bottom: 24px;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
        }

        .contact-info {
          overflow: hidden;
        }

        .contact-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          background: rgba(245, 124, 0, 0.1);
          border-radius: var(--radius-md);
        }

        .contact-item a {
          color: var(--primary);
          font-weight: 500;
        }

        .team-listings {
          margin-bottom: 40px;
        }

        .team-listings h2 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .listings-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .no-listings {
          text-align: center;
          padding: 60px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          color: var(--text-secondary);
        }

        .no-listings svg {
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .team-members h2 {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 24px;
        }

        .members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
        }

        .member-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          text-decoration: none;
          color: inherit;
        }

        .member-card-link {
          transition: all var(--transition-fast);
        }

        .member-card-link:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
        }

        .member-card-link:hover .member-name {
          color: var(--primary);
        }

        .member-avatar {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--secondary-light);
          border-radius: 50%;
          font-weight: 600;
          color: var(--primary);
          flex-shrink: 0;
        }

        .member-avatar-inactive {
          background: var(--bg-dark);
          color: var(--text-muted);
        }

        .inactive-members {
          margin-top: 40px;
          opacity: 0.9;
        }

        .inactive-members h2 {
          color: var(--text-secondary);
        }

        .member-name {
          display: block;
          font-weight: 500;
          transition: color var(--transition-fast);
        }

        .member-role {
          display: block;
          font-size: 12px;
          color: var(--text-muted);
        }

        .member-grad {
          display: block;
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 2px;
        }

        .member-status {
          display: inline-block;
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 10px;
          margin-top: 4px;
          font-weight: 500;
        }

        .member-status-alumni {
          background: rgba(99, 102, 241, 0.15);
          color: #6366f1;
        }

        .member-status-mentor {
          background: rgba(34, 197, 94, 0.15);
          color: #22c55e;
        }

        .not-found {
          text-align: center;
          padding: 100px 20px;
        }

        .not-found svg {
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .not-found h2 {
          margin-bottom: 20px;
        }

        @media (max-width: 900px) {
          .listings-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .team-header-content {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .team-meta {
            justify-content: center;
          }

          .listings-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

function getMockTeam(id) {
  return {
    id,
    team_number: '12345',
    name: 'TechBots',
    city: 'San Jose',
    state: 'CA',
    description: 'We are Team TechBots, a competitive FTC robotics team based in San Jose, California. Our mission is to inspire young engineers and create innovative robots that push the boundaries of what\'s possible.',
    contact_email: 'team12345@example.com',
    members_count: 8,
    members: [
      { id: 1, name: 'Alex Johnson', role: 'admin', team_role: 'Captain', team_status: 'active' },
      { id: 2, name: 'Sam Lee', role: 'member', team_role: 'Programmer', team_status: 'active' },
      { id: 3, name: 'Jordan Smith', role: 'member', team_role: 'Driver', team_status: 'active' },
      { id: 4, name: 'Taylor Chen', role: 'member', team_role: null, team_status: 'alumni' }
    ]
  }
}

function getMockListings() {
  return [
    {
      id: 1,
      title: 'REV Robotics HD Hex Motor',
      type: 'have',
      category: 'motors',
      condition: 'like-new',
      quantity: 2,
      description: 'Barely used HD Hex motors from last season.',
      team_number: '12345',
      team_name: 'TechBots',
      state: 'CA',
      city: 'San Jose',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Color Sensor V3',
      type: 'have',
      category: 'sensors',
      condition: 'good',
      quantity: 1,
      description: 'REV Color Sensor V3, tested and working.',
      team_number: '12345',
      team_name: 'TechBots',
      state: 'CA',
      city: 'San Jose',
      created_at: new Date().toISOString()
    }
  ]
}

export default TeamDetail
