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
                            <a href="https://t.me/FIMOshopuz" target="_blank" rel="noreferrer" className="social-icon" title="Telegram Channel">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.13 6.44l-11.43 14L2 14.12l1.37-1.12 6.33 6.33 10.06-12.89z"/></svg>
                            </a>
                            <a href="https://www.facebook.com/share/14X4Y3KNXQV/" target="_blank" rel="noreferrer" className="social-icon" title="Facebook">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                            </a>
                            <a href="https://www.instagram.com/fimo.offical?igsh=eWlvNHhoZTV6OWNn" target="_blank" rel="noreferrer" className="social-icon" title="Instagram">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                            </a>
                            <a href="https://www.youtube.com/@fimo_shop" target="_blank" rel="noreferrer" className="social-icon" title="YouTube">
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
