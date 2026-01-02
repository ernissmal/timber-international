# Sanity Studio Quick Reference

## Adding a Hero Background Video

### Quick Fix for Upload Issues

If your video upload is getting stuck:

1. **Use the Background Video URL field instead**
   - Place video in `/public/uploads/backgrounds/`
   - Enter path: `/uploads/backgrounds/your-video.mp4`
   - This bypasses upload limits and timeouts

### Current Hero Video
The hero video is already set up:
- File: `hero-video.mp4` (63MB)
- Location: `/public/uploads/backgrounds/hero-video.mp4`
- **Use this value**: `/uploads/backgrounds/hero-video.mp4`

### Steps:
1. Go to Home page in Sanity Studio
2. Edit Hero section
3. Background Type: "Video"
4. Background Video URL: `/uploads/backgrounds/hero-video.mp4`
5. Add a poster image (recommended)
6. Save & Publish

## When to Use Each Video Field

### Background Video (Upload)
- ✅ Small videos (under 50MB)
- ✅ Want Sanity to host the file
- ❌ Large videos (will timeout)
- ❌ Videos over 63MB

### Background Video URL (Recommended)
- ✅ Large videos (over 50MB)
- ✅ Videos in `/public` folder
- ✅ External video hosting
- ✅ Better performance
- ✅ No upload timeouts

## File Size Recommendations
- **Ideal**: 20-40MB
- **Max for upload**: 50MB
- **Use URL for**: 50MB+
- **Your video**: 63MB → Use URL field

## Need to Compress?
See `/docs/VIDEO_UPLOAD_GUIDE.md` for detailed compression instructions using FFmpeg.

Quick command:
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 128k -vf scale=1920:-2 -movflags +faststart output.mp4
```
