import React from 'react';
import { useLocation } from 'react-router-dom';

function NewsCard({ image, title, keyword, date, description, source }) {
  const [isMarked, setIsMarked] = React.useState(false);
  const { pathname } = useLocation();

  const cardLikeButtonClassName = (
    `news-card__button 
    ${pathname === '/saved-news' ? 'news-card__button_trash' : 'news-card__button-bookmark'}
    ${pathname === '/' && isMarked ? 'news-card__button-bookmarked' : ''}`
  );

  const handleBookmark = () => {
    setIsMarked(!isMarked)
  }

    return(
      <article className="news-card">
        <div className="news-card_top">
          <p className="news-card__keyword">{keyword}</p>
          <div className="news-card__icon">
            <p className="news-card__tooltip">{pathname === '/saved-news' ? "Remove from saved" : "Save article"}</p>
            <button type="button" aria-label={pathname === '/saved-news' ? "trash" : "bookmark"}
            className={cardLikeButtonClassName} onClick={handleBookmark} />
          </div>
        </div>
        <img className="news-card__image" src={image} alt={title} />
        <div className="news-card_bottom">
          <p className="news-card__date">{date}</p>
          <h2 className="news-card__title">{title}</h2>
          <p className="news-card__text">{description}</p>
          <p className="news-card__source">{source}</p>
        </div>
      </article>
    )
  }
export default NewsCard