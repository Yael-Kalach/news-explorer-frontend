import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Preloader from '../Preloader/Preloader';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { register, signIn, checkToken } from '../../utils/auth'
import api from '../../utils/api';

function App() {
  const navigate = useNavigate();
  // loading states
  const [isLoading, setIsLoading] = useState(false)
  // popup states
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    name: '',
  });

  // user and registration states
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)

  // preloader mounting
  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  // popup functions
  function handleLoginClick() {
    setIsPopupOpen(!isPopupOpen)
  }

  function closeAllPopups(){
    setIsPopupOpen(false);
  }

  React.useEffect(() => {
    const closeByEscape = (event) => {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    };
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  // User info
  function setcurrentUserInfo() {
    api.getUserInformation()
      .then((res) => {
        if (res && res.user) {
          localStorage.setItem('name', res.user.name);
          setCurrentUser({ ...currentUser, ...res.user });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // registration related handlers
  function handleRegistration( password, email, username ) {
    register( password, email, username )
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log('400 - one of the fields was filled incorrectly');
        } 
        if (err.status === 401) {
          console.log("401 - the user with the specified email not found");
        }
        else {
          console.log(`Something is not working... Error: ${err}`);
        }
      })
  }

  function handleLogin( password, email ) {
    signIn( password, email )
      .then((response) => {
        if (response && response.token) {
          localStorage.setItem('jwt', response.token);
          setIsLoggedIn(true);
          setcurrentUserInfo();
          setIsPopupOpen(false);
        } else {
          throw new Error('No token recieved');
        }
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log('400 - one of the fields was filled incorrectly');
          } else {
            console.log(`Something is not working... Error: ${err}`);
          }
      })
  }

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("name");
    setValues(null);
    setCurrentUser({});
  }
  // Token mounting
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
      jwt &&
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
        });
  }, []);

  // Articles functionality

  const getSavedArticles = async () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      return await api.getSavedArticles();
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {
          isLoading ?
            <Preloader />
          :
            ''
        }
        <Header 
          handleLogout={handleLogout} 
          isLoggedIn={isLoggedIn} 
          handleLoginClick={handleLoginClick} 
          name={currentUser.name}
        />
        <main className="content">
          <Routes>
            <Route
              isLoggedIn={isLoggedIn}
              path='/saved-news'
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedNews 
                    getSavedArticles={getSavedArticles} 
                  />
                </ProtectedRoute>
              }
            />
            <Route exact path='/' element={<Main />} />
          </Routes>
          <PopupWithForm 
            isOpen={isPopupOpen} 
            onSubmitSignIn={handleLogin} 
            onSubmitSignUp={handleRegistration} 
            onClose={closeAllPopups} />
        </main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
