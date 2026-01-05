import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { properties } from '../data/properties'
import HomePage from './HomePage'
import PropertyList from './PropertyList'
import Calculator from './Calculator'
import MapView from './MapView'
import CompareView from './CompareView'
import './MainApp.css'

export default function MainApp() {
  const [activeTab, setActiveTab] = useState('home')
  const [showCompare, setShowCompare] = useState(false)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })
  const [viewHistory, setViewHistory] = useState(() => {
    const saved = localStorage.getItem('viewHistory')
    return saved ? JSON.parse(saved) : []
  })
  const [compareList, setCompareList] = useState(() => {
    const saved = localStorage.getItem('compareList')
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })
  const [filters, setFilters] = useState({
    searchText: '',
    type: null,
    status: null,
    minPrice: 0,
    maxPrice: 200000000,
    minArea: 0,
    maxArea: 1000,
    rooms: 0,
    city: ''
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem('viewHistory', JSON.stringify(viewHistory))
  }, [viewHistory])

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(Array.from(compareList)))
  }, [compareList])

  const addToViewHistory = (propertyId) => {
    const property = properties.find(p => p.id === propertyId)
    if (!property) return

    const newHistory = [
      property,
      ...viewHistory.filter(p => p.id !== propertyId)
    ].slice(0, 10) // Храним только последние 10 просмотров

    setViewHistory(newHistory)
  }

  const toggleCompare = (id) => {
    const newCompare = new Set(compareList)
    if (newCompare.has(id)) {
      newCompare.delete(id)
    } else {
      if (newCompare.size >= 3) {
        alert('Можно сравнить максимум 3 объекта')
        return
      }
      newCompare.add(id)
    }
    setCompareList(newCompare)
  }

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(id)) {
      newFavorites.delete(id)
    } else {
      newFavorites.add(id)
      // Haptic feedback для мобильных устройств
      if (navigator.vibrate) {
        navigator.vibrate(50)
      }
    }
    setFavorites(newFavorites)
  }

  const filteredProperties = properties.filter(property => {
    if (filters.searchText) {
      const search = filters.searchText.toLowerCase()
      if (!property.title.toLowerCase().includes(search) &&
          !property.address.toLowerCase().includes(search) &&
          !property.city.toLowerCase().includes(search)) {
        return false
      }
    }
    if (filters.type && property.type !== filters.type) return false
    if (filters.status && property.status !== filters.status) return false
    if (property.price < filters.minPrice || property.price > filters.maxPrice) return false
    if (property.area < filters.minArea || property.area > filters.maxArea) return false
    if (filters.rooms > 0 && property.rooms !== filters.rooms) return false
    if (filters.city && property.city !== filters.city) return false
    return true
  })

  const favoriteProperties = properties.filter(p => favorites.has(p.id))

  const handleNavigate = (tab) => {
    setActiveTab(tab)
    // Плавная прокрутка вверх при переходе
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const getPageTitle = () => {
    switch(activeTab) {
      case 'home': return 'Главная'
      case 'search': return 'Поиск недвижимости'
      case 'favorites': return 'Избранное'
      case 'map': return 'Карта'
      case 'calculator': return 'Калькулятор ипотеки'
      default: return 'Meri Movs'
    }
  }

  return (
    <div className="main-app">
      {/* Единый хедер для всех страниц */}
      <header className="main-header">
        <div className="container">
          <div className="header-content">
            <button 
              className="header-logo-btn"
              onClick={() => setActiveTab('home')}
            >
              <div className="logo-icon-small">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="4" fill="#703BF7"/>
                  <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">M</text>
                </svg>
              </div>
              <h1 className="header-logo gradient-text">Meri Movs</h1>
            </button>
            
            {/* Навигация в хедере для десктопа */}
            <nav className="header-nav">
              <button
                className={`header-nav-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => setActiveTab('home')}
              >
                Главная
              </button>
              <button
                className={`header-nav-item ${activeTab === 'search' ? 'active' : ''}`}
                onClick={() => setActiveTab('search')}
              >
                Недвижимость
              </button>
              <button
                className={`header-nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
                onClick={() => setActiveTab('favorites')}
              >
                Избранное
                {favorites.size > 0 && (
                  <span className="header-badge">{favorites.size}</span>
                )}
              </button>
              <button
                className={`header-nav-item ${activeTab === 'map' ? 'active' : ''}`}
                onClick={() => setActiveTab('map')}
              >
                Карта
              </button>
              <button
                className={`header-nav-item ${activeTab === 'calculator' ? 'active' : ''}`}
                onClick={() => setActiveTab('calculator')}
              >
                Калькулятор
              </button>
            </nav>

            <div className="header-actions">
              {compareList.size > 0 && (
                <button 
                  className="header-btn compare-btn-header"
                  onClick={() => setShowCompare(true)}
                  title="Сравнить объекты"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {compareList.size > 0 && (
                    <span className="header-badge">{compareList.size}</span>
                  )}
                </button>
              )}
              <button className="header-btn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M4 20C4 16.134 7.582 13 12 13C16.418 13 20 16.134 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="main-content">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <HomePage onNavigate={handleNavigate} />
            </motion.div>
          )}
          {activeTab === 'search' && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PropertyList
                properties={filteredProperties}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                filters={filters}
                setFilters={setFilters}
                onNavigate={handleNavigate}
                onView={addToViewHistory}
                compareList={compareList}
                onToggleCompare={toggleCompare}
              />
            </motion.div>
          )}
          {activeTab === 'favorites' && (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <PropertyList
                properties={favoriteProperties}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                isFavoritesView={true}
                onNavigate={handleNavigate}
                onView={addToViewHistory}
                compareList={compareList}
                onToggleCompare={toggleCompare}
              />
            </motion.div>
          )}
          {activeTab === 'calculator' && (
            <motion.div
              key="calculator"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Calculator />
            </motion.div>
          )}
          {activeTab === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <MapView
                properties={filteredProperties}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
                onNavigate={handleNavigate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Нижняя навигация для мобильных устройств - всегда видна */}
      <nav className="main-nav">
        <button
          className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => setActiveTab('home')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Главная</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'search' ? 'active' : ''}`}
          onClick={() => setActiveTab('search')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Поиск</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={activeTab === 'favorites' ? 'currentColor' : 'none'}>
            <path d="M20.84 4.61C20.3292 4.099 19.7228 3.69364 19.0554 3.41708C18.3879 3.14052 17.6725 2.99817 16.95 2.99817C16.2275 2.99817 15.5121 3.14052 14.8446 3.41708C14.1772 3.69364 13.5708 4.099 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99871 7.05 2.99871C5.59096 2.99871 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54871 7.04097 1.54871 8.5C1.54871 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.351 11.8792 21.7564 11.2728 22.0329 10.6054C22.3095 9.93789 22.4518 9.22248 22.4518 8.5C22.4518 7.77752 22.3095 7.06211 22.0329 6.39464C21.7564 5.72718 21.351 5.12084 20.84 4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Избранное</span>
          {favorites.size > 0 && (
            <span className="nav-badge">{favorites.size}</span>
          )}
        </button>
        <button
          className={`nav-item ${activeTab === 'map' ? 'active' : ''}`}
          onClick={() => setActiveTab('map')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 2L1 6V22L9 18L15 22L23 18V2L15 6L9 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 2V18M15 6V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Карта</span>
        </button>
        <button
          className={`nav-item ${activeTab === 'calculator' ? 'active' : ''}`}
          onClick={() => setActiveTab('calculator')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 6H16M8 10H16M8 14H10M14 14H16M8 18H10M14 18H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span>Калькулятор</span>
        </button>
      </nav>

      <AnimatePresence>
        {showCompare && (
          <CompareView
            compareList={compareList}
            onClose={() => setShowCompare(false)}
            onRemove={toggleCompare}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

