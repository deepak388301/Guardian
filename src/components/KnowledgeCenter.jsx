import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Siren, Plus, Home } from 'lucide-react'

const tabs = [
  {
    id: 'sos',
    label: 'SOS Protocols',
    icon: Siren,
    content: [
      { step: '1', title: 'Stay Calm', desc: 'Take a breath. Panic reduces your ability to think clearly. Assess your immediate surroundings.' },
      { step: '2', title: 'Call for Help', desc: 'Dial 911 or your local emergency number. If you can\'t speak, text 911 in supported areas.' },
      { step: '3', title: 'Share Location', desc: 'Use Guardian\'s one-tap location share to alert your emergency contacts simultaneously.' },
      { step: '4', title: 'Stay Visible', desc: 'Move to a well-lit, populated area if safe to do so. Make noise to attract attention.' },
    ],
  },
  {
    id: 'firstaid',
    label: 'First Aid Basics',
    icon: Plus,
    content: [
      { step: '1', title: 'Check for Danger', desc: 'Ensure the scene is safe before approaching. Your safety comes first.' },
      { step: '2', title: 'Call Emergency Services', desc: 'Dial 911 immediately for serious injuries. Don\'t assume someone else has called.' },
      { step: '3', title: 'Control Bleeding', desc: 'Apply firm, direct pressure with a clean cloth. Do not remove the cloth if it soaks through — add more.' },
      { step: '4', title: 'CPR if Needed', desc: 'If the person is unresponsive and not breathing normally, begin CPR: 30 chest compressions, 2 rescue breaths.' },
    ],
  },
  {
    id: 'domestic',
    label: 'Domestic Support',
    icon: Home,
    content: [
      { step: '1', title: 'You Are Not Alone', desc: 'Domestic abuse affects millions. Reaching out is a sign of strength, not weakness.' },
      { step: '2', title: 'Create a Safety Plan', desc: 'Identify safe exits, keep important documents accessible, and establish a code word with trusted contacts.' },
      { step: '3', title: 'Contact a Hotline', desc: 'National DV Hotline: 1-800-799-7233. Available 24/7 via call, text, or online chat.' },
      { step: '4', title: 'Document Everything', desc: 'Use Guardian\'s secure documentation tool to record incidents with timestamps for legal purposes.' },
    ],
  },
]

export default function KnowledgeCenter() {
  const [activeTab, setActiveTab] = useState('sos')
  const active = tabs.find(t => t.id === activeTab)

  return (
    <section id="knowledge" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-sage font-semibold text-sm uppercase tracking-widest">Knowledge Center</span>
          <h2 className="text-3xl sm:text-4xl font-black text-safety-blue mt-2">Safety Resources</h2>
          <p className="text-slate mt-3 max-w-xl mx-auto">Practical, actionable guidance for every situation.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-2 bg-cream rounded-2xl p-2 mb-8">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all ${
                activeTab === id
                  ? 'bg-safety-blue text-white shadow-md'
                  : 'text-slate hover:text-safety-blue hover:bg-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {active.content.map(({ step, title, desc }) => (
              <div key={step} className="bg-cream rounded-2xl p-6 flex gap-4">
                <div className="w-10 h-10 bg-safety-blue text-white rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0">
                  {step}
                </div>
                <div>
                  <h4 className="font-bold text-safety-blue mb-1">{title}</h4>
                  <p className="text-slate text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
