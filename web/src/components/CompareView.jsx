import { motion } from 'framer-motion'
import { properties } from '../data/properties'
import './CompareView.css'

export default function CompareView({ compareList, onClose, onRemove }) {
  const compareProperties = properties.filter(p => compareList.has(p.id))

  if (compareProperties.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="compare-view-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="compare-view"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="compare-empty">
            <div className="compare-empty-icon">⚖️</div>
            <h2>Нет объектов для сравнения</h2>
            <p>Добавьте объекты в сравнение, нажав на кнопку ⚖️</p>
            <button className="compare-close-btn" onClick={onClose}>
              Закрыть
            </button>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU') + ' ₽'
  }

  const allFeatures = [...new Set(compareProperties.flatMap(p => p.features))]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="compare-view-overlay"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="compare-view"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="compare-header">
          <h2>Сравнение объектов</h2>
          <button className="compare-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="compare-content">
          <div className="compare-table">
            <div className="compare-row compare-header-row">
              <div className="compare-cell compare-label-cell"></div>
              {compareProperties.map(property => (
                <div key={property.id} className="compare-cell compare-property-cell">
                  <button 
                    className="compare-remove-btn"
                    onClick={() => onRemove(property.id)}
                    title="Убрать из сравнения"
                  >
                    ×
                  </button>
                  <div className="compare-property-image" style={{
                    background: `linear-gradient(135deg, #${property.imageIndex % 8 === 0 ? '3b82f6' : property.imageIndex % 8 === 1 ? '8b5cf6' : property.imageIndex % 8 === 2 ? '10b981' : 'f59e0b'}, #${property.imageIndex % 8 === 0 ? '60a5fa' : property.imageIndex % 8 === 1 ? 'a78bfa' : property.imageIndex % 8 === 2 ? '34d399' : 'fbbf24'})`
                  }}>
                    <div className="compare-property-icon">
                      {property.type === 'apartment' ? '🏢' : property.type === 'house' ? '🏠' : property.type === 'studio' ? '📐' : property.type === 'penthouse' ? '⭐' : property.type === 'villa' ? '🏡' : '🗺️'}
                    </div>
                  </div>
                  <h3 className="compare-property-title">{property.title}</h3>
                </div>
              ))}
            </div>

            <div className="compare-row">
              <div className="compare-cell compare-label-cell">Цена</div>
              {compareProperties.map(property => (
                <div key={property.id} className="compare-cell">
                  <div className="compare-price">{formatPrice(property.price)}</div>
                  <div className="compare-price-per-meter">
                    {Math.round(property.price / property.area).toLocaleString('ru-RU')} ₽/м²
                  </div>
                </div>
              ))}
            </div>

            <div className="compare-row">
              <div className="compare-cell compare-label-cell">Площадь</div>
              {compareProperties.map(property => (
                <div key={property.id} className="compare-cell">
                  {property.area} м²
                </div>
              ))}
            </div>

            <div className="compare-row">
              <div className="compare-cell compare-label-cell">Комнаты</div>
              {compareProperties.map(property => (
                <div key={property.id} className="compare-cell">
                  {property.rooms}
                </div>
              ))}
            </div>

            <div className="compare-row">
              <div className="compare-cell compare-label-cell">Ванные</div>
              {compareProperties.map(property => (
                <div key={property.id} className="compare-cell">
                  {property.bathrooms}
                </div>
              ))}
            </div>

            <div className="compare-row">
              <div className="compare-cell compare-label-cell">Этаж</div>
              {compareProperties.map(property => (
                <div key={property.id} className="compare-cell">
                  {property.floor}/{property.floors}
                </div>
              ))}
            </div>

            <div className="compare-row">
              <div className="compare-cell compare-label-cell">Год постройки</div>
              {compareProperties.map(property => (
                <div key={property.id} className="compare-cell">
                  {property.yearBuilt}
                </div>
              ))}
            </div>

            <div className="compare-row">
              <div className="compare-cell compare-label-cell">Город</div>
              {compareProperties.map(property => (
                <div key={property.id} className="compare-cell">
                  {property.city}
                </div>
              ))}
            </div>

            <div className="compare-row">
              <div className="compare-cell compare-label-cell">Рейтинг</div>
              {compareProperties.map(property => (
                <div key={property.id} className="compare-cell">
                  ⭐ {property.rating}
                </div>
              ))}
            </div>

            <div className="compare-row compare-features-row">
              <div className="compare-cell compare-label-cell">Особенности</div>
              {compareProperties.map(property => (
                <div key={property.id} className="compare-cell">
                  <div className="compare-features">
                    {property.features.map((feature, idx) => (
                      <span key={idx} className="compare-feature-tag">{feature}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

