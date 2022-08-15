import React from 'react';
import Navigation from '../Navigation/Navigation';
import { useLocation } from 'react-router-dom';

function Header() {
  const { pathname } = useLocation();
  return( 
    <header className={`header ${pathname === '/saved-news' ? 'header_white' : ''}`}> 
      <h2 className="header__logo">NewsExplorer</h2> 
      <Navigation />
    </header> 

  ) 
}

export default Header;