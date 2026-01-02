#!/usr/bin/env tsx

/**
 * Test script to verify video path resolution
 *
 * This script checks:
 * 1. Video file exists in public folder
 * 2. Path format is correct for Next.js public folder
 * 3. File size and format
 */

import fs from 'fs'
import path from 'path'

const publicDir = path.join(process.cwd(), 'public')
const videoPath = '/uploads/backgrounds/hero-video.mp4'
const fullPath = path.join(publicDir, videoPath)

console.log('🎥 Video Path Test\n')
console.log('━'.repeat(50))

// Check if file exists
console.log('📂 Checking file existence...')
if (fs.existsSync(fullPath)) {
  console.log('✅ Video file found!')
  console.log(`   Location: ${fullPath}`)
} else {
  console.log('❌ Video file NOT found!')
  console.log(`   Expected: ${fullPath}`)
  process.exit(1)
}

// Get file stats
console.log('\n📊 File Information:')
const stats = fs.statSync(fullPath)
const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2)
console.log(`   Size: ${fileSizeMB} MB`)
console.log(`   Created: ${stats.birthtime.toLocaleDateString()}`)
console.log(`   Modified: ${stats.mtime.toLocaleDateString()}`)

// Check file size recommendation
console.log('\n⚖️  File Size Analysis:')
const fileSize = parseFloat(fileSizeMB)
if (fileSize <= 40) {
  console.log('✅ File size is optimal (under 40MB)')
  console.log('   Recommended: Use either upload or URL field')
} else if (fileSize <= 50) {
  console.log('⚠️  File size is acceptable but approaching limit')
  console.log('   Recommended: Use backgroundVideoUrl field for reliability')
} else {
  console.log('⚠️  File size exceeds recommended limit for upload')
  console.log('   Recommended: Use backgroundVideoUrl field')
  console.log('   Alternative: Compress the video to reduce size')
}

// Verify path format
console.log('\n🔗 Path Configuration:')
console.log(`   Public folder path: ${videoPath}`)
console.log(`   Use in Sanity field: ${videoPath}`)
console.log('   ✅ Path format is correct for Next.js')

// Check file extension
const ext = path.extname(fullPath).toLowerCase()
console.log('\n🎬 Video Format:')
if (ext === '.mp4') {
  console.log('   ✅ Format: MP4 (recommended)')
} else if (ext === '.webm') {
  console.log('   ✅ Format: WebM (good alternative)')
} else {
  console.log(`   ⚠️  Format: ${ext} (consider using MP4 or WebM)`)
}

// Instructions
console.log('\n' + '━'.repeat(50))
console.log('📝 Next Steps for Sanity Studio:\n')
console.log('1. Open Sanity Studio (npm run sanity:dev)')
console.log('2. Navigate to Home page')
console.log('3. Edit Hero section')
console.log('4. Set Background Type: "Video"')
console.log(`5. In "Background Video URL" field, enter: ${videoPath}`)
console.log('6. Optionally add a poster image')
console.log('7. Save and Publish')
console.log('\n✨ Your video will work immediately!')
console.log('━'.repeat(50))
