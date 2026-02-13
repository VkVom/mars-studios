import { useState, useEffect, useRef, useCallback } from 'react';
import './Preloader.css';

// Import all video files directly so we can preload them
import vidFood from '../assets/Food&restauran.mp4';
import vidKitchen from '../assets/Dr Kitchen.mp4';
import vidCakes from '../assets/Lollino cakes - Trim.mp4';
import vidProduct1 from '../assets/premium_product_animation .mp4';
import vidProduct2 from '../assets/Productanimation2.mp4';
import vidSuryamark from '../assets/Suryamark.mp4';
import vidUGC from '../assets/ugc premium quality.mp4';
import vidChicken from '../assets/chicken - Trim.mp4';
import vidProductAnim from '../assets/product animation - Trim.mp4';
import vidProductAnim2 from '../assets/product animation  - Trim.mp4';
import vidNila from '../assets/Nila catering service - Trim.mp4';
import vidStory from '../assets/premium(1 min)story telling.mp4';
import vidVoiceover from '../assets/story telling with voiceover .mp4';

const ALL_VIDEOS = [
    vidFood, vidKitchen, vidCakes, vidProduct1, vidProduct2,
    vidSuryamark, vidUGC, vidChicken, vidProductAnim, vidProductAnim2,
    vidNila, vidStory, vidVoiceover,
];

/**
 * Preloads a single video by creating an off-screen <video> element
 * and waiting for it to buffer enough data to play.
 */
function preloadVideo(src) {
    return new Promise((resolve) => {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.muted = true;
        video.playsInline = true;
        video.src = src;

        // Resolve when enough data is buffered to start playing
        const onReady = () => {
            cleanup();
            resolve();
        };

        const onError = () => {
            cleanup();
            resolve(); // Don't block on failures
        };

        const cleanup = () => {
            video.removeEventListener('canplaythrough', onReady);
            video.removeEventListener('error', onError);
        };

        video.addEventListener('canplaythrough', onReady, { once: true });
        video.addEventListener('error', onError, { once: true });

        // Force the browser to start buffering
        video.load();

        // Safety timeout — don't block forever on huge videos (8s max per video)
        setTimeout(onReady, 8000);
    });
}

/**
 * Premium Preloader — preloads ALL fonts AND videos during loading animation.
 * Once everything is buffered, the site is revealed with a smooth exit.
 */
export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);
    const [removed, setRemoved] = useState(false);
    const startTime = useRef(Date.now());

    const preloadAssets = useCallback(async () => {
        const totalAssets = ALL_VIDEOS.length + 2; // videos + fonts + images
        let loaded = 0;

        const updateProgress = () => {
            loaded++;
            setProgress(Math.min(Math.round((loaded / totalAssets) * 100), 99));
        };

        // 1. Start preloading fonts
        const fontPromise = document.fonts.ready.then(updateProgress);

        // 2. Preload ALL videos in parallel (the key optimization!)
        const videoPromises = ALL_VIDEOS.map((src) =>
            preloadVideo(src).then(updateProgress)
        );

        // 3. Preload any images already in the DOM
        const imagePromise = new Promise((resolve) => {
            const imgs = document.querySelectorAll('img[src]');
            const unloaded = Array.from(imgs).filter((img) => !img.complete);
            if (unloaded.length === 0) {
                updateProgress();
                resolve();
                return;
            }
            let imgLoaded = 0;
            unloaded.forEach((img) => {
                const done = () => {
                    imgLoaded++;
                    if (imgLoaded >= unloaded.length) {
                        updateProgress();
                        resolve();
                    }
                };
                img.addEventListener('load', done, { once: true });
                img.addEventListener('error', done, { once: true });
            });
            // Safety timeout for images
            setTimeout(() => { updateProgress(); resolve(); }, 5000);
        });

        // Wait for everything
        await Promise.all([fontPromise, ...videoPromises, imagePromise]);

        // Ensure minimum display time for the animation (2.5s)
        const elapsed = Date.now() - startTime.current;
        const minTime = 2500;
        if (elapsed < minTime) {
            await new Promise((r) => setTimeout(r, minTime - elapsed));
        }

        setProgress(100);
    }, []);

    useEffect(() => {
        // Prevent scroll during loading
        document.body.style.overflow = 'hidden';

        preloadAssets().then(() => {
            // Small delay to show 100% before exit animation
            setTimeout(() => {
                setDone(true);
                document.body.style.overflow = '';
                // Remove from DOM after exit animation completes
                setTimeout(() => {
                    setRemoved(true);
                    onComplete?.();
                }, 900);
            }, 300);
        });

        return () => {
            document.body.style.overflow = '';
        };
    }, [preloadAssets, onComplete]);

    if (removed) return null;

    return (
        <div className={`preloader ${done ? 'preloader--done' : ''}`}>
            {/* Ambient glow */}
            <div className="preloader__glow" />

            {/* Floating particles */}
            <div className="preloader__particles">
                {Array.from({ length: 8 }, (_, i) => (
                    <div
                        key={i}
                        className="preloader__particle"
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                            animationDelay: `${Math.random() * 3}s`,
                            width: `${2 + Math.random() * 3}px`,
                            height: `${2 + Math.random() * 3}px`,
                        }}
                    />
                ))}
            </div>

            {/* Animated Logo */}
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

            {/* Brand name */}
            <div className="preloader__brand">Mars Media</div>

            {/* Progress bar */}
            <div className="preloader__progress">
                <div className="preloader__bar" style={{ width: `${progress}%` }} />
            </div>

            {/* Status text */}
            <div className="preloader__percent">
                {progress < 100 ? `Loading assets... ${progress}%` : 'Ready'}
            </div>
        </div>
    );
}
