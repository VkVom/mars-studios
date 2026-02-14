import { useState, useEffect, useRef, useCallback } from 'react';
import './Preloader.css';

// Import ALL video files for preloading
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

// Carousel videos (shown on ALL screens)
const CAROUSEL_VIDEOS = [vidNila, vidStory, vidVoiceover, vidProduct1, vidSuryamark, vidUGC];

// Grid-only videos (hidden on mobile, only shown on desktop)
const GRID_ONLY_VIDEOS = [vidFood, vidKitchen, vidCakes, vidProduct2, vidChicken, vidProductAnim, vidProductAnim2];

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

// On mobile: only cache carousel videos (grid is hidden)
// On desktop: cache everything
const VIDEOS_TO_CACHE = isMobile ? CAROUSEL_VIDEOS : [...CAROUSEL_VIDEOS, ...GRID_ONLY_VIDEOS];

/**
 * Fetches a video file into the browser HTTP cache.
 * When <video src="..."> later uses the same URL, it loads from cache instantly.
 */
function cacheVideo(src) {
    return fetch(src, { mode: 'cors', credentials: 'same-origin' })
        .then(() => { })
        .catch(() => { });
}

export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);
    const [removed, setRemoved] = useState(false);
    const startTime = useRef(Date.now());

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 95) return 95;
                return prev + Math.floor(Math.random() * 10) + 1;
            });
        }, 150);
        return () => clearInterval(interval);
    }, []);

    const preloadAssets = useCallback(async () => {
        // Only wait for fonts and minimum timer
        // We removed video pre-fetching because it was causing 15s lag on load
        // The components now handle lazy-loading (preload="metadata") efficiently
        const fontsPromise = document.fonts.ready;
        const minTimePromise = new Promise((resolve) => {
            const minTime = isMobile ? 2000 : 1500; // Reduced wait time slightly
            setTimeout(resolve, minTime);
        });

        await Promise.all([fontsPromise, minTimePromise]);

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
                }, 600);
            }, 150);
        });
        return () => { document.body.style.overflow = ''; };
    }, [preloadAssets, onComplete]);

    if (removed) return null;

    return (
        <div className={`preloader ${done ? 'preloader--done' : ''}`}>
            <div className="preloader__glow" />
            <div className="preloader__particles">
                {Array.from({ length: isMobile ? 3 : 6 }, (_, i) => (
                    <div key={i} className="preloader__particle"
                        style={{
                            left: `${15 + Math.random() * 70}%`,
                            animationDuration: `${3 + Math.random() * 3}s`,
                            animationDelay: `${Math.random() * 2}s`,
                            width: `${2 + Math.random() * 2}px`,
                            height: `${2 + Math.random() * 2}px`,
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
                    <rect className="preloader__logo-path" x="4" y="4" width="72" height="72" rx="18"
                        stroke="url(#preloader-grad)" strokeWidth="2" fill="none" />
                    <rect className="preloader__logo-fill" x="4" y="4" width="72" height="72" rx="18"
                        fill="url(#preloader-grad)" />
                    <path className="preloader__logo-path" d="M20 40L28 24L40 40L52 24L60 40"
                        stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path className="preloader__logo-fill" d="M20 52L40 36L60 52"
                        stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                        fill="none" opacity="0.5" />
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
