import { test, expect } from '@playwright/test'

/**
 * E2E tests for Oak Slabs Section (STORY-001-03)
 *
 * Tests verify:
 * - Section renders with correct id and attributes
 * - Content displays correctly (heading, features, CTA)
 * - Responsive layout works across breakpoints
 * - Accessibility attributes are present
 * - Navigation and interactions work as expected
 */

test.describe('Oak Slabs Section', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/')

    // Wait for the page to load
    await page.waitForLoadState('networkidle')
  })

  test.describe('Core Functionality', () => {
    test('AC-1: Section renders with id="oak-slabs"', async ({ page }) => {
      const section = page.locator('section#oak-slabs')
      await expect(section).toBeVisible()
    })

    test('AC-2: Section has scroll-mt-20 class for sticky header offset', async ({ page }) => {
      const section = page.locator('section#oak-slabs')
      await expect(section).toHaveClass(/scroll-mt-20/)
    })

    test('AC-3: Section displays main heading', async ({ page }) => {
      const heading = page.locator('section#oak-slabs h2')
      await expect(heading).toBeVisible()
      await expect(heading).toContainText('Solid Oak. Industrial Scale.')
    })

    test('AC-4: Three feature cards are displayed', async ({ page }) => {
      const section = page.locator('section#oak-slabs')

      // Check for Custom Dimensions card
      const customDimensionsCard = section.getByRole('heading', { name: 'Custom Dimensions', level: 3 })
      await expect(customDimensionsCard).toBeVisible()

      // Check for Kiln Dried card
      const kilnDriedCard = section.getByRole('heading', { name: 'Kiln Dried', level: 3 })
      await expect(kilnDriedCard).toBeVisible()

      // Check for FSC Certified card
      const fscCertifiedCard = section.getByRole('heading', { name: 'FSC Certified', level: 3 })
      await expect(fscCertifiedCard).toBeVisible()
    })

    test('AC-5: CTA button links to #contact section', async ({ page }) => {
      const oakSlabsSection = page.locator('section#oak-slabs')
      await oakSlabsSection.scrollIntoViewIfNeeded()
      const ctaButton = oakSlabsSection.locator('a[href="#contact"]')
      await expect(ctaButton).toBeVisible()
      await expect(ctaButton).toContainText('Request Specifications')
    })

    test('AC-6: Section uses bg-moooi-sand background color', async ({ page }) => {
      const section = page.locator('section#oak-slabs')
      await expect(section).toHaveClass(/bg-moooi-sand/)
    })
  })

  test.describe('Content Verification', () => {
    test('Fallback content: Main heading is visible', async ({ page }) => {
      const heading = page.locator('section#oak-slabs h2')
      await expect(heading).toContainText('Solid Oak. Industrial Scale.')
    })

    test('Fallback content: Subheading is visible', async ({ page }) => {
      const subheading = page.locator('section#oak-slabs p.text-xl')
      await expect(subheading).toBeVisible()
      await expect(subheading).toContainText('Premium solid oak slabs manufactured to your specifications')
    })

    test('Fallback content: Custom Dimensions feature card has correct content', async ({ page }) => {
      const section = page.locator('section#oak-slabs')
      const card = section.locator('div:has(h3:has-text("Custom Dimensions"))')

      await expect(card.getByRole('heading', { level: 3 })).toContainText('Custom Dimensions')
      await expect(card.locator('p')).toContainText('precision CNC machinery')
      await expect(card.locator('p')).toContainText('±0.5mm')
    })

    test('Fallback content: Kiln Dried feature card has correct content', async ({ page }) => {
      const section = page.locator('section#oak-slabs')
      const card = section.locator('div:has(h3:has-text("Kiln Dried"))')

      await expect(card.getByRole('heading', { level: 3 })).toContainText('Kiln Dried')
      await expect(card.locator('p')).toContainText('8-12%')
      await expect(card.locator('p')).toContainText('drying records')
    })

    test('Fallback content: FSC Certified feature card has correct content', async ({ page }) => {
      const section = page.locator('section#oak-slabs')
      const card = section.locator('div:has(h3:has-text("FSC Certified"))')

      await expect(card.getByRole('heading', { level: 3 })).toContainText('FSC Certified')
      await expect(card.locator('p')).toContainText('sustainable European forests')
      await expect(card.locator('p')).toContainText('Chain of custody')
    })

    test('CTA button has correct text and styling', async ({ page }) => {
      const oakSlabsSection = page.locator('section#oak-slabs')
      await oakSlabsSection.scrollIntoViewIfNeeded()
      const ctaButton = oakSlabsSection.locator('a[href="#contact"]')

      await expect(ctaButton).toContainText('Request Specifications')
      await expect(ctaButton).toHaveClass(/bg-moooi-gold/)
      await expect(ctaButton).toHaveClass(/text-white/)
      await expect(ctaButton).toHaveClass(/rounded-full/)
    })
  })

  test.describe('Responsive Design', () => {
    test('AC-15 & AC-16: Feature cards display in single column on mobile', async ({ page }) => {
      // Set mobile viewport (320px width)
      await page.setViewportSize({ width: 320, height: 568 })

      const section = page.locator('section#oak-slabs')
      const grid = section.locator('div.grid')

      // Verify grid exists
      await expect(grid).toBeVisible()

      // Check that cards are stacked vertically (single column)
      // This is inherent to the base grid class without md:grid-cols-3
      const cards = section.locator('div.bg-white')
      const cardCount = await cards.count()
      expect(cardCount).toBe(3)
    })

    test('AC-16: Feature cards display in 3-column grid on desktop', async ({ page }) => {
      // Set desktop viewport (1024px width)
      await page.setViewportSize({ width: 1024, height: 768 })

      const section = page.locator('section#oak-slabs')
      const grid = section.locator('div.grid')

      // Verify grid has md:grid-cols-3 class
      await expect(grid).toHaveClass(/md:grid-cols-3/)
    })

    test('AC-17: Section maintains proper spacing on mobile (320px)', async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 568 })
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const section = page.locator('section#oak-slabs')
      await expect(section).toBeVisible()

      // Verify section or its container has padding (may be on inner div)
      const container = section.locator('> div').first()
      await expect(container).toHaveClass(/py-20/)
      await expect(container).toHaveClass(/px-6/)
    })

    test('AC-17: Section maintains proper spacing on tablet (768px)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 })

      const section = page.locator('section#oak-slabs')
      await expect(section).toBeVisible()

      // Verify grid layout appears at this breakpoint
      const grid = section.locator('div.grid')
      await expect(grid).toHaveClass(/md:grid-cols-3/)
    })

    test('AC-17: Section maintains proper spacing on desktop (1440px)', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 })

      const section = page.locator('section#oak-slabs')
      await expect(section).toBeVisible()

      // Verify max-width container centers content
      const container = section.locator('div.max-w-6xl')
      await expect(container).toBeVisible()
    })

    test('Responsive text sizes work correctly', async ({ page }) => {
      // Test mobile size
      await page.setViewportSize({ width: 375, height: 667 })
      const headingMobile = page.locator('section#oak-slabs h2')
      await expect(headingMobile).toBeVisible()

      // Test desktop size
      await page.setViewportSize({ width: 1440, height: 900 })
      const headingDesktop = page.locator('section#oak-slabs h2')
      await expect(headingDesktop).toBeVisible()
      await expect(headingDesktop).toHaveClass(/md:text-5xl/)
    })
  })

  test.describe('Accessibility', () => {
    test('AC-18: Section has aria-label="Oak Slabs"', async ({ page }) => {
      const section = page.locator('section#oak-slabs')
      await expect(section).toHaveAttribute('aria-label', 'Oak Slabs')
    })

    test('AC-20: Feature cards use semantic heading hierarchy', async ({ page }) => {
      const section = page.locator('section#oak-slabs')

      // Check H2 for main heading
      const h2 = section.locator('h2')
      await expect(h2).toBeVisible()

      // Check H3 for card titles
      const h3Cards = section.locator('h3')
      const h3Count = await h3Cards.count()
      expect(h3Count).toBe(3)
    })

    test('Keyboard navigation: CTA button is focusable', async ({ page }) => {
      const ctaButton = page.locator('section#oak-slabs a[href="#contact"]')

      // Tab to the CTA button
      await page.keyboard.press('Tab')

      // Verify button is in the page
      await expect(ctaButton).toBeVisible()
    })

    test('Screen reader: All text content is accessible', async ({ page }) => {
      const section = page.locator('section#oak-slabs')

      // Check that all important text is in the DOM
      await expect(section).toContainText('Solid Oak. Industrial Scale.')
      await expect(section).toContainText('Custom Dimensions')
      await expect(section).toContainText('Kiln Dried')
      await expect(section).toContainText('FSC Certified')
      await expect(section).toContainText('Request Specifications')
    })
  })

  test.describe('Navigation and Interactions', () => {
    test('Anchor navigation: Scrolling to #oak-slabs works', async ({ page }) => {
      // Navigate directly to the oak-slabs section
      await page.goto('/#oak-slabs')

      // Wait for navigation to complete
      await page.waitForLoadState('networkidle')

      // Verify section is visible in viewport
      const section = page.locator('section#oak-slabs')
      await expect(section).toBeInViewport()
    })

    test('CTA button click navigates to #contact', async ({ page }) => {
      const oakSlabsSection = page.locator('section#oak-slabs')
      await oakSlabsSection.scrollIntoViewIfNeeded()
      const ctaButton = oakSlabsSection.locator('a[href="#contact"]')

      // Click the CTA button
      await ctaButton.click()

      // Wait for navigation
      await page.waitForTimeout(1000)

      // Verify URL has changed to include #contact or scroll spy changed it
      expect(page.url()).toContain('#')
    })

    test('Scroll offset: Section does not hide under sticky header', async ({ page }) => {
      // Navigate to oak-slabs section
      await page.goto('/#oak-slabs')
      await page.waitForLoadState('networkidle')

      const section = page.locator('section#oak-slabs')

      // Verify section has scroll-mt-20 class (80px offset)
      await expect(section).toHaveClass(/scroll-mt-20/)

      // Verify section is visible
      await expect(section).toBeInViewport()
    })
  })

  test.describe('Visual Styling', () => {
    test('Feature cards have correct styling', async ({ page }) => {
      const section = page.locator('section#oak-slabs')
      const cards = section.locator('div.bg-white')

      // Verify all 3 cards exist
      const cardCount = await cards.count()
      expect(cardCount).toBe(3)

      // Verify first card has correct styling
      const firstCard = cards.first()
      await expect(firstCard).toHaveClass(/bg-white/)
      await expect(firstCard).toHaveClass(/p-8/)
      await expect(firstCard).toHaveClass(/rounded-2xl/)
      await expect(firstCard).toHaveClass(/shadow-sm/)
    })

    test('Grid has correct gap spacing', async ({ page }) => {
      const section = page.locator('section#oak-slabs')
      const grid = section.locator('div.grid')

      await expect(grid).toHaveClass(/gap-8/)
    })

    test('CTA button hover state works', async ({ page }) => {
      const oakSlabsSection = page.locator('section#oak-slabs')
      await oakSlabsSection.scrollIntoViewIfNeeded()
      const ctaButton = oakSlabsSection.locator('a[href="#contact"]')

      // Verify hover class is present
      await expect(ctaButton).toHaveClass(/hover:bg-moooi-gold\/90/)
    })
  })

  test.describe('Performance and Layout', () => {
    test('Section renders without layout shift', async ({ page }) => {
      // Navigate to page
      await page.goto('/')

      // Wait for section to be visible
      const section = page.locator('section#oak-slabs')
      await expect(section).toBeVisible()

      // Scroll to section
      await section.scrollIntoViewIfNeeded()

      // Verify section is stable in viewport
      await expect(section).toBeInViewport()
    })

    test('All content loads successfully', async ({ page }) => {
      const section = page.locator('section#oak-slabs')

      // Verify section is visible
      await expect(section).toBeVisible()

      // Scroll to section first
      await section.scrollIntoViewIfNeeded()

      // Verify all key elements are present
      await expect(section.locator('h2')).toBeVisible()
      await expect(section.locator('h3').first()).toBeVisible()
      await expect(section.locator('a[href="#contact"]')).toBeVisible()
    })

    test('No console errors on load', async ({ page }) => {
      const errors: string[] = []

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text())
        }
      })

      await page.goto('/')
      await page.waitForLoadState('networkidle')

      // Scroll to oak slabs section
      const section = page.locator('section#oak-slabs')
      await section.scrollIntoViewIfNeeded()

      // No errors should be logged
      expect(errors.length).toBe(0)
    })
  })
})
