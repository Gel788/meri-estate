import { motion } from 'framer-motion'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import PropertyDetail from './PropertyDetail'
import './PropertyCard.css'

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

function PropertyImage({ imageIndex, type }) {
  const colors = gradients[imageIndex % gradients.length]
  
  const icons = {
    apartment: '🏢',
    house: '🏠',
    studio: '📐',
    penthouse: '⭐',
    villa: '🏡',
    land: '🗺️'
  }

  return (
    <div className="property-image" style={{
      background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`
    }}>
      <div className="property-image-pattern" />
      <div className="property-image-icon">
        {icons[type] || '🏠'}
      </div>
    </div>
  )
}

export default function PropertyCard({ property, isFavorite, onToggleFavorite, featured }) {
  const [showDetail, setShowDetail] = useState(false)

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)} млн ₽`
    }
    return `${(price / 1000).toFixed(0)} тыс ₽`
  }

  const pricePerMeter = Math.round(property.price / property.area)

  if (featured) {
    return (
      <>
        <motion.div
          className="property-card featured"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
          onClick={() => setShowDetail(true)}
        >
        <PropertyImage imageIndex={property.imageIndex} type={property.type} />
        
        <div className="property-card-overlay">
          <div className="property-badges">
            <span className="badge badge-type">{property.typeName}</span>
            {property.isNew && <span className="badge badge-new">Новое</span>}
          </div>

          <div className="property-card-content">
            <h4 className="property-title">{property.title}</h4>
            <div className="property-location">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 8.5C9.10457 8.5 10 7.60457 10 6.5C10 5.39543 9.10457 4.5 8 4.5C6.89543 4.5 6 5.39543 6 6.5C6 7.60457 6.89543 8.5 8 8.5Z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M2.5 6C2.5 3.5 4.5 1.5 8 1.5C11.5 1.5 13.5 3.5 13.5 6C13.5 9.5 8 14.5 8 14.5C8 14.5 2.5 9.5 2.5 6Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <span>{property.address}</span>
            </div>

            <div className="property-stats">
              <span>🛏 {property.rooms}</span>
              <span>🚿 {property.bathrooms}</span>
              <span>📐 {property.area} м²</span>
            </div>

            <div className="property-price">{formatPrice(property.price)}</div>
          </div>

          <button className="favorite-btn-featured" onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite()
          }}>
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
        </motion.div>

        <AnimatePresence>
          {showDetail && (
            <PropertyDetail
              property={property}
              onClose={() => setShowDetail(false)}
              isFavorite={isFavorite}
              onToggleFavorite={onToggleFavorite}
            />
          )}
        </AnimatePresence>
      </>
    )
  }

  return (
    <>
      <motion.div
        className="property-card"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        onClick={() => setShowDetail(true)}
      >
      <div className="property-card-image">
        <PropertyImage imageIndex={property.imageIndex} type={property.type} />
        
        <div className="property-badges-top">
          {property.isNew && <span className="badge badge-new">Новое</span>}
          {property.isFeatured && <span className="badge badge-featured">★</span>}
          <button className="favorite-btn" onClick={(e) => {
            e.stopPropagation()
            onToggleFavorite()
          }}>
            {isFavorite ? '❤️' : '🤍'}
          </button>
        </div>
      </div>

      <div className="property-card-body">
        <div className="property-header">
          <h4 className="property-title">{property.title}</h4>
          <div className="property-location">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 8.5C9.10457 8.5 10 7.60457 10 6.5C10 5.39543 9.10457 4.5 8 4.5C6.89543 4.5 6 5.39543 6 6.5C6 7.60457 6.89543 8.5 8 8.5Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M2.5 6C2.5 3.5 4.5 1.5 8 1.5C11.5 1.5 13.5 3.5 13.5 6C13.5 9.5 8 14.5 8 14.5C8 14.5 2.5 9.5 2.5 6Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            <span>{property.address}</span>
          </div>
        </div>

        <div className="property-stats">
          <span>🛏️ {property.rooms}</span>
          <span>🚿 {property.bathrooms}</span>
          <span>📐 {property.area} м²</span>
        </div>

        <div className="property-divider" />

        <div className="property-footer">
          <div className="property-price-section">
            <div className="property-price">{formatPrice(property.price)}</div>
            <div className="property-price-per-meter">{pricePerMeter.toLocaleString('ru-RU')} ₽/м²</div>
          </div>
          <span className="property-type">{property.typeName}</span>
        </div>
      </div>
      </motion.div>

      <AnimatePresence>
        {showDetail && (
          <PropertyDetail
            property={property}
            onClose={() => setShowDetail(false)}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </AnimatePresence>
    </>
  )
}

