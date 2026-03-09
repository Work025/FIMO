import React, { useState } from 'react';
import '../Styles/Features.css';
import { useGlobalContext } from '../context/GlobalContext';
import featuresData from '../Data/SHoise.json';

const Features = () => {
    const [features] = useState(featuresData);
    const {
        t,
        addToCart,
        toggleLike,
        likedItems,
        toggleBuy,
        boughtItems,
        searchQuery,
        filterPrice,
        filterCategory
    } = useGlobalContext();

    // Filter qilish
    let filteredFeatures = features.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Category filter
    if (filterCategory) {
        filteredFeatures = filteredFeatures.filter(item => item.category === filterCategory);
    }

    // Price filter
    if (filterPrice) {
        filteredFeatures = filteredFeatures.sort((a, b) =>
            filterPrice === "low" ? a.price - b.price : b.price - a.price
        );
    }

    return (
        <section id="features" className="features-section">
            <div className="features-container">
                <div className="features-header fade-up">
                    <h2 className="features-title">
                        {t('our_features_title') || 'Premium'} <span className="highlight-text">{t('our_features_subtitle') || 'Selection'}</span>
                    </h2>
                    <p className="features-description">
                        {t('features_desc') || 'Explore our latest collection of vibrant and unique designs crafted for you.'}
                    </p>
                </div>
                <div className="features-grid">
                    {filteredFeatures.map((item, index) => (
                        <div className="feature-card fade-up" key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="feature-img-container">
                                <img
                                    src={item.url || item.img}
                                    alt={item.title}
                                    className="feature-img"
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x500?text=FIMO+Collection"; }}
                                />
                                <div className="feature-overlay">
                                    <div className="feature-badge">#{item.number}</div>
                                    <button
                                        className={`feature-like-btn ${likedItems.find(l => l.id === item.id) ? 'active' : ''}`}
                                        onClick={() => toggleLike(item)}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill={likedItems.find(l => l.id === item.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                    </button>
                                </div>
                            </div>
                            <div className="feature-content">
                                <h3 className="feature-card-title">{item.title}</h3>
                                <div className="feature-actions-group">
                                    <button
                                        className={`feature-buy-btn ${boughtItems.find(b => b.id === item.id) ? 'bought' : ''}`}
                                        onClick={() => toggleBuy(item)}
                                    >
                                        {boughtItems.find(b => b.id === item.id) ? t('ordered') || 'Ordered' : t('buy_now')}
                                    </button>
                                    <button className="feature-cart-btn" onClick={() => addToCart({ ...item, img: item.url, price: 45 })}>
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
