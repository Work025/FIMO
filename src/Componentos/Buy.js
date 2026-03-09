import React, { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import "../Styles/Buy.css";

const Buy = () => {
    const { t, boughtItems, toggleBuy, clearBought } = useGlobalContext();
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        address: "",
        payment: "cash"
    });

    const [promo, setPromo] = useState("");
    const [discount, setDiscount] = useState(0);

    /* PRICE CALCULATION */
    const prices = boughtItems.map(() => 120);
    const total = prices.reduce((a, b) => a + b, 0);
    const finalPrice = total - discount;

    /* PROMO CODE */
    const applyPromo = () => {

        if (promo === "AKMALZOR") {
            setDiscount(total * 0.20);
            alert("20% discount applied");
        }

        else if (promo === "F1M0") {
            setDiscount(50);
            alert("50$ discount applied");
        }

        else {
            alert("Invalid promo code");
        }
    };

    /* FORM CHANGE */
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    /* CONFIRM ORDER */
    const confirmOrder = () => {
        if (!form.name || !form.phone || !form.address) {
            alert("Please fill all fields");
            return;
        }

        if (form.payment === "card") {
            alert("Card payment successful!");
        }

        if (form.payment === "cash") {
            alert("Order created! Pay at pickup point.");
        }
        clearBought();
        setCheckoutOpen(false);
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
            </section>

            {/* CHECKOUT MODAL */}
            {checkoutOpen && (
                <div className="checkout-modal">
                    <div className="checkout-box">
                        <h3>Checkout</h3>
                        {/* PRODUCTS */}

                        <div className="checkout-products">
                            {boughtItems.map(item => (
                                <div key={item.id} className="checkout-item">
                                    <img src={item.url || item.img} alt={item.title} />
                                    <span>{item.title}</span>
                                </div>
                            ))}
                        </div>

                        {/* USER INFO */}

                        <input
                            type="text"
                            placeholder="Full Name"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />

                        <input
                            type="tel"
                            placeholder="Phone"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />

                        <input
                            type="text"
                            placeholder="Delivery Address"
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                        />

                        {/* PAYMENT */}

                        <div className="payment-methods">
                            <label>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    checked={form.payment === "card"}
                                    onChange={handleChange}
                                />
                                Card Payment
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cash"
                                    checked={form.payment === "cash"}
                                    onChange={handleChange}
                                />
                                Cash at Pickup Point
                            </label>
                        </div>

                        {/* CARD PAYMENT INPUTS */}

                        {form.payment === "card" && (
                            <div className="card-payment">
                                <input placeholder="Card Holder Name" />
                                <input placeholder="Card Number" />
                                <div className="card-row">
                                    <input placeholder="MM/YY" />
                                    <input placeholder="CVV" />
                                </div>
                            </div>
                        )}

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

                        {/* ORDER SUMMARY */}

                        <div className="order-summary">
                            <p>Items: {boughtItems.length}</p>
                            <p>Total: ${total}</p>
                            <p>Discount: -${discount}</p>
                            <h3>Final: ${finalPrice}</h3>
                        </div>

                        {/* ACTIONS */}

                        <div className="checkout-actions">
                            <button onClick={() => setCheckoutOpen(false)}>
                                Cancel
                            </button>

                            <button onClick={confirmOrder}>
                                Confirm Order
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Buy;