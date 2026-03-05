import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import '../Styles/Buy.css';

const Buy = () => {
    const { t, boughtItems, toggleBuy, clearBought } = useGlobalContext();

    if (boughtItems.length === 0) return null;

    return (
        <section className="buy-scroller-section fade-up">
            <div className="buy-scroller-header">
                <div className="buy-scroller-info">
                    <h2 className="buy-scroller-title">
                        {t('your_orders') || 'Your'} <span className="highlight-text">{t('selection') || 'Selection'}</span>
                    </h2>
                    <span className="buy-count-badge">{boughtItems.length} {t('items') || 'items'}</span>
                </div>
                <button className="buy-clear-btn" onClick={clearBought}>
                    {t('clear_all') || 'Clear All'}
                </button>
            </div>

            <div className="buy-horizontal-grid">
                {boughtItems.map((item, index) => (
                    <div className="buy-mini-card" key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="mini-card-img-wrap">
                            <img src={item.url || item.img} alt={item.title} />
                            <button className="mini-remove-btn" onClick={() => toggleBuy(item)}>
                                &times;
                            </button>
                        </div>
                        <div className="mini-card-details">
                            <h4>{item.title}</h4>
                            <p>#{item.number}</p>
                        </div>
                    </div>
                ))}

                <div className="buy-checkout-card">
                    <div className="checkout-visual">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    </div>
                    <button className="mini-checkout-btn">
                        {t('checkout') || 'Checkout'}
                    </button>
                </div>
            </div>

            <div className="buy-scroller-divider"></div>
        </section>
    );
};

export default Buy;
