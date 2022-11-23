import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Route, Routes, useLocation } from 'react-router-dom';
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
  // Token
  const [token, setToken] = React.useState(localStorage.getItem("jwt"))
  // Articles
  const [savedArticles, setsavedArticles] = React.useState([]);
  // news card states
  const [isMarked, setIsMarked] = React.useState(false);
  const { pathname } = useLocation();


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

  // registration related handlers
  function handleRegistration({ email, password, name }) {
    register({ email, password, name })
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
    .finally(() => {
      setIsTooltipPopupOpen(true);
      setIsRegistrationPopupOpen(!isRegistrationPopupOpen);
    })
  };

  function handleLogin( email, password ) {
    signIn( email, password )
      .then((response) => {
        if (response && response.token) {
          localStorage.setItem('jwt', response.token);
          setIsLoggedIn(true);
          setIsLoginPopupOpen(false);
          setToken(response.token)
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

  // Token mounting
  React.useEffect(() => {
    if (!token) return
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          localStorage.setItem('name', userData.name);
          handleUpdateList()
          setIsLoggedIn(true)
        })
        .catch((err) => {
          console.log(err);
          setIsLoggedIn(false);
        });
  }, [token]);

  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("name");
    localStorage.removeItem("jwt");
    setsavedArticles([]);
    setCurrentUser({});
  };
  
  // Articles functionality
  const getSavedArticles = async () => {
    if (token) {
      return await api.getSavedArticles();
    }
  };

  const handleSaveArticle = (articleData) => {
    api.saveArticles(articleData).then((articleData) => {
      if (articleData){
        setsavedArticles([...savedArticles, articleData])
        return articleData
      }
    })
  };

  function formatDate(date) {
    return new Date(date).toLocaleDateString('en-us', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  function handleDelete(id) {
    console.log(savedArticles)
    console.log(id)
    api.deleteArticle(id).then((article) => {
      if (article) {
        const newArticles = [...savedArticles].filter((a) => a._id !== id)
        setsavedArticles(newArticles)
        console.log(newArticles)
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  function handleUpdateList() {
    getSavedArticles()
      .then((res) => {
        setsavedArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
                    savedArticles={savedArticles}
                    setsavedArticles={setsavedArticles}
                  >
                    {savedArticles.length > 0 &&
                    savedArticles.map((newsCard, index) => {
                      return (<NewsCard
                        key={index}
                        cardKeyword={newsCard.keyword}
                        cardTitle={newsCard.title}
                        cardDescription={newsCard.text}
                        cardUrl={newsCard.link}
                        cardUrlToImage={newsCard.image}
                        cardPublishedAt={newsCard.date}
                        cardSource={newsCard.source}
                        _id={newsCard._id}
                        handleUpdateList={handleUpdateList}
                        isLoggedIn={isLoggedIn}
                        setsavedArticles={setsavedArticles}
                        handleSaveArticle={handleSaveArticle}
                        handleDelete={handleDelete}
                        formatDate={formatDate}
                        token={token}
                      />)
                    })} 
                  </SavedNews>
                </ProtectedRoute>
              }
            />
            <Route 
              exact path='/' 
              element={
              <Main 
                handleSaveArticle={handleSaveArticle} 
                isLoggedIn={isLoggedIn}
                handleDelete={handleDelete}
                formatDate={formatDate}
                token={token}
              />} 
            />
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
