import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Bot, User, Loader } from 'lucide-react'

const SUGGESTIONS = [
  'Someone is following me, what should I do?',
  'Generate an emergency message for my contacts',
  'Assess my current situation risk level',
  'What are safe routes in my area?',
]

// Simulated AI responses (replace with real API call to AWS Bedrock / Gemini)
const getAIResponse = async (message) => {
  await new Promise(r => setTimeout(r, 1200 + Math.random() * 800))
  const lower = message.toLowerCase()
  if (lower.includes('following')) {
    return `If you believe someone is following you:\n\n1. **Stay in public** — move toward busy, well-lit areas immediately.\n2. **Don't go home** — you don't want them to know where you live.\n3. **Enter a safe space** — a store, restaurant, or police station.\n4. **Call someone** — stay on the phone with a trusted contact.\n5. **Call 911** if you feel in immediate danger.\n\nWould you like me to send an alert to your emergency contacts now?`
  }
  if (lower.includes('emergency message')) {
    return `Here's a ready-to-send emergency message:\n\n*"I need help. My current location is [LOCATION]. Please contact me immediately or call 911 on my behalf. This message was sent via Guardian Safety Platform at [TIME]."*\n\nShall I send this to your registered emergency contacts?`
  }
  if (lower.includes('risk') || lower.includes('assess')) {
    return `To assess your risk level, I need a bit more context:\n\n- **Where are you?** (indoor/outdoor, public/private)\n- **Are you alone?**\n- **Is there an immediate threat?**\n\nBased on your check-in status, your current risk level appears **LOW**. If anything changes, tap "Quick Alert" immediately.`
  }
  if (lower.includes('route') || lower.includes('safe')) {
    return `For safe route planning:\n\n1. Prefer **main roads** over shortcuts or alleys.\n2. Share your route with a trusted contact before traveling.\n3. Use Guardian's **Live Route Share** feature to broadcast your location in real-time.\n4. Avoid isolated areas, especially after dark.\n\nWould you like to activate Live Route Share now?`
  }
  return `I'm your Guardian AI Safety Advisor. I can help you with:\n\n- **Risk assessment** for your current situation\n- **Emergency message** generation\n- **Safety guidance** during a crisis\n- **Resource recommendations**\n\nWhat do you need help with right now?`
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-safety-blue' : 'bg-sage'}`}>
        {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
      </div>
      <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
        isUser ? 'bg-safety-blue text-white rounded-tr-sm' : 'bg-cream text-slate rounded-tl-sm'
      }`}>
        {msg.content}
      </div>
    </motion.div>
  )
}

export default function AIAdvisor() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello, I'm your Guardian AI Safety Advisor. I'm here 24/7 to help you stay safe. How can I assist you today?" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)
    const response = await getAIResponse(msg)
    setMessages(prev => [...prev, { role: 'assistant', content: response }])
    setLoading(false)
  }

  return (
    <section id="ai-advisor" className="py-20 bg-gradient-to-b from-cream to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-safety-blue-light font-semibold text-sm uppercase tracking-widest">AI-Powered</span>
          <h2 className="text-3xl sm:text-4xl font-black text-safety-blue mt-2">Guardian AI Advisor</h2>
          <p className="text-slate mt-3 max-w-xl mx-auto">Real-time safety guidance, risk assessment, and emergency support — powered by AI.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          {/* Chat header */}
          <div className="bg-safety-blue px-6 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-bold">Guardian AI</p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-sage-light rounded-full animate-pulse" />
                <span className="text-white/70 text-xs">Online — Ready to help</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-6 space-y-4 scrollbar-hide">
            {messages.map((msg, i) => <Message key={i} msg={msg} />)}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-sage flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-cream px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1">
                  {[0, 1, 2].map(i => (
                    <motion.span key={i} className="w-2 h-2 bg-slate-light rounded-full"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions */}
          <div className="px-6 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => send(s)}
                className="flex-shrink-0 text-xs bg-cream hover:bg-safety-blue hover:text-white text-slate px-3 py-1.5 rounded-full transition-colors border border-gray-200 hover:border-safety-blue">
                {s}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-6 pb-6">
            <div className="flex gap-3 bg-cream rounded-xl p-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Describe your situation or ask for help..."
                className="flex-1 bg-transparent text-sm text-safety-blue placeholder-slate-light outline-none px-2"
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                className="w-10 h-10 bg-safety-blue hover:bg-safety-blue-light disabled:opacity-40 text-white rounded-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              >
                {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
