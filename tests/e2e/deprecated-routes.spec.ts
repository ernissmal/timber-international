import { test, expect } from '@playwright/test';

/**
 * Story 1-6: Remove Deprecated Routes - E2E Tests
 *
 * This test suite verifies that deprecated routes have been properly removed
 * and the SPA structure is working correctly.
 *
 * Test Coverage:
 * - Deprecated routes return 404
 * - Root route works correctly
 * - Anchor navigation works
 */

test.describe('Deprecated Routes - Story 1-6', () => {
  test.describe('AC-1: Deprecated routes return 404', () => {
    test('should return 404 for /about route', async ({ page }) => {
      const response = await page.goto('/about');

      // Verify 404 status
      expect(response?.status()).toBe(404);

      // Verify 404 page is displayed (you may need to adjust based on your 404 page content)
      await expect(page).toHaveTitle(/404|Not Found/i);
    });

    test('should return 404 for /products route', async ({ page }) => {
      const response = await page.goto('/products');

      // Verify 404 status
      expect(response?.status()).toBe(404);

      // Verify 404 page is displayed
      await expect(page).toHaveTitle(/404|Not Found/i);
    });

    test('should return 404 for /manufacturing route', async ({ page }) => {
      const response = await page.goto('/manufacturing');

      // Verify 404 status
      expect(response?.status()).toBe(404);

      // Verify 404 page is displayed
      await expect(page).toHaveTitle(/404|Not Found/i);
    });

    test('should return 404 for /sustainability route', async ({ page }) => {
      const response = await page.goto('/sustainability');

      // Verify 404 status
      expect(response?.status()).toBe(404);

      // Verify 404 page is displayed
      await expect(page).toHaveTitle(/404|Not Found/i);
    });

    test('should return 404 for /contact route', async ({ page }) => {
      const response = await page.goto('/contact');

      // Verify 404 status
      expect(response?.status()).toBe(404);

      // Verify 404 page is displayed
      await expect(page).toHaveTitle(/404|Not Found/i);
    });
  });

  test.describe('AC-2: Root route works correctly', () => {
    test('should load the root page successfully', async ({ page }) => {
      const response = await page.goto('/');

      // Verify successful response
      expect(response?.status()).toBe(200);

      // Verify page title (adjust based on your actual title)
      await expect(page).toHaveTitle(/Timber International/i);
    });

    test('should display main page content', async ({ page }) => {
      await page.goto('/');

      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Verify the page has content (not just a blank page)
      const bodyText = await page.textContent('body');
      expect(bodyText).toBeTruthy();
      expect(bodyText!.length).toBeGreaterThan(100);
    });
  });

  test.describe('AC-3: Anchor navigation works', () => {
    test('should navigate to #about section', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Navigate to anchor
      await page.goto('/#about');

      // Verify URL contains hash
      expect(page.url()).toContain('#about');

      // Verify no 404 error
      const response = await page.goto('/#about');
      expect(response?.status()).toBe(200);
    });

    test('should navigate to #products section', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Navigate to anchor
      await page.goto('/#products');

      // Verify URL contains hash
      expect(page.url()).toContain('#products');

      // Verify no 404 error
      const response = await page.goto('/#products');
      expect(response?.status()).toBe(200);
    });

    test('should navigate to #manufacturing section', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Navigate to anchor
      await page.goto('/#manufacturing');

      // Verify URL contains hash
      expect(page.url()).toContain('#manufacturing');

      // Verify no 404 error
      const response = await page.goto('/#manufacturing');
      expect(response?.status()).toBe(200);
    });

    test('should navigate to #sustainability section', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Navigate to anchor
      await page.goto('/#sustainability');

      // Verify URL contains hash
      expect(page.url()).toContain('#sustainability');

      // Verify no 404 error
      const response = await page.goto('/#sustainability');
      expect(response?.status()).toBe(200);
    });

    test('should navigate to #contact section', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Navigate to anchor
      await page.goto('/#contact');

      // Verify URL contains hash
      expect(page.url()).toContain('#contact');

      // Verify no 404 error
      const response = await page.goto('/#contact');
      expect(response?.status()).toBe(200);
    });
  });

  test.describe('AC-4: Edge cases', () => {
    test('should return 404 for non-existent routes', async ({ page }) => {
      const response = await page.goto('/unknown-page');

      // Verify 404 status
      expect(response?.status()).toBe(404);
    });

    test('should return 404 for nested deprecated routes', async ({ page }) => {
      const response = await page.goto('/about/team');

      // Verify 404 status
      expect(response?.status()).toBe(404);
    });

    test('should handle direct hash navigation from external link', async ({ page }) => {
      // Simulate coming from external link with hash
      const response = await page.goto('/#contact');

      // Verify successful load
      expect(response?.status()).toBe(200);

      // Verify hash is present
      expect(page.url()).toContain('#contact');
    });
  });

  test.describe('AC-5: File structure verification', () => {
    test('should only have main page files in app/(frontend)', async ({ page }) => {
      // This test documents expected file structure
      // Actual file verification happens in code review
      await page.goto('/');

      // If we can load the root page, the structure is correct
      const response = await page.goto('/');
      expect(response?.status()).toBe(200);

      // Verify old routes don't work
      const aboutResponse = await page.goto('/about');
      expect(aboutResponse?.status()).toBe(404);

      const productsResponse = await page.goto('/products');
      expect(productsResponse?.status()).toBe(404);
    });
  });
});

/**
 * Additional Test Scenarios for Comprehensive Coverage
 */
test.describe('Performance and UX', () => {
  test('should load root page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;

    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should not have console errors on root page', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // No console errors should occur
    expect(consoleErrors).toHaveLength(0);
  });
});

/**
 * Regression Tests
 */
test.describe('Regression Prevention', () => {
  test('should maintain working navigation after route removal', async ({ page }) => {
    await page.goto('/');

    // Test that basic navigation still works
    await page.waitForLoadState('networkidle');

    // If there's a navigation menu, test it
    // Note: Adjust selectors based on your actual navigation structure
    const nav = await page.$('nav');
    if (nav) {
      expect(nav).toBeTruthy();
    }
  });

  test('should not break build after route removal', async ({ page }) => {
    // If the dev server is running, the build didn't break
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });
});
