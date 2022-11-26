import React from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function NewsCard({ 
  card,
  isLoggedIn,
  formatDate,
  handleSaveArticle,
  handleDelete,
  handleLoginPopupClick
  }) {
  // news card states
  const [isMarked, setIsMarked] = React.useState(false);
  const currentUser = React.useContext(CurrentUserContext);
  // const [currentId, setCurrentId] = React.useState(_id);
  const { pathname } = useLocation();

  React.useEffect(() => {
    (currentUser.saved && currentUser.saved.some((article) => article.link === card.url))
      && setIsMarked(true)
  }, []);

  function handleCardSave(event) {
    event.preventDefault()
    if (!isLoggedIn) {
      handleLoginPopupClick()
    } else {
      setIsMarked(!isMarked);
      if (isMarked) {
        handleDelete(currentUser.saved.find((article) => article.link === card.url))
      } else {
        handleSaveArticle(card)
      }
    }
  }

  function onClickDelete() {
    handleDelete(card)
  }

  const cardLikeButtonClassName = (
    `news-card__button 
    ${pathname === '/saved-news' ? 'news-card__button_type_trash' : 'news-card__button_type_bookmark'}
    ${pathname === '/' && isMarked ? 'news-card__button_type_bookmarked' : ''}`
  );

    return(
      <article className="news-card">
        <div className="news-card__top">
          <p className={`news-card__keyword ${pathname === '/' ? '' : 'news-card__keyword_visible'}`} >{card.keyword}</p>
          <div className="news-card__icon">
            <p className="news-card__tooltip">{isLoggedIn && pathname === "/" ? "Sign in to save" : "Remove from saved"}</p>
            {pathname === '/' ? <button type="button" aria-label="bookmark" className={cardLikeButtonClassName} onClick={handleCardSave} /> 
            : <button type="trash" aria-label="bookmark" className={cardLikeButtonClassName} onClick={onClickDelete} />}
          </div>
        </div>
        <img className="news-card__image" src={card.urlToImage || card.image} alt={card.title} />
        <div className="news-card__bottom">
          <p className="news-card__date">{formatDate(card.publishedAt || card.date)}</p>
          <h2 className="news-card__title">{card.title}</h2>
          <p className="news-card__text">{card.description || card.text}</p>
          <a className="news-card__link" href={card.url || card.link} target='_blank' rel="noopener noreferrer">
            <p className="news-card__source">{card.source.name || card.source}</p>
          </a>
        </div>
      </article>
    )
  }
export default NewsCard