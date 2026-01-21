import { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, AlertCircle, Check, Upload, X, DollarSign, RefreshCw, ArrowLeftRight, ArrowLeft, Trash2, CheckCircle, Clock, XCircle } from 'lucide-react'
import { CATEGORIES, CONDITIONS } from '../utils/states'
import { useAuth } from '../context/AuthContext'
import api from '../utils/api'
import LoadingSpinner from '../components/LoadingSpinner'

const PAYMENT_TYPES = [
  { value: 'cash', label: 'Cash Only', icon: DollarSign, desc: 'Accept cash payments only' },
  { value: 'trade', label: 'Trade Only', icon: RefreshCw, desc: 'Open to trading parts only' },
  { value: 'either', label: 'Cash or Trade', icon: ArrowLeftRight, desc: 'Accept either cash or trades' }
]

const STATUS_OPTIONS = [
  { value: 'active', label: 'Available', icon: CheckCircle, color: '#22c55e', desc: 'Item is available' },
  { value: 'pending', label: 'In Progress', icon: Clock, color: '#f59e0b', desc: 'Transaction in progress' },
  { value: 'closed', label: 'Sold/Completed', icon: XCircle, color: '#ef4444', desc: 'Item has been sold or found' }
]

function EditListing() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, team } = useAuth()
  const fileInputRef = useRef(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [formData, setFormData] = useState({
    type: 'have',
    title: '',
    category: '',
    condition: '',
    quantity: 1,
    description: '',
    payment_type: 'either',
    status: 'active'
  })
  const [existingImages, setExistingImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [imagePreviews, setImagePreviews] = useState([])
  const [imagesToDelete, setImagesToDelete] = useState([])
  const [error, setError] = useState('')
  const [canEdit, setCanEdit] = useState(false)

  useEffect(() => {
    fetchListing()
  }, [id])

  const fetchListing = async () => {
    try {
      const response = await api.get(`/listings/detail.php?id=${id}`)
      const listing = response.data.listing

      // Check if user can edit (same team)
      if (user && listing.team_id === user.team_id) {
        setCanEdit(true)
      }

      setFormData({
        type: listing.type || 'have',
        title: listing.title || '',
        category: listing.category || '',
        condition: listing.condition || '',
        quantity: listing.quantity || 1,
        description: listing.description || '',
        payment_type: listing.payment_type || 'either',
        status: listing.status || 'active'
      })

      setExistingImages(listing.images || [])
    } catch (error) {
      setError('Failed to load listing')
    } finally {
      setLoading(false)
    }
  }

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
    const totalImages = existingImages.length - imagesToDelete.length + selectedImages.length + files.length

    if (totalImages > 5) {
      setError('Maximum 5 images allowed')
      return
    }

    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      const maxSize = 5 * 1024 * 1024
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

    validFiles.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreviews(prev => [...prev, { file, preview: e.target.result }])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeNewImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const markExistingImageForDeletion = (imageId) => {
    setImagesToDelete(prev => [...prev, imageId])
  }

  const restoreImage = (imageId) => {
    setImagesToDelete(prev => prev.filter(id => id !== imageId))
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

  const deleteImages = async () => {
    for (const imageId of imagesToDelete) {
      try {
        await api.delete(`/listings/images.php?id=${imageId}`)
      } catch (err) {
        console.error('Failed to delete image:', err)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    try {
      await api.put(`/listings/detail.php?id=${id}`, formData)

      // Handle image deletions
      if (imagesToDelete.length > 0) {
        await deleteImages()
      }

      // Upload new images
      if (selectedImages.length > 0) {
        await uploadImages(id)
      }

      navigate(`/listings/${id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update listing')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this listing? This action cannot be undone.')) {
      return
    }

    setDeleting(true)
    try {
      await api.delete(`/listings/detail.php?id=${id}`)
      navigate('/listings')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete listing')
    } finally {
      setDeleting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!canEdit) {
    return (
      <div className="edit-listing">
        <div className="container">
          <motion.div
            className="no-permission-message"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle size={48} />
            <h2>Cannot Edit This Listing</h2>
            <p>You can only edit listings from your own team.</p>
            <Link to={`/listings/${id}`} className="btn btn-primary">
              Back to Listing
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="edit-listing">
      <div className="container">
        <motion.div
          className="edit-form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to={`/listings/${id}`} className="back-link">
            <ArrowLeft size={18} />
            Back to Listing
          </Link>

          <div className="form-header">
            <h1>Edit Listing</h1>
            <p>Update your listing details</p>
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
            {/* Status Section */}
            <div className="form-section">
              <h3>Listing Status</h3>
              <p className="section-desc">Update the status of your listing</p>
              <div className="status-selector">
                {STATUS_OPTIONS.map(status => {
                  const Icon = status.icon
                  return (
                    <label key={status.value} className={`status-option ${formData.status === status.value ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="status"
                        value={status.value}
                        checked={formData.status === status.value}
                        onChange={handleChange}
                      />
                      <div className="status-content" style={{ '--status-color': status.color }}>
                        <Icon size={20} />
                        <span className="status-label">{status.label}</span>
                        <span className="status-desc">{status.desc}</span>
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>

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
                  placeholder="Describe the part(s) in detail."
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

            {/* Image Management */}
            <div className="form-section">
              <h3>Photos</h3>
              <p className="section-desc">Manage photos (up to 5 total)</p>

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
                  {/* Existing Images */}
                  {existingImages.map((img) => (
                    <div
                      key={img.id}
                      className={`image-preview ${imagesToDelete.includes(img.id) ? 'marked-delete' : ''}`}
                    >
                      <img src={img.path} alt="Listing" />
                      {imagesToDelete.includes(img.id) ? (
                        <button
                          type="button"
                          className="restore-image"
                          onClick={() => restoreImage(img.id)}
                          title="Restore image"
                        >
                          <Check size={16} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="remove-image"
                          onClick={() => markExistingImageForDeletion(img.id)}
                          title="Remove image"
                        >
                          <X size={16} />
                        </button>
                      )}
                      {img.is_primary && !imagesToDelete.includes(img.id) && (
                        <span className="primary-badge">Primary</span>
                      )}
                    </div>
                  ))}

                  {/* New Images */}
                  {imagePreviews.map((img, index) => (
                    <div key={`new-${index}`} className="image-preview new-image">
                      <img src={img.preview} alt={`New ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-image"
                        onClick={() => removeNewImage(index)}
                      >
                        <X size={16} />
                      </button>
                      <span className="new-badge">New</span>
                    </div>
                  ))}

                  {/* Add Button */}
                  {(existingImages.length - imagesToDelete.length + imagePreviews.length) < 5 && (
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

            {/* Action Buttons */}
            <div className="form-actions">
              <motion.button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={saving}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </motion.button>

              <motion.button
                type="button"
                className="btn btn-danger btn-lg"
                onClick={handleDelete}
                disabled={deleting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {deleting ? 'Deleting...' : (
                  <>
                    <Trash2 size={18} />
                    Delete Listing
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>

      <style>{`
        .edit-listing {
          padding: 40px 0 80px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 14px;
          margin-bottom: 24px;
          transition: color var(--transition-fast);
        }

        .back-link:hover {
          color: var(--primary);
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

        /* Status Selector */
        .status-selector {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .status-option {
          cursor: pointer;
        }

        .status-option input {
          display: none;
        }

        .status-content {
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

        .status-option:hover .status-content {
          border-color: var(--border-light);
        }

        .status-option.selected .status-content {
          border-color: var(--status-color);
          background: color-mix(in srgb, var(--status-color) 10%, transparent);
        }

        .status-content svg {
          color: var(--text-muted);
        }

        .status-option.selected .status-content svg {
          color: var(--status-color);
        }

        .status-label {
          font-size: 14px;
          font-weight: 600;
        }

        .status-desc {
          font-size: 11px;
          color: var(--text-muted);
          line-height: 1.3;
        }

        /* Type Selector */
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
          border: 2px solid transparent;
        }

        .image-preview img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-preview.marked-delete {
          opacity: 0.5;
          border-color: #ef4444;
        }

        .image-preview.marked-delete img {
          filter: grayscale(100%);
        }

        .image-preview.new-image {
          border-color: var(--accent-green);
        }

        .remove-image, .restore-image {
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

        .restore-image {
          background: rgba(34, 197, 94, 0.8);
        }

        .restore-image:hover {
          background: rgba(34, 197, 94, 1);
        }

        .primary-badge, .new-badge {
          position: absolute;
          bottom: 4px;
          left: 4px;
          padding: 2px 6px;
          font-size: 10px;
          font-weight: 600;
          border-radius: 4px;
          text-transform: uppercase;
        }

        .primary-badge {
          background: var(--primary);
          color: white;
        }

        .new-badge {
          background: var(--accent-green);
          color: white;
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

        /* Action Buttons */
        .form-actions {
          display: flex;
          gap: 16px;
          margin-top: 24px;
        }

        .form-actions .btn {
          flex: 1;
        }

        .btn-danger {
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-danger:hover {
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
        }

        /* No Permission Message */
        .no-permission-message {
          text-align: center;
          padding: 80px 20px;
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-xl);
          max-width: 500px;
          margin: 0 auto;
        }

        .no-permission-message svg {
          color: var(--text-muted);
          margin-bottom: 20px;
        }

        .no-permission-message h2 {
          margin-bottom: 12px;
        }

        .no-permission-message p {
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        @media (max-width: 640px) {
          .edit-form-container {
            padding: 24px;
          }

          .type-selector {
            grid-template-columns: 1fr;
          }

          .payment-selector,
          .status-selector {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

export default EditListing
