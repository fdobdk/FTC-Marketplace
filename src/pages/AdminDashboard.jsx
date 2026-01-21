import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Users, Package, MessageSquare, TrendingUp,
  Search, Filter, Edit3, Trash2, Eye, AlertCircle,
  Check, X, ChevronLeft, ChevronRight, RefreshCw
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'

const STATUS_COLORS = {
  active: '#22c55e',
  pending: '#f59e0b',
  closed: '#6b7280',
  deleted: '#ef4444'
}

function AdminDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('overview')
  const [stats, setStats] = useState(null)
  const [listings, setListings] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(null)

  // Filters
  const [listingFilters, setListingFilters] = useState({
    status: '',
    search: '',
    page: 1
  })
  const [commentFilters, setCommentFilters] = useState({
    search: '',
    page: 1
  })

  const [pagination, setPagination] = useState({ total: 0, total_pages: 1 })
  const [editingListing, setEditingListing] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    if (!user?.is_site_admin) {
      navigate('/dashboard')
      return
    }
    fetchStats()
  }, [user, navigate])

  useEffect(() => {
    if (activeTab === 'listings') {
      fetchListings()
    } else if (activeTab === 'comments') {
      fetchComments()
    }
  }, [activeTab, listingFilters, commentFilters])

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats.php')
      setStats(response.data.stats)
    } catch (err) {
      setError('Failed to load statistics')
    } finally {
      setLoading(false)
    }
  }

  const fetchListings = async () => {
    try {
      const params = new URLSearchParams()
      if (listingFilters.status) params.append('status', listingFilters.status)
      if (listingFilters.search) params.append('search', listingFilters.search)
      params.append('page', listingFilters.page)
      params.append('limit', 15)

      const response = await api.get(`/admin/listings.php?${params}`)
      setListings(response.data.listings)
      setPagination(response.data.pagination)
    } catch (err) {
      setError('Failed to load listings')
    }
  }

  const fetchComments = async () => {
    try {
      const params = new URLSearchParams()
      if (commentFilters.search) params.append('search', commentFilters.search)
      params.append('page', commentFilters.page)
      params.append('limit', 15)

      const response = await api.get(`/admin/comments.php?${params}`)
      setComments(response.data.comments)
      setPagination(response.data.pagination)
    } catch (err) {
      setError('Failed to load comments')
    }
  }

  const handleUpdateListing = async (id, updates) => {
    setActionLoading(id)
    setError('')
    try {
      await api.put('/admin/listings.php', { id, ...updates })
      setSuccess('Listing updated successfully')
      fetchListings()
      setEditingListing(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update listing')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteListing = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this listing? This action cannot be undone.')) {
      return
    }
    setActionLoading(id)
    setError('')
    try {
      await api.delete(`/admin/listings.php?id=${id}`)
      setSuccess('Listing deleted successfully')
      fetchListings()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete listing')
    } finally {
      setActionLoading(null)
    }
  }

  const handleDeleteComment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return
    }
    setActionLoading(id)
    setError('')
    try {
      await api.delete(`/admin/comments.php?id=${id}`)
      setSuccess('Comment deleted successfully')
      fetchComments()
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete comment')
    } finally {
      setActionLoading(null)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!user?.is_site_admin) {
    return null
  }

  return (
    <div className="admin-dashboard">
      <div className="container">
        <motion.div
          className="admin-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="header-content">
            <Shield size={32} className="admin-icon" />
            <div>
              <h1>Admin Dashboard</h1>
              <p>Manage listings, comments, and monitor site activity</p>
            </div>
          </div>
        </motion.div>

        {/* Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              className="message error-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <AlertCircle size={18} />
              {error}
              <button onClick={() => setError('')}><X size={16} /></button>
            </motion.div>
          )}
          {success && (
            <motion.div
              className="message success-message"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Check size={18} />
              {success}
              <button onClick={() => setSuccess('')}><X size={16} /></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <TrendingUp size={18} />
            Overview
          </button>
          <button
            className={`tab ${activeTab === 'listings' ? 'active' : ''}`}
            onClick={() => setActiveTab('listings')}
          >
            <Package size={18} />
            Listings
          </button>
          <button
            className={`tab ${activeTab === 'comments' ? 'active' : ''}`}
            onClick={() => setActiveTab('comments')}
          >
            <MessageSquare size={18} />
            Comments
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overview-content"
          >
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon users">
                  <Users size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stats.total_users}</span>
                  <span className="stat-label">Total Users</span>
                  <span className="stat-sub">+{stats.new_users_7d} this week</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon teams">
                  <Users size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stats.total_teams}</span>
                  <span className="stat-label">Teams</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon listings">
                  <Package size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stats.active_listings}</span>
                  <span className="stat-label">Active Listings</span>
                  <span className="stat-sub">+{stats.new_listings_7d} this week</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon comments">
                  <MessageSquare size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stats.total_comments}</span>
                  <span className="stat-label">Comments</span>
                </div>
              </div>
            </div>

            <div className="charts-row">
              <div className="chart-card">
                <h3>Listings by Status</h3>
                <div className="status-bars">
                  {Object.entries(stats.listings_by_status || {}).map(([status, count]) => (
                    <div key={status} className="status-bar-item">
                      <div className="status-bar-header">
                        <span className="status-name" style={{ color: STATUS_COLORS[status] }}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </span>
                        <span className="status-count">{count}</span>
                      </div>
                      <div className="status-bar-track">
                        <div
                          className="status-bar-fill"
                          style={{
                            width: `${(count / stats.total_listings) * 100}%`,
                            backgroundColor: STATUS_COLORS[status]
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chart-card">
                <h3>Top Categories</h3>
                <div className="category-list">
                  {Object.entries(stats.listings_by_category || {}).slice(0, 5).map(([category, count]) => (
                    <div key={category} className="category-item">
                      <span className="category-name">{category}</span>
                      <span className="category-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Listings Tab */}
        {activeTab === 'listings' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="listings-content"
          >
            <div className="filters-bar">
              <div className="search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search listings..."
                  value={listingFilters.search}
                  onChange={(e) => setListingFilters({ ...listingFilters, search: e.target.value, page: 1 })}
                />
              </div>
              <div className="filter-group">
                <Filter size={18} />
                <select
                  value={listingFilters.status}
                  onChange={(e) => setListingFilters({ ...listingFilters, status: e.target.value, page: 1 })}
                >
                  <option value="">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                  <option value="deleted">Deleted</option>
                </select>
              </div>
              <button className="refresh-btn" onClick={fetchListings}>
                <RefreshCw size={18} />
              </button>
            </div>

            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Team</th>
                    <th>User</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map(listing => (
                    <tr key={listing.id}>
                      <td className="title-cell">
                        <span className="listing-title">{listing.title}</span>
                        <span className="listing-type badge-{listing.type}">{listing.type}</span>
                      </td>
                      <td>{listing.team_number} - {listing.team_name}</td>
                      <td>{listing.user_name}</td>
                      <td>
                        {editingListing === listing.id ? (
                          <select
                            defaultValue={listing.status}
                            onChange={(e) => handleUpdateListing(listing.id, { status: e.target.value })}
                            className="status-select"
                          >
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="closed">Closed</option>
                            <option value="deleted">Deleted</option>
                          </select>
                        ) : (
                          <span
                            className="status-badge"
                            style={{ backgroundColor: `${STATUS_COLORS[listing.status]}20`, color: STATUS_COLORS[listing.status] }}
                          >
                            {listing.status}
                          </span>
                        )}
                      </td>
                      <td>{formatDate(listing.created_at)}</td>
                      <td className="actions-cell">
                        <button
                          className="action-btn view"
                          onClick={() => window.open(`/listings/${listing.id}`, '_blank')}
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="action-btn edit"
                          onClick={() => setEditingListing(editingListing === listing.id ? null : listing.id)}
                          title="Edit Status"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDeleteListing(listing.id)}
                          disabled={actionLoading === listing.id}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button
                disabled={listingFilters.page <= 1}
                onClick={() => setListingFilters({ ...listingFilters, page: listingFilters.page - 1 })}
              >
                <ChevronLeft size={18} />
              </button>
              <span>Page {listingFilters.page} of {pagination.total_pages}</span>
              <button
                disabled={listingFilters.page >= pagination.total_pages}
                onClick={() => setListingFilters({ ...listingFilters, page: listingFilters.page + 1 })}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="comments-content"
          >
            <div className="filters-bar">
              <div className="search-box">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search comments..."
                  value={commentFilters.search}
                  onChange={(e) => setCommentFilters({ ...commentFilters, search: e.target.value, page: 1 })}
                />
              </div>
              <button className="refresh-btn" onClick={fetchComments}>
                <RefreshCw size={18} />
              </button>
            </div>

            <div className="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Comment</th>
                    <th>Listing</th>
                    <th>User</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {comments.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="empty-state">No comments found</td>
                    </tr>
                  ) : (
                    comments.map(comment => (
                      <tr key={comment.id}>
                        <td className="comment-cell">
                          <p className="comment-content">{comment.content}</p>
                        </td>
                        <td>{comment.listing_title}</td>
                        <td>
                          {comment.user_name}
                          {comment.team_number && <span className="team-badge">#{comment.team_number}</span>}
                        </td>
                        <td>{formatDate(comment.created_at)}</td>
                        <td className="actions-cell">
                          <button
                            className="action-btn delete"
                            onClick={() => handleDeleteComment(comment.id)}
                            disabled={actionLoading === comment.id}
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination">
              <button
                disabled={commentFilters.page <= 1}
                onClick={() => setCommentFilters({ ...commentFilters, page: commentFilters.page - 1 })}
              >
                <ChevronLeft size={18} />
              </button>
              <span>Page {commentFilters.page} of {pagination.total_pages}</span>
              <button
                disabled={commentFilters.page >= pagination.total_pages}
                onClick={() => setCommentFilters({ ...commentFilters, page: commentFilters.page + 1 })}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        .admin-dashboard {
          padding: 40px 0 80px;
        }

        .admin-header {
          margin-bottom: 32px;
        }

        .header-content {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .admin-icon {
          color: var(--primary);
        }

        .admin-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 4px;
        }

        .admin-header p {
          color: var(--text-secondary);
        }

        .message {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          margin-bottom: 20px;
          font-size: 14px;
        }

        .message button {
          margin-left: auto;
          background: none;
          border: none;
          cursor: pointer;
          opacity: 0.7;
        }

        .message button:hover {
          opacity: 1;
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

        .admin-tabs {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 0;
        }

        .tab {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          transition: all var(--transition-fast);
        }

        .tab:hover {
          color: var(--text-primary);
        }

        .tab.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 24px;
        }

        .stat-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
        }

        .stat-icon.users { background: rgba(99, 102, 241, 0.15); color: #6366f1; }
        .stat-icon.teams { background: rgba(34, 197, 94, 0.15); color: #22c55e; }
        .stat-icon.listings { background: rgba(245, 158, 11, 0.15); color: #f59e0b; }
        .stat-icon.comments { background: rgba(236, 72, 153, 0.15); color: #ec4899; }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 28px;
          font-weight: 700;
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .stat-sub {
          color: var(--accent-green);
          font-size: 12px;
          margin-top: 4px;
        }

        /* Charts */
        .charts-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .chart-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          padding: 20px;
        }

        .chart-card h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .status-bars {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .status-bar-header {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          margin-bottom: 4px;
        }

        .status-bar-track {
          height: 8px;
          background: var(--bg-dark);
          border-radius: 4px;
          overflow: hidden;
        }

        .status-bar-fill {
          height: 100%;
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .category-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .category-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 12px;
          background: var(--bg-dark);
          border-radius: var(--radius-md);
          font-size: 13px;
        }

        .category-count {
          color: var(--primary);
          font-weight: 600;
        }

        /* Filters */
        .filters-bar {
          display: flex;
          gap: 12px;
          margin-bottom: 20px;
        }

        .search-box {
          flex: 1;
          position: relative;
        }

        .search-box svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
        }

        .search-box input {
          width: 100%;
          padding: 10px 14px 10px 42px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 14px;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 14px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
        }

        .filter-group svg {
          color: var(--text-muted);
        }

        .filter-group select {
          background: none;
          border: none;
          color: var(--text-primary);
          font-size: 14px;
          padding: 10px 0;
          cursor: pointer;
        }

        .refresh-btn {
          padding: 10px 14px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .refresh-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        /* Data Table */
        .data-table {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-lg);
          overflow: hidden;
        }

        .data-table table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th,
        .data-table td {
          padding: 14px 16px;
          text-align: left;
          border-bottom: 1px solid var(--border-color);
        }

        .data-table th {
          background: var(--bg-dark);
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
        }

        .data-table tr:last-child td {
          border-bottom: none;
        }

        .data-table tr:hover {
          background: var(--bg-dark);
        }

        .title-cell {
          max-width: 250px;
        }

        .listing-title {
          display: block;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .listing-type {
          font-size: 11px;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(245, 124, 0, 0.15);
          color: var(--primary);
        }

        .status-badge {
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
          text-transform: capitalize;
        }

        .status-select {
          padding: 4px 8px;
          background: var(--bg-dark);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-size: 12px;
        }

        .actions-cell {
          display: flex;
          gap: 8px;
        }

        .action-btn {
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

        .action-btn:hover {
          border-color: var(--text-secondary);
        }

        .action-btn.view:hover {
          border-color: #6366f1;
          color: #6366f1;
        }

        .action-btn.edit:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .action-btn.delete:hover {
          border-color: #ef4444;
          color: #ef4444;
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .comment-cell {
          max-width: 300px;
        }

        .comment-content {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          font-size: 13px;
          line-height: 1.4;
        }

        .team-badge {
          font-size: 11px;
          padding: 2px 6px;
          margin-left: 6px;
          background: rgba(245, 124, 0, 0.15);
          color: var(--primary);
          border-radius: 4px;
        }

        .empty-state {
          text-align: center;
          color: var(--text-muted);
          padding: 40px !important;
        }

        /* Pagination */
        .pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-top: 20px;
        }

        .pagination button {
          padding: 8px 12px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .pagination button:hover:not(:disabled) {
          border-color: var(--primary);
          color: var(--primary);
        }

        .pagination button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination span {
          color: var(--text-secondary);
          font-size: 14px;
        }

        @media (max-width: 1024px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .charts-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          .filters-bar {
            flex-direction: column;
          }
          .data-table {
            overflow-x: auto;
          }
        }
      `}</style>
    </div>
  )
}

export default AdminDashboard
