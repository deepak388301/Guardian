import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Menu, X, Siren } from 'lucide-react'

const navLinks = [
  { label: 'Dashboard',  id: 'hero' },
  { label: 'Tracker',    id: 'tracker' },
  { label: 'Resources',  id: 'knowledge' },
  { label: 'Contacts',   id: 'emergency-contacts' },
  { label: 'SOS',        id: 'sos' },
  { label: 'AI Advisor', id: 'ai-advisor' },
]

export default function Header({ onSOS }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className={`sticky top-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-card' : 'bg-white border-b border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <button className="flex items-center gap-2.5" onClick={() => scrollTo('hero')}>
          <div className="w-9 h-9 bg-safety-blue rounded-xl flex items-center justify-center shadow-glow-blue">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-safety-blue tracking-tight">Guardian</span>
          <span className="hidden sm:inline text-xs text-slate-light font-medium border border-slate-200 px-2 py-0.5 rounded-full">Safety AI</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="px-3 py-2 rounded-lg text-slate hover:text-safety-blue hover:bg-surface font-medium text-sm transition-all"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* SOS Button + Hamburger */}
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onSOS}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-crimson text-white px-4 py-2 rounded-xl text-sm font-black transition-colors shadow-glow-red hover:bg-crimson-light"
          >
            <Siren className="w-4 h-4" />
            <span>SOS</span>
          </motion.button>
          <button
            className="lg:hidden p-2 text-slate hover:text-safety-blue rounded-lg hover:bg-surface transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className="text-left py-2.5 px-3 rounded-xl text-slate hover:bg-surface hover:text-safety-blue font-medium text-sm transition-colors"
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
