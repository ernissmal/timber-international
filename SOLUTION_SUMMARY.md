# Hero Video Upload Issue - SOLVED ✅

## The Problem
Your 63MB `hero-video.mp4` was getting stuck when uploading to Sanity Studio because:
- File exceeds recommended upload limit (50MB)
- Browser timeouts occur with large files
- Sanity's hard limit is 100MB, but uploads often fail before reaching it

## The Solution (Immediate - No Work Needed!)

### Your video is already in the right place:
```
/public/uploads/backgrounds/hero-video.mp4
```

### Just use the backgroundVideoUrl field:

1. **Open Sanity Studio**:
   ```bash
   npm run sanity:dev
   ```

2. **Navigate to**: Home page → Hero section

3. **Configure**:
   - Background Type: `Video`
   - Background Video (Upload): *Leave empty*
   - **Background Video URL**: `/uploads/backgrounds/hero-video.mp4`
   - Video Poster: *Add an image (recommended)*

4. **Save and Publish**

That's it! Your video will work immediately. ✨

## Why This Works
- Files in `/public/` are served directly by Next.js
- No upload needed = no timeouts
- Better performance (faster loading)
- No file size restrictions

## What Was Changed

### 1. Schema Updates (`sanity/schemas/blocks/hero.ts`)
- ✅ Clearer descriptions explaining when to use each field
- ✅ Changed `backgroundVideoUrl` from URL type to string (more flexible)
- ✅ Added validation requiring at least one video source
- ✅ Updated recommended limit from 100MB to 50MB
- ✅ Added placeholder showing example path

### 2. Sanity Config (`sanity.config.ts`)
- ✅ Enabled `directUploads` for better reliability
- ✅ Added documentation comments

### 3. Documentation Created
- ✅ `docs/VIDEO_UPLOAD_GUIDE.md` - Complete troubleshooting guide
- ✅ `docs/SANITY_QUICK_REFERENCE.md` - Quick reference for editors
- ✅ `docs/README.md` - Full documentation of the issue and solution
- ✅ `scripts/test-video-path.ts` - Test script to verify setup

### 4. Package.json
- ✅ Added `npm run test:video` command

## Alternative Options (If You Want Them)

### Option A: Compress the Video
If you want to use Sanity's upload feature, compress to under 50MB:

```bash
# Install ffmpeg first: brew install ffmpeg

ffmpeg -i public/uploads/backgrounds/hero-video.mp4 \
  -c:v libx264 -crf 28 \
  -preset slow \
  -c:a aac -b:a 128k \
  -vf scale=1920:-2 \
  -movflags +faststart \
  hero-video-compressed.mp4
```

### Option B: External Video Hosting
Use services like:
- Cloudflare Stream
- Vimeo Pro
- Bunny.net Stream

Then put the direct video URL in the `backgroundVideoUrl` field.

## Testing

Run the video path test:
```bash
npm run test:video
```

This verifies:
- ✅ Video file exists
- ✅ Path is correct
- ✅ File size and recommendations
- ✅ Next steps

## Documentation

Full guides are in the `/docs` folder:

### For Editors/Content Managers:
- **`docs/SANITY_QUICK_REFERENCE.md`** - Quick steps and when to use which field

### For Developers:
- **`docs/README.md`** - Complete technical documentation
- **`docs/VIDEO_UPLOAD_GUIDE.md`** - Troubleshooting, compression, best practices

## Video Best Practices

### Optimal Specifications:
- **Format**: MP4 (H.264)
- **Resolution**: 1920x1080 or 1280x720
- **Size**: 20-40MB (ideal), max 50MB for uploads
- **Duration**: 15-30 seconds (seamless loop)
- **Frame Rate**: 24-30 fps

### Performance Tips:
- ✅ Always add a poster image
- ✅ Test on mobile devices
- ✅ Use Chrome DevTools to test slow connections
- ✅ Consider mobile-specific optimization

## Current Status

✅ **Video file**: In place at `/public/uploads/backgrounds/hero-video.mp4`
✅ **Size**: 63MB
✅ **Format**: MP4
✅ **Solution**: Use `backgroundVideoUrl` field
✅ **Ready to use**: Yes - just configure in Sanity Studio

## Next Steps

1. Open Sanity Studio (`npm run sanity:dev`)
2. Edit Home page → Hero section
3. Set Background Video URL to: `/uploads/backgrounds/hero-video.mp4`
4. Add a poster image
5. Save & Publish
6. Done! 🎉

---

**Need Help?** Check the documentation in `/docs` folder or run `npm run test:video`
