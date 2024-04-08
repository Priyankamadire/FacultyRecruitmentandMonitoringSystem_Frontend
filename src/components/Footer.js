import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Logos */}
                <div className="footer-logos">
                    <a className="bi bi-linkedin" href="https://www.linkedin.com/in/priyanka-madire-9679b426b/"></a>
                    <a className="bi bi-github" href="https://github.com/Priyankamadire"></a>
                    <a className="bi bi-twitter" href="https://twitter.com/MadirePriyanka"></a>
                </div>
                {/* Text */}
                <p className="footer-text">Madire Priyanka</p>
            </div>
        </footer>
    );
};

export default Footer;
