import { useState } from 'react'
import './Footer.css'

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      console.log('Email submitted:', email)
      setEmail('')
    }
  }

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="4" width="16" height="16" rx="4" fill="#703BF7"/>
                  <text x="12" y="16" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">M</text>
                </svg>
              </div>
              <span className="logo-text">Meri Movs</span>
            </div>
            <form className="email-subscribe" onSubmit={handleSubmit}>
              <div className="email-input-wrapper">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="email-icon">
                  <path d="M2.5 6.66667L9.0755 11.0504C9.63533 11.4236 10.3647 11.4236 10.9245 11.0504L17.5 6.66667M3.33333 15H16.6667C17.5871 15 18.3333 14.2538 18.3333 13.3333V6.66667C18.3333 5.74619 17.5871 5 16.6667 5H3.33333C2.41286 5 1.66667 5.74619 1.66667 6.66667V13.3333C1.66667 14.2538 2.41286 15 3.33333 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input
                  type="email"
                  placeholder="Введите ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="email-input"
                />
              </div>
              <button type="submit" className="email-submit">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M2.5 10H17.5M17.5 10L12.5 5M17.5 10L12.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>

          <div className="footer-links">
            <div className="footer-column">
              <h4 className="footer-column-title">Главная</h4>
              <ul className="footer-list">
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}>Главная страница</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}>Возможности</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('search'); }}>Недвижимость</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}>Отзывы</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('home'); }}>FAQ</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">О нас</h4>
              <ul className="footer-list">
                <li><a href="#">Наша история</a></li>
                <li><a href="#">Наши работы</a></li>
                <li><a href="#">Как это работает</a></li>
                <li><a href="#">Наша команда</a></li>
                <li><a href="#">Наши клиенты</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Недвижимость</h4>
              <ul className="footer-list">
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('search'); }}>Портфолио</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate('search'); }}>Категории</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Услуги</h4>
              <ul className="footer-list">
                <li><a href="#">Оценка недвижимости</a></li>
                <li><a href="#">Стратегический маркетинг</a></li>
                <li><a href="#">Переговоры</a></li>
                <li><a href="#">Успешное закрытие</a></li>
                <li><a href="#">Управление недвижимостью</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4 className="footer-column-title">Связаться</h4>
              <ul className="footer-list">
                <li><a href="#">Форма обратной связи</a></li>
                <li><a href="#">Наши офисы</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

