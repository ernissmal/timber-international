# E2E Tests for Timber International

This directory contains end-to-end tests for the Timber International website using Playwright.

## Test Coverage

### Story 1-8: Smooth Scroll and UX Polish

File: `ux-polish.spec.ts`

This test suite verifies all acceptance criteria for Story 1-8:

1. **Smooth Scroll Behavior**
   - Smooth scrolling when clicking navigation links
   - Correct navigation to each section
   - CSS `scroll-behavior: smooth` is enabled

2. **Scroll Offset and Header Overlap**
   - All sections have `scroll-margin-top: 5rem` (80px)
   - Content is not hidden behind the sticky header
   - Scroll offset is maintained across all sections

3. **Skip Navigation Accessibility**
   - Skip-nav link exists and is properly positioned
   - Link becomes visible when focused (Tab key)
   - Clicking skip-nav navigates to hero section
   - Proper z-index for visibility

4. **Reduced Motion Support**
   - Smooth scroll disabled when `prefers-reduced-motion: reduce`
   - Animation durations reduced to near-zero
   - Functionality maintained with reduced motion
   - All animated elements respect the preference

5. **Cross-browser Compatibility**
   - Consistent behavior across desktop, tablet, and mobile viewports
   - Tests run on Chromium, Firefox, and WebKit

6. **Performance and UX**
   - Scroll animations complete within reasonable time
   - Sticky header maintained during scroll
   - No layout shift (CLS < 0.1)

7. **Keyboard Navigation**
   - Tab navigation through all interactive elements
   - Enter key activates navigation links
   - Focus indicators visible on all elements

8. **Edge Cases**
   - Rapid navigation clicks handled gracefully
   - Non-existent hash navigation doesn't break
   - Browser back/forward buttons work correctly

## Running Tests

### Prerequisites

Before running tests, install Playwright browsers:

```bash
npx playwright install
```

Or install a specific browser:

```bash
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

### Run All Tests

```bash
npm run test:e2e
```

### Run Tests in UI Mode (Recommended for Development)

```bash
npm run test:e2e:ui
```

This opens the Playwright UI where you can:
- See all tests in a tree view
- Run tests individually or in groups
- Watch mode for automatic re-running on file changes
- Time travel through test execution
- View detailed logs and traces

### Run Tests in Headed Mode (See Browser)

```bash
npm run test:e2e:headed
```

### Debug Tests

```bash
npm run test:e2e:debug
```

This runs tests in debug mode with Playwright Inspector, allowing you to:
- Step through tests line by line
- Pause execution
- Inspect the page at any point
- Edit locators on the fly

### View Test Report

After running tests, view the HTML report:

```bash
npm run test:e2e:report
```

### Run Specific Tests

Run a specific test file:
```bash
npx playwright test ux-polish.spec.ts
```

Run tests matching a pattern:
```bash
npx playwright test --grep "smooth scroll"
```

Run tests on a specific browser:
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Structure

```
tests/
└── e2e/
    ├── README.md                  # This file
    └── ux-polish.spec.ts         # UX Polish test suite
```

## Configuration

Playwright configuration is in `playwright.config.ts` at the project root.

Key settings:
- **Test directory:** `./tests/e2e`
- **Base URL:** `http://localhost:3000`
- **Browsers:** Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Screenshots:** On failure only
- **Traces:** On first retry
- **Web Server:** Auto-starts Next.js dev server

## Writing New Tests

### Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should do something', async ({ page }) => {
    // Test implementation
  });
});
```

### Best Practices

1. **Use Semantic Locators**
   ```typescript
   // Good
   await page.getByRole('button', { name: 'Submit' }).click();

   // Avoid
   await page.click('.btn-submit');
   ```

2. **Wait for Stable State**
   ```typescript
   await page.waitForLoadState('networkidle');
   ```

3. **Use Auto-waiting**
   Playwright auto-waits for elements to be actionable. Avoid manual `waitForTimeout` unless testing animations.

4. **Test User Journeys**
   Test complete user flows, not just individual interactions.

5. **Keep Tests Independent**
   Each test should be able to run in isolation.

## Debugging Tips

### Visual Debugging

```bash
# Run with headed browser
npm run test:e2e:headed

# Run with Playwright Inspector
npm run test:e2e:debug
```

### Screenshot on Failure

Screenshots are automatically captured on test failure and saved to `test-results/`.

### Trace Viewer

If a test fails, view the trace:
```bash
npx playwright show-trace test-results/[test-name]/trace.zip
```

### Console Logs

View browser console logs:
```typescript
page.on('console', msg => console.log(msg.text()));
```

## CI/CD Integration

Tests are configured to run in CI with:
- 2 retries on failure
- Single worker (sequential execution)
- HTML reporter for viewing results

To run in CI mode locally:
```bash
CI=true npm run test:e2e
```

## Accessibility Testing

The `ux-polish.spec.ts` suite includes accessibility tests for:
- Skip navigation
- Keyboard navigation
- Focus management
- Reduced motion preferences

For comprehensive accessibility auditing, consider adding:
- [@axe-core/playwright](https://www.npmjs.com/package/@axe-core/playwright)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

## Performance Testing

Tests include basic performance checks:
- Scroll animation duration
- Layout shift (CLS)
- Visual regression (screenshot comparison)

For detailed performance testing, use:
- Chrome DevTools Performance tab
- Lighthouse (built into Chrome DevTools)

## Troubleshooting

### Tests Failing Locally

1. **Ensure dev server is running:**
   ```bash
   npm run dev
   ```

2. **Clear browser cache:**
   ```bash
   npx playwright test --update-snapshots
   ```

3. **Update browsers:**
   ```bash
   npx playwright install
   ```

### Flaky Tests

If tests are flaky:
1. Increase timeout for specific assertions
2. Use `waitForLoadState('networkidle')` before actions
3. Add `await page.waitForTimeout(100)` for animations
4. Check for race conditions in the application

### Screenshots Don't Match

Update snapshots:
```bash
npx playwright test --update-snapshots
```

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Accessibility Testing Guide](https://playwright.dev/docs/accessibility-testing)
- [Visual Comparisons](https://playwright.dev/docs/test-snapshots)

## Contact

For questions or issues with tests, please refer to:
- Story file: `_bmad-output/implementation-artifacts/1-8-smooth-scroll-ux-polish.md`
- Tech spec: `_bmad-output/implementation-artifacts/tech-spec-spa-restructure.md`
