import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import StatsSection from './components/StatsSection'
import Services from './components/Services'
import About from './components/About'
import ROICalculator from './components/ROICalculator'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppWidget from './components/WhatsAppWidget'
import DynamicBackground from './components/DynamicBackground'

function App() {
  const [currentTheme, setCurrentTheme] = useState('dark-green-orange')

  // Aplicar tema al cargar la aplicación
  useEffect(() => {
    const savedTheme = localStorage.getItem('datacef-theme') || 'dark-green-orange'
    setCurrentTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem('datacef-theme', newTheme)
  }

  return (
    <div className="min-h-screen bg-primary text-primary relative overflow-x-hidden">
      {/* Fondo dinámico */}
      <DynamicBackground />
      
      {/* Header */}
      <Header currentTheme={currentTheme} onThemeChange={handleThemeChange} />
      
      {/* Contenido principal */}
      <main className="relative z-10">
        <Hero />
        <StatsSection />
        <Services />
        <About />
        <ROICalculator />
        <Contact />
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Widget de WhatsApp */}
      <WhatsAppWidget />
    </div>
  )
}

export default App

