---
storyId: 'STORY-001-08'
title: 'Smooth Scroll and UX Polish'
epicId: 'EPIC-001'
priority: 'P2'
points: 2
status: 'ready-for-dev'
created: '2026-01-02'
assignee: null
dependencies:
  - STORY-001-07
techSpec: '_bmad-output/implementation-artifacts/tech-spec-spa-restructure.md'
---

# Story 1-8: Smooth Scroll and UX Polish

**As a** user
**I want** smooth animations and polished scroll experience
**So that** the website feels modern, professional, and enjoyable to navigate

---

## Overview

This story implements smooth scroll behavior, scroll offset for the sticky header, accessibility features, and optional scroll-based animations to polish the overall UX for the SPA experience.

**Priority:** P2
**Story Points:** 2
**Status:** ready-for-dev

---

## Acceptance Criteria

- [ ] Smooth scroll enabled globally via CSS
- [ ] Scroll offset accounts for sticky header (80px / 5rem)
- [ ] Reduced motion preference respected (`prefers-reduced-motion: reduce`)
- [ ] Skip navigation link for accessibility
- [ ] Framer Motion animations trigger on scroll with `viewport: { once: true }`
- [ ] No performance jank (60fps scroll)
- [ ] Animations use consistent easing curve `[0.16, 1, 0.3, 1]`

---

## Technical Context

### Files to Modify

1. **`app/globals.css`** - Add scroll offset, skip-nav, reduced motion support
2. **Section components** - Already implement Framer Motion animations (no changes needed if using tech-spec patterns)

### Dependencies

- **Tech-Spec:** Task 1 contains all CSS additions
- **Framer Motion:** Already configured in section components (Tasks 5-12)
- **Completed Stories:** STORY-001-07 (page consolidation must be complete)

### Animation Patterns

All section components already use these patterns from the tech-spec:

```typescript
// Standard section animation (single content blocks)
const sectionAnimation = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-100px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
}

// Stagger pattern (grids/lists in OakSlabs, Warehouse)
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

## Implementation Guide

### Task 1: Add CSS for Scroll Offset and Accessibility

**File:** `app/globals.css`

**Action:** Add scroll-margin-top for all section IDs, skip-nav styles, and reduced-motion support

**Code to Add:**

```css
/* Scroll offset for sticky header (80px = h-20) */
/* Use specific IDs to avoid affecting nested sections in blocks */
#hero,
#about,
#oak-slabs,
#warehouse,
#products,
#manufacturing,
#sustainability,
#contact {
  scroll-margin-top: 5rem;
}

/* Skip navigation link for accessibility */
.skip-nav {
  position: absolute;
  left: -9999px;
  z-index: 100;
  padding: 1rem;
  background: white;
  color: black;
  text-decoration: underline;
}

.skip-nav:focus {
  left: 0;
}

/* Respect reduced motion preferences */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Why this approach:**

- `scroll-margin-top: 5rem` creates 80px offset for sticky header (matches `h-20` on nav)
- `.skip-nav` allows keyboard users to jump to main content (WCAG 2.1 requirement)
- `prefers-reduced-motion` disables animations for users with motion sensitivity
- Targets specific section IDs to avoid affecting nested elements in CMS blocks

---

### Task 2: Verify Framer Motion Animations (Already Complete)

**Files:** All section components (`components/sections/*.tsx`)

**Action:** Verify animations are already implemented per tech-spec

**What to Check:**

1. **AboutSection, ProductsSection, ManufacturingSection, SustainabilitySection, ContactSection:**
   - Use inline `initial`, `whileInView`, `viewport`, `transition` props
   - Easing: `[0.16, 1, 0.3, 1]`
   - `viewport: { once: true, margin: '-100px' }`

2. **OakSlabsSection:**
   - Uses `containerVariants` and `itemVariants` for stagger effect
   - Grid items animate with 0.15s stagger delay
   - Same easing curve

3. **WarehouseSection:**
   - Individual feature cards animate with 0.15s incremental delay
   - Same easing curve

**No code changes needed if tech-spec was followed correctly.**

---

### Task 3: Verify Skip Navigation in Navigation Component

**File:** `components/Navigation.tsx`

**Action:** Verify skip-nav link exists (already in Task 14 of tech-spec)

**Expected Code (lines 1141-1144):**

```typescript
{/* Skip Navigation Link */}
<a href="#hero" className="skip-nav">
  Skip to main content
</a>
```

**No code changes needed if tech-spec was followed.**

---

### Task 4: Performance Verification

**Action:** Test scroll performance and animation smoothness

**Manual Testing Checklist:**

1. **Smooth Scroll:**
   - Click nav links → smooth scroll to sections (not instant jump)
   - Scroll offset: header doesn't cover section headings
   - Browser's native smooth scroll (CSS-based, no JS jank)

2. **Animations:**
   - Scroll through page → animations trigger as sections enter viewport
   - Animations fire only ONCE per section (not on every scroll)
   - No layout shift or janky behavior during animations

3. **Reduced Motion:**
   - Set OS to "Reduce motion" (macOS: System Preferences → Accessibility → Display)
   - Refresh page → animations should be instant (no fades/slides)
   - Scroll should be instant (not smooth)

4. **Keyboard Navigation:**
   - Press Tab at top of page → "Skip to main content" link appears
   - Press Enter → jumps to hero section
   - Tab through nav links → proper focus indicators

5. **Performance:**
   - Open Chrome DevTools → Performance tab
   - Record while scrolling → verify 60fps (green bars, no red drops)
   - Check for layout thrashing or forced reflows

---

### Task 5: Accessibility Audit

**Action:** Run automated and manual accessibility checks

**Automated Tools:**

1. **Lighthouse (Chrome DevTools):**
   ```
   Target: Accessibility score ≥ 90
   - Skip link detected
   - ARIA labels on sections
   - Proper heading hierarchy
   - Color contrast passes
   ```

2. **axe DevTools Extension:**
   ```
   - Install: chrome.google.com/webstore (search "axe DevTools")
   - Run scan on homepage
   - Fix any critical or serious issues
   ```

**Manual Screen Reader Test:**

1. **macOS VoiceOver:**
   - Enable: Cmd + F5
   - Navigate through page with VO keys
   - Verify section landmarks are announced
   - Verify nav links are properly labeled

2. **Windows NVDA (optional):**
   - Download from nvaccess.org
   - Test with Insert + Down Arrow navigation

---

## Dev Notes

### Technical Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Scroll Method | CSS `scroll-behavior: smooth` | Native, accessible, respects `prefers-reduced-motion`, no JS overhead |
| Scroll Offset | `scroll-margin-top: 5rem` on section IDs | Matches 80px nav height (`h-20`), prevents header overlap |
| Animation Trigger | `viewport: { once: true }` | Animations fire once per session, improves performance |
| Reduced Motion | CSS media query | WCAG 2.1 compliance, system-level preference |
| Easing Curve | `[0.16, 1, 0.3, 1]` | Smooth deceleration, professional feel, consistent across all animations |

### CSS Architecture

```
Smooth Scroll Pipeline:
1. User clicks nav link (#contact)
2. Browser uses native CSS smooth scroll
3. Section has scroll-margin-top: 5rem
4. Section stops 80px below viewport top
5. IntersectionObserver updates active nav link
6. URL hash updates (#contact)
```

### Animation Architecture

```
Framer Motion Pipeline:
1. Section enters viewport
2. IntersectionObserver (from Framer Motion) detects visibility
3. Checks viewport.margin (-100px = 100px before visible)
4. If viewport.once: true → only trigger if not seen before
5. Animates from initial to whileInView state
6. Uses transition.ease for smooth motion
```

### Browser Compatibility

| Feature | Safari | Chrome | Firefox | Edge | Fallback |
|---------|--------|--------|---------|------|----------|
| `scroll-behavior: smooth` | ✅ 15.4+ | ✅ 61+ | ✅ 36+ | ✅ 79+ | Instant scroll (still functional) |
| `scroll-margin-top` | ✅ 14.1+ | ✅ 69+ | ✅ 68+ | ✅ 79+ | Manual JS offset (not needed) |
| `prefers-reduced-motion` | ✅ 10.1+ | ✅ 74+ | ✅ 63+ | ✅ 79+ | Animations remain (degraded UX) |
| Framer Motion | ✅ All | ✅ All | ✅ All | ✅ All | Static content (no animations) |

### Performance Considerations

1. **CSS vs JS Smooth Scroll:**
   - CSS: Browser-optimized, runs on compositor thread
   - JS (libraries): Main thread, can cause jank
   - Decision: Use CSS for best performance

2. **Animation Budget:**
   - Max 8 sections animating on first scroll
   - Each uses GPU-accelerated properties (opacity, transform)
   - `viewport.once` prevents repeat animations
   - Budget: <16ms per frame (60fps)

3. **Optimization Tips:**
   - Use `will-change: transform` sparingly (only if jank detected)
   - Avoid animating `height`, `width`, `margin` (causes reflow)
   - Stick to `opacity` and `transform` (GPU-accelerated)

### Accessibility Best Practices

1. **Skip Navigation:**
   - WCAG 2.1 Level A requirement (Guideline 2.4.1)
   - Helps keyboard and screen reader users
   - Must be first focusable element on page

2. **Reduced Motion:**
   - WCAG 2.1 Level AAA (Guideline 2.3.3)
   - Respects user's system-level preference
   - Disables animations that could trigger vestibular disorders

3. **Section Landmarks:**
   - Each section has `aria-label` (e.g., `aria-label="About Us"`)
   - Helps screen reader users navigate by landmark
   - Alternative to `<section>` + `<h2>` pattern

4. **Focus Management:**
   - Skip-nav link has visible focus state (`:focus { left: 0 }`)
   - Navigation links have hover and active states
   - Mobile menu has proper `aria-expanded` state

---

## Testing Checklist

### Functional Tests

- [ ] Click each nav link → smooth scroll to section
- [ ] Scroll offset: header doesn't cover section titles
- [ ] Animations trigger as sections enter viewport
- [ ] Animations fire only once per section
- [ ] Skip-nav link appears on Tab press
- [ ] Skip-nav link jumps to hero section

### Accessibility Tests

- [ ] Lighthouse accessibility score ≥ 90
- [ ] axe DevTools: no critical or serious issues
- [ ] VoiceOver: section landmarks announced
- [ ] VoiceOver: nav links properly labeled
- [ ] Keyboard navigation: all interactive elements reachable
- [ ] Focus indicators visible on all interactive elements

### Reduced Motion Tests

- [ ] Enable "Reduce motion" in OS settings
- [ ] Refresh page → animations are instant
- [ ] Scroll behavior is instant (not smooth)
- [ ] Page remains fully functional

### Cross-Browser Tests

- [ ] **Chrome (desktop):** Smooth scroll works
- [ ] **Firefox (desktop):** Smooth scroll works
- [ ] **Safari (desktop):** Smooth scroll works
- [ ] **Edge (desktop):** Smooth scroll works
- [ ] **iOS Safari (mobile):** Smooth scroll works
- [ ] **Android Chrome (mobile):** Smooth scroll works

### Performance Tests

- [ ] Chrome DevTools Performance: 60fps during scroll
- [ ] Lighthouse Performance score ≥ 80
- [ ] No layout shift (CLS < 0.1)
- [ ] First Contentful Paint < 2s
- [ ] No forced reflows in console

### Viewport Tests

- [ ] **320px (iPhone SE):** All animations visible
- [ ] **768px (iPad):** Animations smooth
- [ ] **1024px (iPad Pro):** Animations smooth
- [ ] **1440px (desktop):** Animations smooth

---

## Edge Cases

| Scenario | Expected Behavior | Handled By |
|----------|-------------------|------------|
| User has reduced motion enabled | Animations are instant, scroll is instant | CSS media query `prefers-reduced-motion` |
| Browser doesn't support `scroll-behavior` | Instant scroll (still functional) | Graceful degradation |
| User clicks nav link during scroll | Current scroll interrupted, new scroll starts | Browser's native smooth scroll |
| Section has no content (Sanity null) | Fallback content animates correctly | Section component fallback UI |
| User scrolls very fast | Only most-intersecting section is active | IntersectionObserver with `activeSectionRef` |
| Mobile menu open, user scrolls | Body scroll locked, menu stays open | `overflow: hidden` on body |

---

## Definition of Done

- [ ] All CSS added to `app/globals.css`
- [ ] Skip-nav link present and functional
- [ ] Smooth scroll works in all major browsers
- [ ] Scroll offset prevents header overlap
- [ ] Reduced motion preference respected
- [ ] Framer Motion animations trigger on scroll
- [ ] Animations fire only once per section
- [ ] Lighthouse accessibility score ≥ 90
- [ ] Lighthouse performance score ≥ 80
- [ ] No console errors or warnings
- [ ] Cross-browser testing complete (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing complete (iOS Safari, Android Chrome)
- [ ] Keyboard navigation tested
- [ ] Screen reader tested (VoiceOver or NVDA)
- [ ] Code committed to git

---

## Additional Resources

### Documentation

- **Framer Motion Viewport Scroll:** https://www.framer.com/motion/gestures/#viewport-scroll
- **CSS scroll-behavior:** https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior
- **CSS scroll-margin:** https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-margin
- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **prefers-reduced-motion:** https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion

### Tools

- **Lighthouse (Chrome DevTools):** Built-in performance/accessibility audits
- **axe DevTools:** https://chrome.google.com/webstore (search "axe DevTools")
- **VoiceOver (macOS):** Cmd + F5 to enable
- **NVDA (Windows):** https://www.nvaccess.org/download/

### Design Tokens

```css
/* Moooi Color Palette (from Tailwind config) */
--moooi-cream: #FAF7F0
--moooi-sand: #E8DCC4
--moooi-gold: #D4AF37
--moooi-charcoal: #2C2C2C
--moooi-slate: #5A5A5A

/* Timing */
--ease-smooth: cubic-bezier(0.16, 1, 0.3, 1)
--duration-base: 0.8s
--duration-fast: 0.6s
--stagger-delay: 0.15s

/* Spacing */
--nav-height: 80px (5rem)
--scroll-offset: 5rem
--viewport-margin: -100px
```

---

## Notes

- This story is primarily CSS configuration with minimal code changes
- Most animation work was completed in Tasks 5-12 of the tech-spec (section components)
- Focus is on polishing UX details: scroll offset, accessibility, reduced motion
- No new components or major refactoring required
- Estimated completion time: 2-3 hours (including testing)
- Optional enhancements (scroll progress indicator, back-to-top button) are out of scope for this story

---

## Related Stories

- **STORY-001-01:** Navigation anchor conversion (dependency)
- **STORY-001-02:** Section components (dependency)
- **STORY-001-07:** Main page consolidation (dependency)
- **Future:** Scroll progress indicator (P3, 1 point)
- **Future:** Back-to-top button (P3, 1 point)

---

**Status:** Ready for Development
**Created:** 2026-01-02
**Tech-Spec Reference:** `_bmad-output/implementation-artifacts/tech-spec-spa-restructure.md` (Task 1)
