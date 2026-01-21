import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MapPin, Package, Users, Clock, Mail, AlertCircle, DollarSign, RefreshCw, ArrowLeftRight, Phone, User, ChevronLeft, ChevronRight, Image, Edit3, CheckCircle, XCircle, MessageSquare, Send, Trash2 } from 'lucide-react'
import { CATEGORIES, CONDITIONS } from '../utils/states'

// Discord icon component
const DiscordIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
)
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'

const PAYMENT_LABELS = {
  cash: { label: 'Cash Only', icon: DollarSign, color: '#22c55e' },
  trade: { label: 'Trade Only', icon: RefreshCw, color: '#f59e0b' },
  either: { label: 'Cash or Trade', icon: ArrowLeftRight, color: '#a78bfa' }
}

const STATUS_LABELS = {
  active: { label: 'Available', color: '#22c55e', icon: CheckCircle },
  pending: { label: 'In Progress', color: '#f59e0b', icon: Clock },
  closed: { label: 'Sold/Completed', color: '#ef4444', icon: XCircle }
}

function ListingDetail() {
  const { id } = useParams()
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showContact, setShowContact] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { isAuthenticated, user } = useAuth()

  // Comments state
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [commentLoading, setCommentLoading] = useState(false)
  const [commentError, setCommentError] = useState('')

  const canEdit = user && listing && listing.team_id === user.team_id

  useEffect(() => {
    fetchListing()
    fetchComments()
  }, [id])

  const fetchListing = async () => {
    try {
      const response = await api.get(`/listings/detail.php?id=${id}`)
      setListing(response.data.listing)
    } catch (error) {
      // Mock data for demo
      setListing(getMockListing(id))
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async () => {
    try {
      const response = await api.get(`/listings/comments.php?listing_id=${id}`)
      setComments(response.data.comments || [])
    } catch (error) {
      // Comments might not exist yet
      setComments([])
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    if (!newComment.trim()) return

    setCommentLoading(true)
    setCommentError('')

    try {
      const response = await api.post('/listings/comments.php', {
        listing_id: id,
        content: newComment.trim()
      })
      setComments(prev => [...prev, response.data.comment])
      setNewComment('')
    } catch (error) {
      setCommentError(error.response?.data?.message || 'Failed to add comment')
    } finally {
      setCommentLoading(false)
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return

    try {
      await api.delete(`/listings/comments.php?id=${commentId}`)
      setComments(prev => prev.filter(c => c.id !== commentId))
    } catch (error) {
      setCommentError(error.response?.data?.message || 'Failed to delete comment')
    }
  }

  const formatCommentDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getCategoryLabel = (value) => {
    return CATEGORIES.find(c => c.value === value)?.label || value
  }

  const getConditionLabel = (value) => {
    return CONDITIONS.find(c => c.value === value)?.label || value
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getPaymentInfo = (value) => {
    return PAYMENT_LABELS[value] || PAYMENT_LABELS.either
  }

  const nextImage = () => {
    if (listing?.images?.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % listing.images.length)
    }
  }

  const prevImage = () => {
    if (listing?.images?.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + listing.images.length) % listing.images.length)
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!listing) {
    return (
      <div className="not-found">
        <AlertCircle size={48} />
        <h2>Listing Not Found</h2>
        <Link to="/listings" className="btn btn-primary">
          Back to Listings
        </Link>
      </div>
    )
  }

  return (
    <div className="listing-detail">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="detail-top-bar">
            <Link to="/listings" className="back-link">
              <ArrowLeft size={18} />
              Back to Listings
            </Link>

            {canEdit && (
              <Link to={`/listings/${id}/edit`} className="btn btn-secondary edit-listing-btn">
                <Edit3 size={16} />
                Edit Listing
              </Link>
            )}
          </div>

          {/* Status Badge (if not active) */}
          {listing.status && listing.status !== 'active' && (
            <div className="status-banner" style={{ '--status-color': STATUS_LABELS[listing.status]?.color || '#6b7280' }}>
              {(() => {
                const statusInfo = STATUS_LABELS[listing.status]
                const StatusIcon = statusInfo?.icon || AlertCircle
                return (
                  <>
                    <StatusIcon size={20} />
                    <span>This listing is marked as: <strong>{statusInfo?.label || listing.status}</strong></span>
                  </>
                )
              })()}
            </div>
          )}

          {/* Image Gallery */}
          {listing.images && listing.images.length > 0 && (
            <div className="image-gallery">
              <div className="gallery-main">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={listing.images[currentImageIndex]?.path}
                    alt={`${listing.title} - Image ${currentImageIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                </AnimatePresence>
                {listing.images.length > 1 && (
                  <>
                    <button className="gallery-nav prev" onClick={prevImage}>
                      <ChevronLeft size={24} />
                    </button>
                    <button className="gallery-nav next" onClick={nextImage}>
                      <ChevronRight size={24} />
                    </button>
                    <div className="gallery-dots">
                      {listing.images.map((_, idx) => (
                        <button
                          key={idx}
                          className={`gallery-dot ${idx === currentImageIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(idx)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              {listing.images.length > 1 && (
                <div className="gallery-thumbnails">
                  {listing.images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`thumbnail ${idx === currentImageIndex ? 'active' : ''}`}
                      onClick={() => setCurrentImageIndex(idx)}
                    >
                      <img src={img.path} alt={`Thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="detail-grid">
            <div className="detail-main">
              <div className="detail-header">
                <div className="badges">
                  <span className={`badge badge-${listing.type}`}>
                    {listing.type === 'have' ? 'Available' : 'Wanted'}
                  </span>
                  <span className="badge badge-category">
                    {getCategoryLabel(listing.category)}
                  </span>
                  {(() => {
                    const paymentInfo = getPaymentInfo(listing.payment_type)
                    const PaymentIcon = paymentInfo.icon
                    return (
                      <span className="badge badge-payment" style={{ background: `${paymentInfo.color}20`, color: paymentInfo.color }}>
                        <PaymentIcon size={14} />
                        {paymentInfo.label}
                      </span>
                    )
                  })()}
                </div>

                <h1>{listing.title}</h1>

                <div className="listing-meta">
                  <span className="meta-item">
                    <Clock size={16} />
                    Posted {formatDate(listing.created_at)}
                  </span>
                  <span className="meta-item">
                    <MapPin size={16} />
                    {listing.city}, {listing.state}
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h2>Description</h2>
                <p>{listing.description}</p>
              </div>

              {listing.type === 'have' && (
                <div className="detail-section">
                  <h2>Details</h2>
                  <div className="details-grid">
                    {listing.condition && (
                      <div className="detail-item">
                        <span className="detail-label">Condition</span>
                        <span className="detail-value">{getConditionLabel(listing.condition)}</span>
                      </div>
                    )}
                    {listing.quantity && (
                      <div className="detail-item">
                        <span className="detail-label">Quantity</span>
                        <span className="detail-value">{listing.quantity}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Comments Section */}
              <div className="detail-section comments-section">
                <h2>
                  <MessageSquare size={20} />
                  Comments ({comments.length})
                </h2>

                {isAuthenticated && (
                  <form onSubmit={handleAddComment} className="comment-form">
                    {commentError && (
                      <div className="comment-error">
                        <AlertCircle size={14} />
                        {commentError}
                      </div>
                    )}
                    <div className="comment-input-wrapper">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Ask a question or leave a comment..."
                        rows={2}
                        maxLength={2000}
                      />
                      <button
                        type="submit"
                        disabled={commentLoading || !newComment.trim()}
                        className="btn btn-primary comment-submit"
                      >
                        {commentLoading ? '...' : <Send size={18} />}
                      </button>
                    </div>
                  </form>
                )}

                {!isAuthenticated && (
                  <div className="comment-login-prompt">
                    <Link to="/login">Sign in</Link> to leave a comment
                  </div>
                )}

                <div className="comments-list">
                  {comments.length === 0 ? (
                    <div className="no-comments">
                      <MessageSquare size={24} />
                      <p>No comments yet. Be the first to ask a question!</p>
                    </div>
                  ) : (
                    comments.map(comment => (
                      <motion.div
                        key={comment.id}
                        className="comment-item"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <div className="comment-header">
                          <div className="comment-author">
                            <div className="author-avatar">
                              <User size={16} />
                            </div>
                            <div className="author-info">
                              <span className="author-name">{comment.user_name}</span>
                              {comment.team_number && (
                                <span className="author-team">Team {comment.team_number}</span>
                              )}
                              {comment.team_role && (
                                <span className="author-role">{comment.team_role}</span>
                              )}
                            </div>
                          </div>
                          <div className="comment-meta">
                            <span className="comment-time">{formatCommentDate(comment.created_at)}</span>
                            {(user?.id === comment.user_id || user?.is_site_admin) && (
                              <button
                                className="comment-delete"
                                onClick={() => handleDeleteComment(comment.id)}
                                title="Delete comment"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="comment-content">{comment.content}</p>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="detail-sidebar">
              {/* Team Card */}
              <div className="team-card">
                <div className="team-header">
                  <div className="team-icon">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3>Team {listing.team_number}</h3>
                    <p>{listing.team_name}</p>
                  </div>
                </div>

                <div className="team-location">
                  <MapPin size={16} />
                  {listing.city}, {listing.state}
                </div>

                <Link to={`/teams/${listing.team_id || listing.team_number}`} className="view-team-link">
                  View Team Profile
                </Link>
              </div>

              {/* Listed By Card */}
              <div className="member-card">
                <div className="member-header">
                  <div className="member-icon">
                    <User size={20} />
                  </div>
                  <div>
                    <span className="member-label">Listed by</span>
                    <h4>{listing.user_name}</h4>
                  </div>
                </div>

                {isAuthenticated ? (
                  <>
                    {showContact ? (
                      <motion.div
                        className="contact-info"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                      >
                        {/* User's preferred contact methods */}
                        {listing.user_contact_email && (
                          <div className="contact-item">
                            <Mail size={16} />
                            <a href={`mailto:${listing.user_contact_email}`}>
                              {listing.user_contact_email}
                            </a>
                          </div>
                        )}
                        {listing.user_contact_phone && (
                          <div className="contact-item">
                            <Phone size={16} />
                            <a href={`tel:${listing.user_contact_phone}`}>
                              {listing.user_contact_phone}
                            </a>
                          </div>
                        )}
                        {listing.user_contact_discord && (
                          <div className="contact-item">
                            <DiscordIcon size={16} />
                            <span>{listing.user_contact_discord}</span>
                          </div>
                        )}
                        {/* Fallback to team email if no user contact info */}
                        {!listing.user_contact_email && !listing.user_contact_phone && !listing.user_contact_discord && (
                          <div className="contact-item">
                            <Mail size={16} />
                            <a href={`mailto:${listing.team_contact_email || 'team@example.com'}`}>
                              {listing.team_contact_email || 'team@example.com'}
                            </a>
                          </div>
                        )}
                        <p className="contact-note">
                          <b>User assumes all responsibility for this listing</b>
                          <br />Please mention the listing title when reaching out.
                          <br />FTC Market does not take any responsibility for inaccurate item descriptions 
                        </p>
                      </motion.div>
                    ) : (
                      <motion.button
                        className="btn btn-primary contact-btn"
                        onClick={() => setShowContact(true)} 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Mail size={18} />
                        Show Contact Info
                      </motion.button>
                    )}
                  </>
                ) : (
                  <div className="login-prompt">
                    <p>Sign in to view contact information</p>
                    <Link to="/login" className="btn btn-primary">
                      Sign In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .listing-detail {
          padding: 40px 0 80px;
        }

        .detail-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          transition: color var(--transition-fast);
        }

        .back-link:hover {
          color: var(--primary);
        }

        .edit-listing-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .btn-secondary {
          background: var(--bg-dark);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 10px 16px;
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
        }

        .btn-secondary:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        /* Status Banner */
        .status-banner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: color-mix(in srgb, var(--status-color) 15%, var(--bg-card));
          border: 1px solid var(--status-color);
          border-radius: var(--radius-lg);
          margin-bottom: 24px;
          color: var(--status-color);
        }

        .status-banner strong {
          text-transform: capitalize;
        }

        /* Image Gallery */
        .image-gallery {
          margin-bottom: 32px;
        }

        .gallery-main {
          position: relative;
          width: 100%;
          height: 400px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          overflow: hidden;
        }

        .gallery-main img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          background: var(--bg-dark);
        }

        .gallery-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.6);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          transition: all var(--transition-fast);
          z-index: 10;
        }

        .gallery-nav:hover {
          background: var(--primary);
        }

        .gallery-nav.prev {
          left: 16px;
        }

        .gallery-nav.next {
          right: 16px;
        }

        .gallery-dots {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
        }

        .gallery-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          border: none;
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .gallery-dot.active {
          background: var(--primary);
        }

        .gallery-thumbnails {
          display: flex;
          gap: 12px;
          margin-top: 12px;
          overflow-x: auto;
          padding: 4px;
        }

        .thumbnail {
          flex-shrink: 0;
          width: 80px;
          height: 80px;
          border: 2px solid transparent;
          border-radius: var(--radius-md);
          overflow: hidden;
          cursor: pointer;
          transition: all var(--transition-fast);
          padding: 0;
          background: none;
        }

        .thumbnail:hover {
          border-color: var(--border-light);
        }

        .thumbnail.active {
          border-color: var(--primary);
        }

        .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 32px;
          align-items: start;
        }

        .detail-main {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 32px;
        }

        .detail-header {
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--border-color);
        }

        .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 16px;
        }

        .badge-payment {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .detail-header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .listing-meta {
          display: flex;
          gap: 24px;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
        }

        .detail-section {
          margin-bottom: 32px;
        }

        .detail-section:last-child {
          margin-bottom: 0;
        }

        .detail-section h2 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .detail-section p {
          color: var(--text-secondary);
          line-height: 1.7;
          white-space: pre-wrap;
        }

        .details-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .detail-item {
          background: var(--bg-dark);
          padding: 16px;
          border-radius: var(--radius-md);
        }

        .detail-label {
          display: block;
          font-size: 12px;
          color: var(--text-muted);
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .detail-value {
          font-size: 16px;
          font-weight: 600;
        }

        .team-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 24px;
        }

        .team-header {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
        }

        .team-icon {
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
          border-radius: var(--radius-md);
          color: white;
        }

        .team-header h3 {
          font-size: 18px;
          font-weight: 600;
        }

        .team-header p {
          color: var(--text-secondary);
          font-size: 14px;
        }

        .team-location {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 16px;
        }

        /* Member Card */
        .member-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          padding: 24px;
          margin-top: 16px;
        }

        .member-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        .member-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-dark);
          border-radius: 50%;
          color: var(--text-secondary);
        }

        .member-label {
          display: block;
          font-size: 12px;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .member-header h4 {
          font-size: 16px;
          font-weight: 600;
          margin-top: 2px;
        }

        .contact-btn {
          width: 100%;
        }

        .contact-info {
          overflow: hidden;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px;
          background: rgba(245, 124, 0, 0.1);
          border-radius: var(--radius-md);
          margin-bottom: 12px;
        }

        .contact-item a {
          color: var(--primary);
          font-weight: 500;
        }

        .contact-note {
          font-size: 12px;
          color: var(--text-muted);
          text-align: center;
        }

        .login-prompt {
          text-align: center;
          padding: 20px;
          background: var(--bg-dark);
          border-radius: var(--radius-md);
        }

        .login-prompt p {
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 12px;
        }

        .view-team-link {
          display: block;
          text-align: center;
          margin-top: 16px;
          font-size: 14px;
          color: var(--text-secondary);
        }

        .view-team-link:hover {
          color: var(--primary);
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

        /* Comments Section */
        .comments-section h2 {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .comment-form {
          margin-bottom: 24px;
        }

        .comment-error {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          background: rgba(255, 68, 68, 0.1);
          border: 1px solid rgba(255, 68, 68, 0.3);
          border-radius: var(--radius-md);
          color: #ff6b6b;
          font-size: 13px;
          margin-bottom: 12px;
        }

        .comment-input-wrapper {
          display: flex;
          gap: 12px;
          align-items: flex-end;
        }

        .comment-input-wrapper textarea {
          flex: 1;
          padding: 12px 14px;
          background: var(--bg-dark);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-primary);
          font-size: 14px;
          resize: none;
          font-family: inherit;
        }

        .comment-input-wrapper textarea:focus {
          outline: none;
          border-color: var(--primary);
        }

        .comment-submit {
          padding: 12px 16px;
          height: fit-content;
        }

        .comment-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .comment-login-prompt {
          padding: 16px;
          background: var(--bg-dark);
          border-radius: var(--radius-md);
          text-align: center;
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 24px;
        }

        .comment-login-prompt a {
          color: var(--primary);
          font-weight: 500;
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .no-comments {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 40px 20px;
          color: var(--text-muted);
          text-align: center;
        }

        .no-comments p {
          font-size: 14px;
        }

        .comment-item {
          padding: 16px;
          background: var(--bg-dark);
          border-radius: var(--radius-md);
          border: 1px solid var(--border-color);
        }

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }

        .comment-author {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .author-avatar {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          border-radius: 50%;
          color: var(--text-muted);
        }

        .author-info {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 6px;
        }

        .author-name {
          font-weight: 600;
          font-size: 14px;
        }

        .author-team {
          font-size: 12px;
          color: var(--primary);
          background: rgba(245, 124, 0, 0.15);
          padding: 2px 8px;
          border-radius: 10px;
        }

        .author-role {
          font-size: 11px;
          color: var(--text-muted);
          background: var(--bg-card);
          padding: 2px 8px;
          border-radius: 10px;
        }

        .comment-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .comment-time {
          font-size: 12px;
          color: var(--text-muted);
        }

        .comment-delete {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          background: none;
          border: 1px solid transparent;
          border-radius: var(--radius-sm);
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .comment-delete:hover {
          border-color: #ef4444;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
        }

        .comment-content {
          font-size: 14px;
          line-height: 1.6;
          color: var(--text-secondary);
          white-space: pre-wrap;
        }

        @media (max-width: 900px) {
          .detail-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

function getMockListing(id) {
  return {
    id,
    title: 'REV Robotics HD Hex Motor',
    type: 'have',
    category: 'motors',
    condition: 'like-new',
    quantity: 2,
    payment_type: 'either',
    description: 'Barely used HD Hex motors from last season. Work perfectly. We upgraded to the new UltraPlanetary motors and no longer need these.\n\nIncludes original packaging and all mounting hardware.',
    team_number: '12345',
    team_name: 'TechBots',
    team_id: 1,
    state: 'CA',
    city: 'San Jose',
    team_contact_email: 'team12345@example.com',
    user_name: 'John Doe',
    user_contact_email: 'john@example.com',
    user_contact_phone: '(555) 123-4567',
    user_contact_discord: 'johndoe#1234',
    images: [],
    created_at: new Date().toISOString()
  }
}

export default ListingDetail
