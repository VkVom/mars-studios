import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__glow" />
            <div className="container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" width="36" height="36">
                                <rect width="32" height="32" rx="8" fill="url(#footer-logo-grad)" />
                                <path d="M8 16L12 8L16 16L20 8L24 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M8 22L16 14L24 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
                                <defs>
                                    <linearGradient id="footer-logo-grad" x1="0" y1="0" x2="32" y2="32">
                                        <stop stopColor="#7c3aed" />
                                        <stop offset="1" stopColor="#06b6d4" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span>MARS MEDIA</span>
                        </Link>
                        <p className="footer__tagline">
                            Crafting premium AI-powered videos that elevate brands to extraordinary levels.
                        </p>
                    </div>

                    <div className="footer__columns">
                        <div className="footer__col">
                            <h4>Navigate</h4>
                            <Link to="/">Home</Link>
                            <Link to="/services">Services</Link>
                            <Link to="/showcase">Showcase</Link>
                            <Link to="/pricing">Pricing</Link>
                            <Link to="/contact">Contact</Link>
                        </div>
                        <div className="footer__col">
                            <h4>Services</h4>
                            <Link to="/services">AI Video Ads</Link>
                            <Link to="/services">Product Animation</Link>
                            <Link to="/services">Brand Stories</Link>
                            <Link to="/services">UGC Content</Link>
                        </div>
                        <div className="footer__col">
                            <h4>Connect</h4>
                            <a href="mailto:hello@intellex.ai">hello@intellex.ai</a>
                            <a href="#">Instagram</a>
                            <a href="#">YouTube</a>
                            <a href="#">LinkedIn</a>
                        </div>
                    </div>
                </div>

                <div className="footer__divider" />

                <div className="footer__bottom">
                    <p>&copy; {new Date().getFullYear()} MARS MEDIA. All rights reserved.</p>
                    <div className="footer__bottom-links">
                        <Link to="/contact">Terms & Conditions</Link>
                        <Link to="/contact">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
