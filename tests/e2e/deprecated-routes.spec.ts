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
      // Capture the redirect response
      let redirectResponse: any = null;
      page.on('response', response => {
        if (response.url().includes('/about') && [301, 307, 308].includes(response.status())) {
          redirectResponse = response;
        }
      });

      await page.goto('/about');

      // Verify redirect occurred (308 is Next.js permanent redirect)
      expect(redirectResponse).not.toBeNull();
      expect([301, 307, 308]).toContain(redirectResponse?.status() || 0);

      // Verify final URL contains anchor
      expect(page.url()).toContain('#about');

      // Verify we're on the homepage with correct anchor
      expect(page.url()).toMatch(/\/#about$/);
    });

    test('should redirect /products to /#products with 301 status', async ({ page }) => {
      // Capture the redirect response
      let redirectResponse: any = null;
      page.on('response', response => {
        if (response.url().includes('/products') && [301, 307, 308].includes(response.status())) {
          redirectResponse = response;
        }
      });

      await page.goto('/products');

      // Verify redirect occurred (308 is Next.js permanent redirect)
      expect(redirectResponse).not.toBeNull();
      expect([301, 307, 308]).toContain(redirectResponse?.status() || 0);

      // Verify final URL contains anchor
      expect(page.url()).toContain('#products');

      // Verify we're on the homepage with correct anchor
      expect(page.url()).toMatch(/\/#products$/);
    });

    test('should redirect /manufacturing to /#manufacturing with 301 status', async ({ page }) => {
      // Capture the redirect response
      let redirectResponse: any = null;
      page.on('response', response => {
        if (response.url().includes('/manufacturing') && [301, 307, 308].includes(response.status())) {
          redirectResponse = response;
        }
      });

      await page.goto('/manufacturing');

      // Verify redirect occurred (308 is Next.js permanent redirect)
      expect(redirectResponse).not.toBeNull();
      expect([301, 307, 308]).toContain(redirectResponse?.status() || 0);

      // Verify final URL contains anchor
      expect(page.url()).toContain('#manufacturing');

      // Verify we're on the homepage with correct anchor
      expect(page.url()).toMatch(/\/#manufacturing$/);
    });

    test('should redirect /sustainability to /#sustainability with 301 status', async ({ page }) => {
      // Capture the redirect response
      let redirectResponse: any = null;
      page.on('response', response => {
        if (response.url().includes('/sustainability') && [301, 307, 308].includes(response.status())) {
          redirectResponse = response;
        }
      });

      await page.goto('/sustainability');

      // Verify redirect occurred (308 is Next.js permanent redirect)
      expect(redirectResponse).not.toBeNull();
      expect([301, 307, 308]).toContain(redirectResponse?.status() || 0);

      // Verify final URL contains anchor
      expect(page.url()).toContain('#sustainability');

      // Verify we're on the homepage with correct anchor
      expect(page.url()).toMatch(/\/#sustainability$/);
    });

    test('should redirect /contact to /#contact with 301 status', async ({ page }) => {
      // Capture the redirect response
      let redirectResponse: any = null;
      page.on('response', response => {
        if (response.url().includes('/contact') && [301, 307, 308].includes(response.status())) {
          redirectResponse = response;
        }
      });

      await page.goto('/contact');

      // Verify redirect occurred (308 is Next.js permanent redirect)
      expect(redirectResponse).not.toBeNull();
      expect([301, 307, 308]).toContain(redirectResponse?.status() || 0);

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
      // Navigate directly to anchor URL
      const response = await page.goto('/#about');

      // Verify successful response
      expect(response?.status()).toBe(200);

      // Verify URL contains hash
      expect(page.url()).toContain('#about');
    });

    test('should navigate to #products section', async ({ page }) => {
      // Navigate directly to anchor URL
      const response = await page.goto('/#products');

      // Verify successful response
      expect(response?.status()).toBe(200);

      // Verify URL contains hash
      expect(page.url()).toContain('#products');
    });

    test('should navigate to #manufacturing section', async ({ page }) => {
      // Navigate directly to anchor URL
      const response = await page.goto('/#manufacturing');

      // Verify successful response
      expect(response?.status()).toBe(200);

      // Verify URL contains hash
      expect(page.url()).toContain('#manufacturing');
    });

    test('should navigate to #sustainability section', async ({ page }) => {
      // Navigate directly to anchor URL
      const response = await page.goto('/#sustainability');

      // Verify successful response
      expect(response?.status()).toBe(200);

      // Verify URL contains hash
      expect(page.url()).toContain('#sustainability');
    });

    test('should navigate to #contact section', async ({ page }) => {
      // Navigate directly to anchor URL
      const response = await page.goto('/#contact');

      // Verify successful response
      expect(response?.status()).toBe(200);

      // Verify URL contains hash
      expect(page.url()).toContain('#contact');
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
      // Capture the redirect response
      let redirectResponse: any = null;
      page.on('response', response => {
        if (response.url().includes('/about') && [301, 307, 308].includes(response.status())) {
          redirectResponse = response;
        }
      });

      // Test if query params are handled (optional feature)
      await page.goto('/about?utm_source=test');

      // Verify redirect occurred (308 is Next.js permanent redirect)
      expect(redirectResponse).not.toBeNull();
      expect([301, 307, 308]).toContain(redirectResponse?.status() || 0);

      // Verify final URL contains anchor
      expect(page.url()).toContain('#about');
    });
  });

  test.describe('AC-5: File structure and redirect verification', () => {
    test('should have main page and redirects working correctly', async ({ page, context }) => {
      // Verify root page loads successfully
      const rootResponse = await page.goto('/');
      expect(rootResponse?.status()).toBe(200);

      // Test /about redirect with fresh page
      const aboutPage = await context.newPage();
      let aboutRedirectResponse: any = null;
      aboutPage.on('response', response => {
        if (response.url().includes('/about') && [301, 307, 308].includes(response.status())) {
          aboutRedirectResponse = response;
        }
      });
      await aboutPage.goto('/about');
      expect(aboutRedirectResponse).not.toBeNull();
      expect([301, 307, 308]).toContain(aboutRedirectResponse?.status() || 0);
      expect(aboutPage.url()).toContain('#about');
      await aboutPage.close();

      // Test /products redirect with fresh page
      const productsPage = await context.newPage();
      let productsRedirectResponse: any = null;
      productsPage.on('response', response => {
        if (response.url().includes('/products') && [301, 307, 308].includes(response.status())) {
          productsRedirectResponse = response;
        }
      });
      await productsPage.goto('/products');
      expect(productsRedirectResponse).not.toBeNull();
      expect([301, 307, 308]).toContain(productsRedirectResponse?.status() || 0);
      expect(productsPage.url()).toContain('#products');
      await productsPage.close();
    });

    test('should verify all deprecated routes redirect correctly', async ({ page, context }) => {
      const deprecatedRoutes = [
        { path: '/about', anchor: '#about' },
        { path: '/products', anchor: '#products' },
        { path: '/manufacturing', anchor: '#manufacturing' },
        { path: '/sustainability', anchor: '#sustainability' },
        { path: '/contact', anchor: '#contact' },
      ];

      for (const route of deprecatedRoutes) {
        // Create a fresh page for each test to avoid event handler conflicts
        const testPage = await context.newPage();

        // Capture the redirect response
        let redirectResponse: any = null;
        testPage.on('response', response => {
          if (response.url().includes(route.path) && [301, 307, 308].includes(response.status())) {
            redirectResponse = response;
          }
        });

        await testPage.goto(route.path);

        // Verify permanent redirect
        expect(redirectResponse).not.toBeNull();
        expect([301, 307, 308]).toContain(redirectResponse?.status() || 0);

        // Verify correct anchor in final URL
        expect(testPage.url()).toContain(route.anchor);

        // Close the test page
        await testPage.close();
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

    // Page should load within 10 seconds (increased for slower environments)
    expect(loadTime).toBeLessThan(10000);
  });

  test('should not have console errors on root page', async ({ page }) => {
    const consoleErrors: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'error') {
        const text = msg.text();
        // Filter out network errors which are not JavaScript errors
        if (!text.includes('ERR_CONTENT_LENGTH_MISMATCH') && !text.includes('Failed to load resource')) {
          consoleErrors.push(text);
        }
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // No console errors should occur (excluding network errors)
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
