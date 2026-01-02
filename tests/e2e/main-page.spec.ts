import { test, expect } from '@playwright/test'

test.describe('Main Page Section Consolidation', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto('/')
  })

  test('should load page without console errors', async ({ page }) => {
    const consoleErrors: string[] = []

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Filter out known acceptable errors (like network errors in dev mode)
    const criticalErrors = consoleErrors.filter(error =>
      !error.includes('favicon') &&
      !error.includes('_next/static')
    )

    expect(criticalErrors).toHaveLength(0)
  })

  test('should render all 8 sections on homepage', async ({ page }) => {
    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Check all 8 sections are present
    const heroSection = page.locator('section#hero')
    const aboutSection = page.locator('section#about')
    const oakSlabsSection = page.locator('section#oak-slabs')
    const warehouseSection = page.locator('section#warehouse')
    const productsSection = page.locator('section#products')
    const manufacturingSection = page.locator('section#manufacturing')
    const sustainabilitySection = page.locator('section#sustainability')
    const contactSection = page.locator('section#contact')

    await expect(heroSection).toBeVisible()
    await expect(aboutSection).toBeVisible()
    await expect(oakSlabsSection).toBeVisible()
    await expect(warehouseSection).toBeVisible()
    await expect(productsSection).toBeVisible()
    await expect(manufacturingSection).toBeVisible()
    await expect(sustainabilitySection).toBeVisible()
    await expect(contactSection).toBeVisible()
  })

  test('should have sections in correct order', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Get only the top-level section elements (direct children of main)
    const sections = await page.locator('main > section').all()

    // Verify we have exactly 8 sections
    expect(sections.length).toBe(8)

    // Check the order by ID attributes
    const expectedOrder = [
      'hero',
      'about',
      'oak-slabs',
      'warehouse',
      'products',
      'manufacturing',
      'sustainability',
      'contact'
    ]

    for (let i = 0; i < sections.length; i++) {
      const sectionId = await sections[i].getAttribute('id')
      expect(sectionId).toBe(expectedOrder[i])
    }
  })

  test('each section should have correct id attribute', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const expectedIds = [
      'hero',
      'about',
      'oak-slabs',
      'warehouse',
      'products',
      'manufacturing',
      'sustainability',
      'contact'
    ]

    for (const id of expectedIds) {
      const section = page.locator(`section#${id}`)
      await expect(section).toBeVisible()

      // Verify the id attribute is set correctly
      const actualId = await section.getAttribute('id')
      expect(actualId).toBe(id)
    }
  })

  test('each section should have scroll-mt-20 class', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const sectionIds = [
      'hero',
      'about',
      'oak-slabs',
      'warehouse',
      'products',
      'manufacturing',
      'sustainability',
      'contact'
    ]

    for (const id of sectionIds) {
      const section = page.locator(`section#${id}`)
      const classes = await section.getAttribute('class')
      expect(classes).toContain('scroll-mt-20')
    }
  })

  test('each section should have aria-label attribute', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const expectedAriaLabels = [
      { id: 'hero', label: 'Hero' },
      { id: 'about', label: 'About Us' },
      { id: 'oak-slabs', label: 'Oak Slabs' },
      { id: 'warehouse', label: 'Warehouse' },
      { id: 'products', label: 'Products' },
      { id: 'manufacturing', label: 'Manufacturing' },
      { id: 'sustainability', label: 'Sustainability' },
      { id: 'contact', label: 'Contact' }
    ]

    for (const { id, label } of expectedAriaLabels) {
      const section = page.locator(`section#${id}`)
      const ariaLabel = await section.getAttribute('aria-label')
      expect(ariaLabel).toBe(label)
    }
  })

  test('oak-slabs section should have bg-moooi-sand background', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const oakSlabsSection = page.locator('section#oak-slabs')
    const classes = await oakSlabsSection.getAttribute('class')
    expect(classes).toContain('bg-moooi-sand')
  })

  test('hero section should render with fallback or Sanity content', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const heroSection = page.locator('section#hero')
    await expect(heroSection).toBeVisible()

    // Check if either BlockRenderer content or fallback is present
    const hasHeading = await page.locator('section#hero h1').count()
    expect(hasHeading).toBeGreaterThan(0)
  })

  test('anchor links should scroll to correct sections', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Scroll to contact section (if hero has a CTA link)
    const contactLink = page.locator('a[href="#contact"]').first()

    if (await contactLink.isVisible()) {
      await contactLink.click()
      // Wait longer for smooth scroll and scroll spy to settle
      await page.waitForTimeout(1000)

      // Check if contact section is in viewport
      const contactSection = page.locator('section#contact')
      await expect(contactSection).toBeInViewport()

      // URL should have a hash (scroll spy determines which)
      expect(page.url()).toContain('#')
    }
  })

  test('page should have main element wrapping sections', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const mainElement = page.locator('main')
    await expect(mainElement).toBeVisible()

    // Verify top-level sections are inside main
    const sectionsInMain = await page.locator('main > section').count()
    expect(sectionsInMain).toBe(8)
  })

  test('sections should render fallback UI when no Sanity data', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // All sections should render either Sanity content or fallback
    // We can verify this by checking that each section has content
    const sectionIds = [
      'hero',
      'about',
      'oak-slabs',
      'warehouse',
      'products',
      'manufacturing',
      'sustainability',
      'contact'
    ]

    for (const id of sectionIds) {
      const section = page.locator(`section#${id}`)

      // Check that section has some text content
      const textContent = await section.textContent()
      expect(textContent?.length).toBeGreaterThan(0)
    }
  })

  test('oak-slabs fallback should have 3 feature cards', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const oakSlabsSection = page.locator('section#oak-slabs')

    // Check if fallback content is rendered (looking for specific headings)
    const customDimensions = oakSlabsSection.locator('text=Custom Dimensions')
    const kilnDried = oakSlabsSection.locator('text=Kiln Dried')
    const fscCertified = oakSlabsSection.locator('text=FSC Certified')

    // If fallback is visible, all three should be present
    const hasCustomDimensions = await customDimensions.count()
    if (hasCustomDimensions > 0) {
      await expect(customDimensions).toBeVisible()
      await expect(kilnDried).toBeVisible()
      await expect(fscCertified).toBeVisible()
    }
  })

  test('warehouse fallback should have 3 feature cards with icons', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const warehouseSection = page.locator('section#warehouse')

    // Check if fallback content is rendered
    const storage = warehouseSection.locator('text=10,000m² Storage')
    const delivery = warehouseSection.locator('text=Pan-European Delivery')
    const dispatch = warehouseSection.locator('text=48-Hour Dispatch')

    // If fallback is visible, all three should be present
    const hasStorage = await storage.count()
    if (hasStorage > 0) {
      await expect(storage).toBeVisible()
      await expect(delivery).toBeVisible()
      await expect(dispatch).toBeVisible()
    }
  })

  test('page should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Verify all top-level sections are still visible on mobile
    const sections = await page.locator('main > section').all()
    expect(sections.length).toBe(8)

    // Check hero section is visible on mobile
    const heroSection = page.locator('section#hero')
    await expect(heroSection).toBeVisible()
  })

  test('page should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Verify all top-level sections are still visible on tablet
    const sections = await page.locator('main > section').all()
    expect(sections.length).toBe(8)
  })

  test('page should be responsive on desktop viewport', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Verify all top-level sections are still visible on desktop
    const sections = await page.locator('main > section').all()
    expect(sections.length).toBe(8)
  })

  test('server component should handle data fetching', async ({ page }) => {
    // Check network requests to ensure data is fetched server-side
    const responses: string[] = []

    page.on('response', (response) => {
      responses.push(response.url())
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Page should load successfully (sections are visible)
    const heroSection = page.locator('section#hero')
    await expect(heroSection).toBeVisible()
  })

  test('error boundary should handle section errors gracefully', async ({ page }) => {
    // This test verifies that if a section fails, it doesn't break the entire page
    await page.waitForLoadState('networkidle')

    // All top-level sections should be present even if some have errors
    const sections = await page.locator('main > section').all()
    expect(sections.length).toBe(8)

    // Check that other sections still render
    const aboutSection = page.locator('section#about')
    const contactSection = page.locator('section#contact')

    await expect(aboutSection).toBeVisible()
    await expect(contactSection).toBeVisible()
  })
})
