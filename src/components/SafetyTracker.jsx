import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Navigation, AlertTriangle, CheckCircle, Timer, RefreshCw } from 'lucide-react'

const statuses = [
  { id: 'home', label: 'Home Safe', icon: Home, bg: 'bg-sage', ring: 'ring-sage', glow: 'shadow-glow-green' },
  { id: 'transit', label: 'In Transit', icon: Navigation, bg: 'bg-safety-blue-mid', ring: 'ring-safety-blue-mid', glow: 'shadow-glow-blue' },
  { id: 'help', label: 'Need Assistance', icon: AlertTriangle, bg: 'bg-crimson', ring: 'ring-crimson', glow: 'shadow-glow-red' },
]

const TIMER_DURATION = 30 * 60

export default function SafetyTracker() {
  const [selected, setSelected] = useState(null)
  const [checkedIn, setCheckedIn] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION)
  const [timerActive, setTimerActive] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!timerActive) return
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(intervalRef.current); setTimerActive(false); return 0 }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [timerActive])

  const handleCheckIn = () => {
    if (!selected) return
    setCheckedIn(true)
    setTimerActive(true)
    setTimeLeft(TIMER_DURATION)
  }

  const handleReset = () => {
    setCheckedIn(false)
    setTimerActive(false)
    setSelected(null)
    setTimeLeft(TIMER_DURATION)
    clearInterval(intervalRef.current)
  }

  const progress = ((TIMER_DURATION - timeLeft) / TIMER_DURATION) * 100
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const secs = String(timeLeft % 60).padStart(2, '0')
  const strokeColor = selected === 'help' ? '#B91C1C' : selected === 'transit' ? '#1D4ED8' : '#16A34A'

  return (
    <section id="tracker" className="py-20 bg-white relative">
      <div className="section-divider absolute top-0 left-0 right-0" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 bg-sage/10 text-sage px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            <Timer className="w-4 h-4" /> Daily Check-In
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-safety-blue">Safety Check-In</h2>
          <p className="text-slate mt-3 max-w-xl mx-auto">Let your network know you're safe. Set a timer — we'll alert your contacts if you don't respond.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!checkedIn ? (
            <motion.div key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {statuses.map(({ id, label, icon: Icon, bg, ring, glow }) => (
                  <motion.button
                    key={id}
                    onClick={() => setSelected(id)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                      selected === id
                        ? `border-transparent ring-4 ${ring} ${bg} ${glow} text-white`
                        : 'border-slate-100 bg-surface hover:border-slate-200 hover:shadow-card'
                    }`}
                  >
                    <Icon className={`w-8 h-8 mx-auto mb-3 ${selected === id ? 'text-white' : 'text-slate'}`} />
                    <p className={`font-bold text-sm ${selected === id ? 'text-white' : 'text-safety-blue'}`}>{label}</p>
                  </motion.button>
                ))}
              </div>
              <div className="text-center">
                <motion.button
                  onClick={handleCheckIn}
                  disabled={!selected}
                  whileHover={selected ? { scale: 1.03 } : {}}
                  whileTap={selected ? { scale: 0.97 } : {}}
                  className="bg-hero-gradient disabled:opacity-40 disabled:cursor-not-allowed text-white px-12 py-4 rounded-2xl font-bold text-base transition-all shadow-glow-blue"
                >
                  Start Check-In Timer
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="active"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-surface rounded-3xl p-8 text-center shadow-card"
            >
              <div className="flex items-center justify-center gap-2 mb-8">
                <CheckCircle className="w-5 h-5 text-sage" />
                <span className="text-sage font-bold">{statuses.find(s => s.id === selected)?.label} — Logged</span>
              </div>

              <div className="relative w-44 h-44 mx-auto mb-8">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="44" fill="none" stroke="#E2E8F0" strokeWidth="6" />
                  <circle cx="50" cy="50" r="44" fill="none" stroke={strokeColor} strokeWidth="6"
                    strokeDasharray={`${2 * Math.PI * 44}`}
                    strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
                    strokeLinecap="round" className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Timer className="w-5 h-5 text-slate mb-1" />
                  <span className="text-3xl font-black text-safety-blue">{mins}:{secs}</span>
                  <span className="text-xs text-slate-light font-medium">remaining</span>
                </div>
              </div>

              <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6 overflow-hidden">
                <motion.div className="h-1.5 rounded-full bg-gradient-to-r from-sage to-safety-blue-mid" style={{ width: `${progress}%` }} />
              </div>

              <p className="text-slate text-sm mb-6">Contacts will be alerted if you don't check in before the timer ends.</p>
              <button onClick={handleReset} className="flex items-center gap-2 text-slate-light hover:text-crimson text-sm font-medium transition-colors mx-auto">
                <RefreshCw className="w-4 h-4" /> Cancel Check-In
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
