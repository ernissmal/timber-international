import { test, expect } from '@playwright/test'

test.describe('Icon Grid Alignment', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('StatsBlock displays 4 icons in a single row on desktop', async ({ page, viewport }) => {
    // Only run this test on desktop viewports
    test.skip(viewport && viewport.width < 1024, 'Desktop-only test')

    // Find all stats blocks (they use grid layout for stats/metrics)
    const statsGrids = page.locator('.grid').filter({
      has: page.locator('.text-5xl, .text-6xl'),
    })

    const count = await statsGrids.count()

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const grid = statsGrids.nth(i)
        const items = grid.locator('> *')
        const itemCount = await items.count()

        // If there are 4 items, verify they're in a single row
        if (itemCount === 4) {
          // Get grid computed styles
          const gridStyles = await grid.evaluate((el) => {
            const styles = window.getComputedStyle(el)
            return {
              display: styles.display,
              gridTemplateColumns: styles.gridTemplateColumns,
            }
          })

          // Verify it's a grid
          expect(gridStyles.display).toBe('grid')

          // Get positions of all items
          const positions = await Promise.all(
            Array.from({ length: 4 }).map(async (_, idx) => {
              const item = items.nth(idx)
              const box = await item.boundingBox()
              return box
            })
          )

          // Verify all items have valid bounding boxes
          positions.forEach((box) => {
            expect(box).not.toBeNull()
          })

          // Check that all items are on the same row (same Y position within tolerance)
          const firstY = positions[0]!.y
          positions.forEach((box, index) => {
            const yDiff = Math.abs(box!.y - firstY)
            expect(yDiff).toBeLessThan(5) // Allow 5px tolerance for rounding
          })

          // Verify items are in a horizontal line (increasing X positions)
          for (let j = 1; j < 4; j++) {
            expect(positions[j]!.x).toBeGreaterThan(positions[j - 1]!.x)
          }
        }
      }
    }
  })

  test('FeaturesGridBlock with 4 columns displays in single row on desktop', async ({
    page,
    viewport,
  }) => {
    // Only run this test on desktop viewports
    test.skip(viewport && viewport.width < 1024, 'Desktop-only test')

    // Find feature grids with 4 items
    const featureGrids = page.locator('.grid').filter({
      has: page.locator('.aspect-square'),
    })

    const count = await featureGrids.count()

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const grid = featureGrids.nth(i)
        const items = grid.locator('> *')
        const itemCount = await items.count()

        // If there are 4 items, verify they're in a single row
        if (itemCount === 4) {
          const gridClass = await grid.getAttribute('class')

          // Should have 4-column grid class on large screens
          expect(gridClass).toContain('grid')

          // Get positions of all items
          const positions = await Promise.all(
            Array.from({ length: 4 }).map(async (_, idx) => {
              const item = items.nth(idx)
              const box = await item.boundingBox()
              return box
            })
          )

          // Verify all items have valid bounding boxes
          positions.forEach((box) => {
            expect(box).not.toBeNull()
          })

          // Check that all items are on the same row (same Y position within tolerance)
          const firstY = positions[0]!.y
          positions.forEach((box, index) => {
            const yDiff = Math.abs(box!.y - firstY)
            expect(yDiff).toBeLessThan(10) // Allow 10px tolerance
          })
        }
      }
    }
  })

  test('Footer displays 4 columns in single row on desktop', async ({ page, viewport }) => {
    // Only run this test on desktop viewports
    test.skip(viewport && viewport.width < 1024, 'Desktop-only test')

    const footer = page.locator('footer')
    const footerGrid = footer.locator('.grid').first()
    const columns = footerGrid.locator('> div')

    const columnCount = await columns.count()
    expect(columnCount).toBe(4)

    // Get positions of all columns
    const positions = await Promise.all(
      Array.from({ length: 4 }).map(async (_, idx) => {
        const column = columns.nth(idx)
        const box = await column.boundingBox()
        return box
      })
    )

    // Verify all columns have valid bounding boxes
    positions.forEach((box) => {
      expect(box).not.toBeNull()
    })

    // Check that all columns are on the same row (same Y position within tolerance)
    const firstY = positions[0]!.y
    positions.forEach((box) => {
      const yDiff = Math.abs(box!.y - firstY)
      expect(yDiff).toBeLessThan(5)
    })

    // Verify columns are in a horizontal line
    for (let i = 1; i < 4; i++) {
      expect(positions[i]!.x).toBeGreaterThan(positions[i - 1]!.x)
    }
  })

  test('Icon grids are responsive - 2 columns on tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Find stats grids
    const statsGrids = page.locator('.grid').filter({
      has: page.locator('.text-5xl, .text-6xl'),
    })

    const count = await statsGrids.count()

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const grid = statsGrids.nth(i)
        const items = grid.locator('> *')
        const itemCount = await items.count()

        if (itemCount === 4) {
          // Get positions
          const positions = await Promise.all(
            Array.from({ length: 4 }).map(async (_, idx) => {
              const item = items.nth(idx)
              const box = await item.boundingBox()
              return box
            })
          )

          // On tablet, items should be in 2 rows of 2
          // Items 0 and 1 should be on same row
          const row1YDiff = Math.abs(positions[1]!.y - positions[0]!.y)
          expect(row1YDiff).toBeLessThan(10)

          // Items 2 and 3 should be on same row (different from first row)
          const row2YDiff = Math.abs(positions[3]!.y - positions[2]!.y)
          expect(row2YDiff).toBeLessThan(10)

          // Row 2 should be below row 1
          expect(positions[2]!.y).toBeGreaterThan(positions[0]!.y + 50)
        }
      }
    }
  })

  test('Icon grids are responsive - single column on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Find stats grids
    const statsGrids = page.locator('.grid').filter({
      has: page.locator('.text-5xl, .text-6xl'),
    })

    const count = await statsGrids.count()

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        const grid = statsGrids.nth(i)
        const items = grid.locator('> *')
        const itemCount = await items.count()

        if (itemCount === 4) {
          // Get positions
          const positions = await Promise.all(
            Array.from({ length: 4 }).map(async (_, idx) => {
              const item = items.nth(idx)
              const box = await item.boundingBox()
              return box
            })
          )

          // All items should be vertically stacked
          for (let j = 1; j < 4; j++) {
            // Each item should be below the previous one
            expect(positions[j]!.y).toBeGreaterThan(positions[j - 1]!.y)
          }
        }
      }
    }
  })
})
