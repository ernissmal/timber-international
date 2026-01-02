# Sanity Studio Troubleshooting - Background Image Fields Not Appearing

## Problem
The `backgroundType`, `backgroundImage`, and `overlayOpacity` fields added to the `editorialText` schema are not visible in Sanity Studio.

## Root Cause
Sanity Studio caches schema definitions and compiled assets. When schema changes are made, the cache needs to be cleared and the dev server restarted for changes to take effect.

## Solution

### Step 1: Clear Sanity Cache
Run the cache clearing script:
```bash
bash scripts/clear-sanity-cache.sh
```

Or manually clear the cache:
```bash
# Remove Vite cache
rm -rf node_modules/.sanity

# Remove runtime cache
rm -rf .sanity

# Remove dist folder (if it exists)
rm -rf dist
```

### Step 2: Restart Sanity Studio
```bash
npm run sanity:dev
```

### Step 3: Verify in Sanity Studio
1. Open Sanity Studio at http://localhost:3333
2. Navigate to the **Warehouse** page (or any page with Editorial Text blocks)
3. Click to edit an **Editorial Text** block
4. You should now see:
   - **Background Type** toggle (Radio buttons: "Solid Color" / "Image")
   - When "Image" is selected:
     - **Background Image** field (image upload)
     - **Overlay Opacity** field (0-100)
   - When "Solid Color" is selected:
     - **Background Color** dropdown (White / Cream / Black)

## Schema Changes Made

The following fields were added to `/Users/ernestssmalikis/Projects/timber-international/sanity/schemas/blocks/editorialText.ts`:

```typescript
defineField({
  name: 'backgroundType',
  title: 'Background Type',
  type: 'string',
  options: {
    list: [
      { title: 'Solid Color', value: 'color' },
      { title: 'Image', value: 'image' },
    ],
    layout: 'radio',
  },
  initialValue: 'color',
}),
defineField({
  name: 'backgroundColor',
  title: 'Background Color',
  type: 'string',
  options: {
    list: [
      { title: 'White', value: 'white' },
      { title: 'Cream', value: 'cream' },
      { title: 'Black', value: 'black' },
    ],
  },
  initialValue: 'white',
  hidden: ({ parent }) => parent?.backgroundType === 'image',
}),
defineField({
  name: 'backgroundImage',
  title: 'Background Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  description: 'Full-width background image',
  hidden: ({ parent }) => parent?.backgroundType !== 'image',
}),
defineField({
  name: 'overlayOpacity',
  title: 'Overlay Opacity',
  type: 'number',
  description: 'Dark overlay opacity (0-100) to improve text readability',
  validation: (Rule) => Rule.min(0).max(100),
  initialValue: 50,
  hidden: ({ parent }) => parent?.backgroundType !== 'image',
}),
```

## Component Support

The `EditorialTextBlock` component (`/Users/ernestssmalikis/Projects/timber-international/components/blocks/EditorialTextBlock.tsx`) already has full support for background images:

- Renders background image when `backgroundType === 'image'`
- Applies overlay with configurable opacity
- Switches text color to white for better contrast
- Transforms Sanity image assets to URLs automatically via `lib/sanity.ts`

## Additional Troubleshooting

### If fields still don't appear after clearing cache:

1. **Check for TypeScript errors:**
   ```bash
   npx tsc --noEmit
   ```

2. **Verify schema is exported:**
   Check that `editorialText` is imported and exported in `/Users/ernestssmalikis/Projects/timber-international/sanity/schemas/index.ts`

3. **Hard refresh browser:**
   - Chrome/Firefox: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
   - Clear browser cache if needed

4. **Check Sanity Studio console:**
   - Open browser DevTools (F12)
   - Check Console tab for any error messages
   - Check Network tab to see if schema is loading correctly

5. **Verify Sanity configuration:**
   - Ensure `sanity.config.ts` includes the schema types
   - Ensure you're connected to the correct project and dataset

## Testing Background Image

Once the fields are visible, you can test by:

1. Selecting an Editorial Text block
2. Changing "Background Type" to "Image"
3. Uploading an image
4. Adjusting the "Overlay Opacity" (0 = no overlay, 100 = fully black)
5. Save and preview on the front-end

The image should appear as a full-width background with white text overlay.
