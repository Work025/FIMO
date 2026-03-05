import React, { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import '../Styles/About.css';

function About() {
    const { t } = useGlobalContext();
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
                            <h3>{t('redefining_quality')}</h3>
                            <p>{t('premium_desc')}</p>
                        </div>
                        <div className="glow-orb"></div>
                    </div>
                </div>

                {/* Typography / Story */}
                <div className="about-text">
                    <h2 className="gradient-text">{t('story_title')}</h2>
                    <p className="lead-text">
                        {t('story_lead')}
                    </p>
                    <p className="body-text">
                        {t('story_body')}
                    </p>

                    <div className="stats-grid">
                        <div className="stat-item">
                            <h4>100%</h4>
                            <span>{t('organic_cotton')}</span>
                        </div>
                        <div className="stat-item">
                            <h4>24/7</h4>
                            <span>{t('ultimate_comfort')}</span>
                        </div>
                        <div className="stat-item">
                            <h4>0%</h4>
                            <span>{t('no_chemicals')}</span>
                        </div>
                    </div>

                    <button className="about-btn">{t('explore_quality')}</button>
                </div>
            </div>
        </section>
    );
}

export default About;