# Sprint Change Proposal: Website SPA Restructure

**Date:** 2026-01-02
**Prepared for:** E
**Change Type:** Architecture & Structure Overhaul
**Scope Classification:** Moderate
**Status:** APPROVED

---

## Section 1: Issue Summary

**Problem Statement:**
The Timber International website was built as a Multi-Page Application (MPA) with 6 separate page routes. The client requires a Single-Page Application (SPA) where users scroll through all content sections on a single page without navigation between separate pages.

**Discovery Context:**
Client feedback during production review. Client stated: *"Users should be able to scroll through the website instead of navigating between pages."*

**Evidence:**
- Current structure: 6 separate Next.js pages with route-based navigation
- Client requirement: Single scrollable page with section anchors
- Missing sections: Oak Slabs (primary product), Warehouse

---

## Section 2: Impact Analysis

### Architecture Impact
| Component | Current State | Required State |
|-----------|---------------|----------------|
| Routing | 6 separate routes | Single route with anchors |
| Navigation | Page links (`/about`, `/products`) | Anchor links (`#about`, `#products`) |
| Page Structure | Discrete pages | Continuous sections |

### Content Structure Impact
| Section | Current | Action |
|---------|---------|--------|
| Hero | Exists | Keep, enhance |
| About | Exists (separate page) | Convert to section |
| Oak Slabs | Missing | **CREATE NEW** |
| Warehouse | Missing | **CREATE NEW** |
| Products | Exists (separate page) | Convert to section |
| Manufacturing | Exists (separate page) | Convert to section |
| Sustainability | Exists (separate page) | Convert to section |
| Contacts | Exists (separate page) | Convert to section |

### Files Affected
```
DELETE:
├── app/(frontend)/about/page.tsx
├── app/(frontend)/products/page.tsx
├── app/(frontend)/manufacturing/page.tsx
├── app/(frontend)/sustainability/page.tsx
└── app/(frontend)/contact/page.tsx

MODIFY:
├── app/(frontend)/page.tsx (major rewrite - consolidate all sections)
├── components/Navigation.tsx (anchor-based navigation)
└── scripts/populate-sanity.ts (update content structure)

CREATE:
├── components/sections/OakSlabsSection.tsx
└── components/sections/WarehouseSection.tsx
```

---

## Section 3: Recommended Approach

**Selected Path:** Direct Adjustment
**Effort Estimate:** Medium (2-3 days development)
**Risk Level:** Low

**Rationale:**
1. Client requirements are clear and specific
2. Existing Sanity content blocks are modular and can be repurposed
3. Section components already exist (HeroBlock, FeaturesGridBlock, etc.)
4. Technical change is consolidation, not rebuild
5. No data migration required - Sanity content remains valid

---

## Section 4: Detailed Change Proposals

### Change 1: Navigation Component
```
File: components/Navigation.tsx
Section: navLinks array

OLD:
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  ...
]

NEW:
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

Rationale: Convert page routes to anchor links for SPA scroll navigation
```

### Change 2: Main Page Structure
```
File: app/(frontend)/page.tsx
Section: Complete restructure

OLD:
- Renders only home page content from Sanity

NEW:
- Renders ALL sections sequentially:
  1. <HeroSection id="hero" />
  2. <AboutSection id="about" />
  3. <OakSlabsSection id="oak-slabs" />
  4. <WarehouseSection id="warehouse" />
  5. <ProductsSection id="products" />
  6. <ManufacturingSection id="manufacturing" />
  7. <SustainabilitySection id="sustainability" />
  8. <ContactSection id="contact" />

Rationale: Single page with all content sections for scroll navigation
```

### Change 3: New Oak Slabs Section
```
File: components/sections/OakSlabsSection.tsx
Status: CREATE NEW

Content Focus:
- Primary product showcase for solid oak slabs
- Product specifications and grades
- Visual gallery
- CTA for quotes

Rationale: Client's core business focus - solid oak slab manufacturing
```

### Change 4: New Warehouse Section
```
File: components/sections/WarehouseSection.tsx
Status: CREATE NEW

Content Focus:
- Showcase warehouse facilities
- Storage and logistics capabilities
- Brief text content about facilities

Rationale: Client requested section to showcase warehouse operations
```

---

## Section 5: Implementation Handoff

**Scope Classification:** Moderate
**Handoff To:** Development team for direct implementation

### Implementation Tasks:
1. Create section wrapper components with IDs
2. Update Navigation.tsx for anchor links + smooth scroll
3. Consolidate page content into main page.tsx
4. Create OakSlabsSection component
5. Create WarehouseSection component
6. Update Sanity populate script for new content structure
7. Remove deprecated page files
8. Test scroll navigation on mobile/desktop
9. Deploy and verify

### Success Criteria:
- All sections render on single page
- Navigation links scroll smoothly to sections
- Mobile navigation works correctly
- Oak Slabs and Warehouse sections display content
- No broken links or 404s

---

## Approval

**Approved by:** E
**Approval Date:** 2026-01-02
**Next Action:** Create implementation Epic with user stories
