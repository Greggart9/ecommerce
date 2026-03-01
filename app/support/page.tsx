'use client'

import React, { useState } from 'react'
import Button from '../component/button1'
import FAQs from '../component/faqs'
import Footer from '../component/footer'
import { motion } from 'framer-motion'
import { CheckCircle2Icon } from 'lucide-react'
import { Metadata } from 'next'



const SupportPage = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'General inquiry',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (res.ok) {
        setSuccess(true)
        setForm({ name: '', phone: '', email: '', subject: 'General inquiry', message: '' })
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 md:px-10 w-full pt-24">
      {/* FORM */}
      <motion.section
        initial={{ y: 30, filter: 'blur(10px)', opacity: 0 }}
        whileInView={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeIn' }}
        className="w-full max-w-360 py-10 md:py-16"
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          {/* LEFT */}
          <div className="space-y-6">
            <button className="px-4 py-2 bg-gray-200 rounded-full">Support</button>

            <h1 className="font-serif text-5xl/14 text-neutral-900 sm:min-w-md">
              Answers &amp; <br className="block md:hidden" />Limitless
              <span className="text-neutral-500"> Support</span>
            </h1>

            <ul className="space-y-4 text-neutral-600">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-neutral-900">✓</span>
                <span>Easy-to-understand help without any confusion.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-neutral-900">✓</span>
                <span>Access support anytime with 24/7 availability and quick responses.</span>
              </li>
            </ul>

            <Button variant="secondary">Our FAQs</Button>

            <div className="overflow-hidden rounded-lg border bg-neutral-100">
              <motion.img
                src="/assets/asset35.png"
                alt="Support visual"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 1, ease: 'easeIn' }}
                className="h-58 w-full object-cover"
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="rounded-lg border bg-neutral-100 p-6 md:p-8 shadow-sm">
            <div className="space-y-1">
              <h2 className="text-2xl font-serif font-semibold text-black">
                Drop Us a Line
              </h2>
              <p className="text-base text-neutral-500">
                We&apos;re here and ready to listen!
              </p>
            </div>

            {/* Success message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-lg bg-green-50 border border-green-200 px-4 py-4 text-sm text-black"
              >
                <CheckCircle2Icon className="inline mr-2 w-4 h-4" /> Message sent! We'll get back to you within 24–48 hours.
              </motion.div>
            )}

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-lg bg-red-50 border border-red-200 px-4 py-4 text-sm text-red-600"
              >
                ❌ {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              <div className="space-y-2">
                <label className="text-base font-medium text-black">Request</label>
                <select
                  name='subject'
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-black bg-neutral-50"
                >
                  <option>Product return</option>
                  <option>Order status</option>
                  <option>General inquiry</option>
                </select>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-base font-medium text-black">Full name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full rounded-lg border px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-black bg-neutral-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-base font-medium text-black">Phone number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+0 000 000 00"
                    className="w-full rounded-lg border px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-black bg-neutral-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-base font-medium text-black">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className="w-full rounded-lg border px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-black bg-neutral-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-base font-medium text-black">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Your message!"
                  required
                  className="w-full rounded-lg border px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-black bg-neutral-50 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg cursor-pointer bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Submit →'}
              </button>
            </form>
          </div>
        </div>
      </motion.section>

      {/* FAQS */}
      <section className="mt-15 md:mt-35">
        <FAQs />
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  )
}

export default SupportPage