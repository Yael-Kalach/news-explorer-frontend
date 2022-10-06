import React from "react";
import NewsCard from "../NewsCard/NewsCard";

function SearchResults({ resultSearch, handleShowMore }){
    const [isReadMoreShown, setIsReadMoreShown] = React.useState(false)
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
                  keyword={newsCard.keyword}
                  title={newsCard.title}
                  date={newsCard.publishedAt}
                  source={newsCard.source.name}
                  description={newsCard.description}
                  link={newsCard.url}
                  image={newsCard.urlToImage}
                />
                ))}
            </div>
            <button onClick={handleShowMore} className="search-results__button">Show more</button>
        </div>
    )
}

export default SearchResults;