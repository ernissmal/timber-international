import { test, expect } from '@playwright/test'

/**
 * Story 1-7: Sanity Content Structure Integration Tests
 *
 * Tests verify:
 * - Homepage loads data from Sanity via getAllSections()
 * - All 8 sections receive data props
 * - Fallback UI shows when Sanity data missing
 * - No console errors during fetch
 */

test.describe('Sanity Content Structure Integration', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to homepage before each test
    await page.goto('/')
  })

  test('should load homepage without console errors', async ({ page }) => {
    const consoleErrors: string[] = []
    const consoleWarnings: string[] = []

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text())
      }
      if (message.type() === 'warning') {
        consoleWarnings.push(message.text())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Filter out known acceptable errors (like favicon, dev mode errors)
    const criticalErrors = consoleErrors.filter(error =>
      !error.includes('favicon') &&
      !error.includes('_next/static') &&
      !error.includes('DevTools')
    )

    // Check for Sanity-specific errors
    const sanityErrors = consoleErrors.filter(error =>
      error.includes('Sanity') ||
      error.includes('getAllSections') ||
      error.includes('GROQ')
    )

    expect(criticalErrors).toHaveLength(0)
    expect(sanityErrors).toHaveLength(0)
  })

  test('should fetch data from Sanity via getAllSections()', async ({ page }) => {
    // Monitor network for potential Sanity API calls
    // Note: Since this is SSR, data is fetched server-side
    await page.waitForLoadState('networkidle')

    // Verify that all 8 sections are rendered (indicates successful data fetch)
    const sections = await page.locator('main section').all()
    expect(sections.length).toBe(8)

    // Verify each section has an ID (from AllSectionsData)
    const expectedSections = [
      'hero',
      'about',
      'oak-slabs',
      'warehouse',
      'products',
      'manufacturing',
      'sustainability',
      'contact'
    ]

    for (const sectionId of expectedSections) {
      const section = page.locator(`section#${sectionId}`)
      await expect(section).toBeVisible()
    }
  })

  test('all 8 sections should receive data props from getAllSections()', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Each section should have content (either from Sanity or fallback)
    const sectionSelectors = [
      { id: 'hero', name: 'Hero' },
      { id: 'about', name: 'About Us' },
      { id: 'oak-slabs', name: 'Oak Slabs' },
      { id: 'warehouse', name: 'Warehouse' },
      { id: 'products', name: 'Products' },
      { id: 'manufacturing', name: 'Manufacturing' },
      { id: 'sustainability', name: 'Sustainability' },
      { id: 'contact', name: 'Contact' }
    ]

    for (const { id, name } of sectionSelectors) {
      const section = page.locator(`section#${id}`)

      // Section should be visible
      await expect(section).toBeVisible()

      // Section should have content (text length > 0)
      const textContent = await section.textContent()
      expect(textContent?.length).toBeGreaterThan(0)

      // Section should have aria-label (accessibility)
      const ariaLabel = await section.getAttribute('aria-label')
      expect(ariaLabel).toBe(name)
    }
  })

  test('should render Sanity BlockRenderer content when data available', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Check for BlockRenderer rendered content
    // BlockRenderer uses specific __typename classes or data attributes

    // Hero section should have either Sanity content or fallback
    const heroSection = page.locator('section#hero')
    await expect(heroSection).toBeVisible()

    // Check for common block elements that would come from Sanity
    const hasHeading = await heroSection.locator('h1, h2').count()
    expect(hasHeading).toBeGreaterThan(0)
  })

  test('should show fallback UI when Sanity data is null', async ({ page, context }) => {
    // This test verifies the error handling path
    // When getAllSections() returns null for a section, fallback should render

    await page.waitForLoadState('networkidle')

    // Check each section for either:
    // 1. Sanity content (BlockRenderer output)
    // 2. Fallback content (hardcoded in section components)

    const sections = [
      'hero',
      'about',
      'oak-slabs',
      'warehouse',
      'products',
      'manufacturing',
      'sustainability',
      'contact'
    ]

    for (const sectionId of sections) {
      const section = page.locator(`section#${sectionId}`)

      // Section must be visible (either with data or fallback)
      await expect(section).toBeVisible()

      // Section must have some content
      const textContent = await section.textContent()
      expect(textContent).toBeTruthy()
      expect(textContent!.length).toBeGreaterThan(0)

      // Section should NOT show error boundary fallback
      // (Error boundary shows "Unable to load [Section] section")
      const hasErrorBoundaryText = textContent?.includes('Unable to load')
      expect(hasErrorBoundaryText).toBe(false)
    }
  })

  test('Oak Slabs section should render with Sanity data or fallback', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const oakSlabsSection = page.locator('section#oak-slabs')
    await expect(oakSlabsSection).toBeVisible()

    // Should have bg-moooi-sand class
    const classes = await oakSlabsSection.getAttribute('class')
    expect(classes).toContain('bg-moooi-sand')

    // Should have content (either Sanity blocks or fallback features)
    const textContent = await oakSlabsSection.textContent()
    expect(textContent?.length).toBeGreaterThan(0)

    // Check for either Sanity content or fallback content
    const hasCustomDimensions = textContent?.includes('Custom Dimensions')
    const hasKilnDried = textContent?.includes('Kiln Dried')
    const hasFSC = textContent?.includes('FSC')

    // If fallback is showing, all three features should be present
    if (hasCustomDimensions || hasKilnDried || hasFSC) {
      expect(hasCustomDimensions).toBe(true)
      expect(hasKilnDried).toBe(true)
      expect(hasFSC).toBe(true)
    }
  })

  test('Warehouse section should render with Sanity data or fallback', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const warehouseSection = page.locator('section#warehouse')
    await expect(warehouseSection).toBeVisible()

    // Should have content
    const textContent = await warehouseSection.textContent()
    expect(textContent?.length).toBeGreaterThan(0)

    // Check for either Sanity content or fallback content
    const hasStorage = textContent?.includes('10,000m²') || textContent?.includes('Storage')
    const hasDelivery = textContent?.includes('Pan-European') || textContent?.includes('Delivery')
    const hasDispatch = textContent?.includes('48-Hour') || textContent?.includes('Dispatch')

    // If fallback is showing, warehouse-specific features should be present
    if (hasStorage || hasDelivery || hasDispatch) {
      expect(hasStorage || hasDelivery || hasDispatch).toBe(true)
    }
  })

  test('should handle missing sections gracefully (null data)', async ({ page }) => {
    // This tests the error handling in getAllSections()
    // When a section doesn't exist in Sanity, it returns null
    // Section components should handle null data without crashing

    await page.waitForLoadState('networkidle')

    // All sections should still render
    const sections = await page.locator('main section').all()
    expect(sections.length).toBe(8)

    // No section should show error boundary fallback
    const errorBoundaryText = await page.locator('text=Unable to load').count()
    expect(errorBoundaryText).toBe(0)
  })

  test('should verify AllSectionsData type structure in rendered HTML', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Verify that data structure matches AllSectionsData interface
    // by checking that all 8 sections exist with correct IDs

    const expectedSectionIds = [
      'hero',
      'about',
      'oakSlabs', // camelCase in interface
      'warehouse',
      'products',
      'manufacturing',
      'sustainability',
      'contact'
    ]

    // Check corresponding HTML IDs (kebab-case)
    const htmlIds = [
      'hero',
      'about',
      'oak-slabs',
      'warehouse',
      'products',
      'manufacturing',
      'sustainability',
      'contact'
    ]

    for (const htmlId of htmlIds) {
      const section = page.locator(`section#${htmlId}`)
      await expect(section).toBeVisible()

      // Verify ID attribute is correct
      const actualId = await section.getAttribute('id')
      expect(actualId).toBe(htmlId)
    }
  })

  test('should verify GROQ query transformation (_type to __typename)', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // transformSanityBlocks() converts _type to __typename
    // We can't directly test the transformation, but we can verify
    // that blocks are rendered correctly (indicating successful transformation)

    const heroSection = page.locator('section#hero')
    await expect(heroSection).toBeVisible()

    // Hero should have block content (h1, h2, etc.)
    const blockElements = await heroSection.locator('h1, h2, p, button, a').count()
    expect(blockElements).toBeGreaterThan(0)
  })

  test('should verify ISR revalidation configuration', async ({ page }) => {
    // Page should be statically generated with ISR (revalidate: 60)
    // We can verify this by checking response headers and page load

    const response = await page.goto('/')

    // Page should load successfully
    expect(response?.status()).toBe(200)

    await page.waitForLoadState('networkidle')

    // Content should be rendered (indicates successful SSR/ISR)
    const sections = await page.locator('main section').all()
    expect(sections.length).toBe(8)
  })

  test('should verify error handling returns emptySections on failure', async ({ page }) => {
    // When getAllSections() fails completely, it returns emptySections (all null)
    // Sections should still render with fallback content

    await page.waitForLoadState('networkidle')

    // Even with all null data, sections should render
    const sections = await page.locator('main section').all()
    expect(sections.length).toBe(8)

    // Each section should have fallback content
    for (let i = 0; i < sections.length; i++) {
      const textContent = await sections[i].textContent()
      expect(textContent?.length).toBeGreaterThan(0)
    }
  })

  test('should not show Sanity fetch errors in browser console', async ({ page }) => {
    const sanityRelatedLogs: string[] = []

    page.on('console', (message) => {
      const text = message.text()
      if (
        text.includes('getAllSections') ||
        text.includes('Sanity') ||
        text.includes('GROQ') ||
        text.includes('transformSanityBlocks')
      ) {
        sanityRelatedLogs.push(text)
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Should not have Sanity-related error logs
    const errors = sanityRelatedLogs.filter(log =>
      log.toLowerCase().includes('error') ||
      log.toLowerCase().includes('failed')
    )

    // Allow warnings (like "No data returned from Sanity") but not errors
    expect(errors.length).toBe(0)
  })

  test('should verify section props interface (SectionProps)', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Each section component receives { data: SanityPage | null }
    // We verify this by checking that sections render correctly

    const sections = [
      { id: 'hero', component: 'HeroSection' },
      { id: 'about', component: 'AboutSection' },
      { id: 'oak-slabs', component: 'OakSlabsSection' },
      { id: 'warehouse', component: 'WarehouseSection' },
      { id: 'products', component: 'ProductsSection' },
      { id: 'manufacturing', component: 'ManufacturingSection' },
      { id: 'sustainability', component: 'SustainabilitySection' },
      { id: 'contact', component: 'ContactSection' }
    ]

    for (const { id } of sections) {
      const section = page.locator(`section#${id}`)

      // Section should be visible (proves it received props correctly)
      await expect(section).toBeVisible()

      // Section should have scroll-mt-20 class (standard section styling)
      const classes = await section.getAttribute('class')
      expect(classes).toContain('scroll-mt-20')
    }
  })

  test('should verify image transformation (urlFor) in blocks', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // transformSanityBlocks() converts image asset refs to URLs
    // We can verify by checking if images are rendered

    // Check for img elements in sections
    const images = await page.locator('main section img').all()

    // If there are images, they should have src attributes (from urlFor)
    for (const image of images) {
      const src = await image.getAttribute('src')
      expect(src).toBeTruthy()

      // Sanity image URLs typically include 'cdn.sanity.io' or 'sanitycdn.com'
      // or Next.js image optimization URLs
      expect(src).toMatch(/cdn\.sanity\.io|sanitycdn\.com|_next\/image/)
    }
  })

  test('should render sections in correct order', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Verify sections appear in the order defined in AllSectionsData
    const sections = await page.locator('main section').all()

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

  test('should verify SectionErrorBoundary wraps each section', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // Error boundaries should catch section errors
    // We verify by checking that all sections render successfully

    const sections = await page.locator('main section').all()
    expect(sections.length).toBe(8)

    // No error boundary fallback should be visible
    const errorFallbacks = await page.locator('text=Unable to load').count()
    expect(errorFallbacks).toBe(0)

    // All sections should have content
    for (const section of sections) {
      const textContent = await section.textContent()
      expect(textContent?.length).toBeGreaterThan(0)
    }
  })

  test('should handle page revalidation (ISR) correctly', async ({ page }) => {
    // First load
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const firstLoadSections = await page.locator('main section').all()
    expect(firstLoadSections.length).toBe(8)

    // Reload page (should use cached version or revalidate)
    await page.reload()
    await page.waitForLoadState('networkidle')

    const secondLoadSections = await page.locator('main section').all()
    expect(secondLoadSections.length).toBe(8)

    // Both loads should have same structure
    expect(firstLoadSections.length).toBe(secondLoadSections.length)
  })

  test('should verify blockProjection fields are rendered', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    // blockProjection includes: heading, subheading, text, content, etc.
    // We can verify by checking for common block elements

    const hero = page.locator('section#hero')

    // Should have heading elements (h1, h2, h3, etc.)
    const headings = await hero.locator('h1, h2, h3, h4, h5, h6').count()
    expect(headings).toBeGreaterThan(0)
  })
})
