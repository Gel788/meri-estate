import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FeaturedProperties from './FeaturedProperties'
import Testimonials from './Testimonials'
import FAQ from './FAQ'
import Footer from './Footer'
import ContactForm from './ContactForm'
import { properties } from '../data/properties'
import './HomePage.css'

export default function HomePage({ onNavigate }) {
  const [showBanner, setShowBanner] = useState(true)
  const [showContactForm, setShowContactForm] = useState(false)

  const handleViewProperty = (idOrTab) => {
    if (typeof idOrTab === 'string') {
      onNavigate && onNavigate(idOrTab)
    } else {
      // Navigate to property detail
      onNavigate && onNavigate('search')
    }
  }

  const stats = [
    { number: '500+', label: 'Довольных клиентов', icon: '👥', color: '#703BF7' },
    { number: '15k+', label: 'Объектов недвижимости', icon: '🏢', color: '#A855F7' },
    { number: '12+', label: 'Лет на рынке', icon: '⭐', color: '#FFD700' },
    { number: '98%', label: 'Успешных сделок', icon: '✅', color: '#10B981' }
  ]

  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path d="M16 4L4 10V16C4 22.6 9.4 28.8 16 30C22.6 28.8 28 22.6 28 16V10L16 4Z" fill="currentColor"/>
          <path d="M16 16L12 14V18L16 20L20 18V14L16 16Z" fill="currentColor"/>
        </svg>
      ),
      title: 'Найдите дом мечты',
      description: 'Тысячи объектов недвижимости в одном месте'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="6" y="8" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 16L14 18L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Оценка недвижимости',
      description: 'Точная оценка стоимости вашей недвижимости'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <rect x="4" y="6" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M8 12H24M8 16H24M8 20H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Управление объектами',
      description: 'Легкое управление вашей недвижимостью'
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M16 8V16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      title: 'Умные инвестиции',
      description: 'Принимайте обоснованные решения на основе данных'
    }
  ]

  return (
    <div className="home-page">
      {/* Top Banner */}
      {showBanner && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="top-banner"
        >
          <div className="banner-content">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="banner-star">
              <path d="M8 0L10.163 5.52786L16 6.11146L11.8541 9.94428L12.9443 16L8 13.1115L3.05573 16L4.1459 9.94428L0 6.11146L5.83698 5.52786L8 0Z" fill="#FFE500"/>
            </svg>
            <span className="banner-text">
              Откройте для себя недвижимость мечты с Meri Movs <a href="#" className="banner-link">Узнать больше</a>
            </span>
          </div>
          <button
            className="banner-close"
            onClick={() => setShowBanner(false)}
            aria-label="Close banner"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </motion.div>
      )}


      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="hero-badge"
            >
              <span className="hero-badge-icon">✨</span>
              <span>Премиум недвижимость</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="hero-title"
            >
              Найдите <span className="hero-title-accent">недвижимость мечты</span> с Meri Movs
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="hero-description"
            >
              Ваш путь к идеальной недвижимости начинается здесь. Изучите наши <strong>премиум предложения</strong> и найдите дом, который соответствует вашим мечтам. Квартиры, дома, виллы и пентхаусы — всё в одном месте.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hero-features-list"
            >
              <div className="hero-feature-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.5 7.5L18.5 8.5L14 12.5L15 18.5L10 15.5L5 18.5L6 12.5L1.5 8.5L7.5 7.5L10 2Z" fill="currentColor"/>
                </svg>
                <span>Проверенные объекты</span>
              </div>
              <div className="hero-feature-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.5 7.5L18.5 8.5L14 12.5L15 18.5L10 15.5L5 18.5L6 12.5L1.5 8.5L7.5 7.5L10 2Z" fill="currentColor"/>
                </svg>
                <span>Лучшие цены</span>
              </div>
              <div className="hero-feature-item">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2L12.5 7.5L18.5 8.5L14 12.5L15 18.5L10 15.5L5 18.5L6 12.5L1.5 8.5L7.5 7.5L10 2Z" fill="currentColor"/>
                </svg>
                <span>24/7 Поддержка</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hero-buttons"
            >
              <button className="btn-secondary" onClick={() => onNavigate && onNavigate('search')}>
                Узнать больше
              </button>
              <button className="btn-primary" onClick={() => onNavigate && onNavigate('search')}>
                Смотреть объекты
              </button>
            </motion.div>
          </div>

          <div className="hero-visual">
            <div className="hero-graphic">
              {/* Skyscrapers illustration */}
              <div className="buildings">
                <div className="building building-1"></div>
                <div className="building building-2"></div>
                <div className="building building-3"></div>
                <div className="building building-4"></div>
              </div>
              
              {/* Circular element */}
              <div className="hero-circle">
                <svg className="circle-svg" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>
                  <text x="100" y="100" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="12" fontWeight="500">
                    <textPath href="#circle-path" startOffset="0%">
                      Найдите недвижимость мечты
                    </textPath>
                  </text>
                  <defs>
                    <path id="circle-path" d="M 100, 100 m -90, 0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"/>
                  </defs>
                </svg>
                <div className="circle-inner">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="stats-header"
        >
          <h2 className="stats-title">Почему выбирают нас</h2>
          <p className="stats-subtitle">Мы создаем лучший опыт в сфере недвижимости</p>
        </motion.div>
        <div className="stats-container">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="stat-card"
              whileHover={{ scale: 1.05, y: -8 }}
            >
              <div className="stat-icon-wrapper" style={{ '--stat-color': stat.color }}>
                <span className="stat-icon">{stat.icon}</span>
              </div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="features-section">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="features-header"
        >
          <h2 className="features-title">Наши возможности</h2>
          <p className="features-subtitle">Всё что нужно для комфортной работы с недвижимостью</p>
        </motion.div>
        <div className="features-container">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="feature-card"
              whileHover={{ scale: 1.03, y: -8 }}
            >
              <div className="feature-icon-wrapper">
                <div className="feature-icon" style={{ color: '#703BF7' }}>
                  {feature.icon}
                </div>
                <div className="feature-icon-glow"></div>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-arrow">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Properties Section */}
      <FeaturedProperties 
        properties={properties} 
        onViewProperty={handleViewProperty}
      />

      {/* Testimonials Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="contact-content"
          >
            <h2 className="contact-title">Свяжитесь с нами</h2>
            <p className="contact-description">
              Оставьте заявку, и наш специалист свяжется с вами в ближайшее время
            </p>
            <button 
              className="contact-cta-btn"
              onClick={() => setShowContactForm(true)}
            >
              Оставить заявку
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2.5 10H17.5M17.5 10L12.5 5M17.5 10L12.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="contact-form-modal"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ContactForm
                onClose={() => setShowContactForm(false)}
                onSubmit={(data) => {
                  console.log('Contact form submitted:', data)
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

