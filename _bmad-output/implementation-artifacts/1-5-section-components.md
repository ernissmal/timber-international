---
story_id: STORY-001-05
epic_id: EPIC-001
title: 'Section Components for Existing Pages'
status: 'ready-for-dev'
priority: 'P0'
points: 5
created: '2026-01-02'
updated: '2026-01-02'
dependencies:
  - 'STORY-001-01 (Navigation)'
  - 'STORY-001-02 (Infrastructure)'
related_tasks:
  - tech-spec Task 5 (HeroSection)
  - tech-spec Task 6 (AboutSection)
  - tech-spec Task 7 (OakSlabsSection)
  - tech-spec Task 8 (WarehouseSection)
  - tech-spec Task 9 (ProductsSection)
  - tech-spec Task 10 (ManufacturingSection)
  - tech-spec Task 11 (SustainabilitySection)
  - tech-spec Task 12 (ContactSection)
  - tech-spec Task 13 (Index exports)
---

# Story 1-5: Section Components for Existing Pages

**Epic:** EPIC-001 - Website SPA Restructure
**Story ID:** STORY-001-05
**Priority:** P0
**Story Points:** 5
**Status:** ready-for-dev

---

## Overview

### User Story

As a developer, I need to convert existing page components to section components so that the content can be embedded in the main SPA page with proper anchor-based navigation.

### Description

Extract the content rendering logic from existing page files (about, products, manufacturing, sustainability, contact) and the home page hero into reusable section components. Each section will:
- Use BlockRenderer to render Sanity CMS content
- Provide inline fallback content with Framer Motion animations when Sanity data is unavailable
- Include proper semantic HTML with section IDs for anchor navigation
- Support scroll offset for sticky navigation (scroll-mt-20)
- Be fully client-side components ('use client' directive)

Additionally, create two NEW section components (OakSlabsSection, WarehouseSection) that don't have existing page equivalents.

---

## Context

### Technical Background

**Block Rendering Pipeline:**
```
Sanity CMS → GROQ Query → lib/sanity.ts (transform _type → __typename) → BlockRenderer → Block Components
```

**Component Pattern:**
Each section component follows this structure:
1. Accept `data: SanityPage | null` prop
2. Render `<section>` with proper id and scroll-mt-20
3. Conditional rendering: BlockRenderer if data exists, fallback if null
4. Fallback uses Framer Motion for animations
5. 'use client' directive for interactive features

**Animation Pattern:**
```typescript
// Standard animation for single content blocks
const sectionAnimation = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
}

// Stagger pattern for grids (OakSlabs, Warehouse)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}
```

### Design System Colors (Tailwind CSS)
- `bg-moooi-cream` - Light cream background (Products)
- `bg-moooi-sand` - Sand beige background (OakSlabs, Sustainability)
- `bg-moooi-gold` - Primary accent gold
- `bg-moooi-charcoal` - Dark charcoal for text/buttons
- `text-moooi-slate` - Secondary text color
- Default white background for About, Warehouse, Manufacturing, Contact

### Dependencies
- **Framer Motion 11:** Animation library (already installed)
- **Lucide React:** Icon library for Warehouse section (already installed)
- **BlockRenderer:** Existing component at `/components/blocks`
- **ContactForm:** Existing component at `/components/ContactForm`
- **SanityPage type:** Already defined in `/lib/sanity.ts`

---

## Acceptance Criteria

### Section Creation
- [ ] **AC-1:** HeroSection component created at `components/sections/HeroSection.tsx` with id="hero"
- [ ] **AC-2:** AboutSection component created at `components/sections/AboutSection.tsx` with id="about"
- [ ] **AC-3:** OakSlabsSection component created at `components/sections/OakSlabsSection.tsx` with id="oak-slabs"
- [ ] **AC-4:** WarehouseSection component created at `components/sections/WarehouseSection.tsx` with id="warehouse"
- [ ] **AC-5:** ProductsSection component created at `components/sections/ProductsSection.tsx` with id="products"
- [ ] **AC-6:** ManufacturingSection component created at `components/sections/ManufacturingSection.tsx` with id="manufacturing"
- [ ] **AC-7:** SustainabilitySection component created at `components/sections/SustainabilitySection.tsx` with id="sustainability"
- [ ] **AC-8:** ContactSection component created at `components/sections/ContactSection.tsx` with id="contact"

### Component Structure
- [ ] **AC-9:** Each section component has 'use client' directive at the top
- [ ] **AC-10:** Each section accepts `data: SanityPage | null` prop
- [ ] **AC-11:** Each section renders `<section>` with proper id attribute matching navigation anchors
- [ ] **AC-12:** Each section has `scroll-mt-20` class for 80px sticky nav offset
- [ ] **AC-13:** Each section has appropriate `aria-label` for accessibility

### Content Rendering
- [ ] **AC-14:** When data exists, sections render content via BlockRenderer
- [ ] **AC-15:** When data is null, sections render inline fallback content
- [ ] **AC-16:** All fallback content uses Framer Motion animations with viewport.once = true
- [ ] **AC-17:** HeroSection fallback uses `<a>` tag for CTA (not Link component) to support anchor hrefs

### Styling & Design
- [ ] **AC-18:** OakSlabsSection has bg-moooi-sand background
- [ ] **AC-19:** ProductsSection has bg-moooi-cream background
- [ ] **AC-20:** SustainabilitySection has bg-moooi-sand background with certification badges
- [ ] **AC-21:** WarehouseSection uses Lucide icons (Warehouse, Truck, Clock)
- [ ] **AC-22:** All sections maintain visual hierarchy with proper headings (H2 for section titles)

### Index Exports
- [ ] **AC-23:** Index file created at `components/sections/index.ts`
- [ ] **AC-24:** Index exports all 8 section components as named exports

### Build Verification
- [ ] **AC-25:** TypeScript compiles without errors
- [ ] **AC-26:** No ESLint warnings related to new section components
- [ ] **AC-27:** All imports resolve correctly

---

## Implementation Tasks

### Task 1: Create Sections Directory
**File:** `components/sections/` (new directory)

**Action:**
```bash
mkdir -p components/sections
```

**Verification:**
- Directory exists at `components/sections/`

---

### Task 2: Create HeroSection Component
**File:** `components/sections/HeroSection.tsx` (new file)

**Important Notes:**
- MUST use inline fallback (not existing Hero component)
- Existing Hero component uses `<Link>` which doesn't work with anchor hrefs
- Fallback CTA must use `<a href="#contact">` for anchor navigation

**Implementation:**
```typescript
'use client'

import { BlockRenderer } from '@/components/blocks'
import type { SanityPage } from '@/lib/sanity'

interface HeroSectionProps {
  data: SanityPage | null
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section id="hero" className="scroll-mt-20" aria-label="Hero">
      {data?.blocks && data.blocks.length > 0 ? (
        <BlockRenderer blocks={data.blocks} />
      ) : (
        // Inline fallback - don't use Hero component because it uses <Link> for CTA
        // which doesn't work correctly with anchor hrefs like "#contact"
        <div className="h-[90vh] relative flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-moooi-cream via-moooi-sand to-moooi-gold opacity-30" />
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-in">
              Industrial Timber Supply You Can Build Your Business On
            </h1>
            <p className="text-xl md:text-2xl text-moooi-slate mb-8 animate-slide-up">
              Your supply chain doesn't have room for inconsistency. Precision-manufactured solid oak furniture components with documented quality standards.
            </p>
            <a
              href="#contact"
              className="inline-block bg-moooi-charcoal text-white px-10 py-4 rounded-full font-medium hover:bg-moooi-gold hover:text-moooi-charcoal transition-all duration-300 transform hover:scale-105"
            >
              Request a Quote
            </a>
          </div>
        </div>
      )}
    </section>
  )
}
```

**Checklist:**
- [ ] File created at correct path
- [ ] 'use client' directive present
- [ ] Section id="hero" matches navigation
- [ ] Fallback uses `<a>` tag (not Link)
- [ ] TypeScript compiles without errors

---

### Task 3: Create AboutSection Component
**File:** `components/sections/AboutSection.tsx` (new file)

**Implementation:**
```typescript
'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import type { SanityPage } from '@/lib/sanity'

interface AboutSectionProps {
  data: SanityPage | null
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" className="scroll-mt-20" aria-label="About Us">
      {data?.blocks && data.blocks.length > 0 ? (
        <BlockRenderer blocks={data.blocks} />
      ) : (
        <div className="py-20 px-6 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              About Timber International
            </h2>
            <p className="text-xl text-moooi-slate">
              A partnership-driven timber manufacturer committed to reliability and quality.
              We scaled our operations to meet industrial demand while maintaining
              the craftsmanship standards our partners depend on.
            </p>
          </motion.div>
        </div>
      )}
    </section>
  )
}
```

**Checklist:**
- [ ] File created at correct path
- [ ] Framer Motion animation with viewport.once = true
- [ ] White background (default, no class needed)
- [ ] H2 heading for proper hierarchy

---

### Task 4: Create OakSlabsSection Component (NEW)
**File:** `components/sections/OakSlabsSection.tsx` (new file)

**Important Notes:**
- This is a NEW section (no existing page)
- Uses bg-moooi-sand background
- Stagger animation pattern for 3 feature cards
- CTA links to #contact

**Implementation:**
```typescript
'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import type { SanityPage } from '@/lib/sanity'

interface OakSlabsSectionProps {
  data: SanityPage | null
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}

export default function OakSlabsSection({ data }: OakSlabsSectionProps) {
  return (
    <section id="oak-slabs" className="scroll-mt-20 bg-moooi-sand" aria-label="Oak Slabs">
      {data?.blocks && data.blocks.length > 0 ? (
        <BlockRenderer blocks={data.blocks} />
      ) : (
        <div className="py-20 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Solid Oak. Industrial Scale.
            </h2>
            <p className="text-xl text-moooi-slate max-w-3xl mx-auto">
              Premium solid oak slabs manufactured to your specifications.
              Consistent quality, reliable supply, competitive pricing.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Custom Dimensions</h3>
              <p className="text-moooi-slate">
                Cut to your exact specifications with precision CNC machinery.
                Tolerances within ±0.5mm.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4">Kiln Dried</h3>
              <p className="text-moooi-slate">
                Moisture content controlled to 8-12% for stability and longevity.
                Documented drying records available.
              </p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm">
              <h3 className="text-2xl font-bold mb-4">FSC Certified</h3>
              <p className="text-moooi-slate">
                Responsibly sourced from sustainable European forests.
                Chain of custody documentation provided.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <a
              href="#contact"
              className="inline-block bg-moooi-gold text-white px-8 py-4 rounded-full font-medium hover:bg-moooi-gold/90 transition-colors"
            >
              Request Specifications
            </a>
          </motion.div>
        </div>
      )}
    </section>
  )
}
```

**Checklist:**
- [ ] bg-moooi-sand background applied
- [ ] Stagger animation with containerVariants and itemVariants
- [ ] 3 feature cards with white backgrounds
- [ ] CTA button links to #contact

---

### Task 5: Create WarehouseSection Component (NEW)
**File:** `components/sections/WarehouseSection.tsx` (new file)

**Important Notes:**
- This is a NEW section (no existing page)
- Uses Lucide icons: Warehouse, Truck, Clock
- White background (default)
- 3 feature cards with staggered animations

**Implementation:**
```typescript
'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import { Warehouse, Truck, Clock } from 'lucide-react'
import type { SanityPage } from '@/lib/sanity'

interface WarehouseSectionProps {
  data: SanityPage | null
}

const features = [
  {
    icon: Warehouse,
    title: '10,000m² Storage',
    description: 'Climate-controlled facilities for optimal timber preservation.'
  },
  {
    icon: Truck,
    title: 'Pan-European Delivery',
    description: 'Reliable logistics network covering all major markets.'
  },
  {
    icon: Clock,
    title: '48-Hour Dispatch',
    description: 'In-stock items shipped within 2 business days.'
  }
]

export default function WarehouseSection({ data }: WarehouseSectionProps) {
  return (
    <section id="warehouse" className="scroll-mt-20" aria-label="Warehouse">
      {data?.blocks && data.blocks.length > 0 ? (
        <BlockRenderer blocks={data.blocks} />
      ) : (
        <div className="py-20 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Storage & Logistics Excellence
            </h2>
            <p className="text-xl text-moooi-slate max-w-3xl mx-auto">
              Modern warehouse facilities ensure your timber is stored properly
              and shipped efficiently to meet your production schedules.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="text-center p-8"
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-moooi-gold" />
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-moooi-slate">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
```

**Checklist:**
- [ ] Lucide icons imported and used
- [ ] Icons styled with text-moooi-gold
- [ ] Staggered animation with delay multiplier
- [ ] 3 features array defined

---

### Task 6: Create ProductsSection Component
**File:** `components/sections/ProductsSection.tsx` (new file)

**Important Notes:**
- Uses bg-moooi-cream background
- Simpler layout (text-only fallback)

**Implementation:**
```typescript
'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import type { SanityPage } from '@/lib/sanity'

interface ProductsSectionProps {
  data: SanityPage | null
}

export default function ProductsSection({ data }: ProductsSectionProps) {
  return (
    <section id="products" className="scroll-mt-20 bg-moooi-cream" aria-label="Products">
      {data?.blocks && data.blocks.length > 0 ? (
        <BlockRenderer blocks={data.blocks} />
      ) : (
        <div className="py-20 px-6 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Specifications You Can Count On
            </h2>
            <p className="text-xl text-moooi-slate">
              Industrial solid oak solutions manufactured to your specifications.
              Table tops, panels, furniture components, and custom orders.
            </p>
          </motion.div>
        </div>
      )}
    </section>
  )
}
```

**Checklist:**
- [ ] bg-moooi-cream background applied
- [ ] Standard animation pattern
- [ ] Simple text-centered layout

---

### Task 7: Create ManufacturingSection Component
**File:** `components/sections/ManufacturingSection.tsx` (new file)

**Implementation:**
```typescript
'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import type { SanityPage } from '@/lib/sanity'

interface ManufacturingSectionProps {
  data: SanityPage | null
}

export default function ManufacturingSection({ data }: ManufacturingSectionProps) {
  return (
    <section id="manufacturing" className="scroll-mt-20" aria-label="Manufacturing">
      {data?.blocks && data.blocks.length > 0 ? (
        <BlockRenderer blocks={data.blocks} />
      ) : (
        <div className="py-20 px-6 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Modern Equipment. Rigorous Standards.
            </h2>
            <p className="text-xl text-moooi-slate">
              State-of-the-art CNC machinery and quality control processes
              ensure every piece meets your specifications.
            </p>
          </motion.div>
        </div>
      )}
    </section>
  )
}
```

**Checklist:**
- [ ] White background (default)
- [ ] Standard animation pattern
- [ ] Text-centered layout

---

### Task 8: Create SustainabilitySection Component
**File:** `components/sections/SustainabilitySection.tsx` (new file)

**Important Notes:**
- Uses bg-moooi-sand background
- Includes certification badges (FSC, PEFC, EU Timber Regulation)

**Implementation:**
```typescript
'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import type { SanityPage } from '@/lib/sanity'

interface SustainabilitySectionProps {
  data: SanityPage | null
}

export default function SustainabilitySection({ data }: SustainabilitySectionProps) {
  return (
    <section id="sustainability" className="scroll-mt-20 bg-moooi-sand" aria-label="Sustainability">
      {data?.blocks && data.blocks.length > 0 ? (
        <BlockRenderer blocks={data.blocks} />
      ) : (
        <div className="py-20 px-6 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Responsible Sourcing
            </h2>
            <p className="text-xl text-moooi-slate mb-8">
              FSC certified timber from responsibly managed forests.
              Complete chain of custody documentation for compliance requirements.
            </p>
            <div className="flex justify-center gap-8 flex-wrap">
              <div className="bg-white px-6 py-3 rounded-full font-medium">
                FSC Certified
              </div>
              <div className="bg-white px-6 py-3 rounded-full font-medium">
                PEFC Available
              </div>
              <div className="bg-white px-6 py-3 rounded-full font-medium">
                EU Timber Regulation
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  )
}
```

**Checklist:**
- [ ] bg-moooi-sand background applied
- [ ] 3 certification badges with white backgrounds
- [ ] Badges use rounded-full pills

---

### Task 9: Create ContactSection Component
**File:** `components/sections/ContactSection.tsx` (new file)

**Important Notes:**
- Integrates existing ContactForm component
- White background (default)

**Implementation:**
```typescript
'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import ContactForm from '@/components/ContactForm'
import type { SanityPage } from '@/lib/sanity'

interface ContactSectionProps {
  data: SanityPage | null
}

export default function ContactSection({ data }: ContactSectionProps) {
  return (
    <section id="contact" className="scroll-mt-20" aria-label="Contact">
      {data?.blocks && data.blocks.length > 0 ? (
        <BlockRenderer blocks={data.blocks} />
      ) : (
        <div className="py-20 px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-center">
              Let's Discuss Your Requirements
            </h2>
            <p className="text-xl text-moooi-slate mb-12 text-center">
              Tell us about your project and we'll prepare a detailed quote.
            </p>
            <ContactForm />
          </motion.div>
        </div>
      )}
    </section>
  )
}
```

**Checklist:**
- [ ] ContactForm component imported and rendered
- [ ] Heading and description centered
- [ ] Form rendered within motion.div

---

### Task 10: Create Sections Index Export
**File:** `components/sections/index.ts` (new file)

**Important Notes:**
- Exports ALL 8 section components as named exports
- Enables clean imports in page-client.tsx

**Implementation:**
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

**Checklist:**
- [ ] All 8 sections exported
- [ ] Named exports (not default export)
- [ ] Export order matches section sequence

---

### Task 11: Verify TypeScript Compilation
**Command:**
```bash
npx tsc --noEmit
```

**Expected Output:**
- No TypeScript errors
- All imports resolve correctly

**Checklist:**
- [ ] No TS errors in terminal
- [ ] All SanityPage imports resolve
- [ ] All Framer Motion imports resolve
- [ ] All Lucide icon imports resolve

---

### Task 12: Verify Build
**Command:**
```bash
npm run build
```

**Expected Output:**
- Build completes without errors
- All section components compile successfully

**Checklist:**
- [ ] Build exits with code 0
- [ ] No build warnings related to section components
- [ ] Next.js successfully compiles all files

---

## Testing Checklist

### Component Rendering
- [ ] **T-1:** Each section renders without errors when data is null
- [ ] **T-2:** Each section renders BlockRenderer when data is provided
- [ ] **T-3:** Fallback content appears correctly for each section
- [ ] **T-4:** Framer Motion animations trigger on scroll

### Visual Testing
- [ ] **T-5:** OakSlabsSection has sand background with 3 white cards
- [ ] **T-6:** ProductsSection has cream background
- [ ] **T-7:** SustainabilitySection has sand background with 3 badges
- [ ] **T-8:** WarehouseSection icons are gold colored

### Accessibility
- [ ] **T-9:** All sections have proper aria-label attributes
- [ ] **T-10:** All sections have semantic H2 headings
- [ ] **T-11:** Keyboard navigation works on all CTA links

### Integration
- [ ] **T-12:** ContactForm renders inside ContactSection
- [ ] **T-13:** All anchor hrefs work (#contact, etc.)
- [ ] **T-14:** Scroll offset (scroll-mt-20) prevents nav overlap

---

## Files Changed

### New Files Created (9)
```
components/sections/HeroSection.tsx
components/sections/AboutSection.tsx
components/sections/OakSlabsSection.tsx
components/sections/WarehouseSection.tsx
components/sections/ProductsSection.tsx
components/sections/ManufacturingSection.tsx
components/sections/SustainabilitySection.tsx
components/sections/ContactSection.tsx
components/sections/index.ts
```

### Total Lines of Code
- Approximately 450-500 lines across all section components

---

## Dependencies on Other Stories

### Blocked By
- **STORY-001-02 (Infrastructure Setup):** Requires `AllSectionsData` type in lib/sanity.ts
- **STORY-001-02 (Infrastructure Setup):** Requires scroll CSS in globals.css

### Blocks
- **STORY-001-04 (Main Page):** page-client.tsx needs sections to import

---

## Risk Assessment

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Missing ContactForm component | High | Low | Verify component exists before creating ContactSection |
| Framer Motion performance issues | Medium | Low | Use viewport.once to prevent re-animations |
| Inconsistent styling | Medium | Low | Reference tech-spec for exact class names |
| TypeScript type errors | Medium | Low | Ensure SanityPage type matches exactly |

---

## Definition of Done

- [ ] All 8 section components created and functional
- [ ] Index file exports all components
- [ ] TypeScript compiles without errors
- [ ] Build succeeds without warnings
- [ ] All fallback content renders correctly
- [ ] All animations work as expected
- [ ] All backgrounds match design system
- [ ] Code reviewed for consistency
- [ ] Components tested in isolation (if possible)
- [ ] Ready for integration in page-client.tsx

---

## Notes

### Design System Reference
- **Navigation Height:** 80px (h-20 = 5rem)
- **Scroll Offset:** scroll-mt-20 (5rem) matches nav height
- **Animation Ease:** [0.16, 1, 0.3, 1] (custom cubic-bezier)
- **Animation Duration:** 0.8s for main content, 0.6s for stagger items

### Code Quality
- Consistent prop interface naming: `{SectionName}SectionProps`
- Consistent export pattern: `export default function {SectionName}Section`
- All components use TypeScript strict mode
- All components follow 'use client' pattern

### Future Enhancements
- Add loading skeletons for BlockRenderer
- Add error boundaries per section
- Add section-specific analytics tracking
- Consider lazy loading for below-fold sections

---

**Status:** Ready for Development
**Last Updated:** 2026-01-02
**Tech-Spec Reference:** Tasks 5-13 in tech-spec-spa-restructure.md
