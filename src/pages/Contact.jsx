import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Contact.css';

const termsData = [
    'We do not create demo videos for trial purposes.',
    'After the script is locked and video work is completed, any revisions will incur additional charges.',
    'Work will begin only after advance payment is made. The advance payment is non-refundable.',
    'Videos can be created in any ratio: Horizontal, Vertical, Square.',
    'Additional charges apply for extra text, extra graphic animations, and costume changes.',
    'After sending character and frame images for confirmation, work will begin only after your approval.',
    'Once work is completed, costume, properties, character style, etc., cannot be changed.',
    'Modifying only one character\'s appearance or object after completion requires the entire video to be recreated.',
    'If additional work is requested at the final stages that was not communicated earlier, extra charges may apply.',
    'After video completion, a preview file will be provided. Final output delivered only after full payment.',
    'AI videos have limitations in achieving perfect real-life realism. We deliver at the highest possible level of perfection.',
    'Charges may vary depending on the extent of rework required.',
];

export default function Contact() {
    const sectionRef = useScrollReveal();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        brand: '',
        service: '',
        budget: '',
        message: '',
    });
    const [expandedTerms, setExpandedTerms] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construct email subject and body
        const subject = encodeURIComponent(`New Inquiry from ${formData.name} - ${formData.brand || 'No Brand'}`);
        const body = encodeURIComponent(`Name: ${formData.name}
Email: ${formData.email}
Brand: ${formData.brand || 'N/A'}
Service Interested In: ${formData.service}
Budget: ${formData.budget || 'N/A'}

Project Details:
${formData.message}`);

        // Open default email client
        window.location.href = `mailto:shahul5511@gmail.com?subject=${subject}&body=${body}`;

        // Optional: clear form or show success message after a tiny delay
        setTimeout(() => {
            alert('Opening your email client to send the inquiry!');
            setFormData({ name: '', email: '', brand: '', service: '', budget: '', message: '' });
        }, 500);
    };

    return (
        <div className="contact-page" ref={sectionRef}>
            {/* Hero */}
            <section className="contact-hero section">
                <div className="contact-hero__glow" />
                <div className="container">
                    <span className="section-label reveal">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M7 1L8.5 5.5L13 7L8.5 8.5L7 13L5.5 8.5L1 7L5.5 5.5L7 1Z" fill="currentColor" />
                        </svg>
                        Get in Touch
                    </span>
                    <h1 className="section-title reveal" style={{ maxWidth: '650px' }}>
                        Let's Create Something<br />
                        <span className="text-gradient">Extraordinary</span>
                    </h1>
                    <p className="section-subtitle reveal">
                        Ready to elevate your brand with premium AI videos?
                        Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                </div>
            </section>

            {/* Contact Grid */}
            <section className="contact-content section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Form */}
                        <form className="contact-form reveal" onSubmit={handleSubmit}>
                            <div className="contact-form__row">
                                <div className="contact-form__field">
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="contact-form__field">
                                    <label htmlFor="email">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="contact-form__row">
                                <div className="contact-form__field">
                                    <label htmlFor="brand">Brand Name</label>
                                    <input
                                        type="text"
                                        id="brand"
                                        name="brand"
                                        placeholder="Your Brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="contact-form__field">
                                    <label htmlFor="service">Service Interested In</label>
                                    <select
                                        id="service"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Select a service</option>
                                        <option value="social-ads">Social Media Ads</option>
                                        <option value="product-animation">3D Product Animation</option>
                                        <option value="food-animation">Food & Restaurant</option>
                                        <option value="ugc-ads">UGC Video Ads</option>
                                        <option value="brand-stories">Visual Storytelling</option>
                                        <option value="conversation">Conversation Videos</option>
                                        <option value="custom">Custom Package</option>
                                    </select>
                                </div>
                            </div>

                            <div className="contact-form__field">
                                <label htmlFor="budget">Budget Range</label>
                                <select
                                    id="budget"
                                    name="budget"
                                    value={formData.budget}
                                    onChange={handleChange}
                                >
                                    <option value="">Select budget range</option>
                                    <option value="1k-3k">₹1,000 - ₹3,000</option>
                                    <option value="3k-6k">₹3,000 - ₹6,000</option>
                                    <option value="6k-10k">₹6,000 - ₹10,000</option>
                                    <option value="10k+">₹10,000+</option>
                                </select>
                            </div>

                            <div className="contact-form__field">
                                <label htmlFor="message">Project Details</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell us about your project, goals, and any specific requirements..."
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-primary contact-form__submit">
                                Send Inquiry
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                    <path d="M4 14L14 4M14 4H6M14 4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </form>

                        {/* Info Cards */}
                        <div className="contact-info reveal-right">
                            <div className="contact-info__card">
                                <div className="contact-info__icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h4>Email Us</h4>
                                <p>shahul5511@gmail.com</p>
                            </div>

                            <div className="contact-info__card">
                                <div className="contact-info__icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M17 8L12 12L7 8M12 12V20M3 8L12 2L21 8V16L12 22L3 16V8Z" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h4>Response Time</h4>
                                <p>Within 24 hours</p>
                            </div>

                            <div className="contact-info__card">
                                <div className="contact-info__icon">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                                        <path d="M2 12H22M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h4>AI Ad Films</h4>
                                <p>For Brands</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Terms */}
            <section className="terms section">
                <div className="container">
                    <div className="terms__box reveal">
                        <div className="terms__header" onClick={() => setExpandedTerms(!expandedTerms)}>
                            <h3>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <rect x="3" y="3" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M7 8H13M7 11H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                Terms & Conditions
                            </h3>
                            <svg
                                className={`terms__chevron ${expandedTerms ? 'terms__chevron--open' : ''}`}
                                width="20" height="20" viewBox="0 0 20 20" fill="none"
                            >
                                <path d="M5 8L10 13L15 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>

                        <div className={`terms__content ${expandedTerms ? 'terms__content--open' : ''}`}>
                            <ol className="terms__list">
                                {termsData.map((term, i) => (
                                    <li key={i}>{term}</li>
                                ))}
                            </ol>
                            <p className="terms__footer">
                                Please review our previous works before assigning the project.
                                We deliver videos at the highest possible level of perfection.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
