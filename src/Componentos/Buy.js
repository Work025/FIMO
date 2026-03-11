import React, { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import "../Styles/Buy.css";

const Buy = () => {
    const { t, boughtItems, toggleBuy, clearBought, user } = useGlobalContext();
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [form, setForm] = useState({
        name: user?.name || "",
        phone: "",
        makhalla: "",
        house: "",
        apartment: "",
        distance: 2, // Default distance in km
        payment: "account",
        comment: ""
    });

    const [promo, setPromo] = useState("");
    const [discount, setDiscount] = useState(0);

    /* PRICE CALCULATION */
    const basePrices = boughtItems.map(item => item.price || 12); // Updated to $12
    const total = basePrices.reduce((a, b) => a + b, 0);

    // Multi-buy discount
    const multiDiscountRate = boughtItems.length > 3 ? 0.15 : (boughtItems.length === 3 ? 0.10 : 0);
    const multiDiscount = total * multiDiscountRate;

    // Promo discount
    const promoDiscount = discount;

    const deliveryFee = form.distance > 3 ? 15 : 0;
    const finalPrice = total - multiDiscount - promoDiscount + deliveryFee;

    /* PROMO CODE */
    const applyPromo = () => {
        const upPromo = promo.trim().toUpperCase();
        if (upPromo === "AKMALZOR") {
            setDiscount(total * 0.20);
            alert("20% discount applied!");
        } else if (upPromo === "F1M0") {
            setDiscount(50);
            alert("$50 discount applied!");
        } else {
            alert("Invalid promo code");
        }
    };

    /* FORM CHANGE */
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    /* CONFIRM ORDER */
    const confirmOrder = () => {
        if (!form.name || !form.phone || !form.makhalla) {
            alert("Please fill necessary delivery fields");
            return;
        }

        if (form.payment === "account" && !user) {
            alert("Please login to pay with your account!");
            return;
        }

        setOrderSuccess(true);
        setTimeout(() => {
            clearBought();
            setCheckoutOpen(false);
            setOrderSuccess(false);
            alert("Order Confirmed! Your package will arrive in approx. 45-60 minutes.");
        }, 2000);
    };

    if (boughtItems.length === 0) return null;

    return (
        <>
            <section className="buy-scroller-section">
                <div className="buy-scroller-header">
                    <h2 className="buy-scroller-title">
                        {t("your_orders") || "Your"}
                        <span className="highlight-text"> {t("selection") || "Selection"}</span>
                    </h2>
                    <span className="buy-count-badge">
                        {boughtItems.length} {t("items") || "items"}
                    </span>
                    <button className="buy-clear-btn" onClick={clearBought}>
                        {t("clear_all") || "Clear"}
                    </button>
                </div>

                <div className="buy-horizontal-grid">
                    {boughtItems.map(item => (
                        <div className="buy-mini-card" key={item.id}>
                            <div className="mini-card-img-wrap">
                                <img src={item.url || item.img} alt={item.title} />
                                <button
                                    className="mini-remove-btn"
                                    onClick={() => toggleBuy(item)}
                                >
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>

                            <div className="mini-card-details">
                                <h4>{item.title}</h4>
                                <p>#{item.number}</p>
                            </div>
                        </div>
                    ))}

                    {/* CHECKOUT CARD */}
                    <div
                        className="buy-checkout-card"
                        onClick={() => setCheckoutOpen(true)}
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        </svg>
                        <button className="mini-checkout-btn">
                            {t("checkout") || "Checkout"}
                        </button>
                    </div>
                </div>

                <div className="buy-summary-bar fade-up">
                    <div className="summary-item">
                        <span>Items: {boughtItems.length}</span>
                    </div>
                    {multiDiscount > 0 && (
                        <div className="summary-item discount">
                            <span>Discount: -${multiDiscount.toFixed(2)}</span>
                        </div>
                    )}
                    <div className="summary-item final">
                        <span>Total: ${(total - multiDiscount).toFixed(2)}</span>
                    </div>
                </div>
            </section>

            {/* Brand Info & Map in Checkout Page */}
            <section className="buy-brand-section">
                <div className="buy-brand-content fade-up">
                    <div className="buy-brand-text">
                        <span className="mini-badge">OUR STORY</span>
                        <h3>FIMO - Your brand, your style.</h3>
                        <p>{t('main_desc')}</p>
                    </div>
                    <div className="buy-brand-map">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11984.747197022!2d69.240562!3d41.311081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a99769216563ef!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                            width="100%"
                            height="250"
                            style={{ border: 0, borderRadius: '20px' }}
                            allowFullScreen=""
                            loading="lazy"
                            title="FIMO Pickup Point"
                        ></iframe>
                        <div className="map-overlay-text">
                            <span>Pickup Point: Tashkent City Centre</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CHECKOUT MODAL */}
            {checkoutOpen && (
                <div className="checkout-modal">
                    <div className="checkout-box">
                        <h3>Checkout</h3>
                        {/* PRODUCTS */}

                        <div className="checkout-products-list">
                            {boughtItems.map((item, idx) => (
                                <div key={idx} className="checkout-item-row fade-up">
                                    <div className="item-row-img">
                                        <img src={item.url || item.img} alt={item.title} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=300&auto=format&fit=crop" }} />
                                    </div>
                                    <div className="item-row-info">
                                        <h4>{item.title}</h4>
                                        <p>{item.category || "Original Style"}</p>
                                    </div>
                                    <div className="item-row-price">
                                        <span>${(item.price || 12).toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="checkout-form-grid">
                            <div className="form-group-full">
                                <label>Recipient Name</label>
                                <input
                                    type="text"
                                    placeholder="Full Name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="+998 -- --- ----"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Makhalla / Area</label>
                                <input
                                    type="text"
                                    placeholder="Enter makhalla name"
                                    name="makhalla"
                                    value={form.makhalla}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>House / Building</label>
                                <input
                                    type="text"
                                    placeholder="House #"
                                    name="house"
                                    value={form.house}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Apartment / Door</label>
                                <input
                                    type="text"
                                    placeholder="Apt #"
                                    name="apartment"
                                    value={form.apartment}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group-full distance-box">
                                <label>Delivery Distance: {form.distance} km {form.distance <= 3 ? "(Free!)" : "($15 fee)"}</label>
                                <input
                                    type="range"
                                    min="1"
                                    max="50"
                                    name="distance"
                                    value={form.distance}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group-full">
                                <label>Additional Notes / Delivery Instructions</label>
                                <textarea
                                    placeholder="Tell us more (e.g., door code, specific landmark, or preferences)"
                                    name="comment"
                                    value={form.comment}
                                    onChange={handleChange}
                                    className="checkout-textarea"
                                    rows="3"
                                />
                                <small className="input-hint">Specify details to help our courier find you faster.</small>
                            </div>
                        </div>

                        {/* PAYMENT */}

                        <div className="payment-options-new">
                            <div
                                className={`pay-card ${form.payment === 'account' ? 'active' : ''}`}
                                onClick={() => setForm({ ...form, payment: 'account' })}
                            >
                                <div className="pay-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                </div>
                                <div className="pay-info">
                                    <span>Account Balance</span>
                                    <small>Pay with linked FIMO account</small>
                                </div>
                                {form.payment === 'account' && <div className="pay-check">✓</div>}
                            </div>

                            <div
                                className={`pay-card ${form.payment === 'cash' ? 'active' : ''}`}
                                onClick={() => setForm({ ...form, payment: 'cash' })}
                            >
                                <div className="pay-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" /></svg>
                                </div>
                                <div className="pay-info">
                                    <span>Cash on Delivery</span>
                                    <small>Pay at your doorstep</small>
                                </div>
                                {form.payment === 'cash' && <div className="pay-check">✓</div>}
                            </div>
                        </div>


                        {/* PROMO CODE */}

                        <div className="promo-box">
                            <input
                                type="text"
                                placeholder="Promo Code"
                                value={promo}
                                onChange={(e) => setPromo(e.target.value)}
                            />
                            <button onClick={applyPromo}>
                                Apply
                            </button>
                        </div>

                        <div className="order-summary-box">
                            <div className="summary-line">
                                <span>Items Subtotal</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            {multiDiscount > 0 && (
                                <div className="summary-line discount">
                                    <span>Multi-buy Discount ({(multiDiscountRate * 100).toFixed(0)}%)</span>
                                    <span>-${multiDiscount.toFixed(2)}</span>
                                </div>
                            )}
                            {promoDiscount > 0 && (
                                <div className="summary-line discount">
                                    <span>Promo Code</span>
                                    <span>-${promoDiscount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="summary-line">
                                <span>Delivery Fee</span>
                                <span>{deliveryFee === 0 ? "FREE" : `$${deliveryFee}`}</span>
                            </div>
                            <div className="summary-total-final">
                                <span>Estimated Total</span>
                                <span>${finalPrice.toFixed(2)}</span>
                            </div>
                            <div className="delivery-time-hint">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                Est. Delivery: 45 - 60 min
                            </div>
                        </div>

                        {/* ACTIONS */}

                        <div className="checkout-actions">
                            <button onClick={() => setCheckoutOpen(false)}>
                                Cancel
                            </button>

                            <button
                                className={`confirm-order-btn ${orderSuccess ? 'success' : ''}`}
                                onClick={confirmOrder}
                                disabled={orderSuccess}
                            >
                                {orderSuccess ? "Processing..." : (form.payment === 'account' ? "Proceed with Account Pay" : "Place Cash Order")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Buy;