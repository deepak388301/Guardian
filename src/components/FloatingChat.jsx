import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User } from 'lucide-react'

const quickReplies = ['I feel unsafe', 'Send my location', 'Call for help']

const getQuickResponse = async (msg) => {
  await new Promise(r => setTimeout(r, 800))
  const lower = msg.toLowerCase()
  if (lower.includes('unsafe') || lower.includes('help')) return "I hear you. You're not alone. Do you want me to alert your emergency contacts right now? Tap 'Send my location' to share where you are."
  if (lower.includes('location')) return "Your location has been shared with your emergency contacts. Stay where you are if it's safe. Help is on the way."
  return "I'm here. Tell me what's happening and I'll guide you through it step by step."
}

export default function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Quick Help is here. What do you need?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)
    const res = await getQuickResponse(msg)
    setMessages(prev => [...prev, { role: 'assistant', content: res }])
    setLoading(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
          >
            {/* Header */}
            <div className="bg-safety-blue px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-sage rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Quick Help</p>
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-sage-light rounded-full animate-pulse" />
                    <span className="text-white/60 text-xs">Always on</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-52 overflow-y-auto p-4 space-y-3 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-safety-blue' : 'bg-sage'}`}>
                    {msg.role === 'user' ? <User className="w-3 h-3 text-white" /> : <Bot className="w-3 h-3 text-white" />}
                  </div>
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed ${msg.role === 'user' ? 'bg-safety-blue text-white rounded-tr-sm' : 'bg-cream text-slate rounded-tl-sm'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-sage flex items-center justify-center">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  <div className="bg-cream px-3 py-2 rounded-xl flex items-center gap-1">
                    {[0,1,2].map(i => (
                      <motion.span key={i} className="w-1.5 h-1.5 bg-slate-light rounded-full"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.12 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto scrollbar-hide">
              {quickReplies.map(r => (
                <button key={r} onClick={() => send(r)}
                  className="flex-shrink-0 text-xs bg-cream hover:bg-crimson hover:text-white text-slate px-2.5 py-1 rounded-full transition-colors border border-gray-200">
                  {r}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 pt-2">
              <div className="flex gap-2 bg-cream rounded-lg p-1.5">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Type here..."
                  className="flex-1 bg-transparent text-xs text-safety-blue placeholder-slate-light outline-none px-2"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 bg-safety-blue hover:bg-safety-blue-light disabled:opacity-40 text-white rounded-md flex items-center justify-center transition-all"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-safety-blue hover:bg-safety-blue-light text-white rounded-full shadow-lg shadow-safety-blue/40 flex items-center justify-center transition-colors relative"
        aria-label="Open quick help chat"
      >
        <AnimatePresence mode="wait">
          {open
            ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><X className="w-6 h-6" /></motion.div>
            : <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}><MessageCircle className="w-6 h-6" /></motion.div>
          }
        </AnimatePresence>
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-crimson rounded-full border-2 border-white animate-pulse" />
        )}
      </motion.button>
    </div>
  )
}
