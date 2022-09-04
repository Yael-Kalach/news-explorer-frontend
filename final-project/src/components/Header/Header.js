import React from 'react';
import Navigation from '../Navigation/Navigation';
import { useLocation, NavLink } from 'react-router-dom';

function Header( props ) {
  const { pathname } = useLocation();
  const [isHamburgerOpen, setIsHamburgerOpen] = React.useState(false)

  const handleHamburgerClick = () => {
    setIsHamburgerOpen(!isHamburgerOpen)
  }

  return( 
    <header className={`header ${pathname === '/saved-news' ? 'header_black' : ''} ${isHamburgerOpen ? 'header_sticky' : ''}`} >
      <NavLink to="/" className={`header__logo ${pathname === '/saved-news' ? 'header__logo_black' : ''}`}>NewsExplorer</NavLink>
      <Navigation handleHamburgerClick={handleHamburgerClick} isHamburgerOpen={isHamburgerOpen} login={props.login} />
    </header>
  ) 
}

export default Header;