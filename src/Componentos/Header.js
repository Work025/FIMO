import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../Styles/Header.css";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activePanel, setActivePanel] = useState(null); // 'search', 'lang', 'cart', 'like'
    const [itemCount] = useState({ cart: 0, like: 0 });

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

    const languages = [
        { code: 'UZ', name: 'O\'zbekcha' },
        { code: 'RU', name: 'Русский' },
        { code: 'EN', name: 'English' },
        { code: 'TURK', name: 'Türkçe' },
        { code: 'CHINA', name: '中文' },
        { code: 'FRENCH', name: 'Français' }
    ];

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
                    <li><NavLink to="/" end>HOME</NavLink></li>
                    <li><NavLink to="/blog">BLOG</NavLink></li>
                    <li><NavLink to="/shop">SHOP</NavLink></li>
                    <li><NavLink to="/make">CUSTOMIZE</NavLink></li>
                    <li><NavLink to="/card">FEATURES</NavLink></li>
                </ul>
            </nav>

            <div className="header-right">
                <div className="header-tools">
                    {/* LANGUAGE */}
                    <button className={`tool-btn lang-btn ${activePanel === 'lang' ? 'active' : ''}`} onClick={() => togglePanel('lang')}>
                        <span>EN</span>
                    </button>

                    {/* SEARCH */}
                    <button className={`tool-btn search-btn ${activePanel === 'search' ? 'active' : ''}`} onClick={() => togglePanel('search')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </button>

                    {/* LIKE */}
                    <button className={`tool-btn like-btn ${activePanel === 'like' ? 'active' : ''}`} onClick={() => togglePanel('like')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        {itemCount.like > 0 && <span className="badge">{itemCount.like}</span>}
                    </button>

                    {/* CART */}
                    <button className={`tool-btn cart-btn ${activePanel === 'cart' ? 'active' : ''}`} onClick={() => togglePanel('cart')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        {itemCount.cart > 0 && <span className="badge">{itemCount.cart}</span>}
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
                    <div className="search-bar">
                        <input type="text" placeholder="Search for products, categories..." autoFocus />
                        <button className="search-submit">SEARCH</button>
                    </div>
                    <div className="search-filters">
                        <div className="filter-group">
                            <label>Price Range</label>
                            <div className="filter-options">
                                <span className="filter-chip">Low to High</span>
                                <span className="filter-chip">High to Low</span>
                            </div>
                        </div>
                        <div className="filter-group">
                            <label>Category</label>
                            <div className="filter-options">
                                <span className="filter-chip">T-Shirts</span>
                                <span className="filter-chip">Pants</span>
                                <span className="filter-chip">Limited</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* LANG PANEL */}
            <div className={`panel lang-panel ${activePanel === 'lang' ? 'open' : ''}`}>
                <div className="panel-container lang-grid">
                    {languages.map(lang => (
                        <div key={lang.code} className="lang-item" onClick={() => setActivePanel(null)}>
                            <span className="l-code">{lang.code}</span>
                            <span className="l-name">{lang.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* LIKE/CART FALLBACK PANEL */}
            <div className={`panel side-panel ${activePanel === 'cart' || activePanel === 'like' ? 'open' : ''}`}>
                <div className="panel-container">
                    <h3>{activePanel === 'cart' ? 'SHOPPING BAG' : 'MY WISHLIST'}</h3>
                    <div className="empty-state">
                        <p>No items found. Start exploring!</p>
                        <button className="panel-action-btn" onClick={() => setActivePanel(null)}>CONTINUE SHOPPING</button>
                    </div>
                </div>
            </div>

            {/* MOBILE NAVIGATION OVERLAY */}
            <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
                <ul className="mobile-ul">
                    <li><NavLink to="/" onClick={closeMenu}>HOME</NavLink></li>
                    <li><NavLink to="/blog" onClick={closeMenu}>BLOG</NavLink></li>
                    <li><NavLink to="/shop" onClick={closeMenu}>SHOP</NavLink></li>
                    <li><NavLink to="/make" onClick={closeMenu}>CUSTOMIZE</NavLink></li>
                    <li><NavLink to="/card" onClick={closeMenu}>FEATURES</NavLink></li>
                </ul>
            </div>

            {(menuOpen || activePanel) && <div className="header-overlay" onClick={closeMenu}></div>}
        </header>
    );
}

export default Header;