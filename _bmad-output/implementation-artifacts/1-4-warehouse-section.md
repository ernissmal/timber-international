---
story_id: STORY-001-04
title: "Warehouse Section"
epic_id: EPIC-001
priority: P1
points: 3
status: ready-for-dev
created: 2026-01-02
assigned_to: null
dependencies: []
---

# Story 1-4: Warehouse Section

## User Story
As a visitor, I want to see the Warehouse section so I understand storage/logistics capabilities

## Description
Create a new Warehouse section component that showcases the company's warehouse facilities and logistics capabilities. The component should display facility features with icons and animations, support both Sanity CMS content and fallback UI, and integrate seamlessly with the SPA scroll navigation system.

## Acceptance Criteria
- [x] Section displays with id="warehouse" and scroll-mt-20 for navigation offset
- [x] Section includes aria-label="Warehouse" for accessibility
- [x] Brief text content about warehouse facilities (headline + description)
- [x] Visual representation using Lucide icons (Warehouse, Truck, Clock)
- [x] Three feature cards with staggered animations
- [x] Responsive design (mobile-first approach)
- [x] BlockRenderer integration for Sanity CMS content
- [x] Graceful fallback when no Sanity content exists
- [x] Framer Motion animations with viewport: { once: true }
- [x] White background (no background color override in fallback)

## Content Requirements

### Headline
"Storage & Logistics Excellence"

### Description
"Modern warehouse facilities ensure your timber is stored properly and shipped efficiently to meet your production schedules."

### Features Array (3 items)
1. **10,000m² Storage**
   - Icon: Warehouse (Lucide)
   - Description: "Climate-controlled facilities for optimal timber preservation."

2. **Pan-European Delivery**
   - Icon: Truck (Lucide)
   - Description: "Reliable logistics network covering all major markets."

3. **48-Hour Dispatch**
   - Icon: Clock (Lucide)
   - Description: "In-stock items shipped within 2 business days."

## Technical Specifications

### File to Create
`components/sections/WarehouseSection.tsx`

### Component Structure
```typescript
'use client'

import { motion } from 'framer-motion'
import { BlockRenderer } from '@/components/blocks'
import { Warehouse, Truck, Clock } from 'lucide-react'
import type { SanityPage } from '@/lib/sanity'

interface WarehouseSectionProps {
  data: SanityPage | null
}
```

### Icon Imports
```typescript
import { Warehouse, Truck, Clock } from 'lucide-react'
```

### Features Array Definition
```typescript
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
```

### Animation Pattern
**Individual Item Animations with Staggered Delays:**
```typescript
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
```

**Key Animation Details:**
- Initial state: `opacity: 0, y: 30` (fade in from below)
- Animate to: `opacity: 1, y: 0` (fully visible at original position)
- Viewport trigger: `{ once: true }` (animation fires only once)
- Duration: 0.6 seconds
- Stagger delay: `index * 0.15` (150ms between each feature card)
- Total stagger: 0ms, 150ms, 300ms for the three cards

### Props Interface
```typescript
interface WarehouseSectionProps {
  data: SanityPage | null
}
```

### Section Structure
- Main section element with id="warehouse" and scroll-mt-20
- aria-label="Warehouse" for accessibility
- Conditional rendering: Sanity content via BlockRenderer OR fallback UI
- Fallback includes: container div with py-20 px-6 max-w-6xl mx-auto
- Header block with heading and description (centered, animated)
- Three-column grid on desktop (md:grid-cols-3), single column on mobile
- Feature cards with centered content

### Styling Details
- **Section ID:** `id="warehouse"`
- **Scroll Margin:** `scroll-mt-20` (80px offset for sticky header)
- **Background:** White (default, no bg class in fallback)
- **Container:** `py-20 px-6 max-w-6xl mx-auto`
- **Grid:** `grid md:grid-cols-3 gap-8`
- **Feature Cards:** `text-center p-8`
- **Icons:** `w-12 h-12 mx-auto mb-4 text-moooi-gold`
- **Feature Titles:** `text-2xl font-bold mb-3`
- **Feature Descriptions:** `text-moooi-slate`

### Heading Styles
- **Main Heading:** `text-4xl md:text-5xl font-display font-bold mb-6`
- **Description:** `text-xl text-moooi-slate max-w-3xl mx-auto`
- **Header Container:** `text-center mb-16`

### Header Animation
```typescript
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  className="text-center mb-16"
>
```

## Implementation Steps

1. **Create component file:** `components/sections/WarehouseSection.tsx`
2. **Add 'use client' directive** at the top for client-side interactivity
3. **Import dependencies:**
   - motion from 'framer-motion'
   - BlockRenderer from '@/components/blocks'
   - Lucide icons: Warehouse, Truck, Clock
   - SanityPage type from '@/lib/sanity'
4. **Define WarehouseSectionProps interface**
5. **Define features array** with 3 items (icon, title, description)
6. **Create component function** with data prop
7. **Render section element** with id="warehouse" and scroll-mt-20
8. **Add conditional rendering:**
   - If data?.blocks exists and has length > 0: render BlockRenderer
   - Else: render fallback UI
9. **Implement fallback UI:**
   - Container div with padding and max-width
   - Animated header with heading and description
   - Grid of 3 feature cards with map iteration
   - Each card with icon, title, description
   - Staggered animation using index delay
10. **Add to sections index export** in `components/sections/index.ts`

## Dependencies
- Framer Motion 11.x (already installed)
- Lucide React (already installed)
- BlockRenderer component (available in codebase)
- SanityPage type (defined in lib/sanity.ts)
- Tailwind CSS with moooi color palette

## Testing Checklist

### Visual Testing
- [ ] Section renders with correct id="warehouse"
- [ ] Heading displays: "Storage & Logistics Excellence"
- [ ] Description displays below heading
- [ ] Three feature cards render in grid layout
- [ ] Icons display correctly (Warehouse, Truck, Clock)
- [ ] Icons are gold color (text-moooi-gold)
- [ ] Icons are properly sized (w-12 h-12)
- [ ] White background (no background color)

### Responsive Testing
- [ ] Mobile (320px): Single column layout, cards stack vertically
- [ ] Tablet (768px): Three-column grid (md:grid-cols-3)
- [ ] Desktop (1024px+): Maintains three-column layout
- [ ] Content max-width constrained to 6xl (72rem / 1152px)

### Animation Testing
- [ ] Header animates on scroll into view (fade in from bottom)
- [ ] Feature cards animate with staggered delays
- [ ] First card: no delay (0ms)
- [ ] Second card: 150ms delay
- [ ] Third card: 300ms delay
- [ ] Animations fire only once (viewport: { once: true })
- [ ] Animation doesn't re-trigger on scroll back up

### Integration Testing
- [ ] Navigation link to #warehouse scrolls correctly
- [ ] Section appears in correct position in SPA (after Oak Slabs, before Products)
- [ ] Scroll spy highlights "Warehouse" nav link when section is active
- [ ] 80px scroll offset prevents content from hiding under nav

### Accessibility Testing
- [ ] Section has aria-label="Warehouse"
- [ ] Keyboard navigation works (Tab through content)
- [ ] Screen reader announces section correctly
- [ ] Focus indicators visible on interactive elements (if any)

### CMS Integration Testing
- [ ] If Sanity warehouse page has blocks, BlockRenderer displays them
- [ ] If Sanity warehouse page is null, fallback UI displays
- [ ] If Sanity warehouse page has empty blocks array, fallback UI displays
- [ ] No console errors when data is null or undefined

## Definition of Done
- [ ] WarehouseSection.tsx file created in components/sections/
- [ ] Component includes 'use client' directive
- [ ] All Lucide icons imported correctly (Warehouse, Truck, Clock)
- [ ] Features array defined with 3 items
- [ ] Section has id="warehouse" and scroll-mt-20
- [ ] Section has aria-label="Warehouse"
- [ ] BlockRenderer integration for Sanity content
- [ ] Fallback UI implemented with all content
- [ ] Framer Motion animations on header and feature cards
- [ ] Staggered animation delays (0ms, 150ms, 300ms)
- [ ] Responsive grid layout (single column → 3 columns)
- [ ] Component exported from components/sections/index.ts
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] Visual testing passed on mobile, tablet, desktop
- [ ] Animation testing confirms once-only behavior
- [ ] Accessibility testing passed
- [ ] Integration with SPA page confirmed

## Notes
- This section uses individual item animations with delay offsets instead of container/item variants (unlike OakSlabsSection which uses stagger container pattern)
- Both approaches achieve staggered animations, this is just a simpler pattern for 3 items
- The delay pattern: `delay: index * 0.15` creates 150ms spacing between cards
- Icons are from Lucide React, a tree-shakeable icon library already in the project
- Icon components are passed as values in the features array, then rendered as JSX: `<feature.icon />`
- The white background (no bg class) allows the section to blend with Products section below
- Max-width is 6xl (1152px) to accommodate 3 cards comfortably with 8-unit gap
- Feature cards have `p-8` padding but no background/border in fallback (minimalist design)
- If client wants cards with backgrounds, add `bg-white shadow-sm rounded-2xl` classes

## Development Context
This component is part of the SPA restructure epic (EPIC-001). It will be rendered in the main page component (`app/(frontend)/page-client.tsx`) as the fourth section, after Oak Slabs and before Products. The component follows the same pattern as other section components:
1. Accept `data: SanityPage | null` prop
2. Render BlockRenderer if Sanity content exists
3. Render fallback UI if content is null/empty
4. Use Framer Motion for scroll-triggered animations
5. Include proper semantic HTML and ARIA labels

## Related Files
- `components/sections/OakSlabsSection.tsx` - Similar pattern with feature grid
- `components/sections/index.ts` - Must export this component
- `app/(frontend)/page-client.tsx` - Renders this component
- `lib/sanity.ts` - Defines SanityPage type
- `components/blocks/BlockRenderer.tsx` - Renders Sanity blocks
- Tech-spec Task 8 (lines 728-805) - Complete implementation reference
