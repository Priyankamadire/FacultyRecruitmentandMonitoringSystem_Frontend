import React from 'react';
// import { BiInstagram, BiGithub, BiLinkedin, BiPhone } from 'react-icons/bi';
import './Footer.css'
const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                {/* Logos */}
                <div className="footer-logos">
                    
                    <a className="bi bi-linkedin" href="https://www.linkedin.com/in/priyanka-madire-9679b426b/"></a>
                     <a className="bi bi-github" href="https://github.com/Priyankamadire"></a>
                    <a className="bi bi-envelope-at-fill" href="#"></a>
                    <a className="bi bi-twitter" href="https://twitter.com/MadirePriyanka"></a>
                   
                    
                </div>
            </div>
        </footer>
    );
};

export default Footer;
