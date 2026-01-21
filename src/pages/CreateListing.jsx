import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, AlertCircle, Check, Upload, X, DollarSign, RefreshCw, ArrowLeftRight } from 'lucide-react'
import { CATEGORIES, CONDITIONS } from '../utils/states'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'

const PAYMENT_TYPES = [
  { value: 'cash', label: 'Cash Only', icon: DollarSign, desc: 'Accept cash payments only' },
  { value: 'trade', label: 'Trade Only', icon: RefreshCw, desc: 'Open to trading parts only' },
  { value: 'either', label: 'Cash or Trade', icon: ArrowLeftRight, desc: 'Accept either cash or trades' }
]

function CreateListing() {
  const navigate = useNavigate()
  const { team } = useAuth()
  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState({
    type: 'have',
    title: '',
    category: '',
    condition: '',
    quantity: 1,
    description: '',
    payment_type: 'either'
  })
  const [selectedImages, setSelectedImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
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

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length + selectedImages.length > 5) {
      setError('Maximum 5 images allowed')
      return
    }

    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (!validTypes.includes(file.type)) {
        setError('Invalid file type. Allowed: JPG, PNG, GIF, WEBP')
        return false
      }
      if (file.size > maxSize) {
        setError('File too large. Maximum size is 5MB')
        return false
      }
      return true
    })

    setSelectedImages(prev => [...prev, ...validFiles])

    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, { file, preview: e.target.result }])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const uploadImages = async (listingId) => {
    for (const image of selectedImages) {
      const formData = new FormData()
      formData.append('listing_id', listingId)
      formData.append('image', image)

      try {
        await api.post('/listings/upload.php', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      } catch (err) {
        console.error('Failed to upload image:', err)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!team) {
      setError('You must be part of a team to create a listing')
      setLoading(false)
      return
    }

    try {
      const response = await api.post('/listings/index.php', formData)
      const listingId = response.data.listing.id

      // Upload images if any
      if (selectedImages.length > 0) {
        await uploadImages(listingId)
      }

      navigate(`/listings/${listingId}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create listing')
    } finally {
      setLoading(false)
    }
  }

  if (!team) {
    return (
      <div className="create-listing">
        <div className="container">
          <motion.div
            className="no-team-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Package size={48} />
            <h2>Join a Team First</h2>
            <p>You need to be part of a team before you can create listings.</p>
            <a href="/teams/create" className="btn btn-primary">
              Create or Join a Team
            </a>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="create-listing">
      <div className="container">
        <motion.div
          className="create-form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="form-header">
            <h1>Create Listing</h1>
            <p>Share parts you have or parts you're looking for</p>
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
            {/* Listing Type */}
            <div className="form-section">
              <h3>What type of listing is this?</h3>
              <div className="type-selector">
                <label className={`type-option ${formData.type === 'have' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="type"
                    value="have"
                    checked={formData.type === 'have'}
                    onChange={handleChange}
                  />
                  <div className="type-content">
                    <span className="type-icon have">
                      <Check size={20} />
                    </span>
                    <span className="type-label">I Have</span>
                    <span className="type-desc">I'm offering parts to others</span>
                  </div>
                </label>

                <label className={`type-option ${formData.type === 'want' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="type"
                    value="want"
                    checked={formData.type === 'want'}
                    onChange={handleChange}
                  />
                  <div className="type-content">
                    <span className="type-icon want">
                      <Package size={20} />
                    </span>
                    <span className="type-label">I Want</span>
                    <span className="type-desc">I'm looking for parts</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Basic Info */}
            <div className="form-section">
              <h3>Listing Details</h3>

              <div className="form-group">
                <label className="form-label">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., REV HD Hex Motor, GoBuilda Wheels"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {formData.type === 'have' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Condition</label>
                      <select
                        name="condition"
                        value={formData.condition}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="">Select condition</option>
                        {CONDITIONS.map(cond => (
                          <option key={cond.value} value={cond.value}>{cond.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Quantity</label>
                      <input
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        className="form-input"
                        min="1"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Describe the part(s) in detail. Include any relevant information like brand, model, usage history, etc."
                  required
                  rows={5}
                />
              </div>
            </div>

            {/* Payment Type */}
            <div className="form-section">
              <h3>Payment Preference</h3>
              <p className="section-desc">How would you like to be compensated?</p>
              <div className="payment-selector">
                {PAYMENT_TYPES.map(pt => {
                  const Icon = pt.icon
                  return (
                    <label key={pt.value} className={`payment-option ${formData.payment_type === pt.value ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="payment_type"
                        value={pt.value}
                        checked={formData.payment_type === pt.value}
                        onChange={handleChange}
                      />
                      <div className="payment-content">
                        <Icon size={20} />
                        <span className="payment-label">{pt.label}</span>
                        <span className="payment-desc">{pt.desc}</span>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Image Upload */}
            <div className="form-section">
              <h3>Photos</h3>
              <p className="section-desc">Add up to 5 photos of your item (optional)</p>

              <div className="image-upload-area">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageSelect}
                  accept="image/jpeg,image/png,image/gif,image/webp"
                  multiple
                  style={{ display: 'none' }}
                />

                <div className="image-previews">
                  {imagePreviews.map((img, index) => (
                    <div key={index} className="image-preview">
                      <img src={img.preview} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => removeImage(index)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}

                  {imagePreviews.length < 5 && (
                    <button
                      type="button"
                      className="add-image-btn"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={24} />
                      <span>Add Photo</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Team Info Preview */}
            <div className="form-section">
              <h3>Your Team</h3>
              <div className="team-preview">
                <div className="team-info">
                  <strong>Team {team.team_number}</strong> - {team.name}
                </div>
                <div className="team-location">
                  {team.city}, {team.state}
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn btn-primary btn-lg submit-btn"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Creating...' : 'Create Listing'}
            </motion.button>
          </form>
        </motion.div>
      </div>

      <style>{`
        .create-listing {
          padding: 40px 0 80px;
        }

        .create-form-container {
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

        .form-section {
          margin-bottom: 32px;
          padding-bottom: 32px;
          border-bottom: 1px solid var(--border-color);
        }

        .form-section:last-of-type {
          border-bottom: none;
        }

        .form-section h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .section-desc {
          font-size: 14px;
          color: var(--text-secondary);
          margin-bottom: 16px;
        }

        .type-selector {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .type-option {
          cursor: pointer;
        }

        .type-option input {
          display: none;
        }

        .type-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 24px;
          background: var(--bg-dark);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-lg);
          transition: all var(--transition-fast);
        }

        .type-option:hover .type-content {
          border-color: var(--border-light);
        }

        .type-option.selected .type-content {
          border-color: var(--primary);
          background: rgba(245, 124, 0, 0.05);
        }

        .type-icon {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          color: white;
        }

        .type-icon.have {
          background: var(--accent-green);
        }

        .type-icon.want {
          background: var(--accent-purple);
        }

        .type-label {
          font-size: 16px;
          font-weight: 600;
        }

        .type-desc {
          font-size: 13px;
          color: var(--text-muted);
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 16px;
        }

        /* Payment Type Selector */
        .payment-selector {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .payment-option {
          cursor: pointer;
        }

        .payment-option input {
          display: none;
        }

        .payment-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 12px;
          background: var(--bg-dark);
          border: 2px solid var(--border-color);
          border-radius: var(--radius-md);
          transition: all var(--transition-fast);
          text-align: center;
        }

        .payment-option:hover .payment-content {
          border-color: var(--border-light);
        }

        .payment-option.selected .payment-content {
          border-color: var(--primary);
          background: rgba(245, 124, 0, 0.05);
        }

        .payment-content svg {
          color: var(--text-muted);
        }

        .payment-option.selected .payment-content svg {
          color: var(--primary);
        }

        .payment-label {
          font-size: 14px;
          font-weight: 600;
        }

        .payment-desc {
          font-size: 11px;
          color: var(--text-muted);
          line-height: 1.3;
        }

        /* Image Upload */
        .image-upload-area {
          margin-top: 8px;
        }

        .image-previews {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .image-preview {
          position: relative;
          width: 100px;
          height: 100px;
          border-radius: var(--radius-md);
          overflow: hidden;
        }

        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .remove-image {
          position: absolute;
          top: 4px;
          right: 4px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.7);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          transition: background var(--transition-fast);
        }

        .remove-image:hover {
          background: rgba(255, 68, 68, 0.9);
        }

        .add-image-btn {
          width: 100px;
          height: 100px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: var(--bg-dark);
          border: 2px dashed var(--border-color);
          border-radius: var(--radius-md);
          color: var(--text-muted);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .add-image-btn:hover {
          border-color: var(--primary);
          color: var(--primary);
        }

        .add-image-btn span {
          font-size: 12px;
        }

        .team-preview {
          padding: 16px;
          background: var(--bg-dark);
          border-radius: var(--radius-md);
        }

        .team-info {
          margin-bottom: 4px;
        }

        .team-location {
          font-size: 14px;
          color: var(--text-secondary);
        }

        .submit-btn {
          width: 100%;
          margin-top: 16px;
        }

        .no-team-message {
          text-align: center;
          padding: 80px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          max-width: 500px;
          margin: 0 auto;
        }

        .no-team-message svg {
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .no-team-message h2 {
          margin-bottom: 12px;
        }

        .no-team-message p {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        @media (max-width: 640px) {
          .create-form-container {
            padding: 24px;
          }

          .type-selector {
            grid-template-columns: 1fr;
          }

          .payment-selector {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default CreateListing
