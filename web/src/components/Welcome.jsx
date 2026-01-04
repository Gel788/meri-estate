import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import KeyAnimation from './KeyAnimation'
import './Welcome.css'

const onboardingPages = [
  {
    icon: '🏠',
    title: 'Найдите дом мечты',
    description: 'Тысячи объектов недвижимости в одном приложении. Квартиры, дома, виллы и пентхаусы.',
    color: '#007AFF'
  },
  {
    icon: '🔍',
    title: 'Умный поиск',
    description: 'Мощные фильтры помогут найти идеальный вариант. Поиск по цене, площади, району и другим параметрам.',
    color: '#AF52DE'
  },
  {
    icon: '🗺️',
    title: 'Карта объектов',
    description: 'Все объекты на интерактивной карте. Выбирайте район, смотрите цены и находите лучшее расположение.',
    color: '#34C759'
  },
  {
    icon: '🧮',
    title: 'Калькулятор ипотеки',
    description: 'Рассчитайте ежемесячный платёж и узнайте, сколько вы заплатите за всё время кредита.',
    color: '#FF9500'
  },
  {
    icon: '👤',
    title: 'Связь с агентами',
    description: 'Свяжитесь с профессиональными агентами напрямую через звонок, email или WhatsApp.',
    color: '#FF3B30'
  }
]

export default function Welcome({ onComplete }) {
  const [showAnimation, setShowAnimation] = useState(true)
  const [currentPage, setCurrentPage] = useState(0)

  const handleAnimationComplete = () => {
    setShowAnimation(false)
  }

  const handleNext = () => {
    if (currentPage < onboardingPages.length - 1) {
      setCurrentPage(currentPage + 1)
    } else {
      onComplete()
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  if (showAnimation) {
    return <KeyAnimation onComplete={handleAnimationComplete} />
  }

  const currentPageData = onboardingPages[currentPage]

  return (
    <div className="welcome">
      {/* Skip button */}
      {currentPage < onboardingPages.length - 1 && (
        <button className="welcome-skip" onClick={handleSkip}>
          Пропустить
        </button>
      )}

      {/* Logo */}
      <div className="welcome-logo">
        <div className="welcome-logo-icon gradient-bg">
          <svg viewBox="0 0 100 100" fill="none">
            <path d="M20 50L50 20L80 50V80H55V60H45V80H20V50Z" fill="white" />
          </svg>
        </div>
        <h2 className="welcome-logo-text gradient-text">Meri Movs</h2>
        <p className="welcome-logo-subtitle">Ваш надёжный помощник в поиске недвижимости</p>
      </div>

      {/* Pages */}
      <div className="welcome-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            className="welcome-page"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="welcome-page-icon" style={{ background: `linear-gradient(135deg, ${currentPageData.color}33, ${currentPageData.color}11)` }}>
              <span style={{ color: currentPageData.color }}>{currentPageData.icon}</span>
            </div>
            <h3 className="welcome-page-title">{currentPageData.title}</h3>
            <p className="welcome-page-description">{currentPageData.description}</p>
          </motion.div>
        </AnimatePresence>

        {/* Page indicators */}
        <div className="welcome-indicators">
          {onboardingPages.map((page, index) => (
            <button
              key={index}
              className={`welcome-indicator ${index === currentPage ? 'active' : ''}`}
              style={{ background: index === currentPage ? currentPageData.color : '#E5E5EA' }}
              onClick={() => setCurrentPage(index)}
            />
          ))}
        </div>
      </div>

      {/* Action button */}
      <button
        className="welcome-button"
        style={{
          background: currentPage === onboardingPages.length - 1
            ? 'linear-gradient(135deg, #007AFF, #AF52DE)'
            : currentPageData.color
        }}
        onClick={handleNext}
      >
        <span>{currentPage === onboardingPages.length - 1 ? 'Начать' : 'Далее'}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M7 4L13 10L7 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

