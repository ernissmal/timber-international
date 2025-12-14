'use client'

import { useState } from 'react'

const CONTACT_EMAIL = 'hello@twg.com' // Update with actual email

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )

    // Open email client
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

    // Reset form
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 border border-moooi-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-moooi-gold"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 border border-moooi-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-moooi-gold"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-medium mb-2">
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 border border-moooi-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-moooi-gold resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-moooi-charcoal text-white px-8 py-4 rounded-full font-medium hover:bg-moooi-gold hover:text-moooi-charcoal transition-all duration-300 transform hover:scale-105"
      >
        Send Message
      </button>
    </form>
  )
}
