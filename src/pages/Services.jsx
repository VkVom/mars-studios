import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Services.css';

const services = [
    {
        id: 'social-ads',
        icon: (
            <svg viewBox="0 0 56 56" fill="none">
                <rect x="4" y="8" width="48" height="36" rx="6" stroke="url(#svc1)" strokeWidth="2" />
                <polygon points="22,18 36,26 22,34" fill="url(#svc1)" />
                <circle cx="44" cy="12" r="6" fill="#7c3aed" opacity="0.3" />
                <defs><linearGradient id="svc1" x1="4" y1="8" x2="52" y2="44">
                    <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#06b6d4" />
                </linearGradient></defs>
            </svg>
        ),
        title: 'Social Media Ads',
        description: 'Eye-catching AI video ads optimized for Instagram, YouTube, and TikTok. Single character with standard social media quality that stops the scroll.',
        features: ['15-30 sec formats', 'Platform optimized', 'Scroll-stopping visuals'],
        color: '#7c3aed',
    },
    {
        id: 'product-animation',
        icon: (
            <svg viewBox="0 0 56 56" fill="none">
                <path d="M28 4L48 16V40L28 52L8 40V16L28 4Z" stroke="url(#svc2)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M28 20L38 26V38L28 44L18 38V26L28 20Z" fill="url(#svc2)" opacity="0.2" />
                <circle cx="28" cy="32" r="5" fill="url(#svc2)" />
                <defs><linearGradient id="svc2" x1="8" y1="4" x2="48" y2="52">
                    <stop stopColor="#a855f7" /><stop offset="1" stopColor="#06b6d4" />
                </linearGradient></defs>
            </svg>
        ),
        title: '3D Product Animation',
        description: 'Realistic 3D product animations in Ultra HD quality. Perfect for e-commerce, product launches, and brand showcases that demand visual excellence.',
        features: ['Ultra HD quality', 'Realistic 3D rendering', '360° product views'],
        color: '#a855f7',
    },
    {
        id: 'food-animation',
        icon: (
            <svg viewBox="0 0 56 56" fill="none">
                <circle cx="28" cy="32" r="18" stroke="url(#svc3)" strokeWidth="2" />
                <ellipse cx="28" cy="28" rx="12" ry="8" stroke="url(#svc3)" strokeWidth="1.5" opacity="0.5" />
                <path d="M20 16C22 12 26 10 28 10C30 10 34 12 36 16" stroke="url(#svc3)" strokeWidth="2" strokeLinecap="round" />
                <defs><linearGradient id="svc3" x1="10" y1="10" x2="46" y2="50">
                    <stop stopColor="#f59e0b" /><stop offset="1" stopColor="#ef4444" />
                </linearGradient></defs>
            </svg>
        ),
        title: 'Food & Restaurant',
        description: 'Mouth-watering food animations designed for restaurants and food brands. Ultra HD quality that makes your dishes look irresistible.',
        features: ['Ultra HD quality', 'Appetizing visuals', 'Menu integration ready'],
        color: '#f59e0b',
    },
    {
        id: 'ugc-ads',
        icon: (
            <svg viewBox="0 0 56 56" fill="none">
                <rect x="14" y="6" width="28" height="44" rx="6" stroke="url(#svc4)" strokeWidth="2" />
                <circle cx="28" cy="22" r="8" stroke="url(#svc4)" strokeWidth="1.5" />
                <path d="M18 40C18 34 22 30 28 30C34 30 38 34 38 40" stroke="url(#svc4)" strokeWidth="1.5" />
                <circle cx="28" cy="47" r="2" fill="url(#svc4)" />
                <defs><linearGradient id="svc4" x1="14" y1="6" x2="42" y2="50">
                    <stop stopColor="#06b6d4" /><stop offset="1" stopColor="#7c3aed" />
                </linearGradient></defs>
            </svg>
        ),
        title: 'UGC Video Ads',
        description: 'User-generated content style AI ads with professional voice-overs. Ultra HD quality that feels authentic and drives conversions.',
        features: ['Professional voice-over', 'Authentic UGC style', 'Conversion optimized'],
        color: '#06b6d4',
    },
    {
        id: 'brand-stories',
        icon: (
            <svg viewBox="0 0 56 56" fill="none">
                <path d="M8 12H24V44H8C8 44 8 12 8 12Z" stroke="url(#svc5)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M24 12H40C44 12 48 16 48 20V44H24V12Z" stroke="url(#svc5)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M14 22H18M14 28H18M14 34H18" stroke="url(#svc5)" strokeWidth="1.5" strokeLinecap="round" />
                <polygon points="32,22 40,28 32,34" fill="url(#svc5)" opacity="0.4" />
                <defs><linearGradient id="svc5" x1="8" y1="12" x2="48" y2="44">
                    <stop stopColor="#ec4899" /><stop offset="1" stopColor="#7c3aed" />
                </linearGradient></defs>
            </svg>
        ),
        title: 'Visual Storytelling',
        description: 'Voice-over driven visual narratives that build deep brand awareness. 45-60 second cinematic experiences that captivate audiences.',
        features: ['Voice-over included', 'Brand awareness focus', 'Cinematic narrative'],
        color: '#ec4899',
    },
    {
        id: 'conversation',
        icon: (
            <svg viewBox="0 0 56 56" fill="none">
                <path d="M8 14C8 10.7 10.7 8 14 8H34C37.3 8 40 10.7 40 14V26C40 29.3 37.3 32 34 32H20L12 38V32H14C10.7 32 8 29.3 8 26V14Z" stroke="url(#svc6)" strokeWidth="2" />
                <path d="M16 24C16 20.7 18.7 18 22 18H42C45.3 18 48 20.7 48 24V36C48 39.3 45.3 42 42 42H44V48L36 42H22C18.7 42 16 39.3 16 36V24Z" stroke="url(#svc6)" strokeWidth="2" opacity="0.5" />
                <defs><linearGradient id="svc6" x1="8" y1="8" x2="48" y2="48">
                    <stop stopColor="#7c3aed" /><stop offset="1" stopColor="#a855f7" />
                </linearGradient></defs>
            </svg>
        ),
        title: 'Conversation Videos',
        description: 'Multi-character conversation style AI videos. Two characters interacting naturally in a single scene — perfect for explainer content.',
        features: ['2 characters', 'Natural dialogue', 'Explainer format'],
        color: '#8b5cf6',
    },
];

export default function Services() {
    const sectionRef = useScrollReveal();

    return (
        <div className="services-page" ref={sectionRef}>
            {/* Hero */}
            <section className="services-hero section">
                <div className="services-hero__glow" />
                <div className="container">
                    <span className="section-label reveal">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z" fill="currentColor" />
                        </svg>
                        Our Services
                    </span>
                    <h1 className="section-title reveal" style={{ maxWidth: '700px' }}>
                        Premium AI Video<br />
                        <span className="text-gradient">Services & Solutions</span>
                    </h1>
                    <p className="section-subtitle reveal">
                        We don't just make AI videos — we craft premium visual experiences
                        using the most advanced AI tools available. Each video is a masterpiece.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="services-grid section">
                <div className="container">
                    <div className="services-grid__items stagger-children">
                        {services.map((service) => (
                            <div key={service.id} className="service-card" style={{ '--card-accent': service.color }}>
                                <div className="service-card__glow" />
                                <div className="service-card__icon">{service.icon}</div>
                                <h3 className="service-card__title">{service.title}</h3>
                                <p className="service-card__desc">{service.description}</p>
                                <ul className="service-card__features">
                                    {service.features.map((f, i) => (
                                        <li key={i}>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                                <path d="M3 7L6 10L11 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/pricing" className="service-card__link">
                                    View Pricing
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quality Comparison */}
            <section className="quality section">
                <div className="container">
                    <div className="quality__header">
                        <span className="section-label reveal">
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z" fill="currentColor" />
                            </svg>
                            Quality Matters
                        </span>
                        <h2 className="section-title reveal">
                            The Difference is<br />
                            <span className="text-gradient">Crystal Clear</span>
                        </h2>
                    </div>

                    <div className="quality__comparison reveal-scale">
                        <div className="quality__side quality__side--basic">
                            <div className="quality__side-label">Basic AI Videos</div>
                            <ul>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 3L11 11M11 3L3 11" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    Free / basic AI tools
                                </li>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 3L11 11M11 3L3 11" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    Low resolution output
                                </li>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 3L11 11M11 3L3 11" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    Generic, templated look
                                </li>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 3L11 11M11 3L3 11" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    No brand customization
                                </li>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 3L11 11M11 3L3 11" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />
                                    </svg>
                                    Won't elevate your brand
                                </li>
                            </ul>
                        </div>

                        <div className="quality__vs">VS</div>

                        <div className="quality__side quality__side--premium">
                            <div className="quality__side-label">Our Premium Videos</div>
                            <ul>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 7L6 10L11 4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Premium, high-paying AI tools
                                </li>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 7L6 10L11 4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Ultra HD output quality
                                </li>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 7L6 10L11 4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Custom, cinematic design
                                </li>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 7L6 10L11 4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Tailored to your brand
                                </li>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M3 7L6 10L11 4" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    Guaranteed quality & conversion
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Formats */}
            <section className="formats section">
                <div className="container">
                    <h2 className="section-title reveal" style={{ textAlign: 'center' }}>
                        Any Format,<span className="text-gradient"> Any Ratio</span>
                    </h2>
                    <div className="formats__grid stagger-children">
                        <div className="format-card">
                            <div className="format-card__preview format-card__preview--landscape">
                                <span>16:9</span>
                            </div>
                            <h4>Horizontal</h4>
                            <p>YouTube, Website, TV</p>
                        </div>
                        <div className="format-card">
                            <div className="format-card__preview format-card__preview--portrait">
                                <span>9:16</span>
                            </div>
                            <h4>Vertical</h4>
                            <p>Reels, Shorts, Stories</p>
                        </div>
                        <div className="format-card">
                            <div className="format-card__preview format-card__preview--square">
                                <span>1:1</span>
                            </div>
                            <h4>Square</h4>
                            <p>Instagram, Facebook</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
