---
title: 'Website SPA Restructure - MPA to Single Page Conversion'
slug: 'spa-restructure'
created: '2026-01-02'
status: 'ready-for-dev'
stepsCompleted: [1, 2, 3, 4]
tech_stack:
  - Next.js 16 (App Router)
  - React 19
  - TypeScript 5.5
  - Tailwind CSS 3.4
  - Sanity CMS
  - Framer Motion 11
  - Lucide React
files_to_modify:
  - components/Navigation.tsx
  - components/Footer.tsx
  - app/(frontend)/page.tsx
  - app/(frontend)/page-client.tsx
  - app/globals.css
  - lib/sanity.ts
  - sanity/lib/queries.ts
files_to_create:
  - components/sections/HeroSection.tsx
  - components/sections/AboutSection.tsx
  - components/sections/OakSlabsSection.tsx
  - components/sections/WarehouseSection.tsx
  - components/sections/ProductsSection.tsx
  - components/sections/ManufacturingSection.tsx
  - components/sections/SustainabilitySection.tsx
  - components/sections/ContactSection.tsx
files_to_delete:
  - app/(frontend)/about/page.tsx
  - app/(frontend)/products/page.tsx
  - app/(frontend)/manufacturing/page.tsx
  - app/(frontend)/sustainability/page.tsx
  - app/(frontend)/contact/page.tsx
code_patterns:
  - BlockRenderer switches on __typename to render block components
  - lib/sanity.ts transforms _type to __typename (e.g., hero → PageBlocksHero)
  - Framer Motion whileInView animations with staggered delays
  - Tailwind content-block content-wide py-32 for section styling
  - 'use client' directive for interactive components
  - getPageProps(slug) → PageClient → BlockRenderer pattern
test_patterns:
  - Manual browser testing for scroll behavior
  - Mobile responsive testing
  - Anchor link deep-linking verification
---

# Tech-Spec: Website SPA Restructure - MPA to Single Page Conversion

**Created:** 2026-01-02
**Status:** Review
**Epic:** EPIC-001 (28 points, 8 stories)

## Overview

### Problem Statement

The current MPA structure with 6 separate routes creates friction in the user journey. Client requires a seamless scroll experience with all content on a single page, plus two missing sections (Oak Slabs, Warehouse).

### Solution

Convert navigation to anchor-based links with scroll spy, consolidate all page content into section components on the main page, create new Oak Slabs and Warehouse sections, fetch all content via a single consolidated GROQ query, and remove deprecated page routes.

### Scope

**In Scope:**
- Navigation anchor conversion with scroll spy (IntersectionObserver)
- 8 section components (Hero, About, Oak Slabs, Warehouse, Products, Manufacturing, Sustainability, Contact)
- New Sanity page documents for Oak Slabs and Warehouse
- Single consolidated GROQ query fetching all sections
- Smooth scroll with 80px header offset
- Mobile menu anchor support with auto-close
- Deprecated route removal (5 page files)
- URL hash updates on scroll/navigation

**Out of Scope:**
- E-commerce functionality
- User authentication
- Multi-language support
- Blog/News section
- Lazy loading optimization (future enhancement)
- Back-to-top button (future enhancement)

---

## Context for Development

### Codebase Patterns

**Block Rendering Pipeline:**
```
Sanity CMS → GROQ Query → lib/sanity.ts (transform _type → __typename) → BlockRenderer → Block Components
```

**Current Navigation Structure (to be replaced):**
```typescript
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  // ... route-based links
]
```

**Target Navigation Structure:**
```typescript
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
```

**Animation Pattern (from FeaturesGridBlock):**
```typescript
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
```

**Section Styling Pattern:**
```typescript
<section id="section-name" className="scroll-mt-20">
  {/* content */}
</section>
```

### Files to Reference

| File | Purpose | Key Code |
| ---- | ------- | -------- |
| `components/Navigation.tsx` | Current nav (71 lines) | Route-based links, mobile menu state |
| `components/Footer.tsx` | Footer links (46 lines) | 4-column grid, route-based links |
| `components/blocks/BlockRenderer.tsx` | Block switch (60 lines) | `__typename` switching pattern |
| `components/blocks/FeaturesGridBlock.tsx` | Animation example (173 lines) | Framer Motion whileInView |
| `lib/sanity.ts` | Sanity fetching (163 lines) | `transformSanityBlocks()`, type mapping |
| `sanity/lib/queries.ts` | GROQ queries (106 lines) | `pageBySlugQuery` pattern |
| `app/globals.css` | Global styles (56 lines) | `scroll-behavior: smooth` already present |
| `components/Hero.tsx` | Hero component (57 lines) | Gradient background, CTA button |

### Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Content Source for New Sections | Create Sanity page documents | Consistent with existing content management pattern |
| Scroll Spy | Full IntersectionObserver implementation | Story 1 AC requires active section highlighting |
| Fetching Strategy | Single consolidated GROQ query | Reduces network requests, ensures atomic data load |
| Section Component Pattern | Wrapper with id + BlockRenderer | Reuses existing block system, minimal new code |
| Anchor Link Format | `#section-id` | Standard HTML anchors, browser native support |
| Scroll Offset | 80px (matches nav height h-20) | Prevents content hiding under sticky nav |

---

## Implementation Plan

### Task Execution Order

Tasks are ordered by dependency - complete each task fully before moving to the next.

---

### Phase 1: Infrastructure Setup

#### Task 1: Add Scroll Offset CSS
- **File:** `app/globals.css`
- **Action:** Add scroll-margin-top rule for sections
- **Code to add:**
  ```css
  /* Scroll offset for sticky header */
  section[id] {
    scroll-margin-top: 5rem; /* 80px = h-20 */
  }
  ```
- **Notes:** This ensures anchored sections don't hide behind the sticky nav

---

#### Task 2: Create Consolidated GROQ Query
- **File:** `sanity/lib/queries.ts`
- **Action:** Add new `allSectionsQuery` that fetches all page content in one request
- **Code to add:**
  ```typescript
  // Consolidated query for SPA - fetches all sections at once
  export const allSectionsQuery = groq`{
    "hero": *[_type == "page" && slug.current == "home"][0] {
      _id, title, "slug": slug.current,
      blocks[] { _type, _key, ..., backgroundImage { ..., asset-> }, image { ..., asset-> }, items[] { ..., image { ..., asset-> } } }
    },
    "about": *[_type == "page" && slug.current == "about"][0] {
      _id, title, "slug": slug.current,
      blocks[] { _type, _key, ..., backgroundImage { ..., asset-> }, image { ..., asset-> }, items[] { ..., image { ..., asset-> } } }
    },
    "oakSlabs": *[_type == "page" && slug.current == "oak-slabs"][0] {
      _id, title, "slug": slug.current,
      blocks[] { _type, _key, ..., backgroundImage { ..., asset-> }, image { ..., asset-> }, items[] { ..., image { ..., asset-> } } }
    },
    "warehouse": *[_type == "page" && slug.current == "warehouse"][0] {
      _id, title, "slug": slug.current,
      blocks[] { _type, _key, ..., backgroundImage { ..., asset-> }, image { ..., asset-> }, items[] { ..., image { ..., asset-> } } }
    },
    "products": *[_type == "page" && slug.current == "products"][0] {
      _id, title, "slug": slug.current,
      blocks[] { _type, _key, ..., backgroundImage { ..., asset-> }, image { ..., asset-> }, items[] { ..., image { ..., asset-> } } }
    },
    "manufacturing": *[_type == "page" && slug.current == "manufacturing"][0] {
      _id, title, "slug": slug.current,
      blocks[] { _type, _key, ..., backgroundImage { ..., asset-> }, image { ..., asset-> }, items[] { ..., image { ..., asset-> } } }
    },
    "sustainability": *[_type == "page" && slug.current == "sustainability"][0] {
      _id, title, "slug": slug.current,
      blocks[] { _type, _key, ..., backgroundImage { ..., asset-> }, image { ..., asset-> }, items[] { ..., image { ..., asset-> } } }
    },
    "contact": *[_type == "page" && slug.current == "contact"][0] {
      _id, title, "slug": slug.current,
      blocks[] { _type, _key, ..., backgroundImage { ..., asset-> }, image { ..., asset-> }, items[] { ..., image { ..., asset-> } } }
    }
  }`
  ```
- **Notes:** Each section is fetched by its slug, returns null if page doesn't exist yet

---

#### Task 3: Add Consolidated Fetch Function
- **File:** `lib/sanity.ts`
- **Action:** Add `getAllSections()` function that uses the consolidated query
- **Code to add:**
  ```typescript
  import { allSectionsQuery } from '@/sanity/lib/queries'

  export interface AllSectionsData {
    hero: SanityPage | null
    about: SanityPage | null
    oakSlabs: SanityPage | null
    warehouse: SanityPage | null
    products: SanityPage | null
    manufacturing: SanityPage | null
    sustainability: SanityPage | null
    contact: SanityPage | null
  }

  export async function getAllSections(): Promise<AllSectionsData> {
    try {
      const data = await client.fetch<AllSectionsData>(allSectionsQuery)

      // Transform blocks for each section
      return {
        hero: data.hero ? { ...data.hero, blocks: transformSanityBlocks(data.hero.blocks) } : null,
        about: data.about ? { ...data.about, blocks: transformSanityBlocks(data.about.blocks) } : null,
        oakSlabs: data.oakSlabs ? { ...data.oakSlabs, blocks: transformSanityBlocks(data.oakSlabs.blocks) } : null,
        warehouse: data.warehouse ? { ...data.warehouse, blocks: transformSanityBlocks(data.warehouse.blocks) } : null,
        products: data.products ? { ...data.products, blocks: transformSanityBlocks(data.products.blocks) } : null,
        manufacturing: data.manufacturing ? { ...data.manufacturing, blocks: transformSanityBlocks(data.manufacturing.blocks) } : null,
        sustainability: data.sustainability ? { ...data.sustainability, blocks: transformSanityBlocks(data.sustainability.blocks) } : null,
        contact: data.contact ? { ...data.contact, blocks: transformSanityBlocks(data.contact.blocks) } : null,
      }
    } catch (error) {
      console.error('Error fetching all sections:', error)
      return {
        hero: null, about: null, oakSlabs: null, warehouse: null,
        products: null, manufacturing: null, sustainability: null, contact: null
      }
    }
  }
  ```
- **Notes:** Each section can be null if the Sanity page doesn't exist yet

---

### Phase 2: Section Components

#### Task 4: Create Section Components Directory
- **Action:** Create `components/sections/` directory
- **Command:** `mkdir -p components/sections`

---

#### Task 5: Create HeroSection Component
- **File:** `components/sections/HeroSection.tsx`
- **Action:** Create wrapper component with id="hero"
- **Code:**
  ```typescript
  'use client'

  import { BlockRenderer } from '@/components/blocks'
  import Hero from '@/components/Hero'
  import type { SanityPage } from '@/lib/sanity'

  interface HeroSectionProps {
    data: SanityPage | null
  }

  export default function HeroSection({ data }: HeroSectionProps) {
    return (
      <section id="hero" className="scroll-mt-20">
        {data?.blocks && data.blocks.length > 0 ? (
          <BlockRenderer blocks={data.blocks} />
        ) : (
          <Hero
            heading="Industrial Timber Supply You Can Build Your Business On"
            subheading="Your supply chain doesn't have room for inconsistency. Precision-manufactured solid oak furniture components with documented quality standards."
            ctaText="Request a Quote"
            ctaLink="#contact"
          />
        )}
      </section>
    )
  }
  ```
- **Notes:** Fallback content if Sanity data is unavailable

---

#### Task 6: Create AboutSection Component
- **File:** `components/sections/AboutSection.tsx`
- **Action:** Create wrapper component with id="about"
- **Code:**
  ```typescript
  'use client'

  import { BlockRenderer } from '@/components/blocks'
  import type { SanityPage } from '@/lib/sanity'

  interface AboutSectionProps {
    data: SanityPage | null
  }

  export default function AboutSection({ data }: AboutSectionProps) {
    return (
      <section id="about" className="scroll-mt-20">
        {data?.blocks && data.blocks.length > 0 ? (
          <BlockRenderer blocks={data.blocks} />
        ) : (
          <div className="py-20 px-6 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-6">About Timber International</h2>
            <p className="text-xl text-moooi-slate">
              A partnership-driven timber manufacturer committed to reliability and quality.
            </p>
          </div>
        )}
      </section>
    )
  }
  ```

---

#### Task 7: Create OakSlabsSection Component (NEW)
- **File:** `components/sections/OakSlabsSection.tsx`
- **Action:** Create new section component with id="oak-slabs"
- **Code:**
  ```typescript
  'use client'

  import { motion } from 'framer-motion'
  import { BlockRenderer } from '@/components/blocks'
  import type { SanityPage } from '@/lib/sanity'

  interface OakSlabsSectionProps {
    data: SanityPage | null
  }

  export default function OakSlabsSection({ data }: OakSlabsSectionProps) {
    return (
      <section id="oak-slabs" className="scroll-mt-20 bg-moooi-sand">
        {data?.blocks && data.blocks.length > 0 ? (
          <BlockRenderer blocks={data.blocks} />
        ) : (
          <div className="py-20 px-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Solid Oak. Industrial Scale.
              </h2>
              <p className="text-xl text-moooi-slate mb-12 max-w-3xl mx-auto">
                Premium solid oak slabs manufactured to your specifications.
                Consistent quality, reliable supply, competitive pricing.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-4">Custom Dimensions</h3>
                  <p className="text-moooi-slate">Cut to your exact specifications with precision machinery.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-4">Kiln Dried</h3>
                  <p className="text-moooi-slate">Moisture content controlled for stability and longevity.</p>
                </div>
                <div className="bg-white p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-4">FSC Certified</h3>
                  <p className="text-moooi-slate">Responsibly sourced from sustainable European forests.</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </section>
    )
  }
  ```
- **Notes:** Fallback content showcases key product features; will be replaced by Sanity content

---

#### Task 8: Create WarehouseSection Component (NEW)
- **File:** `components/sections/WarehouseSection.tsx`
- **Action:** Create new section component with id="warehouse"
- **Code:**
  ```typescript
  'use client'

  import { motion } from 'framer-motion'
  import { BlockRenderer } from '@/components/blocks'
  import type { SanityPage } from '@/lib/sanity'

  interface WarehouseSectionProps {
    data: SanityPage | null
  }

  export default function WarehouseSection({ data }: WarehouseSectionProps) {
    return (
      <section id="warehouse" className="scroll-mt-20">
        {data?.blocks && data.blocks.length > 0 ? (
          <BlockRenderer blocks={data.blocks} />
        ) : (
          <div className="py-20 px-6 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Storage & Logistics Excellence
              </h2>
              <p className="text-xl text-moooi-slate mb-8 max-w-3xl mx-auto">
                Modern warehouse facilities ensure your timber is stored properly
                and shipped efficiently to meet your production schedules.
              </p>
            </motion.div>
          </div>
        )}
      </section>
    )
  }
  ```

---

#### Task 9: Create ProductsSection Component
- **File:** `components/sections/ProductsSection.tsx`
- **Action:** Create wrapper component with id="products"
- **Code:**
  ```typescript
  'use client'

  import { BlockRenderer } from '@/components/blocks'
  import type { SanityPage } from '@/lib/sanity'

  interface ProductsSectionProps {
    data: SanityPage | null
  }

  export default function ProductsSection({ data }: ProductsSectionProps) {
    return (
      <section id="products" className="scroll-mt-20 bg-moooi-cream">
        {data?.blocks && data.blocks.length > 0 ? (
          <BlockRenderer blocks={data.blocks} />
        ) : (
          <div className="py-20 px-6 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-6">Our Products</h2>
            <p className="text-xl text-moooi-slate">
              Industrial solid oak solutions manufactured to your specifications.
            </p>
          </div>
        )}
      </section>
    )
  }
  ```

---

#### Task 10: Create ManufacturingSection Component
- **File:** `components/sections/ManufacturingSection.tsx`
- **Action:** Create wrapper component with id="manufacturing"
- **Code:**
  ```typescript
  'use client'

  import { BlockRenderer } from '@/components/blocks'
  import type { SanityPage } from '@/lib/sanity'

  interface ManufacturingSectionProps {
    data: SanityPage | null
  }

  export default function ManufacturingSection({ data }: ManufacturingSectionProps) {
    return (
      <section id="manufacturing" className="scroll-mt-20">
        {data?.blocks && data.blocks.length > 0 ? (
          <BlockRenderer blocks={data.blocks} />
        ) : (
          <div className="py-20 px-6 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-6">Manufacturing Excellence</h2>
            <p className="text-xl text-moooi-slate">
              Modern equipment and rigorous quality standards.
            </p>
          </div>
        )}
      </section>
    )
  }
  ```

---

#### Task 11: Create SustainabilitySection Component
- **File:** `components/sections/SustainabilitySection.tsx`
- **Action:** Create wrapper component with id="sustainability"
- **Code:**
  ```typescript
  'use client'

  import { BlockRenderer } from '@/components/blocks'
  import type { SanityPage } from '@/lib/sanity'

  interface SustainabilitySectionProps {
    data: SanityPage | null
  }

  export default function SustainabilitySection({ data }: SustainabilitySectionProps) {
    return (
      <section id="sustainability" className="scroll-mt-20 bg-moooi-sand">
        {data?.blocks && data.blocks.length > 0 ? (
          <BlockRenderer blocks={data.blocks} />
        ) : (
          <div className="py-20 px-6 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-6">Sustainable Practices</h2>
            <p className="text-xl text-moooi-slate">
              FSC certified timber from responsibly managed forests.
            </p>
          </div>
        )}
      </section>
    )
  }
  ```

---

#### Task 12: Create ContactSection Component
- **File:** `components/sections/ContactSection.tsx`
- **Action:** Create wrapper component with id="contact"
- **Code:**
  ```typescript
  'use client'

  import { BlockRenderer } from '@/components/blocks'
  import ContactForm from '@/components/ContactForm'
  import type { SanityPage } from '@/lib/sanity'

  interface ContactSectionProps {
    data: SanityPage | null
  }

  export default function ContactSection({ data }: ContactSectionProps) {
    return (
      <section id="contact" className="scroll-mt-20">
        {data?.blocks && data.blocks.length > 0 ? (
          <BlockRenderer blocks={data.blocks} />
        ) : (
          <div className="py-20 px-6 max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-6 text-center">Contact Us</h2>
            <p className="text-xl text-moooi-slate mb-12 text-center">
              Let's discuss your timber requirements.
            </p>
            <ContactForm />
          </div>
        )}
      </section>
    )
  }
  ```

---

#### Task 13: Create Sections Index Export
- **File:** `components/sections/index.ts`
- **Action:** Create barrel export for all section components
- **Code:**
  ```typescript
  export { default as HeroSection } from './HeroSection'
  export { default as AboutSection } from './AboutSection'
  export { default as OakSlabsSection } from './OakSlabsSection'
  export { default as WarehouseSection } from './WarehouseSection'
  export { default as ProductsSection } from './ProductsSection'
  export { default as ManufacturingSection } from './ManufacturingSection'
  export { default as SustainabilitySection } from './SustainabilitySection'
  export { default as ContactSection } from './ContactSection'
  ```

---

### Phase 3: Navigation Updates

#### Task 14: Update Navigation Component
- **File:** `components/Navigation.tsx`
- **Action:** Replace route-based links with anchor links, add scroll spy
- **Full replacement code:**
  ```typescript
  'use client'

  import Link from 'next/link'
  import { useState, useEffect } from 'react'

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

    // Scroll spy using IntersectionObserver
    useEffect(() => {
      const sections = navLinks.map(link =>
        document.querySelector(link.href) as HTMLElement
      ).filter(Boolean)

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id)
              // Update URL hash without scrolling
              window.history.replaceState(null, '', `#${entry.target.id}`)
            }
          })
        },
        {
          rootMargin: '-50% 0px -50% 0px',
          threshold: 0
        }
      )

      sections.forEach((section) => observer.observe(section))
      return () => observer.disconnect()
    }, [])

    const handleNavClick = (href: string) => {
      setIsOpen(false) // Close mobile menu
    }

    return (
      <nav className="bg-white/95 backdrop-blur-sm sticky top-0 z-50 border-b border-moooi-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <Link href="#hero" className="text-2xl font-display font-bold">
              Timber International
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`transition-colors duration-200 ${
                    activeSection === link.href.slice(1)
                      ? 'text-moooi-gold font-medium'
                      : 'text-moooi-charcoal hover:text-moooi-gold'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-moooi-charcoal transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-moooi-charcoal transition-opacity ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-moooi-charcoal transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden py-4 border-t border-moooi-sand">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`block py-3 transition-colors ${
                    activeSection === link.href.slice(1)
                      ? 'text-moooi-gold font-medium'
                      : 'text-moooi-charcoal hover:text-moooi-gold'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>
    )
  }
  ```
- **Notes:** Changed `Link` to `<a>` for anchor links, added scroll spy with IntersectionObserver

---

#### Task 15: Update Footer Component
- **File:** `components/Footer.tsx`
- **Action:** Replace route-based links with anchor links
- **Changes:**
  - Replace `<Link href="/about">` with `<a href="#about">`
  - Replace `<Link href="/manufacturing">` with `<a href="#manufacturing">`
  - Replace `<Link href="/sustainability">` with `<a href="#sustainability">`
  - Replace `<Link href="/products">` with `<a href="#products">`
  - Replace `<Link href="/contact">` with `<a href="#contact">`

---

### Phase 4: Main Page Consolidation

#### Task 16: Update Main Page Server Component
- **File:** `app/(frontend)/page.tsx`
- **Action:** Fetch all sections using consolidated query
- **Full replacement code:**
  ```typescript
  import { getAllSections } from '@/lib/sanity'
  import SPAPageClient from './page-client'

  export const dynamic = 'force-dynamic'

  export default async function HomePage() {
    const sections = await getAllSections()
    return <SPAPageClient sections={sections} />
  }
  ```

---

#### Task 17: Update Main Page Client Component
- **File:** `app/(frontend)/page-client.tsx`
- **Action:** Render all sections sequentially
- **Full replacement code:**
  ```typescript
  'use client'

  import {
    HeroSection,
    AboutSection,
    OakSlabsSection,
    WarehouseSection,
    ProductsSection,
    ManufacturingSection,
    SustainabilitySection,
    ContactSection,
  } from '@/components/sections'
  import type { AllSectionsData } from '@/lib/sanity'

  interface SPAPageClientProps {
    sections: AllSectionsData
  }

  export default function SPAPageClient({ sections }: SPAPageClientProps) {
    return (
      <main>
        <HeroSection data={sections.hero} />
        <AboutSection data={sections.about} />
        <OakSlabsSection data={sections.oakSlabs} />
        <WarehouseSection data={sections.warehouse} />
        <ProductsSection data={sections.products} />
        <ManufacturingSection data={sections.manufacturing} />
        <SustainabilitySection data={sections.sustainability} />
        <ContactSection data={sections.contact} />
      </main>
    )
  }
  ```

---

### Phase 5: Sanity Content Setup

#### Task 18: Create Oak Slabs Page in Sanity
- **Action:** Use Sanity Studio to create new page document
- **Document values:**
  - Title: "Oak Slabs"
  - Slug: "oak-slabs"
  - Blocks: Add hero block + features grid with oak slab content
- **Notes:** Can also use populate script if available

---

#### Task 19: Create Warehouse Page in Sanity
- **Action:** Use Sanity Studio to create new page document
- **Document values:**
  - Title: "Warehouse"
  - Slug: "warehouse"
  - Blocks: Add content blocks for warehouse section
- **Notes:** Content can be updated later via CMS

---

### Phase 6: Cleanup

#### Task 20: Delete Deprecated Page Routes
- **Action:** Remove 5 page files that are no longer needed
- **Files to delete:**
  - `app/(frontend)/about/page.tsx`
  - `app/(frontend)/products/page.tsx`
  - `app/(frontend)/manufacturing/page.tsx`
  - `app/(frontend)/sustainability/page.tsx`
  - `app/(frontend)/contact/page.tsx`
- **Command:**
  ```bash
  rm app/(frontend)/about/page.tsx
  rm app/(frontend)/products/page.tsx
  rm app/(frontend)/manufacturing/page.tsx
  rm app/(frontend)/sustainability/page.tsx
  rm app/(frontend)/contact/page.tsx
  ```
- **Notes:** Also delete empty directories if no other files exist

---

#### Task 21: Verify Build
- **Action:** Run build to ensure no errors
- **Command:** `npm run build`
- **Expected:** Build completes without errors

---

## Acceptance Criteria

### Navigation & Scroll

- [ ] **AC-1:** Given I am on the website, when I click a navigation link, then the page smoothly scrolls to the corresponding section without a page reload
- [ ] **AC-2:** Given I am scrolling the page, when a section enters the viewport center, then the corresponding nav link is highlighted with gold color
- [ ] **AC-3:** Given I am on mobile, when I click a nav link in the mobile menu, then the menu closes and the page scrolls to the section
- [ ] **AC-4:** Given I click a nav link, when the scroll completes, then the URL hash updates to reflect the current section (e.g., `#about`)
- [ ] **AC-5:** Given a section is at the top of the viewport, when I observe its position, then there is an 80px offset preventing it from hiding under the sticky nav

### Sections

- [ ] **AC-6:** Given I load the homepage, when the page renders, then all 8 sections appear in order: Hero, About, Oak Slabs, Warehouse, Products, Manufacturing, Sustainability, Contact
- [ ] **AC-7:** Given Sanity contains content for a section, when the section renders, then it displays the Sanity content via BlockRenderer
- [ ] **AC-8:** Given Sanity has no content for a section, when the section renders, then it displays fallback placeholder content
- [ ] **AC-9:** Given I am viewing the Oak Slabs section, when it renders, then I see product features highlighting oak slab capabilities
- [ ] **AC-10:** Given I am viewing the Warehouse section, when it renders, then I see information about storage and logistics

### Performance & UX

- [ ] **AC-11:** Given I am loading the page, when all sections are fetched, then a single consolidated GROQ query is used (not 8 separate queries)
- [ ] **AC-12:** Given I am viewing any section, when Framer Motion animations trigger, then they only fire once per section (not on every scroll)
- [ ] **AC-13:** Given I visit a direct URL with hash (e.g., `/\#products`), when the page loads, then it scrolls to the correct section

### Cleanup

- [ ] **AC-14:** Given the old page routes exist, when cleanup is complete, then all 5 deprecated page files are deleted
- [ ] **AC-15:** Given I run `npm run build`, when the build completes, then there are no TypeScript or build errors

---

## Additional Context

### Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| Sanity CMS | External | Configured (project: o8zmvtbu8) |
| BlockRenderer | Internal | Available, 7 block types |
| Framer Motion | NPM Package | Installed |
| Tailwind CSS | NPM Package | Configured with moooi palette |

### Testing Strategy

**Manual Testing:**
1. Desktop browsers: Chrome, Firefox, Safari, Edge
2. Mobile: iOS Safari, Android Chrome
3. Test scroll spy highlighting accuracy
4. Test anchor deep-linking from external sources
5. Test mobile menu open/close with anchor clicks

**Functional Tests:**
1. Click each nav link → verify scroll to correct section
2. Scroll through page → verify active nav highlighting updates
3. Visit `/#section` directly → verify scroll on load
4. Test on viewport widths: 320px, 768px, 1024px, 1440px

**Build Verification:**
1. `npm run build` completes without errors
2. `npm run dev` shows all sections rendering
3. Lighthouse performance score ≥ 80

### Risk Mitigation

| Risk | Mitigation |
|------|------------|
| SEO impact from SPA | Semantic HTML with proper headings, anchor deep-links for sharing |
| Scroll spy false triggers | rootMargin set to -50% 0px -50% 0px for center detection |
| Missing Sanity content | Fallback UI in each section component |
| Mobile menu not closing | Explicit setIsOpen(false) on nav click |

### Notes

- Navigation height is 80px (`h-20`), matched by `scroll-mt-20` (5rem)
- `scroll-behavior: smooth` already in globals.css
- CTA links in hero should point to `#contact` instead of `/contact`
- Consider adding scroll progress indicator as future enhancement
