import { useEffect, useRef } from 'react';

export function useScrollReveal(threshold = 0.15) {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold, rootMargin: '0px 0px -50px 0px' }
        );

        // Observe the element itself
        const revealEls = el.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children');
        revealEls.forEach((child) => observer.observe(child));

        // Also observe the container if it has a reveal class
        if (el.classList.contains('reveal') || el.classList.contains('reveal-left') || el.classList.contains('reveal-right') || el.classList.contains('reveal-scale') || el.classList.contains('stagger-children')) {
            observer.observe(el);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return ref;
}
