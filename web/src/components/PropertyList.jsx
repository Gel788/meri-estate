import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PropertyCard from './PropertyCard'
import FilterModal from './FilterModal'
import { propertyTypes, cities } from '../data/properties'
import './PropertyList.css'

export default function PropertyList({ properties, favorites, toggleFavorite, filters, setFilters, isFavoritesView, onNavigate, onView, compareList, onToggleCompare }) {
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [sortOption, setSortOption] = useState('newest')
  const [sortedProperties, setSortedProperties] = useState(properties)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const dropdownRefs = useRef({})

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const featuredProperties = properties.filter(p => p.isFeatured)

  // Sort properties
  useEffect(() => {
    let sorted = [...properties]
    
    switch(sortOption) {
      case 'newest':
        sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case 'priceLow':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'priceHigh':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'areaLow':
        sorted.sort((a, b) => a.area - b.area)
        break
      case 'areaHigh':
        sorted.sort((a, b) => b.area - a.area)
        break
      default:
        break
    }
    
    setSortedProperties(sorted)
  }, [properties, sortOption])

  const handleCategoryChange = (status) => {
    if (selectedCategory === status) {
      setSelectedCategory(null)
      if (setFilters) setFilters({ ...filters, status: null })
    } else {
      setSelectedCategory(status)
      if (setFilters) setFilters({ ...filters, status })
    }
  }

  // Получаем уникальные города из properties
  const uniqueCities = [...new Set(properties.map(p => p.city))].sort()

  // Получаем уникальные годы постройки
  const uniqueYears = [...new Set(properties.map(p => p.yearBuilt))].sort((a, b) => b - a)

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName)
  }

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return `${(price / 1000000).toFixed(1)} млн ₽`
    }
    return `${Math.round(price / 1000)} тыс ₽`
  }

  // Закрытие дропдауна при клике вне его (поддержка touch для мобильных)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && dropdownRefs.current[openDropdown]) {
        if (!dropdownRefs.current[openDropdown].contains(event.target)) {
          setOpenDropdown(null)
        }
      }
    }

    // Поддержка и клика, и тача для мобильных
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [openDropdown])

  // Закрытие дропдауна при скролле на мобильных
  useEffect(() => {
    if (openDropdown && isMobile) {
      const handleScroll = () => {
        setOpenDropdown(null)
      }
      
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [openDropdown, isMobile])

  if (isFavoritesView && properties.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">💔</div>
        <h3>Нет избранных объектов</h3>
        <p>Добавляйте понравившиеся объекты в избранное, нажимая на ❤️</p>
      </div>
    )
  }

  return (
    <div className="property-list">
      {/* Overlay для мобильных при открытом dropdown */}
      {openDropdown && isMobile && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="dropdown-overlay"
          onClick={() => setOpenDropdown(null)}
        />
      )}
      <div className="container">
        {/* Breadcrumb Navigation */}
        {!isFavoritesView && (
          <nav className="breadcrumb-nav">
            <button onClick={() => onNavigate && onNavigate('home')} className="breadcrumb-link">
              Главная
            </button>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Недвижимость</span>
          </nav>
        )}

        {/* Header - Figma Design */}
        {!isFavoritesView && (
          <div className="property-list-header">
            <div className="header-title">
              <h1 className="main-title">Найдите недвижимость</h1>
              <h1 className="main-title gradient-text">мечты</h1>
              <p className="header-subtitle">
                Добро пожаловать в Meri Movs, где ваша недвижимость мечты ждет вас в каждом уголке нашего прекрасного мира. 
                Изучите нашу тщательно отобранную подборку объектов, каждый из которых предлагает уникальную историю и шанс переосмыслить вашу жизнь. 
                С категориями для каждого мечтателя, ваше путешествие начинается здесь.
              </p>
            </div>

            {/* Search Box - Figma Style */}
            <div className="search-section">
              <div className="search-box-large">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="search-icon">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Поиск недвижимости"
                  value={filters?.searchText || ''}
                  onChange={(e) => setFilters({ ...filters, searchText: e.target.value })}
                  className="search-input-large"
                />
                <button className="search-btn-primary">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2"/>
                    <path d="M17 17L13 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Найти недвижимость
                </button>
              </div>

              {/* Filter Dropdowns - Figma Style */}
              <div className="filter-dropdowns">
                {/* Местоположение */}
                <div className="dropdown-wrapper" ref={el => dropdownRefs.current.location = el}>
                  <button 
                    className={`filter-dropdown ${openDropdown === 'location' ? 'active' : ''} ${filters?.city ? 'has-value' : ''}`}
                    onClick={() => toggleDropdown('location')}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2L2 7V9H18V7L10 2Z" fill="currentColor"/>
                      <path d="M2 11H18V13H2V11Z" fill="currentColor"/>
                      <path d="M6 15H14V17H6V15Z" fill="currentColor"/>
                    </svg>
                    <span>{filters?.city || 'Местоположение'}</span>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none"
                      className={openDropdown === 'location' ? 'rotated' : ''}
                    >
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'location' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="dropdown-menu"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className={`dropdown-item ${!filters?.city ? 'active' : ''}`}
                          onClick={() => {
                            setFilters({ ...filters, city: '' })
                            setOpenDropdown(null)
                          }}
                        >
                          Все города
                        </button>
                        {uniqueCities.map(city => (
                          <button
                            key={city}
                            className={`dropdown-item ${filters?.city === city ? 'active' : ''}`}
                            onClick={() => {
                              setFilters({ ...filters, city })
                              setOpenDropdown(null)
                            }}
                          >
                            {city}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Тип недвижимости */}
                <div className="dropdown-wrapper" ref={el => dropdownRefs.current.type = el}>
                  <button 
                    className={`filter-dropdown ${openDropdown === 'type' ? 'active' : ''} ${filters?.type ? 'has-value' : ''}`}
                    onClick={() => toggleDropdown('type')}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M3 10H17M10 3V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>{propertyTypes.find(t => t.value === filters?.type)?.label || 'Тип недвижимости'}</span>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none"
                      className={openDropdown === 'type' ? 'rotated' : ''}
                    >
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'type' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="dropdown-menu"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className={`dropdown-item ${!filters?.type ? 'active' : ''}`}
                          onClick={() => {
                            setFilters({ ...filters, type: null })
                            setOpenDropdown(null)
                          }}
                        >
                          Все типы
                        </button>
                        {propertyTypes.map(type => (
                          <button
                            key={type.value}
                            className={`dropdown-item ${filters?.type === type.value ? 'active' : ''}`}
                            onClick={() => {
                              setFilters({ ...filters, type: type.value })
                              setOpenDropdown(null)
                            }}
                          >
                            <span className="dropdown-icon">{type.icon}</span>
                            {type.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Диапазон цен */}
                <div className="dropdown-wrapper" ref={el => dropdownRefs.current.price = el}>
                  <button 
                    className={`filter-dropdown ${openDropdown === 'price' ? 'active' : ''} ${(filters?.minPrice > 0 || filters?.maxPrice < 200000000) ? 'has-value' : ''}`}
                    onClick={() => toggleDropdown('price')}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M5 10H15M10 5V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>
                      {(filters?.minPrice > 0 || filters?.maxPrice < 200000000) 
                        ? `${formatPrice(filters?.minPrice || 0)} - ${formatPrice(filters?.maxPrice || 200000000)}`
                        : 'Диапазон цен'}
                    </span>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none"
                      className={openDropdown === 'price' ? 'rotated' : ''}
                    >
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'price' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="dropdown-menu dropdown-menu-large"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="dropdown-range">
                          <div className="range-display">
                            <div>
                              <label>От</label>
                              <div className="range-value">{formatPrice(filters?.minPrice || 0)}</div>
                            </div>
                            <div>
                              <label>До</label>
                              <div className="range-value">{formatPrice(filters?.maxPrice || 200000000)}</div>
                            </div>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="200000000"
                            step="1000000"
                            value={filters?.minPrice || 0}
                            onChange={(e) => setFilters({ ...filters, minPrice: Number(e.target.value) })}
                            className="range-slider"
                          />
                          <input
                            type="range"
                            min={filters?.minPrice || 0}
                            max="200000000"
                            step="1000000"
                            value={filters?.maxPrice || 200000000}
                            onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
                            className="range-slider"
                          />
                        </div>
                        <div className="dropdown-actions">
                          <button
                            className="dropdown-reset"
                            onClick={() => {
                              setFilters({ ...filters, minPrice: 0, maxPrice: 200000000 })
                            }}
                          >
                            Сбросить
                          </button>
                          <button
                            className="dropdown-apply"
                            onClick={() => setOpenDropdown(null)}
                          >
                            Применить
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Размер (Площадь) */}
                <div className="dropdown-wrapper" ref={el => dropdownRefs.current.area = el}>
                  <button 
                    className={`filter-dropdown ${openDropdown === 'area' ? 'active' : ''} ${(filters?.minArea > 0 || filters?.maxArea < 1000) ? 'has-value' : ''}`}
                    onClick={() => toggleDropdown('area')}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>
                      {(filters?.minArea > 0 || filters?.maxArea < 1000)
                        ? `${Math.round(filters?.minArea || 0)} - ${Math.round(filters?.maxArea || 1000)} м²`
                        : 'Размер'}
                    </span>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none"
                      className={openDropdown === 'area' ? 'rotated' : ''}
                    >
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'area' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="dropdown-menu dropdown-menu-large"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="dropdown-range">
                          <div className="range-display">
                            <div>
                              <label>От</label>
                              <div className="range-value">{Math.round(filters?.minArea || 0)} м²</div>
                            </div>
                            <div>
                              <label>До</label>
                              <div className="range-value">{Math.round(filters?.maxArea || 1000)} м²</div>
                            </div>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="1000"
                            step="10"
                            value={filters?.minArea || 0}
                            onChange={(e) => setFilters({ ...filters, minArea: Number(e.target.value) })}
                            className="range-slider"
                          />
                          <input
                            type="range"
                            min={filters?.minArea || 0}
                            max="1000"
                            step="10"
                            value={filters?.maxArea || 1000}
                            onChange={(e) => setFilters({ ...filters, maxArea: Number(e.target.value) })}
                            className="range-slider"
                          />
                        </div>
                        <div className="dropdown-actions">
                          <button
                            className="dropdown-reset"
                            onClick={() => {
                              setFilters({ ...filters, minArea: 0, maxArea: 1000 })
                            }}
                          >
                            Сбросить
                          </button>
                          <button
                            className="dropdown-apply"
                            onClick={() => setOpenDropdown(null)}
                          >
                            Применить
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Год постройки */}
                <div className="dropdown-wrapper" ref={el => dropdownRefs.current.year = el}>
                  <button 
                    className={`filter-dropdown ${openDropdown === 'year' ? 'active' : ''}`}
                    onClick={() => toggleDropdown('year')}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                      <path d="M3 8H17" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <span>Год постройки</span>
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none"
                      className={openDropdown === 'year' ? 'rotated' : ''}
                    >
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                  <AnimatePresence>
                    {openDropdown === 'year' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="dropdown-menu"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="dropdown-item"
                          onClick={() => setOpenDropdown(null)}
                        >
                          Все годы
                        </button>
                        {uniqueYears.slice(0, 10).map(year => (
                          <button
                            key={year}
                            className="dropdown-item"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {year}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Discover Section - Figma Design */}
        {!isFavoritesView && (
          <div className="discover-section">
            <div className="discover-header">
              <div className="discover-title-wrapper">
                <div className="decorative-diamonds">
                  <span>◆</span>
                  <span>◆</span>
                  <span>◆</span>
                </div>
                <h2 className="discover-title">Откройте для себя мир возможностей</h2>
              </div>
              <p className="discover-description">
                Наш портфель недвижимости так же разнообразен, как и ваши мечты. Изучите следующие категории, 
                чтобы найти идеальную недвижимость, которая соответствует вашему видению дома.
              </p>
            </div>
          </div>
        )}

        {/* Featured Properties */}
        {!isFavoritesView && featuredProperties.length > 0 && (
          <div className="featured-section">
            <div className="featured-scroll">
              {featuredProperties.map(property => (
                <div key={property.id} className="featured-card-wrapper">
                  <PropertyCard
                    property={property}
                    isFavorite={favorites.has(property.id)}
                    onToggleFavorite={() => toggleFavorite(property.id)}
                    featured
                    onView={onView}
                    isInCompare={compareList?.has(property.id)}
                    onToggleCompare={() => onToggleCompare?.(property.id)}
                  />
                </div>
              ))}
            </div>
            <div className="pagination-controls">
              <span className="pagination-info">01 из 10</span>
              <div className="pagination-buttons">
                <button className="pagination-btn">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="pagination-btn">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* All Properties */}
        <div className="all-properties">
          <div className="section-header">
            <h3 className="section-title">{isFavoritesView ? 'Мои избранные' : 'Все объекты'}</h3>
            {!isFavoritesView && (
              <div className="section-actions">
                <select
                  className="sort-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="newest">Новые</option>
                  <option value="priceLow">Цена ↑</option>
                  <option value="priceHigh">Цена ↓</option>
                  <option value="areaLow">Площадь ↑</option>
                  <option value="areaHigh">Площадь ↓</option>
                </select>
                <button className="filter-btn" onClick={() => setShowFilters(!showFilters)}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M4 6H16M6 10H14M8 14H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Фильтры
                </button>
              </div>
            )}
          </div>

          <div className="properties-grid">
            {sortedProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <PropertyCard
                  property={property}
                  isFavorite={favorites.has(property.id)}
                  onToggleFavorite={() => toggleFavorite(property.id)}
                  onView={onView}
                  isInCompare={compareList?.has(property.id)}
                  onToggleCompare={() => onToggleCompare?.(property.id)}
                />
              </motion.div>
            ))}
          </div>

          {properties.length === 0 && !isFavoritesView && (
            <div className="empty-results">
              <div className="empty-icon">🔍</div>
              <h3>Ничего не найдено</h3>
              <p>Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </div>

      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onApply={setFilters}
      />
    </div>
  )
}

