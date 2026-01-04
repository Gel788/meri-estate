import { motion } from 'framer-motion'
import './PropertyDetail.css'

const gradients = [
  ['#3b82f6', '#60a5fa'],
  ['#8b5cf6', '#a78bfa'],
  ['#10b981', '#34d399'],
  ['#f59e0b', '#fbbf24'],
  ['#3b82f6', '#7c3aed'],
  ['#ec4899', '#f472b6'],
  ['#06b6d4', '#22d3ee'],
  ['#f97316', '#fb923c']
]

export default function PropertyDetail({ property, onClose, isFavorite, onToggleFavorite }) {
  const colors = gradients[property.imageIndex % gradients.length]

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU') + ' ₽'
  }

  const pricePerMeter = Math.round(property.price / property.area)

  return (
    <motion.div
      className="property-detail-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="property-detail"
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="detail-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        <div className="detail-content">
          {/* Image Gallery */}
          <div className="detail-image" style={{
            background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`
          }}>
            <div className="property-image-pattern" />
            <button className="detail-favorite" onClick={onToggleFavorite}>
              {isFavorite ? '❤️' : '🤍'}
            </button>
          </div>

          {/* Info */}
          <div className="detail-body">
            <div className="detail-header">
              <div className="detail-badges">
                <span className="badge badge-status">{property.statusName}</span>
                {property.isNew && <span className="badge badge-new">Новое</span>}
              </div>

              <h2 className="detail-title">{property.title}</h2>
              
              <div className="detail-location">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 10.625C11.3807 10.625 12.5 9.50571 12.5 8.125C12.5 6.74429 11.3807 5.625 10 5.625C8.61929 5.625 7.5 6.74429 7.5 8.125C7.5 9.50571 8.61929 10.625 10 10.625Z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M3.125 7.5C3.125 4.375 5.625 1.875 10 1.875C14.375 1.875 16.875 4.375 16.875 7.5C16.875 11.875 10 18.125 10 18.125C10 18.125 3.125 11.875 3.125 7.5Z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
                <span>{property.address}, {property.city}</span>
              </div>

              <div className="detail-price">
                <div className="price-main">{formatPrice(property.price)}</div>
                <div className="price-per-meter">{pricePerMeter.toLocaleString('ru-RU')} ₽/м²</div>
              </div>
            </div>

            {/* Stats */}
            <div className="detail-stats">
              <div className="stat-box">
                <div className="stat-icon">🛏️</div>
                <div className="stat-label">Комнаты</div>
                <div className="stat-value">{property.rooms}</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">🚿</div>
                <div className="stat-label">Ванные</div>
                <div className="stat-value">{property.bathrooms}</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">📐</div>
                <div className="stat-label">Площадь</div>
                <div className="stat-value">{property.area} м²</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">🏢</div>
                <div className="stat-label">Этаж</div>
                <div className="stat-value">{property.floor}/{property.floors}</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">📅</div>
                <div className="stat-label">Год</div>
                <div className="stat-value">{property.yearBuilt}</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">⭐</div>
                <div className="stat-label">Рейтинг</div>
                <div className="stat-value">{property.rating}</div>
              </div>
            </div>

            {/* Description */}
            <div className="detail-section">
              <h3>Описание</h3>
              <p>{property.description}</p>
            </div>

            {/* Features */}
            <div className="detail-section">
              <h3>Особенности</h3>
              <div className="features-grid">
                {property.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M16.667 5L7.5 14.167L3.333 10" stroke="#34C759" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent */}
            <div className="detail-section">
              <h3>Агент</h3>
              <div className="agent-card">
                <div className="agent-avatar gradient-bg">
                  <span>👤</span>
                </div>
                <div className="agent-info">
                  <div className="agent-name">{property.agent.name}</div>
                  <div className="agent-rating">
                    <span>⭐ {property.agent.rating}</span>
                    <span>• {property.agent.experience} лет опыта</span>
                  </div>
                  <div className="agent-properties">{property.agent.propertiesCount} объектов</div>
                </div>
              </div>

              <div className="contact-buttons">
                <a href={`tel:${property.agent.phone}`} className="contact-btn contact-phone">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M18.3333 14.1V16.6C18.3343 16.8321 18.2867 17.0618 18.1937 17.2745C18.1008 17.4871 17.9644 17.678 17.7934 17.8349C17.6224 17.9918 17.4205 18.1112 17.2006 18.1855C16.9808 18.2599 16.7477 18.2875 16.5167 18.2667C13.9523 17.988 11.489 17.1118 9.32499 15.7084C7.31151 14.4289 5.60443 12.7218 4.32499 10.7084C2.91663 8.53435 2.04019 6.05916 1.76666 3.48337C1.74583 3.25293 1.77321 3.02048 1.84707 2.80096C1.92092 2.58143 2.03963 2.37978 2.19562 2.20873C2.35162 2.03768 2.54149 1.90083 2.75314 1.80686C2.96479 1.71288 3.19348 1.66395 3.42499 1.66337H5.92499C6.32953 1.65945 6.72148 1.79564 7.02812 2.04937C7.33476 2.3031 7.53505 2.65832 7.59166 3.04837C7.69718 3.82849 7.89286 4.59507 8.17499 5.33337C8.28713 5.64255 8.31137 5.97636 8.24491 6.29876C8.17844 6.62116 8.02404 6.91905 7.79999 7.15837L6.74166 8.21671C7.92795 10.3085 9.69151 12.072 11.7833 13.2584L12.8417 12.2C13.081 11.976 13.3789 11.8216 13.7013 11.7551C14.0237 11.6886 14.3575 11.7129 14.6667 11.825C15.405 12.1072 16.1715 12.3028 16.9517 12.4084C17.3467 12.4654 17.7061 12.6693 17.9614 12.9812C18.2167 13.2931 18.3509 13.6913 18.3417 14.1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Позвонить
                </a>
                <a href={`mailto:${property.agent.email}`} className="contact-btn contact-email">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3.333 3.33337H16.6663C17.583 3.33337 18.333 4.08337 18.333 5.00004V15C18.333 15.9167 17.583 16.6667 16.6663 16.6667H3.333C2.41634 16.6667 1.66634 15.9167 1.66634 15V5.00004C1.66634 4.08337 2.41634 3.33337 3.333 3.33337Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M18.333 5L9.99967 10.8333L1.66634 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

