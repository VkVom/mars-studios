/**
 * Video Compression — 720p, CRF 32, 300kbps cap
 * Maximum compression while preserving 720p clarity
 */
import { execSync } from 'child_process';
import { readdirSync, statSync, mkdirSync, existsSync, renameSync, unlinkSync } from 'fs';
import { join } from 'path';
import ffmpegPath from 'ffmpeg-static';

const ASSETS_DIR = join(process.cwd(), 'src', 'assets');
const TEMP_DIR = join(process.cwd(), 'src', 'assets', '_compressed');
if (!existsSync(TEMP_DIR)) mkdirSync(TEMP_DIR, { recursive: true });

const videos = readdirSync(ASSETS_DIR).filter(f => f.endsWith('.mp4'));
console.log(`\n🎬 Compressing ${videos.length} videos — 720p CRF32 300kbps...\n`);

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
            `-r 24 -c:v libx264 ` +
            `-preset slow ` +
            `-crf 32 ` +
            `-maxrate 300k -bufsize 600k ` +
            `-profile:v main -level 3.1 ` +
            `-an -movflags +faststart ` +
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
console.log(`📊 ${(totalOrig / 1024 / 1024).toFixed(1)} MB → ${(totalComp / 1024 / 1024).toFixed(2)} MB (${((1 - totalComp / totalOrig) * 100).toFixed(0)}% saved)`);
console.log(`${'='.repeat(50)}\n`);

console.log('🔄 Replacing...');
for (const f of videos) {
    const o = join(ASSETS_DIR, f), c = join(TEMP_DIR, f);
    if (existsSync(c)) { unlinkSync(o); renameSync(c, o); }
}
try { if (readdirSync(TEMP_DIR).length === 0) execSync(`rmdir "${TEMP_DIR}"`, { stdio: 'pipe' }); } catch { }
console.log('✅ Done!\n');
