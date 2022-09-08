import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Preloader from '../Preloader/Preloader';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { Route, Routes } from 'react-router-dom';
function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // preloader mounting

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 5000)
  }, [])

  // popup functions
  function handleLoginClick() {
    setIsPopupOpen(!isPopupOpen)
  }

  function closeAllPopups(){
    setIsPopupOpen(false);
  }

  return (
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
        <PopupWithForm isOpen={isPopupOpen} onClose={closeAllPopups} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
