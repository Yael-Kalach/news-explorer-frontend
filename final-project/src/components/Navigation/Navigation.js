import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import Union from '../../images/icons/Logout/Union.svg'

function Navigation( props ) {
  const { pathname } = useLocation();
  
    return (
      <nav className="nav">
        <ul className={`nav__menu ${props.isHamburgerOpen ? 'nav__menu_active' : ''} ${pathname === '/saved-news' ? 'nav__menu_theme_black ' : ''}`}>
          <li className="menu__item">
            <NavLink to="/" className={`nav__link ${pathname === '/saved-news' ? 'nav__link_theme_black ' : 'nav__link_marked-white'}`}>Home</NavLink>
          </li>
          <li className="menu__item">
            <NavLink to="/saved-news" className={`nav__link ${pathname === '/saved-news' ? 'nav__link_theme_black  nav__link_marked-black' : ''}`}>Saved articles</NavLink>
          </li>
          <li className="menu__item">
            <button onClick={props.login} className={`nav__link-login ${pathname === '/saved-news' ? 'nav__login_theme_black ' : ''}`}>
            {pathname === '/' ? 'Sign in' : 'Elise'}
            {pathname === '/' ? '' : <img alt='Logout icon' className='nav__link-logout_icon' src={Union} />}
            </button>
          </li>
          <div className={`nav__overlay ${props.isHamburgerOpen ? 'nav__overlay_active' : ''}`} onClick={props.handleHamburgerClick} />
        </ul>
        <div className={`hamburger ${props.isHamburgerOpen ? 'hamburger_active' : ''}`} onClick={props.handleHamburgerClick}>
          <span className={`hamburger__bar ${pathname === '/saved-news' ? 'hamburger__bar_theme_black' : ''}`}></span>
          <span className={`hamburger__bar ${pathname === '/saved-news' ? 'hamburger__bar_theme_black' : ''}`}></span>
        </div>
      </nav>
    );
  }
  
  export default Navigation;