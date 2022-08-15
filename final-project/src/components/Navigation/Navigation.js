import React from 'react';
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function Navigation(props) {
  const { pathname } = useLocation();
  const currentUser = React.useContext(CurrentUserContext);
    return (
      <div className="Navigation">
        <p className="nav__link">Home</p>
        {(props.isLoggedIn && pathname === "/") ? ( 
          <button onClick={props.logout} className="nav__link_logout">{currentUser.name}</button>)  
          : ''} 
      </div>
    );
  }
  
  export default Navigation;