# Video Upload Guide for Sanity Studio

## Overview
This guide explains how to add background videos to the hero section, including troubleshooting upload issues and best practices.

## The Problem: Large File Uploads Getting Stuck

### Why It Happens
- Sanity's maximum file size limit: **100MB**
- **Recommended limit: 50MB** to avoid timeouts
- Browser upload timeouts (typically 2-5 minutes)
- Network instability can cause uploads to fail
- Your video (`hero-video.mp4`): **63MB** - exceeds recommended limit

### Symptoms
- Upload progress bar gets stuck at a certain percentage
- Upload appears to hang indefinitely
- Browser tab becomes unresponsive
- No error message, just perpetual loading

## Solution Options

### Option 1: Use backgroundVideoUrl (RECOMMENDED)

This is the **preferred solution** for files over 50MB, including your current 63MB video.

#### Steps:
1. Copy your video to `/public/uploads/backgrounds/` directory
   - Your video is already here: `/public/uploads/backgrounds/hero-video.mp4`

2. In Sanity Studio, edit the home page hero section:
   - Set **Background Type** to "Video"
   - **Leave Background Video (Upload) empty**
   - In **Background Video URL** field, enter: `/uploads/backgrounds/hero-video.mp4`
   - Optionally add a poster image for better loading experience

3. Save and publish

#### Advantages:
- No upload timeouts
- Works with any file size
- Faster page loads (served from your CDN/server)
- Better control over video optimization
- Can reference external video hosting (YouTube, Vimeo, Cloudflare Stream, etc.)

### Option 2: Compress the Video

If you want to use Sanity's file upload, compress the video to under 50MB.

#### Using FFmpeg (Recommended)
```bash
# Install ffmpeg (if not already installed)
brew install ffmpeg  # macOS
# or sudo apt install ffmpeg  # Linux

# Compress to target size (~30-40MB is ideal)
ffmpeg -i hero-video.mp4 \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -c:a aac \
  -b:a 128k \
  -vf scale=1920:-2 \
  -movflags +faststart \
  hero-video-compressed.mp4

# For more aggressive compression (if needed)
ffmpeg -i hero-video.mp4 \
  -c:v libx264 \
  -crf 30 \
  -preset slow \
  -c:a aac \
  -b:a 96k \
  -vf scale=1280:-2 \
  -movflags +faststart \
  hero-video-small.mp4
```

#### Parameters Explained:
- `-crf 28-30`: Quality level (lower = better quality, higher = smaller file)
- `-preset slow`: Better compression (worth the extra encoding time)
- `-c:a aac -b:a 128k`: Audio codec and bitrate
- `-vf scale=1920:-2`: Resize to 1920px width (maintains aspect ratio)
- `-movflags +faststart`: Optimize for web streaming

#### Online Tools (No Command Line):
- [HandBrake](https://handbrake.fr/) - Free, open-source
- [CloudConvert](https://cloudconvert.com/) - Online converter
- [Clipchamp](https://clipchamp.com/) - Browser-based editor

### Option 3: Use External Video Hosting

For very large videos or professional video hosting needs:

#### Services:
1. **Cloudflare Stream** - Paid, excellent performance
2. **Vimeo** - Pro account needed for background videos
3. **YouTube** - Free but has limitations for background playback
4. **Bunny.net Stream** - Cost-effective CDN solution

#### Steps:
1. Upload video to hosting service
2. Get the direct video URL (must be a direct .mp4 link, not an embed)
3. Use the URL in the **Background Video URL** field

## Best Practices

### Video Specifications for Hero Backgrounds

#### Optimal Settings:
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080 (Full HD) or 1280x720 (HD)
- **Frame Rate**: 24-30 fps
- **File Size**: 20-40MB (ideal), max 50MB
- **Duration**: 15-30 seconds (loop seamlessly)
- **Audio**: Not needed (background videos are muted)

#### Why These Specs?
- **1920x1080**: Good balance of quality and file size
- **24-30 fps**: Smooth playback without excessive file size
- **20-40MB**: Fast loading on most connections
- **15-30s loop**: Prevents large file sizes while maintaining visual interest

### Performance Tips

1. **Always add a poster image**
   - Shows instantly while video loads
   - Fallback for devices that don't support autoplay
   - Required for iOS devices

2. **Optimize for mobile**
   - Consider a separate mobile-optimized version
   - Or use CSS to hide video on mobile, show image instead

3. **Test on slow connections**
   - Use Chrome DevTools Network throttling
   - Test on actual mobile devices

## Troubleshooting

### Upload Still Failing?

1. **Clear browser cache**
   ```bash
   # Or use incognito/private browsing mode
   ```

2. **Try a different browser**
   - Chrome and Safari have different upload handling
   - Firefox sometimes handles large uploads better

3. **Check network stability**
   - Use a wired connection if possible
   - Disable VPN temporarily

4. **Restart Sanity Studio**
   ```bash
   npm run sanity:dev
   ```

### Video Not Playing on Frontend?

1. **Check the video URL**
   - Open browser dev tools, check Console for errors
   - Verify the path in Network tab
   - Ensure file is in `/public/` directory

2. **Check video format**
   - Must be MP4 (H.264)
   - Use `ffprobe` to check codec:
   ```bash
   ffprobe hero-video.mp4
   ```

3. **Mobile/iOS issues**
   - Ensure `playsInline` attribute is set (already in Hero component)
   - Add a poster image (required for iOS autoplay)

## Current Setup for Your Hero Video

### Your Video:
- Location: `/Users/ernestssmalikis/Projects/timber-international/public/uploads/backgrounds/hero-video.mp4`
- Size: 63MB
- Status: Too large for reliable Sanity upload

### Recommended Action:
Use **Option 1** (backgroundVideoUrl field):

1. Go to Sanity Studio → Home page
2. Edit Hero section
3. Set Background Type: Video
4. Background Video URL: `/uploads/backgrounds/hero-video.mp4`
5. Add a poster image for better UX
6. Save and Publish

The video is already in the correct location and will work immediately!

### Alternative:
If you want to use Sanity's upload feature, compress the video to ~30-40MB using the FFmpeg command provided above.

## Additional Resources

- [Sanity File Upload Documentation](https://www.sanity.io/docs/file-type)
- [FFmpeg Video Optimization Guide](https://trac.ffmpeg.org/wiki/Encode/H.264)
- [Web Video Best Practices - MDN](https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Video_codecs)
- [Video Compression Guide](https://www.adobe.com/creativecloud/video/discover/best-video-format.html)

## Questions?

If you continue to experience issues:
1. Check browser console for errors
2. Verify video file is not corrupted
3. Try a freshly compressed/converted version
4. Consider using external video hosting for production
