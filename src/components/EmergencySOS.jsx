import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Siren, MapPin, Phone, MessageSquare, X, CheckCircle, AlertTriangle, Mic, MicOff } from 'lucide-react'

const HOLD_DURATION = 3000 // 3 seconds hold to activate

const steps = [
  { icon: MapPin, label: 'Location captured', color: 'text-sage-light' },
  { icon: MessageSquare, label: 'Alert message sent', color: 'text-blue-300' },
  { icon: Phone, label: 'Contacts notified', color: 'text-gold' },
]

export default function EmergencySOS() {
  const [phase, setPhase] = useState('idle') // idle | holding | active | cancelled
  const [holdProgress, setHoldProgress] = useState(0)
  const [activeStep, setActiveStep] = useState(-1)
  const [recording, setRecording] = useState(false)
  const holdInterval = useRef(null)
  const stepInterval = useRef(null)

  const startHold = () => {
    if (phase === 'active') return
    setPhase('holding')
    setHoldProgress(0)
    const start = Date.now()
    holdInterval.current = setInterval(() => {
      const elapsed = Date.now() - start
      const pct = Math.min((elapsed / HOLD_DURATION) * 100, 100)
      setHoldProgress(pct)
      if (pct >= 100) {
        clearInterval(holdInterval.current)
        triggerSOS()
      }
    }, 30)
  }

  const cancelHold = () => {
    if (phase !== 'holding') return
    clearInterval(holdInterval.current)
    setPhase('idle')
    setHoldProgress(0)
  }

  const triggerSOS = () => {
    setPhase('active')
    setActiveStep(0)
    let step = 0
    stepInterval.current = setInterval(() => {
      step++
      if (step < steps.length) {
        setActiveStep(step)
      } else {
        clearInterval(stepInterval.current)
      }
    }, 900)
  }

  const cancelSOS = () => {
    clearInterval(holdInterval.current)
    clearInterval(stepInterval.current)
    setPhase('cancelled')
    setActiveStep(-1)
    setHoldProgress(0)
    setRecording(false)
    setTimeout(() => setPhase('idle'), 3000)
  }

  return (
    <section id="sos" className="py-20 bg-gradient-to-b from-cream to-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-crimson/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 bg-crimson/10 text-crimson px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Siren className="w-4 h-4" /> Emergency Response
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-safety-blue">Emergency SOS</h2>
          <p className="text-slate mt-3 max-w-lg mx-auto">Hold the SOS button for 3 seconds to instantly alert all your emergency contacts with your live location.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* SOS Button Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            <div className="relative flex items-center justify-center mb-8">
              {/* Outer pulse rings — only when active */}
              {phase === 'active' && (
                <>
                  <div className="absolute w-72 h-72 rounded-full border-2 border-crimson/20 animate-ping" style={{ animationDuration: '2s' }} />
                  <div className="absolute w-60 h-60 rounded-full border-2 border-crimson/30 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.4s' }} />
                </>
              )}

              {/* Progress ring */}
              <svg className="absolute w-56 h-56 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(185,28,28,0.1)" strokeWidth="3" />
                {phase === 'holding' && (
                  <circle
                    cx="50" cy="50" r="46" fill="none"
                    stroke="#B91C1C"
                    strokeWidth="3"
                    strokeDasharray={`${2 * Math.PI * 46}`}
                    strokeDashoffset={`${2 * Math.PI * 46 * (1 - holdProgress / 100)}`}
                    strokeLinecap="round"
                    className="transition-all duration-75"
                  />
                )}
                {phase === 'active' && (
                  <circle cx="50" cy="50" r="46" fill="none" stroke="#B91C1C" strokeWidth="3"
                    strokeDasharray={`${2 * Math.PI * 46}`} strokeDashoffset="0" strokeLinecap="round" />
                )}
              </svg>

              {/* Main SOS button */}
              <motion.button
                onMouseDown={startHold}
                onMouseUp={cancelHold}
                onMouseLeave={cancelHold}
                onTouchStart={startHold}
                onTouchEnd={cancelHold}
                disabled={phase === 'cancelled'}
                whileTap={{ scale: 0.95 }}
                className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center select-none transition-all duration-300 ${
                  phase === 'active'
                    ? 'bg-sos-gradient shadow-glow-red sos-btn cursor-default'
                    : phase === 'holding'
                    ? 'bg-crimson shadow-glow-red cursor-pointer'
                    : 'bg-crimson hover:bg-crimson-light shadow-[0_8px_32px_rgba(185,28,28,0.35)] cursor-pointer'
                }`}
              >
                <Siren className={`w-14 h-14 text-white mb-2 ${phase === 'active' ? 'animate-pulse' : ''}`} />
                <span className="text-white font-black text-xl tracking-widest">SOS</span>
                <span className="text-white/70 text-xs mt-1 font-medium">
                  {phase === 'idle' && 'Hold 3s'}
                  {phase === 'holding' && `${Math.round(holdProgress)}%`}
                  {phase === 'active' && 'ACTIVE'}
                  {phase === 'cancelled' && 'Cancelled'}
                </span>
              </motion.button>
            </div>

            {/* Cancel button */}
            <AnimatePresence>
              {phase === 'active' && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={cancelSOS}
                  className="flex items-center gap-2 text-slate hover:text-crimson border border-slate-200 hover:border-crimson px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
                >
                  <X className="w-4 h-4" /> Cancel SOS
                </motion.button>
              )}
              {phase === 'cancelled' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-slate text-sm font-medium"
                >
                  <CheckCircle className="w-4 h-4 text-sage" /> SOS cancelled — you're safe
                </motion.div>
              )}
              {phase === 'idle' && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-light text-xs text-center max-w-xs">
                  Press and hold the button for 3 seconds to send an emergency alert
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Status Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {/* Alert status card */}
            <div className={`rounded-2xl p-6 border-2 transition-all duration-500 ${
              phase === 'active'
                ? 'bg-crimson/5 border-crimson/30'
                : 'bg-surface border-transparent'
            }`}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${phase === 'active' ? 'bg-crimson' : 'bg-slate/10'}`}>
                  <AlertTriangle className={`w-5 h-5 ${phase === 'active' ? 'text-white' : 'text-slate'}`} />
                </div>
                <div>
                  <p className="font-bold text-safety-blue">Alert Status</p>
                  <p className={`text-sm font-semibold ${phase === 'active' ? 'text-crimson' : 'text-slate-light'}`}>
                    {phase === 'active' ? '🔴 SOS ACTIVE — Broadcasting' : phase === 'holding' ? '⏳ Activating...' : '🟢 Standby'}
                  </p>
                </div>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {steps.map(({ icon: Icon, label, color }, i) => (
                  <motion.div
                    key={label}
                    animate={activeStep >= i ? { opacity: 1, x: 0 } : { opacity: 0.3, x: -4 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      activeStep >= i ? 'bg-safety-blue' : 'bg-slate/10'
                    }`}>
                      <Icon className={`w-4 h-4 ${activeStep >= i ? 'text-white' : 'text-slate-light'}`} />
                    </div>
                    <span className={`text-sm font-medium ${activeStep >= i ? 'text-safety-blue' : 'text-slate-light'}`}>
                      {label}
                    </span>
                    {activeStep >= i && (
                      <CheckCircle className="w-4 h-4 text-sage ml-auto" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Audio recording toggle */}
            <div className="bg-surface rounded-2xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${recording ? 'bg-crimson' : 'bg-slate/10'}`}>
                  {recording ? <Mic className="w-5 h-5 text-white" /> : <MicOff className="w-5 h-5 text-slate" />}
                </div>
                <div>
                  <p className="font-semibold text-safety-blue text-sm">Audio Evidence</p>
                  <p className="text-slate-light text-xs">Record surroundings during SOS</p>
                </div>
              </div>
              <button
                onClick={() => setRecording(!recording)}
                className={`relative w-12 h-6 rounded-full transition-colors ${recording ? 'bg-crimson' : 'bg-slate/20'}`}
              >
                <motion.div
                  animate={{ x: recording ? 24 : 2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                />
              </button>
            </div>

            {/* Location card */}
            <div className="bg-surface rounded-2xl p-5 flex items-center gap-3">
              <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-sage" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-safety-blue text-sm">Live Location</p>
                <p className="text-slate-light text-xs">GPS coordinates shared with contacts</p>
              </div>
              <span className="flex items-center gap-1 text-xs font-semibold text-sage bg-sage-pale px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-sage rounded-full animate-pulse" />
                Active
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
