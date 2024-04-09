import React from 'react';
import './Footer.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faInstagram, faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <div class="footer-basic">
        <footer>
            <div class="social">
                
                <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#"><FontAwesomeIcon icon={faWhatsapp} /></a>
                <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
            </div>
            <ul class="list-inline">
                <li class="list-inline-item"><a href="/">Home</a></li>
                <li class="list-inline-item"><a href="/contact">Contact</a></li>
                <li class="list-inline-item"><a href="/about">About</a></li>
                <li class="list-inline-item"><a href="/registre">Register</a></li>
                
               
                <li class="list-inline-item"><a href="mailto:contact@Scoutify.com">contact@Scoutify.com</a></li>
            </ul>
            <p class="copyright"> Copyright © 2024 Scoutify</p>
        </footer>
    </div>
  );
}

export default Footer;
