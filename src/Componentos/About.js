import React, { useEffect, useRef, useState } from 'react';
import '../Styles/About.css';

function About() {
    const [isVisible, setIsVisible] = useState(false);
    const aboutRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.2, // Trigger when 20% visible
            }
        );

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className={`about-section ${isVisible ? 'fade-in-up' : ''}`} ref={aboutRef}>
            <div className="about-container">
                {/* Visual Glass Card */}
                <div className="about-visual">
                    <div className="about-glass-panel">
                        <div className="glass-content">
                            <span className="glass-badge">EST. 2024</span>
                            <h3>Redefining Quality.</h3>
                            <p>Premium sustainable fabrics designed for exactly who you are.</p>
                        </div>
                        <div className="glow-orb"></div>
                    </div>
                </div>

                {/* Typography / Story */}
                <div className="about-text">
                    <h2 className="gradient-text">The Story of FIMO</h2>
                    <p className="lead-text">
                        We started with a simple belief: Clothing should not only look stunning but feel like a second skin.
                    </p>
                    <p className="body-text">
                        Every thread we select, every stitch we make is guided by our obsession with quality. Our garments undergo rigorous testing and are crafted from 100% organic cotton to ensure unparalleled durability and breathability.
                    </p>

                    <div className="stats-grid">
                        <div className="stat-item">
                            <h4>100%</h4>
                            <span>Organic Cotton</span>
                        </div>
                        <div className="stat-item">
                            <h4>24/7</h4>
                            <span>Ultimate Comfort</span>
                        </div>
                        <div className="stat-item">
                            <h4>0%</h4>
                            <span>Harsh Chemicals</span>
                        </div>
                    </div>

                    <button className="about-btn">Explore Quality</button>
                </div>
            </div>
        </section>
    );
}

export default About;