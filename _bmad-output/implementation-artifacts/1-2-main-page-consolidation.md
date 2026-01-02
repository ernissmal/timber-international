---
story_id: STORY-001-02
epic_id: EPIC-001
title: Main Page Section Consolidation
status: ready-for-dev
priority: P0
points: 5
created: 2026-01-02
updated: 2026-01-02
assignee: unassigned
tech_spec: _bmad-output/implementation-artifacts/tech-spec-spa-restructure.md
---

# Story 1-2: Main Page Section Consolidation

## User Story

**AS** a developer
**I NEED TO** consolidate all page content into a single page component
**SO THAT** the website functions as a single-page application with smooth scrolling between sections

## Business Context

The current MPA (Multi-Page Application) structure creates friction in the user journey with page reloads between sections. This story consolidates all content into a single scrollable page, laying the foundation for the SPA restructure that will improve user experience and engagement.

## Acceptance Criteria

### Sections & Content

- **AC-1:** Given I load the homepage, when the page renders, then all 8 sections appear in sequential order: Hero, About, Oak Slabs, Warehouse, Products, Manufacturing, Sustainability, Contact
- **AC-2:** Given Sanity contains content for a section, when the section renders, then it displays the Sanity content via BlockRenderer with all blocks transformed correctly
- **AC-3:** Given Sanity has no content for a section, when the section renders, then it displays fallback placeholder content with appropriate styling and Framer Motion animations
- **AC-4:** Given any section is rendered, when I inspect its HTML, then it has the correct `id` attribute matching the navigation anchor (e.g., `id="oak-slabs"`)
- **AC-5:** Given any section is rendered, when I inspect its HTML, then it has `scroll-mt-20` class applied for proper scroll offset accounting for the 80px sticky header

### Data Fetching & Performance

- **AC-6:** Given I am loading the page, when all sections are fetched, then a single consolidated GROQ query is executed (not 8 separate queries)
- **AC-7:** Given the consolidated query executes, when any section data is missing from Sanity, then that section's data returns as `null` without breaking the entire page
- **AC-8:** Given the page is loading, when content is being fetched, then a loading skeleton displays with appropriate height placeholders
- **AC-9:** Given I am viewing any section, when Framer Motion animations trigger, then they only fire once per session using `viewport: { once: true }`
- **AC-10:** Given the getAllSections() function executes, when Sanity blocks are returned, then the existing transformSanityBlocks() function converts `_type` to `__typename` and image `asset._ref` to URLs

### Layout & Spacing

- **AC-11:** Given I view the consolidated page, when sections render, then appropriate spacing exists between sections (managed by section-specific padding classes)
- **AC-12:** Given I view the Oak Slabs section, when it renders, then it has a `bg-moooi-sand` background color
- **AC-13:** Given I view the Products section, when it renders, then it has a `bg-moooi-cream` background color
- **AC-14:** Given I view the Sustainability section, when it renders, then it has a `bg-moooi-sand` background color

### Error Handling

- **AC-15:** Given a section component throws a render error, when the error occurs, then the SectionErrorBoundary catches it and displays the SectionFallback component for that section only
- **AC-16:** Given a section render error occurs, when the error is logged, then it includes the section name and error details in the console
- **AC-17:** Given the getAllSections() fetch fails completely, when the error occurs, then all sections receive `null` data and display their fallback UIs gracefully

### Build & Technical

- **AC-18:** Given I run `npm run build`, when the build completes, then there are no TypeScript compilation errors
- **AC-19:** Given the main page server component executes, when it fetches data, then it uses ISR (Incremental Static Regeneration) with 60-second revalidation
- **AC-20:** Given I inspect the main page component, when reviewing the code, then the server component (`page.tsx`) handles data fetching and the client component (`page-client.tsx`) handles rendering with interactivity

## Tasks

### Task 1: Setup Infrastructure - Add Type Definitions to lib/sanity.ts

**Subtasks:**
1. Open `/Users/ernestssmalikis/Projects/timber-international/lib/sanity.ts`
2. Verify existing `SanityBlock` and `SanityPage` interfaces are present (do NOT duplicate)
3. Add the `AllSectionsData` interface after existing type definitions
4. Add the `SectionProps` interface for component props pattern
5. Save file

**Acceptance Criteria:** AC-18
**Reference:** Tech-Spec Task 3, Lines 100-129

**Dev Notes:**
```typescript
// ADD these new types to lib/sanity.ts (after existing types):

// Consolidated sections data for SPA
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

// Section component props pattern
export interface SectionProps {
  data: SanityPage | null
}
```

---

### Task 2: Setup Infrastructure - Create Consolidated GROQ Query

**Subtasks:**
1. Open `/Users/ernestssmalikis/Projects/timber-international/sanity/lib/queries.ts`
2. Add `blockProjection` constant with reusable field projection
3. Add `allSectionsQuery` with 8 section fetches using the projection
4. Ensure query structure matches existing `SanityPage` interface with nested `seo{}` object
5. Keep image fields using `asset` (NOT url) - transformation happens in lib/sanity.ts
6. Save file

**Acceptance Criteria:** AC-6, AC-7
**Reference:** Tech-Spec Task 2, Lines 280-433

**Dev Notes:**
- Query fetches all 8 sections in ONE request
- Each section uses same field projection for consistency
- Images keep `asset._ref` structure - `urlFor()` converts to URLs later
- Missing sections return as `null` (graceful degradation)

---

### Task 3: Setup Infrastructure - Add Consolidated Fetch Function

**Subtasks:**
1. Open `/Users/ernestssmalikis/Projects/timber-international/lib/sanity.ts`
2. Import `allSectionsQuery` from `@/sanity/lib/queries`
3. Create `emptySections` constant for error fallback
4. Add `getAllSections()` async function
5. Implement try-catch with proper error handling
6. Use existing `transformSanityBlocks()` for each section's blocks
7. Return empty sections object on complete failure
8. Save file

**Acceptance Criteria:** AC-6, AC-7, AC-10, AC-17, AC-19
**Reference:** Tech-Spec Task 3, Lines 437-517

**Dev Notes:**
```typescript
// Key implementation details:
// - Uses existing transformSanityBlocks() for consistency
// - Revalidate: 60 seconds (ISR)
// - Returns null for missing sections, not errors
// - Console.warn for missing data, console.error for fetch failures
```

---

### Task 4: Setup Infrastructure - Add Scroll CSS and Accessibility

**Subtasks:**
1. Open `/Users/ernestssmalikis/Projects/timber-international/app/globals.css`
2. Add scroll offset rules for all 8 section IDs (`scroll-margin-top: 5rem`)
3. Add skip-nav styles for accessibility
4. Add prefers-reduced-motion media query
5. Verify `scroll-behavior: smooth` already exists on html element
6. Save file

**Acceptance Criteria:** AC-5, AC-14
**Reference:** Tech-Spec Task 1, Lines 231-277

**Dev Notes:**
- 5rem = 80px matches nav height (h-20)
- Use specific IDs to avoid affecting nested sections in blocks
- Skip-nav appears on Tab focus for keyboard users

---

### Task 5: Create Section Components - Directory Setup

**Subtasks:**
1. Create directory `/Users/ernestssmalikis/Projects/timber-international/components/sections/`
2. Verify directory exists with `ls components/sections`

**Acceptance Criteria:** N/A (prerequisite)
**Reference:** Tech-Spec Task 4

---

### Task 6: Create Section Components - HeroSection

**Subtasks:**
1. Create `/Users/ernestssmalikis/Projects/timber-international/components/sections/HeroSection.tsx`
2. Import BlockRenderer and SanityPage type
3. Implement component with `id="hero"` and `scroll-mt-20` class
4. Add data check - if blocks exist, use BlockRenderer
5. Add inline fallback with anchor link to `#contact` (NOT Next.js Link)
6. Save file

**Acceptance Criteria:** AC-1, AC-3, AC-4, AC-5
**Reference:** Tech-Spec Task 5, Lines 529-573

**Dev Notes:**
- IMPORTANT: Fallback uses `<a>` tag, NOT `<Link>` - Link doesn't work with anchor hrefs
- Section ID matches navigation anchor
- Fallback provides complete hero content with CTA

---

### Task 7: Create Section Components - AboutSection

**Subtasks:**
1. Create `/Users/ernestssmalikis/Projects/timber-international/components/sections/AboutSection.tsx`
2. Import Framer Motion, BlockRenderer, SanityPage type
3. Implement with `id="about"` and appropriate aria-label
4. Use BlockRenderer for Sanity content, fallback with Motion animation
5. Apply standard animation pattern: `initial`, `whileInView`, `viewport: { once: true }`
6. Save file

**Acceptance Criteria:** AC-1, AC-3, AC-4, AC-5, AC-9
**Reference:** Tech-Spec Task 6, Lines 576-617

**Dev Notes:**
```typescript
// Standard animation pattern for single content blocks:
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: '-100px' }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
```

---

### Task 8: Create Section Components - OakSlabsSection (NEW)

**Subtasks:**
1. Create `/Users/ernestssmalikis/Projects/timber-international/components/sections/OakSlabsSection.tsx`
2. Import Framer Motion, BlockRenderer, SanityPage type
3. Implement with `id="oak-slabs"`, `bg-moooi-sand`, and aria-label
4. Use BlockRenderer for Sanity content
5. Add fallback with 3-column features grid (Custom Dimensions, Kiln Dried, FSC Certified)
6. Use stagger animation pattern for grid items
7. Add CTA link pointing to `#contact`
8. Save file

**Acceptance Criteria:** AC-1, AC-3, AC-4, AC-5, AC-9, AC-12
**Reference:** Tech-Spec Task 7, Lines 621-724

**Dev Notes:**
```typescript
// Stagger pattern for grids:
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}
```

---

### Task 9: Create Section Components - WarehouseSection (NEW)

**Subtasks:**
1. Create `/Users/ernestssmalikis/Projects/timber-international/components/sections/WarehouseSection.tsx`
2. Import Framer Motion, BlockRenderer, Lucide icons (Warehouse, Truck, Clock), SanityPage type
3. Implement with `id="warehouse"` and aria-label
4. Use BlockRenderer for Sanity content
5. Add fallback with 3 feature cards using Lucide icons
6. Use sequential delay animation for each feature
7. Save file

**Acceptance Criteria:** AC-1, AC-3, AC-4, AC-5, AC-9
**Reference:** Tech-Spec Task 8, Lines 728-805

**Dev Notes:**
- Uses Lucide React icons: Warehouse, Truck, Clock
- Features: 10,000m² Storage, Pan-European Delivery, 48-Hour Dispatch
- Sequential delays: index * 0.15 for stagger effect

---

### Task 10: Create Section Components - ProductsSection

**Subtasks:**
1. Create `/Users/ernestssmalikis/Projects/timber-international/components/sections/ProductsSection.tsx`
2. Import Framer Motion, BlockRenderer, SanityPage type
3. Implement with `id="products"`, `bg-moooi-cream`, and aria-label
4. Use BlockRenderer for Sanity content, fallback with Motion animation
5. Save file

**Acceptance Criteria:** AC-1, AC-3, AC-4, AC-5, AC-9, AC-13
**Reference:** Tech-Spec Task 9, Lines 809-849

---

### Task 11: Create Section Components - ManufacturingSection

**Subtasks:**
1. Create `/Users/ernestssmalikis/Projects/timber-international/components/sections/ManufacturingSection.tsx`
2. Import Framer Motion, BlockRenderer, SanityPage type
3. Implement with `id="manufacturing"` and aria-label
4. Use BlockRenderer for Sanity content, fallback with Motion animation
5. Save file

**Acceptance Criteria:** AC-1, AC-3, AC-4, AC-5, AC-9
**Reference:** Tech-Spec Task 10, Lines 853-893

---

### Task 12: Create Section Components - SustainabilitySection

**Subtasks:**
1. Create `/Users/ernestssmalikis/Projects/timber-international/components/sections/SustainabilitySection.tsx`
2. Import Framer Motion, BlockRenderer, SanityPage type
3. Implement with `id="sustainability"`, `bg-moooi-sand`, and aria-label
4. Use BlockRenderer for Sanity content
5. Add fallback with certification badges (FSC, PEFC, EU Timber Regulation)
6. Save file

**Acceptance Criteria:** AC-1, AC-3, AC-4, AC-5, AC-9, AC-14
**Reference:** Tech-Spec Task 11, Lines 897-948

---

### Task 13: Create Section Components - ContactSection

**Subtasks:**
1. Create `/Users/ernestssmalikis/Projects/timber-international/components/sections/ContactSection.tsx`
2. Import Framer Motion, BlockRenderer, ContactForm, SanityPage type
3. Implement with `id="contact"` and aria-label
4. Use BlockRenderer for Sanity content
5. Add fallback with ContactForm component
6. Save file

**Acceptance Criteria:** AC-1, AC-3, AC-4, AC-5, AC-9
**Reference:** Tech-Spec Task 12, Lines 952-993

**Dev Notes:**
- Uses existing ContactForm component
- Fallback includes form with heading and description

---

### Task 14: Create Section Components - Index Export

**Subtasks:**
1. Create `/Users/ernestssmalikis/Projects/timber-international/components/sections/index.ts`
2. Export all 8 section components
3. Save file

**Acceptance Criteria:** N/A (code organization)
**Reference:** Tech-Spec Task 13, Lines 997-1009

---

### Task 15: Update Main Page - Server Component

**Subtasks:**
1. Open `/Users/ernestssmalikis/Projects/timber-international/app/(frontend)/page.tsx`
2. Replace existing implementation with new server component
3. Import getAllSections from lib/sanity
4. Import Suspense from React
5. Import SPAPageClient (to be created in next task)
6. Create SectionsLoading skeleton component
7. Implement async HomePage with getAllSections() fetch
8. Add `export const revalidate = 60` for ISR
9. Wrap SPAPageClient in Suspense with loading skeleton
10. Save file

**Acceptance Criteria:** AC-6, AC-7, AC-8, AC-19, AC-20
**Reference:** Tech-Spec Task 16, Lines 1295-1328

**Dev Notes:**
```typescript
// Key patterns:
// - Server Component (no 'use client')
// - Fetches data with getAllSections()
// - Passes sections to client component
// - Suspense boundary for loading state
// - Revalidate every 60 seconds (ISR)
```

---

### Task 16: Update Main Page - Client Component

**Subtasks:**
1. Create/Update `/Users/ernestssmalikis/Projects/timber-international/app/(frontend)/page-client.tsx`
2. Add 'use client' directive
3. Import all section components from components/sections
4. Import AllSectionsData type
5. Create SectionErrorBoundary class component
6. Create SectionFallback component with proper ID and aria-label
7. Implement SPAPageClient component
8. Render all 8 sections in order, each wrapped in SectionErrorBoundary
9. Pass corresponding section data to each section component
10. Save file

**Acceptance Criteria:** AC-1, AC-2, AC-3, AC-15, AC-16, AC-20
**Reference:** Tech-Spec Task 17, Lines 1332-1434

**Dev Notes:**
- Each section wrapped in error boundary for isolation
- SectionFallback includes scroll-mt-20 and section ID for anchor support
- Main element wraps all sections
- Error boundaries log to console with section details

---

### Task 17: Build Verification

**Subtasks:**
1. Run `npm run build` in terminal
2. Review output for TypeScript errors
3. Review output for Next.js build errors
4. Verify all pages compile successfully
5. Check that static generation works for root page
6. If errors occur, fix and re-run build

**Acceptance Criteria:** AC-18
**Reference:** Tech-Spec Task 22, Lines 1562-1570

**Expected Output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (X/X)
✓ Finalizing page optimization
```

---

## Testing Requirements

### Pre-Development

Before starting implementation, run the Sanity verification script (will be created in Story 1-5):
```bash
npm run verify:sections
```

This ensures all 8 required page documents exist in Sanity. If documents are missing, create them in Sanity Studio before proceeding.

### Unit Testing (Manual)

1. **Section Rendering:**
   - Load page in dev mode: `npm run dev`
   - Verify all 8 sections appear in correct order
   - Check that each section has correct ID attribute
   - Verify scroll-margin-top is applied

2. **Content Loading:**
   - Test with Sanity content present
   - Test with missing Sanity content (fallback UI)
   - Verify BlockRenderer displays Sanity blocks correctly
   - Check that animations only fire once per section

3. **Error Handling:**
   - Temporarily break a section component
   - Verify error boundary catches and displays fallback
   - Check console for error logs
   - Verify other sections continue rendering

4. **Data Fetching:**
   - Check Network tab for single GROQ query
   - Verify ISR headers show revalidate: 60
   - Test with Sanity API offline (should show fallbacks)

### Build Testing

```bash
npm run build
npm run start
```

- Verify production build completes without errors
- Check that page loads correctly in production mode
- Verify ISR revalidation works after 60 seconds

### Visual Testing

**Viewports:**
- Mobile: 320px, 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1440px, 1920px

**Checks:**
- Section spacing looks correct
- Background colors alternate appropriately
- Text is readable at all viewport sizes
- Framer Motion animations are smooth

### Accessibility Testing

1. **Keyboard Navigation:**
   - Tab through page
   - Verify skip-nav link appears on first Tab
   - Check all section headings are in logical order

2. **Screen Reader:**
   - Test with VoiceOver (Mac) or NVDA (Windows)
   - Verify section landmarks are announced
   - Check aria-labels are descriptive

3. **Reduced Motion:**
   - Enable system reduced motion preference
   - Reload page
   - Verify animations are disabled/instant

---

## Definition of Done

- [ ] All 21 acceptance criteria pass
- [ ] All 17 tasks completed with subtasks checked off
- [ ] `npm run build` completes with zero errors
- [ ] All 8 section components created and exported
- [ ] Main page server and client components updated
- [ ] Type definitions added to lib/sanity.ts
- [ ] Consolidated GROQ query added to sanity/lib/queries.ts
- [ ] getAllSections() function added to lib/sanity.ts
- [ ] Scroll offset CSS and accessibility styles added to globals.css
- [ ] Manual testing checklist completed
- [ ] Code reviewed for TypeScript errors
- [ ] Accessibility tested with keyboard and screen reader
- [ ] Changes committed to git with descriptive message

---

## File References

### Files to Modify

| File Path | Purpose | Tasks |
|-----------|---------|-------|
| `/Users/ernestssmalikis/Projects/timber-international/lib/sanity.ts` | Add types and getAllSections() | 1, 3 |
| `/Users/ernestssmalikis/Projects/timber-international/sanity/lib/queries.ts` | Add allSectionsQuery | 2 |
| `/Users/ernestssmalikis/Projects/timber-international/app/globals.css` | Add scroll offset CSS | 4 |
| `/Users/ernestssmalikis/Projects/timber-international/app/(frontend)/page.tsx` | Update server component | 15 |
| `/Users/ernestssmalikis/Projects/timber-international/app/(frontend)/page-client.tsx` | Update/create client component | 16 |

### Files to Create

| File Path | Purpose | Tasks |
|-----------|---------|-------|
| `/Users/ernestssmalikis/Projects/timber-international/components/sections/HeroSection.tsx` | Hero section component | 6 |
| `/Users/ernestssmalikis/Projects/timber-international/components/sections/AboutSection.tsx` | About section component | 7 |
| `/Users/ernestssmalikis/Projects/timber-international/components/sections/OakSlabsSection.tsx` | Oak Slabs section (NEW) | 8 |
| `/Users/ernestssmalikis/Projects/timber-international/components/sections/WarehouseSection.tsx` | Warehouse section (NEW) | 9 |
| `/Users/ernestssmalikis/Projects/timber-international/components/sections/ProductsSection.tsx` | Products section component | 10 |
| `/Users/ernestssmalikis/Projects/timber-international/components/sections/ManufacturingSection.tsx` | Manufacturing section | 11 |
| `/Users/ernestssmalikis/Projects/timber-international/components/sections/SustainabilitySection.tsx` | Sustainability section | 12 |
| `/Users/ernestssmalikis/Projects/timber-international/components/sections/ContactSection.tsx` | Contact section component | 13 |
| `/Users/ernestssmalikis/Projects/timber-international/components/sections/index.ts` | Barrel export for sections | 14 |

### Dependencies

| Component/Function | Location | Used In |
|-------------------|----------|---------|
| BlockRenderer | `@/components/blocks` | All section components |
| ContactForm | `@/components/ContactForm` | ContactSection |
| transformSanityBlocks() | `lib/sanity.ts` | getAllSections() |
| Framer Motion | `framer-motion` | All section fallbacks |
| Lucide Icons | `lucide-react` | WarehouseSection |

---

## Dev Notes

### Code Patterns

**1. Section Component Pattern:**
```typescript
'use client'

import { BlockRenderer } from '@/components/blocks'
import type { SanityPage } from '@/lib/sanity'

interface SectionNameProps {
  data: SanityPage | null
}

export default function SectionName({ data }: SectionNameProps) {
  return (
    <section id="section-id" className="scroll-mt-20" aria-label="Section Name">
      {data?.blocks && data.blocks.length > 0 ? (
        <BlockRenderer blocks={data.blocks} />
      ) : (
        // Fallback UI
      )}
    </section>
  )
}
```

**2. Framer Motion Patterns:**

Single content block (About, Products, Manufacturing):
```typescript
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
>
  {/* Content */}
</motion.div>
```

Stagger for grids (Oak Slabs):
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
}

<motion.div variants={containerVariants} initial="hidden" whileInView="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {/* Item */}
    </motion.div>
  ))}
</motion.div>
```

**3. Error Boundary Pattern:**
```typescript
class SectionErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error) {
    console.error('Section render error:', error)
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}
```

**4. Data Fetch Pattern:**
```typescript
export async function getAllSections(): Promise<AllSectionsData> {
  try {
    const data = await client.fetch<AllSectionsData>(allSectionsQuery, {}, {
      next: { revalidate: 60 }
    })

    if (!data) return emptySections

    // Transform each section's blocks
    return {
      hero: transformSection(data.hero),
      about: transformSection(data.about),
      // ... etc
    }
  } catch (error) {
    console.error('getAllSections error:', error)
    return emptySections
  }
}
```

### Important Implementation Notes

1. **Server vs Client Components:**
   - `page.tsx` = Server Component (data fetching)
   - `page-client.tsx` = Client Component (rendering with interactivity)
   - Section components = Client Components ('use client' for Framer Motion)

2. **Type Safety:**
   - All section props typed as `SanityPage | null`
   - AllSectionsData has explicit types for each section
   - No `any` types allowed

3. **Error Handling Strategy:**
   - Fetch errors → return empty sections (all null)
   - Missing Sanity content → section shows fallback UI
   - Render errors → error boundary shows SectionFallback
   - Each layer handles errors independently

4. **Performance Optimizations:**
   - Single query for all sections (not 8 separate)
   - ISR with 60-second revalidation
   - Framer Motion `viewport: { once: true }` prevents re-animations
   - Suspense boundary for loading state

5. **Accessibility Requirements:**
   - Each section has unique ID for anchoring
   - All sections have descriptive aria-label
   - Scroll offset prevents content hiding under nav
   - Reduced motion support via CSS

---

## Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Missing Sanity content breaks page | High | Each section has null check and fallback UI |
| Query failure crashes entire page | High | getAllSections returns emptySections on error |
| Section render error breaks page | Medium | SectionErrorBoundary isolates failures |
| Type mismatches cause build errors | Medium | Strict TypeScript, explicit typing for all components |
| Animation performance issues | Low | Use `viewport: { once: true }`, GPU-accelerated properties |

---

## Related Stories

- **Story 1-1:** Navigation Update (anchor links, scroll spy) - Depends on this story for section IDs
- **Story 1-3:** Section Components (refine content, add blocks) - Builds on section structure
- **Story 1-4:** Footer Update (anchor links) - Uses section IDs created here
- **Story 1-5:** Sanity Content (Oak Slabs, Warehouse) - Provides CMS content for sections

---

## Notes

- Navigation height is 80px (`h-20`) = 5rem
- Background colors: moooi-sand (Oak Slabs, Sustainability), moooi-cream (Products)
- Animation ease curve: `[0.16, 1, 0.3, 1]` used consistently across all sections
- Hero CTA must use `<a href="#contact">` not `<Link href="#contact">` for anchor links
- Lucide icons required for Warehouse section: Warehouse, Truck, Clock
- Future enhancements: scroll progress indicator, back-to-top button, lazy loading
