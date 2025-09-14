import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  Globe,
  Code,
  Palette,
  Briefcase,
  Smartphone,
  ChevronDown
} from 'lucide-react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isLoading, setIsLoading] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedCapability, setSelectedCapability] = useState(0)
  const [isManualScroll, setIsManualScroll] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')
  const [showChallengePopup, setShowChallengePopup] = useState(false)

  useEffect(() => {
    // Loading effect
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Show challenge popup after loading
    const challengeTimer = setTimeout(() => {
      setShowChallengePopup(true)
    }, 2500)

    let timeoutId: number
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowBackToTop(window.scrollY > 300)
      
      // Calculate scroll progress
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setScrollProgress(scrollPercent)
      
      // Debounce scroll detection to prevent flickering
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        // Only detect active section if not manually scrolling
        if (!isManualScroll) {
          const sections = ['home', 'about', 'services', 'speed', 'example', 'quality', 'whyus', 'faq', 'contact']
          const scrollPosition = window.scrollY + 150
          
          for (let i = sections.length - 1; i >= 0; i--) {
            const element = document.getElementById(sections[i])
            if (element && element.offsetTop <= scrollPosition) {
              setActiveSection(sections[i])
              break
            }
          }
        }
      }, 50)
    }
    
    // Set initial active section
    handleScroll()
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timeoutId)
      clearTimeout(loadingTimer)
      clearTimeout(challengeTimer)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    // Map section names to actual IDs
    const sectionMap: { [key: string]: string } = {
      'home': 'home',
      'about': 'about',
      'services': 'services',
      'speed': 'speed',
      'example': 'example',
      'quality': 'quality',
      'whyus': 'whyus',
      'faq': 'faq',
      'contact': 'contact'
    }
    
    const actualId = sectionMap[sectionId] || sectionId
    const element = document.getElementById(actualId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    setIsManualScroll(true)
    setActiveSection('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Re-enable scroll detection after scroll completes
    setTimeout(() => {
      setIsManualScroll(false)
    }, 1000)
  }

  const validateForm = () => {
    const errors = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address'
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus('')
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-deep-ocean relative">
      {/* Loading Screen */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="fixed inset-0 bg-deep-ocean z-50 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-ocean-400 border-t-transparent rounded-full mx-auto mb-4"
            ></motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl font-bold ocean-gradient mb-2"
            >
              Sea Waves Solutions
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/80"
            >
              Loading your digital experience...
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* Welcome & Challenge Popup */}
      {showChallengePopup && (
        <div 
          className="fixed inset-0 bg-gradient-to-br from-ocean-900/90 to-deep-900/90 backdrop-blur-lg z-[100] flex items-start justify-center p-4 overflow-y-auto"
          onClick={() => setShowChallengePopup(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-gradient-to-br from-ocean-800/95 to-turquoise-800/95 backdrop-blur-xl border-2 border-ocean-400/60 rounded-2xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg relative overflow-hidden shadow-2xl mt-8 mb-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowChallengePopup(false)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white/60 hover:text-white transition-colors p-1 sm:p-2"
            >
              <X size={20} className="sm:w-6 sm:h-6" />
            </button>

            {/* Welcome Header */}
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-ocean-700 via-turquoise-600 to-foam-500 rounded-lg flex items-center justify-center shadow-2xl relative overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-3xl hover:scale-110 border border-ocean-400/40 mx-auto mb-3">
                {/* Coding Sea Waves Icon */}
                <div className="relative w-8 h-8 flex items-center justify-center">
                  {/* Wave 1 - Main Power Wave */}
                  <div className="absolute w-6 h-6 border-2 border-white/90 rounded-full animate-spin" style={{ animationDuration: '3s' }}>
                    <div className="absolute -top-1 left-1/2 w-2 h-2 bg-white/80 rounded-full transform -translate-x-1/2"></div>
                    <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-x-1/2"></div>
                    <div className="absolute top-1/2 -left-1 w-2 h-2 bg-white/70 rounded-full transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 -right-1 w-2 h-2 bg-white/70 rounded-full transform -translate-y-1/2"></div>
                  </div>
                  
                  {/* Wave 2 - Inner Momentum */}
                  <div className="absolute w-4 h-4 border border-white/60 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
                    <div className="absolute -top-0.5 left-1/2 w-1 h-1 bg-white/90 rounded-full transform -translate-x-1/2"></div>
                    <div className="absolute -bottom-0.5 left-1/2 w-1 h-1 bg-white/70 rounded-full transform -translate-x-1/2"></div>
                    <div className="absolute top-1/2 -left-0.5 w-1 h-1 bg-white/80 rounded-full transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 -right-0.5 w-1 h-1 bg-white/80 rounded-full transform -translate-y-1/2"></div>
                  </div>
                  
                  {/* Wave 3 - Core Energy */}
                  <div className="absolute w-2 h-2 bg-gradient-to-br from-white to-white/60 rounded-full animate-pulse" style={{ animationDuration: '1s' }}>
                    <div className="absolute inset-0 bg-white/40 rounded-full animate-ping"></div>
                  </div>
                  
                  {/* Power Lines - Unstoppable Force */}
                  <div className="absolute w-8 h-8">
                    <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-gradient-to-b from-white/80 to-transparent transform -translate-x-1/2 animate-pulse"></div>
                    <div className="absolute bottom-0 left-1/2 w-0.5 h-2 bg-gradient-to-t from-white/80 to-transparent transform -translate-x-1/2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute left-0 top-1/2 w-2 h-0.5 bg-gradient-to-r from-white/80 to-transparent transform -translate-y-1/2 animate-pulse" style={{ animationDelay: '0.25s' }}></div>
                    <div className="absolute right-0 top-1/2 w-2 h-0.5 bg-gradient-to-l from-white/80 to-transparent transform -translate-y-1/2 animate-pulse" style={{ animationDelay: '0.75s' }}></div>
                  </div>
                </div>
                
                {/* Code Energy Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-400/20 via-turquoise-400/20 to-foam-400/20 rounded-lg animate-pulse"></div>
                
                {/* Data Flow Ripples */}
                <div className="absolute inset-0 border border-white/30 rounded-lg animate-ping" style={{ animationDuration: '2s' }}></div>
                <div className="absolute inset-0 border border-white/20 rounded-lg animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
                
                {/* Unstoppable Code Processing Aura */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 ocean-gradient">
                Welcome to Sea Waves Solutions!
              </h2>
              <div className="bg-gradient-to-r from-turquoise-500/30 to-ocean-500/30 rounded-xl p-3 border border-turquoise-400/40">
                <p className="text-turquoise-200 font-bold text-sm">
                  ⚡ This entire website was built and made live in just 48 hours!
                </p>
              </div>
            </div>

            {/* Challenge Request */}
            <div className="space-y-4">
              <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <span className="w-7 h-7 bg-ocean-400 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">🔍</span>
                  We Challenge You!
                </h3>
                <p className="text-white/90 text-sm mb-3">
                  Find any defects in this website!
                </p>
                
                <div className="space-y-2">
                  <h4 className="text-white font-medium text-sm">Look for:</h4>
                  <ul className="space-y-2 text-white/80 text-sm">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-turquoise-400 rounded-full mr-3 flex-shrink-0"></span>
                      Broken links or buttons
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-turquoise-400 rounded-full mr-3 flex-shrink-0"></span>
                      Layout issues on different devices
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-turquoise-400 rounded-full mr-3 flex-shrink-0"></span>
                      Performance or loading problems
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-turquoise-400 rounded-full mr-3 flex-shrink-0"></span>
                      Visual inconsistencies or bugs
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-turquoise-500/20 to-ocean-500/20 rounded-xl p-4 border border-turquoise-400/30">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                  <span className="w-7 h-7 bg-turquoise-400 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">🎁</span>
                  If You Find One
                </h3>
                <ul className="space-y-2 text-white/90 text-sm">
                  <li className="flex items-center">
                    <span className="text-turquoise-400 mr-3 flex-shrink-0">✓</span>
                    Contact us with details
                  </li>
                  <li className="flex items-center">
                    <span className="text-turquoise-400 mr-3 flex-shrink-0">✓</span>
                    We'll fix it within 24 hours
                  </li>
                  <li className="flex items-center">
                    <span className="text-turquoise-400 mr-3 flex-shrink-0">✓</span>
                    You get 10% off your project
                  </li>
                  <li className="flex items-center">
                    <span className="text-turquoise-400 mr-3 flex-shrink-0">✓</span>
                    Free consultation for your business
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-ocean-500/30 to-turquoise-500/30 rounded-xl p-3 border border-ocean-400/40">
                <p className="text-center text-ocean-200 font-semibold text-sm">
                  💡 If you can't find any defects, imagine the quality we'll deliver for your project in just 48 hours!
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mt-6">
              <button
                onClick={() => {
                  setShowChallengePopup(false)
                  scrollToSection('quality')
                }}
                className="w-full bg-gradient-to-r from-ocean-500 to-turquoise-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-ocean-600 hover:to-turquoise-600 transition-all duration-300 transform hover:scale-105 text-sm shadow-lg"
              >
                Accept Challenge
              </button>
              <button
                onClick={() => setShowChallengePopup(false)}
                className="w-full bg-white/15 text-white py-3 px-4 rounded-xl font-semibold hover:bg-white/25 transition-all duration-300 border border-white/30 text-sm"
              >
                Explore Website First
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-ocean-900/20 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-ocean-400 via-turquoise-400 to-foam-400"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      {/* Section Indicators */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="flex flex-col space-y-4">
          {['home', 'about', 'services', 'internship', 'speed', 'example', 'quality', 'whyus', 'faq', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                activeSection === section 
                  ? 'bg-ocean-400 shadow-lg shadow-ocean-400/50 scale-125' 
                  : 'bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Go to ${section} section`}
            />
          ))}
        </div>
      </div>
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'deep-glass' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Company Name */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-ocean-700 via-turquoise-600 to-foam-500 rounded-lg flex items-center justify-center shadow-2xl relative overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-3xl hover:scale-110 border border-ocean-400/40">
                {/* Coding Sea Waves Icon */}
                <div className="relative w-8 h-8 flex items-center justify-center">
                  {/* Wave 1 - Main Power Wave */}
                  <div className="absolute w-6 h-6 border-2 border-white/90 rounded-full animate-spin" style={{ animationDuration: '3s' }}>
                    <div className="absolute -top-1 left-1/2 w-2 h-2 bg-white/80 rounded-full transform -translate-x-1/2"></div>
                    <div className="absolute -bottom-1 left-1/2 w-2 h-2 bg-white/60 rounded-full transform -translate-x-1/2"></div>
                    <div className="absolute top-1/2 -left-1 w-2 h-2 bg-white/70 rounded-full transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 -right-1 w-2 h-2 bg-white/70 rounded-full transform -translate-y-1/2"></div>
                  </div>
                  
                  {/* Wave 2 - Inner Momentum */}
                  <div className="absolute w-4 h-4 border border-white/60 rounded-full animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
                    <div className="absolute -top-0.5 left-1/2 w-1 h-1 bg-white/90 rounded-full transform -translate-x-1/2"></div>
                    <div className="absolute -bottom-0.5 left-1/2 w-1 h-1 bg-white/70 rounded-full transform -translate-x-1/2"></div>
                    <div className="absolute top-1/2 -left-0.5 w-1 h-1 bg-white/80 rounded-full transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 -right-0.5 w-1 h-1 bg-white/80 rounded-full transform -translate-y-1/2"></div>
                  </div>
                  
                  {/* Wave 3 - Core Energy */}
                  <div className="absolute w-2 h-2 bg-gradient-to-br from-white to-white/60 rounded-full animate-pulse" style={{ animationDuration: '1s' }}>
                    <div className="absolute inset-0 bg-white/40 rounded-full animate-ping"></div>
                  </div>
                  
                  {/* Power Lines - Unstoppable Force */}
                  <div className="absolute w-8 h-8">
                    <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-gradient-to-b from-white/80 to-transparent transform -translate-x-1/2 animate-pulse"></div>
                    <div className="absolute bottom-0 left-1/2 w-0.5 h-2 bg-gradient-to-t from-white/80 to-transparent transform -translate-x-1/2 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute left-0 top-1/2 w-2 h-0.5 bg-gradient-to-r from-white/80 to-transparent transform -translate-y-1/2 animate-pulse" style={{ animationDelay: '0.25s' }}></div>
                    <div className="absolute right-0 top-1/2 w-2 h-0.5 bg-gradient-to-l from-white/80 to-transparent transform -translate-y-1/2 animate-pulse" style={{ animationDelay: '0.75s' }}></div>
                  </div>
                </div>
                
                {/* Code Energy Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-400/20 via-turquoise-400/20 to-foam-400/20 rounded-lg animate-pulse"></div>
                
                {/* Data Flow Ripples */}
                <div className="absolute inset-0 border border-white/30 rounded-lg animate-ping" style={{ animationDuration: '2s' }}></div>
                <div className="absolute inset-0 border border-white/20 rounded-lg animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
                
                {/* Unstoppable Code Processing Aura */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Sea Waves Solutions</h1>
                <p className="text-xs text-ocean-300">One Stop Digital Solutions</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {[
                { name: 'Home', section: 'home' },
                { name: 'About', section: 'about' },
                { name: 'Services', section: 'services' },
                { name: 'Internship', section: 'internship', highlight: true },
                { name: 'Speed', section: 'speed' },
                { name: 'Example', section: 'example' },
                { name: 'Quality', section: 'quality' },
                { name: 'Why Us', section: 'whyus' },
                { name: 'FAQ', section: 'faq' },
                { name: 'Contact', section: 'contact' }
              ].map((item) => (
              <button 
                  key={item.name}
                  onClick={() => scrollToSection(item.section)}
                  className={`transition-all duration-300 relative group px-4 py-2 rounded-lg ${
                    item.highlight 
                      ? 'bg-gradient-to-r from-ocean-500/20 to-turquoise-500/20 text-white border border-ocean-400/30 hover:from-ocean-500/30 hover:to-turquoise-500/30' 
                      : 'text-ocean-200 hover:text-ocean-400 hover:bg-white/10'
                  }`}
                >
                  <span className="text-sm font-medium">{item.name}</span>
                  <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                    item.highlight ? 'w-full bg-turquoise-400' : 'w-0 bg-ocean-400'
                  }`}></span>
              </button>
              ))}
            </div>


            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-ocean-300 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden deep-glass rounded-lg mt-2 p-4"
            >
              <div className="flex flex-col space-y-3">
            {[
              { name: 'Home', section: 'home' },
              { name: 'About', section: 'about' },
              { name: 'Services', section: 'services' },
              { name: 'Internship', section: 'internship', highlight: true },
              { name: 'Speed', section: 'speed' },
              { name: 'Example', section: 'example' },
              { name: 'Quality', section: 'quality' },
              { name: 'Why Us', section: 'whyus' },
              { name: 'FAQ', section: 'faq' },
              { name: 'Contact', section: 'contact' }
            ].map((item) => (
                <button 
                    key={item.name}
                    onClick={() => {
                      scrollToSection(item.section);
                      setIsMenuOpen(false);
                    }}
                    className={`transition-colors text-left py-3 px-4 rounded-lg font-medium ${
                      item.highlight 
                        ? 'bg-gradient-to-r from-ocean-500/20 to-turquoise-500/20 text-white border border-ocean-400/30' 
                        : 'text-ocean-200 hover:text-ocean-400 hover:bg-white/10'
                    }`}
                  >
                    {item.name}
                </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/20 via-turquoise-500/20 to-foam-500/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-deep-900/30 via-transparent to-ocean-800/20"></div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-ocean-300/20 rounded-full blur-xl animate-float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-turquoise-300/15 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-foam-300/25 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-coral-300/20 rounded-full blur-lg animate-float" style={{animationDelay: '6s'}}></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Content Card */}
            <div className="ocean-glass rounded-3xl p-8 md:p-16 relative overflow-hidden">
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full animate-shimmer"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-8"
                >
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-white" style={{ lineHeight: '1.2' }}>
                    <span className="block mb-2">Transforming Ideas</span>
                    <span className="block text-ocean-300">into Reality</span>
                  </h1>
                </motion.div>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-4xl mx-auto leading-relaxed"
                >
                  We deliver websites in 48 hours and provide comprehensive web development, mobile app development, and digital solutions for businesses and students.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="bg-gradient-to-r from-ocean-500/20 to-turquoise-500/20 border border-ocean-400/30 rounded-2xl p-6 mb-12 max-w-2xl mx-auto"
                >
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    <span className="text-2xl">⚡</span>
                    <h3 className="text-xl font-bold text-white">Lightning Fast Delivery</h3>
                  </div>
                  <p className="text-ocean-200 text-lg font-semibold">
                    Simple websites live within 48 hours!
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="btn-ocean px-10 py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-300 shadow-xl flex items-center space-x-2"
                  >
                    <span>⚡</span>
                    <span>Get Website in 48 Hours</span>
              </button>
                  <button 
                    onClick={() => scrollToSection('services')}
                    className="btn-glass px-10 py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-300"
                  >
                    View Services
              </button>
                </motion.div>
            </div>
            </div>
            
          </motion.div>
        </div>
        
        
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="text-white/60" size={24} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="ocean-glass rounded-3xl p-12 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 ocean-gradient">
              About Our Expertise
            </h2>
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl text-white/80">
                We specialize in transforming innovative business ideas into reality through cutting-edge web development, 
                mobile applications, and comprehensive digital solutions. Our expertise spans from enterprise-level applications to comprehensive student development programs.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="ocean-glass rounded-2xl p-6 float-element">
                <Code className="text-ocean-300 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold wave-gradient mb-2">Web Development</h3>
                <p className="text-white/70">Modern, responsive websites built with cutting-edge technologies</p>
              </div>
              <div className="ocean-glass rounded-2xl p-6 float-element" style={{animationDelay: '0.5s'}}>
                <Palette className="text-turquoise-300 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold wave-gradient mb-2">UI/UX Design</h3>
                <p className="text-white/70">Beautiful, intuitive designs that enhance user experience</p>
              </div>
              <div className="ocean-glass rounded-2xl p-6 float-element" style={{animationDelay: '1s'}}>
                <Briefcase className="text-foam-300 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold wave-gradient mb-2">Consulting</h3>
                <p className="text-white/70">Strategic guidance for your digital transformation journey</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust & Credibility Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 ocean-gradient">
              Trusted by Businesses
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our expertise and certifications ensure professional delivery
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "MERN Stack Certified",
                description: "Full-stack development expertise",
                icon: "🎓"
              },
              {
                title: "IIT-M Affiliated",
                description: "Premium training institute partnership",
                icon: "🏛️"
              },
              {
                title: "2025 Fresh & Updated",
                description: "Latest technologies and practices",
                icon: "✨"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock technical assistance",
                icon: "🛠️"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="ocean-glass rounded-2xl p-6 text-center float-element"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speed Advantage Section */}
      <section id="speed" className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 ocean-gradient">
              Lightning Fast Delivery
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              We deliver simple websites and make them live within 48 hours!
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "48-Hour Delivery",
                description: "Simple websites go live within 48 hours",
                icon: "⚡",
                highlight: "FAST"
              },
              {
                title: "Quality Assured",
                description: "Speed without compromising on quality",
                icon: "✅",
                highlight: "RELIABLE"
              },
              {
                title: "24/7 Support",
                description: "Round-the-clock assistance during development",
                icon: "🛠️",
                highlight: "SUPPORT"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="ocean-glass rounded-2xl p-8 text-center float-element relative overflow-hidden"
              >
                <div className="absolute top-4 right-4">
                  <span className="bg-ocean-400 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {item.highlight}
                  </span>
                </div>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/80">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Example Section */}
      <section id="example" className="py-16 px-4 bg-gradient-to-br from-ocean-900/50 to-deep-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 ocean-gradient">
              Live Example: This Website
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              This very website was built and made live within 48 hours!
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="ocean-glass rounded-2xl p-8"
            >
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">🌊</span>
                <h3 className="text-2xl font-bold text-white">Sea Waves Solutions</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-ocean-400">⚡</span>
                  <span className="text-white/90">Built in 48 hours</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-ocean-400">🚀</span>
                  <span className="text-white/90">React + TypeScript + Tailwind</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-ocean-400">📱</span>
                  <span className="text-white/90">Fully responsive design</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-ocean-400">✨</span>
                  <span className="text-white/90">Modern animations & effects</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-ocean-400">🔧</span>
                  <span className="text-white/90">Contact forms & navigation</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="ocean-glass rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-4">What You Get in 48 Hours:</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="text-turquoise-400 mt-1">✓</span>
                  <span className="text-white/90">Complete website design & development</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-turquoise-400 mt-1">✓</span>
                  <span className="text-white/90">Mobile-responsive layout</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-turquoise-400 mt-1">✓</span>
                  <span className="text-white/90">Contact forms & functionality</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-turquoise-400 mt-1">✓</span>
                  <span className="text-white/90">SEO optimization</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-turquoise-400 mt-1">✓</span>
                  <span className="text-white/90">Hosting setup & deployment</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-turquoise-400 mt-1">✓</span>
                  <span className="text-white/90">Domain configuration</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 ocean-gradient">
              Our Services
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Globe,
                title: "Business Websites",
                description: "Professional, responsive websites built with cutting-edge technologies for business growth",
                color: "from-ocean-500 to-turquoise-500"
              },
              {
                icon: Briefcase,
                title: "Enterprise Solutions",
                description: "Complete digital transformation from concept to deployment for business excellence",
                color: "from-turquoise-500 to-foam-500"
              },
              {
                icon: Smartphone,
                title: "Mobile Applications",
                description: "Native and cross-platform mobile apps for iOS and Android with modern UI/UX",
                color: "from-foam-500 to-coral-500"
              },
              {
                icon: Palette,
                title: "Logo Design",
                description: "Creative and professional logo designs that represent your brand identity",
                color: "from-coral-500 to-ocean-500"
              },
              {
                icon: Code,
                title: "Student Programs",
                description: "Hands-on internship experience with real-world projects and industry mentorship",
                color: "from-ocean-500 to-turquoise-500"
              },
              {
                icon: Globe,
                title: "E-commerce Solutions",
                description: "Complete online stores with payment integration, inventory management, and analytics",
                color: "from-turquoise-500 to-foam-500"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4) }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="ocean-glass rounded-2xl p-8 text-center group cursor-pointer wave-element"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center`}>
                  <service.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-white/70">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Internship Section */}
      <section id="internship" className="py-20 px-4 bg-gradient-to-br from-turquoise-900/50 to-ocean-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 ocean-gradient">
                Student Internship & College Projects
              </h2>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-turquoise-400 to-ocean-400 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">FOR STUDENTS</div>
            </div>
            <p className="text-xl text-white/80 max-w-4xl mx-auto mb-8">
              Join our internship program and work on real-world projects! Perfect for CSE, IT, and Engineering students looking for practical experience in web development, mobile apps, and software engineering.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Web Development Internship",
                description: "Learn React, Angular, Node.js with real projects. Build responsive websites and web applications.",
                icon: "💻",
                duration: "2-6 months",
                skills: ["React", "Angular", "Node.js", "MongoDB", "Express"],
                projects: "5+ Real Projects"
              },
              {
                title: "Mobile App Development",
                description: "Create iOS and Android apps using React Native and Ionic. Learn cross-platform development.",
                icon: "📱",
                duration: "3-6 months",
                skills: ["React Native", "Ionic", "Flutter", "Firebase", "API Integration"],
                projects: "3+ Mobile Apps"
              },
              {
                title: "College Project Guidance",
                description: "Get help with final year projects, mini projects, and academic assignments in CSE/IT fields.",
                icon: "🎓",
                duration: "1-4 months",
                skills: ["Project Planning", "Code Review", "Documentation", "Presentation", "Viva Prep"],
                projects: "Unlimited Support"
              }
            ].map((internship, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="ocean-glass rounded-2xl p-8 hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl mb-4 text-center">{internship.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4 text-center">{internship.title}</h3>
                <p className="text-white/80 mb-6 text-center">{internship.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-ocean-300 font-medium">Duration:</span>
                    <span className="text-white font-semibold">{internship.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-ocean-300 font-medium">Projects:</span>
                    <span className="text-white font-semibold">{internship.projects}</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Skills You'll Learn:</h4>
                  <div className="flex flex-wrap gap-2">
                    {internship.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="bg-turquoise-500/20 text-turquoise-300 px-3 py-1 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-turquoise-500 to-ocean-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-turquoise-600 hover:to-ocean-600 transition-all duration-300">
                  Apply for Internship
                </button>
              </motion.div>
            ))}
          </div>

          {/* Internship Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="ocean-glass rounded-2xl p-8 mb-12"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Why Choose Our Internship Program?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "🏆", title: "Industry Experience", desc: "Work on real client projects" },
                { icon: "📜", title: "Internship Certificate", desc: "Get certified completion certificate" },
                { icon: "👨‍💼", title: "Mentorship", desc: "1-on-1 guidance from experts" },
                { icon: "📚", title: "Learning Resources", desc: "Access to latest tutorials and guides" }
              ].map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <h4 className="text-xl font-bold text-white mb-2">{benefit.title}</h4>
                  <p className="text-white/80 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="whyus" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 ocean-gradient">
              Why Choose Us
                </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Our commitment to excellence and professional development approach
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "48-Hour Delivery",
                description: "We deliver simple websites and make them live within 48 hours! Our efficient process ensures quick turnaround without compromising quality.",
                icon: "⚡"
              },
              {
                title: "Fresh Perspective",
                description: "As a new development team, we bring fresh ideas and the latest technologies without being constrained by outdated practices.",
                icon: "💡"
              },
              {
                title: "Personalized Attention",
                description: "Every project receives our full focus and dedication. We're not juggling hundreds of clients, so your project gets the attention it deserves.",
                icon: "🎯"
              },
              {
                title: "Direct Communication",
                description: "Work directly with the developers. No middlemen, no miscommunication - just clear, direct communication throughout your project.",
                icon: "📞"
              },
              {
                title: "Latest Technologies",
                description: "We're trained in the most current technologies and best practices, ensuring your project uses modern, efficient solutions.",
                icon: "🚀"
              },
              {
                title: "Flexible Approach",
                description: "We adapt to your needs and timeline. As a smaller team, we can be more flexible and responsive to changes.",
                icon: "🔄"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="ocean-glass rounded-2xl p-6 float-element text-center"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-4">{item.title}</h3>
                <p className="text-white/80 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Capabilities Section */}
      <section id="portfolio" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 ocean-gradient">
              Our Capabilities
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Interactive showcase of our technical expertise and development skills
            </p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Capability Selector */}
            <div className="space-y-4">
              {[
                {
                  title: "Web Development",
                  description: "Modern, responsive websites and web applications",
                  technologies: ["React", "Angular", "Next.js", "Vue.js", "Node.js", "NestJS", "TypeScript"],
                  features: ["Responsive Design", "SEO Optimization", "Performance", "Security", "CMS Integration"],
                  icon: "🌐"
                },
                {
                  title: "Mobile Development",
                  description: "Native and cross-platform mobile applications",
                  technologies: ["React Native", "Ionic", "Flutter", "iOS", "Android", "Firebase"],
                  features: ["Cross-platform", "Native Performance", "Push Notifications", "Offline Support", "App Store"],
                  icon: "📱"
                },
                {
                  title: "E-commerce Solutions",
                  description: "Complete online stores and payment systems",
                  technologies: ["Shopify", "WooCommerce", "Stripe", "PayPal", "MongoDB"],
                  features: ["Payment Gateway", "Inventory Management", "Order Tracking", "Analytics", "Security"],
                  icon: "🛒"
                },
                {
                  title: "UI/UX Design",
                  description: "Beautiful, intuitive user interfaces and experiences",
                  technologies: ["Figma", "Adobe XD", "Sketch", "Framer", "Principle"],
                  features: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"],
                  icon: "🎨"
                },
                {
                  title: "Backend Development",
                  description: "Robust server-side applications and APIs",
                  technologies: ["NestJS", "Node.js", "Express.js", "Python", "Java", "PostgreSQL", "MongoDB"],
                  features: ["API Development", "Database Design", "Cloud Services", "Microservices", "Security"],
                  icon: "⚙️"
                },
                {
                  title: "DevOps & Deployment",
                  description: "Automated deployment and infrastructure management",
                  technologies: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "CI/CD"],
                  features: ["Automated Deployment", "Monitoring", "Scaling", "Security", "Backup"],
                  icon: "🚀"
                }
              ].map((capability, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedCapability(index)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-300 ${
                    selectedCapability === index
                      ? 'ocean-glass border-2 border-ocean-400'
                      : 'deep-glass hover:ocean-glass'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{capability.icon}</div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{capability.title}</h3>
                      <p className="text-white/70 text-sm">{capability.description}</p>
                </div>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Dynamic Capability Details */}
            <motion.div
              key={selectedCapability}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="ocean-glass rounded-2xl p-8"
            >
              {(() => {
                const capability = [
                  {
                    title: "Web Development",
                    description: "Modern, responsive websites and web applications",
                    technologies: ["React", "Angular", "Next.js", "Vue.js", "Node.js", "NestJS", "TypeScript"],
                    features: ["Responsive Design", "SEO Optimization", "Performance", "Security", "CMS Integration"],
                    icon: "🌐"
                  },
                  {
                    title: "Mobile Development",
                    description: "Native and cross-platform mobile applications",
                    technologies: ["React Native", "Ionic", "Flutter", "iOS", "Android", "Firebase"],
                    features: ["Cross-platform", "Native Performance", "Push Notifications", "Offline Support", "App Store"],
                    icon: "📱"
                  },
                  {
                    title: "E-commerce Solutions",
                    description: "Complete online stores and payment systems",
                    technologies: ["Shopify", "WooCommerce", "Stripe", "PayPal", "MongoDB"],
                    features: ["Payment Gateway", "Inventory Management", "Order Tracking", "Analytics", "Security"],
                    icon: "🛒"
                  },
                  {
                    title: "UI/UX Design",
                    description: "Beautiful, intuitive user interfaces and experiences",
                    technologies: ["Figma", "Adobe XD", "Sketch", "Framer", "Principle"],
                    features: ["User Research", "Wireframing", "Prototyping", "Design Systems", "Usability Testing"],
                    icon: "🎨"
                  },
                  {
                    title: "Backend Development",
                    description: "Robust server-side applications and APIs",
                    technologies: ["NestJS", "Node.js", "Express.js", "Python", "Java", "PostgreSQL", "MongoDB"],
                    features: ["API Development", "Database Design", "Cloud Services", "Microservices", "Security"],
                    icon: "⚙️"
                  },
                  {
                    title: "DevOps & Deployment",
                    description: "Automated deployment and infrastructure management",
                    technologies: ["Docker", "Kubernetes", "AWS", "GitHub Actions", "CI/CD"],
                    features: ["Automated Deployment", "Monitoring", "Scaling", "Security", "Backup"],
                    icon: "🚀"
                  }
                ][selectedCapability];

                return (
                  <div>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="text-4xl">{capability.icon}</div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{capability.title}</h3>
                        <p className="text-white/80">{capability.description}</p>
                      </div>
                </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Technologies We Use</h4>
                        <div className="flex flex-wrap gap-2">
                          {capability.technologies.map((tech, index) => (
                            <span key={index} className="bg-ocean-500/20 text-ocean-300 px-3 py-1 rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                  </div>
                </div>

                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {capability.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-white/80">
                              <svg className="w-4 h-4 text-ocean-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
              </div>
            </div>
            </div>
                );
              })()}
          </motion.div>
          </div>
        </div>
      </section>

      {/* Quality Challenge Section */}
      <section id="quality" className="py-20 px-4 bg-gradient-to-br from-ocean-900/30 to-deep-900/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 ocean-gradient">
                Quality Challenge
            </h2>
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-turquoise-400 to-ocean-400 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                NEW!
              </div>
            </div>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              We're so confident in our work quality that we challenge you to find a defect in this website!
            </p>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="ocean-glass rounded-2xl p-8 max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-ocean-400 to-turquoise-400 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Find a Defect Challenge</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h4 className="text-lg font-semibold text-ocean-300 mb-4">What to Look For:</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• Broken links or buttons</li>
                    <li>• Layout issues on different devices</li>
                    <li>• Slow loading or performance problems</li>
                    <li>• Visual inconsistencies or bugs</li>
                    <li>• Form validation errors</li>
                    <li>• Navigation problems</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-turquoise-300 mb-4">If You Find One:</h4>
                  <ul className="space-y-2 text-white/80">
                    <li>• Contact us with details</li>
                    <li>• We'll fix it within 24 hours</li>
                    <li>• You get 10% off your project</li>
                    <li>• We'll credit you as a quality tester</li>
                    <li>• Free consultation for your business</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-gradient-to-r from-ocean-500/20 to-turquoise-500/20 rounded-lg border border-ocean-400/30">
                <p className="text-ocean-200 font-semibold">
                  💡 This website was built in 48 hours - if you can't find any defects, 
                  imagine the quality we'll deliver for your project!
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 ocean-gradient">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Common questions about our services and development process
            </p>
          </motion.div>
          
          <div className="space-y-4">
            {[
              {
                question: "What technologies do you use?",
                answer: "We use modern technologies including React, Next.js, Node.js, TypeScript, and databases like MongoDB and PostgreSQL."
              },
              {
                question: "How long does a project take?",
                answer: "Simple websites take 1-2 weeks, while complex applications take 1-3 months. We work efficiently to deliver faster than competitors."
              },
              {
                question: "Do you provide support?",
                answer: "Yes, we offer maintenance packages including updates, optimization, and bug fixes with flexible support plans."
              },
              {
                question: "How fast can you deliver?",
                answer: "We can deliver simple websites and make them live within 48 hours! Our efficient development process ensures quick turnaround without compromising quality."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="ocean-glass rounded-2xl p-6 float-element"
              >
                <h3 className="text-xl font-semibold text-white mb-4">{faq.question}</h3>
                <p className="text-white/80 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Contact & Location Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 ocean-gradient">
              Get In Touch
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Ready to transform your business? Let's discuss your digital transformation journey.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="ocean-glass rounded-3xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Send us a Message</h3>
              
              <form 
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-white/80 text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                        formErrors.name 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-white/20 focus:ring-ocean-400'
                      }`}
                      placeholder="Your full name"
                    />
                    {formErrors.name && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠️</span>
                        {formErrors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/80 text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 ${
                        formErrors.email 
                          ? 'border-red-400 focus:ring-red-400' 
                          : 'border-white/20 focus:ring-ocean-400'
                      }`}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && (
                      <p className="text-red-400 text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠️</span>
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-white/80 text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-ocean-400 focus:border-transparent transition-all duration-300"
                    placeholder="+91 98765 43210"
                  />
                </div>
                
                <div>
                  <label htmlFor="service" className="block text-white/80 text-sm font-medium mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-ocean-400 focus:border-transparent transition-all duration-300"
                  >
                    <option value="" className="bg-deep-900 text-white">Select a service</option>
                    <option value="web-development" className="bg-deep-900 text-white">Web Development</option>
                    <option value="mobile-app" className="bg-deep-900 text-white">Mobile App Development</option>
                    <option value="ui-ux" className="bg-deep-900 text-white">UI/UX Design</option>
                    <option value="ecommerce" className="bg-deep-900 text-white">E-commerce Solutions</option>
                    <option value="consulting" className="bg-deep-900 text-white">Digital Consulting</option>
                    <option value="other" className="bg-deep-900 text-white">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white/80 text-sm font-medium mb-2">
                    Project Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 bg-white/10 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-300 resize-none ${
                      formErrors.message 
                        ? 'border-red-400 focus:ring-red-400' 
                        : 'border-white/20 focus:ring-ocean-400'
                    }`}
                    placeholder="Tell us about your project requirements, timeline, and budget..."
                  ></textarea>
                  {formErrors.message && (
                    <p className="text-red-400 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠️</span>
                      {formErrors.message}
                    </p>
                  )}
                </div>
                
                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="bg-green-500/20 border border-green-400/30 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center space-x-2 text-green-400">
                      <span className="text-xl">✅</span>
                      <span className="font-semibold">Message sent successfully!</span>
                    </div>
                    <p className="text-green-300 text-sm mt-1">
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center space-x-2 text-red-400">
                      <span className="text-xl">❌</span>
                      <span className="font-semibold">Failed to send message</span>
                    </div>
                    <p className="text-red-300 text-sm mt-1">
                      Please try again or contact us directly.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transform transition-all duration-300 shadow-xl ${
                    isSubmitting 
                      ? 'bg-gray-500 cursor-not-allowed' 
                      : 'btn-ocean hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </motion.div>

            {/* Contact Information & Map */}
            <div className="space-y-6">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="ocean-glass rounded-3xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-6 text-center">Get In Touch</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center space-x-3 p-3 deep-glass rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-ocean-500 to-turquoise-500 rounded-lg flex items-center justify-center">
                      <Mail className="text-white" size={18} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">Email</h4>
                      <a href="mailto:seawavessolutions@gmail.com" className="text-ocean-300 hover:text-ocean-200 transition-colors text-sm">
                        seawavessolutions@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 deep-glass rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-turquoise-500 to-foam-500 rounded-lg flex items-center justify-center">
                      <Phone className="text-white" size={18} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">Phone</h4>
                      <a href="tel:+919443124106" className="text-ocean-300 hover:text-ocean-200 transition-colors text-sm">
                        +91 97919 67710
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 p-3 deep-glass rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-r from-foam-500 to-coral-500 rounded-lg flex items-center justify-center">
                      <MessageCircle className="text-white" size={18} />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-sm">WhatsApp</h4>
                      <a href="https://wa.me/919443124106" target="_blank" rel="noopener noreferrer" className="text-ocean-300 hover:text-ocean-200 transition-colors text-sm">
                        Chat with us instantly
                      </a>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="mailto:seawavessolutions@gmail.com"
                    className="btn-ocean flex items-center justify-center px-3 py-2 rounded-lg font-medium text-xs"
                  >
                    <Mail className="mr-1" size={14} />
                    Send Email
                  </a>
                  <a
                    href="tel:+919443124106"
                    className="btn-deep flex items-center justify-center px-3 py-2 rounded-lg font-medium text-xs"
                  >
                    <Phone className="mr-1" size={14} />
                    Call Now
                  </a>
                </div>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
                className="ocean-glass rounded-3xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-6 text-center">Our Location</h3>
                <div className="rounded-2xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.123456789!2d79.375!3d10.958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5531234567890%3A0x1234567890abcdef!2sKumbakonam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
                title="Sea Waves Solutions Location - Kumbakonam, Tamil Nadu"
                aria-label="Interactive map showing Sea Waves Solutions location in Kumbakonam, Tamil Nadu"
              ></iframe>
            </div>
                <div className="mt-4 text-center">
                  <p className="text-white/80 text-xs">
                    <MapPin className="inline mr-1" size={14} />
                    Kumbakonam, Tamil Nadu, India
                  </p>
            </div>
          </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-ocean-500/20">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold ocean-gradient mb-4">Sea Waves Solutions</h3>
          <p className="text-ocean-300 mb-6">Transforming Ideas into Reality</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="tel:+919443124106" className="text-ocean-400 hover:text-ocean-300 transition-colors">
              <Phone size={24} />
            </a>
            <a href="mailto:seawavessolutions@gmail.com" className="text-turquoise-400 hover:text-turquoise-300 transition-colors">
              <Mail size={24} />
            </a>
            <a href="https://wa.me/919443124106" target="_blank" rel="noopener noreferrer" className="text-foam-400 hover:text-foam-300 transition-colors">
              <MessageCircle size={24} />
            </a>
            <a href="#" className="text-coral-400 hover:text-coral-300 transition-colors">
              <MapPin size={24} />
            </a>
          </div>
          <p className="text-ocean-300/60 text-sm">
            © 2025 Sea Waves Solutions. All Rights Reserved.
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-ocean-500 to-turquoise-500 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <ChevronDown className="text-white rotate-180" size={20} />
        </motion.button>
      )}
    </div>
  )
}

export default App