/**
 * Video Compression Script — Ultra-optimized for web
 * 360p, 20fps, 400kbps, H.264 CRF 32, no audio, faststart
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

console.log(`\n🎬 Compressing ${videos.length} videos to 360p ultra-light...\n`);

let totalOriginal = 0;
let totalCompressed = 0;

for (const file of videos) {
    const inputPath = join(ASSETS_DIR, file);
    const outputPath = join(TEMP_DIR, file);
    const originalSize = statSync(inputPath).size;
    totalOriginal += originalSize;

    console.log(`⏳ ${file} (${(originalSize / 1024).toFixed(0)} KB)...`);

    try {
        execSync(
            `"${ffmpegPath}" -i "${inputPath}" -y ` +
            `-vf "scale=-2:360" ` +             // 360p height
            `-r 20 ` +                           // 20 FPS (saves ~17% vs 24fps)
            `-c:v libx264 ` +                    // H.264
            `-preset veryslow ` +                // Max compression
            `-crf 32 ` +                         // Higher CRF = smaller file
            `-b:v 400k -maxrate 500k -bufsize 800k ` + // 400kbps target
            `-an ` +                             // No audio
            `-movflags +faststart ` +            // Instant web playback
            `-pix_fmt yuv420p ` +                // Universal format
            `-tune fastdecode ` +                // Optimized for fast decoding on mobile
            `"${outputPath}"`,
            { stdio: 'pipe', timeout: 180000 }
        );

        const compressedSize = statSync(outputPath).size;
        totalCompressed += compressedSize;
        const savings = ((1 - compressedSize / originalSize) * 100).toFixed(0);
        console.log(`   ✅ ${(compressedSize / 1024).toFixed(0)} KB (${savings}% smaller)\n`);
    } catch (err) {
        console.log(`   ❌ Failed: ${err.message}\n`);
        totalCompressed += originalSize;
    }
}

console.log(`\n${'='.repeat(50)}`);
console.log(`📊 Total original:   ${(totalOriginal / 1024).toFixed(0)} KB`);
console.log(`📊 Total compressed: ${(totalCompressed / 1024).toFixed(0)} KB`);
console.log(`📊 Savings:          ${((1 - totalCompressed / totalOriginal) * 100).toFixed(0)}%`);
console.log(`${'='.repeat(50)}\n`);

console.log('🔄 Replacing originals...');
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

console.log('✅ Done! All videos replaced with 360p ultra-light versions.\n');
