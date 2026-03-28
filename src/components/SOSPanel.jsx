import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Siren, MapPin, MessageSquare, Send, CheckCircle, Phone, AlertTriangle } from 'lucide-react'
import { useContacts } from '../App'

const SOS_MESSAGE = (name, location) =>
  `🚨 EMERGENCY ALERT from Guardian Safety Platform\n\nHi, this is an automated SOS message.\n\n${name ? `${name} needs` : 'Someone needs'} immediate assistance.\n📍 Last known location: ${location || 'Location unavailable'}\n⏰ Time: ${new Date().toLocaleString()}\n\nPlease call them or contact emergency services (911) immediately.\n\n— Guardian Safety AI`

export default function SOSPanel() {
  const { contacts } = useContacts()
  const [phase, setPhase] = useState('idle') // idle | confirm | sending | sent
  const [location, setLocation] = useState('')
  const [senderName, setSenderName] = useState('')
  const [sentTo, setSentTo] = useState([])
  const [countdown, setCountdown] = useState(5)
  const timerRef = useRef(null)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setLocation(`${pos.coords.latitude.toFixed(5)}, ${pos.coords.longitude.toFixed(5)}`),
        () => setLocation('Location unavailable')
      )
    }
  }

  const startSOS = () => {
    getLocation()
    setPhase('confirm')
    setCountdown(5)
    let c = 5
    timerRef.current = setInterval(() => {
      c -= 1
      setCountdown(c)
      if (c <= 0) {
        clearInterval(timerRef.current)
        triggerSend()
      }
    }, 1000)
  }

  const cancelSOS = () => {
    clearInterval(timerRef.current)
    setPhase('idle')
    setCountdown(5)
  }

  const triggerSend = () => {
    clearInterval(timerRef.current)
    setPhase('sending')
    // Simulate sending delay per contact
    setTimeout(() => {
      setSentTo(contacts.map(c => c.id))
      setPhase('sent')
    }, 1800)
  }

  const reset = () => {
    setPhase('idle')
    setSentTo([])
    setLocation('')
    setCountdown(5)
  }

  const message = SOS_MESSAGE(senderName, location)

  return (
    <section id="sos" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 bg-crimson/10 text-crimson text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <Siren className="w-3.5 h-3.5" /> Emergency SOS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-safety-blue mt-1">Emergency SOS</h2>
          <p className="text-slate mt-3 max-w-xl mx-auto">
            One tap sends your location and a distress message to all your emergency contacts instantly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* ── Left: SOS Trigger ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-card-lg border border-slate-100 p-8 text-center"
          >
            <AnimatePresence mode="wait">

              {/* IDLE */}
              {phase === 'idle' && (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={senderName}
                      onChange={e => setSenderName(e.target.value)}
                      className="w-full bg-surface rounded-xl px-4 py-3 text-sm text-safety-blue placeholder-slate-light outline-none border border-slate-200 focus:border-safety-blue transition-colors mb-3"
                    />
                    <p className="text-slate-light text-xs">Included in the SOS message sent to your contacts.</p>
                  </div>

                  <motion.button
                    onClick={startSOS}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="w-40 h-40 rounded-full bg-crimson text-white mx-auto flex flex-col items-center justify-center gap-2 shadow-glow-red sos-pulse cursor-pointer border-4 border-crimson-light"
                  >
                    <Siren className="w-12 h-12" />
                    <span className="font-black text-lg tracking-wide">SOS</span>
                  </motion.button>

                  <p className="text-slate text-sm mt-6">
                    {contacts.length > 0
                      ? `Will alert ${contacts.length} contact${contacts.length > 1 ? 's' : ''}`
                      : 'Add contacts in the Emergency Contacts section first'}
                  </p>
                  {contacts.length === 0 && (
                    <button
                      onClick={() => document.getElementById('emergency-contacts')?.scrollIntoView({ behavior: 'smooth' })}
                      className="mt-3 text-safety-blue text-sm font-semibold underline underline-offset-2 hover:text-crimson transition-colors"
                    >
                      Add contacts →
                    </button>
                  )}
                </motion.div>
              )}

              {/* CONFIRM — countdown */}
              {phase === 'confirm' && (
                <motion.div key="confirm" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <div className="w-32 h-32 rounded-full bg-crimson/10 border-4 border-crimson mx-auto flex flex-col items-center justify-center mb-6">
                    <span className="text-crimson font-black text-5xl">{countdown}</span>
                    <span className="text-crimson text-xs font-semibold">seconds</span>
                  </div>
                  <h3 className="text-xl font-black text-safety-blue mb-2">Sending SOS in {countdown}s</h3>
                  <p className="text-slate text-sm mb-6">Your contacts will be alerted. Tap cancel if this was a mistake.</p>
                  <div className="flex gap-3">
                    <button
                      onClick={triggerSend}
                      className="flex-1 bg-crimson hover:bg-crimson-light text-white py-3 rounded-xl font-bold transition-colors shadow-glow-red"
                    >
                      Send Now
                    </button>
                    <button
                      onClick={cancelSOS}
                      className="flex-1 bg-surface hover:bg-slate/10 text-slate py-3 rounded-xl font-bold transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </motion.div>
              )}

              {/* SENDING */}
              {phase === 'sending' && (
                <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <div className="w-24 h-24 rounded-full bg-crimson/10 mx-auto flex items-center justify-center mb-6">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    >
                      <Send className="w-10 h-10 text-crimson" />
                    </motion.div>
                  </div>
                  <h3 className="text-xl font-black text-safety-blue mb-2">Sending alerts…</h3>
                  <p className="text-slate text-sm">Notifying your emergency contacts now.</p>
                  <div className="mt-6 space-y-2">
                    {contacts.map((c, i) => (
                      <motion.div
                        key={c.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.3 }}
                        className="flex items-center gap-3 bg-surface rounded-xl px-4 py-2.5"
                      >
                        <div className="w-7 h-7 bg-safety-blue rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{c.name[0]}</span>
                        </div>
                        <span className="text-safety-blue text-sm font-medium flex-1 text-left">{c.name}</span>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: i * 0.3 + 0.8 }}
                        >
                          <CheckCircle className="w-4 h-4 text-sage" />
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* SENT */}
              {phase === 'sent' && (
                <motion.div key="sent" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-24 h-24 rounded-full bg-sage/10 border-4 border-sage mx-auto flex items-center justify-center mb-6"
                  >
                    <CheckCircle className="w-12 h-12 text-sage" />
                  </motion.div>
                  <h3 className="text-xl font-black text-safety-blue mb-2">SOS Sent Successfully</h3>
                  <p className="text-slate text-sm mb-2">
                    {contacts.length} contact{contacts.length !== 1 ? 's' : ''} notified with your location.
                  </p>
                  {location && (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-slate-light mb-6">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{location}</span>
                    </div>
                  )}
                  <div className="space-y-2 mb-6">
                    {contacts.map(c => (
                      <div key={c.id} className="flex items-center gap-3 bg-sage/5 border border-sage/20 rounded-xl px-4 py-2.5">
                        <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                        <span className="text-safety-blue text-sm font-medium flex-1 text-left">{c.name}</span>
                        <span className="text-slate-light text-xs">{c.phone}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a href="tel:911" className="flex-1 flex items-center justify-center gap-2 bg-crimson text-white py-3 rounded-xl font-bold hover:bg-crimson-light transition-colors shadow-glow-red">
                      <Phone className="w-4 h-4" /> Call 911
                    </a>
                    <button onClick={reset} className="flex-1 bg-surface text-slate py-3 rounded-xl font-bold hover:bg-slate/10 transition-colors">
                      Reset
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Right: Message Preview ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            {/* Message preview */}
            <div className="bg-surface rounded-3xl p-6 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-4 h-4 text-safety-blue" />
                <p className="font-bold text-safety-blue text-sm">SOS Message Preview</p>
              </div>
              <div className="bg-white rounded-2xl p-4 border border-slate-200">
                <pre className="text-slate text-xs leading-relaxed whitespace-pre-wrap font-sans">{message}</pre>
              </div>
              <p className="text-slate-light text-xs mt-3">This message is sent to all your emergency contacts when SOS is triggered.</p>
            </div>

            {/* Contact summary */}
            <div className="bg-white rounded-3xl p-6 shadow-card border border-slate-100">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="w-4 h-4 text-crimson" />
                <p className="font-bold text-safety-blue text-sm">Will be notified</p>
              </div>
              {contacts.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-slate-light text-sm">No contacts added yet.</p>
                  <button
                    onClick={() => document.getElementById('emergency-contacts')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-2 text-safety-blue text-sm font-semibold underline underline-offset-2 hover:text-crimson transition-colors"
                  >
                    Add contacts →
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  {contacts.map(c => (
                    <div key={c.id} className="flex items-center gap-3 bg-surface rounded-xl px-3 py-2.5">
                      <div className="w-8 h-8 bg-safety-blue rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-black">{c.name[0]}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-safety-blue text-sm font-bold">{c.name}</p>
                        <p className="text-slate-light text-xs">{c.phone}</p>
                      </div>
                      <span className="text-xs text-slate-light">{c.relation}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tips */}
            <div className="bg-safety-blue rounded-3xl p-6 text-white">
              <p className="font-black text-sm mb-3">Safety Tips</p>
              <ul className="space-y-2 text-white/70 text-xs">
                <li className="flex items-start gap-2"><span className="text-sage-light mt-0.5">•</span> Always call 911 in a life-threatening emergency</li>
                <li className="flex items-start gap-2"><span className="text-sage-light mt-0.5">•</span> Keep your contacts list updated with trusted people</li>
                <li className="flex items-start gap-2"><span className="text-sage-light mt-0.5">•</span> Enable location permissions for accurate GPS sharing</li>
                <li className="flex items-start gap-2"><span className="text-sage-light mt-0.5">•</span> Test your SOS with a trusted contact periodically</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
