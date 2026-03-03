import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import heroBg from "../Assets/herobg.avif";
import tshirt1 from "../Assets/Fimo-fudbolka1.png";
import tshirt2 from "../Assets/Fimo-fudbolka-boy2.png";
import tshirt3 from "../Assets/Fimo-fudbolka-girl1.png";
import tshirt4 from "../Assets/Fimo-fudbolka-girl2.png";
import tshirt5 from "../Assets/Fimo-fudbolka-girl3.png";
import robot from "../Assets/Robot-hero.png"
import "../Styles/Hero.css";

function Hero() {
    const navigate = useNavigate();


    const imgRef = useRef(null);
    const robotRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!imgRef.current) return;
        const rect = imgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 20;
        const rotateY = (x - centerX) / 20;

        imgRef.current.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)
        `;

        if (robotRef.current) {
            robotRef.current.style.transform = `
                translate(${rotateY * -2}px, ${rotateX * -2}px)
            `;
        }
    };

    const handleMouseLeave = () => {
        if (!imgRef.current) return;
        imgRef.current.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;
        if (robotRef.current) {
            robotRef.current.style.transform = `translate(0px, 0px)`;
        }
    };

    const shoise = [
        {
            img: tshirt1,
            title: "Boys T-Shirt",
            about: "100% Cotton, Classic Fit, Black",
            size: ["S", "M", "L", "XL"],
            color: ["White", "Black", "Grey"],
        },
        {
            img: tshirt2,
            title: "Men T-Shirt",
            about: "Premium Cotton, Slim Fit, Black",
            size: ["S", "M", "L", "XL"],
            color: ["Black", "White"],
        },
        {
            img: tshirt3,
            title: "Women T-Shirt",
            about: "Comfortable Cotton, Relaxed Fit, Orange",
            size: ["S", "M", "L"],
            color: ["Orange", "Yellow"],
        },
        {
            img: tshirt4,
            title: "Women T-Shirt",
            about: "Comfortable Cotton, Relaxed Fit, Grey",
            size: ["S", "M", "L"],
            color: ["Grey", "White"],
        },
        {
            img: tshirt5,
            title: "Women T-Shirt",
            about: "Comfortable Cotton, Relaxed Fit, Brown",
            size: ["S", "M", "L"],
            color: ["Light Brown"],
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    // Auto slide har 5 soniyada
    useEffect(() => {
        const interval = setInterval(() => {
            changeSlide((prev) => (prev + 1) % shoise.length);
        }, 6000); // 6000ms = 6s
        return () => clearInterval(interval);
    }, [shoise.length]);

    const changeSlide = (nextIndex) => {
        setIsFading(true);
        setTimeout(() => {
            setActiveIndex(nextIndex);
            setIsFading(false);
        }, 300); // Text fade out kutiladi, keyin o'zgaradi
    };

    return (
        <div className="hero">
            <div
                className="hero-content"
                style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.6) 100%), url("${heroBg}")` }}
            >
                {/* LEFT PANEL */}
                <div className="hero-about-list slide-in-left">
                    {/* Navigation Buttons */}
                    <div className="list1-header">
                        {shoise.map((_, index) => (
                            <div key={index} className="nav-item">
                                <button
                                    className={`nav-btn ${activeIndex === index ? "active" : ""}`}
                                    onClick={() => changeSlide(index)}
                                >
                                    0{index + 1}
                                </button>
                                {index < shoise.length - 1 && (
                                    <div className="nav-line">
                                        <div
                                            className="nav-progress"
                                            style={{ width: activeIndex >= index ? '100%' : '0%' }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Product info */}
                    <div className={`list2-hero ${isFading ? "fade-out" : "fade-in"}`}>
                        <h2 className="hero-title">{shoise[activeIndex].title}</h2>
                        <p className="hero-desc">{shoise[activeIndex].about}</p>
                        <button className="btn-buy" onClick={() => navigate("/shop")}>
                            <span>BUY NOW</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                    </div>

                    {/* Size and Color Info */}
                    <div className={`list3-aside glass-panel ${isFading ? "fade-out" : "fade-in"}`}>
                        <div className="info-block">
                            <span className="info-label">COLORS</span>
                            <div className="info-values">
                                {shoise[activeIndex].color.map((c, i) => (
                                    <span key={i} className="info-badge">{c}</span>
                                ))}
                            </div>
                        </div>
                        <div className="info-block">
                            <span className="info-label">SIZES</span>
                            <div className="info-values">
                                {shoise[activeIndex].size.map((s, i) => (
                                    <span key={i} className="info-badge">{s}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL */}
                <div
                    className={`hero-imgs ${isFading ? "fade-out" : "fade-in"}`}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <div className="hero-glow"></div>
                    <div className="hero-main-img" ref={imgRef}>
                        <img
                            src={shoise[activeIndex].img}
                            alt={shoise[activeIndex].title}
                        />
                    </div>
                </div>

                {/* Robot Decoration */}
                <div className="hero-robot slide-in-right" ref={robotRef}>
                    <img src={robot} alt="Mascot Robot" />
                </div>
            </div>
        </div>
    );
}

export default Hero;