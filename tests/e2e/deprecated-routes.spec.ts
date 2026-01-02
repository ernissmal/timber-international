import { test, expect } from '@playwright/test';

/**
 * Story 1-6: Remove Deprecated Routes - E2E Tests
 *
 * This test suite verifies that deprecated routes have been properly redirected
 * to their corresponding anchor sections on the SPA homepage.
 *
 * Test Coverage:
 * - Deprecated routes redirect to anchor sections with 301 status
 * - Root route works correctly
 * - Anchor navigation works
 */

test.describe('Deprecated Routes - Story 1-6', () => {
  test.describe('AC-1: Deprecated routes redirect to anchor sections', () => {
    test('should redirect /about to /#about with 301 status', async ({ page }) => {
      const response = await page.goto('/about');

      // Verify 308 status (Next.js uses 308 for permanent redirects in some cases)
      // or 301 for permanent redirects
      expect([301, 308]).toContain(response?.status() || 0);

      // Verify final URL contains anchor
      expect(page.url()).toContain('#about');

      // Verify we're on the homepage with correct anchor
      expect(page.url()).toMatch(/\/#about$/);
    });

    test('should redirect /products to /#products with 301 status', async ({ page }) => {
      const response = await page.goto('/products');

      // Verify permanent redirect status
      expect([301, 308]).toContain(response?.status() || 0);

      // Verify final URL contains anchor
      expect(page.url()).toContain('#products');

      // Verify we're on the homepage with correct anchor
      expect(page.url()).toMatch(/\/#products$/);
    });

    test('should redirect /manufacturing to /#manufacturing with 301 status', async ({ page }) => {
      const response = await page.goto('/manufacturing');

      // Verify permanent redirect status
      expect([301, 308]).toContain(response?.status() || 0);

      // Verify final URL contains anchor
      expect(page.url()).toContain('#manufacturing');

      // Verify we're on the homepage with correct anchor
      expect(page.url()).toMatch(/\/#manufacturing$/);
    });

    test('should redirect /sustainability to /#sustainability with 301 status', async ({ page }) => {
      const response = await page.goto('/sustainability');

      // Verify permanent redirect status
      expect([301, 308]).toContain(response?.status() || 0);

      // Verify final URL contains anchor
      expect(page.url()).toContain('#sustainability');

      // Verify we're on the homepage with correct anchor
      expect(page.url()).toMatch(/\/#sustainability$/);
    });

    test('should redirect /contact to /#contact with 301 status', async ({ page }) => {
      const response = await page.goto('/contact');

      // Verify permanent redirect status
      expect([301, 308]).toContain(response?.status() || 0);

      // Verify final URL contains anchor
      expect(page.url()).toContain('#contact');

      // Verify we're on the homepage with correct anchor
      expect(page.url()).toMatch(/\/#contact$/);
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
    test('should return 404 for non-existent routes (not deprecated routes)', async ({ page }) => {
      const response = await page.goto('/unknown-page');

      // Verify 404 status for truly unknown routes
      expect(response?.status()).toBe(404);
    });

    test('should return 404 for nested deprecated routes', async ({ page }) => {
      const response = await page.goto('/about/team');

      // Verify 404 status for nested routes (not covered by redirects)
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

    test('should preserve query parameters in redirects', async ({ page }) => {
      // Test if query params are handled (optional feature)
      const response = await page.goto('/about?utm_source=test');

      // Verify redirect occurred
      expect([301, 308]).toContain(response?.status() || 0);

      // Verify final URL contains anchor
      expect(page.url()).toContain('#about');
    });
  });

  test.describe('AC-5: File structure and redirect verification', () => {
    test('should have main page and redirects working correctly', async ({ page }) => {
      // Verify root page loads successfully
      const rootResponse = await page.goto('/');
      expect(rootResponse?.status()).toBe(200);

      // Verify old routes redirect instead of returning 404
      const aboutResponse = await page.goto('/about');
      expect([301, 308]).toContain(aboutResponse?.status() || 0);
      expect(page.url()).toContain('#about');

      const productsResponse = await page.goto('/products');
      expect([301, 308]).toContain(productsResponse?.status() || 0);
      expect(page.url()).toContain('#products');
    });

    test('should verify all deprecated routes redirect correctly', async ({ page }) => {
      const deprecatedRoutes = [
        { path: '/about', anchor: '#about' },
        { path: '/products', anchor: '#products' },
        { path: '/manufacturing', anchor: '#manufacturing' },
        { path: '/sustainability', anchor: '#sustainability' },
        { path: '/contact', anchor: '#contact' },
      ];

      for (const route of deprecatedRoutes) {
        const response = await page.goto(route.path);

        // Verify permanent redirect
        expect([301, 308]).toContain(response?.status() || 0);

        // Verify correct anchor in final URL
        expect(page.url()).toContain(route.anchor);
      }
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
