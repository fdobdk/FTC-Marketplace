import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, Users, Plus, Edit, Trash2, AlertCircle, MapPin } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'

function Dashboard() {
  const { user, team } = useAuth()
  const [listings, setListings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (team) {
      fetchListings()
    } else {
      setLoading(false)
    }
  }, [team])

  const fetchListings = async () => {
    try {
      const response = await api.get('/listings/my.php')
      setListings(response.data.listings || [])
    } catch (error) {
      // Mock data
      setListings(getMockListings())
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this listing?')) return

    try {
      await api.delete(`/listings/detail.php?id=${id}`)
      setListings(listings.filter(l => l.id !== id))
    } catch (error) {
      alert('Failed to delete listing')
    }
  }

  return (
    <div className="dashboard">
      <div className="container">
        <motion.div
          className="dashboard-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Welcome back, {user?.name?.split(' ')[0] || 'User'}</h1>
          <p>Manage your team and listings from here</p>
        </motion.div>

        <div className="dashboard-grid">
          {/* Team Card */}
          <motion.div
            className="dashboard-card team-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="card-header">
              <Users size={20} />
              <h2>Your Team</h2>
            </div>

            {team ? (
              <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                <Link to={`/teams/${team.id}`} className="team-card-link">
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
                      <span>{team.listings_count || 1} listings</span>
                    </div>
                    <div className="stat">
                      <Users size={14} />
                      <span>{team.members_count || 1} members</span>
                    </div>
                  </div>
                </Link>
                <div className="team-card-footer">
                  <Link to={`/teams/${team.id}/edit`} className="edit-team-link">
                    <Edit size={14} />
                    Edit Team
                  </Link>
                </div>
              </motion.div>
            ) : (
              <div className="no-team">
                <AlertCircle size={24} />
                <p>You're not part of a team yet</p>
                <Link to="/teams/create" className="btn btn-primary">
                  <Plus size={16} />
                  Create or Join Team
                </Link>
              </div>
            )}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="dashboard-card actions-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card-header">
              <Package size={20} />
              <h2>Quick Actions</h2>
            </div>

            <div className="quick-actions">
              <Link to="/listings/create" className="action-btn">
                <div className="action-icon have">
                  <Plus size={20} />
                </div>
                <span>Post New Listing</span>
              </Link>

              <Link to="/listings" className="action-btn">
                <div className="action-icon browse">
                  <Package size={20} />
                </div>
                <span>Browse Parts</span>
              </Link>

              <Link to="/teams" className="action-btn">
                <div className="action-icon teams">
                  <Users size={20} />
                </div>
                <span>Find Teams</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* My Listings */}
        <motion.div
          className="my-listings-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="section-header">
            <h2>My Listings</h2>
            {team && (
              <Link to="/listings/create" className="btn btn-primary btn-sm">
                <Plus size={16} />
                New Listing
              </Link>
            )}
          </div>

          {loading ? (
            <LoadingSpinner />
          ) : !team ? (
            <div className="empty-state">
              <Package size={40} />
              <p>Join a team to start creating listings</p>
            </div>
          ) : listings.length === 0 ? (
            <div className="empty-state">
              <Package size={40} />
              <p>You haven't created any listings yet</p>
              <Link to="/listings/create" className="btn btn-primary">
                Create Your First Listing
              </Link>
            </div>
          ) : (
            <div className="listings-table">
              <div className="table-header">
                <span>Title</span>
                <span>Type</span>
                <span>Category</span>
                <span>Posted</span>
                <span>Actions</span>
              </div>

              {listings.map((listing, index) => (
                <motion.div
                  key={listing.id}
                  className="table-row"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="listing-title">
                    <Link to={`/listings/${listing.id}`}>{listing.title}</Link>
                  </span>
                  <span>
                    <span className={`badge badge-${listing.type}`}>
                      {listing.type === 'have' ? 'Have' : 'Want'}
                    </span>
                  </span>
                  <span className="listing-category">{listing.category}</span>
                  <span className="listing-date">
                    {new Date(listing.created_at).toLocaleDateString()}
                  </span>
                  <span className="listing-actions">
                    <Link to={`/listings/${listing.id}/edit`} className="action-icon-btn">
                      <Edit size={16} />
                    </Link>
                    <button
                      className="action-icon-btn delete"
                      onClick={() => handleDelete(listing.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      <style>{`
        .dashboard {
          padding: 40px 0 80px;
        }

        .dashboard-header {
          margin-bottom: 32px;
        }

        .dashboard-header h1 {
          font-size: 32px;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .dashboard-header p {
          color: var(--text-secondary);
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-bottom: 40px;
        }

        .dashboard-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
          color: var(--primary);
        }

        .card-header h2 {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .team-card {
          transition: all var(--transition-base);
        }

        .team-card:hover {
          border-color: var(--primary);
          box-shadow: var(--shadow-glow);
        }

        .team-card-link {
          display: block;
          text-decoration: none;
          color: inherit;
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

        .team-card-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 16px;
          padding-top: 12px;
          border-top: 1px solid var(--border-color);
        }

        .edit-team-link {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: var(--text-muted);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .edit-team-link:hover {
          color: var(--primary);
        }

        .no-team {
          text-align: center;
          padding: 20px;
        }

        .no-team svg {
          color: var(--text-muted);
          margin-bottom: 12px;
        }

        .no-team p {
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .quick-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: var(--bg-dark);
          border-radius: var(--radius-md);
          text-decoration: none;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }

        .action-btn:hover {
          background: var(--secondary-light);
          transform: translateX(4px);
        }

        .action-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          color: white;
        }

        .action-icon.have { background: var(--accent-green); }
        .action-icon.browse { background: var(--primary); }
        .action-icon.teams { background: var(--accent-purple); }

        .my-listings-section {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 24px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-header h2 {
          font-size: 18px;
          font-weight: 600;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
        }

        .empty-state svg {
          color: var(--text-muted);
          margin-bottom: 16px;
        }

        .empty-state p {
          margin-bottom: 20px;
        }

        .listings-table {
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .table-header {
          display: grid;
          grid-template-columns: 2fr 100px 120px 100px 100px;
          gap: 16px;
          padding: 14px 20px;
          background: var(--bg-dark);
          font-size: 13px;
          font-weight: 600;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .table-row {
          display: grid;
          grid-template-columns: 2fr 100px 120px 100px 100px;
          gap: 16px;
          padding: 16px 20px;
          align-items: center;
          border-top: 1px solid var(--border-color);
          transition: background var(--transition-fast);
        }

        .table-row:hover {
          background: var(--bg-dark);
        }

        .listing-title a {
          color: var(--text-primary);
          font-weight: 500;
        }

        .listing-title a:hover {
          color: var(--primary);
        }

        .listing-category {
          font-size: 14px;
          color: var(--text-secondary);
          text-transform: capitalize;
        }

        .listing-date {
          font-size: 14px;
          color: var(--text-muted);
        }

        .listing-actions {
          display: flex;
          gap: 8px;
        }

        .action-icon-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-dark);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .action-icon-btn:hover {
          color: var(--primary);
          border-color: var(--primary);
        }

        .action-icon-btn.delete:hover {
          color: #ff4444;
          border-color: #ff4444;
        }

        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .table-header,
          .table-row {
            grid-template-columns: 1fr 80px 80px;
          }

          .table-header span:nth-child(3),
          .table-header span:nth-child(4),
          .table-row span:nth-child(3),
          .table-row span:nth-child(4) {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

function getMockListings() {
  return [
    {
      id: 1,
      title: 'REV Robotics HD Hex Motor',
      type: 'have',
      category: 'motors',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      title: 'Color Sensor V3',
      type: 'have',
      category: 'sensors',
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ]
}

export default Dashboard
