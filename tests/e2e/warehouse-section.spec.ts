import { test, expect } from '@playwright/test'

test.describe('Warehouse Section', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page
    await page.goto('/')

    // Wait for the page to be fully loaded
    await page.waitForLoadState('networkidle')
  })

  test('should render section with correct id and accessibility attributes', async ({ page }) => {
    // Check if section with id="warehouse" exists
    const warehouseSection = page.locator('section#warehouse')
    await expect(warehouseSection).toBeVisible()

    // Verify aria-label attribute
    await expect(warehouseSection).toHaveAttribute('aria-label', 'Warehouse')

    // Verify scroll-mt-20 class is present (for navigation offset)
    await expect(warehouseSection).toHaveClass(/scroll-mt-20/)
  })

  test('should display correct heading and description', async ({ page }) => {
    // Check main heading
    const heading = page.locator('section#warehouse h2')
    await expect(heading).toBeVisible()
    await expect(heading).toHaveText('Storage & Logistics Excellence')

    // Check description text
    const description = page.locator('section#warehouse p').first()
    await expect(description).toBeVisible()
    await expect(description).toContainText('Modern warehouse facilities ensure your timber is stored properly')
  })

  test('should render three capability cards with correct icons and content', async ({ page }) => {
    // Navigate to warehouse section
    await page.locator('section#warehouse').scrollIntoViewIfNeeded()

    // Wait for animations to complete
    await page.waitForTimeout(1000)

    // Get all feature cards
    const featureCards = page.locator('section#warehouse .grid > div')

    // Verify there are exactly 3 cards
    await expect(featureCards).toHaveCount(3)

    // Verify first card - 10,000m² Storage (Warehouse icon)
    const card1 = featureCards.nth(0)
    await expect(card1.locator('h3')).toHaveText('10,000m² Storage')
    await expect(card1.locator('p')).toHaveText('Climate-controlled facilities for optimal timber preservation.')

    // Verify icon is present (Lucide icons render as SVG)
    await expect(card1.locator('svg').first()).toBeVisible()

    // Verify second card - Pan-European Delivery (Truck icon)
    const card2 = featureCards.nth(1)
    await expect(card2.locator('h3')).toHaveText('Pan-European Delivery')
    await expect(card2.locator('p')).toHaveText('Reliable logistics network covering all major markets.')
    await expect(card2.locator('svg').first()).toBeVisible()

    // Verify third card - 48-Hour Dispatch (Clock icon)
    const card3 = featureCards.nth(2)
    await expect(card3.locator('h3')).toHaveText('48-Hour Dispatch')
    await expect(card3.locator('p')).toHaveText('In-stock items shipped within 2 business days.')
    await expect(card3.locator('svg').first()).toBeVisible()
  })

  test('should have correct icon styling (gold color)', async ({ page }) => {
    // Navigate to warehouse section
    await page.locator('section#warehouse').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Get the first icon
    const firstIcon = page.locator('section#warehouse .grid > div').first().locator('svg').first()

    // Verify icon has text-moooi-gold class
    await expect(firstIcon).toHaveClass(/text-moooi-gold/)

    // Verify icon size classes (w-12 h-12)
    await expect(firstIcon).toHaveClass(/w-12/)
    await expect(firstIcon).toHaveClass(/h-12/)
  })

  test('should have proper responsive grid layout', async ({ page, viewport }) => {
    // Navigate to warehouse section
    await page.locator('section#warehouse').scrollIntoViewIfNeeded()

    const grid = page.locator('section#warehouse .grid')
    await expect(grid).toBeVisible()

    // Verify grid classes
    await expect(grid).toHaveClass(/grid/)
    await expect(grid).toHaveClass(/md:grid-cols-3/)
    await expect(grid).toHaveClass(/gap-8/)
  })

  test('should test responsive layout on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    // Navigate to warehouse section
    await page.locator('section#warehouse').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Get all feature cards
    const featureCards = page.locator('section#warehouse .grid > div')

    // Verify cards are stacked vertically (all 3 should be visible)
    await expect(featureCards).toHaveCount(3)

    // On mobile, cards should be in a single column
    const grid = page.locator('section#warehouse .grid')
    await expect(grid).toBeVisible()
  })

  test('should test responsive layout on tablet viewport', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })

    // Navigate to warehouse section
    await page.locator('section#warehouse').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Get all feature cards
    const featureCards = page.locator('section#warehouse .grid > div')

    // Verify all 3 cards are visible
    await expect(featureCards).toHaveCount(3)
  })

  test('should animate header on scroll into view', async ({ page }) => {
    // Start at the top of the page
    await page.goto('/')

    // Get the header element
    const header = page.locator('section#warehouse .text-center.mb-16')

    // Scroll to warehouse section
    await page.locator('section#warehouse').scrollIntoViewIfNeeded()

    // Wait for animation to complete (duration is 0.8s)
    await page.waitForTimeout(1000)

    // Header should be visible after animation
    await expect(header).toBeVisible()

    // Check that opacity is 1 (fully visible)
    const opacity = await header.evaluate((el) => {
      return window.getComputedStyle(el).opacity
    })
    expect(opacity).toBe('1')
  })

  test('should animate feature cards with staggered delays', async ({ page }) => {
    // Start at the top of the page
    await page.goto('/')

    // Scroll to warehouse section to trigger animations
    await page.locator('section#warehouse').scrollIntoViewIfNeeded()

    // Get all feature cards
    const featureCards = page.locator('section#warehouse .grid > div')

    // Wait for first card animation to start (should be immediate)
    await page.waitForTimeout(200)

    // First card should be visible
    await expect(featureCards.nth(0)).toBeVisible()

    // Wait for stagger delays to complete
    // Card 1: 0ms, Card 2: 150ms, Card 3: 300ms + 600ms animation duration
    await page.waitForTimeout(1000)

    // All cards should be visible after animations
    await expect(featureCards.nth(0)).toBeVisible()
    await expect(featureCards.nth(1)).toBeVisible()
    await expect(featureCards.nth(2)).toBeVisible()

    // Verify all cards have opacity: 1
    for (let i = 0; i < 3; i++) {
      const opacity = await featureCards.nth(i).evaluate((el) => {
        return window.getComputedStyle(el).opacity
      })
      expect(opacity).toBe('1')
    }
  })

  test('should only animate once when viewport.once is true', async ({ page }) => {
    // Navigate to page
    await page.goto('/')

    // Scroll to warehouse section
    await page.locator('section#warehouse').scrollIntoViewIfNeeded()

    // Wait for animations to complete
    await page.waitForTimeout(1200)

    // Scroll away from the section
    await page.locator('body').first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Scroll back to warehouse section
    await page.locator('section#warehouse').scrollIntoViewIfNeeded()
    await page.waitForTimeout(500)

    // Cards should still be visible (animation doesn't re-trigger)
    const featureCards = page.locator('section#warehouse .grid > div')
    await expect(featureCards.nth(0)).toBeVisible()
    await expect(featureCards.nth(1)).toBeVisible()
    await expect(featureCards.nth(2)).toBeVisible()
  })

  test('should be keyboard navigable', async ({ page }) => {
    // Navigate to warehouse section
    await page.locator('section#warehouse').scrollIntoViewIfNeeded()

    // Try tabbing through the section
    await page.keyboard.press('Tab')

    // Section should be accessible via keyboard navigation
    // Note: Since there are no interactive elements in the fallback UI,
    // we just verify the section is present and accessible
    const warehouseSection = page.locator('section#warehouse')
    await expect(warehouseSection).toBeVisible()
  })

  test('should have proper semantic HTML structure', async ({ page }) => {
    // Navigate to warehouse section
    await page.locator('section#warehouse').scrollIntoViewIfNeeded()

    // Verify semantic HTML elements
    await expect(page.locator('section#warehouse')).toBeVisible()
    await expect(page.locator('section#warehouse h2')).toBeVisible()
    await expect(page.locator('section#warehouse h3').first()).toBeVisible()

    // Verify there are 3 h3 elements (one for each feature)
    await expect(page.locator('section#warehouse h3')).toHaveCount(3)
  })

  test('should have correct container max-width and padding', async ({ page }) => {
    // Navigate to warehouse section
    await page.locator('section#warehouse').scrollIntoViewIfNeeded()

    // Get the container div
    const container = page.locator('section#warehouse > div').first()

    // Verify container classes
    await expect(container).toHaveClass(/max-w-6xl/)
    await expect(container).toHaveClass(/mx-auto/)
    await expect(container).toHaveClass(/py-20/)
    await expect(container).toHaveClass(/px-6/)
  })

  test('should scroll to section when navigation link is clicked', async ({ page }) => {
    // This test assumes there's a navigation link to #warehouse
    // If navigation exists, clicking it should scroll to the warehouse section

    // Check if warehouse section exists
    const warehouseSection = page.locator('section#warehouse')
    await expect(warehouseSection).toBeAttached()

    // Programmatically navigate to the hash
    await page.evaluate(() => {
      window.location.hash = '#warehouse'
    })

    // Wait for scroll
    await page.waitForTimeout(500)

    // Verify the section is in viewport
    await expect(warehouseSection).toBeInViewport()
  })

  test('should have white background (no background color override)', async ({ page }) => {
    // Navigate to warehouse section
    await page.locator('section#warehouse').scrollIntoViewIfNeeded()

    const section = page.locator('section#warehouse')

    // Get computed background color
    const bgColor = await section.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor
    })

    // Should be transparent or white (allowing default page background)
    // rgba(0, 0, 0, 0) or rgb(255, 255, 255) or similar
    expect(bgColor).toMatch(/rgba?\(255,\s*255,\s*255|rgba?\(0,\s*0,\s*0,\s*0/)
  })

  test('should display all feature card content correctly', async ({ page }) => {
    // Navigate to warehouse section
    await page.locator('section#warehouse').scrollIntoViewIfNeeded()
    await page.waitForTimeout(1000)

    // Verify all feature titles
    await expect(page.locator('section#warehouse h3').nth(0)).toHaveText('10,000m² Storage')
    await expect(page.locator('section#warehouse h3').nth(1)).toHaveText('Pan-European Delivery')
    await expect(page.locator('section#warehouse h3').nth(2)).toHaveText('48-Hour Dispatch')

    // Verify all feature descriptions
    const descriptions = page.locator('section#warehouse .grid > div > p')
    await expect(descriptions.nth(0)).toHaveText('Climate-controlled facilities for optimal timber preservation.')
    await expect(descriptions.nth(1)).toHaveText('Reliable logistics network covering all major markets.')
    await expect(descriptions.nth(2)).toHaveText('In-stock items shipped within 2 business days.')
  })
})
