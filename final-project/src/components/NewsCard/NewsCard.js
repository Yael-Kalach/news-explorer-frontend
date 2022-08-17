import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function NewsCard({ newsCard, onNewsCardClick, newsCardTooltip }) {
  const { pathname } = useLocation();

  const currentUser = React.useContext(CurrentUserContext);

  const isBookmarked = newsCard.likes.some(user => user._id === currentUser._id);

  const newsCardButtonClassName = (
    `elements__button elements__button_trash ${isBookmarked && pathname === '/saved-news' ? 'elements__button_trash_visible' : 'elements__button_trash_hidden'}`
  ); 
  
  const handleClick = () => {
    onNewsCardClick(newsCard);
  }

    return(
      <article className="newsCard">
        <button type="button" aria-label="trash" className={newsCardButtonClassName} onClick={handleDeleteClick}></button>
        <p className="newsCard__tooltip">{newsCardTooltip}</p>
        <img className="newsCard__image" src={newsCard.image} alt={newsCard.title} onClick={handleClick} />
        <p className="newsCard__keyword">{newsCard.keyword}</p>
        <div className="newsCard__title">
          <p>{newsCard.date}</p>
          <h2 className="newsCard__text">{newsCard.title}</h2>
          <p></p>
        </div>
      </article>
    )
  }
export default NewsCard