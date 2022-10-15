import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Route, Routes } from 'react-router-dom';
import { register, signIn, checkToken } from '../../utils/auth'
import RegistrationPopup from '../RegistrationPopup/RegistrationPopup'
import LoginPopup from '../LoginPopup/LoginPopup';
import TooltipPopup from '../TooltipPopup/TooltipPopup';
import api from '../../utils/MainApi';

function App() {
  // loading states
  const [isLoading, setIsLoading] = React.useState(false);
  // popup states
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = React.useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
  // user and registration states
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // preloader mounting
  React.useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, []);

  // popup functions

  function handleLoginPopupClick() {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  function closeAllPopups(){
    setIsRegistrationPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsTooltipPopupOpen(false);
  };

  const togglePopupPurpose = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
    setIsRegistrationPopupOpen(!isRegistrationPopupOpen);
  };

  function handleRedircetLogin(event) {
    closeAllPopups();
    setIsLoginPopupOpen(true);
  };

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
  function handleRegistration({ email, password, name }) {
    console.log({ email, password, name })
    register({ email, password, name })
    .then((res) => {
      setIsTooltipPopupOpen(true);
    })
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
  };

  function handleLogin( email, password ) {
    signIn( email, password )
      .then((response) => {
        if (response && response.token) {
          localStorage.setItem('jwt', response.token);
          setIsLoggedIn(true);
          setcurrentUserInfo();
          setIsLoginPopupOpen(false);
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
  };

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    localStorage.removeItem("name");
    setCurrentUser({});
  };

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
          handleLoginClick={handleLoginPopupClick}
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
                    isLoggedIn={isLoggedIn}
                  />
                </ProtectedRoute>
              }
            />
            <Route exact path='/' element={<Main isLoggedIn={isLoggedIn} />} />
          </Routes>
          <RegistrationPopup 
            isOpen={isRegistrationPopupOpen}
            onSubmitSignUp={handleRegistration} 
            onClose={closeAllPopups}
            toggleFormPurpose={togglePopupPurpose}
            />
          <LoginPopup 
            isOpen={isLoginPopupOpen}
            onSubmitSignin={handleLogin} 
            onClose={closeAllPopups}
            toggleFormPurpose={togglePopupPurpose}
            />
          <TooltipPopup
            isOpen={isTooltipPopupOpen}
            onClose={closeAllPopups}
            handleToolTipToggle={handleRedircetLogin}
            />
        </main>
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
