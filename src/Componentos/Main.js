import { useEffect, useRef, useState } from "react";
import user1 from "../Assets/User1.png";
import user2 from "../Assets/User2.png";
import user3 from "../Assets/User3.png";
import { useGlobalContext } from "../context/GlobalContext";
import "../Styles/Main.css";

function Main() {
    const { searchQuery, addToCart, toggleLike, likedItems, t } = useGlobalContext();

    const shoise = [
        {
            id: 'p1',
            img: user1,
            title: "URBAN ESSENTIAL",
            about: "Ultra-soft 100% organic cotton. A minimalist staple for any wardrobe.",
            size: ["S", "M", "L", "XL"],
            price: 15.00,
            category: "Classic"
        },
        {
            id: 'p2',
            img: user2,
            title: "PRIME OVERSIZED",
            about: "Heavyweight premium cotton with a relaxed, modern silhouette.",
            size: ["S", "M", "L", "XL"],
            price: 22.00,
            category: "Premium"
        },
        {
            id: 'p3',
            img: user3,
            title: "SUMMER BREEZE",
            about: "Lightweight, breathable fabric designed for ultimate summer comfort.",
            size: ["S", "M", "L"],
            price: 12.00,
            category: "Eco-Friendly"
        },
    ];

    const filteredProducts = shoise.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.about.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Animatsiya uchun ref
    const cardsRef = useRef([]);

    useEffect(() => {
        const currentCards = cardsRef.current;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, { threshold: 0.2 });

        currentCards.forEach(card => {
            if (card) observer.observe(card);
        });

        return () => {
            currentCards.forEach(card => {
                if (card) observer.unobserve(card);
            });
        };
    }, []);

    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [hoveredCard, setHoveredCard] = useState(null);

    const handleMouseMove = (e, index) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
        setHoveredCard(index);
    };

    const handleMouseLeave = () => {
        setHoveredCard(null);
    };

    return (
        <div className="main">
            {/* Brand Vision Section */}
            <div className="brand-vision-section fade-in">
                <div className="vision-content">
                    <span className="vision-badge">{t('footer_text')}</span>
                    <h2 className="vision-title">{t('works_title')}</h2>
                    <p className="vision-text">
                        {t('main_desc')}
                    </p>
                </div>
            </div>

            {/* Cards section */}
            <div className="main-cards">
                {filteredProducts.map((item, index) => (
                    <div
                        className={`card fade-up ${index % 2 !== 0 ? "reverse" : ""}`}
                        key={index}
                        ref={el => cardsRef.current[index] = el}
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Glass Overlay */}
                        <div className="card-glass-bg"></div>

                        {/* Hover Glow Effect */}
                        <div
                            className="dynamic-glow"
                            style={{
                                opacity: hoveredCard === index ? 1 : 0,
                                background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.08) 0%, transparent 50%)`
                            }}
                        ></div>

                        <div className="card-content">
                            <span className="card-category">{item.category}</span>
                            <h2 className="card-title-text">{item.title}</h2>
                            <p className="card-desc">{item.about}</p>

                            <div className="card-info-row">
                                <div className="card-price-tag">
                                    <span className="price-label">Price</span>
                                    <span className="price-value">${item.price.toFixed(2)}</span>
                                </div>
                                <div className="card-sizes-wrap">
                                    <span className="size-label">Select Size</span>
                                    <div className="size-badges-grid">
                                        {item.size.map((sz, i) => (
                                            <span key={i} className="size-badge-mini">{sz}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="card-actions-new">
                                <button className="buy-btn-premium" onClick={() => addToCart(item)}>
                                    {t('add_to_bag')}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                                </button>
                                <button
                                    className={`wish-btn-premium ${likedItems.find(l => l.id === item.id) ? 'active' : ''}`}
                                    onClick={() => toggleLike(item)}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill={likedItems.find(l => l.id === item.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                </button>
                            </div>
                        </div>

                        <div className="card-visual-wrapper">
                            <div className="visual-glow-main"></div>
                            <img src={item.img} alt={item.title} className="product-img-main" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Location Map Section */}
            <div className="location-section fade-up">
                <div className="location-info">
                    <h3>{t('visit_us') || "Find Us"}</h3>
                    <p>Tashkent, Uzbekistan | FIMO Concept Store</p>
                </div>
                <div className="map-wrapper">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11984.747197022!2d69.240562!3d41.311081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a99769216563ef!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                        width="100%"
                        height="450"
                        style={{ border: 0, borderRadius: '20px' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="FIMO Location"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default Main;