import React from 'react';
import Navigation from '../Navigation/Navigation';
import { useLocation, NavLink } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Header({ handleLogout, handleLoginClick, isLoggedIn }) {
  const { pathname } = useLocation();
  const [isHamburgerOpen, setIsHamburgerOpen] = React.useState(false)
  const currentUser = React.useContext(CurrentUserContext);

  const handleHamburgerClick = () => {
    setIsHamburgerOpen(!isHamburgerOpen)
  }

  return( 
    <header className={`header ${pathname === '/saved-news' ? 'header_theme_black' : ''} ${isHamburgerOpen ? 'header-sticky' : ''} ${isHamburgerOpen && pathname === '/saved-news' ? 'header-sticky_theme_black' : ''}`} >
      <NavLink to="/" className={`header__logo ${pathname === '/saved-news' ? 'header__logo-black' : ''}`}>NewsExplorer</NavLink>
      <Navigation 
        handleHamburgerClick={handleHamburgerClick} 
        isLoggedIn={isLoggedIn} 
        isHamburgerOpen={isHamburgerOpen} 
        handleLogout={handleLogout} 
        handleLoginClick={handleLoginClick}
        username={currentUser.name}
        />
    </header>
  ) 
}

export default Header;