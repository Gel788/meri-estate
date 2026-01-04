import { motion } from 'framer-motion'
import { useState } from 'react'
import './FeaturedProperties.css'

export default function FeaturedProperties({ properties = [], onViewProperty }) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  // Берем первые 3 объекта для демонстрации
  const featuredProperties = properties.slice(0, 3)

  return (
    <section className="featured-properties-section">
      <div className="section-container">
        <div className="section-header">
          <div className="section-title-wrapper">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="section-stars"
            >
              <span>✦</span>
              <span>✦</span>
              <span>✦</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-title"
            >
              Избранные объекты
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-description"
          >
            Изучите нашу тщательно отобранную подборку избранных объектов. Каждое предложение даёт представление об исключительных домах и инвестициях, доступных через Meri Movs. Нажмите «Подробнее» для получения дополнительной информации.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="view-all-btn"
            onClick={() => onViewProperty && onViewProperty('search')}
          >
            Смотреть все объекты
          </motion.button>
        </div>

        <div className="properties-grid">
          {featuredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="featured-property-card"
              onClick={() => onViewProperty && onViewProperty(property.id)}
            >
              <div className="property-image-wrapper">
                <div className="property-image">
                  {property.typeName === 'Квартира' && '🏢'}
                  {property.typeName === 'Дом' && '🏠'}
                  {property.typeName === 'Студия' && '📐'}
                  {property.typeName === 'Пентхаус' && '⭐'}
                  {property.typeName === 'Вилла' && '🏡'}
                </div>
                <div className="property-category">
                  {property.typeName === 'Квартира' && 'Городская жизнь'}
                  {property.typeName === 'Дом' && 'Загородная недвижимость'}
                  {property.typeName === 'Студия' && 'Компактное жилье'}
                  {property.typeName === 'Пентхаус' && 'Элитное жилье'}
                  {property.typeName === 'Вилла' && 'Роскошные виллы'}
                </div>
              </div>

              <div className="property-content">
                <h3 className="property-title">{property.title}</h3>
                <p className="property-description">
                  {property.description || `${property.rooms} спальни, ${property.area} м². Современная недвижимость в престижном районе.`}
                  <span className="read-more"> Читать далее</span>
                </p>

                <div className="property-features">
                  <div className="feature-item">
                    <span className="feature-icon">🛏️</span>
                    <span>{property.rooms}-Спальни</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🚿</span>
                    <span>{property.rooms}-Ванные</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🏠</span>
                    <span>{property.typeName}</span>
                  </div>
                </div>

                <div className="property-footer">
                  <div className="property-price">
                    {property.price.toLocaleString('ru-RU')} ₽
                  </div>
                  <button className="view-details-btn">
                    Подробнее об объекте
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pagination">
          <span className="pagination-info">
            {String(currentPage).padStart(2, '0')} из {String(totalPages).padStart(2, '0')}
          </span>
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

