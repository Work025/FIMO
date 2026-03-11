import React, { useEffect, useRef, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import '../Styles/List.css';

// Updated blog/feature data for FIMO Clothing & Sports Brand
function List() {
    const { searchQuery, addToCart, toggleLike, likedItems, t } = useGlobalContext();
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    // Dynamic blog data with translations
    const blogData = [
        {
            id: 1,
            title: t('blog_post1_title'),
            excerpt: t('blog_post1_excerpt'),
            fullContent: t('blog_post1_content'),
            category: t('sustainability'),
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
            title: t('blog_post2_title'),
            excerpt: t('blog_post2_excerpt'),
            fullContent: t('blog_post2_content'),
            category: t('innovation'),
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
            title: t('blog_post3_title'),
            excerpt: t('blog_post3_excerpt'),
            fullContent: t('blog_post3_content'),
            category: t('design'),
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

    const filteredArticles = blogData.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <h2 className="gradient-title">{t('latest_title')}</h2>
                <p>{t('latest_desc')}</p>
            </div>

            <div className="list-grid">
                {filteredArticles.map((item, index) => (
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
                                    {t('read_article')}
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                                </button>
                                <div className="card-actions-mini">
                                    <button
                                        className={`mini-action-btn ${likedItems.find(l => l.id === item.id) ? 'active' : ''}`}
                                        onClick={() => toggleLike(item)}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill={likedItems.find(l => l.id === item.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                    </button>
                                    <button className="mini-action-btn" onClick={() => addToCart(item)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path></svg>
                                    </button>
                                </div>
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
                                    <label htmlFor="user-email" className="modal-input-label">{t('notify_label')}</label>
                                    <div className="modal-input-group">
                                        <input
                                            type="email"
                                            id="user-email"
                                            placeholder={t('email_placeholder')}
                                            className="modal-input"
                                        />
                                        <button className="modal-submit-btn">
                                            {t('subscribe')}
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