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
