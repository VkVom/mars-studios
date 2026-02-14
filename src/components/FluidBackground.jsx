import React, { useEffect, useRef } from 'react';

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

export default function FluidBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        // Skip entirely on mobile — this is the biggest performance win
        if (isMobile) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let animId;
        let isVisible = true;
        let resizeTimeout;

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        const debouncedResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 200);
        };

        const initParticles = () => {
            particles = [];
            const count = Math.min(width * 0.03, 40); // Reduced from 100 to 40 max
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    size: Math.random() * 300 + 100,
                    color: i % 2 === 0 ? 'rgba(232, 96, 10, 0.03)' : 'rgba(255, 154, 60, 0.03)',
                });
            }
        };

        const animate = () => {
            if (!isVisible) return;

            ctx.clearRect(0, 0, width, height);

            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, '#fafaf8');
            gradient.addColorStop(1, '#ffffff');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);

            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < -p.size) p.x = width + p.size;
                if (p.x > width + p.size) p.x = -p.size;
                if (p.y < -p.size) p.y = height + p.size;
                if (p.y > height + p.size) p.y = -p.size;

                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                g.addColorStop(0, p.color);
                g.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            animId = requestAnimationFrame(animate);
        };

        // Optimization: Pause when off-screen
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
            if (isVisible) {
                cancelAnimationFrame(animId);
                animate();
            } else {
                cancelAnimationFrame(animId);
            }
        });
        observer.observe(canvas);

        resize();
        window.addEventListener('resize', debouncedResize);

        return () => {
            window.removeEventListener('resize', debouncedResize);
            clearTimeout(resizeTimeout);
            cancelAnimationFrame(animId);
            observer.disconnect();
        };
    }, []);

    // On mobile, render a simple gradient div instead of a canvas
    if (isMobile) {
        return (
            <div style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0,
                background: 'linear-gradient(135deg, #fafaf8 0%, #fff 100%)',
            }} />
        );
    }

    return (
        <canvas
            ref={canvasRef}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
        />
    );
}
