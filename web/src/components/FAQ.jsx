import { useState } from 'react'
import { motion } from 'framer-motion'
import './FAQ.css'

export default function FAQ() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10

  const faqs = [
    {
      question: "Как искать недвижимость на Meri Movs?",
      answer: "Узнайте, как использовать наши удобные инструменты поиска для поиска недвижимости, соответствующей вашим критериям."
    },
    {
      question: "Какие документы нужны для продажи недвижимости через Meri Movs?",
      answer: "Узнайте о необходимых документах для размещения вашей недвижимости у нас."
    },
    {
      question: "Как связаться с агентом Meri Movs?",
      answer: "Откройте для себя различные способы связаться с нашими опытными агентами."
    }
  ]

  return (
    <section className="faq-section">
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
              Часто задаваемые вопросы
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="section-description"
          >
            Найдите ответы на распространенные вопросы об услугах Meri Movs, списках недвижимости и процессе работы с недвижимостью. Мы здесь, чтобы предоставить ясность и помочь вам на каждом шагу.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="view-all-btn"
          >
            Смотреть все FAQ
          </motion.button>
        </div>

        <div className="faq-grid">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="faq-card"
            >
              <h3 className="faq-question">{faq.question}</h3>
              <p className="faq-answer">{faq.answer}</p>
                  <button className="read-more-btn">
                    <span>Читать далее</span>
                  </button>
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

