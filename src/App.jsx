import { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import './App.css';
import FluidBackground from './components/FluidBackground';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

/* ========================================
   SCROLL REVEAL HOOK
======================================== */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    el.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale,.stagger-children').forEach((c) => obs.observe(c));
    if (el.className.includes('reveal')) obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ========================================
   CUSTOM ICONS (SVG)
======================================== */
const IconZap = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>;
const IconChart = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
const IconGlobe = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>;
const IconPlay = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const IconCheck = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>;
const IconMail = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const IconClock = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;
const IconStar = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconVideo = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>;
const IconBox = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>;
const IconUsers = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;

/* ========================================
   GSAP MARQUEE COMPONENT
   ======================================== */
function Marquee() {
  const comp = useRef();
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(".marquee__inner", {
        xPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: ".marquee-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    }, comp);
    return () => ctx.revert();
  }, []);

  return (
    <section className="marquee-section" ref={comp}>
      <div className="marquee__inner">
        <div className="marquee__part">
          <span className="marquee__text">Premium</span>
          <span className="marquee__sep" />
          <span className="marquee__text marquee__text--filled">Cinematic</span>
          <span className="marquee__sep" />
          <span className="marquee__text">Ultra HD</span>
          <span className="marquee__sep" />
          <span className="marquee__text marquee__text--filled">Brand Elevation</span>
          <span className="marquee__sep" />
          <span className="marquee__text">AI Videos</span>
          <span className="marquee__sep" />
        </div>
        <div className="marquee__part" aria-hidden="true">
          <span className="marquee__text">Premium</span>
          <span className="marquee__sep" />
          <span className="marquee__text marquee__text--filled">Cinematic</span>
          <span className="marquee__sep" />
          <span className="marquee__text">Ultra HD</span>
          <span className="marquee__sep" />
          <span className="marquee__text marquee__text--filled">Brand Elevation</span>
          <span className="marquee__sep" />
          <span className="marquee__text">AI Videos</span>
          <span className="marquee__sep" />
        </div>
      </div>
    </section>
  );
}

/* ========================================
   CUSTOM CURSOR GLOW
======================================== */
function CursorGlow() {
  const glowRef = useRef(null);
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;
    let x = 0, y = 0, cx = 0, cy = 0;
    const onMove = (e) => { x = e.clientX; y = e.clientY; };
    const animate = () => {
      cx += (x - cx) * 0.08;
      cy += (y - cy) * 0.08;
      glow.style.transform = `translate(${cx - 200}px, ${cy - 200}px)`;
      requestAnimationFrame(animate);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    requestAnimationFrame(animate);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return <div ref={glowRef} className="cursor-glow" />;
}

/* ========================================
   PARTICLE CANVAS (Optimized)
======================================== */
function ParticleField({ count = 35 }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, particles = [];
    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;
    const resize = () => { canvas.width = w() * devicePixelRatio; canvas.height = h() * devicePixelRatio; ctx.scale(devicePixelRatio, devicePixelRatio); };
    const init = () => {
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w(), y: Math.random() * h(),
        r: Math.random() * 1.6 + 0.3, dx: (Math.random() - 0.5) * 0.15, dy: (Math.random() - 0.5) * 0.15,
        o: Math.random() * 0.35 + 0.08, phase: Math.random() * Math.PI * 2
      }));
    };
    const draw = () => {
      ctx.clearRect(0, 0, w(), h());
      const t = performance.now() * 0.001;
      particles.forEach((p) => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = w(); if (p.x > w()) p.x = 0;
        if (p.y < 0) p.y = h(); if (p.y > h()) p.y = 0;
        const o = p.o * (0.5 + 0.5 * Math.sin(t + p.phase));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,96,10,${o})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = dx * dx + dy * dy;
          if (d < 12000) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(232,96,10,${0.03 * (1 - d / 12000)})`; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    resize(); init(); draw();
    window.addEventListener('resize', () => { resize(); init(); });
    return () => cancelAnimationFrame(raf);
  }, [count]);
  return <canvas ref={canvasRef} className="particle-canvas" />;
}

/* ========================================
   ANIMATED COUNTER
======================================== */
function Counter({ target, suffix = '' }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0;
        const step = () => {
          start += Math.ceil(target / 60);
          if (start >= target) { setVal(target); return; }
          setVal(start); requestAnimationFrame(step);
        };
        step(); obs.disconnect();
      }
    }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ========================================
   NAVBAR
======================================== */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = ['hero', 'about', 'services', 'showcase', 'pricing', 'contact'];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3, rootMargin: '-10% 0px -40% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const links = [
    { id: 'hero', label: 'Home' }, { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' }, { id: 'showcase', label: 'Work' },
    { id: 'pricing', label: 'Pricing' }, { id: 'contact', label: 'Contact' },
  ];
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileOpen(false); };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <button className="nav__logo" onClick={() => scrollTo('hero')}>
          <svg viewBox="0 0 32 32" fill="none" width="32" height="32">
            <rect width="32" height="32" rx="8" fill="url(#lg)" />
            <path d="M8 16L12 8L16 16L20 8L24 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 22L16 14L24 22" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".5" />
            <defs><linearGradient id="lg" x1="0" y1="0" x2="32" y2="32"><stop stopColor="#e8600a" /><stop offset="1" stopColor="#ff9a3c" /></linearGradient></defs>
          </svg>
          <span className="nav__logo-text">MARS MEDIA</span>
        </button>

        <div className={`nav__links ${mobileOpen ? 'nav__links--open' : ''}`}>
          {links.map((l) => (
            <button key={l.id} className={`nav__link ${activeSection === l.id ? 'nav__link--active' : ''}`} onClick={() => scrollTo(l.id)}>{l.label}</button>
          ))}
        </div>

        <button className="nav__cta btn-primary btn-primary--sm" onClick={() => scrollTo('contact')}>Start Project</button>
        <button className="nav__burger" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu"><span /><span /><span /></button>
      </div>
    </nav>
  );
}

/* ========================================
   AMBIENT BLOB
======================================== */
function AmbientBlob({ color1 = '#e8600a', color2 = '#ff9a3c', size = 400, top, left, right, bottom, delay = 0 }) {
  return (
    <div className="ambient-blob" style={{
      background: `radial-gradient(circle, ${color1}22 0%, ${color2}11 50%, transparent 70%)`,
      width: size, height: size, top, left, right, bottom, animationDelay: `${delay}s`
    }} />
  );
}

/* ========================================
   FLOATING KEYWORDS
======================================== */
function FloatingKeywords() {
  const words = ['Neural Networks', 'Generative AI', 'Deep Learning', 'Diffusion', 'GPT', 'Stable Video', 'LoRA', 'ComfyUI'];
  return (
    <div className="floating-keywords" aria-hidden="true">
      {words.map((w, i) => (
        <span key={i} className="floating-keyword" style={{
          left: `${10 + (i * 11) % 80}%`, top: `${15 + (i * 17) % 70}%`,
          animationDelay: `${i * 0.7}s`, animationDuration: `${6 + i * 0.5}s`
        }}>{w}</span>
      ))}
    </div>
  );
}

/* ========================================
   CAROUSEL
======================================== */
function VideoCarousel() {
  const items = [
    { title: 'Luminous Skincare', cat: 'Product Animation', desc: 'Realistic 3D product animation with cinematic lighting.', grad: 'linear-gradient(160deg,#e8600a 0%,#f07c28 40%,#ff9a3c 100%)', dur: '30s', q: 'Ultra HD', img: '/images/skincare.svg' },
    { title: 'Spice Garden', cat: 'Food Animation', desc: 'Mouth-watering food visuals with steam effects.', grad: 'linear-gradient(160deg,#d4520a 0%,#e8600a 40%,#f07c28 100%)', dur: '30s', q: 'Ultra HD', img: '/images/food.svg' },
    { title: 'TechVault Launch', cat: 'Brand Story', desc: 'Epic product launch with voice-over narration.', grad: 'linear-gradient(160deg,#e8600a 0%,#ff9a3c 40%,#f07c28 100%)', dur: '60s', q: 'Ultra HD', img: '/images/tech.svg' },
    { title: 'FitLife UGC', cat: 'UGC Ads', desc: 'Authentic UGC-style fitness ad.', grad: 'linear-gradient(160deg,#f07c28 0%,#e8600a 40%,#d4520a 100%)', dur: '30s', q: 'Ultra HD', img: '/images/fitness.svg' },
    { title: 'Fashion Forward', cat: 'Social Ad', desc: 'Scroll-stopping fashion brand video.', grad: 'linear-gradient(160deg,#ff9a3c 0%,#e8600a 40%,#f07c28 100%)', dur: '15s', q: 'HD', img: '/images/fashion.svg' },
    { title: 'CryptoVault', cat: 'Explainer', desc: 'Two-character explainer visual.', grad: 'linear-gradient(160deg,#e8600a 0%,#d4520a 40%,#ff9a3c 100%)', dur: '30s', q: 'HD', img: '/images/character.svg' },
  ];
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);
  const total = items.length;

  const goTo = useCallback((idx) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActive(((idx % total) + total) % total);
    setTimeout(() => setIsTransitioning(false), 550);
  }, [isTransitioning, total]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  useEffect(() => { timerRef.current = setInterval(next, 4500); return () => clearInterval(timerRef.current); }, [next]);
  const resetTimer = () => { clearInterval(timerRef.current); timerRef.current = setInterval(next, 4500); };
  const handleNext = () => { next(); resetTimer(); };
  const handlePrev = () => { prev(); resetTimer(); };
  const handleDot = (i) => { goTo(i); resetTimer(); };

  const activeItem = items[active];

  return (
    <div className="carousel">
      <div className="carousel__glow" style={{ background: activeItem.grad, opacity: 0.12 }} />
      <div className="carousel__viewport">
        <div className="carousel__strip">
          {items.map((item, i) => {
            let pos = i - active;
            if (pos > total / 2) pos -= total;
            if (pos < -total / 2) pos += total;
            const isActive = pos === 0;
            const absPos = Math.abs(pos);
            return (
              <div key={i} className={`ccard ${isActive ? 'ccard--active' : ''}`}
                style={{
                  transform: `translateX(${pos * 240}px) translateZ(${-absPos * 180}px) rotateY(${pos * -20}deg)`,
                  zIndex: 10 - absPos, opacity: absPos > 2 ? 0 : isActive ? 1 : 0.6,
                  filter: isActive ? 'none' : `blur(${absPos * 1.5}px) brightness(0.9)`,
                }}
                onClick={() => !isActive && handleDot(i)}
              >
                <div className="ccard__frame" style={{ background: item.grad }}>
                  <img src={item.img} className="ccard__img" alt={item.title} loading="lazy" />
                  <div className="ccard__shimmer" />
                </div>
                <div className="ccard__label"><h4>{item.title}</h4></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="carousel__detail" key={active}>
        <p className="carousel__detail-desc">{activeItem.desc}</p>
        <div className="carousel__detail-tags"><span>{activeItem.cat}</span><span>{activeItem.dur}</span><span>{activeItem.q}</span></div>
      </div>
      <div className="carousel__nav">
        <button className="carousel__arrow" onClick={handlePrev} aria-label="Previous"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"><path d="M10 3L5 8L10 13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
        <div className="carousel__indicators">{items.map((_, i) => <button key={i} className={`carousel__ind ${i === active ? 'carousel__ind--on' : ''}`} onClick={() => handleDot(i)}>{i === active && <span className="carousel__ind-fill" />}</button>)}</div>
        <button className="carousel__arrow" onClick={handleNext} aria-label="Next"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor"><path d="M6 3L11 8L6 13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
      </div>
      <div className="carousel__counter"><span className="carousel__counter-cur">{String(active + 1).padStart(2, '0')}</span><span className="carousel__counter-sep">/</span><span className="carousel__counter-tot">{String(total).padStart(2, '0')}</span></div>
    </div>
  );
}

/* ========================================
   MAIN APP
======================================== */
export default function App() {
  const { heroRef, aboutRef, servicesRef, showcaseRef, pricingRef, contactRef } = {
    heroRef: useReveal(), aboutRef: useReveal(), servicesRef: useReveal(), showcaseRef: useReveal(), pricingRef: useReveal(), contactRef: useReveal()
  };
  const [activeTier, setActiveTier] = useState('standard');
  const [formData, setFormData] = useState({ name: '', email: '', brand: '', service: '', message: '' });
  const [expandTerms, setExpandTerms] = useState(false);

  const stdPkgs = [
    { type: 'Starter', price: '₹1,199', dur: '15 sec', features: ['Single character', 'Standard quality', 'Video link provided'], icon: <IconZap /> },
    { type: 'Growth', price: '₹1,899', dur: '30 sec', features: ['Single character', 'Standard quality', 'Video link provided'], icon: <IconChart /> },
    { type: 'Pro', price: '₹3,999', dur: '30 sec', features: ['2 characters', 'Conversation type', 'Video link provided'], popular: true, icon: <IconStar /> },
  ];
  const prmPkgs = [
    { type: '3D Product', price: '₹5,499', dur: '30 sec', features: ['Realistic 3D animation', 'Ultra HD quality', 'Video link provided'], icon: <IconBox /> },
    { type: 'Food/Rest.', price: '₹5,999', dur: '30 sec', features: ['Food visuals', 'Ultra HD quality', 'Video link provided'], icon: <IconVideo /> },
    { type: 'UGC Ads', price: '₹6,999', dur: '30 sec', features: ['Authentic UGC style', 'Prof. Voice-over', 'Video link provided'], popular: true, icon: <IconUsers /> },
    { type: 'Brand Story', price: '₹9,999', dur: '45 sec', features: ['Visual storytelling', 'Brand awareness', 'Video link provided'], icon: <IconGlobe /> },
    { type: 'Cinematic', price: '₹12,999', dur: '60 sec', features: ['Cinematic storytelling', 'No motion graphics', 'Video link provided'], icon: <IconPlay /> },
  ];

  const handleSubmit = (e) => { e.preventDefault(); alert('Thank you! We\'ll get back within 24 hours.'); };

  return (
    <>
      <CursorGlow />
      <Navbar />


      <section id="hero" className="hero" ref={heroRef}>
        <FluidBackground />
        <div className="hero__overlay" />
        <ParticleField />
        <div className="hero__orbs"><div className="hero__orb hero__orb--1" /><div className="hero__orb hero__orb--2" /><div className="hero__orb hero__orb--3" /></div>
        <div className="hero__grid" />
        <FloatingKeywords />
        <div className="container hero__content">
          <div className="hero__badge reveal"><span className="hero__badge-dot" />AI-Powered Video Production</div>
          <h1 className="hero__title reveal">
            We Create<span className="hero__title-accent"><span className="text-gradient"> Cinematic AI </span></span>Videos That<br />
            <span className="hero__rotate"><span>Captivate</span><span>Convert</span><span>Inspire</span><span>Elevate</span></span>{' '}Your Brand
          </h1>
          <p className="hero__sub reveal">Premium AI video production transforming brand narratives into stunning visual experiences. No basic tools. Only excellence.</p>
          <div className="hero__ctas reveal">
            <button className="btn-primary" onClick={() => document.getElementById('showcase')?.scrollIntoView({ behavior: 'smooth' })}>View Our Work</button>
            <button className="btn-outline" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>Explore Packages</button>
          </div>
          <div className="hero__stats reveal">
            <div className="hero__stat"><span className="hero__stat-num"><Counter target={200} suffix="+" /></span><span className="hero__stat-label">Videos Delivered</span></div>
            <div className="hero__stat-sep" />
            <div className="hero__stat"><span className="hero__stat-num"><Counter target={50} suffix="+" /></span><span className="hero__stat-label">Happy Brands</span></div>
            <div className="hero__stat-sep" />
            <div className="hero__stat"><span className="hero__stat-num"><Counter target={98} suffix="%" /></span><span className="hero__stat-label">Satisfaction</span></div>
          </div>
        </div>
        <div className="hero__scroll"><div className="hero__scroll-line" /><span>Scroll</span></div>
      </section>

      <section id="about" className="section" ref={aboutRef}>
        <AmbientBlob color1="#e8600a" color2="#f07c28" size={500} top="-10%" right="-8%" />
        <div className="container">
          <div className="about__header">
            <span className="section-label reveal">✦ Why Choose Us</span>
            <h2 className="section-title reveal">Not Just AI Videos.<br /><span className="text-gradient">Premium AI Cinema.</span></h2>
            <p className="section-subtitle reveal">We use cutting-edge, premium AI technology that delivers cinematic results your audience will remember.</p>
          </div>
          <div className="about__grid stagger-children">
            {[
              { icon: <IconZap />, title: 'Premium AI Tools', desc: 'We invest in the highest-quality AI platforms. The difference shows in every frame.' },
              { icon: <IconVideo />, title: 'Cinematic Quality', desc: 'Ultra HD output with professional color grading, lighting, and composition.' },
              { icon: <IconStar />, title: 'Brand Elevation', desc: 'Every video positions your brand at a premium level — never generic.' },
              { icon: <IconClock />, title: 'Fast Turnaround', desc: 'AI-accelerated workflows mean premium quality delivered faster.' },
            ].map((c, i) => (
              <div key={i} className={`about__card ${i === 0 ? 'about__card--featured' : ''}`}>
                <div className="about__card-icon">{c.icon}</div>
                <h3>{c.title}</h3><p>{c.desc}</p>
                {i === 0 && <div className="about__card-glow" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Marquee />

      <section id="services" className="section" ref={servicesRef}>
        <AmbientBlob color1="#f07c28" color2="#ff9a3c" size={450} top="15%" left="-6%" />
        <div className="container">
          <div className="services__header">
            <span className="section-label reveal">✦ Our Services</span>
            <h2 className="section-title reveal">Premium Video<br /><span className="text-gradient">Services & Solutions</span></h2>
          </div>
          <div className="services__grid stagger-children">
            {[
              { icon: <IconVideo />, title: 'Social Media Ads', desc: 'Eye-catching AI ads for Instagram, YouTube & TikTok.', color: '#e8600a' },
              { icon: <IconBox />, title: '3D Product Animation', desc: 'Realistic 3D product visuals in Ultra HD quality.', color: '#f07c28' },
              { icon: <IconCheck />, title: 'Food & Restaurant', desc: 'Mouth-watering food animations that drive orders.', color: '#ff9a3c' },
              { icon: <IconUsers />, title: 'UGC Video Ads', desc: 'Authentic UGC-style with professional voice-overs.', color: '#d4520a' },
              { icon: <IconGlobe />, title: 'Visual Storytelling', desc: 'Voice-over driven narratives for brand awareness.', color: '#e8600a' },
              { icon: <IconChart />, title: 'Conversation Videos', desc: 'Multi-character dialogue explainer content.', color: '#f07c28' },
            ].map((s, i) => (
              <div key={i} className="svc-card" style={{ '--svc-color': s.color }}>
                <div className="svc-card__emoji" style={{ color: s.color }}>{s.icon}</div>
                <h3>{s.title}</h3><p>{s.desc}</p>
                <button className="svc-card__link" onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}>View pricing →</button>
                <div className="svc-card__glow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="showcase" className="section" ref={showcaseRef}>
        <AmbientBlob color1="#e8600a" color2="#d4520a" size={500} top="20%" left="50%" />
        <div className="container showcase__header">
          <span className="section-label reveal">✦ Our Work</span>
          <h2 className="section-title reveal">Crafted with<br /><span className="text-gradient">Precision & Purpose</span></h2>
        </div>
        <VideoCarousel />
      </section>



      <section id="pricing" className="section" ref={pricingRef}>
        <AmbientBlob color1="#e8600a" color2="#f07c28" size={350} bottom="-5%" right="-6%" />
        <div className="container">
          <div className="pricing__header">
            <span className="section-label reveal">✦ Pricing</span>
            <h2 className="section-title reveal">Transparent Pricing,<br /><span className="text-gradient">Premium Results</span></h2>
          </div>
          <div className="pricing__toggle reveal">
            <button className={`pricing__toggle-btn ${activeTier === 'standard' ? 'pricing__toggle-btn--active' : ''}`} onClick={() => setActiveTier('standard')}>Standard</button>
            <button className={`pricing__toggle-btn ${activeTier === 'premium' ? 'pricing__toggle-btn--active' : ''}`} onClick={() => setActiveTier('premium')}>Premium</button>
          </div>
          <div className="pricing__cards" key={activeTier}>
            {(activeTier === 'standard' ? stdPkgs : prmPkgs).map((pkg) => (
              <div key={pkg.type} className={`price-card ${pkg.popular ? 'price-card--pop' : ''}`}>
                {pkg.popular && <div className="price-card__badge">Most Popular</div>}
                <div className="price-card__icon" style={{ color: 'var(--color-accent-1)' }}>{pkg.icon}</div>
                <span className="price-card__type">{pkg.type}</span>
                <div className="price-card__price"><span>{pkg.price}</span><small>starting</small></div>
                <span className="price-card__dur">{pkg.dur}</span>
                <div className="price-card__line" />
                <ul>
                  {pkg.features.map((f, i) => <li key={i}><span className="price-card__check"><IconCheck /></span>{f}</li>)}
                </ul>
                <button className={pkg.popular ? 'btn-primary' : 'btn-outline'} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} style={{ width: '100%', justifyContent: 'center' }}>Get Started</button>
              </div>
            ))}
          </div>
          <div className="pricing__note reveal"><strong>💡 Note:</strong> Packages customizable to your budget. Extra charges for text, animations, costume changes, and late-stage additions.</div>
        </div>
      </section>

      <section id="contact" className="section" ref={contactRef}>
        <AmbientBlob color1="#e8600a" color2="#d4520a" size={400} top="20%" right="-8%" />
        <div className="container">
          <div className="contact__header"><span className="section-label reveal">✦ Get in Touch</span><h2 className="section-title reveal">Let's Create Something<br /><span className="text-gradient">Extraordinary</span></h2></div>
          <div className="contact__grid">
            <form className="contact__form reveal" onSubmit={handleSubmit}>
              <div className="contact__form-row">
                <div className="contact__field"><label>Your Name</label><input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required /></div>
                <div className="contact__field"><label>Email</label><input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required /></div>
              </div>
              <div className="contact__form-row">
                <div className="contact__field"><label>Brand</label><input type="text" name="brand" placeholder="Your Brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} /></div>
                <div className="contact__field"><label>Service</label><select name="service" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} required>
                  <option value="">Select service</option><option>Social Media Ads</option><option>3D Product Animation</option><option>Food & Restaurant</option><option>UGC Video Ads</option><option>Visual Storytelling</option><option>Conversation Videos</option><option>Custom Package</option>
                </select></div>
              </div>
              <div className="contact__field"><label>Details</label><textarea name="message" rows="5" placeholder="Tell us about your project..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required /></div>
              <button type="submit" className="btn-primary">Send Inquiry →</button>
            </form>
            <div className="contact__info reveal-right">
              {[
                { icon: <IconMail />, title: 'Email Us', text: 'hello@marsmedia.ai' },
                { icon: <IconClock />, title: 'Response Time', text: 'Within 24 hours' },
                { icon: <IconGlobe />, title: 'Global Delivery', text: 'Clients worldwide' },
              ].map((c, i) => (
                <div key={i} className="contact__info-card"><div className="contact__info-icon">{c.icon}</div><div><h4>{c.title}</h4><p>{c.text}</p></div></div>
              ))}
            </div>
          </div>
          <div className="terms reveal">
            <button className="terms__toggle" onClick={() => setExpandTerms(!expandTerms)}><span>📋 Terms & Conditions</span><svg className={`terms__chev ${expandTerms ? 'terms__chev--open' : ''}`} width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor"><path d="M5 7L9 11L13 7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></button>
            <div className={`terms__body ${expandTerms ? 'terms__body--open' : ''}`}><ol><li>We do not create demo videos for trial purposes.</li><li>After the script is locked and video work is completed, any revisions will incur additional charges.</li><li>Work will begin only after advance payment. The advance is non-refundable.</li><li>Videos can be created in any ratio: Horizontal, Vertical, Square.</li><li>Additional charges apply for extra text, graphic animations, and costume changes.</li><li>After sending character and frame images for confirmation, work begins only after your approval.</li><li>Once completed, costume, properties, character style cannot be changed.</li><li>Modifying one character's appearance after completion requires the entire video to be recreated.</li><li>Additional work requested at final stages may incur extra charges.</li><li>A preview file will be provided. Final output delivered only after full payment.</li><li>AI videos have limitations in perfect realism. We deliver at the highest possible perfection level.</li><li>Charges may vary depending on rework extent.</li></ol></div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer__glow" />
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand">
              <button className="nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <svg viewBox="0 0 32 32" fill="none" width="34" height="34">
                  <rect width="32" height="32" rx="8" fill="url(#flg)" />
                  <path d="M8 16L12 8L16 16L20 8L24 16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 22L16 14L24 22" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity=".5" />
                  <defs><linearGradient id="flg" x1="0" y1="0" x2="32" y2="32"><stop stopColor="#e8600a" /><stop offset="1" stopColor="#ff9a3c" /></linearGradient></defs>
                </svg>
                <span className="nav__logo-text">MARS MEDIA</span>
              </button>
              <p>Crafting premium AI videos that elevate brands to extraordinary levels.</p>
            </div>
            <div className="footer__cols">
              <div className="footer__col"><h4>Navigate</h4>{['hero', 'about', 'services', 'showcase', 'pricing', 'contact'].map((id) => <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}>{id.charAt(0).toUpperCase() + id.slice(1)}</button>)}</div>
              <div className="footer__col"><h4>Services</h4><span>AI Video Ads</span><span>Product Animation</span><span>Brand Stories</span><span>UGC Content</span></div>
              <div className="footer__col"><h4>Connect</h4><a href="mailto:hello@marsmedia.ai">hello@marsmedia.ai</a><span>Instagram</span><span>YouTube</span><span>LinkedIn</span></div>
            </div>
          </div>
          <div className="footer__divider" />
          <div className="footer__bottom"><p>© {new Date().getFullYear()} MARS MEDIA. All rights reserved.</p></div>
        </div>
      </footer>
    </>
  );
}