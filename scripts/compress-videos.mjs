/**
 * Video Compression Script
 * Compresses all MP4 videos in src/assets/ to web-optimized versions:
 * - Resolution: 480p (scale to 480px height, keep aspect ratio)
 * - FPS: 24
 * - Codec: H.264 (best browser support)
 * - Bitrate: 800kbps (crisp enough for previews, tiny file size)
 * - Audio: stripped (videos are muted on the site anyway)
 * - Fast start: moov atom at front for instant playback
 *
 * Run: node scripts/compress-videos.mjs
 */

import { execSync } from 'child_process';
import { readdirSync, statSync, mkdirSync, existsSync, renameSync, unlinkSync } from 'fs';
import { join, basename } from 'path';
import ffmpegPath from 'ffmpeg-static';

const ASSETS_DIR = join(process.cwd(), 'src', 'assets');
const TEMP_DIR = join(process.cwd(), 'src', 'assets', '_compressed');

// Create temp directory
if (!existsSync(TEMP_DIR)) mkdirSync(TEMP_DIR, { recursive: true });

const videos = readdirSync(ASSETS_DIR).filter(f => f.endsWith('.mp4'));

console.log(`\n🎬 Compressing ${videos.length} videos...\n`);
console.log(`FFmpeg: ${ffmpegPath}\n`);

let totalOriginal = 0;
let totalCompressed = 0;

for (const file of videos) {
    const inputPath = join(ASSETS_DIR, file);
    const outputPath = join(TEMP_DIR, file);
    const originalSize = statSync(inputPath).size;
    totalOriginal += originalSize;

    console.log(`⏳ ${file} (${(originalSize / 1024 / 1024).toFixed(2)} MB)...`);

    try {
        // FFmpeg command: 480p, 24fps, 800kbps H.264, no audio, fast start
        execSync(
            `"${ffmpegPath}" -i "${inputPath}" -y ` +
            `-vf "scale=-2:480" ` +           // Scale height to 480px, auto width (even numbers)
            `-r 24 ` +                          // 24 FPS
            `-c:v libx264 ` +                   // H.264 codec
            `-preset slow ` +                   // Better compression (slower encoding = smaller file)
            `-crf 28 ` +                        // Constant Rate Factor (23=good, 28=smaller, 35=tiny)
            `-b:v 800k -maxrate 1000k -bufsize 1500k ` + // Target bitrate with ceiling
            `-an ` +                            // No audio
            `-movflags +faststart ` +           // Move moov atom to front for instant web playback
            `-pix_fmt yuv420p ` +               // Universal pixel format
            `"${outputPath}"`,
            { stdio: 'pipe', timeout: 120000 }  // 2 min timeout per video
        );

        const compressedSize = statSync(outputPath).size;
        totalCompressed += compressedSize;
        const savings = ((1 - compressedSize / originalSize) * 100).toFixed(0);
        console.log(`   ✅ ${(compressedSize / 1024 / 1024).toFixed(2)} MB (${savings}% smaller)\n`);
    } catch (err) {
        console.log(`   ❌ Failed: ${err.message}\n`);
        totalCompressed += originalSize; // count as unchanged
    }
}

console.log(`\n${'='.repeat(50)}`);
console.log(`📊 Total original:   ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
console.log(`📊 Total compressed: ${(totalCompressed / 1024 / 1024).toFixed(2)} MB`);
console.log(`📊 Total savings:    ${((1 - totalCompressed / totalOriginal) * 100).toFixed(0)}%`);
console.log(`${'='.repeat(50)}\n`);

// Replace originals with compressed versions
console.log('🔄 Replacing originals with compressed versions...');
for (const file of videos) {
    const originalPath = join(ASSETS_DIR, file);
    const compressedPath = join(TEMP_DIR, file);
    if (existsSync(compressedPath)) {
        unlinkSync(originalPath);
        renameSync(compressedPath, originalPath);
    }
}

// Remove temp directory
try {
    const remaining = readdirSync(TEMP_DIR);
    if (remaining.length === 0) {
        execSync(`rmdir "${TEMP_DIR}"`, { stdio: 'pipe' });
    }
} catch (e) {
    // ignore cleanup errors
}

console.log('✅ Done! All videos have been replaced with optimized versions.\n');
