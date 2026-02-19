import { Link } from 'react-router-dom';
import './Footer.css';
import marsLogo from '../assets/mars-media-logo.png';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer__glow" />
            <div className="container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <Link to="/" className="footer__logo">
                            <img src={marsLogo} alt="Mars Media" className="footer__logo-img" />
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
                            <a href="mailto:shahul5511@gmail.com">shahul5511@gmail.com</a>
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
