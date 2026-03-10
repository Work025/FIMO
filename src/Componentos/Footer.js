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
                            <a href="https://t.me/Fimo_shop_bot" target="_blank" rel="noreferrer" className="social-icon" title="Telegram Bot">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                            </a>
                            <a href="https://instagram.com/fimo" target="_blank" rel="noreferrer" className="social-icon" title="Instagram">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                            </a>
                            <a href="https://youtube.com/@fimo" target="_blank" rel="noreferrer" className="social-icon" title="YouTube">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                            </a>
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
                        <a href="#!">Privacy Policy</a>
                        <a href="#!">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
