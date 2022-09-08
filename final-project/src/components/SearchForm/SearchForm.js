import NewsCard from "../NewsCard/NewsCard";
import React from "react";

function SearchForm() {
  const [isSearching, setIsSearching] = React.useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(!isSearching)
  }
    return (
      <div>
        <section className="search-form">
          <h1 className="search-form__title">What's going on in the world?</h1>
          <h2 className="search-form__subtitle">Find the latest news on any topic and save them in your personal account.</h2>
          <form className="search-form__form">
            <input id="topic-input" type="text" name="topic" placeholder="Enter topic" className="search-form__input" required />
            <button type="submit" aria-label="Search" onClick={handleSearch} className="search-form__button">Search</button>
          </form>
        </section>
        <section className={`search-results ${isSearching ? 'search-results_visible' : ''}`}>
          <div className= "search-results__container">
            <h2 className="search-results__title">Search results</h2>
            <div className="search-results__list">
              <NewsCard
              image={'https://images.unsplash.com/photo-1518981154746-fdc34f7b0548?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=789&q=80'} 
              title={"Everyone Needs a Special 'Sit Spot' in Nature"} 
              keyword={'Nature'}
              date={'November 4, 2020'}
              description={`Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...`} 
              source={'treehugger'} />

              <NewsCard
              image={'https://images.unsplash.com/photo-1502379584702-fd42ac34d0c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'} 
              title={"Nature makes you better"} 
              keyword={'Nature'}
              date={'February 19, 2019'}
              description={`We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.`} 
              source={'national geographic'} />

              <NewsCard
              image={'https://images.unsplash.com/photo-1602391950852-88bf9be72b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1127&q=80'} 
              title={"Grand Teton Renews Historic Crest Trail"} 
              keyword={'Parks'}
              date={'November 4, 2020'}
              description={`The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...`} 
              source={'National parks traveler'} />
            </div>
            <button className="search-results__button">Show more</button>
          </div>
        </section>
      </div>
    );
  }
  
  export default SearchForm;