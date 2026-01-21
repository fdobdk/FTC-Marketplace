import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Clock, Package, Users, DollarSign, RefreshCw, ArrowLeftRight, Image } from 'lucide-react'
import { CATEGORIES, CONDITIONS } from '../utils/states'

const PAYMENT_LABELS = {
  cash: { label: 'Cash', icon: DollarSign },
  trade: { label: 'Trade', icon: RefreshCw },
  either: { label: 'Cash/Trade', icon: ArrowLeftRight }
}

function ListingCard({ listing }) {
  const getCategoryLabel = (value) => {
    return CATEGORIES.find(c => c.value === value)?.label || value
  }

  const getConditionLabel = (value) => {
    return CONDITIONS.find(c => c.value === value)?.label || value
  }

  const getPaymentInfo = (value) => {
    return PAYMENT_LABELS[value] || PAYMENT_LABELS.either
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return 'Today'
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const paymentInfo = getPaymentInfo(listing.payment_type)
  const PaymentIcon = paymentInfo.icon

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/listings/${listing.id}`} className="listing-card">
        {listing.primary_image ? (
          <div className="card-image">
            <img src={listing.primary_image} alt={listing.title} />
          </div>
        ) : (
          <div className="card-image card-image-placeholder">
            <Image size={32} />
          </div>
        )}

        <div className="card-body">
          <div className="card-header">
            <span className={`badge badge-${listing.type}`}>
              {listing.type === 'have' ? 'Available' : 'Wanted'}
            </span>
            <span className="badge badge-category">
              {getCategoryLabel(listing.category)}
            </span>
            <span className="badge badge-payment">
              <PaymentIcon size={12} />
              {paymentInfo.label}
            </span>
          </div>

          <h3 className="card-title">{listing.title}</h3>

          <p className="card-description">
            {listing.description?.substring(0, 100)}
            {listing.description?.length > 100 ? '...' : ''}
          </p>

          <div className="card-meta">
            {listing.condition && (
              <span className="meta-item">
                <Package size={14} />
                {getConditionLabel(listing.condition)}
              </span>
            )}
            {listing.quantity && (
              <span className="meta-item">
                Qty: {listing.quantity}
              </span>
            )}
          </div>

          <div className="card-footer">
            <div className="team-info">
              <Users size={14} />
              <span>Team {listing.team_number}</span>
            </div>
            <div className="location-info">
              <MapPin size={14} />
              <span>{listing.city}, {listing.state}</span>
            </div>
          </div>

          <div className="card-time">
            <Clock size={12} />
            {formatDate(listing.created_at)}
          </div>
        </div>

        <style>{`
          .listing-card {
            display: flex;
            flex-direction: column;
            height: 100%;
            background: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            text-decoration: none;
            color: inherit;
            transition: all var(--transition-base);
            overflow: hidden;
          }

          .listing-card:hover {
            border-color: var(--primary);
            box-shadow: var(--shadow-glow);
          }

          .card-image {
            width: 100%;
            height: 160px;
            overflow: hidden;
          }

          .card-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform var(--transition-base);
          }

          .listing-card:hover .card-image img {
            transform: scale(1.05);
          }

          .card-image-placeholder {
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--bg-dark);
            color: var(--text-muted);
          }

          .card-body {
            display: flex;
            flex-direction: column;
            flex: 1;
            padding: 20px;
          }

          .card-header {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 12px;
          }

          .badge-payment {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            background: rgba(124, 58, 237, 0.15);
            color: #a78bfa;
          }

          .card-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 10px;
            color: var(--text-primary);
            line-height: 1.4;
          }

          .card-description {
            font-size: 14px;
            color: var(--text-secondary);
            line-height: 1.6;
            margin-bottom: 14px;
            flex: 1;
          }

          .card-meta {
            display: flex;
            gap: 16px;
            margin-bottom: 14px;
          }

          .meta-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: var(--text-muted);
          }

          .card-footer {
            display: flex;
            justify-content: space-between;
            padding-top: 14px;
            border-top: 1px solid var(--border-color);
          }

          .team-info,
          .location-info {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 13px;
            color: var(--text-secondary);
          }

          .card-time {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            color: var(--text-muted);
            margin-top: 10px;
          }
        `}</style>
      </Link>
    </motion.div>
  )
}

export default ListingCard
