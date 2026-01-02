# Documentation

## Issue: Hero Video Upload Getting Stuck in Sanity Studio

### Problem Summary
When trying to upload a 63MB hero video (`hero-video.mp4`) in Sanity Studio, the upload process gets stuck or times out.

### Root Cause
- **Sanity's file upload limit**: 100MB (hard limit)
- **Recommended limit**: 50MB to avoid timeouts
- **Your video size**: 63MB - exceeds recommended limit
- Browser timeouts and network instability can cause uploads to fail

### Solution (Immediate - No Compression Needed)

**Use the `backgroundVideoUrl` field instead of uploading:**

The video is already in place at:
```
/public/uploads/backgrounds/hero-video.mp4
```

#### Steps:
1. Open Sanity Studio: `npm run sanity:dev`
2. Navigate to **Home** page
3. Edit the **Hero** section
4. Set **Background Type**: `Video`
5. **Leave "Background Video (Upload)" empty**
6. In **"Background Video URL"** field, enter:
   ```
   /uploads/backgrounds/hero-video.mp4
   ```
7. Optionally add a **Video Poster Image** (recommended for better UX)
8. **Save and Publish**

The video will work immediately - no upload needed!

### Why This Works
- Files in `/public/` are served directly by Next.js
- No upload timeouts or size restrictions
- Better performance (served from your server/CDN)
- Faster page loads

### Alternative Solutions

If you want to use Sanity's upload feature:

1. **Compress the video** to under 50MB
   - See [VIDEO_UPLOAD_GUIDE.md](./VIDEO_UPLOAD_GUIDE.md) for FFmpeg instructions
   - Target size: 30-40MB for optimal performance

2. **Use external video hosting**
   - Cloudflare Stream, Vimeo, Bunny.net, etc.
   - Put the direct video URL in the `backgroundVideoUrl` field

## Documentation Files

### [VIDEO_UPLOAD_GUIDE.md](./VIDEO_UPLOAD_GUIDE.md)
Comprehensive guide covering:
- Why uploads get stuck
- All solution options (URL field, compression, external hosting)
- Video compression with FFmpeg
- Best practices for hero background videos
- Performance optimization tips
- Troubleshooting common issues

### [SANITY_QUICK_REFERENCE.md](./SANITY_QUICK_REFERENCE.md)
Quick reference for editors:
- Steps to add hero video using URL field
- When to use upload vs URL field
- File size recommendations
- Quick compression command

## Code Changes Made

### 1. Hero Schema Updates
**File**: `/sanity/schemas/blocks/hero.ts`

Changes:
- Updated field descriptions with clearer guidance
- Changed `backgroundVideoUrl` from `url` type to `string` type for better flexibility
- Added validation to require at least one video source
- Updated recommended file size limit (50MB instead of 100MB)
- Added placeholder text showing example path

### 2. Sanity Config Updates
**File**: `/sanity.config.ts`

Changes:
- Enabled `directUploads: true` for resumable uploads
- Added comments explaining upload limits
- Configured form settings for better file handling

### 3. Testing Script
**File**: `/scripts/test-video-path.ts`

New script to verify:
- Video file exists in public folder
- Path format is correct
- File size and recommendations
- Next steps for Sanity Studio

Run with: `npm run test:video`

## Technical Details

### How Video Fields Work

#### Background Video (Upload)
- Field type: `file`
- Uploads to Sanity's CDN
- Pros: Managed by Sanity, included in backups
- Cons: Size limits, upload timeouts, slower
- Best for: Small videos under 50MB

#### Background Video URL
- Field type: `string`
- Accepts any path or URL
- Pros: No size limits, no timeouts, better performance
- Cons: You manage the file
- Best for: Large videos, files in `/public/`, external hosting

### Video Resolution in Frontend

The `Hero.tsx` component handles both fields:
```typescript
const videoSrc = backgroundVideo || backgroundVideoUrl
```

Priority:
1. If `backgroundVideo` has a Sanity asset → use Sanity CDN URL
2. Else if `backgroundVideoUrl` has a value → use that path/URL
3. Video tag's `src` attribute gets the final URL

### Data Transformation

In `lib/sanity.ts`, the `transformSanityBlocks` function:
```typescript
// Handles Sanity file assets
if (key === 'backgroundVideo' || key === 'video') {
  if (value?.asset?.url) {
    transformed[key] = value.asset.url  // Extract URL from asset
  } else if (typeof value === 'string') {
    transformed[key] = value  // Already a URL string
  }
}
```

## Quick Command Reference

```bash
# Test video path
npm run test:video

# Start Sanity Studio
npm run sanity:dev

# Compress video (requires ffmpeg)
ffmpeg -i hero-video.mp4 \
  -c:v libx264 -crf 28 \
  -preset slow \
  -c:a aac -b:a 128k \
  -vf scale=1920:-2 \
  -movflags +faststart \
  hero-video-compressed.mp4
```

## Support

For more detailed information, see:
- [VIDEO_UPLOAD_GUIDE.md](./VIDEO_UPLOAD_GUIDE.md) - Complete troubleshooting guide
- [SANITY_QUICK_REFERENCE.md](./SANITY_QUICK_REFERENCE.md) - Quick steps for editors

## Summary

**Immediate Fix**: Use `/uploads/backgrounds/hero-video.mp4` in the `backgroundVideoUrl` field. The video is already in place and will work immediately!
