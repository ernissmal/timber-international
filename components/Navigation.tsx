'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#oak-slabs', label: 'Oak Slabs' },
  { href: '#warehouse', label: 'Warehouse' },
  { href: '#products', label: 'Products' },
  { href: '#manufacturing', label: 'Manufacturing' },
  { href: '#sustainability', label: 'Sustainability' },
  { href: '#contact', label: 'Contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isClient, setIsClient] = useState(false)
  const activeSectionRef = useRef('hero')

  // Handle initial hash scroll after hydration
  useEffect(() => {
    setIsClient(true)

    // Check for hash in URL on load
    const hash = window.location.hash
    if (hash) {
      // Small delay to ensure sections are mounted
      setTimeout(() => {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
          setActiveSection(hash.slice(1))
        }
      }, 100)
    }
  }, [])

  // Scroll spy using IntersectionObserver
  useEffect(() => {
    if (!isClient) return

    const setupObserver = () => {
      const sectionIds = navLinks.map(link => link.href.slice(1))
      const sections = sectionIds
        .map(id => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null)

      // Retry if sections not mounted yet
      if (sections.length === 0) {
        requestAnimationFrame(setupObserver)
        return
      }

      const observer = new IntersectionObserver(
        (entries) => {
          // Process only intersecting entries, prioritize by ratio
          const intersecting = entries
            .filter(e => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

          if (intersecting.length > 0) {
            const newSection = intersecting[0].target.id
            // Only update if changed (prevents rapid re-renders)
            if (newSection !== activeSectionRef.current) {
              activeSectionRef.current = newSection
              setActiveSection(newSection)
              window.history.replaceState(null, '', `#${newSection}`)
            }
          }
        },
        {
          rootMargin: '-50% 0px -50% 0px',
          threshold: 0
        }
      )

      sections.forEach((section) => observer.observe(section))
      return () => observer.disconnect()
    }

    const cleanup = setupObserver()
    return cleanup
  }, [isClient])

  // Handle navigation click
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Close mobile menu immediately
    setIsOpen(false)

    // Update active section immediately for responsiveness
    setActiveSection(href.slice(1))
  }, [])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Skip Navigation Link */}
      <a href="#hero" className="skip-nav">
        Skip to main content
      </a>

      <nav
        className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-moooi-sand"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <a
              href="#hero"
              className="text-2xl font-display font-bold text-moooi-charcoal hover:text-moooi-gold transition-colors"
              onClick={(e) => handleNavClick(e, '#hero')}
            >
              Timber International
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    activeSection === link.href.slice(1)
                      ? 'text-moooi-gold'
                      : 'text-moooi-charcoal hover:text-moooi-gold'
                  }`}
                  aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-moooi-charcoal hover:text-moooi-gold transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div
              id="mobile-menu"
              className="md:hidden py-4 border-t border-moooi-sand"
              role="menu"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`block py-3 text-lg transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-moooi-gold font-medium'
                      : 'text-moooi-charcoal hover:text-moooi-gold'
                  }`}
                  role="menuitem"
                  aria-current={activeSection === link.href.slice(1) ? 'page' : undefined}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu backdrop */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  )
}
