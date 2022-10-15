import React from "react";
import NewsCard from "../NewsCard/NewsCard";

function SearchResults({ resultSearch, handleShowMore, isLoggedIn }){
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
                  cardKeyword={newsCard.keyword}
                  cardTitle={newsCard.title}
                  cardDescription={newsCard.description}
                  cardPublishedAt={newsCard.publishedAt}
                  cardSource={newsCard.source.name}
                  cardUrl={newsCard.url}
                  cardUrlToImage={newsCard.urlToImage}
                  isLoggedIn={isLoggedIn}
                />
                ))}
            </div>
            <button onClick={handleShowMore} className="search-results__button">Show more</button>
        </div>
    )
}

export default SearchResults;