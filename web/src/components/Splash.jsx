import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import './Splash.css'

export default function Splash() {
  const [scale, setScale] = useState(0.3)
  const [opacity, setOpacity] = useState(0)
  const [rotation, setRotation] = useState(-180)

  useEffect(() => {
    setTimeout(() => {
      setScale(1)
      setOpacity(1)
      setRotation(0)
    }, 100)
  }, [])

  return (
    <div className="splash">
      {/* Decorative circles */}
      <motion.div
        className="splash-circle splash-circle-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: opacity }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="splash-circle splash-circle-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: opacity }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />

      <div className="splash-content">
        {/* Logo */}
        <motion.div
          className="splash-logo"
          initial={{ scale: 0.3, opacity: 0, rotate: -180 }}
          animate={{ scale: scale, opacity: opacity, rotate: rotation }}
          transition={{ type: 'spring', stiffness: 100, damping: 15, duration: 0.8 }}
        >
          <div className="splash-logo-bg" />
          <svg className="splash-logo-icon" viewBox="0 0 100 100" fill="none">
            <path d="M20 50L50 20L80 50V80H55V60H45V80H20V50Z" fill="url(#gradient1)" />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#007AFF" />
                <stop offset="100%" stopColor="#AF52DE" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Text */}
        <motion.div
          className="splash-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h1 className="splash-title gradient-text">Meri Movs</h1>
          <div className="splash-subtitle">
            <span className="dot" />
            <span>Недвижимость вашей мечты</span>
            <span className="dot dot-purple" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

