# Story 1.1: Navigation Anchor Links

Status: ready-for-dev

## Story

As a user,
I want navigation links to scroll to sections,
so that I stay on one page without page reloads.

## Acceptance Criteria

1. Navigation links use anchor format (#hero, #about, #oak-slabs, #warehouse, #products, #manufacturing, #sustainability, #contact)
2. Clicking nav link scrolls smoothly to target section
3. Active section is highlighted in navigation (scroll spy using IntersectionObserver)
4. Mobile menu closes immediately after clicking a link
5. Browser URL updates with hash on scroll/click
6. Skip-nav link for keyboard accessibility
7. Escape key closes mobile menu

## Tasks / Subtasks

- [ ] Task 1: Update navLinks array to anchor format (AC: #1)
  - [ ] Replace route hrefs with anchor hrefs (#hero, #about, etc.)
  - [ ] Add Oak Slabs and Warehouse to navigation
  - [ ] Verify all 8 sections are included in correct order

- [ ] Task 2: Implement scroll spy (AC: #3)
  - [ ] Add IntersectionObserver with -50% rootMargin for center detection
  - [ ] Add activeSectionRef for debouncing to prevent excessive re-renders
  - [ ] Add requestAnimationFrame retry for race condition when sections not yet mounted
  - [ ] Track activeSection state and apply to navigation links

- [ ] Task 3: Update URL hash on navigation (AC: #5)
  - [ ] Use history.replaceState on scroll to update hash without page jump
  - [ ] Handle initial hash on page load to scroll to correct section
  - [ ] Ensure hash updates are synchronized with scroll spy

- [ ] Task 4: Mobile menu improvements (AC: #4, #7)
  - [ ] Close menu immediately on link click (setIsOpen(false))
  - [ ] Add Escape key handler to close menu
  - [ ] Lock body scroll when menu open (overflow: hidden)
  - [ ] Unlock body scroll when menu closes

- [ ] Task 5: Accessibility (AC: #6)
  - [ ] Add skip-nav link for keyboard navigation
  - [ ] Add aria-current="page" to active link
  - [ ] Add aria-expanded to mobile menu button
  - [ ] Add aria-label to mobile menu button

## Dev Notes

### Architecture Compliance
- Component: components/Navigation.tsx
- Use 'use client' directive (interactive component with hooks)
- Import { Menu, X } from lucide-react for mobile menu icons
- Use React hooks: useState, useEffect, useRef
- Follow existing component structure and styling patterns

### Key Implementation Details

**Navigation Links Array:**
```typescript
const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#oak-slabs', label: 'Oak Slabs' },
  { href: '#warehouse', label: 'Warehouse' },
  { href: '#products', label: 'Products' },
  { href: '#manufacturing', label: 'Manufacturing' },
  { href: '#sustainability', label: 'Sustainability' },
  { href: '#contact', label: 'Contact' }
]

const sectionIds = ['hero', 'about', 'oak-slabs', 'warehouse', 'products', 'manufacturing', 'sustainability', 'contact']
```

**IntersectionObserver Configuration:**
```typescript
{
  rootMargin: '-50% 0px -50% 0px', // Center detection - section is active when it crosses the center
  threshold: 0
}
```

**Race Condition Fix:**
```typescript
const setupObserver = () => {
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean)
  if (sections.length === 0) {
    requestAnimationFrame(setupObserver) // Retry if sections not mounted yet
    return
  }
  // ... observer setup
}
```

**Debouncing Pattern:**
```typescript
const activeSectionRef = useRef('hero')
// In observer callback:
if (newSection !== activeSectionRef.current) {
  activeSectionRef.current = newSection
  setActiveSection(newSection)
}
```

**Mobile Menu Close on Click:**
```typescript
const handleLinkClick = () => {
  setIsOpen(false)
}
```

**Escape Key Handler:**
```typescript
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false)
    }
  }
  window.addEventListener('keydown', handleEscape)
  return () => window.removeEventListener('keydown', handleEscape)
}, [isOpen])
```

**Body Scroll Lock:**
```typescript
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}, [isOpen])
```

**Skip-Nav Link:**
```typescript
<a
  href="#hero"
  className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black"
>
  Skip to main content
</a>
```

### Files to Modify
- components/Navigation.tsx (full replacement per tech-spec Task 14)

### Testing Requirements

**Manual Testing:**
- [ ] Test scroll spy at various scroll speeds (fast/slow)
- [ ] Test active section highlights correctly as you scroll
- [ ] Test mobile menu closes immediately on anchor click
- [ ] Test Escape key closes mobile menu
- [ ] Test hash URL updates correctly on scroll
- [ ] Test initial hash scroll on page load (e.g., /main#products)
- [ ] Test skip-nav link with Tab key
- [ ] Test aria-current is applied to active link
- [ ] Test smooth scrolling behavior

**Browser Testing:**
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**Accessibility Testing:**
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader announces active section
- [ ] Skip-nav link is visible on focus
- [ ] Mobile menu button has correct aria-expanded state

### Edge Cases to Consider
1. Sections not yet mounted when observer initializes (handled by requestAnimationFrame retry)
2. Rapid scrolling causing multiple state updates (handled by activeSectionRef debouncing)
3. Mobile menu open when resizing to desktop view
4. Initial page load with hash in URL
5. Browser back/forward with hash navigation

### References
- [Source: tech-spec-spa-restructure.md#Task 14]
- [Source: architecture-timber-international.md#Navigation Architecture]
- [MDN: Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [MDN: History API](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState)

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References
<!-- Add debug log references during implementation -->

### Completion Notes List
<!-- Add completion notes during implementation -->

### File List
<!-- List all modified files during implementation -->
- components/Navigation.tsx
