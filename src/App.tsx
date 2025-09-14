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
  ChevronDown
} from 'lucide-react'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation Bar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Company Name */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-slate-700 to-slate-600 rounded-lg flex items-center justify-center border border-slate-500">
                <Code className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Sea Waves Solutions</h1>
                <p className="text-xs text-slate-300">Digital Excellence</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-white hover:text-slate-300 transition-colors"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-slate-300 transition-colors"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-white hover:text-slate-300 transition-colors"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-slate-300 transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-blue-300 transition-colors"
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
              className="md:hidden bg-slate-900/95 backdrop-blur-md rounded-lg mt-2 p-4"
            >
              <div className="flex flex-col space-y-4">
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-white hover:text-blue-300 transition-colors text-left"
                >
                  Home
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-white hover:text-blue-300 transition-colors text-left"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-white hover:text-blue-300 transition-colors text-left"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-white hover:text-blue-300 transition-colors text-left"
                >
                  Contact
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-700/20 via-slate-600/20 to-slate-700/20"></div>
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Transforming Ideas into Reality
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Empowering students and businesses with cutting-edge digital solutions and innovative technology expertise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-lg">
                Get Started
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 backdrop-blur-md border border-white/30">
                Learn More
              </button>
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
            className="bg-white/10 backdrop-blur-md rounded-3xl p-12 text-center border border-white/20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              About Our Expertise
            </h2>
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">Senior Full Stack Developer</h3>
                <p className="text-lg text-white/90 mb-4">
                  Certified in MERN Stack by GUVI (IIT-M affiliated) with extensive experience in modern web technologies.
                </p>
                <div className="flex items-center justify-center">
                  <span className="bg-gradient-to-r from-slate-700 to-slate-600 text-white px-4 py-2 rounded-full text-sm font-semibold border border-slate-500">
                    MERN Stack Certified
                  </span>
                </div>
              </div>
              <p className="text-xl text-white/80">
                We specialize in transforming innovative ideas into reality through cutting-edge web development, 
                mobile applications, and digital solutions. Our expertise spans from student projects to enterprise-level applications.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <Code className="text-slate-400 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-white mb-2">Web Development</h3>
                <p className="text-white/70">Modern, responsive websites built with cutting-edge technologies</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <Palette className="text-slate-400 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-white mb-2">UI/UX Design</h3>
                <p className="text-white/70">Beautiful, intuitive designs that enhance user experience</p>
              </div>
              <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                <Briefcase className="text-slate-400 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-white mb-2">Consulting</h3>
                <p className="text-white/70">Strategic guidance for your digital transformation journey</p>
              </div>
            </div>
          </motion.div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Our Services
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Comprehensive digital solutions tailored to your business needs
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Code,
                title: "Internship Programs",
                description: "Hands-on experience with real-world projects and industry mentorship",
                color: "from-slate-700 to-slate-600"
              },
              {
                icon: Briefcase,
                title: "College Projects",
                description: "Complete project development from concept to deployment for academic excellence",
                color: "from-slate-600 to-slate-500"
              },
              {
                icon: Globe,
                title: "Website Creation",
                description: "Modern, responsive websites built with cutting-edge technologies and best practices",
                color: "from-slate-500 to-slate-400"
              },
              {
                icon: Palette,
                title: "Logo Design",
                description: "Creative and professional logo designs that represent your brand identity",
                color: "from-slate-400 to-slate-300"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center group cursor-pointer border border-white/20"
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

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20"
          >
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                  Get In Touch
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Ready to start your digital journey? Let's discuss your project!
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  <a
                    href="mailto:info@seawavessolutions.com"
                    className="flex items-center justify-center bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-600 hover:to-slate-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    <Mail className="mr-2" size={20} />
                    Email Us
                  </a>
                  
                  <a
                    href="tel:+919876543210"
                    className="flex items-center justify-center bg-gradient-to-r from-slate-600 to-slate-500 hover:from-slate-500 hover:to-slate-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    <Phone className="mr-2" size={20} />
                    Call Us
                  </a>
                  
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    <MessageCircle className="mr-2" size={20} />
                    WhatsApp
                  </a>
                  
                  <button className="flex items-center justify-center bg-gradient-to-r from-slate-500 to-slate-400 hover:from-slate-400 hover:to-slate-300 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300">
                    <MapPin className="mr-2" size={20} />
                    Location
                  </button>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <h4 className="text-lg font-semibold text-white mb-2">Contact Form</h4>
                  <p className="text-white/70 text-sm mb-4">Form will be available soon. Please use the contact buttons above for now.</p>
                  <div className="bg-white/5 rounded-lg p-4 text-center">
                    <span className="text-white/50 text-sm">📝 Contact Form Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
          >
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              Find Us
            </h2>
            <div className="rounded-2xl overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.123456789!2d79.375!3d10.958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5531234567890%3A0x1234567890abcdef!2sKumbakonam%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Sea Waves Solutions</h3>
          <p className="text-white/60 mb-6">Transforming Ideas into Reality</p>
          <div className="flex justify-center space-x-6 mb-6">
            <a href="tel:+919876543210" className="text-white/60 hover:text-blue-400 transition-colors">
              <Phone size={24} />
            </a>
            <a href="mailto:info@seawavessolutions.com" className="text-white/60 hover:text-blue-400 transition-colors">
              <Mail size={24} />
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-green-400 transition-colors">
              <MessageCircle size={24} />
            </a>
            <a href="#" className="text-white/60 hover:text-blue-400 transition-colors">
              <MapPin size={24} />
            </a>
          </div>
          <p className="text-white/40 text-sm">
            © 2025 Sea Waves Solutions. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App