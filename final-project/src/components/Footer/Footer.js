import React from 'react';
import { NavLink } from 'react-router-dom';
import github from '../../images/icons/Footer/github.svg'
import linkedin from '../../images/icons/Footer/linkedin.svg'

function Footer() {
    return (
      <footer className="footer">
        <p className="footer__copyright">© 2022 Supersite, Powered by News API</p>
        <nav className="footer__nav">
          <div className="footer__nav_link-container">
            <NavLink to="/" className="footer__nav_link">Home</NavLink>
            <a href='https://practicum.com/en-isr/' target="_blank" rel='noreferrer' className="footer__nav_link">Practicum</a>
          </div>
          <div className="footer__nav_icon-container">
            <a href='https://github.com/Yael-Kalach' target="_blank" rel='noreferrer' className="footer__nav_external footer__nav_link-github">
              <img className="footer__nav_external-icon" src={github} alt='Github icon'/>
            </a>
            <a href='https://www.linkedin.com/in/yael-kalach/' target="_blank" rel='noreferrer' className="footer__nav_external footer__nav_link-linkedin">
              <img className="footer__nav_external-icon" src={linkedin} alt='Github icon'/>
            </a>
          </div>
        </nav>
      </footer>
    );
  }
  
  export default Footer;