/**
 * Video Compression — 720p, quality-preserving, low bitrate
 * CRF 30, 300kbps cap, 24fps, H.264, faststart, no audio
 */
import { execSync } from 'child_process';
import { readdirSync, statSync, mkdirSync, existsSync, renameSync, unlinkSync } from 'fs';
import { join } from 'path';
import ffmpegPath from 'ffmpeg-static';

const ASSETS_DIR = join(process.cwd(), 'src', 'assets');
const TEMP_DIR = join(process.cwd(), 'src', 'assets', '_compressed');
if (!existsSync(TEMP_DIR)) mkdirSync(TEMP_DIR, { recursive: true });

const videos = readdirSync(ASSETS_DIR).filter(f => f.endsWith('.mp4'));
console.log(`\n🎬 Compressing ${videos.length} videos to 720p (quality + performance)...\n`);

let totalOrig = 0, totalComp = 0;

for (const file of videos) {
    const inp = join(ASSETS_DIR, file);
    const out = join(TEMP_DIR, file);
    const origSz = statSync(inp).size;
    totalOrig += origSz;
    console.log(`⏳ ${file} (${(origSz / 1024 / 1024).toFixed(2)} MB)...`);
    try {
        execSync(
            `"${ffmpegPath}" -i "${inp}" -y ` +
            `-vf "scale=-2:720" ` +
            `-r 24 ` +
            `-c:v libx264 ` +
            `-preset slow ` +
            `-crf 30 ` +
            `-maxrate 500k -bufsize 1000k ` +
            `-profile:v main -level 3.1 ` +
            `-an ` +
            `-movflags +faststart ` +
            `-pix_fmt yuv420p ` +
            `-tune film ` +
            `"${out}"`,
            { stdio: 'pipe', timeout: 180000 }
        );
        const compSz = statSync(out).size;
        totalComp += compSz;
        console.log(`   ✅ ${(compSz / 1024).toFixed(0)} KB (${((1 - compSz / origSz) * 100).toFixed(0)}% smaller)\n`);
    } catch (err) {
        console.log(`   ❌ ${err.message}\n`);
        totalComp += origSz;
    }
}

console.log(`${'='.repeat(50)}`);
console.log(`📊 Original: ${(totalOrig / 1024 / 1024).toFixed(2)} MB → Compressed: ${(totalComp / 1024 / 1024).toFixed(2)} MB (${((1 - totalComp / totalOrig) * 100).toFixed(0)}% saved)`);
console.log(`${'='.repeat(50)}\n`);

console.log('🔄 Replacing...');
for (const f of videos) {
    const o = join(ASSETS_DIR, f), c = join(TEMP_DIR, f);
    if (existsSync(c)) { unlinkSync(o); renameSync(c, o); }
}
try { if (readdirSync(TEMP_DIR).length === 0) execSync(`rmdir "${TEMP_DIR}"`, { stdio: 'pipe' }); } catch { }
console.log('✅ Done!\n');
