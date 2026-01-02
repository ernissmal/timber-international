# E2E Test Coverage Documentation

## Epic 1: Website SPA Restructure - Test Summary

**Last Updated:** 2026-01-02
**Test Framework:** Playwright
**Pass Rate:** 132/168 tests passing (79%)

## Test Suites Overview

### 1. `deprecated-routes.spec.ts` - Route Redirects
Tests the 301 permanent redirects from old page routes to anchor sections.

| Test Area | Status | Notes |
|-----------|--------|-------|
| /about → /#about redirect | ✅ Pass | Captures Location header before scroll spy |
| /products → /#products redirect | ✅ Pass | |
| /manufacturing → /#manufacturing redirect | ✅ Pass | |
| /sustainability → /#sustainability redirect | ✅ Pass | |
| /contact → /#contact redirect | ✅ Pass | |
| Root route (/) works | ✅ Pass | |
| 404 for non-existent routes | ✅ Pass | |

### 2. `navigation.spec.ts` - Navigation Component
Tests the sticky navigation with scroll spy and mobile menu.

| Test Area | Status | Notes |
|-----------|--------|-------|
| 8 anchor links render | ✅ Pass | |
| Nav link scrolls to section | ✅ Pass | |
| Active section highlights | ✅ Pass | |
| Skip-nav accessibility | ✅ Pass | |
| Mobile menu open/close | ⚠️ Flaky | Timing-sensitive on CI |
| Escape key closes menu | ⚠️ Flaky | |
| Logo links to hero | ✅ Pass | |

### 3. `main-page.spec.ts` - Main Page Structure
Tests the consolidated SPA with 8 sections.

| Test Area | Status | Notes |
|-----------|--------|-------|
| 8 sections render | ✅ Pass | |
| Sections in correct order | ✅ Pass | Uses `main main > section` selector |
| Section IDs correct | ✅ Pass | |
| scroll-mt-20 class present | ⚠️ Flaky | |
| aria-label attributes | ✅ Pass | |
| Responsive viewports | ✅ Pass | |

### 4. `oak-slabs-section.spec.ts` - Oak Slabs Section
Tests the new Oak Slabs section with feature cards.

| Test Area | Status | Notes |
|-----------|--------|-------|
| Section renders with id | ✅ Pass | |
| 3 feature cards display | ✅ Pass | |
| CTA button links to #contact | ✅ Pass | |
| bg-moooi-sand background | ✅ Pass | |
| Responsive grid layout | ✅ Pass | |
| Accessibility (aria-label) | ✅ Pass | |

### 5. `warehouse-section.spec.ts` - Warehouse Section
Tests the Warehouse section with Lucide icons.

| Test Area | Status | Notes |
|-----------|--------|-------|
| Section renders | ✅ Pass | |
| 3 capability cards | ✅ Pass | |
| Lucide icons render | ✅ Pass | |
| Gold icon color | ✅ Pass | |
| Responsive layout | ✅ Pass | |

### 6. `sanity-integration.spec.ts` - Sanity CMS Integration
Tests the Sanity data fetching and BlockRenderer.

| Test Area | Status | Notes |
|-----------|--------|-------|
| getAllSections() fetches data | ✅ Pass | |
| Fallback UI when null | ✅ Pass | |
| BlockRenderer content | ✅ Pass | |
| ISR revalidation | ⚠️ Flaky | |

### 7. `section-components.spec.ts` - Section Components
Tests individual section component rendering.

| Test Area | Status | Notes |
|-----------|--------|-------|
| All sections have IDs | ✅ Pass | |
| Semantic H2 headings | ✅ Pass | Uses `.first()` for multiple h2s |
| Fallback content | ✅ Pass | |
| Framer Motion animations | ✅ Pass | |

### 8. `ux-polish.spec.ts` - UX Polish
Tests smooth scroll, accessibility, and animations.

| Test Area | Status | Notes |
|-----------|--------|-------|
| Smooth scroll CSS | ✅ Pass | |
| Scroll offset (scroll-mt-20) | ✅ Pass | |
| Skip-nav visibility | ✅ Pass | |
| Reduced motion support | ✅ Pass | |
| Keyboard navigation | ⚠️ Flaky | Focus order varies |

## Known Test Issues

### 1. Nested Main Elements
The DOM has nested `<main>` elements (`main > main > section`). Tests must use:
```typescript
// Correct
page.locator('main main > section')

// Incorrect - finds 0 sections
page.locator('main').first().locator('> section')
```

### 2. Scroll Spy Interference
The IntersectionObserver-based scroll spy updates the URL hash after navigation.
Tests checking exact hash values may fail. Use:
```typescript
// Capture redirect Location header before browser follows
page.on('response', response => {
  redirectLocation = response.headers()['location']
})
```

### 3. Mobile Menu Timing
Mobile menu tests are timing-sensitive. Ensure:
- `page.goto('/')` after viewport change
- `waitForLoadState('networkidle')`
- 300ms wait after menu interactions

### 4. Multiple H2 Elements
Sections have multiple H2 headings. Use `.first()`:
```typescript
// Correct
page.locator('section#about h2').first()

// Incorrect - strict mode violation
page.locator('section#about h2')
```

## Running Tests

```bash
# Run all E2E tests
npx playwright test

# Run specific test file
npx playwright test tests/e2e/navigation.spec.ts

# Run with UI mode
npx playwright test --ui

# Run headed (visible browser)
npx playwright test --headed --project=chromium
```

## Test Configuration

See `playwright.config.ts` for:
- Test directory: `./tests/e2e`
- Base URL: `http://localhost:3000`
- Browsers: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- Screenshots: On failure only
- Traces: On first retry
