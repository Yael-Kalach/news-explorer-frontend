import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import Union from '../../images/icons/Logout/Union.svg'
import UnionWhite from '../../images/icons/Logout/Union-white.svg'

function Navigation({ isHamburgerOpen, isLoggedIn, handleLogout, handleLoginClick, handleHamburgerClick }) {
  const { pathname } = useLocation();
  
    return (
      <nav className="nav">
        <ul className={`nav__menu ${isHamburgerOpen ? 'nav__menu_active' : ''} ${pathname === '/saved-news' ? 'nav__menu_theme_black ' : ''}`}>
          <li className="menu__item">
            <NavLink to="/" className={`nav__link ${pathname === '/saved-news' ? 'nav__link_theme_black ' : 'nav__link_marked-white'}`}>Home</NavLink>
          </li>
          { isLoggedIn ? 
          <li className="menu__item">
            <NavLink to="/saved-news" className={`nav__link ${pathname === '/saved-news' ? 'nav__link_theme_black  nav__link_marked-black' : ''}`}>Saved articles</NavLink>
          </li> 
          : '' }
          <li className="menu__item">
            { isLoggedIn ? 
              <button onClick={handleLogout} className={`nav__link-logout ${pathname === '/saved-news' ? 'nav__logout_theme_black ' : ''}`}>
                {localStorage.getItem('name')}
                <img alt='Logout icon' className='nav__link-logout_icon' src={pathname === '/saved-news' ? UnionWhite : Union} />
              </button>
            :
              <button onClick={handleLoginClick} className={`nav__link-login ${pathname === '/saved-news' ? 'nav__login_theme_black ' : ''}`}>
                Sign in
              </button>
            }
          </li>
          <div className={`nav__overlay ${isHamburgerOpen ? 'nav__overlay_active' : ''}`} onClick={handleHamburgerClick} />
        </ul>
        <div className={`hamburger ${isHamburgerOpen ? 'hamburger_active' : ''}`} onClick={handleHamburgerClick}>
          <span className={`hamburger__bar ${pathname === '/saved-news' ? 'hamburger__bar_theme_black' : ''}`}></span>
          <span className={`hamburger__bar ${pathname === '/saved-news' ? 'hamburger__bar_theme_black' : ''}`}></span>
        </div>
      </nav>
    );
  }
  
  export default Navigation;