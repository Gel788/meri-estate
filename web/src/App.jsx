import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Splash from './components/Splash'
import Welcome from './components/Welcome'
import MainApp from './components/MainApp'
import './App.css'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)
  const [isFirstLaunch, setIsFirstLaunch] = useState(true)

  useEffect(() => {
    // Check if first launch
    const hasVisited = localStorage.getItem('hasVisited')
    if (hasVisited) {
      setIsFirstLaunch(false)
    }

    // Hide splash after 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false)
      if (!hasVisited) {
        setShowWelcome(true)
      }
    }, 2100)

    return () => clearTimeout(timer)
  }, [])

  const handleWelcomeComplete = () => {
    localStorage.setItem('hasVisited', 'true')
    setShowWelcome(false)
    setIsFirstLaunch(false)
  }

  if (showSplash) {
    return <Splash />
  }

  if (showWelcome && isFirstLaunch) {
    return <Welcome onComplete={handleWelcomeComplete} />
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App

