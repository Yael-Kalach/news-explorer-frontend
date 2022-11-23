import newsApi from "../../utils/NewsApi"
import React from "react";
import SearchResults from "../SearchResults/SearchResults"
import ResultsNotFound from "../ResultsNotFound/ResultsNotFound";
import ResultsError from "../ResultsError/ResultsError";

function SearchForm({ 
  isLoggedIn,
  handleDelete, 
  handleSaveArticle,
  token,
  formatDate
}) {
  const DISPLAY_COUNT = 3;
  // input ref
  const searchInputRef = React.useRef(null);
  // Search results visibillty
  const [isSearching, setIsSearching] = React.useState(false);
  // Search results states
  const [isSearchResult, setIsSearchResult] = React.useState(false);
  const [isNotFound, setIsNotFound] = React.useState(false);
  const [articlesCount, setArticlesCount] = React.useState(DISPLAY_COUNT);
  const [searchErrorMessage, setSearchErrorMessage] = React.useState('');
  // Keyword state
  const [keyword, setKeyword] = React.useState(
    localStorage.getItem('currentKeyword')
  );
  // Article state
  const [searchArticles, setSearchArticles] = React.useState(
    localStorage.getItem('currentArticles', [])
  );

  // Functions
  React.useEffect(() => {
    localStorage.setItem('currentKeyword', keyword);
  }, [keyword]);

  React.useEffect(() => {
    localStorage.setItem('currentArticles', searchArticles);
  }, [searchArticles]);

  React.useEffect(() => {
    localStorage.setItem('currentArticlesCount', articlesCount);
  }, [articlesCount]);

  function handleSearch(e) {
    e.preventDefault();
    const currentKeyword = searchInputRef.current.value;
    setKeyword(currentKeyword);
    setSearchArticles([]);
    setArticlesCount(3);
    setSearchErrorMessage('');
    setKeyword(currentKeyword);
    newsApi.getSearchArticles(currentKeyword)

      .then((res) => {
        const searchResult = res.articles;
        if (searchResult.length !== 0) {
          setIsSearchResult(true);
          setIsNotFound(false);
          setSearchArticles(searchResult);
          return;
        } else {
          setIsSearchResult(false);
          setIsNotFound(true);
        }
      })
      .catch(() => {
        setIsNotFound(true);
        setIsSearchResult(false);
        setSearchErrorMessage(
          'Sorry, something went wrong! Please try again later.'
        );
      })
      .finally(() => {
        setIsSearching(true)
      })
  }

    return (
      <div>
        <section className="search-form">
          <h1 className="search-form__title">What's going on in the world?</h1>
          <h2 className="search-form__subtitle">Find the latest news on any topic and save them in your personal account.</h2>
          <form onSubmit={handleSearch} className="search-form__form">
            <input 
              ref={searchInputRef} 
              id="keyword-input" 
              type="text" 
              name="keyword" 
              autoComplete="off"
              placeholder="Enter keyword"
              className="search-form__input"
              required 
            />
            <button type="submit" aria-label="Search" className="search-form__button">Search</button>
          </form>
        </section>
        {isSearching ? <section className="search-results">
          {isSearchResult && (
            <SearchResults
              resultSearch={searchArticles}
              handleDelete={handleDelete}
              handleSaveArticle={handleSaveArticle}
              token={token}
              formatDate={formatDate}
              handleShowMore={() =>
                setArticlesCount(
                  (articlesCount / DISPLAY_COUNT + 1) * DISPLAY_COUNT
                )
              }
              isLoggedIn={isLoggedIn}
            />
          )}
          {isNotFound && <ResultsNotFound />}
          {searchErrorMessage && <ResultsError />}
        </section> : ''}
      </div>
    );
  }
  
  export default SearchForm;