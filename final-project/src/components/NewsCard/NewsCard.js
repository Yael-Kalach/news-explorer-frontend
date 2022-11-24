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
  isLoggedIn,
  token,
  formatDate,
  handleSaveArticle,
  handleDelete
  }) {
  // news card states
  const [isMarked, setIsMarked] = React.useState(false);
  const [currentId, setCurrentId] = React.useState(_id);
  const { pathname } = useLocation();

  const articleData = {
    keyword: localStorage.getItem('currentKeyword'),
    title: cardTitle,
    text: cardDescription,
    date: cardPublishedAt,
    source: cardSource,
    link: cardUrl,
    image: cardUrlToImage
  };

  function handleCardSave(event) {
    const userLoggedIn = token !== null;
    if (userLoggedIn && pathname === '/' && isMarked === false) {
      handleSaveArticle(articleData)
      setCurrentId(articleData.id);
      setIsMarked(true);
    } else if (userLoggedIn && pathname === '/' && isMarked === true) {
      onClickDelete()
      setIsMarked(false);
    }
  }

  function onClickDelete() {
    handleDelete(_id)
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
            : <button type="trash" aria-label="bookmark" className={cardLikeButtonClassName} onClick={onClickDelete} />}
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