import React, { useState, useRef, useEffect } from "react";
import WM1 from "../Assets/WM-medium1.png"
import WM2 from "../Assets/WM-medium2.png"
import WM3 from "../Assets/WM-medium3.png"
import WM4 from "../Assets/WM-medium4.png"
import WM5 from "../Assets/WM-medium5.png"
import WM6 from "../Assets/WM-full1.png"
import WM7 from "../Assets/WM-full2.png"
import WM8 from "../Assets/WM-full3.png"
import WM9 from "../Assets/WM-full4.png"
import WM10 from "../Assets/WM-full5.png"
import "../Styles/Slide.css"

const slidesData = [
    { id: 1, title: "CORE WHITE", subtitle: "CLASSIC SPORT", description: "Engineered with FIMO's proprietary Kinetic Cut for unrestricted athletic performance and timeless minimalism.", fullImg: WM6, medImg: WM1 },
    { id: 2, title: "NOIR SHADE", subtitle: "URBAN TECH", description: "High-density sustainable fabrics meet a sleek, monochromatic silhouette for the modern urban explorer.", fullImg: WM7, medImg: WM2 },
    { id: 3, title: "AZURE ZENITH", subtitle: "HORIZON PERFORMANCE", description: "Moisture-wicking technology pushed to the limit, wrapped in an eco-conscious deep blue gradient.", fullImg: WM8, medImg: WM3 },
    { id: 4, title: "SAND DRIFT", subtitle: "HERITAGE COMFORT", description: "The softest finish in our collection, inspired by the shifting dunes of the high desert and natural earth tones.", fullImg: WM9, medImg: WM4 },
    { id: 5, title: "SLATE PEAK", subtitle: "NEO-ACTIVE", description: "A versatile foundation for any active wardrobe, crafted from GOTS-certified organic cotton with a refined grey finish.", fullImg: WM10, medImg: WM5 },
    { id: 6, title: "OCEAN DEPTH", subtitle: "NAVY SERIES", description: "Deep hues of the Pacific captured in breathable performance wear. Built for those who thrive in motion.", fullImg: WM1, medImg: WM6 },
    { id: 7, title: "SNOW PEAK", subtitle: "ALPINE SUMMIT", description: "Cold-resistant and quick-drying. The Alpine Summit series is built for high-performance in fluctuating extremes.", fullImg: WM2, medImg: WM7 },
    { id: 8, title: "SOLAR VOLT", subtitle: "ENERGY FLARE", description: "Vibrant, high-visibility orange infused with thermal-regulating fibers for sustained comfort during peak intensity.", fullImg: WM3, medImg: WM8 },
    { id: 9, title: "DUSK MIRAGE", subtitle: "URBAN EXPLORE", description: "Lightweight, sand-inspired tones that adapt to both the cityscape and the rugged outdoors with effortless ease.", fullImg: WM4, medImg: WM9 },
    { id: 10, title: "ONYX STEALTH", subtitle: "MIDNIGHT SERIES", description: "Absolute darkness, engineered. Features reflective detailing and a razor-sharp silhouette for low-light mastery.", fullImg: WM5, medImg: WM10 }
];

function Slide() {
    // Virtual index for infinite looping
    const [virtualCurrent, setVirtualCurrent] = useState(slidesData.length * 1000);
    const [isAnimating, setIsAnimating] = useState(false);
    const [dragStart, setDragStart] = useState(null);
    const [dragOffset, setDragOffset] = useState(0);

    const dataLength = slidesData.length;
    const currentRealIndex = virtualCurrent % dataLength;

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setVirtualCurrent((prev) => prev + 1);
        setTimeout(() => setIsAnimating(false), 400);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setVirtualCurrent((prev) => prev - 1);
        setTimeout(() => setIsAnimating(false), 400);
    };

    const handleMouseDown = (e) => setDragStart(e.clientX);
    const handleMouseMove = (e) => {
        if (dragStart !== null) {
            const rawOffset = e.clientX - dragStart;
            // Constrain visual drag to 50px as requested previously
            const constrainedOffset = Math.max(Math.min(rawOffset, 50), -50);
            setDragOffset(constrainedOffset);
        }
    };
    const handleMouseUp = () => {
        if (dragStart === null) return;
        if (dragOffset > 40) handlePrev();
        else if (dragOffset < -40) handleNext();
        setDragStart(null);
        setDragOffset(0);
    };

    const currentSlide = slidesData[currentRealIndex];

    return (
        <div className="unified-slide-container" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            <div className="bg-dynamic-wrap">
                {slidesData.map((slide, index) => (
                    <div
                        key={`bg-${slide.id}`}
                        className={`bg-frame ${currentRealIndex === index ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${slide.fullImg})` }}
                    />
                ))}
                <div className="bg-vignette"></div>
            </div>

            <div className="slide-interface">
                <header className="slide-top-bar">
                    <div className="slide-identity">
                        <h2>FIMO <span className="highlight">/ WORKS</span></h2>
                    </div>
                    <div className="slide-pagination">
                        {slidesData.map((_, index) => (
                            <div
                                key={index}
                                className={`pag-item ${currentRealIndex === index ? "active" : ""}`}
                                onClick={() => {
                                    const diff = index - currentRealIndex;
                                    setVirtualCurrent(virtualCurrent + diff);
                                }}
                            >
                                <span className="pag-num">{String(index + 1).padStart(2, '0')}</span>
                                <div className="pag-line"></div>
                            </div>
                        ))}
                    </div>
                </header>

                <main className="slide-viewport">
                    <div className="side-info">
                        <div className={`info-scrolled ${isAnimating ? "fade-out" : "fade-in"}`}>
                            <span className="brand-label">FIMO – Your brand, your style</span>
                            <h2 className="main-display-title">
                                {currentSlide.title.split(' ').map((word, i) => (
                                    <span key={i} className="title-word-mask">
                                        <span className="title-word">{word}</span>
                                    </span>
                                ))}
                            </h2>
                            <p className="summary-text">{currentSlide.description}</p>

                            <div className="detail-tags">
                                <span className="tag-item">PREMIUM COTTON</span>
                                <span className="tag-item">CLASSIC FIT</span>
                            </div>

                            <div className="slide-actions">
                                <button className="explore-btn">VIEW COLLECTION</button>
                                <button className="fav-btn">
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="side-visual">
                        <div className="stack-area" onMouseDown={handleMouseDown}>
                            {slidesData.map((slide, index) => {
                                // Shortest path circular logic
                                let diff = index - currentRealIndex;
                                if (diff > dataLength / 2) diff -= dataLength;
                                if (diff < -dataLength / 2) diff += dataLength;

                                // User wants 3 in background (previous) and next hidden.
                                // diff: 0 (active), -1, -2, -3 (back stack).
                                // diff: 1+ (forward/next) - should be hidden unless sliding in.

                                const isVisible = diff <= 0 && diff > -4;

                                // To make "+1" (next) slide in smoothly when navigating:
                                const isNext = diff === 1;

                                const style = {
                                    // Base position: diff 0 is center-right. Negative diffs stack left.
                                    transform: `translateX(${diff * 120 + dragOffset}px) scale(${1 + diff * 0.15}) translateZ(${diff * 40}px)`,
                                    opacity: 1 + diff * 0.3,
                                    zIndex: 100 + diff,
                                    filter: diff < 0 ? `blur(${Math.abs(diff) * 4}px) brightness(${1 + diff * 0.2})` : 'none',
                                    visibility: (isVisible || (isNext && isAnimating)) ? 'visible' : 'hidden',
                                    transition: isAnimating ? 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s, filter 0.5s' : 'none'
                                };

                                // Special entry/exit tuning for "next" image
                                if (isNext) {
                                    style.opacity = isAnimating ? 0.3 : 0;
                                    style.transform = `translateX(180px) scale(1.2) translateZ(80px)`;
                                    style.filter = 'blur(10px)';
                                }

                                if (diff < -3) {
                                    style.opacity = 0;
                                    style.transform = `translateX(-400px) scale(0.5)`;
                                }

                                return (
                                    <div
                                        key={slide.id}
                                        className={`visual-card ${diff === 0 ? 'center' : ''}`}
                                        style={style}
                                    >
                                        <div className="visual-card-frame">
                                            <img
                                                src={slide.fullImg}
                                                alt={slide.title}
                                                onDragStart={(e) => e.preventDefault()}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="footer-nav">
                            <div className="slide-progress">
                                <div className="p-bar"><div className="p-fill" style={{ width: `${((currentRealIndex + 1) / dataLength) * 100}%` }}></div></div>
                                <span className="p-count">{currentRealIndex + 1} / {dataLength}</span>
                            </div>
                            <div className="p-arrows">
                                <button className="p-btn" onClick={handlePrev} disabled={isAnimating}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                                </button>
                                <button className="p-btn" onClick={handleNext} disabled={isAnimating}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <div className="bottom-hint">
                <div className="v-line"></div>
                <span>FIMO COLLECTION</span>
            </div>
        </div>
    );
}

export default Slide;