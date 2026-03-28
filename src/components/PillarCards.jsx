import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Radio, Scale, Heart, X, ChevronRight } from 'lucide-react'

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Personal Safety',
    color: 'from-safety-blue to-safety-blue-light',
    accent: 'bg-safety-blue/10 text-safety-blue',
    items: ['Self-defense techniques & tips', 'Safe route mapping & planning', 'Situational awareness training', 'Personal safety audit tools'],
    details: {
      intro: 'Personal safety starts with awareness and preparation. These tools and techniques help you stay protected in everyday situations.',
      sections: [
        { heading: 'Self-Defense Techniques', content: 'Learn basic self-defense moves: palm strike, wrist release, and how to create distance from an attacker. Take a local class or use online resources like RAD programs.' },
        { heading: 'Safe Route Mapping', content: "Always plan your route before traveling. Prefer well-lit, populated streets. Share your route with a trusted contact and use Guardian's Live Route Share to broadcast your location in real-time." },
        { heading: 'Situational Awareness', content: 'Stay off your phone in unfamiliar areas. Keep your head up, make eye contact, and trust your instincts. If something feels wrong, it probably is — act on it.' },
        { heading: 'Personal Safety Audit', content: 'Review your home locks, lighting, and entry points. Keep emergency numbers saved. Ensure your phone is charged before leaving. Tell someone where you are going.' },
      ],
    },
  },
  {
    icon: Radio,
    title: 'Emergency Alerts',
    color: 'from-crimson to-crimson-light',
    accent: 'bg-crimson/10 text-crimson',
    items: ['Real-time local crisis notifications', 'Weather & disaster warnings', 'Community safety alerts', 'Automated SOS broadcasting'],
    details: {
      intro: 'Stay ahead of danger with real-time alerts and automated emergency broadcasting tools built into Guardian.',
      sections: [
        { heading: 'Real-Time Crisis Notifications', content: 'Guardian monitors local emergency feeds and pushes instant alerts for active threats, police activity, fires, and civil emergencies in your area.' },
        { heading: 'Weather & Disaster Warnings', content: 'Receive severe weather alerts, flood warnings, and natural disaster notifications before they escalate. Guardian integrates with national weather services for up-to-the-minute data.' },
        { heading: 'Community Safety Alerts', content: 'Neighbors and local authorities can post verified safety alerts visible to all Guardian users in the area. Stay informed about what is happening around you.' },
        { heading: 'Automated SOS Broadcasting', content: 'With one tap, Guardian sends your GPS location, a pre-written distress message, and a live audio clip to all your emergency contacts simultaneously.' },
      ],
    },
  },
  {
    icon: Scale,
    title: 'Legal Support',
    color: 'from-slate to-slate-light',
    accent: 'bg-slate/10 text-slate',
    items: ['Know your rights guides', 'Incident documentation tools', 'Legal aid directory', 'Evidence preservation tips'],
    details: {
      intro: 'Knowledge is power. Understanding your legal rights and how to document incidents can make a critical difference in getting justice.',
      sections: [
        { heading: 'Know Your Rights', content: 'You have the right to remain silent. You have the right to an attorney. You can refuse a search without a warrant. Guardian provides jurisdiction-specific rights guides you can access offline.' },
        { heading: 'Incident Documentation', content: "Use Guardian's secure, timestamped documentation tool to record incidents with photos, audio, and written notes. All data is encrypted and stored safely for legal use." },
        { heading: 'Legal Aid Directory', content: "Find free or low-cost legal aid in your area. Guardian's directory includes domestic violence attorneys, civil rights lawyers, and victim advocacy organizations." },
        { heading: 'Evidence Preservation', content: 'Do not delete messages, photos, or voicemails. Screenshot and back up evidence immediately. Guardian can securely store evidence with metadata intact for court proceedings.' },
      ],
    },
  },
  {
    icon: Heart,
    title: 'Mental Recovery',
    color: 'from-sage to-sage-light',
    accent: 'bg-sage/10 text-sage',
    items: ['Trauma-informed support', 'Crisis counseling resources', 'Breathing & grounding exercises', 'Peer support community'],
    details: {
      intro: 'Healing after trauma takes time and support. Guardian connects you with resources and techniques to help you recover at your own pace.',
      sections: [
        { heading: 'Trauma-Informed Support', content: "Guardian's resources are developed with licensed trauma therapists and follow evidence-based approaches including EMDR and somatic therapy principles." },
        { heading: 'Crisis Counseling', content: 'Connect with a trained crisis counselor 24/7 via text or call. Crisis Text Line: Text HOME to 741741. National Crisis Hotline: 988. You do not have to face this alone.' },
        { heading: 'Breathing & Grounding', content: 'Try the 5-4-3-2-1 technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste. Box breathing (4 counts in, hold, out, hold) calms the nervous system fast.' },
        { heading: 'Peer Support Community', content: "Join Guardian's moderated peer support groups where survivors share experiences and coping strategies in a safe, anonymous environment. You are not alone in this." },
      ],
    },
  },
]

export default function PillarCards() {
  const [active, setActive] = useState(null)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 bg-safety-blue/10 text-safety-blue text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            Core Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-safety-blue mt-1">Health & Safety Pillars</h2>
          <p className="text-slate mt-3 max-w-xl mx-auto">Comprehensive protection across every dimension of your safety and wellbeing.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(({ icon: Icon, title, color, accent, items }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group bg-white rounded-2xl shadow-card hover:shadow-card-lg transition-all duration-300 overflow-hidden cursor-pointer border border-slate-100"
            >
              <div className={`h-1.5 bg-gradient-to-r ${color}`} />
              <div className="p-6">
                <div className={`w-12 h-12 rounded-xl ${accent} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-safety-blue font-black text-lg mb-4">{title}</h3>
                <ul className="space-y-2 mb-6">
                  {items.map(item => (
                    <li key={item} className="flex items-start gap-2 text-slate text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current flex-shrink-0 opacity-40" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => setActive(pillars[i])}
                  className={`w-full py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r ${color} text-white flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-[1.02]`}
                >
                  Explore <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 30 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className={`h-2 bg-gradient-to-r ${active.color} rounded-t-3xl`} />
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${active.accent} flex items-center justify-center flex-shrink-0`}>
                      <active.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-safety-blue">{active.title}</h3>
                      <p className="text-slate text-sm mt-0.5">{active.details.intro}</p>
                    </div>
                  </div>
                  <button onClick={() => setActive(null)} className="text-slate-light hover:text-safety-blue transition-colors ml-4 flex-shrink-0 p-1">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {active.details.sections.map(({ heading, content }) => (
                    <div key={heading} className="bg-surface rounded-2xl p-5">
                      <h4 className="font-bold text-safety-blue mb-2 flex items-center gap-2 text-sm">
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${active.color} inline-block flex-shrink-0`} />
                        {heading}
                      </h4>
                      <p className="text-slate text-sm leading-relaxed">{content}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActive(null)}
                  className={`mt-6 w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r ${active.color} hover:opacity-90 transition-opacity`}
                >
                  Got it
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
