import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Pricing.css';

const standardPackages = [
    {
        type: 'Type 1',
        price: '₹1,199',
        duration: '15 seconds',
        features: ['Single character', 'Standard social media quality', 'Script not included', 'Video link provided'],
        highlight: false,
    },
    {
        type: 'Type 2',
        price: '₹1,899',
        duration: '30 seconds',
        features: ['Single character', 'Standard social media quality', 'Motion graphics not included', 'Script not included', 'Video link provided'],
        highlight: false,
    },
    {
        type: 'Type 3',
        price: '₹3,999',
        duration: '30 seconds',
        features: ['Conversation type', '2 characters', 'Standard social media quality', 'Single scene', 'Video link provided'],
        highlight: true,
    },
];

const premiumPackages = [
    {
        type: 'Type 5',
        price: '₹5,499',
        duration: '30 seconds',
        features: ['Realistic 3D product animation', 'Ultra HD quality', 'Video link provided'],
        highlight: false,
    },
    {
        type: 'Type 6',
        price: '₹5,999',
        duration: '30 seconds',
        features: ['Food & restaurant animation', 'Ultra HD quality', 'Video link provided'],
        highlight: false,
    },
    {
        type: 'Type 7',
        price: '₹6,999',
        duration: '30 seconds',
        features: ['UGC ads', 'Ultra HD quality', 'Professional voice-over', 'Video link provided'],
        highlight: true,
    },
    {
        type: 'Type 8',
        price: '₹9,999',
        duration: '45 seconds',
        features: ['Voice-over + Visual storytelling', 'Best for brand awareness', 'Video link provided'],
        highlight: false,
    },
    {
        type: 'Type 9',
        price: '₹12,999',
        duration: '60 seconds',
        features: ['Voice-over + Visual storytelling', 'Best for brand awareness', 'No motion graphics included', 'Video link provided'],
        highlight: false,
    },
];

export default function Pricing() {
    const sectionRef = useScrollReveal();
    const [activeTier, setActiveTier] = useState('standard');

    return (
        <div className="pricing-page" ref={sectionRef}>
            {/* Hero */}
            <section className="pricing-hero section">
                <div className="pricing-hero__glow" />
                <div className="container">
                    <span className="section-label reveal">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z" fill="currentColor" />
                        </svg>
                        Pricing
                    </span>
                    <h1 className="section-title reveal" style={{ maxWidth: '700px' }}>
                        Transparent Pricing,<br />
                        <span className="text-gradient">Premium Results</span>
                    </h1>
                    <p className="section-subtitle reveal">
                        Starting prices for each video type. Prices may vary based on your brand,
                        script, and custom requirements. All packages are customizable.
                    </p>
                </div>
            </section>

            {/* Tier Toggle */}
            <section className="pricing-content section">
                <div className="container">
                    <div className="pricing-toggle reveal">
                        <button
                            className={`pricing-toggle__btn ${activeTier === 'standard' ? 'pricing-toggle__btn--active' : ''}`}
                            onClick={() => setActiveTier('standard')}
                        >
                            <span className="pricing-toggle__icon">🔹</span>
                            Standard Quality
                        </button>
                        <button
                            className={`pricing-toggle__btn ${activeTier === 'premium' ? 'pricing-toggle__btn--active' : ''}`}
                            onClick={() => setActiveTier('premium')}
                        >
                            <span className="pricing-toggle__icon">💎</span>
                            Premium Quality
                        </button>
                    </div>

                    {/* Pricing Cards */}
                    <div className="pricing-cards stagger-children" key={activeTier}>
                        {(activeTier === 'standard' ? standardPackages : premiumPackages).map(
                            (pkg, index) => (
                                <div
                                    key={pkg.type}
                                    className={`pricing-card ${pkg.highlight ? 'pricing-card--highlight' : ''}`}
                                >
                                    {pkg.highlight && (
                                        <div className="pricing-card__badge">Most Popular</div>
                                    )}
                                    <div className="pricing-card__header">
                                        <span className="pricing-card__type">{pkg.type}</span>
                                        <div className="pricing-card__price">
                                            <span className="pricing-card__amount">{pkg.price}</span>
                                            <span className="pricing-card__period">starting</span>
                                        </div>
                                        <span className="pricing-card__duration">{pkg.duration}</span>
                                    </div>

                                    <div className="pricing-card__divider" />

                                    <ul className="pricing-card__features">
                                        {pkg.features.map((f, i) => (
                                            <li key={i}>
                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                                    <path d="M4 8L7 11L12 5" stroke={pkg.highlight ? '#7c3aed' : '#06b6d4'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                                {f}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        to="/contact"
                                        className={pkg.highlight ? 'btn-primary' : 'btn-outline'}
                                        style={{ width: '100%', justifyContent: 'center' }}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )
                        )}
                    </div>

                    {/* Note */}
                    <div className="pricing-note reveal">
                        <div className="pricing-note__icon">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M10 6V10M10 14H10.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            </svg>
                        </div>
                        <p>
                            <strong>Packages can be customized</strong> according to your budget.
                            Additional charges may apply for extra text, graphic animations, costume changes,
                            and any work not previously communicated. Contact us for a personalized quote.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="pricing-cta section">
                <div className="container">
                    <div className="pricing-cta__box reveal-scale">
                        <h2>Can't Find What You Need?</h2>
                        <p>We offer fully customizable packages. Let's discuss your unique requirements.</p>
                        <Link to="/contact" className="btn-primary">
                            Contact Us
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M4 14L14 4M14 4H6M14 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
