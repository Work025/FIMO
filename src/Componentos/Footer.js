import React from 'react';
import { NavLink } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import "../Styles/Footer.css";

function Footer() {
    const { t } = useGlobalContext();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-top">
                    <div className="footer-brand">
                        <h2 className="footer-logo">FIMO</h2>
                        <p className="footer-tagline">{t('footer_text')}</p>
                        <div className="social-links">
                            <a href="t.me/Fimo_shop_bot" className="social-icon">BOT</a>
                            <a href="#" className="social-icon">FB</a>
                            <a href="#" className="social-icon">TW</a>
                        </div>
                    </div>

                    <div className="footer-links-grid">
                        <div className="footer-nav-col">
                            <h4>MENU</h4>
                            <ul>
                                <li><NavLink to="/">{t('home')}</NavLink></li>
                                <li><NavLink to="/shop">{t('shop')}</NavLink></li>
                                <li><NavLink to="/blog">{t('blog')}</NavLink></li>
                            </ul>
                        </div>
                        <div className="footer-nav-col">
                            <h4>STUDIO</h4>
                            <ul>
                                <li><NavLink to="/make">{t('customize')}</NavLink></li>
                                <li><NavLink to="/card">{t('features')}</NavLink></li>
                            </ul>
                        </div>
                        <div className="footer-nav-col">
                            <h4>CONTACT</h4>
                            <p>support@fimo.com</p>
                            <p>Tashkent, Uzbekistan</p>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} FIMO. All rights reserved.</p>
                    <div className="footer-legal">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
