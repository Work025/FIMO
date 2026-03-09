import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import featuresData from "../Data/SHoise.json"; // Features JSON
import "../Styles/Header.css";

function Header() {
    const {
        language,
        languages,
        changeLanguage,
        searchQuery,
        setSearchQuery,
        cartItems,
        removeFromCart,
        likedItems,
        toggleLike,
        t
    } = useGlobalContext();
    
    const [features] = useState(featuresData);
    const [filterPrice, setFilterPrice] = useState(""); // "low" yoki "high"
    const [filterCategory, setFilterCategory] = useState(""); // "T-Shirts", "Pants", "Limited"
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activePanel, setActivePanel] = useState(null); // 'search', 'lang', 'cart', 'like'

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => {
        setMenuOpen(false);
        setActivePanel(null);
    };

    const togglePanel = (panelName) => {
        if (activePanel === panelName) {
            setActivePanel(null);
        } else {
            setActivePanel(panelName);
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? "scrolled" : ""}`}>
            <div className="header-left">
                <NavLink to="/" onClick={closeMenu}>
                    <div className="header-logo">
                        <h1>FIMO</h1>
                    </div>
                </NavLink>
            </div>

            <nav className="header-center">
                <ul className="header-nav-list">
                    <li><NavLink to="/" end>{t('home')}</NavLink></li>
                    <li><NavLink to="/blog">{t('blog')}</NavLink></li>
                    <li><NavLink to="/shop">{t('shop')}</NavLink></li>
                    <li><NavLink to="/make">{t('customize')}</NavLink></li>
                    <li><NavLink to="/card">{t('features')}</NavLink></li>
                </ul>
            </nav>

            <div className="header-right">
                <div className="header-tools">
                    {/* LANGUAGE */}
                    <button className={`tool-btn lang-btn ${activePanel === 'lang' ? 'active' : ''}`} onClick={() => togglePanel('lang')}>
                        <span>{language}</span>
                    </button>

                    {/* SEARCH */}
                    <button className={`tool-btn search-btn ${activePanel === 'search' ? 'active' : ''}`} onClick={() => togglePanel('search')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>

                    {/* LIKE */}
                    <button className={`tool-btn like-btn ${activePanel === 'like' ? 'active' : ''}`} onClick={() => togglePanel('like')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        {likedItems.length > 0 && <span className="badge">{likedItems.length}</span>}
                    </button>

                    {/* CART */}
                    <button className={`tool-btn cart-btn ${activePanel === 'cart' ? 'active' : ''}`} onClick={() => togglePanel('cart')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
                    </button>

                    {/* MOBILE MENU TOGGLE */}
                    <div className={`header-menu ${menuOpen ? "open" : ""}`} onClick={toggleMenu}>
                        <div className="line1"></div>
                        <div className="line2"></div>
                        <div className="line3"></div>
                    </div>
                </div>
            </div>

            {/* DYNAMIC PANELS */}

            {/* SEARCH PANEL */}
            <div className={`panel search-panel ${activePanel === 'search' ? 'open' : ''}`}>
                <div className="panel-container">
                    {/* Search Input */}
                    <div className="search-bar">
                        <input
                            type="text"
                            placeholder={t('search_placeholder') || "Search..."}
                            autoFocus
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Cards from JSON */}
                    <div className="search-cards">
                        {features
                            .filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map(item => (
                                <div key={item.id} className="search-card">
                                    <div className="search-card-img">
                                        <img
                                            src={item.url}
                                            alt={item.title}
                                            onError={(e) => { e.target.src = "https://via.placeholder.com/100x120?text=FIMO"; }}
                                        />
                                    </div>
                                    <div className="search-card-info">
                                        <h4>{item.title}</h4>
                                        <p className="price">${item.price}</p>
                                        <p className="category">{item.category}</p>
                                    </div>
                                </div>
                            ))
                        }
                        {searchQuery && features.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                            <p className="no-results">No matching items</p>
                        )}
                    </div>
                </div>
            </div>

            {/* LANG PANEL */}
            <div className={`panel lang-panel ${activePanel === 'lang' ? 'open' : ''}`}>
                <div className="panel-container lang-grid">
                    {languages.map(lang => (
                        <div key={lang.code} className="lang-item" onClick={() => { changeLanguage(lang.code); setActivePanel(null); }}>
                            <span className="l-code">{lang.code}</span>
                            <span className="l-name">{lang.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* LIKE/CART SIDE PANEL */}
            <div className={`panel side-panel ${activePanel === 'cart' || activePanel === 'like' ? 'open' : ''}`}>
                <div className="panel-container">
                    <div className="panel-header">
                        <h3>{activePanel === 'cart' ? t('cart') : t('wishlist')}</h3>
                        <button className="close-panel" onClick={() => setActivePanel(null)}>&times;</button>
                    </div>

                    <div className="panel-content">
                        {activePanel === 'cart' ? (
                            cartItems.length > 0 ? (
                                <div className="panel-items">
                                    {cartItems.map((item) => (
                                        <div key={item.cartId} className="side-item">
                                            <div className="side-item-img">
                                                <img src={item.img} alt={item.title} />
                                            </div>
                                            <div className="side-item-info">
                                                <h4>{item.title}</h4>
                                                <p className="price">${item.price}</p>
                                                <button className="remove-item" onClick={() => removeFromCart(item.cartId)}>{t('remove')}</button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="panel-footer">
                                        <div className="total-box">
                                            <span>TOTAL:</span>
                                            <span>${cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</span>
                                        </div>
                                        <button className="checkout-btn">{t('buy_now')}</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <p>{t('empty_state')}</p>
                                    <button className="panel-action-btn" onClick={() => setActivePanel(null)}>{t('continue_shopping')}</button>
                                </div>
                            )
                        ) : (
                            likedItems.length > 0 ? (
                                <div className="panel-items">
                                    {likedItems.map((item) => (
                                        <div key={item.id} className="side-item">
                                            <div className="side-item-img">
                                                <img src={item.img} alt={item.title} />
                                            </div>
                                            <div className="side-item-info">
                                                <h4>{item.title}</h4>
                                                <p className="price">${item.price}</p>
                                                <button className="remove-item" onClick={() => toggleLike(item)}>{t('remove')}</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <p>{t('empty_state')}</p>
                                    <button className="panel-action-btn" onClick={() => setActivePanel(null)}>{t('continue_shopping')}</button>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>

            {/* MOBILE NAVIGATION OVERLAY */}
            <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
                <ul className="mobile-ul">
                    <li><NavLink to="/" onClick={closeMenu}>{t('home')}</NavLink></li>
                    <li><NavLink to="/blog" onClick={closeMenu}>{t('blog')}</NavLink></li>
                    <li><NavLink to="/shop" onClick={closeMenu}>{t('shop')}</NavLink></li>
                    <li><NavLink to="/buy" onClick={closeMenu}>{t('orders') || 'Orders'}</NavLink></li>
                    <li><NavLink to="/make" onClick={closeMenu}>{t('customize')}</NavLink></li>
                    <li><NavLink to="/card" onClick={closeMenu}>{t('features')}</NavLink></li>
                </ul>
            </div>

            {(menuOpen || activePanel) && <div className="header-overlay" onClick={closeMenu}></div>}
        </header>
    );
}

export default Header;