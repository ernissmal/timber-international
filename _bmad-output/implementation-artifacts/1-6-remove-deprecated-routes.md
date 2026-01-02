---
story_id: STORY-001-06
title: Remove Deprecated Page Routes
epic: EPIC-001 - Website SPA Restructure
priority: P1
points: 2
status: ready-for-dev
created: 2026-01-02
dependencies:
  - STORY-001-02 (Main Page Section Consolidation)
  - STORY-001-05 (Section Components for Existing Pages)
tech_spec: tech-spec-spa-restructure.md
files_to_delete:
  - app/(frontend)/about/page.tsx
  - app/(frontend)/products/page.tsx
  - app/(frontend)/manufacturing/page.tsx
  - app/(frontend)/sustainability/page.tsx
  - app/(frontend)/contact/page.tsx
directories_to_delete:
  - app/(frontend)/about
  - app/(frontend)/products
  - app/(frontend)/manufacturing
  - app/(frontend)/sustainability
  - app/(frontend)/contact
---

# Story 1-6: Remove Deprecated Page Routes

**As a developer**, I need to remove old page routes to clean up the codebase after consolidating all content into the single-page application.

---

## Story Context

After successfully consolidating all page content into section components on the main SPA page (Stories 1-2 and 1-5), the individual page route files are no longer needed. These deprecated routes create technical debt and potential confusion for future developers.

This story completes the MPA → SPA migration by removing the old multi-page architecture artifacts.

---

## Dependencies

**IMPORTANT:** This story MUST NOT be started until the following stories are complete and verified:

1. **STORY-001-02** - Main Page Section Consolidation
   - Ensures all content is properly rendered on the main SPA page
   - All 8 sections must be rendering correctly

2. **STORY-001-05** - Section Components for Existing Pages
   - AboutSection, ProductsSection, ManufacturingSection, SustainabilitySection, ContactSection
   - All section components must be created and integrated

**Verification Before Starting:**
- [ ] Visit `http://localhost:3000` and confirm all 8 sections render
- [ ] Test anchor navigation to each section (#about, #products, #manufacturing, #sustainability, #contact)
- [ ] Verify no content is missing from the consolidated page
- [ ] Confirm `npm run build` succeeds with no errors

---

## Acceptance Criteria

### AC-1: File Deletion
**Given** the deprecated page route files exist in the codebase
**When** cleanup is performed
**Then** all 5 page files are deleted:
- `app/(frontend)/about/page.tsx`
- `app/(frontend)/products/page.tsx`
- `app/(frontend)/manufacturing/page.tsx`
- `app/(frontend)/sustainability/page.tsx`
- `app/(frontend)/contact/page.tsx`

### AC-2: Directory Cleanup
**Given** the page directories may be empty after file deletion
**When** cleanup is performed
**Then** all empty directories are removed:
- `app/(frontend)/about/`
- `app/(frontend)/products/`
- `app/(frontend)/manufacturing/`
- `app/(frontend)/sustainability/`
- `app/(frontend)/contact/`

### AC-3: Build Verification
**Given** the deprecated files have been removed
**When** `npm run build` is executed
**Then**:
- Build completes successfully with exit code 0
- No TypeScript compilation errors
- No missing module errors
- No broken import references

### AC-4: Navigation Verification
**Given** the application is running in dev mode
**When** a user clicks navigation links
**Then**:
- Anchor links (#about, #products, etc.) scroll to correct sections
- No 404 errors occur
- All content remains accessible via anchor navigation

### AC-5: 404 Page Still Works
**Given** a user visits an unknown route (e.g., `/unknown-page`)
**When** Next.js handles the route
**Then**:
- The 404 page displays correctly
- The 404 handling mechanism is not broken by route removal

---

## Implementation Instructions

### Step 1: Pre-Deletion Verification (5 minutes)

Before deleting any files, verify all content is accessible on the SPA:

```bash
# Start development server
npm run dev

# In browser, manually test:
# - http://localhost:3000/#about
# - http://localhost:3000/#products
# - http://localhost:3000/#manufacturing
# - http://localhost:3000/#sustainability
# - http://localhost:3000/#contact

# Verify each section renders with correct content
# Verify anchor links in navigation work
```

**DO NOT PROCEED** if any section is missing or broken.

---

### Step 2: Delete Page Files (2 minutes)

Execute cleanup commands from tech-spec (Task 21):

```bash
# Navigate to project root
cd /Users/ernestssmalikis/Projects/timber-international

# Delete page files
rm app/(frontend)/about/page.tsx
rm app/(frontend)/products/page.tsx
rm app/(frontend)/manufacturing/page.tsx
rm app/(frontend)/sustainability/page.tsx
rm app/(frontend)/contact/page.tsx

# Delete empty directories (|| true prevents errors if dir not empty)
rmdir app/(frontend)/about 2>/dev/null || true
rmdir app/(frontend)/products 2>/dev/null || true
rmdir app/(frontend)/manufacturing 2>/dev/null || true
rmdir app/(frontend)/sustainability 2>/dev/null || true
rmdir app/(frontend)/contact 2>/dev/null || true
```

---

### Step 3: Verify File Structure (2 minutes)

Confirm files are deleted:

```bash
# Verify files no longer exist (should return "No such file")
ls app/(frontend)/about/page.tsx 2>&1
ls app/(frontend)/products/page.tsx 2>&1
ls app/(frontend)/manufacturing/page.tsx 2>&1
ls app/(frontend)/sustainability/page.tsx 2>&1
ls app/(frontend)/contact/page.tsx 2>&1

# Verify directories removed (should not appear in listing)
ls app/(frontend)/ | grep -E 'about|products|manufacturing|sustainability|contact'
```

Expected output: No matching files or directories.

---

### Step 4: Build Verification (5 minutes)

Verify the application builds without errors:

```bash
# Clean build cache
rm -rf .next

# Run production build
npm run build
```

**Expected output:**
- ✓ Compiled successfully
- No TypeScript errors
- No module resolution errors
- Static page generation succeeds for `/` route

**If build fails:**
1. Check error message for missing imports
2. Verify no other files import from deleted page routes
3. Use `grep -r "from.*about/page" .` to find broken imports
4. Fix any broken imports before proceeding

---

### Step 5: Runtime Verification (5 minutes)

Test the application in development mode:

```bash
# Start dev server
npm run dev

# Test in browser:
# 1. Navigate to http://localhost:3000
# 2. Click each navigation link
# 3. Verify smooth scroll to sections
# 4. Test direct URL with hash: http://localhost:3000/#about
# 5. Test invalid route: http://localhost:3000/about
```

**Expected behavior:**
- ✅ `/#about` → scrolls to About section
- ✅ `/about` → shows 404 page (route no longer exists)
- ✅ All anchor navigation works
- ✅ No console errors

---

### Step 6: Optional - Client-Side Redirects (10 minutes)

**OPTIONAL:** If you want old URLs to redirect to anchor links instead of showing 404:

Create middleware to handle redirects:

```typescript
// middleware.ts (create in project root)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const legacyRoutes: Record<string, string> = {
  '/about': '/#about',
  '/products': '/#products',
  '/manufacturing': '/#manufacturing',
  '/sustainability': '/#sustainability',
  '/contact': '/#contact',
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  if (legacyRoutes[path]) {
    return NextResponse.redirect(
      new URL(legacyRoutes[path], request.url),
      { status: 301 } // Permanent redirect
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/about', '/products', '/manufacturing', '/sustainability', '/contact']
}
```

**Note:** This is optional. Discuss with client whether to implement redirects or let old URLs show 404.

---

## Testing Checklist

### Pre-Deletion Tests
- [ ] All 8 sections render on main page (`http://localhost:3000`)
- [ ] Anchor navigation works for all sections
- [ ] No missing content compared to old page routes
- [ ] STORY-001-02 and STORY-001-05 are marked complete

### Post-Deletion Tests
- [ ] Files deleted: `app/(frontend)/{about,products,manufacturing,sustainability,contact}/page.tsx`
- [ ] Directories removed (if empty)
- [ ] `npm run build` completes successfully
- [ ] No TypeScript errors in build output
- [ ] Dev server starts without errors (`npm run dev`)
- [ ] Anchor links work: `/#about`, `/#products`, etc.
- [ ] Direct route access shows 404: `/about`, `/products`, etc. (or redirects if middleware implemented)
- [ ] Navigation scroll spy highlights correct section
- [ ] Mobile menu works with anchor links
- [ ] No console errors in browser

### Edge Case Tests
- [ ] Visiting `/about/extra` shows 404
- [ ] Hash navigation from external link works (e.g., email link to `/#contact`)
- [ ] Browser back/forward buttons work correctly
- [ ] Refreshing page at `/#section` scrolls to correct section

---

## Rollback Plan

If issues are discovered after deletion:

### Immediate Rollback (Using Git)

```bash
# Restore deleted files from last commit
git checkout HEAD -- app/(frontend)/about/page.tsx
git checkout HEAD -- app/(frontend)/products/page.tsx
git checkout HEAD -- app/(frontend)/manufacturing/page.tsx
git checkout HEAD -- app/(frontend)/sustainability/page.tsx
git checkout HEAD -- app/(frontend)/contact/page.tsx

# Rebuild
npm run build
```

### Root Cause Analysis

If rollback is needed, investigate:
1. Missing content on SPA page
2. Broken imports in other files
3. Routing configuration issues
4. Content not fetched from Sanity

Do NOT re-attempt deletion until root cause is fixed.

---

## Success Metrics

- **Build Time:** Should remain similar or improve (fewer routes to process)
- **Bundle Size:** Should decrease slightly (fewer page chunks)
- **Route Count:** Should decrease by 5 (only root route `/` remains for frontend)
- **Code Quality:** No dead code or unused page routes

---

## Notes & Warnings

### Critical Warnings

1. **DO NOT delete files** until STORY-001-02 and STORY-001-05 are 100% complete and verified
2. **DO NOT commit** until build verification passes
3. **DO NOT deploy** until runtime verification passes

### Best Practices

1. Run `npm run build` before committing
2. Test anchor navigation thoroughly before closing story
3. Document any redirect decisions in commit message
4. If redirects are NOT implemented, inform client that old URLs will show 404

### Future Considerations

- Monitor analytics for 404 errors on old URLs
- Consider implementing redirects if users frequently access old URLs
- Update any external documentation/links to use anchor URLs

---

## Definition of Done

- [ ] All 5 page files deleted
- [ ] All 5 directories removed (if empty)
- [ ] `npm run build` succeeds with no errors
- [ ] `npm run dev` works correctly
- [ ] All anchor navigation tested and working
- [ ] 404 page still works for unknown routes
- [ ] No console errors or warnings
- [ ] Code committed with clear commit message
- [ ] Optional: Redirects implemented (if decided)
- [ ] Story marked as complete in project tracking

---

## Related Documentation

- **Tech Spec:** `_bmad-output/implementation-artifacts/tech-spec-spa-restructure.md` (Task 21)
- **Epic:** `_bmad-output/planning-artifacts/epic-001-spa-restructure.md`
- **Architecture:** `_bmad-output/planning-artifacts/architecture-timber-international.md`

---

## Estimated Time

**Total:** 1-1.5 hours

- Pre-deletion verification: 5 min
- File deletion: 2 min
- File structure verification: 2 min
- Build verification: 5 min
- Runtime verification: 5 min
- Testing: 15 min
- Optional redirects: 10 min (if implemented)
- Documentation: 5 min

---

## Questions for Product Owner

1. Should we implement redirects for old URLs (`/about` → `/#about`) or let them show 404?
2. Are there any external links (emails, marketing materials) pointing to old URLs?
3. Should we notify support team about URL structure change?

---

**Created:** 2026-01-02
**Status:** Ready for Development
**Blocking:** None
**Blocked By:** STORY-001-02, STORY-001-05
