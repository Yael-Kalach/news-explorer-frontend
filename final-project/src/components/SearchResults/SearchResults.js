import React from "react";
import NewsCard from "../NewsCard/NewsCard";

function SearchResults({ 
  resultSearch, 
  handleShowMore, 
  isLoggedIn, 
  handleSaveArticle, 
  handleDelete,
  handleLoginPopupClick,
  formatDate
}){
    const currentArticlesCount = localStorage.getItem('currentArticlesCount');
    const currentDisplayedResult = resultSearch.slice(0, currentArticlesCount);

    return(
        <div className= "search-results__container">
            <h2 className="search-results__title">Search results</h2>
            <div className="search-results__list">
              {currentDisplayedResult.length > 0 &&
              currentDisplayedResult.map((newsCard, index) => (
                <NewsCard
                  key={index}
                  card={newsCard}
                  isLoggedIn={isLoggedIn}
                  handleSaveArticle={handleSaveArticle}
                  handleDelete={handleDelete}
                  formatDate={formatDate}
                  handleLoginPopupClick={handleLoginPopupClick}
                />
                ))}
            </div>
            <button onClick={handleShowMore} className="search-results__button">Show more</button>
        </div>
    )
}

export default SearchResults;