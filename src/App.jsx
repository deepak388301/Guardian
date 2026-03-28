import React, { useState, createContext, useContext } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import SafetyTracker from './components/SafetyTracker'
import PillarCards from './components/PillarCards'
import KnowledgeCenter from './components/KnowledgeCenter'
import EmergencyContacts from './components/EmergencyContacts'
import SOSPanel from './components/SOSPanel'
import AIAdvisor from './components/AIAdvisor'
import FloatingChat from './components/FloatingChat'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

// Shared contacts context so SOS panel can read contacts added in EmergencyContacts
export const ContactsContext = createContext({ contacts: [], setContacts: () => {} })
export const useContacts = () => useContext(ContactsContext)

export default function App() {
  const [sosActive, setSosActive] = useState(false)
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Mom', phone: '555-0101', relation: 'Family' },
    { id: 2, name: 'Best Friend', phone: '555-0182', relation: 'Friend' },
  ])

  return (
    <ContactsContext.Provider value={{ contacts, setContacts }}>
      <div className="min-h-screen bg-cream font-sans">
        <Header onSOS={() => setSosActive(true)} />
        <main>
          <Hero onSOS={() => setSosActive(true)} />
          <SafetyTracker />
          <PillarCards />
          <KnowledgeCenter />
          <EmergencyContacts />
          <SOSPanel />
          <AIAdvisor />
        </main>

        <footer className="bg-safety-blue text-white py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">Guardian</span>
            </div>
            <p className="text-white/50 text-sm text-center">
              © 2026 Guardian Platform. In a real emergency, always call{' '}
              <a href="tel:911" className="text-crimson-light font-bold hover:underline">911</a>.
            </p>
            <p className="text-white/30 text-xs">Your safety is our mission.</p>
          </div>
        </footer>

        <FloatingChat />

        {/* SOS Triggered Modal */}
        <AnimatePresence>
          {sosActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              onClick={() => setSosActive(false)}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.85, opacity: 0, y: 30 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center"
                onClick={e => e.stopPropagation()}
              >
                <div className="w-20 h-20 bg-crimson rounded-full flex items-center justify-center mx-auto mb-5 sos-pulse">
                  <span className="text-white text-4xl">🚨</span>
                </div>
                <h2 className="text-2xl font-black text-safety-blue mb-2">SOS Alert Sent</h2>
                <p className="text-slate text-sm mb-4 leading-relaxed">
                  Your emergency contacts have been notified with your current location and a distress message.
                </p>
                {contacts.length > 0 && (
                  <div className="bg-surface rounded-2xl p-4 mb-5 text-left space-y-2">
                    <p className="text-xs font-bold text-slate uppercase tracking-widest mb-2">Notified</p>
                    {contacts.map(c => (
                      <div key={c.id} className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-crimson/10 rounded-full flex items-center justify-center">
                          <span className="text-crimson text-xs font-bold">{c.name[0]}</span>
                        </div>
                        <span className="text-safety-blue text-sm font-medium">{c.name}</span>
                        <span className="text-slate-light text-xs ml-auto">{c.phone}</span>
                      </div>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => setSosActive(false)}
                  className="w-full bg-safety-blue hover:bg-safety-blue-light text-white py-3 rounded-xl font-bold transition-colors"
                >
                  Dismiss
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ContactsContext.Provider>
  )
}
