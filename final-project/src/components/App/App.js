import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Preloader from '../Preloader/Preloader';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { register, signIn, checkToken } from '../../utils/auth'

function App() {
  const navigate = useNavigate();
  // loading states
  const [isLoading, setIsLoading] = useState(false)
  // popup states
  const [isPopupOpen, setIsPopupOpen] = useState(false)
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

  // registration related handlers
  function handleRegistration(password, email, username) {
    register(password, email, username)
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

  function handleLogin(password, email) {
    signIn(password, email)
      .then((response) => {
          localStorage.setItem("jwt", response.token);
          setCurrentUser({ ...currentUser, data: { email: email } });
          setIsLoggedIn(true);
          navigate('/saved-news');
          console.log(response);
          console.log(`Logged in successfully: ${currentUser}`);
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
    setCurrentUser({});
    localStorage.removeItem("jwt");
    console.log(`Logged out successfully: ${localStorage}`);
  }
  // Token mounting
  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
      jwt &&
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser(res);
            console.log(res)
          }
          console.log(res)
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {
          isLoading ?
            <Preloader />
          :
            ''
        }
        <Header login={handleLoginClick} />
        <main className="content">
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route exact path='/saved-news' element={<SavedNews />} />
          </Routes>
          <PopupWithForm 
            isOpen={isPopupOpen} 
            handleSubmitSignIn={handleLogin} 
            handleSubmitSignUp={handleRegistration} 
            onClose={closeAllPopups} />
        </main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
