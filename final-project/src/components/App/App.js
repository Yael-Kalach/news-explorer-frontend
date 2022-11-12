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
  const [currentId, setCurrentId] = React.useState(_id);
  const [cardTitle, setCardTitle] = React.useState();
  const [cardDescription, setCardDescription] = React.useState();
  const [cardSource, setCardSource] = React.useState();
  const [cardUrl, setCardUrl] = React.useState();
  const [cardPublishedAt, setCardPublishedAt] = React.useState();
  const [cardUrlToImage, setCardUrlToImage] = React.useState();
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
          getSavedArticles()
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
    localStorage.setItem("savedArticles", [{}]);
    setCurrentUser({});
  };
  
  // Articles functionality
  const getSavedArticles = async () => {
    if (token) {
      return await api.getSavedArticles();
    }
  };

  const handleSaveArticle = (article) => {
    api.saveArticles(article).then((article) => {
      if (article) {
        setsavedArticles([...savedArticles, article])
      }
    })
  };

  function handleCardSave(event) {
    const userLoggedIn = token !== null;
    if (userLoggedIn && pathname === '/' && isMarked === false) {
      const articleData = {
        keyword: localStorage.getItem('currentKeyword'),
        title: cardTitle,
        text: cardDescription,
        date: cardPublishedAt,
        source: cardSource,
        link: cardUrl,
        image: cardUrlToImage,
      };
      handleSaveArticle(articleData).then((newArticle) => {
        setCurrentId(newArticle._id);
        setIsMarked(true);
      })
      .catch((err) => {
        console.log(err)
      });
    } else if (userLoggedIn && pathname === '/' && isMarked === true) {
      api.deleteArticle(currentId)
        .then((res) => {
          setIsMarked(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  
  function handleDelete(id) {
    api.deleteArticle(id).then((article) => {
      if (article) {
        const newArticles = [...savedArticles].filter((a) => a._id !== id)
        setsavedArticles(newArticles)
      }
    })
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
                    isLoggedIn={isLoggedIn}
                    savedArticles={savedArticles}
                    setsavedArticles={setsavedArticles}
                    handleUpdateList={handleUpdateList}
                    handleSaveArticle={handleSaveArticle}
                    handleDelete={handleDelete}
                    handleCardSave={handleCardSave}
                  >
                    {savedArticles.length > 0 &&
                    savedArticles.map((newsCard, index) => (
                      <NewsCard
                        key={index}
                        cardKeyword={newsCard.keyword}
                        cardTitle={newsCard.title}
                        cardDescription={newsCard.text}
                        cardUrl={newsCard.link}
                        cardUrlToImage={newsCard.image}
                        cardPublishedAt={newsCard.date}
                        cardSource={newsCard.source}
                        cardOwner={newsCard.owner}
                        _id={newsCard._id}
                        handleUpdateList={handleUpdateList}
                        isLoggedIn={isLoggedIn}
                        setsavedArticles={setsavedArticles}
                        handleSaveArticle={handleSaveArticle}
                        handleDelete={handleDelete}
                        isMarked={isMarked}
                        currentId={currentId}
                      />
                    ))} 
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
                handleCardSave={handleCardSave}
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
