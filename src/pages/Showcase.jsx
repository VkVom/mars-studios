import { useState, useRef, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Showcase.css';

const showcaseItems = [
    {
        id: 1,
        title: 'Luminous Skincare',
        category: 'Product Animation',
        description: 'Realistic 3D product animation showcasing premium skincare line with cinematic lighting and ultra-smooth transitions.',
        color: '#a855f7',
        gradient: 'linear-gradient(135deg, #7c3aed, #c084fc)',
        duration: '30 sec',
        quality: 'Ultra HD',
    },
    {
        id: 2,
        title: 'Spice Garden Restaurant',
        category: 'Food Animation',
        description: 'Mouth-watering food visuals with steam effects and appetizing close-ups that drive hungry customers to order.',
        color: '#f59e0b',
        gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        duration: '30 sec',
        quality: 'Ultra HD',
    },
    {
        id: 3,
        title: 'TechVault Product Launch',
        category: 'Brand Story',
        description: 'Epic product launch video with voice-over narration, visual storytelling, and brand-building cinematic sequences.',
        color: '#06b6d4',
        gradient: 'linear-gradient(135deg, #06b6d4, #7c3aed)',
        duration: '60 sec',
        quality: 'Ultra HD',
    },
    {
        id: 4,
        title: 'FitLife UGC Campaign',
        category: 'UGC Ads',
        description: 'Authentic UGC-style fitness ad with professional AI voice-over that feels genuine and drives massive engagement.',
        color: '#22c55e',
        gradient: 'linear-gradient(135deg, #22c55e, #06b6d4)',
        duration: '30 sec',
        quality: 'Ultra HD',
    },
    {
        id: 5,
        title: 'Fashion Forward',
        category: 'Social Media Ad',
        description: 'Scroll-stopping fashion brand video for Instagram Reels with dynamic transitions and trending visual effects.',
        color: '#ec4899',
        gradient: 'linear-gradient(135deg, #ec4899, #a855f7)',
        duration: '15 sec',
        quality: 'HD',
    },
    {
        id: 6,
        title: 'CryptoVault Explainer',
        category: 'Conversation Video',
        description: 'Two-character explainer-style video breaking down complex crypto concepts into simple, engaging dialogue.',
        color: '#8b5cf6',
        gradient: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
        duration: '30 sec',
        quality: 'HD',
    },
];

export default function Showcase() {
    const sectionRef = useScrollReveal();
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    // Auto-play carousel
    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % showcaseItems.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    // Scroll to active item
    useEffect(() => {
        if (!carouselRef.current) return;
        const card = carouselRef.current.children[activeIndex];
        if (card) {
            const containerWidth = carouselRef.current.offsetWidth;
            const cardLeft = card.offsetLeft;
            const cardWidth = card.offsetWidth;
            const scrollTo = cardLeft - containerWidth / 2 + cardWidth / 2;
            carouselRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    }, [activeIndex]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setIsAutoPlaying(false);
        setStartX(e.pageX - carouselRef.current.offsetLeft);
        setScrollLeft(carouselRef.current.scrollLeft);
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const x = e.pageX - carouselRef.current.offsetLeft;
        const walk = (x - startX) * 1.5;
        carouselRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const goTo = (index) => {
        setActiveIndex(index);
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), 5000);
    };

    const goNext = () => goTo((activeIndex + 1) % showcaseItems.length);
    const goPrev = () => goTo((activeIndex - 1 + showcaseItems.length) % showcaseItems.length);

    return (
        <div className="showcase-page" ref={sectionRef}>
            {/* Hero */}
            <section className="showcase-hero section">
                <div className="showcase-hero__glow" />
                <div className="container">
                    <span className="section-label reveal">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z" fill="currentColor" />
                        </svg>
                        Our Work
                    </span>
                    <h1 className="section-title reveal" style={{ maxWidth: '700px' }}>
                        Crafted with <span className="text-gradient">Precision & Purpose</span>
                    </h1>
                    <p className="section-subtitle reveal">
                        Every video we create tells a story. Explore our portfolio of premium AI-generated
                        videos that have elevated brands across industries.
                    </p>
                </div>
            </section>

            {/* Carousel Section */}
            <section className="carousel-section section">
                <div className="carousel-section__bg-line" />

                <div className="carousel-wrapper">
                    <div
                        className={`carousel ${isDragging ? 'carousel--dragging' : ''}`}
                        ref={carouselRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {showcaseItems.map((item, index) => (
                            <div
                                key={item.id}
                                className={`carousel__card ${index === activeIndex ? 'carousel__card--active' : ''}`}
                                onClick={() => goTo(index)}
                                style={{ '--accent': item.color }}
                            >
                                <div className="carousel__card-visual">
                                    <div className="carousel__card-bg" style={{ background: item.gradient }} />
                                    <div className="carousel__card-play">
                                        <svg viewBox="0 0 48 48" fill="none">
                                            <circle cx="24" cy="24" r="22" stroke="white" strokeWidth="2" opacity="0.3" />
                                            <polygon points="20,16 34,24 20,32" fill="white" />
                                        </svg>
                                    </div>
                                    <div className="carousel__card-badge">{item.category}</div>
                                    <div className="carousel__card-meta">
                                        <span>{item.duration}</span>
                                        <span className="carousel__card-dot" />
                                        <span>{item.quality}</span>
                                    </div>
                                </div>
                                <div className="carousel__card-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Carousel Controls */}
                    <div className="carousel-controls">
                        <button className="carousel-controls__btn" onClick={goPrev} aria-label="Previous">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className="carousel-controls__dots">
                            {showcaseItems.map((_, i) => (
                                <button
                                    key={i}
                                    className={`carousel-controls__dot ${i === activeIndex ? 'carousel-controls__dot--active' : ''}`}
                                    onClick={() => goTo(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>

                        <button className="carousel-controls__btn" onClick={goNext} aria-label="Next">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>

                    {/* Progress bar */}
                    <div className="carousel-progress">
                        <div
                            className="carousel-progress__fill"
                            style={{
                                width: `${((activeIndex + 1) / showcaseItems.length) * 100}%`,
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Featured Project Detail */}
            <section className="featured section">
                <div className="container">
                    <div className="featured__content reveal">
                        <div className="featured__visual">
                            <div
                                className="featured__visual-bg"
                                style={{ background: showcaseItems[activeIndex].gradient }}
                            />
                            <div className="featured__visual-overlay">
                                <div className="featured__visual-number">
                                    {String(activeIndex + 1).padStart(2, '0')}
                                </div>
                                <h3>{showcaseItems[activeIndex].title}</h3>
                                <span className="featured__visual-cat">
                                    {showcaseItems[activeIndex].category}
                                </span>
                            </div>
                        </div>

                        <div className="featured__details">
                            <h2 className="featured__title">
                                {showcaseItems[activeIndex].title}
                            </h2>
                            <p className="featured__desc">
                                {showcaseItems[activeIndex].description}
                            </p>
                            <div className="featured__specs">
                                <div className="featured__spec">
                                    <span className="featured__spec-label">Duration</span>
                                    <span className="featured__spec-value">{showcaseItems[activeIndex].duration}</span>
                                </div>
                                <div className="featured__spec">
                                    <span className="featured__spec-label">Quality</span>
                                    <span className="featured__spec-value">{showcaseItems[activeIndex].quality}</span>
                                </div>
                                <div className="featured__spec">
                                    <span className="featured__spec-label">Category</span>
                                    <span className="featured__spec-value">{showcaseItems[activeIndex].category}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Infinite Marquee */}
            <section className="marquee-section">
                <div className="marquee">
                    <div className="marquee__track">
                        {[...Array(3)].map((_, batchIdx) => (
                            <div key={batchIdx} className="marquee__group">
                                {['AI VIDEOS', '✦', 'PREMIUM QUALITY', '✦', 'BRAND ELEVATION', '✦', 'CINEMATIC', '✦', 'ULTRA HD', '✦'].map(
                                    (text, i) => (
                                        <span key={i} className="marquee__item">
                                            {text}
                                        </span>
                                    )
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
