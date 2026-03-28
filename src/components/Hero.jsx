import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Users, Clock, Zap, ArrowRight, MapPin } from 'lucide-react'

const stats = [
  { icon: Users,  value: '10k+', label: 'Protected',  color: 'text-sage-light' },
  { icon: Clock,  value: '24/7', label: 'Monitoring', color: 'text-blue-300' },
  { icon: Zap,    value: '<3s',  label: 'Response',   color: 'text-yellow-300' },
  { icon: MapPin, value: '50+',  label: 'Cities',     color: 'text-purple-300' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero({ onSOS }) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient">

      {/* Animated background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-safety-blue-mid rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.16, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-sage rounded-full blur-3xl"
        />
        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <div>
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-semibold text-white/90 mb-8">
              <span className="w-2 h-2 bg-sage-light rounded-full animate-pulse" />
              AI-Powered Safety Platform — Live
            </motion.div>

            <motion.h1 {...fadeUp(0.1)} className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6">
              Your Safety,<br />
              <span className="text-gradient">Our Priority.</span>
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="text-lg text-white/70 max-w-lg mb-10 leading-relaxed">
              Empowering your peace of mind with real-time AI protection, instant SOS alerts, and 24/7 emergency support — all in one platform.
            </motion.p>

            <motion.div {...fadeUp(0.3)} className="flex flex-col sm:flex-row gap-4 mb-14">
              <button
                onClick={onSOS}
                className="group flex items-center justify-center gap-2 bg-crimson hover:bg-crimson-light text-white px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 active:scale-95 shadow-glow-red"
              >
                Activate Guardian Mode
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => document.getElementById('knowledge')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 glass hover:bg-white/15 text-white px-8 py-4 rounded-2xl font-bold text-base transition-all hover:scale-105 active:scale-95"
              >
                Safety Resources
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div {...fadeUp(0.4)} className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map(({ icon: Icon, value, label, color }) => (
                <div key={label} className="glass rounded-2xl p-4 text-center">
                  <Icon className={`w-5 h-5 ${color} mx-auto mb-2`} />
                  <p className="text-white font-black text-xl">{value}</p>
                  <p className="text-white/50 text-xs font-medium">{label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Shield visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-full border border-white/10 ping-slow" />
              <div className="absolute inset-8 rounded-full border border-white/10" style={{ animation: 'ping 3s cubic-bezier(0,0,0.2,1) infinite 0.6s' }} />
              <div className="absolute inset-16 rounded-full border border-white/15" style={{ animation: 'ping 3s cubic-bezier(0,0,0.2,1) infinite 1.2s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="float-anim w-48 h-48 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 flex items-center justify-center shadow-glow-blue">
                  <ShieldCheck className="w-24 h-24 text-white/90" strokeWidth={1.5} />
                </div>
              </div>
              {[0,60,120,180,240,300].map((deg, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: ['#22C55E','#60A5FA','#F59E0B','#EF4444','#A78BFA','#34D399'][i],
                    top: `${50 - 46 * Math.cos((deg * Math.PI) / 180)}%`,
                    left: `${50 + 46 * Math.sin((deg * Math.PI) / 180)}%`,
                  }}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#F8FAFC"/>
        </svg>
      </div>
    </section>
  )
}
