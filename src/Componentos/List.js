import React, { useEffect, useRef, useState } from 'react';
import '../Styles/List.css';

// Updated blog/feature data for FIMO Clothing & Sports Brand
const blogData = [
    {
        id: 1,
        title: "The Future of Organic Cotton",
        excerpt: "Discover how sustainable farming is changing the way we think about everyday apparel and comfort.",
        fullContent: "At FIMO, we believe that high-performance sportswear starts with the soil. Our latest collection is crafted from 100% GOTS-certified organic cotton, ensuring breathability for your toughest workouts and softest recovery days. We are committed to a zero-waste manufacturing process.",
        category: "Sustainability",
        date: "Oct 12, 2024",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
            </svg>
        )
    },
    {
        id: 2,
        title: "Dyeing Without the Damage",
        excerpt: "Our new eco-friendly dyeing process eliminates harsh chemicals while maintaining vibrant, lasting colors.",
        fullContent: "Traditional textile dyeing is one of the world's most polluting processes. FIMO's new 'Aqua-Save' technology reduces water usage by 90% and uses plant-based pigments. This means your gym gear stays vibrant longer without harming your skin or the planet.",
        category: "Innovation",
        date: "Oct 18, 2024",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
                <path d="M10 6h4" />
                <path d="M10 10h4" />
                <path d="M10 14h4" />
            </svg>
        )
    },
    {
        id: 3,
        title: "Designing the Perfect Fit",
        excerpt: "A behind-the-scenes look at how FIMO engineers the ultimate silhouette for every body type.",
        fullContent: "Clothing shouldn't restrict your movement; it should enhance it. Our design lab uses 3D body scanning to create the 'FIMO Kinetic Cut'—a unique paneling system that moves with your muscles. Whether it's a marathon or a coffee run, we've got you covered.",
        category: "Design",
        date: "Nov 02, 2024",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
            </svg>
        )
    }
];

function List() {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Interactive glowing hover effect logic
    const handleMouseMove = (e, cardId) => {
        const card = document.getElementById(`blog-card-${cardId}`);
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    const handleReadMore = (article) => {
        setSelectedArticle(article);
        document.body.style.overflow = 'hidden'; // Prevent scroll when modal is open
    };

    const closeModal = () => {
        setSelectedArticle(null);
        document.body.style.overflow = 'auto'; // Restore scroll
    };

    return (
        <section className="list-section" ref={sectionRef}>
            <div className="list-header">
                <h2 className="gradient-title">Latest from FIMO</h2>
                <p>Insights, news, and behind the seams.</p>
            </div>

            <div className="list-grid">
                {blogData.map((item, index) => (
                    <article
                        key={item.id}
                        id={`blog-card-${item.id}`}
                        className={`blog-card ${isVisible ? 'animate-up' : ''}`}
                        style={{ '--animation-order': index }}
                        onMouseMove={(e) => handleMouseMove(e, item.id)}
                    >
                        <div className="blog-card-glow"></div>
                        <div className="blog-card-content">
                            <div className="blog-icon-wrapper">
                                <div className="icon-badge">
                                    {item.icon}
                                </div>
                                <span className="blog-category">{item.category}</span>
                            </div>
                            <div className="blog-text">
                                <span className="blog-date">{item.date}</span>
                                <h3>{item.title}</h3>
                                <p>{item.excerpt}</p>
                                <button
                                    className="read-more-btn"
                                    onClick={() => handleReadMore(item)}
                                >
                                    Read Article
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* Her-overlov-box (Modal) */}
            {selectedArticle && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="article-modal" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close-btn" onClick={closeModal}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        </button>

                        <div className="modal-content-grid">
                            <div className="modal-visual-side">
                                <div className="modal-icon-container">
                                    {selectedArticle.icon}
                                </div>
                                <div className="modal-labels">
                                    <span className="modal-label-badge">{selectedArticle.category}</span>
                                    <span className="modal-label-badge">PREMIUM</span>
                                    <span className="modal-label-badge">FIMO BRAND</span>
                                </div>
                            </div>

                            <div className="modal-text-side">
                                <span className="modal-date">{selectedArticle.date}</span>
                                <h2 className="modal-title">{selectedArticle.title}</h2>
                                <p className="modal-body-text">{selectedArticle.fullContent}</p>

                                <div className="modal-form">
                                    <label htmlFor="user-email" className="modal-input-label">Notify me for new collections</label>
                                    <div className="modal-input-group">
                                        <input
                                            type="email"
                                            id="user-email"
                                            placeholder="Enter your email"
                                            className="modal-input"
                                        />
                                        <button className="modal-submit-btn">
                                            Subscribe
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default List;