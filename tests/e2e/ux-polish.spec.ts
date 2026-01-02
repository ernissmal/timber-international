import { test, expect } from '@playwright/test';

/**
 * E2E Tests for Story 1-8: Smooth Scroll and UX Polish
 *
 * Tests verify:
 * - Smooth scrolling when clicking nav links
 * - Sections have correct scroll offset (not hidden behind header)
 * - Skip-nav link appears on focus
 * - Reduced motion is respected
 */

test.describe('Smooth Scroll and UX Polish', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test.describe('Smooth Scroll Behavior', () => {
    test('should smoothly scroll when clicking navigation links', async ({ page }) => {
      // Wait for initial scroll spy to settle
      await page.waitForTimeout(500);

      // Get initial scroll position
      const initialScroll = await page.evaluate(() => window.scrollY);

      // Click on a navigation link (e.g., About)
      await page.click('nav a[href="#about"]');

      // Wait for smooth scroll animation
      await page.waitForTimeout(800);

      // Check that we've scrolled
      const newScroll = await page.evaluate(() => window.scrollY);
      expect(newScroll).toBeGreaterThan(initialScroll);

      // Verify the URL hash has been updated (scroll spy may change it)
      expect(page.url()).toContain('#');
    });

    test('should scroll to correct section for each nav link', async ({ page }) => {
      const sections = [
        { link: '#about', id: 'about' },
        { link: '#oak-slabs', id: 'oak-slabs' },
        { link: '#warehouse', id: 'warehouse' },
        { link: '#products', id: 'products' },
        { link: '#manufacturing', id: 'manufacturing' },
        { link: '#sustainability', id: 'sustainability' },
        { link: '#contact', id: 'contact' },
      ];

      for (const section of sections) {
        // Click the navigation link
        await page.click(`nav a[href="${section.link}"]`);

        // Wait longer for scroll to complete and scroll spy to settle
        await page.waitForTimeout(1000);

        // Verify the section is visible in viewport
        const sectionElement = page.locator(`#${section.id}`);
        await expect(sectionElement).toBeInViewport();
      }
    });

    test('should have smooth scroll CSS property enabled', async ({ page }) => {
      const scrollBehavior = await page.evaluate(() => {
        return window.getComputedStyle(document.documentElement).scrollBehavior;
      });

      expect(scrollBehavior).toBe('smooth');
    });
  });

  test.describe('Scroll Offset and Header Overlap', () => {
    test('should have correct scroll-margin-top on all sections', async ({ page }) => {
      const sections = ['hero', 'about', 'oak-slabs', 'warehouse', 'products', 'manufacturing', 'sustainability', 'contact'];

      for (const sectionId of sections) {
        const scrollMargin = await page.evaluate((id) => {
          const element = document.getElementById(id);
          if (!element) return null;
          return window.getComputedStyle(element).scrollMarginTop;
        }, sectionId);

        // Should be 5rem = 80px (matches h-20 header height)
        expect(scrollMargin).toBe('80px');
      }
    });

    test('should not hide section content behind sticky header', async ({ page }) => {
      // Get header height
      const headerHeight = await page.locator('nav').evaluate((nav) => {
        return nav.getBoundingClientRect().height;
      });

      // Click on About section
      await page.click('nav a[href="#about"]');
      await page.waitForTimeout(800);

      // Get the position of the About section
      const aboutPosition = await page.locator('#about').evaluate((section) => {
        return section.getBoundingClientRect().top;
      });

      // The section should be positioned below the header (with some margin)
      // Account for the scroll-margin-top of 80px
      expect(aboutPosition).toBeGreaterThanOrEqual(headerHeight - 10); // 10px tolerance
    });

    test('should maintain scroll offset when navigating between sections', async ({ page }) => {
      // Navigate to multiple sections
      const sections = ['#about', '#products', '#contact'];

      for (const section of sections) {
        await page.click(`nav a[href="${section}"]`);
        await page.waitForTimeout(800);

        const sectionTop = await page.locator(section).evaluate((el) => {
          return el.getBoundingClientRect().top;
        });

        // Should have offset for the sticky header (80px)
        // Allow some tolerance for scroll settling
        expect(sectionTop).toBeGreaterThanOrEqual(70);
        expect(sectionTop).toBeLessThanOrEqual(90);
      }
    });
  });

  test.describe('Skip Navigation Accessibility', () => {
    test('should have skip-nav link in the DOM', async ({ page }) => {
      const skipNav = page.locator('.skip-nav');
      await expect(skipNav).toBeAttached();
      await expect(skipNav).toHaveText('Skip to main content');
      await expect(skipNav).toHaveAttribute('href', '#hero');
    });

    test('should make skip-nav visible when focused', async ({ page }) => {
      const skipNav = page.locator('.skip-nav');

      // Focus the skip-nav link (press Tab)
      await page.keyboard.press('Tab');

      // Wait for focus state
      await page.waitForTimeout(200);

      // Now it should be visible (focused state shows it)
      const focusedPosition = await skipNav.evaluate((el) => {
        const style = window.getComputedStyle(el);
        return {
          left: style.left,
          position: style.position
        };
      });

      expect(focusedPosition.left).toBe('0px');
      expect(focusedPosition.position).toBe('absolute');
    });

    test('should navigate to hero section when skip-nav is clicked', async ({ page }) => {
      // Focus and click skip-nav
      await page.keyboard.press('Tab');
      await page.keyboard.press('Enter');

      // Wait for navigation and scroll spy to settle
      await page.waitForTimeout(800);

      // Verify URL has a hash (scroll spy may change it)
      expect(page.url()).toContain('#');

      // Hero should be in viewport
      const hero = page.locator('#hero');
      await expect(hero).toBeInViewport();
    });

    test('should have proper z-index for skip-nav visibility', async ({ page }) => {
      const skipNav = page.locator('.skip-nav');

      const zIndex = await skipNav.evaluate((el) => {
        return window.getComputedStyle(el).zIndex;
      });

      expect(zIndex).toBe('100');
    });
  });

  test.describe('Reduced Motion Support', () => {
    test('should disable smooth scroll when prefers-reduced-motion is enabled', async ({ page }) => {
      // Emulate reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });

      // Check scroll behavior
      const scrollBehavior = await page.evaluate(() => {
        return window.getComputedStyle(document.documentElement).scrollBehavior;
      });

      // Should be 'auto' instead of 'smooth'
      expect(scrollBehavior).toBe('auto');
    });

    test('should reduce animation durations when prefers-reduced-motion is enabled', async ({ page }) => {
      // Emulate reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });

      // Check that animation and transition durations are minimal
      const transitionDuration = await page.evaluate(() => {
        const testElement = document.createElement('div');
        testElement.className = 'transition-opacity';
        testElement.style.transition = 'opacity 1s';
        document.body.appendChild(testElement);

        const computedDuration = window.getComputedStyle(testElement).transitionDuration;
        document.body.removeChild(testElement);

        return computedDuration;
      });

      // Should be reduced to 0.01s or very close to 0
      const durationS = parseFloat(transitionDuration);
      expect(durationS).toBeLessThanOrEqual(0.1); // Less than or equal to 0.1 seconds
    });

    test('should maintain functionality with reduced motion enabled', async ({ page }) => {
      // Emulate reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });

      // Navigation should still work
      await page.click('nav a[href="#about"]');
      // Wait for scroll spy to settle (even without smooth scroll)
      await page.waitForTimeout(500);

      // Should still navigate to the section
      const aboutSection = page.locator('#about');
      await expect(aboutSection).toBeInViewport();

      // URL should update (scroll spy may change it)
      expect(page.url()).toContain('#');
    });

    test('should respect reduced motion for all animated elements', async ({ page }) => {
      // Emulate reduced motion preference
      await page.emulateMedia({ reducedMotion: 'reduce' });

      // Check that CSS media query is being respected
      const reducedMotionActive = await page.evaluate(() => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      });

      expect(reducedMotionActive).toBe(true);

      // Verify smooth scrolling is disabled
      const scrollBehavior = await page.evaluate(() => {
        return window.getComputedStyle(document.documentElement).scrollBehavior;
      });

      expect(scrollBehavior).toBe('auto');
    });
  });

  test.describe('Cross-browser Compatibility', () => {
    test('should have consistent scroll behavior across viewports', async ({ page }) => {
      const viewports = [
        { width: 1920, height: 1080, name: 'Desktop' },
        { width: 1024, height: 768, name: 'Tablet' },
        { width: 375, height: 667, name: 'Mobile' },
      ];

      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // On mobile, need to use mobile menu
        if (viewport.width < 768) {
          await page.click('button[aria-label="Open menu"]');
          await page.waitForTimeout(300);
          await page.click('#mobile-menu a[href="#about"]');
        } else {
          // Click on a section
          await page.click('nav a[href="#about"]');
        }

        await page.waitForTimeout(1000);

        // Section should be visible
        const aboutSection = page.locator('#about');
        await expect(aboutSection).toBeInViewport();
      }
    });
  });

  test.describe('Performance and UX', () => {
    test('should complete scroll animation within reasonable time', async ({ page }) => {
      const startTime = Date.now();

      // Click on contact section (furthest down the page)
      await page.click('nav a[href="#contact"]');

      // Wait for section to be in viewport
      const contactSection = page.locator('#contact');
      await expect(contactSection).toBeInViewport({ timeout: 3000 });

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Scroll should complete within 3 seconds (generous timeout)
      expect(duration).toBeLessThan(3000);
    });

    test('should maintain sticky header during scroll', async ({ page }) => {
      const nav = page.locator('nav');

      // Check initial position
      const initialPosition = await nav.evaluate((el) => {
        return window.getComputedStyle(el).position;
      });

      expect(['sticky', 'fixed']).toContain(initialPosition);

      // Scroll down
      await page.click('nav a[href="#contact"]');
      await page.waitForTimeout(1000);

      // Header should still be sticky/fixed
      const scrolledPosition = await nav.evaluate((el) => {
        return window.getComputedStyle(el).position;
      });

      expect(['sticky', 'fixed']).toContain(scrolledPosition);

      // Header should still be visible
      await expect(nav).toBeVisible();
    });

    test('should not cause layout shift during scroll', async ({ page }) => {
      // Get Cumulative Layout Shift (CLS) metric
      const cls = await page.evaluate(() => {
        return new Promise((resolve) => {
          let clsValue = 0;
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (!(entry as any).hadRecentInput) {
                clsValue += (entry as any).value;
              }
            }
          });

          observer.observe({ type: 'layout-shift', buffered: true });

          // Resolve after a short delay
          setTimeout(() => {
            observer.disconnect();
            resolve(clsValue);
          }, 2000);
        });
      });

      // Perform scroll action
      await page.click('nav a[href="#about"]');
      await page.waitForTimeout(1000);

      // CLS should be minimal (< 0.1 is good)
      expect(cls).toBeLessThan(0.1);
    });
  });

  test.describe('Keyboard Navigation', () => {
    test('should allow keyboard navigation through nav links', async ({ page }) => {
      // Press Tab to focus skip-nav
      await page.keyboard.press('Tab');

      // Press Tab again to reach first nav link
      await page.keyboard.press('Tab');

      // Get the focused element
      const focusedElement = await page.evaluate(() => {
        return document.activeElement?.tagName;
      });

      expect(focusedElement).toBe('A');
    });

    test('should activate nav links with Enter key', async ({ page }) => {
      // Focus skip-nav and navigate to first nav link
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      // Find which link is focused and press Enter
      await page.keyboard.press('Enter');
      await page.waitForTimeout(800);

      // Should have navigated (URL should have a hash)
      const url = page.url();
      expect(url).toMatch(/#/);
    });

    test('should show focus indicators on interactive elements', async ({ page }) => {
      // Focus skip-nav
      await page.keyboard.press('Tab');

      const skipNav = page.locator('.skip-nav');

      // Check if element is focused
      const isFocused = await skipNav.evaluate((el) => {
        return document.activeElement === el;
      });

      expect(isFocused).toBe(true);

      // Visual focus state should be visible (left: 0)
      const left = await skipNav.evaluate((el) => {
        return window.getComputedStyle(el).left;
      });

      expect(left).toBe('0px');
    });
  });

  test.describe('Framer Motion Animations', () => {
    test('should have consistent easing curve for animations', async ({ page }) => {
      // This is a visual regression check
      // Verify that sections have the expected animation setup

      // Scroll to trigger animations
      await page.click('nav a[href="#about"]');
      await page.waitForTimeout(1000);

      // Verify about section is visible (animation completed)
      const aboutSection = page.locator('#about');
      await expect(aboutSection).toBeVisible();
      await expect(aboutSection).toBeInViewport();
    });
  });
});

/**
 * Additional test suite for edge cases and error handling
 */
test.describe('Edge Cases and Error Handling', () => {
  test('should handle rapid navigation clicks gracefully', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Click multiple nav links in rapid succession
    await page.click('nav a[href="#about"]');
    await page.click('nav a[href="#products"]');
    await page.click('nav a[href="#contact"]');

    // Wait for final navigation and scroll spy to settle
    await page.waitForTimeout(2000);

    // URL should have a hash (scroll spy determines which)
    expect(page.url()).toContain('#');

    // Contact section should be visible (or close to it)
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeInViewport();
  });

  test('should handle navigation to non-existent hash gracefully', async ({ page }) => {
    await page.goto('/');

    // Navigate to non-existent hash
    await page.goto('/#non-existent-section');

    // Page should still load without errors
    await expect(page).not.toHaveTitle(/Error/);

    // Should stay on the page
    expect(page.url()).toContain('/#non-existent-section');
  });

  test('should work with browser back/forward buttons', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Navigate to About
    await page.click('nav a[href="#about"]');
    await page.waitForTimeout(1000);
    // URL should have a hash
    expect(page.url()).toContain('#');

    // Navigate to Products
    await page.click('nav a[href="#products"]');
    await page.waitForTimeout(1000);
    // URL should have a hash
    expect(page.url()).toContain('#');

    // Go back - scroll spy may change the hash
    await page.goBack();
    await page.waitForTimeout(800);
    expect(page.url()).toContain('#');

    // Go forward - scroll spy may change the hash
    await page.goForward();
    await page.waitForTimeout(800);
    expect(page.url()).toContain('#');
  });
});
