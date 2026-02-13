import { useState, useEffect, useRef, useCallback } from 'react';
import './Preloader.css';

/**
 * Premium Preloader — preloads fonts, videos, and images
 * then reveals the page with a smooth exit animation.
 */
export default function Preloader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [done, setDone] = useState(false);
    const [removed, setRemoved] = useState(false);
    const startTime = useRef(Date.now());

    const preloadAssets = useCallback(async () => {
        const tasks = [];
        let loaded = 0;

        // 1. Preload fonts
        tasks.push(document.fonts.ready);

        // 2. Find all video sources from the DOM and preload them
        const videoSources = document.querySelectorAll('video source, video[src]');
        videoSources.forEach((el) => {
            const src = el.src || el.getAttribute('src');
            if (src) {
                tasks.push(
                    fetch(src, { mode: 'no-cors' })
                        .then(() => { })
                        .catch(() => { }) // Don't block on video errors
                );
            }
        });

        // 3. Preload images
        const images = document.querySelectorAll('img[src]');
        images.forEach((img) => {
            if (!img.complete) {
                tasks.push(
                    new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    })
                );
            }
        });

        // 4. Preload background images from CSS (critical ones)
        // We'll simulate this with a small delay to show progress
        tasks.push(new Promise((r) => setTimeout(r, 300)));

        const total = Math.max(tasks.length, 1);

        // Track progress
        const trackProgress = (task) =>
            task.then(() => {
                loaded++;
                setProgress(Math.round((loaded / total) * 100));
            });

        await Promise.all(tasks.map(trackProgress));

        // Ensure minimum display time of 2.2s for the animation to play
        const elapsed = Date.now() - startTime.current;
        const minTime = 2200;
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
                // Remove from DOM after exit animation
                setTimeout(() => {
                    setRemoved(true);
                    onComplete?.();
                }, 900);
            }, 400);
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
                    {/* Background rect with stroke animation */}
                    <rect
                        className="preloader__logo-path"
                        x="4" y="4" width="72" height="72" rx="18"
                        stroke="url(#preloader-grad)" strokeWidth="2" fill="none"
                    />
                    {/* Fill fades in */}
                    <rect
                        className="preloader__logo-fill"
                        x="4" y="4" width="72" height="72" rx="18"
                        fill="url(#preloader-grad)"
                    />
                    {/* M paths */}
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

            {/* Percentage */}
            <div className="preloader__percent">{progress}%</div>
        </div>
    );
}
