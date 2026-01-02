# Story 1.7: Update Sanity Content Structure

Status: ready-for-dev

<!-- Note: Validation is optional. Run validate-create-story for quality check before dev-story. -->

## Story

As a content editor,
I want Sanity to support the new SPA structure with all sections manageable via Sanity Studio,
so that I can edit Oak Slabs, Warehouse, and all other section content through the CMS.

## Acceptance Criteria

1. **Oak Slabs Page Created**
   - Oak Slabs page document exists in Sanity with slug `oak-slabs`
   - Content is editable via Sanity Studio
   - Page has appropriate SEO metadata

2. **Warehouse Page Created**
   - Warehouse page document exists in Sanity with slug `warehouse`
   - Content is editable via Sanity Studio
   - Page has appropriate SEO metadata

3. **Consolidated GROQ Query**
   - `allSectionsQuery` created in `sanity/lib/queries.ts`
   - Query uses reusable `blockProjection` pattern
   - Query fetches all 8 sections in single request
   - Query structure matches existing `SanityPage` interface (nested seo object)

4. **Fetch Function with Error Handling**
   - `getAllSections()` function created in `lib/sanity.ts`
   - Function uses existing `transformSanityBlocks()` for consistency
   - Returns `AllSectionsData` interface with all sections
   - Gracefully handles missing sections (returns null)
   - Handles complete query failure (returns empty object)

5. **Populate Script Updated**
   - `scripts/populate-sanity.ts` includes Oak Slabs content
   - `scripts/populate-sanity.ts` includes Warehouse content
   - Both pages can be created via populate script

6. **Verification Script**
   - `scripts/verify-spa-sections.ts` created
   - Script verifies all 8 required page documents exist
   - Script shows document status (title, block count)
   - Script exits with error if documents missing
   - npm script `verify:sections` added to package.json

## Tasks / Subtasks

- [ ] **Task 1: Create Consolidated GROQ Query** (AC: #3)
  - [ ] Add `blockProjection` pattern to `sanity/lib/queries.ts`
  - [ ] Create `allSectionsQuery` fetching all 8 sections
  - [ ] Verify query structure matches existing `SanityPage` interface
  - [ ] Test query returns correct nested seo object

- [ ] **Task 2: Add Consolidated Fetch Function** (AC: #4)
  - [ ] Add `AllSectionsData` interface to `lib/sanity.ts`
  - [ ] Create `getAllSections()` function
  - [ ] Import and use `allSectionsQuery` from queries file
  - [ ] Use existing `transformSanityBlocks()` for block transformation
  - [ ] Add error handling with fallback to empty sections
  - [ ] Test function returns null for missing sections

- [ ] **Task 3: Update Populate Script** (AC: #1, #2, #5)
  - [ ] Add Oak Slabs page object to `scripts/populate-sanity.ts`
  - [ ] Add Warehouse page object to `scripts/populate-sanity.ts`
  - [ ] Include appropriate SEO metadata for both pages
  - [ ] Add sample blocks for both pages
  - [ ] Test populate script creates both pages successfully

- [ ] **Task 4: Create Verification Script** (AC: #6)
  - [ ] Create `scripts/verify-spa-sections.ts`
  - [ ] Add logic to check all 8 required page documents
  - [ ] Output existing documents with details
  - [ ] Output missing documents clearly
  - [ ] Exit with error code 1 if documents missing
  - [ ] Add `verify:sections` to package.json scripts

- [ ] **Task 5: Test in Sanity Studio**
  - [ ] Verify Oak Slabs page appears in Sanity Studio
  - [ ] Verify Warehouse page appears in Sanity Studio
  - [ ] Test editing content in both pages
  - [ ] Verify changes save correctly
  - [ ] Test `allSectionsQuery` returns both pages

## Dev Notes

### Architecture Patterns

**Query Structure:**
- Uses GROQ query language (Sanity's query syntax)
- Reusable `blockProjection` pattern prevents duplication
- Single consolidated query reduces network overhead (1 request vs 8)
- Query structure MUST match existing `SanityPage` interface with nested `seo{}` object

**Transform Pipeline:**
- Sanity CMS → GROQ Query → `lib/sanity.ts` (transform _type → __typename) → BlockRenderer → Block Components
- EXISTING `transformSanityBlocks()` function handles:
  - Converting `_type` to `__typename` via `typeToTypename` map
  - Converting image `asset._ref` to URLs via `urlFor()` helper
  - DO NOT create new transform - reuse existing one for consistency

**Error Handling:**
- Graceful degradation: missing sections return null, not errors
- Complete query failure returns empty object (all sections null)
- Sections handle null data with fallback UI

### Project Structure Notes

**Files to Modify:**
1. `/Users/ernestssmalikis/Projects/timber-international/sanity/lib/queries.ts`
   - Add `blockProjection` constant
   - Add `allSectionsQuery` export

2. `/Users/ernestssmalikis/Projects/timber-international/lib/sanity.ts`
   - Add `AllSectionsData` interface
   - Add `getAllSections()` function
   - Import `allSectionsQuery` from `@/sanity/lib/queries`

3. `/Users/ernestssmalikis/Projects/timber-international/scripts/populate-sanity.ts`
   - Add Oak Slabs page object to `pages` array
   - Add Warehouse page object to `pages` array

**Files to Create:**
1. `/Users/ernestssmalikis/Projects/timber-international/scripts/verify-spa-sections.ts`
   - New verification script for pre-development check

**package.json:**
- Add `"verify:sections": "tsx scripts/verify-spa-sections.ts"` to scripts section

### Existing Code Patterns

**Current lib/sanity.ts Structure:**
- Lines 6-10: `SanityBlock` interface (DO NOT DUPLICATE)
- Lines 12-23: `SanityPage` interface with NESTED seo object (DO NOT DUPLICATE)
- Lines 26-34: `typeToTypename` map for block type conversion
- Lines 37-75: `transformSanityBlocks()` function (REUSE THIS - do not create new)
- Lines 78-96: `getSanityPage()` function using existing queries

**Current sanity/lib/queries.ts Structure:**
- Uses `groq` tagged template from `next-sanity`
- Three existing queries: `allPagesQuery`, `pageBySlugQuery`, `homePageQuery`
- Queries use `asset->` syntax to expand image references
- Nested structure for image fields: `backgroundImage { ..., asset-> }`

**Current scripts/populate-sanity.ts Structure:**
- Uses `@sanity/client` for write operations
- `pages` array (lines 17-411) contains 6 page objects
- Each page has: `_type: 'page'`, `title`, `slug: { _type: 'slug', current: '...' }`, `description`, `seo`, `blocks`
- Blocks follow Sanity schema with `_type`, `_key`, and block-specific fields

### Testing Standards

**Pre-Development:**
1. Run `npm run verify:sections` BEFORE starting development
2. If documents missing, create in Sanity Studio or run populate script

**Development Testing:**
1. Test `allSectionsQuery` in Sanity Vision (Sanity Studio query tool)
2. Verify query returns all 8 sections with correct structure
3. Test `getAllSections()` returns transformed data
4. Verify null handling for missing sections

**Post-Development:**
1. Run `npm run verify:sections` to confirm all documents exist
2. Test in Sanity Studio: edit Oak Slabs and Warehouse pages
3. Test frontend renders both sections with Sanity content
4. Verify fallback UI appears if content missing

### References

- Tech-Spec: `/Users/ernestssmalikis/Projects/timber-international/_bmad-output/implementation-artifacts/tech-spec-spa-restructure.md`
  - Task 2 (lines 282-433): `allSectionsQuery` complete implementation
  - Task 3 (lines 437-517): `getAllSections()` complete implementation
  - Task 18 (lines 1441-1511): Verification script complete implementation
  - Tasks 19-20 (lines 1515-1535): Sanity page creation requirements

- Epic: `/Users/ernestssmalikis/Projects/timber-international/_bmad-output/planning-artifacts/epic-001-spa-restructure.md`
  - Story 7 (lines 198-216): Story definition and acceptance criteria

- Existing Code:
  - `/Users/ernestssmalikis/Projects/timber-international/lib/sanity.ts`: Existing interfaces and transform logic
  - `/Users/ernestssmalikis/Projects/timber-international/sanity/lib/queries.ts`: Existing GROQ query patterns
  - `/Users/ernestssmalikis/Projects/timber-international/scripts/populate-sanity.ts`: Current populate script structure

### GROQ Query Structure (Complete Reference)

**blockProjection Pattern:**
```groq
const blockProjection = `{
  _type,
  _key,
  heading,
  subheading,
  text,
  content,
  eyebrow,
  alignment,
  backgroundColor,
  buttonText,
  buttonLink,
  stats,
  quote,
  author,
  role,
  backgroundImage {
    _type,
    asset,
    alt,
    hotspot,
    crop
  },
  image {
    _type,
    asset,
    alt,
    hotspot,
    crop
  },
  items[] {
    _key,
    title,
    description,
    icon,
    stat,
    label,
    image {
      _type,
      asset,
      alt
    }
  }
}`
```

**allSectionsQuery Structure:**
```groq
export const allSectionsQuery = groq`{
  "hero": *[_type == "page" && slug.current == "home"][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    seo {
      title,
      description,
      ogImage
    },
    blocks[] ${blockProjection}
  },
  "about": *[_type == "page" && slug.current == "about"][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    seo {
      title,
      description,
      ogImage
    },
    blocks[] ${blockProjection}
  },
  // ... repeat for oakSlabs, warehouse, products, manufacturing, sustainability, contact
}`
```

**Key Points:**
- Image fields use `asset` (NOT `asset->`), transform handles conversion
- Nested `seo {}` matches existing `SanityPage` interface
- `slug.current` converted to `"slug": slug.current` for flat structure
- `blockProjection` injected via template literal `${blockProjection}`

### TypeScript Interface (Complete Reference)

```typescript
// ADD to lib/sanity.ts (SanityBlock and SanityPage already exist - DO NOT DUPLICATE)

export interface AllSectionsData {
  hero: SanityPage | null
  about: SanityPage | null
  oakSlabs: SanityPage | null
  warehouse: SanityPage | null
  products: SanityPage | null
  manufacturing: SanityPage | null
  sustainability: SanityPage | null
  contact: SanityPage | null
}
```

### Oak Slabs Content Suggestions

**Suggested Content for Oak Slabs Page:**
- Title: "Oak Slabs"
- Slug: `oak-slabs`
- SEO Title: "Solid Oak Slabs - Industrial Scale Manufacturing | Timber International"
- SEO Description: "Premium solid oak slabs manufactured to your specifications. Custom dimensions, kiln dried, FSC certified. Request a quote today."
- Blocks: Hero block + Features grid showcasing:
  - Custom Dimensions (CNC precision)
  - Kiln Dried (8-12% moisture content)
  - FSC Certified (sustainable sourcing)
  - Industrial scale production
  - CTA to contact/quote

### Warehouse Content Suggestions

**Suggested Content for Warehouse Page:**
- Title: "Warehouse"
- Slug: `warehouse`
- SEO Title: "Warehouse & Logistics | Timber International"
- SEO Description: "10,000m² climate-controlled storage facilities. Pan-European delivery with 48-hour dispatch for in-stock items."
- Blocks: Hero block + Features showcasing:
  - 10,000m² Storage capacity
  - Climate-controlled facilities
  - Pan-European delivery network
  - 48-hour dispatch for in-stock items
  - CTA to contact for logistics inquiries

### Verification Script Logic

**Required Page Slugs:**
```typescript
const REQUIRED_SLUGS = [
  'home',
  'about',
  'oak-slabs',
  'warehouse',
  'products',
  'manufacturing',
  'sustainability',
  'contact'
]
```

**Verification Process:**
1. Query each slug: `*[_type == "page" && slug.current == $slug][0]{ _id, title, "blockCount": count(blocks) }`
2. Check if document exists
3. Report existing documents with title and block count
4. Report missing documents
5. Exit with code 1 if any missing

### Common Pitfalls to Avoid

1. **DO NOT create new transform function** - use existing `transformSanityBlocks()`
2. **DO NOT use `asset->` in GROQ query** - use `asset` field, transform handles it
3. **DO NOT flatten seo object** - keep nested structure matching existing interface
4. **DO NOT skip error handling** - graceful degradation is critical
5. **DO NOT forget to import allSectionsQuery** - must import from `@/sanity/lib/queries`
6. **DO NOT duplicate SanityPage or SanityBlock interfaces** - they already exist
7. **DO NOT forget revalidation** - add `{ next: { revalidate: 60 } }` to fetch options

## Dev Agent Record

### Agent Model Used

Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)

### Debug Log References

N/A - Story created via BMad create-story workflow

### Completion Notes List

- Story created with comprehensive GROQ query patterns from tech-spec
- Complete type definitions included for reference
- Verification script implementation fully specified
- Content suggestions provided for Oak Slabs and Warehouse pages
- All file paths verified and confirmed as absolute paths
- Integration points with existing code clearly documented

### File List

**Files to Modify:**
- `/Users/ernestssmalikis/Projects/timber-international/sanity/lib/queries.ts`
- `/Users/ernestssmalikis/Projects/timber-international/lib/sanity.ts`
- `/Users/ernestssmalikis/Projects/timber-international/scripts/populate-sanity.ts`
- `/Users/ernestssmalikis/Projects/timber-international/package.json`

**Files to Create:**
- `/Users/ernestssmalikis/Projects/timber-international/scripts/verify-spa-sections.ts`
