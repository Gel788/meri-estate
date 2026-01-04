import { useState } from 'react'
import { motion } from 'framer-motion'
import './Testimonials.css'

export default function Testimonials() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  const testimonials = [
    {
      rating: 5,
      text: "Превосходный сервис! Наш опыт работы с Meri Movs был выдающимся. Преданность и профессионализм их команды сделали поиск дома мечты легким. Очень рекомендую!",
      name: "Владимир Петров",
      location: "Россия, Москва",
      avatar: "👨‍💼"
    },
    {
      rating: 5,
      text: "Эффективно и надежно. Meri Movs предоставил нам первоклассный сервис. Они помогли нам быстро продать нашу недвижимость по отличной цене. Мы не могли быть счастливее с результатом.",
      name: "Елена Смирнова",
      location: "Россия, Санкт-Петербург",
      avatar: "👩‍💼"
    },
    {
      rating: 5,
      text: "Доверенные консультанты. Команда Meri Movs провела нас через весь процесс покупки. Их знания и приверженность нашим потребностям были впечатляющими. Спасибо за вашу поддержку!",
      name: "Дмитрий Иванов",
      location: "Россия, Казань",
      avatar: "👨‍💻"
    }
  ]

  return (
    <section className="testimonials-section">
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
              Что говорят наши клиенты
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-description"
          >
            Читайте истории успеха и искренние отзывы наших ценных клиентов. Узнайте, почему они выбрали Meri Movs для своих потребностей в недвижимости.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="view-all-btn"
          >
            Смотреть все отзывы
          </motion.button>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="testimonial-card"
            >
              <div className="testimonial-rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.avatar}</div>
                <div className="author-info">
                  <div className="author-name">{testimonial.name}</div>
                  <div className="author-location">{testimonial.location}</div>
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

