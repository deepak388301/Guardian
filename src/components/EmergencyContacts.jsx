import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Plus, Trash2, UserCircle, ShieldAlert, CheckCircle, Edit2, X } from 'lucide-react'
import { useContacts } from '../App'

const HOTLINES = [
  { name: 'Emergency Services',      number: '911',            desc: 'Police, Fire, Ambulance',    color: 'bg-crimson',       tel: '911' },
  { name: 'Crisis Text Line',        number: 'Text 741741',    desc: 'Mental health crisis',        color: 'bg-safety-blue',   tel: null },
  { name: 'National Crisis Hotline', number: '988',            desc: 'Suicide & crisis lifeline',   color: 'bg-sage',          tel: '988' },
  { name: 'DV Hotline',              number: '1-800-799-7233', desc: '24/7 domestic violence',      color: 'bg-slate',         tel: '18007997233' },
]

const RELATION_COLORS = {
  Family:  'bg-safety-blue/10 text-safety-blue',
  Friend:  'bg-sage/10 text-sage',
  Partner: 'bg-purple-100 text-purple-600',
  Work:    'bg-yellow-100 text-yellow-700',
  Other:   'bg-slate/10 text-slate',
}

const relColor = (r) => RELATION_COLORS[r] || RELATION_COLORS.Other

export default function EmergencyContacts() {
  const { contacts, setContacts } = useContacts()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', relation: 'Family' })
  const [saved, setSaved] = useState(false)
  const [editId, setEditId] = useState(null)

  const openAdd = () => { setForm({ name: '', phone: '', relation: 'Family' }); setEditId(null); setShowForm(true) }
  const openEdit = (c) => { setForm({ name: c.name, phone: c.phone, relation: c.relation }); setEditId(c.id); setShowForm(true) }

  const saveContact = () => {
    if (!form.name.trim() || !form.phone.trim()) return
    if (editId) {
      setContacts(prev => prev.map(c => c.id === editId ? { ...c, ...form } : c))
    } else {
      setContacts(prev => [...prev, { id: Date.now(), ...form }])
    }
    setShowForm(false)
    setEditId(null)
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const removeContact = (id) => setContacts(prev => prev.filter(c => c.id !== id))

  return (
    <section id="emergency-contacts" className="py-20 bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-1.5 bg-crimson/10 text-crimson text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            <ShieldAlert className="w-3.5 h-3.5" /> Always Ready
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-safety-blue mt-1">Emergency Contacts</h2>
          <p className="text-slate mt-3 max-w-xl mx-auto">Trusted people who get notified instantly when you trigger SOS — with your location and a distress message.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ── My Contacts (3 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 bg-white rounded-3xl shadow-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-safety-blue text-lg flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-safety-blue" />
                My Contacts
                <span className="ml-1 bg-safety-blue text-white text-xs font-bold px-2 py-0.5 rounded-full">{contacts.length}</span>
              </h3>
              <button
                onClick={openAdd}
                className="flex items-center gap-1.5 bg-safety-blue hover:bg-safety-blue-light text-white px-4 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 active:scale-95 shadow-glow-blue"
              >
                <Plus className="w-4 h-4" /> Add Contact
              </button>
            </div>

            {/* Form */}
            <AnimatePresence>
              {showForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mb-5"
                >
                  <div className="bg-surface rounded-2xl p-5 border border-slate-200 space-y-3">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-safety-blue text-sm">{editId ? 'Edit Contact' : 'New Contact'}</p>
                      <button onClick={() => setShowForm(false)} className="text-slate-light hover:text-slate">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      placeholder="Full name *"
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      className="w-full bg-white rounded-xl px-4 py-2.5 text-sm text-safety-blue placeholder-slate-light outline-none border border-slate-200 focus:border-safety-blue transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone number *"
                      value={form.phone}
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      className="w-full bg-white rounded-xl px-4 py-2.5 text-sm text-safety-blue placeholder-slate-light outline-none border border-slate-200 focus:border-safety-blue transition-colors"
                    />
                    <select
                      value={form.relation}
                      onChange={e => setForm(f => ({ ...f, relation: e.target.value }))}
                      className="w-full bg-white rounded-xl px-4 py-2.5 text-sm text-safety-blue outline-none border border-slate-200 focus:border-safety-blue transition-colors"
                    >
                      {['Family','Friend','Partner','Work','Other'].map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={saveContact}
                        disabled={!form.name.trim() || !form.phone.trim()}
                        className="flex-1 bg-safety-blue disabled:opacity-40 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-safety-blue-light transition-colors"
                      >
                        {editId ? 'Save Changes' : 'Add Contact'}
                      </button>
                      <button onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl text-sm text-slate hover:bg-slate/10 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toast */}
            <AnimatePresence>
              {saved && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 bg-sage/10 text-sage border border-sage/30 rounded-xl px-4 py-2.5 mb-4 text-sm font-semibold"
                >
                  <CheckCircle className="w-4 h-4" /> Contact saved successfully
                </motion.div>
              )}
            </AnimatePresence>

            {/* List */}
            <div className="space-y-3">
              {contacts.length === 0 && (
                <div className="text-center py-10">
                  <UserCircle className="w-10 h-10 text-slate-light mx-auto mb-2" />
                  <p className="text-slate-light text-sm">No contacts yet. Add someone you trust.</p>
                </div>
              )}
              <AnimatePresence>
                {contacts.map(({ id, name, phone, relation }) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    className="flex items-center justify-between bg-surface rounded-2xl px-4 py-3 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-safety-blue rounded-full flex items-center justify-center shadow-sm">
                        <span className="text-white font-black text-sm">{name[0].toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-bold text-safety-blue text-sm">{name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-slate-light text-xs">{phone}</p>
                          {relation && (
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${relColor(relation)}`}>{relation}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={`tel:${phone.replace(/\D/g,'')}`}
                        className="w-8 h-8 bg-sage/10 hover:bg-sage/20 rounded-lg flex items-center justify-center transition-colors"
                        title="Call">
                        <Phone className="w-3.5 h-3.5 text-sage" />
                      </a>
                      <button onClick={() => openEdit({ id, name, phone, relation })}
                        className="w-8 h-8 bg-safety-blue/10 hover:bg-safety-blue/20 rounded-lg flex items-center justify-center transition-colors"
                        title="Edit">
                        <Edit2 className="w-3.5 h-3.5 text-safety-blue" />
                      </button>
                      <button onClick={() => removeContact(id)}
                        className="w-8 h-8 bg-crimson/10 hover:bg-crimson/20 rounded-lg flex items-center justify-center transition-colors"
                        title="Remove">
                        <Trash2 className="w-3.5 h-3.5 text-crimson" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── Hotlines (2 cols) ── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            <h3 className="font-black text-safety-blue text-lg flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-crimson" /> Emergency Hotlines
            </h3>
            {HOTLINES.map(({ name, number, desc, color, tel }) => (
              <div key={name} className="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-card card-hover">
                <div className={`w-11 h-11 ${color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-safety-blue text-sm">{name}</p>
                  <p className="text-slate-light text-xs">{desc}</p>
                </div>
                {tel ? (
                  <a href={`tel:${tel}`} className="text-safety-blue font-black text-sm hover:text-crimson transition-colors flex-shrink-0 underline underline-offset-2">
                    {number}
                  </a>
                ) : (
                  <span className="text-safety-blue font-bold text-xs flex-shrink-0">{number}</span>
                )}
              </div>
            ))}

            {/* SOS reminder card */}
            <div className="bg-crimson rounded-2xl p-5 text-white mt-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <ShieldAlert className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-black text-sm mb-1">Immediate danger?</p>
                  <p className="text-white/80 text-xs leading-relaxed">
                    Call <strong className="text-white">911</strong> first. Then use Guardian's SOS button to alert all your personal contacts simultaneously with your GPS location.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
