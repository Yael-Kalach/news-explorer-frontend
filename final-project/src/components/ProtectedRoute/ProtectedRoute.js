import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, children, ...props }) => {

  return isLoggedIn ? children : <Navigate {...props} to={'/'} />;
  
};

export default ProtectedRoute;