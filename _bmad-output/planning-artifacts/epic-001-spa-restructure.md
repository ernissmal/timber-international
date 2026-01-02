# Epic 001: Website SPA Restructure

**Epic ID:** EPIC-001
**Title:** Convert Multi-Page Website to Single-Page Application
**Priority:** P0 - Critical (Client Blocking)
**Status:** Ready for Development
**Created:** 2026-01-02
**Source:** Sprint Change Proposal 2026-01-02

---

## Epic Summary

Transform the Timber International website from a Multi-Page Application (MPA) with 6 separate routes to a Single-Page Application (SPA) with scroll-based navigation. Add missing business-critical sections (Oak Slabs, Warehouse) and consolidate all content onto a single scrollable page.

## Business Value

- **Client Satisfaction:** Delivers the website structure the client originally envisioned
- **User Experience:** Provides seamless scroll-through experience without page loads
- **Business Focus:** Highlights Oak Slabs as primary product offering
- **Engagement:** Reduces friction - users see all content without clicking

## Acceptance Criteria

- [ ] All 8 sections render on single page in correct order
- [ ] Navigation uses anchor links with smooth scroll behavior
- [ ] Oak Slabs section showcases primary product line
- [ ] Warehouse section displays facility information
- [ ] Mobile navigation functions correctly with anchor links
- [ ] No broken links or 404 errors
- [ ] Page load performance remains acceptable (<3s)
- [ ] All existing Sanity content displays correctly

---

## User Stories

### Story 1: Navigation Anchor Links
**Story ID:** STORY-001-01
**Title:** As a user, I want navigation links to scroll to sections so I stay on one page
**Priority:** P0
**Points:** 3

**Description:**
Update the Navigation component to use anchor links (#section-id) instead of page routes (/page). Implement smooth scroll behavior when clicking navigation items.

**Acceptance Criteria:**
- [ ] Navigation links use anchor format (#hero, #about, etc.)
- [ ] Clicking nav link scrolls smoothly to target section
- [ ] Active section is highlighted in navigation (scroll spy)
- [ ] Mobile menu closes after clicking a link
- [ ] Browser URL updates with hash on scroll/click

**Technical Notes:**
- Modify `components/Navigation.tsx`
- Add smooth scroll CSS or JS implementation
- Consider scroll-margin-top for sticky header offset

**Files to Modify:**
- `components/Navigation.tsx`
- `app/globals.css` (add smooth scroll)

---

### Story 2: Main Page Section Consolidation
**Story ID:** STORY-001-02
**Title:** As a developer, I need to consolidate all page content into a single page component
**Priority:** P0
**Points:** 5

**Description:**
Restructure the main page to render all content sections sequentially. Each section should have a unique ID for anchor navigation. Fetch and render content from Sanity for each section.

**Acceptance Criteria:**
- [ ] Main page renders 8 sections in order: Hero, About, Oak Slabs, Warehouse, Products, Manufacturing, Sustainability, Contact
- [ ] Each section has correct id attribute for anchoring
- [ ] Sections have appropriate spacing/dividers
- [ ] Content loads from Sanity CMS
- [ ] Page maintains responsive design

**Technical Notes:**
- Major rewrite of `app/(frontend)/page.tsx`
- Create section wrapper components or use div with ids
- May need to fetch multiple Sanity documents

**Files to Modify:**
- `app/(frontend)/page.tsx`

---

### Story 3: Oak Slabs Section
**Story ID:** STORY-001-03
**Title:** As a visitor, I want to see the Oak Slabs product section so I understand the primary offering
**Priority:** P0
**Points:** 5

**Description:**
Create a new Oak Slabs section component that showcases solid oak slab products. This is the client's primary business focus and should be prominently featured.

**Acceptance Criteria:**
- [ ] Section displays with id="oak-slabs"
- [ ] Heading introduces oak slab products
- [ ] Product features/benefits are highlighted
- [ ] Visual imagery of oak slabs (placeholder or Sanity image)
- [ ] CTA button for quote request
- [ ] Responsive design for mobile/tablet/desktop

**Content Requirements:**
- Headline about solid oak slab manufacturing
- Key selling points (quality, customization, etc.)
- Product specifications overview
- Call-to-action

**Files to Create:**
- `components/sections/OakSlabsSection.tsx`

---

### Story 4: Warehouse Section
**Story ID:** STORY-001-04
**Title:** As a visitor, I want to see the Warehouse section so I understand storage/logistics capabilities
**Priority:** P1
**Points:** 3

**Description:**
Create a new Warehouse section component that showcases the company's warehouse facilities and logistics capabilities.

**Acceptance Criteria:**
- [ ] Section displays with id="warehouse"
- [ ] Brief text content about warehouse facilities
- [ ] Visual representation of warehouse (placeholder or image)
- [ ] Responsive design

**Content Requirements:**
- Headline about warehouse/facilities
- Brief description of storage capabilities
- Optional: capacity/logistics information

**Files to Create:**
- `components/sections/WarehouseSection.tsx`

---

### Story 5: Section Components for Existing Pages
**Story ID:** STORY-001-05
**Title:** As a developer, I need to convert existing page components to section components
**Priority:** P0
**Points:** 5

**Description:**
Extract the content rendering logic from existing page files and create reusable section components that can be embedded in the main SPA page.

**Acceptance Criteria:**
- [ ] AboutSection component created with id="about"
- [ ] ProductsSection component created with id="products"
- [ ] ManufacturingSection component created with id="manufacturing"
- [ ] SustainabilitySection component created with id="sustainability"
- [ ] ContactSection component created with id="contact"
- [ ] Each section fetches its own Sanity content OR receives props

**Technical Notes:**
- May reuse existing BlockRenderer logic
- Consider creating a generic Section wrapper component

**Files to Create:**
- `components/sections/AboutSection.tsx`
- `components/sections/ProductsSection.tsx`
- `components/sections/ManufacturingSection.tsx`
- `components/sections/SustainabilitySection.tsx`
- `components/sections/ContactSection.tsx`

---

### Story 6: Remove Deprecated Page Routes
**Story ID:** STORY-001-06
**Title:** As a developer, I need to remove old page routes to clean up the codebase
**Priority:** P1
**Points:** 2

**Description:**
After sections are consolidated, remove the deprecated page files and optionally add redirects from old URLs to anchor links.

**Acceptance Criteria:**
- [ ] All deprecated page files removed
- [ ] No build errors after removal
- [ ] Optional: Redirects from /about to /#about (etc.)
- [ ] 404 page still works for unknown routes

**Files to Delete:**
- `app/(frontend)/about/page.tsx`
- `app/(frontend)/products/page.tsx`
- `app/(frontend)/manufacturing/page.tsx`
- `app/(frontend)/sustainability/page.tsx`
- `app/(frontend)/contact/page.tsx`

---

### Story 7: Update Sanity Content Structure
**Story ID:** STORY-001-07
**Title:** As a content editor, I need Sanity to support the new SPA structure
**Priority:** P1
**Points:** 3

**Description:**
Update the Sanity populate script and potentially schema to support Oak Slabs and Warehouse content. Ensure all section content is manageable via Sanity Studio.

**Acceptance Criteria:**
- [ ] Oak Slabs content available in Sanity
- [ ] Warehouse content available in Sanity
- [ ] Content can be edited via Sanity Studio
- [ ] Populate script updated with new sections

**Files to Modify:**
- `scripts/populate-sanity.ts`
- Potentially Sanity schema files

---

### Story 8: Smooth Scroll and UX Polish
**Story ID:** STORY-001-08
**Title:** As a user, I want smooth animations and polished scroll experience
**Priority:** P2
**Points:** 2

**Description:**
Add smooth scroll behavior, scroll-based animations, and ensure the overall UX is polished for the SPA experience.

**Acceptance Criteria:**
- [ ] Smooth scroll enabled globally
- [ ] Scroll offset accounts for sticky header
- [ ] Optional: Scroll progress indicator
- [ ] Optional: Section fade-in animations on scroll
- [ ] Performance optimized (no jank)

**Files to Modify:**
- `app/globals.css`
- Various section components

---

## Story Dependency Order

```
STORY-001-01 (Navigation) ──┐
                            ├──> STORY-001-02 (Main Page) ──> STORY-001-06 (Remove Pages)
STORY-001-05 (Sections) ────┘           │
                                        │
STORY-001-03 (Oak Slabs) ───────────────┤
STORY-001-04 (Warehouse) ───────────────┤
                                        │
STORY-001-07 (Sanity) ──────────────────┘

STORY-001-08 (Polish) ──> Final step after all others
```

---

## Definition of Done

- [ ] All stories completed and tested
- [ ] Code reviewed and merged to main
- [ ] Deployed to production (Vercel)
- [ ] Client has verified the SPA experience
- [ ] No console errors or warnings
- [ ] Mobile responsive verified
- [ ] Performance acceptable (<3s load)

---

## Estimated Effort

| Story | Points | Est. Hours |
|-------|--------|------------|
| STORY-001-01 | 3 | 2-3h |
| STORY-001-02 | 5 | 4-5h |
| STORY-001-03 | 5 | 4-5h |
| STORY-001-04 | 3 | 2-3h |
| STORY-001-05 | 5 | 4-5h |
| STORY-001-06 | 2 | 1h |
| STORY-001-07 | 3 | 2-3h |
| STORY-001-08 | 2 | 2h |
| **Total** | **28** | **21-27h** |

---

## Notes

- This epic addresses client-blocking feedback
- Oak Slabs is the primary business focus - should be visually prominent
- Consider lazy loading sections for performance
- Sanity content for new sections may need client input
