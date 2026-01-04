import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './KeyAnimation.css'

export default function KeyAnimation({ onComplete }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),   // Lock appears
      setTimeout(() => setStep(2), 1500),  // Key moves
      setTimeout(() => setStep(3), 2200),  // Key rotates, rays appear
      setTimeout(() => setStep(4), 2800),  // Lock opens
      setTimeout(() => setStep(5), 3300),  // House appears
      setTimeout(() => setStep(6), 4500),  // Complete
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (step === 6) {
      setTimeout(onComplete, 500)
    }
  }, [step, onComplete])

  return (
    <div className="key-animation">
      {/* Rays */}
      {step >= 3 && (
        <div className="key-animation-rays">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="ray"
              style={{ transform: `rotate(${i * 30}deg)` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: step >= 5 ? 2.5 : 1.5, opacity: step >= 5 ? 0 : 0.6 }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
      )}

      {/* House */}
      {step >= 5 && (
        <motion.div
          className="key-animation-house"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <svg viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#007AFF" />
                <stop offset="100%" stopColor="#AF52DE" />
              </linearGradient>
            </defs>
            <path d="M20 50L50 20L80 50V80H55V60H45V80H20V50Z" fill="url(#houseGradient)" />
          </svg>
        </motion.div>
      )}

      {/* Lock */}
      {step < 5 && (
        <motion.div
          className="key-animation-lock"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: step >= 1 ? (step === 4 ? 1.2 : 1) : 0.5,
            opacity: step >= 1 ? 1 : 0,
            rotate: step >= 3 ? 15 : 0,
            y: step >= 5 ? -200 : 0
          }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <div className={`lock-circle ${step >= 4 ? 'unlocked' : ''}`}>
            <svg className="lock-icon" viewBox="0 0 100 100" fill="none">
              {step >= 4 ? (
                <path d="M30 45V35C30 24 35 20 50 20C65 20 70 24 70 35M40 80H60C70 80 75 75 75 65V55C75 45 70 40 60 40H40C30 40 25 45 25 55V65C25 75 30 80 40 80Z" stroke="white" strokeWidth="4" strokeLinecap="round"/>
              ) : (
                <path d="M30 45V35C30 24 35 20 50 20C65 20 70 24 70 35V45M40 80H60C70 80 75 75 75 65V55C75 45 70 40 60 40H40C30 40 25 45 25 55V65C25 75 30 80 40 80Z" stroke={step >= 1 ? '#8E8E93' : 'white'} strokeWidth="4" strokeLinecap="round"/>
              )}
            </svg>
          </div>
        </motion.div>
      )}

      {/* Key */}
      {step < 5 && (
        <motion.div
          className="key-animation-key"
          initial={{ x: 200, opacity: 0 }}
          animate={{
            x: step >= 2 ? 0 : 200,
            opacity: step >= 2 ? 1 : 0,
            rotate: step >= 3 ? 90 : 0,
            y: step >= 5 ? -200 : 0
          }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <svg viewBox="0 0 100 100" fill="none">
            <defs>
              <linearGradient id="keyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF9500" />
                <stop offset="100%" stopColor="#FFCC00" />
              </linearGradient>
            </defs>
            <path d="M70 50C70 58.28 63.28 65 55 65C46.72 65 40 58.28 40 50C40 41.72 46.72 35 55 35C63.28 35 70 41.72 70 50ZM40 50H25M30 45H20M30 55H20" stroke="url(#keyGradient)" strokeWidth="5" strokeLinecap="round"/>
          </svg>
        </motion.div>
      )}

      {/* Text */}
      {step >= 6 && (
        <motion.div
          className="key-animation-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Добро пожаловать</h2>
          <p>Откройте дверь в мир недвижимости с Meri Movs</p>
        </motion.div>
      )}
    </div>
  )
}

