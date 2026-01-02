# E2E Testing with Playwright

## Overview

This directory contains end-to-end tests for the Timber International website using Playwright.

## Setup

Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

```bash
# Run all tests
npm run test:e2e

# Run tests in UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Debug tests
npm run test:e2e:debug
```

## Test Structure

### navigation.spec.ts

Tests for Story 1-1: Navigation Anchor Links

**Coverage:**
- Navigation renders with all 8 anchor links
- Clicking nav link scrolls to correct section
- Active section highlighting on scroll (scroll spy)
- Mobile menu opens/closes
- Escape key closes mobile menu
- Skip-nav link is focusable and functional
- Browser URL updates with hash
- Initial hash scroll on page load
- Body scroll lock when mobile menu is open
- Sticky navigation behavior
- ARIA attributes update correctly

### deprecated-routes.spec.ts

Tests for Story 1-6: Remove Deprecated Routes

**Coverage:**
- Deprecated routes (/about, /products, /manufacturing, /sustainability, /contact) return 404
- Root route (/) works correctly
- Anchor navigation (/#about, /#products, etc.) works
- Edge cases (unknown routes, nested routes)
- File structure verification
- Performance and UX checks
- Regression prevention

**Acceptance Criteria Mapping:**
- AC-1: Deprecated routes return 404
- AC-2: Root route works correctly
- AC-3: Anchor navigation works
- AC-4: Edge cases
- AC-5: File structure verification

### ux-polish.spec.ts

Tests for Story 1-8: Smooth Scroll and UX Polish

**Coverage:**
- Smooth scroll behavior when clicking navigation links
- CSS `scroll-behavior: smooth` property verification
- Scroll offset prevents header overlap (scroll-margin-top: 5rem)
- Skip-nav link accessibility (visibility on focus, keyboard navigation)
- Reduced motion support (`prefers-reduced-motion: reduce`)
- Animation duration reduction for accessibility
- Cross-browser and cross-viewport compatibility
- Performance metrics (scroll timing, CLS, sticky header)
- Keyboard navigation and focus management
- Edge cases (rapid clicks, back/forward buttons, non-existent hashes)

**Acceptance Criteria Mapping:**
- AC-1: Smooth scroll enabled globally via CSS
- AC-2: Scroll offset accounts for sticky header (80px / 5rem)
- AC-3: Reduced motion preference respected
- AC-4: Skip navigation link for accessibility
- AC-5: No performance jank (60fps scroll)
- AC-6: Animations use consistent easing curve

See `tests/e2e/README.md` for detailed documentation.

## Browser Support

Tests run on:
- Desktop: Chrome, Firefox, Safari
- Mobile: Chrome (Pixel 5), Safari (iPhone 12)

## Configuration

See `playwright.config.ts` for full configuration details.

## Accessibility Testing

The test suite includes accessibility checks:
- Skip-nav link keyboard navigation
- ARIA attributes (aria-current, aria-expanded, aria-label)
- Focus management
- Keyboard interactions (Tab, Enter, Escape)

## Writing New Tests

Follow these conventions:
1. Use descriptive test names
2. Add test.describe blocks to group related tests
3. Use beforeEach for common setup
4. Add comments for complex assertions
5. Follow the AAA pattern (Arrange, Act, Assert)

## CI/CD

Tests are configured to run in CI with:
- 2 retries on failure
- Single worker for reliability
- HTML reporter for results
