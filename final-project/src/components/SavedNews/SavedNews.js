import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function SavedNews({ orderedKeywordsString, isLoggedIn, savedArticles, handleUpdateList }) {
  const currentUser = React.useContext(CurrentUserContext);
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="saved-news">
        <SavedNewsHeader 
          orderedKeywordsString={orderedKeywordsString} 
          name={localStorage.getItem('name')} 
          savedArticles={savedArticles} 
        />
        <div className="news-card-list">
          <div className="news-card-list__container">
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
              />
            ))} 
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
  
export default SavedNews;