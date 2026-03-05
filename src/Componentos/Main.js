import { useEffect, useRef, useState } from "react";
import usersbg from "../Assets/UsersBG.avif";
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
            title: "Cool-Shirt",
            about: "100% Cotton, Classic Fit, Black, White",
            size: ["S", "M", "L", "XL"],
            price: 25.00
        },
        {
            id: 'p2',
            img: user2,
            title: "T-Shirt",
            about: "Premium Cotton, Slim Fit, Light Brown",
            size: ["S", "M", "L", "XL"],
            price: 30.00
        },
        {
            id: 'p3',
            img: user3,
            title: "Summer-Shirt",
            about: "Comfortable Cotton, Relaxed Fit, Human color",
            size: ["S", "M", "L"],
            price: 22.00
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
            {/* About section */}
            <div className="main-header fade-in">
                <h2>{t('works_title').split(' ')[0]} <span className="highlight-text">{t('works_title').split(' ')[1]}</span></h2>
                <p>
                    <span className="brand-name">{t('footer_text')}</span>
                    <br />
                    {t('main_desc')}
                </p>
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
                        style={{
                            backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)), url(${usersbg})`
                        }}
                    >
                        {/* Hover Glow Effect */}
                        <div
                            className="dynamic-glow"
                            style={{
                                opacity: hoveredCard === index ? 1 : 0,
                                background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.1) 0%, transparent 60%)`
                            }}
                        ></div>

                        <div className="card-title">
                            <h2>{item.title}</h2>
                            <p className="card-desc">{item.about}</p>
                            <div className="card-sizes">
                                <span>{t('sizes_label')}</span>
                                <div className="size-badges">
                                    {item.size.map((sz, i) => (
                                        <span key={i} className="size-badge">{sz}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="card-actions">
                                <button
                                    className={`action-btn like-btn ${likedItems.find(l => l.id === item.id) ? 'active' : ''}`}
                                    onClick={() => toggleLike(item)}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill={likedItems.find(l => l.id === item.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                                </button>
                                <button className="action-btn cart-btn" onClick={() => addToCart(item)}>
                                    {t('add_to_bag')}
                                </button>
                            </div>
                        </div>
                        <div className="card-img-wrapper">
                            <div className="card-glow"></div>
                            <img src={item.img} alt={item.title} className="card-img-animated" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Main;