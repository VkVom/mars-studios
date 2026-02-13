import { useState, useEffect, useRef, useCallback } from 'react';
import './Preloader.css';

// Import only the carousel videos (visible first) for preloading
// Grid videos are below the fold and can load lazily
import vidNila from '../assets/Nila catering service - Trim.mp4';
import vidStory from '../assets/premium(1 min)story telling.mp4';
import vidVoiceover from '../assets/story telling with voiceover .mp4';
import vidProduct1 from '../assets/premium_product_animation .mp4';
import vidSuryamark from '../assets/Suryamark.mp4';
import vidUGC from '../assets/ugc premium quality.mp4';

// Only preload carousel videos (visible above/near fold)
const CRITICAL_VIDEOS = [vidNila, vidStory, vidVoiceover, vidProduct1, vidSuryamark, vidUGC];

// On mobile, preload even fewer videos (only first 3 carousel)
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
const VIDEOS_TO_PRELOAD = isMobile ? CRITICAL_VIDEOS.slice(0, 3) : CRITICAL_VIDEOS;

/**
 * Lightweight video preloader — fetches just enough data to start playing.
 * Uses 'canplay' (not canplaythrough) for faster completion.
 */
function preloadVideo(src) {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        video.src = src;

        const done = () => {
            video.removeEventListener('canplay', done);
            video.removeEventListener('error', done);
            resolve();
        };

        video.addEventListener('canplay', done, { once: true });
        video.addEventListener('error', done, { once: true });
        video.load();

        // Shorter timeout — 4s max per video
        setTimeout(done, 4000);
    });
}

/**
 * Lightweight Preloader — preloads critical videos + fonts.
 * Fast on mobile, comprehensive on desktop.
 */
export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);
    const [removed, setRemoved] = useState(false);
    const startTime = useRef(Date.now());

    const preloadAssets = useCallback(async () => {
        const totalAssets = VIDEOS_TO_PRELOAD.length + 1; // videos + fonts
        let loaded = 0;

        const tick = () => {
            loaded++;
            setProgress(Math.min(Math.round((loaded / totalAssets) * 100), 99));
        };

        // 1. Fonts
        const fontPromise = document.fonts.ready.then(tick);

        // 2. Critical videos only
        const videoPromises = VIDEOS_TO_PRELOAD.map((src) =>
            preloadVideo(src).then(tick)
        );

        await Promise.all([fontPromise, ...videoPromises]);

        // Minimum display time: 1.8s on mobile, 2.2s on desktop
        const elapsed = Date.now() - startTime.current;
        const minTime = isMobile ? 1800 : 2200;
        if (elapsed < minTime) {
            await new Promise((r) => setTimeout(r, minTime - elapsed));
        }

        setProgress(100);
    }, []);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        preloadAssets().then(() => {
            setTimeout(() => {
                setDone(true);
                document.body.style.overflow = '';
                setTimeout(() => {
                    setRemoved(true);
                    onComplete?.();
                }, 700); // Faster exit
            }, 200);
        });

        return () => { document.body.style.overflow = ''; };
    }, [preloadAssets, onComplete]);

    if (removed) return null;

    return (
        <div className={`preloader ${done ? 'preloader--done' : ''}`}>
            <div className="preloader__glow" />

            {/* Fewer particles on mobile */}
            <div className="preloader__particles">
                {Array.from({ length: isMobile ? 4 : 8 }, (_, i) => (
                    <div
                        key={i}
                        className="preloader__particle"
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                            animationDelay: `${Math.random() * 2}s`,
                            width: `${2 + Math.random() * 3}px`,
                            height: `${2 + Math.random() * 3}px`,
                        }}
                    />
                ))}
            </div>

            <div className="preloader__logo">
                <svg viewBox="0 0 80 80" fill="none">
                    <defs>
                        <linearGradient id="preloader-grad" x1="0" y1="0" x2="80" y2="80">
                            <stop stopColor="#e8600a" />
                            <stop offset="1" stopColor="#ff9a3c" />
                        </linearGradient>
                    </defs>
                    <rect
                        className="preloader__logo-path"
                        x="4" y="4" width="72" height="72" rx="18"
                        stroke="url(#preloader-grad)" strokeWidth="2" fill="none"
                    />
                    <rect
                        className="preloader__logo-fill"
                        x="4" y="4" width="72" height="72" rx="18"
                        fill="url(#preloader-grad)"
                    />
                    <path
                        className="preloader__logo-path"
                        d="M20 40L28 24L40 40L52 24L60 40"
                        stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        fill="none"
                    />
                    <path
                        className="preloader__logo-fill"
                        d="M20 52L40 36L60 52"
                        stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        fill="none" opacity="0.5"
                    />
                </svg>
            </div>

            <div className="preloader__brand">Mars Media</div>

            <div className="preloader__progress">
                <div className="preloader__bar" style={{ width: `${progress}%` }} />
            </div>

            <div className="preloader__percent">
                {progress < 100 ? `${progress}%` : '✓'}
            </div>
        </div>
    );
}
