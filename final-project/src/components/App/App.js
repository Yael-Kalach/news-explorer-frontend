import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  return (
    <CurrentUserContext.Provider>
      <div className="app">
        <Header />
        <main className="content">
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route loggedIn={isLoggedIn} path='/' 
              element = {<ProtectedRoute loggedIn={isLoggedIn} component={SavedNews} > 
              </ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
