import { useEffect, useRef, useState } from "react";
import usersbg from "../Assets/UsersBG.avif";
import user1 from "../Assets/User1.png";
import user2 from "../Assets/User2.png";
import user3 from "../Assets/User3.png";
import "../Styles/Main.css";

function Main() {
    const shoise = [
        {
            img: user1,
            title: "Cool-Shirt",
            about: "100% Cotton, Classic Fit, Black, White",
            size: ["S", "M", "L", "XL"],
        },
        {
            img: user2,
            title: "T-Shirt",
            about: "Premium Cotton, Slim Fit, Light Brown",
            size: ["S", "M", "L", "XL"],
        },
        {
            img: user3,
            title: "Summer-Shirt",
            about: "Comfortable Cotton, Relaxed Fit, Human color",
            size: ["S", "M", "L"],
        },
    ];

    // Animatsiya uchun ref
    const cardsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, { threshold: 0.2 });

        cardsRef.current.forEach(card => {
            if (card) observer.observe(card);
        });

        return () => {
            cardsRef.current.forEach(card => {
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
                <h2>Our <span className="highlight-text">Works</span></h2>
                <p>
                    <span className="brand-name">FIMO – Your brand, your style</span>
                    <br />
                    FIMO is a brand that creates high-quality, stylish, and comfortable clothing.
                    Each T-shirt and pants are made of high-quality fabrics, suitable for everyday and sportswear.
                    Our goal is to transform your style into comfort and aesthetics.
                </p>
            </div>

            {/* Cards section */}
            <div className="main-cards">
                {shoise.map((item, index) => (
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
                                <span>Sizes:</span>
                                <div className="size-badges">
                                    {item.size.map((sz, i) => (
                                        <span key={i} className="size-badge">{sz}</span>
                                    ))}
                                </div>
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