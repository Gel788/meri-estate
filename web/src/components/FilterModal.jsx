import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { propertyTypes, cities } from '../data/properties'
import './FilterModal.css'

export default function FilterModal({ isOpen, onClose, filters, onApply }) {
  const [localFilters, setLocalFilters] = useState(filters)

  useEffect(() => {
    if (isOpen) {
      setLocalFilters(filters)
    }
  }, [isOpen, filters])

  const handleApply = () => {
    onApply(localFilters)
    onClose()
  }

  const handleReset = () => {
    const resetFilters = {
      searchText: '',
      type: null,
      status: null,
      minPrice: 0,
      maxPrice: 200000000,
      minArea: 0,
      maxArea: 1000,
      rooms: 0,
      city: ''
    }
    setLocalFilters(resetFilters)
    onApply(resetFilters)
  }

  const activeFiltersCount = [
    localFilters.type,
    localFilters.status,
    localFilters.minPrice > 0 || localFilters.maxPrice < 200000000,
    localFilters.minArea > 0 || localFilters.maxArea < 1000,
    localFilters.rooms > 0,
    localFilters.city
  ].filter(Boolean).length

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)} млн ₽`
    }
    return `${Math.round(price / 1000)} тыс ₽`
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="filter-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="filter-modal"
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="filter-header">
            <h2>Фильтры</h2>
            <button className="filter-close" onClick={onClose}>✕</button>
          </div>

          {activeFiltersCount > 0 && (
            <div className="filter-stats">
              <div className="filter-stats-content">
                <span className="filter-stats-icon">🔍</span>
                <div>
                  <div className="filter-stats-label">Активных фильтров</div>
                  <div className="filter-stats-value">{activeFiltersCount}</div>
                </div>
                <button className="filter-reset-btn" onClick={handleReset}>
                  Сбросить
                </button>
              </div>
            </div>
          )}

          <div className="filter-content">
            {/* Property Type */}
            <div className="filter-section">
              <div className="filter-section-header">
                <span className="filter-icon">🏠</span>
                <span className="filter-label">Тип недвижимости</span>
              </div>
              <div className="filter-grid">
                {propertyTypes.map(type => (
                  <button
                    key={type.value}
                    className={`filter-type-btn ${localFilters.type === type.value ? 'active' : ''}`}
                    onClick={() => setLocalFilters({
                      ...localFilters,
                      type: localFilters.type === type.value ? null : type.value
                    })}
                  >
                    <span className="filter-type-icon">{type.icon}</span>
                    <span className="filter-type-label">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="filter-section">
              <div className="filter-section-header">
                <span className="filter-icon">🏷️</span>
                <span className="filter-label">Статус</span>
              </div>
              <div className="filter-status-buttons">
                <button
                  className={`filter-status-btn ${localFilters.status === 'sale' ? 'active' : ''}`}
                  onClick={() => setLocalFilters({
                    ...localFilters,
                    status: localFilters.status === 'sale' ? null : 'sale'
                  })}
                >
                  <span>💰</span>
                  <span>Продажа</span>
                </button>
                <button
                  className={`filter-status-btn ${localFilters.status === 'rent' ? 'active' : ''}`}
                  onClick={() => setLocalFilters({
                    ...localFilters,
                    status: localFilters.status === 'rent' ? null : 'rent'
                  })}
                >
                  <span>🔑</span>
                  <span>Аренда</span>
                </button>
              </div>
            </div>

            {/* Price */}
            <div className="filter-section">
              <div className="filter-section-header">
                <span className="filter-icon">💰</span>
                <span className="filter-label">Цена</span>
              </div>
              <div className="filter-range">
                <div className="filter-range-display">
                  <div>
                    <div className="filter-range-label">От</div>
                    <div className="filter-range-value">{formatPrice(localFilters.minPrice)}</div>
                  </div>
                  <div>
                    <div className="filter-range-label">До</div>
                    <div className="filter-range-value">{formatPrice(localFilters.maxPrice)}</div>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="200000000"
                  step="1000000"
                  value={localFilters.minPrice}
                  onChange={(e) => setLocalFilters({ ...localFilters, minPrice: Number(e.target.value) })}
                  className="filter-slider"
                />
                <input
                  type="range"
                  min={localFilters.minPrice}
                  max="200000000"
                  step="1000000"
                  value={localFilters.maxPrice}
                  onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: Number(e.target.value) })}
                  className="filter-slider"
                />
              </div>
            </div>

            {/* Area */}
            <div className="filter-section">
              <div className="filter-section-header">
                <span className="filter-icon">📐</span>
                <span className="filter-label">Площадь</span>
              </div>
              <div className="filter-range">
                <div className="filter-range-display">
                  <div>
                    <div className="filter-range-label">От</div>
                    <div className="filter-range-value">{Math.round(localFilters.minArea)} м²</div>
                  </div>
                  <div>
                    <div className="filter-range-label">До</div>
                    <div className="filter-range-value">{Math.round(localFilters.maxArea)} м²</div>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={localFilters.minArea}
                  onChange={(e) => setLocalFilters({ ...localFilters, minArea: Number(e.target.value) })}
                  className="filter-slider"
                />
                <input
                  type="range"
                  min={localFilters.minArea}
                  max="1000"
                  step="10"
                  value={localFilters.maxArea}
                  onChange={(e) => setLocalFilters({ ...localFilters, maxArea: Number(e.target.value) })}
                  className="filter-slider"
                />
              </div>
            </div>

            {/* Rooms */}
            <div className="filter-section">
              <div className="filter-section-header">
                <span className="filter-icon">🛏️</span>
                <span className="filter-label">Комнаты</span>
              </div>
              <div className="filter-rooms">
                {[0, 1, 2, 3, 4, 5, 6].map(count => (
                  <button
                    key={count}
                    className={`filter-room-btn ${localFilters.rooms === count ? 'active' : ''}`}
                    onClick={() => setLocalFilters({ ...localFilters, rooms: count })}
                  >
                    {count === 0 ? '∞' : count}
                  </button>
                ))}
              </div>
            </div>

            {/* City */}
            <div className="filter-section">
              <div className="filter-section-header">
                <span className="filter-icon">📍</span>
                <span className="filter-label">Город</span>
              </div>
              <div className="filter-cities">
                <button
                  className={`filter-city-btn ${!localFilters.city ? 'active' : ''}`}
                  onClick={() => setLocalFilters({ ...localFilters, city: '' })}
                >
                  🌍 Все города
                </button>
                {cities.map(city => (
                  <button
                    key={city}
                    className={`filter-city-btn ${localFilters.city === city ? 'active' : ''}`}
                    onClick={() => setLocalFilters({ ...localFilters, city })}
                  >
                    📍 {city}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="filter-footer">
            <button className="filter-apply-btn" onClick={handleApply}>
              <span>Показать результаты</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

