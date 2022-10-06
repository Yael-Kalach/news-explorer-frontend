import SearchResults from "../SearchResults/SearchResults";
import React from "react";

function SearchForm({ children }) {
  const [isSearching, setIsSearching] = React.useState(false);
  const [isValid, setIsValid] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(!isSearching)
  }
  
  const onChangeSearch = (e) => {
    setSearch(e.target.value)
    setIsValid(!isValid)
  }

    return (
      <div>
        <section className="search-form">
          <h1 className="search-form__title">What's going on in the world?</h1>
          <h2 className="search-form__subtitle">Find the latest news on any topic and save them in your personal account.</h2>
          <form onSubmit={handleSearch} className="search-form__form">
            <input 
              value={search || ''} 
              id="topic-input" 
              type="text" 
              name="topic" 
              placeholder="Enter topic" 
              className="search-form__input" 
              onChange={onChangeSearch} 
              required />
            <button type="submit" aria-label="Search" className="search-form__button">Search</button>
          </form>
        </section>
        <section className={`search-results ${isSearching ? 'search-results_visible' : ''}`}>
          { children }
        </section>
      </div>
    );
  }
  
  export default SearchForm;