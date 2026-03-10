import React, { useState, Suspense } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import TshirtModel from "./TshirtModel";
import "../Styles/MakeStyle.css";

function MakeStyle() {
    const { addToCart, cartItems, t } = useGlobalContext();
    const [config, setConfig] = useState({
        color: "#ffffff",
        size: "M",
        fabric: "Premium Cotton",
    });
    const [autoRotate, setAutoRotate] = useState(true);
    const [promoInput, setPromoInput] = useState("");
    const [discount, setDiscount] = useState(0); // 0.1 for 10%

    // Auto discount based on potential cart size
    const potentialTotalItems = cartItems.length + 1;
    const autoDiscount = potentialTotalItems > 3 ? 0.15 : (potentialTotalItems === 3 ? 0.10 : 0);

    const colors = [
        { name: "Pure White", value: "#ffffff" },
        { name: "Onyx Black", value: "#1a1a1a" },
        { name: "Royal Navy", value: "#1e2b4d" },
        { name: "Sunset Orange", value: "#ff5e3a" },
        { name: "Sage Green", value: "#70806a" },
        { name: "Slate Grey", value: "#4a4a4a" },
    ];

    const sizes = ["S", "M", "L", "XL", "XXL"];
    const fabrics = ["Premium Cotton", "Organic Linen", "Eco-Blend"];

    const handleApplyPromo = () => {
        const upPromo = promoInput.trim().toUpperCase();
        if (upPromo === "AKMALZOR") {
            setDiscount(0.2); // 20%
            alert(t('discount_applied') || "20% Discount Applied!");
        } else if (upPromo === "F1M0") {
            setDiscount(0.5); // 50% in studio as $50 would be more than price
            alert("Studio Special: 50% Discount Applied!");
        } else {
            alert(t('invalid_promo') || "Invalid Promo Code");
        }
    };

    const handleClearPromo = () => {
        setPromoInput("");
        setDiscount(0);
    };

    const basePrice = 45.00;
    const finalDiscount = Math.max(discount, autoDiscount);
    const finalPrice = basePrice * (1 - finalDiscount);

    return (
        <div className="makestyle-page">
            <div className="makestyle-visual">
                <div className="visual-overlay">
                    <p className="subtitle">{t('custom_studio')}</p>
                    <h1 className="title">{t('design_yours')}</h1>
                </div>

                <div className="visual-controls">
                    <button
                        className={`control-tab ${autoRotate ? "active" : ""}`}
                        onClick={() => setAutoRotate(!autoRotate)}
                    >
                        {autoRotate ? t('pause_rotation') : t('auto_rotate')}
                    </button>
                </div>

                <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />

                    <Suspense fallback={null}>
                        <TshirtModel
                            color={config.color}
                        />
                        <Environment preset="city" />
                        <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2.5} far={4.5} />
                    </Suspense>

                    <OrbitControls
                        autoRotate={autoRotate}
                        autoRotateSpeed={4}
                        enableZoom={false}
                        enablePan={false}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                    />
                </Canvas>
            </div>

            <div className="makestyle-controls">
                <div className="control-section">
                    <div className="section-header">
                        <h3>{t('select_color')}</h3>
                        <span className="selected-value">{colors.find(c => c.value === config.color)?.name}</span>
                    </div>
                    <div className="color-options">
                        {colors.map((c) => (
                            <button
                                key={c.value}
                                className={`color-btn ${config.color === c.value ? "active" : ""}`}
                                style={{ backgroundColor: c.value }}
                                onClick={() => setConfig({ ...config, color: c.value })}
                                title={c.name}
                            />
                        ))}
                    </div>
                </div>

                <div className="control-group">
                    <div className="control-section">
                        <h3>{t('sizes_label').replace(':', '')}</h3>
                        <div className="size-selector">
                            {sizes.map((s) => (
                                <button
                                    key={s}
                                    className={`size-btn ${config.size === s ? "active" : ""}`}
                                    onClick={() => setConfig({ ...config, size: s })}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="control-section">
                        <h3>{t('fabric')}</h3>
                        <div className="fabric-selector-btns">
                            {fabrics.map((f) => (
                                <button
                                    key={f}
                                    className={`fabric-btn ${config.fabric === f ? "active" : ""}`}
                                    onClick={() => setConfig({ ...config, fabric: f })}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="control-section promo-section">
                    <div className="section-header">
                        <h3>{t('promo_code')}</h3>
                        {autoDiscount > 0 && <span className="auto-discount-tag">{(autoDiscount * 100)}% Multi-buy Active!</span>}
                    </div>
                    <div className="promo-input-wrapper">
                        <input
                            type="text"
                            placeholder={t('enter_code')}
                            value={promoInput}
                            onChange={(e) => setPromoInput(e.target.value)}
                            className="promo-input"
                            disabled={discount > 0}
                        />
                        {discount > 0 ? (
                            <button className="promo-btn clear" onClick={handleClearPromo}>{t('clear')}</button>
                        ) : (
                            <button className="promo-btn" onClick={handleApplyPromo}>{t('apply')}</button>
                        )}
                    </div>
                    {discount > 0 && <p className="promo-success">10% {t('discount_applied') || 'discount applied!'}</p>}
                    {potentialTotalItems < 3 && (
                        <p className="promo-hint">Buy {3 - potentialTotalItems} more for 10% off!</p>
                    )}
                </div>

                <div className="makestyle-footer">
                    <div className="price-info">
                        <span className="label">{t('estimated_total')}</span>
                        <div className="price-row">
                            <span className="currency">$</span>
                            <span className="value">{finalPrice.toFixed(2)}</span>
                            {finalDiscount > 0 && <span className="original-price">${basePrice.toFixed(2)}</span>}
                        </div>
                    </div>
                    <button
                        className="add-bag-btn"
                        onClick={() => addToCart({
                            id: `custom-${Date.now()}`,
                            title: "Custom Design",
                            about: `${config.color} | ${config.size} | ${config.fabric}`,
                            price: finalPrice,
                            img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=300&auto=format&fit=crop",
                            config: config
                        })}
                    >
                        <span>{t('confirm_design')}</span>
                        <div className="btn-icon">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MakeStyle;