import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ParticleField from '../components/ParticleField';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Home.css';

/* Animated counter */
function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
    const ref = useRef(null);
    const counted = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !counted.current) {
                    counted.current = true;
                    let start = 0;
                    const startTime = performance.now();
                    const step = (now) => {
                        const progress = Math.min((now - startTime) / duration, 1);
                        const eased = 1 - Math.pow(1 - progress, 3);
                        el.textContent = Math.floor(eased * target) + suffix;
                        if (progress < 1) requestAnimationFrame(step);
                    };
                    requestAnimationFrame(step);
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [target, suffix, duration]);

    return <span ref={ref}>0{suffix}</span>;
}

export default function Home() {
    const sectionRef = useScrollReveal();

    return (
        <div className="home" ref={sectionRef}>
            {/* ===== HERO SECTION ===== */}
            <section className="hero">
                <ParticleField count={60} />
                <div className="hero__bg-orbs">
                    <div className="hero__orb hero__orb--1" />
                    <div className="hero__orb hero__orb--2" />
                    <div className="hero__orb hero__orb--3" />
                </div>
                <div className="hero__grid-overlay" />

                <div className="container hero__content">
                    <div className="hero__badge reveal">
                        <span className="hero__badge-dot" />
                        AI-Powered Video Production
                    </div>

                    <h1 className="hero__title reveal">
                        We Create
                        <span className="hero__title-highlight">
                            <span className="text-gradient"> Cinematic AI </span>
                            <svg className="hero__title-underline" viewBox="0 0 300 12" preserveAspectRatio="none">
                                <path d="M0 6C50 2 100 10 150 6C200 2 250 10 300 6" stroke="url(#underline-grad)" strokeWidth="3" fill="none" strokeLinecap="round">
                                    <animate attributeName="d" dur="3s" repeatCount="indefinite"
                                        values="M0 6C50 2 100 10 150 6C200 2 250 10 300 6;M0 6C50 10 100 2 150 6C200 10 250 2 300 6;M0 6C50 2 100 10 150 6C200 2 250 10 300 6" />
                                </path>
                                <defs>
                                    <linearGradient id="underline-grad" x1="0" y1="0" x2="300" y2="0">
                                        <stop offset="0%" stopColor="#7c3aed" />
                                        <stop offset="50%" stopColor="#06b6d4" />
                                        <stop offset="100%" stopColor="#a855f7" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                        Videos That
                        <br />
                        <span className="hero__title-rotate">
                            <span>Captivate</span>
                            <span>Convert</span>
                            <span>Inspire</span>
                            <span>Elevate</span>
                        </span>
                        Your Brand
                    </h1>

                    <p className="hero__subtitle reveal">
                        Premium AI video production that transforms your brand narrative into stunning
                        visual experiences. No basic tools. No compromises. Only excellence.
                    </p>

                    <div className="hero__actions reveal">
                        <Link to="/showcase" className="btn-primary">
                            View Our Work
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M4 14L14 4M14 4H6M14 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                        <Link to="/pricing" className="btn-outline">
                            Explore Packages
                        </Link>
                    </div>

                    <div className="hero__stats reveal">
                        <div className="hero__stat">
                            <span className="hero__stat-number"><AnimatedCounter target={200} suffix="+" /></span>
                            <span className="hero__stat-label">Videos Delivered</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-number"><AnimatedCounter target={50} suffix="+" /></span>
                            <span className="hero__stat-label">Happy Brands</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-number"><AnimatedCounter target={98} suffix="%" /></span>
                            <span className="hero__stat-label">Satisfaction Rate</span>
                        </div>
                    </div>
                </div>

                <div className="hero__scroll-indicator">
                    <div className="hero__scroll-line" />
                    <span>Scroll to explore</span>
                </div>
            </section>

            {/* ===== WHY CHOOSE US ===== */}
            <section className="why section">
                <div className="container">
                    <div className="why__header">
                        <span className="section-label reveal">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z" fill="currentColor" />
                            </svg>
                            Why Choose Us
                        </span>
                        <h2 className="section-title reveal">
                            Not Just AI Videos.<br />
                            <span className="text-gradient">Premium AI Cinema.</span>
                        </h2>
                        <p className="section-subtitle reveal">
                            90% of AI videos use basic tools with limited quality. We use cutting-edge,
                            premium AI technology that delivers cinematic results.
                        </p>
                    </div>

                    <div className="why__grid stagger-children">
                        <div className="why__card why__card--featured">
                            <div className="why__card-icon">
                                <svg viewBox="0 0 48 48" fill="none">
                                    <circle cx="24" cy="24" r="20" stroke="url(#icon-grad-1)" strokeWidth="2" opacity="0.3" />
                                    <path d="M18 20L24 16L30 20V28L24 32L18 28V20Z" stroke="url(#icon-grad-1)" strokeWidth="2" strokeLinejoin="round" />
                                    <circle cx="24" cy="24" r="4" fill="url(#icon-grad-1)" />
                                    <defs><linearGradient id="icon-grad-1" x1="14" y1="14" x2="34" y2="34">
                                        <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#06b6d4" />
                                    </linearGradient></defs>
                                </svg>
                            </div>
                            <h3>Premium AI Tools</h3>
                            <p>We invest in the highest-quality AI platforms — not free tiers or basic trials. The difference shows in every frame.</p>
                            <div className="why__card-glow" />
                        </div>

                        <div className="why__card">
                            <div className="why__card-icon">
                                <svg viewBox="0 0 48 48" fill="none">
                                    <rect x="8" y="12" width="32" height="24" rx="4" stroke="url(#icon-grad-2)" strokeWidth="2" />
                                    <polygon points="20,18 32,24 20,30" fill="url(#icon-grad-2)" />
                                    <defs><linearGradient id="icon-grad-2" x1="8" y1="12" x2="40" y2="36">
                                        <stop stopColor="#a855f7" /><stop offset="1" stopColor="#06b6d4" />
                                    </linearGradient></defs>
                                </svg>
                            </div>
                            <h3>Cinematic Quality</h3>
                            <p>Ultra HD output with professional color grading, lighting, and composition that rivals traditional production.</p>
                        </div>

                        <div className="why__card">
                            <div className="why__card-icon">
                                <svg viewBox="0 0 48 48" fill="none">
                                    <path d="M24 8L28 18L38 20L30 28L32 38L24 34L16 38L18 28L10 20L20 18L24 8Z" stroke="url(#icon-grad-3)" strokeWidth="2" strokeLinejoin="round" />
                                    <defs><linearGradient id="icon-grad-3" x1="10" y1="8" x2="38" y2="38">
                                        <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#a855f7" />
                                    </linearGradient></defs>
                                </svg>
                            </div>
                            <h3>Brand Elevation</h3>
                            <p>Every video is crafted to position your brand at a premium level — not just another generic AI-generated clip.</p>
                        </div>

                        <div className="why__card">
                            <div className="why__card-icon">
                                <svg viewBox="0 0 48 48" fill="none">
                                    <circle cx="24" cy="24" r="16" stroke="url(#icon-grad-4)" strokeWidth="2" />
                                    <path d="M24 14V24L30 28" stroke="url(#icon-grad-4)" strokeWidth="2" strokeLinecap="round" />
                                    <defs><linearGradient id="icon-grad-4" x1="8" y1="8" x2="40" y2="40">
                                        <stop stopColor="#06b6d4" /><stop offset="1" stopColor="#7c3aed" />
                                    </linearGradient></defs>
                                </svg>
                            </div>
                            <h3>Fast Turnaround</h3>
                            <p>AI-accelerated workflows mean premium quality delivered faster than traditional video production.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== PROCESS SECTION ===== */}
            <section className="process section">
                <div className="process__bg-gradient" />
                <div className="container">
                    <div className="process__header">
                        <span className="section-label reveal">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z" fill="currentColor" />
                            </svg>
                            Our Process
                        </span>
                        <h2 className="section-title reveal">
                            From Concept to
                            <span className="text-gradient"> Cinematic Reality</span>
                        </h2>
                    </div>

                    <div className="process__timeline stagger-children">
                        <div className="process__step">
                            <div className="process__step-number">01</div>
                            <div className="process__step-line" />
                            <div className="process__step-content">
                                <h3>Discovery & Script</h3>
                                <p>We understand your brand, audience, and goals to craft the perfect narrative.</p>
                            </div>
                        </div>

                        <div className="process__step">
                            <div className="process__step-number">02</div>
                            <div className="process__step-line" />
                            <div className="process__step-content">
                                <h3>Character & Scene Design</h3>
                                <p>AI-generated characters and environments tailored to your brand identity.</p>
                            </div>
                        </div>

                        <div className="process__step">
                            <div className="process__step-number">03</div>
                            <div className="process__step-line" />
                            <div className="process__step-content">
                                <h3>AI Video Production</h3>
                                <p>Premium AI tools bring your vision to life with cinematic precision.</p>
                            </div>
                        </div>

                        <div className="process__step">
                            <div className="process__step-number">04</div>
                            <div className="process__step-line" />
                            <div className="process__step-content">
                                <h3>Delivery & Refinement</h3>
                                <p>Preview, feedback, and final delivery in your preferred format and ratio.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA SECTION ===== */}
            <section className="cta section">
                <div className="container">
                    <div className="cta__box reveal-scale">
                        <div className="cta__orb cta__orb--1" />
                        <div className="cta__orb cta__orb--2" />
                        <div className="cta__content">
                            <h2 className="cta__title">
                                Ready to Elevate Your Brand?
                            </h2>
                            <p className="cta__subtitle">
                                Let's create something extraordinary together. Premium AI videos starting at ₹1,199.
                            </p>
                            <div className="cta__actions">
                                <Link to="/pricing" className="btn-primary">
                                    View Packages
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                        <path d="M4 14L14 4M14 4H6M14 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                                <Link to="/contact" className="btn-outline">
                                    Get in Touch
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
