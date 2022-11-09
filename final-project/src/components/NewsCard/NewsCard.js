import React from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../utils/MainApi';

function NewsCard({ 
  cardKeyword, 
  cardTitle, 
  cardDescription, 
  cardPublishedAt, 
  cardSource, 
  cardUrl, 
  cardUrlToImage, 
  _id, 
  handleUpdateList,
  isLoggedIn
  }) {
  // news card states
  const [isMarked, setIsMarked] = React.useState(false);
  const [currentId, setCurrentId] = React.useState(_id);
  const [token, setToken] = React.useState(localStorage.getItem("jwt"))

  const { pathname } = useLocation();

  function formatDate(date) {
    const dateArr = date.toString().slice(0, 10).split('-', 3);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    dateArr[1] = monthNames[parseInt(dateArr[1]) - 1];
    return `${dateArr[1]} ${dateArr[2]}, ${dateArr[0]}`;
  }

  function handleDelete(card) {
    setIsMarked(true);
    const isLoggedIn = token !== null;
    if (isLoggedIn && pathname === '/saved-news' && isMarked === false) {
      api.deleteArticle(currentId)
        .then((res) => {
          const savedArticles = JSON.parse(
            localStorage.getItem('savedArticles')
          );

          const updatedSavedArticles = savedArticles.filter(
            (obj) => obj._id !== currentId
          );
          handleUpdateList(updatedSavedArticles);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  const handleSaveArticle = async (articleData) => {
    const newArticle = await api.saveArticles(articleData);
    return newArticle
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

  const cardLikeButtonClassName = (
    `news-card__button 
    ${pathname === '/saved-news' ? 'news-card__button_type_trash' : 'news-card__button_type_bookmark'}
    ${pathname === '/' && isMarked ? 'news-card__button_type_bookmarked' : ''}`
  );

    return(
      <article className="news-card" id={_id || currentId}>
        <div className="news-card__top">
          <p className={`news-card__keyword ${pathname === '/' ? '' : 'news-card__keyword_visible'}`} >{cardKeyword}</p>
          <div className="news-card__icon">
            <p className="news-card__tooltip">{isLoggedIn && pathname === "/" ? "Sign in to save" : "Remove from saved"}</p>
            {pathname === '/' ? <button type="button" aria-label="bookmark" className={cardLikeButtonClassName} onClick={handleCardSave} /> 
            : <button type="trash" aria-label="bookmark" className={cardLikeButtonClassName} onClick={handleDelete} />}
          </div>
        </div>
        <img className="news-card__image" src={cardUrlToImage} alt={cardTitle} />
        <div className="news-card__bottom">
          <p className="news-card__date">{formatDate(cardPublishedAt)}</p>
          <h2 className="news-card__title">{cardTitle}</h2>
          <p className="news-card__text">{cardDescription}</p>
          <p className="news-card__source">{cardSource}</p>
        </div>
      </article>
    )
  }
export default NewsCard