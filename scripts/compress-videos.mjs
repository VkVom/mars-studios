/**
 * Video Compression Script — 720p Quality-Preserving
 * 720p, 24fps, H.264 CRF 26, smart bitrate, no audio, faststart
 * Preserves quality while achieving ~90% compression
 *
 * Run: node scripts/compress-videos.mjs
 */

import { execSync } from 'child_process';
import { readdirSync, statSync, mkdirSync, existsSync, renameSync, unlinkSync } from 'fs';
import { join } from 'path';
import ffmpegPath from 'ffmpeg-static';

const ASSETS_DIR = join(process.cwd(), 'src', 'assets');
const TEMP_DIR = join(process.cwd(), 'src', 'assets', '_compressed');

if (!existsSync(TEMP_DIR)) mkdirSync(TEMP_DIR, { recursive: true });

const videos = readdirSync(ASSETS_DIR).filter(f => f.endsWith('.mp4'));

console.log(`\n🎬 Compressing ${videos.length} videos to 720p (quality-preserving)...\n`);

let totalOriginal = 0;
let totalCompressed = 0;

for (const file of videos) {
    const inputPath = join(ASSETS_DIR, file);
    const outputPath = join(TEMP_DIR, file);
    const originalSize = statSync(inputPath).size;
    totalOriginal += originalSize;

    console.log(`⏳ ${file} (${(originalSize / 1024 / 1024).toFixed(2)} MB)...`);

    try {
        execSync(
            `"${ffmpegPath}" -i "${inputPath}" -y ` +
            `-vf "scale=-2:720" ` +             // 720p height, auto width
            `-r 24 ` +                           // 24 FPS
            `-c:v libx264 ` +                    // H.264 codec
            `-preset medium ` +                  // Good balance of speed/compression
            `-crf 26 ` +                         // CRF 26: good quality, much smaller
            `-profile:v main ` +                 // Main profile for wide compatibility
            `-level 3.1 ` +                      // Level 3.1 for mobile compatibility
            `-an ` +                             // No audio
            `-movflags +faststart ` +            // Instant web playback
            `-pix_fmt yuv420p ` +                // Universal pixel format
            `-tune film ` +                      // Tuned for film content (better quality)
            `"${outputPath}"`,
            { stdio: 'pipe', timeout: 180000 }
        );

        const compressedSize = statSync(outputPath).size;
        totalCompressed += compressedSize;
        const savings = ((1 - compressedSize / originalSize) * 100).toFixed(0);
        console.log(`   ✅ ${(compressedSize / 1024 / 1024).toFixed(2)} MB (${savings}% smaller)\n`);
    } catch (err) {
        console.log(`   ❌ Failed: ${err.message}\n`);
        totalCompressed += originalSize;
    }
}

console.log(`\n${'='.repeat(50)}`);
console.log(`📊 Total original:   ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
console.log(`📊 Total compressed: ${(totalCompressed / 1024 / 1024).toFixed(2)} MB`);
console.log(`📊 Savings:          ${((1 - totalCompressed / totalOriginal) * 100).toFixed(0)}%`);
console.log(`${'='.repeat(50)}\n`);

console.log('🔄 Replacing originals with compressed versions...');
for (const file of videos) {
    const originalPath = join(ASSETS_DIR, file);
    const compressedPath = join(TEMP_DIR, file);
    if (existsSync(compressedPath)) {
        unlinkSync(originalPath);
        renameSync(compressedPath, originalPath);
    }
}

try {
    const remaining = readdirSync(TEMP_DIR);
    if (remaining.length === 0) execSync(`rmdir "${TEMP_DIR}"`, { stdio: 'pipe' });
} catch (e) { }

console.log('✅ Done! All videos replaced with 720p optimized versions.\n');
