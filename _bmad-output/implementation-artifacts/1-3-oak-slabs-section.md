---
story_id: STORY-001-03
epic_id: EPIC-001
title: 'Oak Slabs Section Component'
status: ready-for-dev
priority: P0
points: 5
created: 2026-01-02
tech_spec_reference: 'tech-spec-spa-restructure.md (Task 7)'
dependencies:
  - None (can be developed independently)
related_stories:
  - STORY-001-02 (Main Page consolidation will integrate this section)
  - STORY-001-07 (Sanity content for oak-slabs page)
---

# Story 1-3: Oak Slabs Section

**Story ID:** STORY-001-03
**Epic:** EPIC-001 - Website SPA Restructure
**Title:** As a visitor, I want to see the Oak Slabs product section so I understand the primary offering
**Priority:** P0 (Critical - Primary Business Focus)
**Story Points:** 5
**Status:** Ready for Development

---

## User Story

**As a** potential customer visiting the website
**I want** to see a dedicated Oak Slabs product section with clear features and benefits
**So that** I can understand the primary product offering and request a quote

---

## Business Context

Oak Slabs represent Timber International's **primary business focus** and must be prominently featured on the single-page website. This section showcases solid oak slab products with emphasis on:

- Industrial-scale manufacturing capabilities
- Custom specifications and precision tolerances
- Quality certifications (FSC, kiln-dried)
- Clear call-to-action for quote requests

This is a **NEW section** being added to the website as part of the SPA restructure.

---

## Acceptance Criteria

### Core Functionality

- [ ] **AC-1:** Section renders with `id="oak-slabs"` for anchor navigation
- [ ] **AC-2:** Section has `scroll-mt-20` class for sticky header offset (80px)
- [ ] **AC-3:** Section displays heading introducing oak slab products
- [ ] **AC-4:** Three product features are highlighted: Custom Dimensions, Kiln Dried, FSC Certified
- [ ] **AC-5:** CTA button links to `#contact` section (not `/contact` route)
- [ ] **AC-6:** Section uses `bg-moooi-sand` background color for visual distinction

### Content Integration

- [ ] **AC-7:** When Sanity contains content for slug `oak-slabs`, display it via BlockRenderer
- [ ] **AC-8:** When Sanity content is missing/null, display fallback UI with hardcoded content
- [ ] **AC-9:** Fallback content includes industrial-focused messaging (see Content Requirements)

### Animations

- [ ] **AC-10:** Heading uses standard section animation (fade-in from bottom, 0.8s duration)
- [ ] **AC-11:** Feature cards use staggered animation with `containerVariants` and `itemVariants`
- [ ] **AC-12:** Stagger delay is 0.15s between cards
- [ ] **AC-13:** All animations use `viewport: { once: true }` to fire only once per session
- [ ] **AC-14:** Animation curve uses `[0.16, 1, 0.3, 1]` for consistency with other sections

### Responsive Design

- [ ] **AC-15:** Feature cards display in single column on mobile (< 768px)
- [ ] **AC-16:** Feature cards display in 3-column grid on desktop (>= 768px) with `md:grid-cols-3`
- [ ] **AC-17:** Section maintains proper spacing on all breakpoints (320px, 768px, 1024px, 1440px)

### Accessibility

- [ ] **AC-18:** Section has `aria-label="Oak Slabs"` for screen readers
- [ ] **AC-19:** CTA button has sufficient color contrast (moooi-gold bg, white text)
- [ ] **AC-20:** Feature cards use semantic heading hierarchy (H3 for card titles)

---

## Content Requirements

### Fallback Content (When Sanity Data is Null)

**Main Heading:**
```
Solid Oak. Industrial Scale.
```

**Subheading:**
```
Premium solid oak slabs manufactured to your specifications.
Consistent quality, reliable supply, competitive pricing.
```

**Feature Cards:**

1. **Custom Dimensions**
   - Description: "Cut to your exact specifications with precision CNC machinery. Tolerances within ±0.5mm."

2. **Kiln Dried**
   - Description: "Moisture content controlled to 8-12% for stability and longevity. Documented drying records available."

3. **FSC Certified**
   - Description: "Responsibly sourced from sustainable European forests. Chain of custody documentation provided."

**CTA Button:**
- Text: "Request Specifications"
- Link: `#contact`
- Style: `bg-moooi-gold text-white px-8 py-4 rounded-full`

---

## Technical Implementation

### Component Structure

**File:** `components/sections/OakSlabsSection.tsx`

**Component Type:** Client Component (`'use client'` directive required for Framer Motion)

**Props Interface:**
```typescript
interface OakSlabsSectionProps {
  data: SanityPage | null
}
```

**Imports:**
```typescript
import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import type { SanityPage } from '@/lib/sanity'
```

### Animation Pattern

**Container Variants (for stagger effect on grid):**
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}
```

**Item Variants (for individual feature cards):**
```typescript
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}
```

**Standard Section Animation (for heading):**
```typescript
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-100px' }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
```

### Layout Specifications

**Section Wrapper:**
- Background: `bg-moooi-sand`
- Padding: `py-20 px-6`
- ID: `oak-slabs`
- Scroll offset: `scroll-mt-20`
- Aria label: `aria-label="Oak Slabs"`

**Content Container:**
- Max width: `max-w-6xl`
- Centering: `mx-auto`

**Feature Grid:**
- Base: Single column (mobile-first)
- Desktop: `md:grid-cols-3`
- Gap: `gap-8`

**Feature Card:**
- Background: `bg-white`
- Padding: `p-8`
- Border radius: `rounded-2xl`
- Shadow: `shadow-sm`

---

## Developer Notes

### Integration with BlockRenderer

The component follows the **standard section pattern** used throughout the SPA:

1. **Check if Sanity data exists:** `data?.blocks && data.blocks.length > 0`
2. **If yes:** Render `<BlockRenderer blocks={data.blocks} />`
3. **If no:** Render fallback UI with animations

This pattern ensures:
- Content editors can manage section content via Sanity Studio
- Developers have working UI even before Sanity content is created
- Graceful degradation if Sanity query fails

### Sanity Content Structure

**Expected Page Document:**
- **Slug:** `oak-slabs`
- **Type:** `page`
- **Blocks:** Array of block components (hero, features, CTA, etc.)

**Query Reference:**
The `allSectionsQuery` in `sanity/lib/queries.ts` fetches this as:
```groq
"oakSlabs": *[_type == "page" && slug.current == "oak-slabs"][0] {
  _id,
  title,
  "slug": slug.current,
  description,
  seo { title, description, ogImage },
  blocks[] { /* full projection */ }
}
```

**Transformation:**
The `getAllSections()` function in `lib/sanity.ts` transforms blocks using the existing `transformSanityBlocks()` function which:
- Converts `_type` to `__typename` (e.g., `hero` → `PageBlocksHero`)
- Converts image `asset._ref` to URLs via `urlFor()` helper

### Framer Motion Context

**Why Stagger Pattern for This Section?**
- Oak Slabs has a **grid of feature cards** (3 items)
- Stagger creates a more dynamic, professional reveal
- Different from single-content sections (About, Products) which use inline animation props

**Stagger Configuration Rationale:**
- **0.15s delay:** Sweet spot between too fast (chaotic) and too slow (sluggish)
- **Stagger on `visible` state:** Cards animate in sequence when grid enters viewport
- **`viewport.margin: '-50px'`:** Triggers animation slightly before grid fully visible
- **`once: true`:** Animation fires once per session, not on every scroll

**Consistent Easing:**
All sections use the same cubic-bezier curve `[0.16, 1, 0.3, 1]` for visual consistency across the SPA.

### CTA Link Pattern

**IMPORTANT:** CTA must use `<a>` tag with anchor href, NOT `<Link>` component:

```tsx
// ✅ CORRECT
<a href="#contact" className="...">Request Specifications</a>

// ❌ WRONG (Link component doesn't work correctly with anchor hrefs)
<Link href="#contact">Request Specifications</Link>
```

This matches the pattern established in `HeroSection.tsx` fallback (see tech-spec Task 5).

### Color Palette Reference

**Section Background:**
- `bg-moooi-sand` (#F5EFE7) - warm, neutral tone

**Feature Cards:**
- `bg-white` - clean, professional

**CTA Button:**
- Background: `bg-moooi-gold` (#D4AF37)
- Text: `text-white`
- Hover: `hover:bg-moooi-gold/90` (90% opacity on hover)

**Text Colors:**
- Primary: Default (moooi-charcoal/#2C2C2C)
- Secondary: `text-moooi-slate` (#6B7280)

---

## Testing Guidelines

### Manual Testing Checklist

**Functional Tests:**
1. ✅ Section renders with correct ID (`oak-slabs`)
2. ✅ Anchor navigation from nav menu scrolls to this section
3. ✅ Scroll offset prevents content from hiding under sticky nav
4. ✅ CTA button navigates to `#contact` section
5. ✅ Feature cards display correctly on mobile (stacked) and desktop (3 columns)

**Content Tests:**
1. ✅ **With Sanity content:** BlockRenderer displays Sanity blocks
2. ✅ **Without Sanity content:** Fallback UI displays with hardcoded content
3. ✅ Fallback content matches specifications (3 feature cards, correct text)

**Animation Tests:**
1. ✅ Heading fades in from bottom on first scroll into view
2. ✅ Feature cards animate in sequence with 0.15s stagger
3. ✅ CTA button animates after cards (0.4s delay)
4. ✅ Animations only fire once (scroll up/down doesn't re-trigger)
5. ✅ Reduced motion preference disables animations (if supported)

**Responsive Tests:**
1. ✅ **Mobile (320px):** Single column layout, readable text
2. ✅ **Tablet (768px):** 3-column grid appears
3. ✅ **Desktop (1440px):** Layout maintains max-width container
4. ✅ Touch targets (CTA button) are minimum 44x44px

**Accessibility Tests:**
1. ✅ Screen reader announces "Oak Slabs" section label
2. ✅ Keyboard navigation: Tab through feature cards and CTA
3. ✅ Color contrast meets WCAG AA (use browser DevTools)
4. ✅ Heading hierarchy: H2 for section title, H3 for card titles

**Browser Tests:**
1. ✅ Chrome (latest)
2. ✅ Firefox (latest)
3. ✅ Safari (latest)
4. ✅ Edge (latest)

### Performance Validation

**Metrics to Check:**
- Section renders without layout shift (CLS < 0.1)
- Animations run at 60fps (use Chrome Performance tab)
- No console errors or warnings
- Image optimization if Sanity images are added

---

## Implementation Steps

Follow these steps in order for efficient implementation:

### Step 1: Create Component File
```bash
# Ensure sections directory exists
mkdir -p components/sections

# Create the component file
touch components/sections/OakSlabsSection.tsx
```

### Step 2: Implement Component Structure
1. Add `'use client'` directive at top
2. Import dependencies (motion, BlockRenderer, types)
3. Define props interface (`OakSlabsSectionProps`)
4. Define animation variants (containerVariants, itemVariants)
5. Implement component function with conditional rendering logic

### Step 3: Implement Fallback UI
1. Create section wrapper with correct ID and classes
2. Add animated heading with motion.div
3. Add feature cards grid with stagger animation
4. Add CTA button with link to `#contact`

### Step 4: Integrate BlockRenderer
1. Add conditional check for `data?.blocks`
2. Render `<BlockRenderer blocks={data.blocks} />` when data exists
3. Ensure fallback is in else clause

### Step 5: Test Locally
1. Run `npm run dev`
2. Navigate to `/#oak-slabs`
3. Verify rendering (will show fallback until Sanity content exists)
4. Test animations by scrolling into view

### Step 6: Export from Index
1. Add export to `components/sections/index.ts`:
   ```typescript
   export { default as OakSlabsSection } from './OakSlabsSection'
   ```

### Step 7: Integration (STORY-001-02 Dependency)
**Note:** This component will be integrated into the main page in STORY-001-02. For this story, focus only on creating the standalone component.

---

## Complete Implementation Code

**File:** `components/sections/OakSlabsSection.tsx`

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

---

## Files to Create

| File Path | Type | Purpose |
|-----------|------|---------|
| `components/sections/OakSlabsSection.tsx` | Component | Main section component with BlockRenderer integration and fallback UI |

---

## Files to Modify

**None.** This story creates a new standalone component. Integration happens in STORY-001-02.

---

## Dependencies

### Story Dependencies

**Upstream (Must Complete Before):**
- None - this story can be developed independently

**Downstream (Depends on This Story):**
- **STORY-001-02** - Main Page Section Consolidation will import and render this component
- **STORY-001-07** - Sanity content creation for oak-slabs page (optional - fallback exists)

### Technical Dependencies

**Required Packages (Already Installed):**
- `framer-motion` (v11.x) - for animations
- `@/components/blocks` - BlockRenderer component
- `@/lib/sanity` - SanityPage type definition

**Required Files (Already Exist):**
- `lib/sanity.ts` - type definitions
- `components/blocks/index.ts` - BlockRenderer export
- `app/globals.css` - Tailwind utility classes

---

## Related Documentation

- **Tech Spec:** `_bmad-output/implementation-artifacts/tech-spec-spa-restructure.md` (Task 7)
- **Epic:** `_bmad-output/planning-artifacts/epic-001-spa-restructure.md` (Story 3)
- **PRD:** `_bmad-output/planning-artifacts/prd-timber-international-spa.md` (FR-004)
- **Component Library:** `_bmad-output/planning-artifacts/component-library.md` (Color palette, typography)

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|---------|------------|
| Sanity content not created | Medium | Low | Fallback UI provides complete experience |
| Animation performance issues | Low | Medium | Use `viewport: { once: true }` to fire animations once |
| CTA link doesn't work | Low | High | Test anchor navigation thoroughly; use `<a>` not `<Link>` |
| Responsive layout breaks | Low | Medium | Test at all breakpoints (320px, 768px, 1024px, 1440px) |
| Heading hierarchy issues | Low | Low | Follow semantic HTML: H2 for section, H3 for cards |

---

## Success Metrics

### Definition of Done

- [ ] Component file created at `components/sections/OakSlabsSection.tsx`
- [ ] Component exported from `components/sections/index.ts`
- [ ] All 20 acceptance criteria met
- [ ] Manual testing checklist completed
- [ ] Code follows existing patterns (BlockRenderer integration, animation variants)
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] Responsive design verified on mobile, tablet, desktop
- [ ] Accessibility attributes present (aria-label, semantic HTML)
- [ ] CTA button links to `#contact` (not `/contact`)

### Quality Checklist

- [ ] **Code Quality:** Follows TypeScript best practices
- [ ] **Consistency:** Matches animation patterns from tech-spec
- [ ] **Accessibility:** WCAG 2.1 AA compliant
- [ ] **Performance:** Animations run smoothly at 60fps
- [ ] **Maintainability:** Clear prop interface, commented code where needed
- [ ] **Testability:** Easy to test with different data states (null, with blocks)

---

## Notes

### Why Oak Slabs is P0 Priority

This section showcases Timber International's **primary business focus**. It's the most important product offering and must be prominently featured on the homepage. The staggered animation and dedicated background color (`bg-moooi-sand`) ensure it stands out from other sections.

### Content Considerations

The fallback content is **industrial-focused** and emphasizes:
1. **Scale:** "Industrial Scale" in heading
2. **Precision:** "±0.5mm tolerances" in Custom Dimensions
3. **Quality:** "Documented drying records" in Kiln Dried
4. **Compliance:** "Chain of custody documentation" in FSC Certified

This messaging targets B2B buyers (furniture manufacturers) rather than end consumers.

### Future Enhancements (Out of Scope)

- Image gallery of oak slab products
- Interactive specification calculator
- Case studies or client testimonials
- Video of manufacturing process
- Download spec sheet button

These enhancements should be considered for future sprints after MVP launch.

---

**Status:** Ready for Development
**Created:** 2026-01-02
**Story Points:** 5
**Estimated Time:** 4-5 hours
