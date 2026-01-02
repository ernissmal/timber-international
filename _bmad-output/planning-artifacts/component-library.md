# Component Library Specification
# Timber International - SPA Website

**Document Version:** 1.0
**Date:** 2026-01-02
**Author:** Claude (via BMad Method)
**Status:** Ready for Development

---

## 1. Design System Overview

### 1.1 Brand Identity
**Style:** Moooi-inspired premium aesthetic
**Industry:** B2B Industrial Timber
**Tone:** Professional, reliable, quality-focused

### 1.2 Color Palette

| Color Name | Hex Code | CSS Variable | Usage |
|------------|----------|--------------|-------|
| Cream | `#F5F5F0` | `--background` | Primary background |
| Charcoal | `#2B2B2B` | `--foreground` | Primary text, headings |
| Sand | `#E8E4DC` | `moooi-sand` | Secondary backgrounds, borders |
| Gold | `#C9A961` | `moooi-gold` | Accent, CTAs, highlights |
| Slate | `#6B7280` | `moooi-slate` | Secondary text |
| White | `#FFFFFF` | - | Cards, light sections |
| Black | `#000000` | - | Dark sections, overlays |

### 1.3 Typography

| Type | Font | Weight | Usage |
|------|------|--------|-------|
| Display | DM Sans | Bold (700) | H1, H2 headings |
| Body | Inter | Regular (400) | Body text, paragraphs |
| Body | Inter | Medium (500) | Labels, buttons |
| Body | Inter | Semibold (600) | Subheadings |

### 1.4 Typography Scale

| Element | Desktop | Mobile | Class |
|---------|---------|--------|-------|
| H1 (Hero) | 5rem (80px) | 3rem (48px) | `text-5xl md:text-7xl` |
| H2 (Section) | 3rem (48px) | 2rem (32px) | `display-medium` |
| H3 (Card) | 1.875rem (30px) | 1.5rem (24px) | `text-3xl` |
| Body | 1.125rem (18px) | 1rem (16px) | `text-lg` |
| Small | 0.875rem (14px) | 0.875rem | `text-sm` |

---

## 2. Layout System

### 2.1 Content Widths

```css
/* Content container classes */
.content-block    { @apply px-6 md:px-12 lg:px-20; }
.content-narrow   { @apply max-w-3xl mx-auto; }
.content-wide     { @apply max-w-7xl mx-auto; }
.content-full     { @apply w-full; }
```

### 2.2 Section Spacing

| Element | Spacing | Class |
|---------|---------|-------|
| Section vertical padding | 5rem (80px) | `py-20` |
| Section large padding | 10rem (160px) | `py-40` |
| Element margin bottom | 3rem (48px) | `mb-12` |
| Grid gap | 3rem (48px) | `gap-12` |

### 2.3 Responsive Breakpoints

```css
/* Tailwind defaults */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large screens */
2xl: 1536px /* Extra large */
```

---

## 3. Existing Block Components

### 3.1 HeroBlock

**File:** `components/blocks/HeroBlock.tsx`
**Purpose:** Full-height hero sections with headline, subheading, and CTA

**Props:**
```typescript
interface HeroBlockProps {
  data: {
    heading?: string
    subheading?: string
    ctaText?: string
    ctaLink?: string
    backgroundImage?: string
    size?: 'default' | 'small'
  }
}
```

**Variants:**
- `default`: 90vh height
- `small`: 50vh height

**Visual:**
```
┌────────────────────────────────────────────────────────┐
│                                                        │
│          [Gradient Background or Image]               │
│                                                        │
│                     HEADING                           │
│               Subheading text here                    │
│                  [ CTA Button ]                       │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

### 3.2 FeaturesGridBlock

**File:** `components/blocks/FeaturesGridBlock.tsx`
**Purpose:** Grid of feature cards with icons, titles, and descriptions

**Props:**
```typescript
interface FeaturesGridBlockProps {
  data: {
    heading?: string
    columns?: '2' | '3' | '4'
    items?: Array<{
      title?: string
      description?: string
      icon?: string
      image?: string
      link?: string
    }>
  }
}
```

**Available Icons:**
```typescript
const iconMap = {
  // Products
  Grid3x3, Armchair, Layers, Cpu, Square,
  // Sustainability
  TreePine, Infinity, CheckCircle, Leaf,
  // Contact
  MapPin, Mail, Phone,
  // About
  Shield, History, Heart,
  // Home
  Handshake, TreeDeciduous,
  // Manufacturing
  Clock, Maximize, Wallet,
  // Fallback
  HelpCircle, Box
}
```

**Visual:**
```
┌────────────────────────────────────────────────────────┐
│                     HEADING                            │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │  [Icon]  │  │  [Icon]  │  │  [Icon]  │            │
│  │  Title   │  │  Title   │  │  Title   │            │
│  │  Desc... │  │  Desc... │  │  Desc... │            │
│  └──────────┘  └──────────┘  └──────────┘            │
└────────────────────────────────────────────────────────┘
```

---

### 3.3 EditorialTextBlock

**File:** `components/blocks/EditorialTextBlock.tsx`
**Purpose:** Rich text content with optional two-column layout

**Props:**
```typescript
interface EditorialTextBlockProps {
  data: {
    heading?: string
    layout?: 'single' | 'two-column'
    backgroundColor?: 'white' | 'cream' | 'black'
    contentLeft?: PortableTextContent | string
    contentRight?: PortableTextContent | string
  }
}
```

**Visual:**
```
Single Column:                 Two Column:
┌────────────────────┐         ┌────────────────────────┐
│     HEADING        │         │       HEADING          │
│                    │         │                        │
│  Lorem ipsum dolor │         │ Left text  │ Right text│
│  sit amet...       │         │ content... │ content...│
└────────────────────┘         └────────────────────────┘
```

---

### 3.4 CTABlock

**File:** `components/blocks/CTABlock.tsx`
**Purpose:** Full-width call-to-action sections

**Props:**
```typescript
interface CTABlockProps {
  data: {
    heading?: string
    subheading?: string
    buttonText?: string
    buttonLink?: string
    theme?: 'light' | 'dark'
  }
}
```

**Themes:**
- `light`: Cream background, black text
- `dark`: Black background, white text

**Visual:**
```
┌────────────────────────────────────────────────────────┐
│                                                        │
│                      HEADING                           │
│                   Subheading text                     │
│                                                        │
│                   [ Button ]                          │
│                                                        │
└────────────────────────────────────────────────────────┘
```

---

### 3.5 StatsBlock

**File:** `components/blocks/StatsBlock.tsx`
**Purpose:** Display key statistics with large numbers

**Props:**
```typescript
interface StatsBlockProps {
  data: {
    items?: Array<{
      value: string
      label: string
    }>
  }
}
```

---

### 3.6 TestimonialBlock

**File:** `components/blocks/TestimonialBlock.tsx`
**Purpose:** Customer testimonial quotes

**Props:**
```typescript
interface TestimonialBlockProps {
  data: {
    quote: string
    author: string
    role?: string
    company?: string
  }
}
```

---

### 3.7 ImageSectionBlock

**File:** `components/blocks/ImageSectionBlock.tsx`
**Purpose:** Full-width or contained image sections

---

## 4. New Section Components (To Create)

### 4.1 OakSlabsSection

**File:** `components/sections/OakSlabsSection.tsx`
**Purpose:** Dedicated section for primary product showcase

**Structure:**
```typescript
interface OakSlabsSectionProps {
  id?: string  // Default: "oak-slabs"
  data?: SanityPageData
}
```

**Recommended Content:**
- Hero-style headline: "Solid Oak. Industrial Scale."
- 3-4 feature cards highlighting key benefits
- Product imagery (placeholder or Sanity)
- CTA: "Request a Quote"

**Design Spec:**
```
┌────────────────────────────────────────────────────────┐
│                    #oak-slabs                          │
│  ┌──────────────────────────────────────────────────┐ │
│  │           SOLID OAK. INDUSTRIAL SCALE.           │ │
│  │         Premium solid oak slab manufacturing     │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐            │
│  │ [Image]  │  │ [Image]  │  │ [Image]  │            │
│  │ Feature  │  │ Feature  │  │ Feature  │            │
│  │ Desc...  │  │ Desc...  │  │ Desc...  │            │
│  └──────────┘  └──────────┘  └──────────┘            │
│                                                        │
│                [ Request a Quote ]                    │
└────────────────────────────────────────────────────────┘
```

---

### 4.2 WarehouseSection

**File:** `components/sections/WarehouseSection.tsx`
**Purpose:** Showcase warehouse and logistics capabilities

**Structure:**
```typescript
interface WarehouseSectionProps {
  id?: string  // Default: "warehouse"
  data?: SanityPageData
}
```

**Design Spec:**
```
┌────────────────────────────────────────────────────────┐
│                    #warehouse                          │
│  ┌──────────────────────────────────────────────────┐ │
│  │        STORAGE & LOGISTICS EXCELLENCE            │ │
│  └──────────────────────────────────────────────────┘ │
│                                                        │
│  ┌─────────────────────┐  ┌─────────────────────────┐ │
│  │                     │  │ Modern warehouse        │ │
│  │   [Warehouse        │  │ facilities with         │ │
│  │    Image]           │  │ capacity for large      │ │
│  │                     │  │ volume orders...        │ │
│  └─────────────────────┘  └─────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

---

### 4.3 Section Wrapper Components

Each existing page should be converted to a section component:

| Current Page | New Section | ID |
|--------------|-------------|-----|
| `about/page.tsx` | `AboutSection.tsx` | `#about` |
| `products/page.tsx` | `ProductsSection.tsx` | `#products` |
| `manufacturing/page.tsx` | `ManufacturingSection.tsx` | `#manufacturing` |
| `sustainability/page.tsx` | `SustainabilitySection.tsx` | `#sustainability` |
| `contact/page.tsx` | `ContactSection.tsx` | `#contact` |

---

## 5. Navigation Component Updates

### 5.1 Current State

```typescript
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/manufacturing', label: 'Manufacturing' },
  { href: '/sustainability', label: 'Sustainability' },
  { href: '/contact', label: 'Contact' },
]
```

### 5.2 Target State

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

### 5.3 Enhanced Features

**Scroll Spy Implementation:**
```typescript
// Track active section
const [activeSection, setActiveSection] = useState('hero')

// Highlight active nav item
className={cn(
  "transition-colors duration-200",
  activeSection === link.id
    ? "text-moooi-gold"
    : "text-moooi-charcoal hover:text-moooi-gold"
)}
```

**Mobile Menu Behavior:**
- Close menu after anchor click
- Smooth scroll to section

---

## 6. Animation Patterns

### 6.1 Framer Motion Standards

**Fade-in on viewport entry:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
>
```

**Staggered children:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.8,
    delay: index * 0.2,  // Stagger by 200ms
    ease: [0.16, 1, 0.3, 1],
  }}
>
```

### 6.2 CSS Animations

**Smooth scroll:**
```css
html {
  scroll-behavior: smooth;
}
```

**Scroll offset for sticky header:**
```css
section[id] {
  scroll-margin-top: 80px;
}
```

**Custom scrollbar:**
```css
::-webkit-scrollbar-thumb {
  background: #C9A961;
  border-radius: 4px;
}
```

### 6.3 Hover Effects

| Element | Effect | Class |
|---------|--------|-------|
| Navigation links | Color transition | `hover:text-moooi-gold transition-colors duration-200` |
| CTA buttons | Background/color swap | `hover:bg-white hover:text-black transition-all duration-500` |
| Feature cards | Lift effect | `hover-lift` (custom) |
| Images | Scale | `hover-scale` (custom) |

---

## 7. Button Styles

### 7.1 Primary Button (Rounded)

```typescript
<Link
  href={ctaLink}
  className="inline-block bg-moooi-charcoal text-white px-10 py-4 rounded-full font-medium hover:bg-moooi-gold hover:text-moooi-charcoal transition-all duration-300 transform hover:scale-105"
>
  {ctaText}
</Link>
```

### 7.2 Secondary Button (Bordered)

```typescript
<Link
  href={buttonLink}
  className="inline-block px-12 py-5 border-2 border-black text-lg font-semibold transition-all duration-500 hover:bg-black hover:text-white"
>
  {buttonText}
</Link>
```

### 7.3 Button Variants

| Variant | Background | Border | Text | Hover |
|---------|------------|--------|------|-------|
| Primary Dark | Charcoal | - | White | Gold bg, Charcoal text |
| Primary Light | White | - | Charcoal | Gold bg |
| Secondary Dark | Transparent | Black | Black | Black bg, White text |
| Secondary Light | Transparent | White | White | White bg, Black text |

---

## 8. Icon Usage

### 8.1 Icon Library
**Source:** Lucide React
**Size:** Standard 16x16 icons

### 8.2 Icon Guidelines

| Context | Size | Class |
|---------|------|-------|
| Feature cards | 64px (w-16 h-16) | `w-16 h-16` |
| Inline icons | 24px (w-6 h-6) | `w-6 h-6` |
| Small icons | 16px (w-4 h-4) | `w-4 h-4` |

### 8.3 Adding New Icons

1. Import from `lucide-react`
2. Add to `iconMap` in `FeaturesGridBlock.tsx`
3. Reference by name in Sanity content

---

## 9. Responsive Patterns

### 9.1 Grid Layouts

```typescript
// Feature grid columns
const gridCols = {
  '2': 'md:grid-cols-2',
  '3': 'md:grid-cols-3',
  '4': 'md:grid-cols-4',
}

// Default: single column on mobile, configured columns on desktop
<div className={`grid ${gridCols} gap-12`}>
```

### 9.2 Navigation

- **Desktop (md+):** Horizontal nav, visible links
- **Mobile:** Hamburger menu, vertical dropdown

### 9.3 Hero Heights

- **Desktop:** 90vh (default), 50vh (small)
- **Mobile:** Same ratios, adjusted typography

---

## 10. Accessibility

### 10.1 Requirements

- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast

### 10.2 Implementation

| Feature | Implementation |
|---------|----------------|
| Focus states | Default browser focus, enhanced for interactive elements |
| ARIA labels | Added to hamburger menu, buttons |
| Skip links | Consider adding "Skip to content" |
| Motion | Respect `prefers-reduced-motion` |

---

## 11. Component Checklist

### 11.1 Existing (Reuse)

- [x] HeroBlock
- [x] FeaturesGridBlock
- [x] EditorialTextBlock
- [x] CTABlock
- [x] StatsBlock
- [x] TestimonialBlock
- [x] ImageSectionBlock
- [x] BlockRenderer
- [x] Navigation
- [x] Footer
- [x] Hero

### 11.2 To Create

- [ ] OakSlabsSection
- [ ] WarehouseSection
- [ ] AboutSection
- [ ] ProductsSection
- [ ] ManufacturingSection
- [ ] SustainabilitySection
- [ ] ContactSection
- [ ] BaseSection (optional wrapper)

### 11.3 To Modify

- [ ] Navigation (anchor links, scroll spy)
- [ ] Footer (anchor links)
- [ ] globals.css (scroll-margin-top)

---

## Appendix A: Tailwind Classes Reference

### Custom Utility Classes

```css
/* Content blocks */
.content-block { @apply px-6 md:px-12 lg:px-20; }
.content-narrow { @apply max-w-3xl mx-auto; }
.content-wide { @apply max-w-7xl mx-auto; }

/* Typography */
.display-large { @apply text-4xl md:text-6xl lg:text-7xl font-display font-bold; }
.display-medium { @apply text-3xl md:text-4xl lg:text-5xl font-display font-bold; }

/* Background helpers */
.bg-cream { @apply bg-moooi-cream; }
.bg-off-white { @apply bg-moooi-sand; }
```

---

## Appendix B: Related Documents

- PRD: `prd-timber-international-spa.md`
- Architecture: `architecture-timber-international.md`
- Epic: `epic-001-spa-restructure.md`
