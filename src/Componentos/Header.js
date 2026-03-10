import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import featuresData from "../Data/SHoise.json"; // Features JSON
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
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
        user,
        loginUser,
        logoutUser,
        t
    } = useGlobalContext();

    const [features] = useState(featuresData);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activePanel, setActivePanel] = useState(null); // 'search', 'lang', 'cart', 'like', 'profile'

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

    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                loginUser(res.data);
            } catch (err) {
                console.error("Google Login Error:", err);
            }
        },
    });

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

                    {/* PROFILE */}
                    <button className={`tool-btn profile-btn ${activePanel === 'profile' ? 'active' : ''}`} onClick={() => togglePanel('profile')}>
                        {user ? (
                            <img src={user.picture} alt="Profile" className="user-avatar-mini" />
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        )}
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

            {/* LIKE/CART/PROFILE SIDE PANEL */}
            <div className={`panel side-panel ${['cart', 'like', 'profile'].includes(activePanel) ? 'open' : ''}`}>
                <div className="panel-container">
                    <div className="panel-header">
                        <h3>{activePanel === 'profile' ? t('profile') : (activePanel === 'cart' ? t('cart') : t('wishlist'))}</h3>
                        <button className="close-panel" onClick={() => setActivePanel(null)}>&times;</button>
                    </div>

                    <div className="panel-content">
                        {activePanel === 'profile' ? (
                            <div className="profile-content">
                                {user ? (
                                    <div className="user-profile">
                                        <div className="profile-main-info">
                                            <img src={user.picture} alt={user.name} className="profile-large-img" />
                                            <h3>{t('welcome')}, {user.given_name}!</h3>
                                            <p>{user.email}</p>
                                        </div>

                                        <div className="profile-sections">
                                            <div className="profile-section">
                                                <h4>{t('orders')}</h4>
                                                <NavLink to="/buy" className="profile-link" onClick={() => setActivePanel(null)}>{t('view_collection')}</NavLink>
                                            </div>
                                            <div className="profile-section">
                                                <h4>{t('wishlist')} ({likedItems.length})</h4>
                                                <button className="profile-link" onClick={() => togglePanel('like')}>{t('view_collection')}</button>
                                            </div>
                                        </div>

                                        <button className="logout-btn" onClick={() => { logoutUser(); setActivePanel(null); }}>
                                            {t('logout')}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="auth-prompt">
                                        <div className="auth-icon-large">
                                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        </div>
                                        <p>{t('empty_state')}</p>
                                        <button className="google-login-btn" onClick={() => googleLogin()}>
                                            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                                            {t('login')}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            activePanel === 'cart' ? (
                                cartItems.length > 0 ? (
                                    <div className="panel-items">
                                        {cartItems.map((item) => (
                                            <div key={item.cartId} className="side-item">
                                                <div className="side-item-img">
                                                    <img src={item.img} alt={item.title} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=300&auto=format&fit=crop"; }} />
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
                                                    <img src={item.img} alt={item.title} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=300&auto=format&fit=crop"; }} />
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