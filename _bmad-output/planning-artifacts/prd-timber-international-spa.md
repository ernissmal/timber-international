# Product Requirements Document (PRD)
# Timber International - SPA Website Restructure

**Document Version:** 1.0
**Date:** 2026-01-02
**Author:** E (via BMad Method)
**Status:** Approved

---

## 1. Executive Summary

### 1.1 Product Vision
Transform the Timber International website from a Multi-Page Application (MPA) to a Single-Page Application (SPA) that showcases the company's solid oak slab manufacturing capabilities through a seamless, scroll-based user experience.

### 1.2 Problem Statement
The current website structure requires users to navigate between separate pages, creating friction in the user journey. The client requires a continuous scroll experience where visitors can explore all content without page transitions. Additionally, the current structure lacks dedicated sections for the company's primary product focus (Oak Slabs) and facilities (Warehouse).

### 1.3 Success Metrics
| Metric | Target |
|--------|--------|
| User scroll depth | >70% reach all sections |
| Time on site | Increase by 25% |
| Contact form submissions | Maintain or improve current rate |
| Page load performance | <3 seconds initial load |
| Mobile usability | 100% functional on all sections |

---

## 2. Product Overview

### 2.1 Target Audience

**Primary: B2B Industrial Buyers**
- Furniture manufacturers
- Construction companies
- Woodworking businesses
- Interior design firms

**Secondary: Distributors & Partners**
- Timber distributors
- Export partners
- Logistics companies

### 2.2 User Needs
1. Quickly understand what Timber International offers
2. View product capabilities (especially oak slabs)
3. Assess manufacturing quality and capacity
4. Understand sustainability credentials
5. Easy path to request quotes or contact

---

## 3. Functional Requirements

### 3.1 Core Requirements (Must Have)

#### FR-001: Single Page Architecture
- **Description:** All content sections render on a single scrollable page
- **Acceptance Criteria:**
  - Single route (/) serves all content
  - No page transitions or full reloads between sections
  - Each section has unique anchor ID for deep linking

#### FR-002: Anchor-Based Navigation
- **Description:** Navigation links scroll to sections instead of loading new pages
- **Acceptance Criteria:**
  - Navigation uses anchor links (#section-id)
  - Smooth scroll animation when clicking nav items
  - URL updates with hash on navigation
  - Scroll offset accounts for sticky header (80px)

#### FR-003: Section Structure
- **Description:** Website contains 8 distinct content sections
- **Sections (in order):**
  1. Hero (#hero) - Primary landing with headline and CTA
  2. About (#about) - Company story and partnership model
  3. Oak Slabs (#oak-slabs) - Primary product showcase [NEW]
  4. Warehouse (#warehouse) - Facility showcase [NEW]
  5. Products (#products) - Product categories overview
  6. Manufacturing (#manufacturing) - Production capabilities
  7. Sustainability (#sustainability) - Certifications and compliance
  8. Contact (#contact) - Contact form and information

#### FR-004: Oak Slabs Section
- **Description:** Dedicated section showcasing solid oak slab products
- **Content Requirements:**
  - Compelling headline about oak slab manufacturing
  - Key product features/benefits (3-4 items)
  - Visual imagery placeholder
  - CTA for quote requests
- **Acceptance Criteria:**
  - Section prominently positioned after About
  - Responsive layout for all screen sizes
  - Integrates with existing design system

#### FR-005: Warehouse Section
- **Description:** Section showcasing warehouse/logistics facilities
- **Content Requirements:**
  - Headline about warehouse capabilities
  - Brief description of storage and logistics
  - Facility imagery placeholder
- **Acceptance Criteria:**
  - Section positioned before Products
  - Consistent styling with other sections

#### FR-006: Mobile Navigation
- **Description:** Mobile menu functions with anchor navigation
- **Acceptance Criteria:**
  - Hamburger menu works on mobile
  - Menu closes after clicking anchor link
  - Smooth scroll works on mobile devices

### 3.2 Enhanced Requirements (Should Have)

#### FR-007: Scroll Progress Indicator
- **Description:** Visual indicator showing scroll progress
- **Acceptance Criteria:**
  - Progress bar at top of viewport
  - Updates as user scrolls
  - Optional: Can be disabled

#### FR-008: Active Section Highlighting
- **Description:** Navigation highlights current section during scroll
- **Acceptance Criteria:**
  - Active nav item visually distinguished
  - Updates based on scroll position (scroll spy)
  - Smooth transition between states

#### FR-009: Section Animations
- **Description:** Sections animate into view on scroll
- **Acceptance Criteria:**
  - Fade-in and slide-up animations
  - Animations trigger once (not on every scroll)
  - Respects reduced-motion preferences

### 3.3 Future Considerations (Could Have)

#### FR-010: Lazy Loading
- **Description:** Images and heavy content load as needed
- **Rationale:** Performance optimization for initial load

#### FR-011: Back-to-Top Button
- **Description:** Floating button to return to top
- **Rationale:** Convenience for long scroll pages

---

## 4. Non-Functional Requirements

### 4.1 Performance
| Requirement | Target |
|-------------|--------|
| Initial page load | <3 seconds |
| Time to Interactive | <4 seconds |
| Cumulative Layout Shift | <0.1 |
| Largest Contentful Paint | <2.5 seconds |

### 4.2 Compatibility
- **Browsers:** Chrome, Firefox, Safari, Edge (latest 2 versions)
- **Devices:** Desktop, Tablet, Mobile
- **Screen Sizes:** 320px - 2560px

### 4.3 Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatible
- Sufficient color contrast

### 4.4 SEO
- Semantic HTML structure
- Proper heading hierarchy (single H1, logical H2-H4)
- Meta tags and Open Graph support
- Anchor links support direct section linking

---

## 5. Content Requirements

### 5.1 Section Content Summary

| Section | Headline (Draft) | Key Content |
|---------|------------------|-------------|
| Hero | "Your supply chain doesn't have room for inconsistency" | Main value prop, primary CTA |
| About | "We scaled our operations" | Company story, partnership model |
| Oak Slabs | "Solid Oak. Industrial Scale." | Product features, specifications |
| Warehouse | "Storage & Logistics Excellence" | Facility capabilities |
| Products | "Specifications you can count on" | Product categories |
| Manufacturing | "Modern equipment. Rigorous standards." | Production capabilities |
| Sustainability | "Responsible sourcing" | FSC certification, compliance |
| Contact | "Let's discuss your requirements" | Contact form, info |

### 5.2 Media Requirements
- Hero: Background gradient or image
- Oak Slabs: Product imagery (placeholder initially)
- Warehouse: Facility imagery (placeholder initially)
- Icons: Lucide React icon library (already integrated)

---

## 6. Technical Constraints

### 6.1 Technology Stack (Existing)
- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **CMS:** Sanity
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Hosting:** Vercel

### 6.2 Constraints
- Must work with existing Sanity content structure
- Must maintain existing design system (Moooi-inspired)
- No additional dependencies unless necessary
- TypeScript required for all new components

---

## 7. Out of Scope

The following are explicitly NOT part of this restructure:
- E-commerce functionality
- User authentication
- Product configurator
- Multi-language support
- Blog/News section
- Customer portal

---

## 8. Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| Existing block components | Internal | Available |
| Sanity CMS | External | Configured |
| Vercel deployment | External | Active |
| Domain/DNS | External | Configured |

---

## 9. Risks and Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| SEO impact from SPA | Medium | Medium | Proper semantic HTML, anchor deep links |
| Performance degradation | Low | High | Lazy loading, code splitting |
| Mobile scroll issues | Medium | High | Thorough mobile testing |
| Content overflow | Low | Medium | Flexible section heights |

---

## 10. Timeline

| Phase | Description | Duration |
|-------|-------------|----------|
| Sprint Planning | Set up tracking | 1 hour |
| Implementation | All 8 stories | 21-27 hours |
| Testing | Cross-browser, mobile | 2-3 hours |
| Deployment | Production release | 1 hour |
| **Total** | | **~30 hours** |

---

## 11. Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | E | 2026-01-02 | Approved |
| Developer | Claude | 2026-01-02 | Ready |

---

## Appendix A: Related Documents

- Sprint Change Proposal: `sprint-change-proposal-2026-01-02.md`
- Epic: `epic-001-spa-restructure.md`
- Architecture: `architecture-timber-international.md`
- Component Library: `component-library.md`
