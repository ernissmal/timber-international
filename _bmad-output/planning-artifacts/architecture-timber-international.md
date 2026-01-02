# Architecture Document
# Timber International - SPA Website

**Document Version:** 1.0
**Date:** 2026-01-02
**Author:** Claude (via BMad Method)
**Status:** Ready for Development

---

## 1. System Overview

### 1.1 Architecture Type
Single-Page Application (SPA) with scroll-based navigation, built on Next.js 16 App Router with Sanity CMS for content management.

### 1.2 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (Client)                         │
│  ┌─────────────────────────────────────────────────────────────┐ │
│  │                    React Application                         │ │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐│ │
│  │  │Navigation│ │  Hero    │ │ Sections │ │     Footer       ││ │
│  │  │(Anchor)  │ │ Section  │ │ (8 total)│ │   (Anchor)       ││ │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘│ │
│  │                                                              │ │
│  │  ┌──────────────────────────────────────────────────────────┐│ │
│  │  │              Block Renderer (Dynamic Content)            ││ │
│  │  └──────────────────────────────────────────────────────────┘│ │
│  └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS (SSR/ISR)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Next.js 16 (Vercel)                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   App Router    │  │   API Routes    │  │ Static Assets   │  │
│  │  (frontend)     │  │   (optional)    │  │  (images, css)  │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTPS (API)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Sanity CMS                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  │
│  │   Documents     │  │   Assets (CDN)  │  │  Studio (Admin) │  │
│  │  (Pages, Blocks)│  │   (Images)      │  │                 │  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### 2.1 Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.x | React framework with App Router |
| React | 19.x | UI library |
| TypeScript | 5.5.x | Type safety |
| Tailwind CSS | 3.4.x | Utility-first CSS |
| Framer Motion | 11.x | Animations |
| Lucide React | 0.561.x | Icon library |

### 2.2 Content Management
| Technology | Version | Purpose |
|------------|---------|---------|
| Sanity | 4.21.x | Headless CMS |
| next-sanity | 11.x | Sanity integration |
| @portabletext/react | 6.x | Rich text rendering |
| @sanity/image-url | 2.x | Image URL builder |

### 2.3 Infrastructure
| Service | Purpose |
|---------|---------|
| Vercel | Hosting & deployment |
| Sanity Cloud | CMS hosting & CDN |
| GitHub | Source control |

---

## 3. Application Structure

### 3.1 Route Structure (SPA)

```
app/
├── (frontend)/
│   ├── layout.tsx          # Shared layout (Nav + Footer)
│   └── page.tsx            # SINGLE PAGE with all sections
│
├── (sanity)/               # Sanity Studio (separate)
│   └── studio/
│
├── layout.tsx              # Root layout
└── globals.css             # Global styles
```

### 3.2 Component Architecture

```
components/
├── Navigation.tsx          # Anchor-based nav with scroll spy
├── Footer.tsx              # Anchor-based footer links
├── Hero.tsx                # Reusable hero component
│
├── sections/               # NEW: Section wrappers for SPA
│   ├── HeroSection.tsx     # id="hero"
│   ├── AboutSection.tsx    # id="about"
│   ├── OakSlabsSection.tsx # id="oak-slabs" [NEW]
│   ├── WarehouseSection.tsx# id="warehouse" [NEW]
│   ├── ProductsSection.tsx # id="products"
│   ├── ManufacturingSection.tsx # id="manufacturing"
│   ├── SustainabilitySection.tsx # id="sustainability"
│   └── ContactSection.tsx  # id="contact"
│
└── blocks/                 # Existing Sanity block components
    ├── BlockRenderer.tsx   # Dynamic block switch
    ├── HeroBlock.tsx
    ├── FeaturesGridBlock.tsx
    ├── EditorialTextBlock.tsx
    ├── ImageSectionBlock.tsx
    ├── CTABlock.tsx
    ├── StatsBlock.tsx
    └── TestimonialBlock.tsx
```

---

## 4. Data Flow

### 4.1 Content Fetching Strategy

```
┌──────────────────┐    Fetch (SSR)    ┌──────────────────┐
│    Main Page     │ ◄──────────────── │   Sanity CMS     │
│   page.tsx       │                   │   (GROQ Query)   │
└────────┬─────────┘                   └──────────────────┘
         │
         │ Props
         ▼
┌──────────────────┐
│  Section         │  Each section receives:
│  Components      │  - Sanity document data
│                  │  - Section ID for anchoring
└──────────────────┘
```

### 4.2 GROQ Query Pattern

```typescript
// Fetch all section content in single query
const query = `{
  "hero": *[_type == "page" && slug.current == "home"][0],
  "about": *[_type == "page" && slug.current == "about"][0],
  "oakSlabs": *[_type == "page" && slug.current == "oak-slabs"][0],
  "warehouse": *[_type == "page" && slug.current == "warehouse"][0],
  "products": *[_type == "page" && slug.current == "products"][0],
  "manufacturing": *[_type == "page" && slug.current == "manufacturing"][0],
  "sustainability": *[_type == "page" && slug.current == "sustainability"][0],
  "contact": *[_type == "page" && slug.current == "contact"][0]
}`
```

---

## 5. Navigation Architecture

### 5.1 Anchor-Based Navigation

```typescript
// Navigation link structure
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

### 5.2 Smooth Scroll Implementation

```css
/* globals.css */
html {
  scroll-behavior: smooth;
}

/* Offset for sticky header (80px) */
section[id] {
  scroll-margin-top: 80px;
}
```

### 5.3 Scroll Spy (Optional Enhancement)

```typescript
// Track active section during scroll
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    },
    { rootMargin: '-50% 0px -50% 0px' }
  )

  sections.forEach((section) => observer.observe(section))
  return () => observer.disconnect()
}, [])
```

---

## 6. Styling Architecture

### 6.1 Design System (Moooi-Inspired)

```typescript
// tailwind.config.ts
colors: {
  moooi: {
    cream: '#F5F5F0',    // Background, light surfaces
    charcoal: '#2B2B2B', // Text, dark elements
    sand: '#E8E4DC',     // Secondary backgrounds
    gold: '#C9A961',     // Accent, CTAs, highlights
    slate: '#6B7280',    // Secondary text
  },
}

fontFamily: {
  sans: ['Inter', 'sans-serif'],      // Body text
  display: ['DM Sans', 'sans-serif'], // Headings
}
```

### 6.2 Animation System

| Animation | Library | Trigger |
|-----------|---------|---------|
| Fade-in | Framer Motion | Viewport entry |
| Slide-up | Framer Motion | Viewport entry |
| Smooth scroll | CSS | Anchor click |
| Hover effects | Tailwind CSS | Mouse interaction |

### 6.3 Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Mobile | 320px - 767px | Single column, hamburger menu |
| Tablet | 768px - 1023px | 2-column layouts |
| Desktop | 1024px+ | Full layouts, horizontal nav |

---

## 7. Section Components Pattern

### 7.1 Base Section Component

```typescript
// components/sections/BaseSection.tsx
interface BaseSectionProps {
  id: string
  className?: string
  children: React.ReactNode
}

export function BaseSection({ id, className, children }: BaseSectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-20", className)}  // 80px offset for sticky nav
    >
      {children}
    </section>
  )
}
```

### 7.2 Section Implementation Pattern

```typescript
// components/sections/OakSlabsSection.tsx
import { BaseSection } from './BaseSection'
import BlockRenderer from '../blocks/BlockRenderer'

interface OakSlabsSectionProps {
  data?: SanityPageData
}

export function OakSlabsSection({ data }: OakSlabsSectionProps) {
  return (
    <BaseSection id="oak-slabs" className="py-20 bg-moooi-cream">
      {data?.blocks ? (
        <BlockRenderer blocks={data.blocks} />
      ) : (
        <FallbackContent />
      )}
    </BaseSection>
  )
}
```

---

## 8. Performance Considerations

### 8.1 Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| LCP | < 2.5s | Preload hero, optimize images |
| FID | < 100ms | Minimize JavaScript |
| CLS | < 0.1 | Reserve space for images |

### 8.2 Optimization Strategies

1. **Image Optimization**
   - Use Next.js Image component
   - Sanity CDN with responsive sizing
   - Lazy loading for below-fold images

2. **Code Splitting**
   - Dynamic imports for heavy components
   - Framer Motion tree-shaking

3. **Caching**
   - Sanity CDN caching
   - Vercel Edge caching
   - Static generation where possible

---

## 9. SEO Considerations

### 9.1 Semantic Structure

```html
<main>
  <section id="hero">
    <h1>Main Headline (single H1)</h1>
  </section>

  <section id="about">
    <h2>About Section</h2>
  </section>

  <!-- Each section uses H2, subsections use H3+ -->
</main>
```

### 9.2 Deep Linking Support

- Anchor links allow direct section sharing: `timber-international.com/#oak-slabs`
- Hash updates on scroll for browser history
- Meta tags and Open Graph configured per-page

---

## 10. Key Decisions

### 10.1 Architecture Decisions Record (ADR)

| Decision | Rationale |
|----------|-----------|
| Single page vs. route-per-section | Client requirement for scroll experience |
| CSS smooth scroll vs. JS | Simpler, better performance, accessibility |
| Section components vs. inline | Reusability, maintainability, testability |
| Sanity blocks reuse | Existing content structure, minimal migration |
| Framer Motion for animations | Already in stack, performant, declarative |

### 10.2 Trade-offs

| Choice | Benefit | Trade-off |
|--------|---------|-----------|
| SPA structure | Seamless UX | SEO requires careful handling |
| Single GROQ query | Fast initial load | Larger initial payload |
| CSS scroll-behavior | Native, accessible | Less control than JS |

---

## 11. File Changes Summary

### 11.1 Files to Modify

```
components/Navigation.tsx   # Anchor links + scroll spy
components/Footer.tsx       # Anchor links
app/(frontend)/page.tsx     # Consolidate all sections
app/globals.css             # scroll-margin-top
```

### 11.2 Files to Create

```
components/sections/OakSlabsSection.tsx
components/sections/WarehouseSection.tsx
components/sections/AboutSection.tsx
components/sections/ProductsSection.tsx
components/sections/ManufacturingSection.tsx
components/sections/SustainabilitySection.tsx
components/sections/ContactSection.tsx
```

### 11.3 Files to Delete

```
app/(frontend)/about/page.tsx
app/(frontend)/products/page.tsx
app/(frontend)/manufacturing/page.tsx
app/(frontend)/sustainability/page.tsx
app/(frontend)/contact/page.tsx
```

---

## Appendix A: Related Documents

- PRD: `prd-timber-international-spa.md`
- Epic: `epic-001-spa-restructure.md`
- Component Library: `component-library.md`
- Sprint Change Proposal: `sprint-change-proposal-2026-01-02.md`
